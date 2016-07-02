/**
 * Engine is what ties everything together and handles the real-time rendering and updates.
 */
var Engine=FrakClass.extend({
	/** Constructor
		@param canvas Canvas element or ID or jQuery container
		@param options Engine options [optional]
		@param scene Scene to render and update [optional] */
	init: function(canvas, options, scene) {
		if (!options) options={};
		this.options = FRAK.extend({
			'assetsPath': '',
			'defaultRequestedFPS': 30.0,
			'requestedFPS': 30.0,
			'anisotropicFiltering': 4, // Set to integer (i.e. 2, 4, 8, 16) or false to disable
			'useVAO': true, // Set to false to completely disable the usage of Vertex Array Objects
			'debug': false,
			'antialias': false,
			'ssao': false,
			'transparencyMode': 'default',
			'renderer': 'default',
			'softShadows': false,
			'runInBackground': false,
			'context': false,
			'contextErrorCallback': null
		}, options);
		this.validateOptions(canvas);

		this.context = this.options.context;
		this.context.engine = this;

		if (!scene)
			scene=new DefaultScene();

		this.scene = scene;
		this.scene.engine = this;
		this.fps = new FPS();
		this.running = false;
		this.input = false;

		this.assetsManager = new AssetsManager(this.context, this.options.assetsPath);

		// Universal 1x1 opaque white texture
		this.WhiteTexture = new Texture(this.context);
		this.WhiteTexture.name = "WhiteTexture";
		this.WhiteTexture.mipmapped = false;
		this.WhiteTexture.clearImage(this.context, [0xFF, 0xFF, 0xFF, 0xFF]);
		this.WhiteTextureSampler =  new Sampler('tex0', this.WhiteTexture);

		document.addEventListener("visibilitychange", FrakCallback(this, this.onVisibilityChange));

		// Register context lost and restored event handlers
		this.context.canvas.addEventListener("webglcontextlost", FrakCallback(this, this.onContextLost), false);
		this.context.canvas.addEventListener("webglcontextrestored", FrakCallback(this, this.onContextRestored), false);

		if (FRAK.fullscreenEnabled) {
			this.useUpscaling = false;
			var fsHandler = FrakCallback(this, this.onFullscreenChange);
			document.addEventListener("fullscreenchange", fsHandler);
			document.addEventListener("webkitfullscreenchange", fsHandler);
			document.addEventListener("mozfullscreenchange", fsHandler);
			document.addEventListener("MSFullscreenChange", fsHandler);
		}

		this.setupInput();
	},

	onContextLost: function(event) {
		console.log('FRAK: Rendering context lost');
		event.preventDefault();
		this.pause();
	},

	onContextRestored: function(event) {
		console.log('FRAK: Rendering context restored');
		this.context.engine = this;
		this.context.restore();
		this.run();
	},

	onVisibilityChange: function() {
		if (!this.options.runInBackground) {
			if (document.hidden) {
				if (this.running === false) {
					this._externallyPaused = true;
					return;
				}
				this.pause();
			}
			else {
				if (this._externallyPaused) {
					delete this._externallyPaused;
					return;
				}
				this.run();
			}
		}
	},

	onFullscreenChange: function() {
		if (!(this.context instanceof RenderingContext))
			return;

		if (FRAK.isFullscreen()) {
			// Save original canvas state
			var canvas = this.context.canvas;
			this._savedCanvasStyles = {
				position: canvas.style.position,
				left: canvas.style.left,
				right: canvas.style.right,
				top: canvas.style.top,
				bottom: canvas.style.bottom,
				width: canvas.style.width,
				height: canvas.style.height,
				canvasWidth: canvas.getAttribute('width'),
				canvasHeight: canvas.getAttribute('height'),
				aspectRatio: this.scene.cameraComponent.aspect
			};

			// Stretch canvas to fill the entire screen
			canvas.style.position = 'absolute';
			canvas.style.left = 0;
			canvas.style.right = 0;
			canvas.style.top = 0;
			canvas.style.bottom = 0;
			canvas.style.width = '100%';
			canvas.style.height = '100%';

			// We have to wait for the styles to be applied to continue
			var scope = this;
			setTimeout(function() {
				// Set aspect ratio
				var bounds = canvas.getBoundingClientRect();
				scope.scene.cameraComponent.setAspectRatio(bounds.width/bounds.height);
				if (scope.useUpscaling)
					return;

				// If not using upscaling then resize the RenderTarget
				var gl = scope.context.gl;
				var width = gl.canvas.clientWidth;
				var height = Math.max(1, gl.canvas.clientHeight);
				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);
				scope.scene.camera.target.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
			},
			2000/this.options.requestedFPS);
		}
		else {
			if (this._savedCanvasStyles) {
				// Restore canvas size and aspect ratio for perspective cameras
				var canvas = this.context.canvas;
				canvas.style.position = this._savedCanvasStyles.position;
				canvas.style.left = this._savedCanvasStyles.left;
				canvas.style.right = this._savedCanvasStyles.right;
				canvas.style.top = this._savedCanvasStyles.top;
				canvas.style.bottom = this._savedCanvasStyles.bottom;
				canvas.style.width = this._savedCanvasStyles.width;
				canvas.style.height = this._savedCanvasStyles.height;
				if (this._savedCanvasStyles.aspectRatio)
					this.scene.cameraComponent.setAspectRatio(this._savedCanvasStyles.aspectRatio);

				// If not using upscaling then resize the RenderTarget
				if (!this.useUpscaling) {
					canvas.setAttribute('width', this._savedCanvasStyles.canvasWidth);
					canvas.setAttribute('height', this._savedCanvasStyles.canvasHeight);
					var gl = this.context.gl;
					this.scene.camera.target.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
				}

				delete this._savedCanvasStyles;
			}
		}
	},

	setupInput: function() {
		this.input = new Input(this, this.context.canvas);
	},

	/** Starts the engine. The engine will try to draw frames at the "requestedFPS" specified
		in the options that were passed to the constructor. The default value is 30fps.
		If requestAnimationFrame function is not available then setTimeout is used. */
	run: function() {
		if (this.running !== false)
			return;

		this.running = true;

		var now;
		var then = FRAK.timestamp();
		var interval = 1000/this.options.requestedFPS;
		var delta;
		var scope = this;

		function draw() {
			now = FRAK.timestamp();
			delta = now - then;
			if (delta > interval) {
				then = now - (delta % interval);
				scope.frame();
			}

			if (scope.running) {
				scope._currentAnimationFrame = FRAK.requestAnimationFrame(draw);
			}
		}

		if (!this.scene.started)
			this.scene.start(this.context, this);

		this._currentAnimationFrame = FRAK.requestAnimationFrame(draw);
	},

	/**
		This is called when scene has finished starting up.
		Overide to get this call from outside.

		XXX: It would probably make more sense to have this callback in the Scene class.
	*/
	sceneStarted: function(){

	},

	/** Stops the engine by pausing the engine and calling Scene.end() method.
		Component.onEnd(context,engine) method will be called for all components.
		Subsequent call to run() will start the engine again. */
	stop: function() {
		this.pause();
		if(this.scene.started) this.scene.end(this.context);
	},

	/** Pauses the engine, call run to start it again. */
	pause: function() {
		this.running = false;
		if (this._currentAnimationFrame)
			FRAK.cancelAnimationFrame(this._currentAnimationFrame);
	},

	/** Toggles engine pause */
	togglePause: function() {
		if(this.running===false) this.run();
		else this.pause();
	},

	/** Requests engine to go to fullscreen */
	requestFullscreen: function(useUpscaling) {
		if (!FRAK.fullscreenEnabled) {
			console.warn('FRAK: Fullscreen API is disabled in this browser.');
			return;
		}
		this.useUpscaling = useUpscaling;
		FRAK.requestFullscreen(this.context.canvas);
	},

	/** Requests engine to exit fullscreen */
	exitFullscreen: function() {
		if (!FRAK.fullscreenEnabled) {
			console.warn('FRAK: Fullscreen API is disabled in this browser.');
			return;
		}
		FRAK.exitFullscreen();
	},

	/**
		Idle rendering. Try'is to draw in low (1) fps
		@fps {float} idle at given fps, default is 1
	*/
	startIdle: function(fps){
		if(!fps) fps = 1.0;
		this.options.requestedFPS = fps;
		this.pause();
		this.run();
	},

	/**
		Stop idling and return to normal fps
	*/
	stopIdle: function(){
		this.options.requestedFPS = this.options.defaultRequestedFPS;
		this.pause();
		this.run();
	},

	/** Runs engine to render a single frame and do an update */
	frame: function() {
		this.context.engine = this;
		this.input.update(this);
		this.scene.update(this);
		this.scene.render(this.context);
		this.fps.measure();
	},

	validateOptions: function(canvas) {
		// Create default rendering context
		if (!this.options.context)
			this.options.context = new RenderingContext(canvas, null, this.options.contextErrorCallback);

		var gl = this.options.context.gl;

		// Transparency mode validation
		switch (this.options.transparencyMode) {
			case 'sorted':
			case 'blended':
			case 'stochastic':
				break;
			default:
				this.options.transparencyMode = 'blended';
				break;
		}
		if (this.options.transparencyMode != 'sorted') {
			var extFloat = gl.getExtension('OES_texture_float');
			var extHalfFloat = gl.getExtension('OES_texture_half_float');
			if (!extFloat && !extHalfFloat) {
				this.options.transparencyMode = 'sorted';
			}
		}

		// Renderer mode validation
		switch (this.options.renderer) {
			case 'auto':
				if (gl.getExtension('WEBGL_draw_buffers') &&
					gl.getExtension('OES_texture_float') &&
					gl.getExtension('OES_standard_derivatives'))
					this.options.renderer = 'deferred';
				else
					this.options.renderer = 'forward';
				break;
			case 'deferred':
			case 'forward':
				break;
			default:
				this.options.renderer = 'forward'
				break;
		}
	},

	/** Helper function for displaying renderer statistics. */
	stats: function() {
		if (!this.scene)
			return;
		var organizer = this.scene.camera.renderStage.generator.organizer;
		console.log('=============== Statistics =====================');
		console.log('  Visible faces (opaque/transparent): {0}/{1}'.format(organizer.visibleSolidFaces, organizer.visibleTransparentFaces));
		console.log('  Visible renderers (opaque/transparent): {0}/{1}'.format(organizer.visibleSolidRenderers, organizer.visibleTransparentRenderers));
		console.log('  Visible batches (opaque/transparent): {0}/{1}'.format(organizer.visibleSolidBatches, organizer.visibleTransparentBatches));
		console.log('================================================');
	}
});
