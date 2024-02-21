import FPS from 'engine/FPS';
import AssetsManager from 'loading/AssetsManager';
import Texture from 'rendering/materials/Texture';
import Sampler from 'rendering/shaders/Sampler';
import RenderingContext, { Canvas } from 'rendering/RenderingContext';
import Input from 'engine/Input';
import FRAK, { FrakCallback, merge } from 'Helpers';
import Scene from 'scene/Scene';

const DEFAULT_OPTIONS = {
	anisotropicFiltering: 4 as number | false, // Set to integer (i.e. 2, 4, 8, 16) or false to disable
	antialias: false,
	assetsPath: '',
	builtinShaders: true,
	captureScreenshot: false,
	contextErrorCallback: undefined as any,
	contextOptions: undefined as WebGLContextAttributes | undefined,
	debug: false,
	defaultRequestedFPS: 60.0,
	directionalShadowResolution: 2048,
	emissiveEnabled: false,	// TODO: Remove this for an automatic detection
	legacyAmbient: true,
	requestedFPS: 60.0,
	runInBackground: false,
	shadowManualUpdate: false,
	showDebug: false,
	softShadows: false,
	ssao: false,
	tonemap: 'aces',
};

type Options = typeof DEFAULT_OPTIONS;
type ImmersiveMode = 'ar' | 'vr';

/**
 * Engine is what ties everything together and handles the real-time rendering and updates.
 */
class Engine {
	options: Options;
	context: RenderingContext;
	scene: Scene;
	fps: FPS;
	running: boolean;
	input: Input;
	screenshot: any;
	onScreenshotCaptured: any;
	debugCTX: any;
	debugWidth: any;
	debugFPS: any;
	debugCount: any;
	assetsManager: AssetsManager;
	WhiteTexture: Texture;
	WhiteTextureSampler: Sampler;
	DiffuseFallbackSampler: Sampler;
	useUpscaling: any;
	_externallyPaused: any;
	_savedCanvasStyles: any;
	immersiveSession: XRSession | null = null;
	public immersiveRefSpace: XRReferenceSpace | null = null;

	private externallyPaused = false;
	private immersiveExitCB?: () => void;
	private queuedImmersiveFrame: number | null = null;
	private queuedInlineFrame: number | null = null;

	static async isImmersiveSupported(mode: ImmersiveMode = 'ar') {
		return navigator.xr?.isSessionSupported(`immersive-${mode}`);
	}

	/** Constructor
		@param canvas Canvas element or ID or jQuery container
		@param options Engine options [optional] */
	constructor(canvas: Canvas, options: Partial<Options> = {}) {
		this.options = merge(DEFAULT_OPTIONS, options);

		this.context = new RenderingContext(canvas, this, this.options.contextOptions, this.options.contextErrorCallback);

		this.validateOptions(this.context);

		this.scene = new Scene(this);
		this.fps = new FPS();
		this.running = false;
		this.screenshot = false;
		this.onScreenshotCaptured = false;
		this.debugCTX = false;
		this.debugWidth = 256;
		this.debugFPS = [];
		this.debugCount = 24;

		this.assetsManager = new AssetsManager(this.context, this.options.assetsPath);
		if (!this.options.builtinShaders) {
			this.assetsManager.shadersManager.builtin = {};
		}

		// Universal 1x1 opaque white texture
		this.WhiteTexture = new Texture(this.context);
		this.WhiteTexture.name = 'WhiteTexture';
		this.WhiteTexture.mipmapped = false;
		this.WhiteTexture.clearImage(this.context, [0xFF, 0xFF, 0xFF, 0xFF]);
		this.WhiteTextureSampler = new Sampler('tex0', this.WhiteTexture);
		this.DiffuseFallbackSampler = new Sampler('diffuse0', this.WhiteTexture);

		document.addEventListener('visibilitychange', FrakCallback(this, this.onVisibilityChange));

		// Register context lost and restored event handlers
		this.context.canvas.addEventListener('webglcontextlost', FrakCallback(this, this.onContextLost), false);
		this.context.canvas.addEventListener('webglcontextrestored', FrakCallback(this, this.onContextRestored), false);

		if (FRAK.fullscreenEnabled) {
			this.useUpscaling = false;
			var fsHandler = FrakCallback(this, this.onFullscreenChange);
			document.addEventListener('fullscreenchange', fsHandler);
			document.addEventListener('webkitfullscreenchange', fsHandler);
			document.addEventListener('mozfullscreenchange', fsHandler);
			document.addEventListener('MSFullscreenChange', fsHandler);
		}

		this.input = new Input(this, this.context.canvas);
	}

