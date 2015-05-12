/**
 * Engine is what ties everything together and handles the real-time rendering and updates.
 */
var Engine=Class.extend({
	/** Constructor
		@param canvas Canvas element or ID or jQuery container
		@param options Engine options [optional]
		@param scene Scene to render and update [optional] */
	init: function(canvas, options, scene) {
		if (!options) options={};
		this.options = FRAK.extend({
			'assetsPath': '',
			'requestedFPS': 30.0,
			'anisotropicFiltering': 4, // Set to integer (i.e. 2, 4, 8, 16) or false to disable
			'debug': false,
			'antialias': false,
			'ssao': false,
			'transparencyMode': 'default',
			'renderer': 'default',
			'softShadows': false,
			'runInBackground': false,
			'context': false
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

		document.addEventListener("visibilitychange", ClassCallback(this, this.onVisibilityChange));

		this.setupInput();
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

	setupInput: function(){
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

		function draw(timestamp) {
			if (timestamp)
				now = timestamp;
			else
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
			this.options.context = new RenderingContext(canvas);

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

		// Renderer mode validation
		var gl = this.options.context.gl;
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