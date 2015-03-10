/**
 * Engine is what ties everything together and handles the real-time rendering and updates.
 */
var Engine=Class.extend({
	/** Constructor
		@param canvas Canvas as jQuery element
		@param options Engine options [optional]
		@param scene Scene to render and update [optional] */
	init: function(canvas, options, scene) {
		if (!options) options={};
		this.options = FRAK.extend({
			'assetsPath': '',
			'requestedFPS': 30.0,
			'debug': false,
			'antialias': false,
			'ssao': false,
			'transparencyMode': 'default',
			'renderer': 'default',
			'softShadows': false,
			'context': false
		}, options);
		this.validateOptions(canvas);

		this.context = this.options.context;
		if(!scene) scene=new DefaultScene();
		this.scene=scene;
		this.scene.engine=this;
		this.fps=new FPS();
		this.running=false;
		this.input = false;

		this.assetsManager=new AssetsManager(this.context, this.options.assetsPath);

		// Universal 1x1 opaque white texture
		this.WhiteTexture = new Texture(this.context);
		this.WhiteTexture.name = "WhiteTexture";
		this.WhiteTexture.mipmapped = false;
		this.WhiteTexture.clearImage(this.context, [0xFF, 0xFF, 0xFF, 0xFF]);
		this.WhiteTextureSampler =  new Sampler('tex0', this.WhiteTexture);

		this.setupInput();
	},

	setupInput: function(){
		this.input = new Input(this, this.context.canvas[0]);
	},

	/** Starts the engine. The engine will try to draw frames at the "requestedFPS" specified
		in the options that were passed to the constructor. The default value is 30fps.
		If requestAnimationFrame function is not available then setTimeout is used. */
	run: function() {
		if (this.running!==false)
			return;

		this.running=true;

		var now;
		var then = Date.now();
		var interval = 1000/this.options.requestedFPS;
		var delta;
		var scope = this;
		var requestAnimFrame = function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function(f) { window.setTimeout(f, 1000/60); };
		}();

		function draw() {
			if (scope.running)
				requestAnimFrame(draw);

			now = Date.now();
			delta = now - then;
			if (delta > interval) {
				then = now - (delta % interval);
				scope.frame();
			}
		}
		this.scene.start(this.context, this);
		requestAnimFrame(draw);
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
		this.running=false;
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
		switch (this.options.renderer) {
			case 'deferred':
			case 'forward':
				break;
			default:
				this.options.renderer = 'forward'
				break;
		}
	}
});