	onContextLost(event): any {
		console.log('FRAK: Rendering context lost');
		event.preventDefault();
		this.pause();
	}

	onContextRestored(event): any {
		console.log('FRAK: Rendering context restored');
		this.context.engine = this;
		this.context.restore();
		this.run();
	}

	onVisibilityChange(): any {
		if (!this.options.runInBackground) {
			if (document.hidden) {
				if (this.running === false) {
					this.externallyPaused = true;
					return;
				}
				this.pause();
			}
			else {
				if (this.externallyPaused) {
					this.externallyPaused = false;
					return;
				}
				this.run();
			}
		}
	}

	onFullscreenChange(): any {
		var canvas;
		if (FRAK.isFullscreen()) {
			// Save original canvas state
			canvas = this.context.canvas;
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
				if (!scope.useUpscaling) {
					// If not using upscaling then resize the RenderTarget
					var gl = scope.context.gl;
					var width = (gl.canvas as HTMLCanvasElement).clientWidth;
					var height = Math.max(1, (gl.canvas as HTMLCanvasElement).clientHeight);
					canvas.setAttribute('width', width);
					canvas.setAttribute('height', height);
				}
			},
			2000 / this.options.requestedFPS);
		}
		else {
			if (this._savedCanvasStyles) {
				// Restore canvas size and aspect ratio for perspective cameras
				canvas = this.context.canvas;
				canvas.style.position = this._savedCanvasStyles.position;
				canvas.style.left = this._savedCanvasStyles.left;
				canvas.style.right = this._savedCanvasStyles.right;
				canvas.style.top = this._savedCanvasStyles.top;
				canvas.style.bottom = this._savedCanvasStyles.bottom;
				canvas.style.width = this._savedCanvasStyles.width;
				canvas.style.height = this._savedCanvasStyles.height;

				// If not using upscaling then resize the RenderTarget
				if (!this.useUpscaling) {
					canvas.setAttribute('width', this._savedCanvasStyles.canvasWidth);
					canvas.setAttribute('height', this._savedCanvasStyles.canvasHeight);
					var gl = this.context.gl;
				}

				delete this._savedCanvasStyles;
			}
		}
	}

	/** Starts the engine. The engine will try to draw frames at the "requestedFPS" specified
		in the options that were passed to the constructor. The default value is 30fps.
		If requestAnimationFrame function is not available then setTimeout is used. */

	public run() {
		if (this.running) {
			return;
		}

		this.running = true;

		this.input.start();
		this.runInline();
	}

	private runInline() {
		let then = performance.now();
		const draw = (t: DOMHighResTimeStamp) => {
			then = this.update(then, t);

			this.queuedInlineFrame = window.requestAnimationFrame(draw);

			this.scene.render(this.context, this.scene.cameraComponent);
		};

		if (!this.scene.started)
			this.scene.start(this.context);

		this.queuedInlineFrame = window.requestAnimationFrame(draw);
	}

	private pauseInline() {
		if (this.queuedInlineFrame) {
			window.cancelAnimationFrame(this.queuedInlineFrame);
			this.queuedInlineFrame = null;
		}
	}

	async startImmersive(cb?: () => void) {
		if (!navigator.xr) {
			console.error('WebXR is not supported in this browser');

			return;
		}

		try {
			this.immersiveSession = await navigator.xr?.requestSession(
				'immersive-ar',
				{
					optionalFeatures: ['local-floor'],
					requiredFeatures: ['local'],
				},
			);
		} catch (e) {
			console.error(`Failed to start immersive session: ${e}`);

			return;
		}

		this.immersiveExitCB = cb;
		this.immersiveSession.addEventListener('end', this.onExitImmersive.bind(this));

		this.scene.camera.renderStage.generator.setImmersive(true);

		await this.immersiveSession.updateRenderState({
			baseLayer: new XRWebGLLayer(this.immersiveSession, this.context.gl),
		});

		if (this.immersiveSession.enabledFeatures?.includes('local-floor')) {
			this.immersiveRefSpace = await this.immersiveSession.requestReferenceSpace('local-floor');
		} else {
			this.immersiveRefSpace = await this.immersiveSession.requestReferenceSpace('local');
			this.scene.immersiveCamera.yOffset = 1.6;	// We don't have the right height, so let's guess an average
		}

		this.pauseInline();
		this.runImmersive(this.immersiveSession);
	}

	private runImmersive(session: XRSession) {
		let then = performance.now();
		const draw = (t: DOMHighResTimeStamp, frame: XRFrame) => {
			then = this.update(then, t);

			this.queuedImmersiveFrame = frame.session.requestAnimationFrame(draw);

			this.scene.render(this.context, this.scene.immersiveCamera, frame);
		};

		if (!this.scene.started)
			this.scene.start(this.context);

		this.queuedImmersiveFrame = session.requestAnimationFrame(draw);
	}

	async exitImmersive() {
		await this.immersiveSession?.end();
	}

	private onExitImmersive() {
		this.immersiveSession = null;
		this.scene.camera.renderStage.generator.setImmersive(false);
		this.immersiveExitCB?.();
		this.immersiveExitCB = undefined;

		if (this.running) {
			this.runInline();
		}
	}

	/**
		This is called when scene has finished starting up.
		Overide to get this call from outside.

		XXX: It would probably make more sense to have this callback in the Scene class.
	*/
	sceneStarted(): any {}

	/** Stops the engine by pausing the engine and calling Scene.end() method.
		Component.onEnd(context,engine) method will be called for all components.
		Subsequent call to run() will start the engine again. */
	stop(): any {
		this.pause();
		this.input.stop();
		if (this.scene.started) this.scene.end(this.context, this);
	}

	/** Pauses the engine, call run to start it again. */
	pause(): any {
		this.running = false;
		this.immersiveSession?.end();
		this.pauseInline();
		this.input.pause();
	}

	/** Toggles engine pause */
	togglePause(): any {
		if (!this.running) this.run();
		else this.pause();
	}

	/** Requests engine to go to fullscreen */
	requestFullscreen(useUpscaling?) {
		if (!FRAK.fullscreenEnabled) {
			console.warn('FRAK: Fullscreen API is disabled in this browser.');
			return;
		}
		this.useUpscaling = useUpscaling;
		FRAK.requestFullscreen(this.context.canvas);
	}

	/** Requests engine to exit fullscreen */
	exitFullscreen(): any {
		if (!FRAK.fullscreenEnabled) {
			console.warn('FRAK: Fullscreen API is disabled in this browser.');
			return;
		}
		FRAK.exitFullscreen();
	}

	/**
		Idle rendering. Try'is to draw in low (1) fps
		@fps {float} idle at given fps, default is 1
	*/
	startIdle(fps = 1.0): any {
		this.options.requestedFPS = fps;
	}

	/**
		Stop idling and return to normal fps
	*/
	stopIdle(): any {
		this.options.requestedFPS = this.options.defaultRequestedFPS;
	}

	/** Runs engine to render a single frame and do an update */
	update(then: DOMHighResTimeStamp, now: DOMHighResTimeStamp): DOMHighResTimeStamp {
		let delta = now - then;
		let interval = 1000 / this.options.requestedFPS;
		if (delta > interval) {
			then = now - (delta % interval);

			this.context.engine = this;
			this.input.update();
			this.scene.update(this);
			this.fps.measure();
			if (this.options.captureScreenshot) {
				this._captureScreenshot();
			}

			if (this.options.showDebug) {
				this.renderDebugInfo();
			}
		}

		return then;
	}

	validateOptions(context: RenderingContext) {
		const gl = context.gl;
		const maxBuffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);
		if (maxBuffers < 4) {
			if (this.options.emissiveEnabled) {
				console.warn('FRAK: Emissive rendering is not supported by this browser.');
				this.options.emissiveEnabled = false;
			}
			if (this.options.legacyAmbient) {
				console.warn('FRAK: Legacy ambient rendering is not supported by this browser.');
				this.options.legacyAmbient = false;
			}
		} else if (maxBuffers < 5 && this.options.legacyAmbient && this.options.emissiveEnabled) {
			console.warn('FRAK: Emissive rendering is not supported by this browser.');
			this.options.emissiveEnabled = false;
		}
	}

	resize() {
		// Legacy
	}

	/** Helper function for displaying renderer statistics. */
	stats(): any {
		if (!this.scene)
			return;
		var organizer = this.scene.organizer;
		console.log('=============== Statistics =====================');
		console.log(`  Visible renderers (opaque/transparent): ${organizer.opaqueRenderers.count}/${organizer.transparentRenderers.count}`);
		console.log('================================================');
	}

	renderDebugInfo(): any {
		var organizer = this.scene.organizer;

		if(!this.debugCTX) {
			var canvas = document.createElement("canvas");
			canvas.width = this.debugWidth;
			canvas.height = this.debugWidth / 2;

			canvas.style.position = 'absolute';
			canvas.style.top = "0";
			canvas.style.zIndex = "100";
			canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

			var parent = this.context.canvas.parentNode;
			parent!.insertBefore(canvas, parent!.firstChild);

			this.debugCTX = canvas.getContext("2d");
		}

		if(this.debugCTX && this.debugCount < 1) {
			var ctx = this.debugCTX;

			//organizer.updateStats();

			ctx.clearRect(0, 0, this.debugWidth, this.debugWidth / 2);
			ctx.font = "Normal 20px Arial";
			ctx.fillStyle = "rgba(240,240,240,0.75)";
			ctx.fillText('FPS: ' + this.fps.getAverage().toFixed(2), 10, 20);
			ctx.font = "Normal 12px Arial";
			ctx.fillText('Renderers (opaque / transparent): ' + organizer.opaqueRenderers.count + " / " + organizer.transparentRenderers.count, 10, 60);

			ctx.fillText('RequestedFPS: ' + this.options.requestedFPS, this.debugWidth / 2, 45);

			var gl = this.context.gl;
			var renderer = gl.getParameter(gl.RENDERER);

			ctx.fillText(renderer, 10, 105);
			this.debugFPS.push(this.fps.getAverage().toFixed(2));
			if (this.debugFPS.length > 60) {
				this.debugFPS.shift();
			}
			var x = this.debugWidth / 2;
			var y = 25;

			for(var i = 0; i < this.debugFPS.length; i++) {
				if (this.debugFPS[i] < 20)
					ctx.fillStyle = "#FF0000";
				else if (this.debugFPS[i] < 30)
					ctx.fillStyle = "#f6921e";
				else
					ctx.fillStyle = "#00FF00";

				ctx.fillRect(x + (i * 2), y - (this.debugFPS[i] / 60) * 20, 2, 2);
			}

			this.debugCount = Math.max(3, Math.floor(this.fps.getAverage() / 2));
		}
		this.debugCount--;
	}

	_captureScreenshot(): any {
		var shot = (this.context.gl.canvas as HTMLCanvasElement).toDataURL();
		if (shot && this.onScreenshotCaptured) {
			this.options.captureScreenshot = false;
			this.onScreenshotCaptured(shot);
		}
	}

	captureScreenshot (callback) {
		if(typeof callback === 'function') {
			this.options.captureScreenshot = true;
			this.onScreenshotCaptured = callback;
		}
	}
}

globalThis.Engine = Engine;
export default Engine;
