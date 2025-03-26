import type { Navigator as NavigatorUA } from './UserAgentData';
import FPS from 'engine/FPS';
import AssetsManager from 'loading/AssetsManager';
import Texture from 'rendering/materials/Texture';
import Sampler from 'rendering/shaders/Sampler';
import RenderingContext, { type Canvas } from 'rendering/RenderingContext';
import Input from 'engine/Input';
import FRAK, { FrakCallback, merge } from 'Helpers';
import Scene from 'scene/Scene';
import XRCamera from '../scene/components/XRCamera';
import Camera from '../rendering/camera/Camera';
import LegacyImmersiveCamera from '../scene/components/LegacyImmersiveCamera';

type Tonemap = 'aces' | null;
type Filtering = 2 | 4 | 8 | 16 | false;

const DEFAULT_OPTIONS = {
	anisotropicFiltering: 4 as Filtering, // Set to integer (i.e. 2, 4, 8, 16) or false to disable
	antialias: false,
	assetsPath: '',
	captureScreenshot: false,
	contextErrorCallback: undefined as (() => boolean) | undefined,
	contextOptions: undefined as WebGLContextAttributes | undefined,
	debug: false,
	defaultRequestedFPS: 60.0, // was 60
	directionalShadowResolution: 2048,
	emissiveEnabled: false, // TODO: Remove this for an automatic detection
	legacyAmbient: true,
	renderScale: 1.0,
	requestedFPS: 60.0,
	runInBackground: false,
	shadowManualUpdate: false,
	showDebug: false,
	softShadows: false,
	ssao: false,
	tonemap: 'aces' as Tonemap,
};

type Options = typeof DEFAULT_OPTIONS;
type XRMode = 'ar' | 'vr';
type LegacyImmersiveMode = 'legacy-ar' | 'legacy-vr';
type ImmersiveMode = LegacyImmersiveMode | XRMode;

/** The FRAK Web Engine */
class Engine {
	/** Tries and returns supported modes in the order: ar, vr, legacy-ar, legacy-vr */
	static async getImmersiveSupport(): Promise<ImmersiveMode[]> {
		const modes: ImmersiveMode[] = [];
		if (navigator.xr) {
			if (await navigator.xr.isSessionSupported('immersive-ar')) {
				modes.push('ar');
			}

			if (await navigator.xr.isSessionSupported('immersive-vr')) {
				modes.push('vr');
			}
		}

		if (modes.length) {
			return modes;
		}

		if ((navigator as NavigatorUA).userAgentData && !(navigator as NavigatorUA).userAgentData.mobile) {
			// Not a mobile device, no immersive mode
			return [];
		}

		if (window.hasOwnProperty('ondeviceorientationabsolute') || window.hasOwnProperty('ondeviceorientation')) {
			if (navigator.mediaDevices) {
				const devices = await navigator.mediaDevices.enumerateDevices();
				const cams = devices.filter(d => d.kind === 'videoinput');
				if (cams.length > 0) {
					modes.push('legacy-ar');
				}
			}

			modes.push('legacy-vr');

			return modes;
		}

		return [];
	}

	/** @deprecated Whether the requested immersive mode is supported */
	static async isImmersiveSupported(mode: XRMode = 'ar') {
		return navigator.xr?.isSessionSupported(`immersive-${mode}`);
	}

	private currentlyUpdating = false;
	private externallyPaused = false;
	private immersiveExitCB?: () => void;
	private immersiveMode: ImmersiveMode | null = null;
	private stopCamera?: () => void;
	private queuedImmersiveFrame: number | null = null;
	private queuedInlineFrame: number | null = null;

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
	_savedCanvasStyles: any;
	cameraBlockProgram?: WebGLProgram;
	immersiveSession: XRSession | null = null;
	immersiveRefSpace: XRReferenceSpace | null = null;

	/** Constructor
		@param canvas Canvas element or ID or jQuery container
		@param options Engine options [optional] */
	constructor(canvas: Canvas, options: Partial<Options> = {}) {
		this.options = merge(DEFAULT_OPTIONS, options);

		this.context = new RenderingContext(
			canvas,
			this,
			this.options.contextOptions,
			this.options.contextErrorCallback,
		);

		this.context.renderScale = this.options.renderScale;

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
			const fsHandler = FrakCallback(this, this.onFullscreenChange);

			document.addEventListener('fullscreenchange', fsHandler);
			document.addEventListener('webkitfullscreenchange', fsHandler);
			document.addEventListener('mozfullscreenchange', fsHandler);
			document.addEventListener('MSFullscreenChange', fsHandler);
		}

		this.input = new Input(this, this.context.canvas);
	}

	private onExitImmersive() {
		if (this.immersiveMode) {
			this.immersiveSession = null;
			this.immersiveMode = null;
			this.scene.camera = this.scene.defaultCamera.camera;
			this.scene.cameraComponent = this.scene.defaultCamera;
			this.immersiveExitCB?.();
			this.immersiveExitCB = undefined;
			this.stopCamera?.();
			this.stopCamera = undefined;
		}

		if (this.running && !this.queuedInlineFrame) {
			this.runWindow();
		}
	}

	private pauseInline() {
		if (this.queuedInlineFrame) {
			window.cancelAnimationFrame(this.queuedInlineFrame);
			this.queuedInlineFrame = null;
		}
	}

	// TODO: Combine the following two functions
	private runWindow() {
		let then = performance.now();
		let lastThen = then;
		const draw = (t: DOMHighResTimeStamp) => {
			this.queuedInlineFrame = window.requestAnimationFrame(draw);

			if (this.currentlyUpdating) {
				return;
			}

			this.currentlyUpdating = true;

			then = this.update(then, t);

			// Update returns a new then value if it updated
			// If it's the same, then our FPS is limited and we skip rendering
			if (then !== lastThen) {
				this.scene.render(this.context, this.scene.cameraComponent);
				lastThen = then;
			}

			this.currentlyUpdating = false;
		};

		if (!this.scene.started) {
			this.scene.start(this.context);
		}

		this.queuedInlineFrame = window.requestAnimationFrame(draw);
	}

	private runXR(session: XRSession) {
		let then = performance.now();
		const draw = (t: DOMHighResTimeStamp, frame: XRFrame) => {
			this.queuedImmersiveFrame = frame.session.requestAnimationFrame(draw);

			if (this.currentlyUpdating) {
				return;
			}

			this.currentlyUpdating = true;

			then = this.update(then, t);

			// We always render in XR mode to avoid motion sickness
			this.scene.render(this.context, this.scene.xrCamera, frame);

			this.currentlyUpdating = false;
		};

		if (!this.scene.started) {
			this.scene.start(this.context);
		}

		this.queuedImmersiveFrame = session.requestAnimationFrame(draw);
	}

	private async startLegacyImmersive(mode: LegacyImmersiveMode = 'legacy-ar', _domOverlay?: Element) {
		if (
			window.DeviceOrientationEvent !== undefined &&
			typeof (window.DeviceOrientationEvent as any).requestPermission === 'function'
		) {
			try {
				const response = await (window.DeviceOrientationEvent as any).requestPermission();
				if (response !== 'granted') {
					console.error('Device orientation permission denied');

					return;
				}
			} catch (e) {
				console.error(`Device orientation permission request failed: ${e}`);

				return;
			}
		}

		if (mode === 'legacy-ar') {
			// ask for camera
			if (navigator.mediaDevices?.getUserMedia) {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: { facingMode: { exact: 'environment' } },
						audio: false,
					});

					if (stream.getVideoTracks().length > 0) {
						// this.arCam = stream;
						let camOut = document.createElement('video');

						camOut.setAttribute('autoplay', 'true');

						camOut.style.width = '100%';
						camOut.style.height = '100%';
						camOut.style.objectFit = 'cover';
						camOut.style.position = 'absolute';

						if (this.context.canvas.parentElement) {
							this.context.canvas.parentElement.insertBefore(camOut, this.context.canvas);
						} else {
							document.body.insertBefore(camOut, this.context.canvas);
						}

						camOut.srcObject = stream;

						this.stopCamera = () => {
							stream.getTracks().forEach(track => track.stop());
							camOut.remove();
						};
					}
				} catch (error) {
					console.warn(error);

					// Camera probably denied, fallback to VR
					mode = 'legacy-vr';
				}
			}
		}

		if (!this.scene.legacyImmersiveCamera) {
			this.scene.legacyImmersiveCamera = new LegacyImmersiveCamera(new Camera(mat4.create(), mat4.create()));
			this.scene.cameraNode.addComponent(this.scene.legacyImmersiveCamera);
		}

		this.scene.camera = this.scene.legacyImmersiveCamera.camera;
		this.scene.cameraComponent = this.scene.legacyImmersiveCamera;

		this.immersiveMode = mode;

		this.scene.camera.renderStage.generator.setImmersive(mode === 'legacy-ar');

		this.runWindow();
		this.requestFullscreen();
	}

	private async startXR(mode: XRMode = 'ar', domOverlay?: Element) {
		const options: XRSessionInit = {
			optionalFeatures: ['local-floor'],
			requiredFeatures: ['local'],
		};

		if (domOverlay) {
			options.domOverlay = { root: domOverlay };
			options.optionalFeatures.push('dom-overlay');
		}

		let err = 'No XR support';

		try {
			this.immersiveSession = await navigator.xr?.requestSession(
				`immersive-${mode}`,
				options,
			);
		} catch (e) {
			err = e;
			this.immersiveSession = null;
		}

		if (!this.immersiveSession) {
			console.error(`Failed to start immersive session: ${err}`);

			return;
		}

		if (!this.scene.xrCamera) {
			this.scene.xrCamera = new XRCamera(new Camera(mat4.create(), mat4.create()));
			this.scene.cameraNode.addComponent(this.scene.xrCamera);
		}

		this.scene.camera = this.scene.xrCamera.camera;
		this.scene.cameraComponent = this.scene.xrCamera;

		this.immersiveMode = mode;
		this.immersiveSession.addEventListener('end', this.onExitImmersive.bind(this));

		this.scene.camera.renderStage.generator.setImmersive(mode === 'ar');

		await this.immersiveSession.updateRenderState({
			baseLayer: new XRWebGLLayer(this.immersiveSession, this.context.gl),
		});

		if (this.immersiveSession.enabledFeatures?.includes('local-floor')) {
			this.immersiveRefSpace = await this.immersiveSession.requestReferenceSpace('local-floor');
		} else {
			this.immersiveRefSpace = await this.immersiveSession.requestReferenceSpace('local');

			// No local-floor means we're probably running on a phone, so let's guess an average phone holding height
			this.scene.xrCamera.yOffset = 1.5;
		}

		this.runXR(this.immersiveSession);
	}

	/**
	 *
	 */
	onContextLost(event) {
		console.log('FRAK: Rendering context lost');
		event.preventDefault();
		this.pause();
	}

	/**
	 *
	 */
	onContextRestored(event) {
		console.log('FRAK: Rendering context restored');
		this.context.engine = this;
		this.context.restore();
		this.run();
	}

	/**
	 *
	 */
	onVisibilityChange() {
		if (!this.options.runInBackground) {
			if (document.hidden) {
				if (!this.running) {
					this.externallyPaused = true;

					return;
				}

				this.pause();
			} else {
				if (this.externallyPaused) {
					this.externallyPaused = false;

					return;
				}

				this.run();
			}
		}
	}

	/**
	 *
	 */
	onFullscreenChange() {
		const canvas = this.context.canvas;
		if (FRAK.isFullscreen()) {
			// Save original canvas state
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
			canvas.style.left = '0';
			canvas.style.right = '0';
			canvas.style.top = '0';
			canvas.style.bottom = '0';
			canvas.style.width = '100%';
			canvas.style.height = '100%';

			setTimeout(() => {
				// Set aspect ratio
				if (!this.useUpscaling) {
					// If not using upscaling then resize the RenderTarget
					const width = canvas.clientWidth;
					const height = Math.max(1, canvas.clientHeight);

					canvas.setAttribute('width', `${width}`);
					canvas.setAttribute('height', `${height}`);
				}
			}, 2000 / this.options.requestedFPS);
		} else {
			if (this._savedCanvasStyles) {
				// Restore canvas size and aspect ratio for perspective cameras
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
				}

				delete this._savedCanvasStyles;
			}

			if (this.immersiveMode?.startsWith('legacy')) {
				void this.exitImmersive();
			}
		}
	}

	/**
	 *
	 */
	initCameras(program: WebGLProgram) {
		if (this.cameraBlockProgram !== undefined) {
			return;
		}

		this.cameraBlockProgram = program;
		this.scene.initCameras(this.context, program);
	}

	/** Starts the engine. The engine will try to draw frames at the "requestedFPS" specified
		in the options that were passed to the constructor. The default value is 30fps.
		If requestAnimationFrame function is not available then setTimeout is used. */
	run() {
		if (this.running) {
			return;
		}

		this.running = true;

		this.input.start();
		this.runWindow();
	}

	/** Starts immersive mode, call `Engine.getImmersiveSupport()` first for which mode you can launch */
	async startImmersive(cb?: () => void, mode: ImmersiveMode = 'ar', domOverlay?: Element) {
		this.pauseInline();

		// So the callback gets called even when we fail to start immersive mode
		this.immersiveExitCB = cb;

		if (!mode.startsWith('legacy')) {
			if (!navigator.xr) {
				console.error('XR is not supported in this browser, did you forget to call Engine.getImmersiveSupport()?');

				this.onExitImmersive();

				return;
			}

			await this.startXR(mode as XRMode, domOverlay);
		} else {
			await this.startLegacyImmersive(mode as LegacyImmersiveMode, domOverlay);
		}

		if (!this.immersiveMode) {
			console.error('Failed to start immersive session');

			this.onExitImmersive();
		}
	}

	/** Exits immersive mode */
	async exitImmersive() {
		await this.immersiveSession?.end();
		this.onExitImmersive(); // For legacy immersive sessions, where end event is not fired
	}

	/**
		This is called when scene has finished starting up.
		Overide to get this call from outside.

		XXX: It would probably make more sense to have this callback in the Scene class.
	*/
	// eslint-disable-next-line class-methods-use-this
	sceneStarted() {}

	/** Stops the engine by pausing the engine and calling Scene.end() method.
		Component.onEnd(context,engine) method will be called for all components.
		Subsequent call to run() will start the engine again. */
	stop() {
		this.running = false;
		this.pause();
		this.input.stop();

		if (this.scene.started) {
			this.scene.end(this.context, this);
		}
	}

	/** Pauses the engine, call run to start it again. */
	pause() {
		this.running = false;
		void this.immersiveSession?.end();
		this.pauseInline();
		this.input.pause();
	}

	/** Toggles engine pause */
	togglePause() {
		if (!this.running) {
			this.run();
		} else {
			this.pause();
		}
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
	// eslint-disable-next-line class-methods-use-this
	exitFullscreen() {
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
	startIdle(fps = 1.0) {
		this.options.requestedFPS = fps;
	}

	/**
		Stop idling and return to normal fps
	*/
	stopIdle() {
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

	/**
	 *
	 */
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

	// eslint-disable-next-line class-methods-use-this
	/**
	 *
	 */
	resize() {
		// Legacy
	}

	/** Helper function for displaying renderer statistics. */
	stats() {
		if (!this.scene) {
			return;
		}

		const organizer = this.scene.organizer;

		console.log('=============== Statistics =====================');
		console.log(`  Visible renderers (opaque/transparent): ${organizer.opaqueRenderers.count}/${organizer.transparentRenderers.count}`);
		console.log('================================================');
	}

	/**
	 *
	 */
	renderDebugInfo() {
		const organizer = this.scene.organizer;

		if (!this.debugCTX) {
			const canvas = document.createElement('canvas');

			canvas.width = this.debugWidth;
			canvas.height = this.debugWidth / 2;

			canvas.style.position = 'absolute';
			canvas.style.top = '0';
			canvas.style.zIndex = '100';
			canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

			const parent = this.context.canvas.parentNode;

			parent.insertBefore(canvas, parent.firstChild);

			this.debugCTX = canvas.getContext('2d');
		}

		if (this.debugCTX && this.debugCount < 1) {
			const ctx = this.debugCTX;

			ctx.clearRect(0, 0, this.debugWidth, this.debugWidth / 2);
			ctx.font = 'Normal 20px Arial';
			ctx.fillStyle = 'rgba(240,240,240,0.75)';
			ctx.fillText('FPS: ' + this.fps.getAverage().toFixed(2), 10, 20);
			ctx.font = 'Normal 12px Arial';
			ctx.fillText('Renderers (opaque / transparent): ' + organizer.opaqueRenderers.count + ' / ' + organizer.transparentRenderers.count, 10, 60);

			ctx.fillText('RequestedFPS: ' + this.options.requestedFPS, this.debugWidth / 2, 45);

			const gl = this.context.gl;
			const renderer = gl.getParameter(gl.RENDERER);

			ctx.fillText(renderer, 10, 105);
			this.debugFPS.push(this.fps.getAverage().toFixed(2));

			if (this.debugFPS.length > 60) {
				this.debugFPS.shift();
			}

			const x = this.debugWidth / 2;
			const y = 25;

			for (let i = 0; i < this.debugFPS.length; i++) {
				if (this.debugFPS[i] < 20) {
					ctx.fillStyle = '#FF0000';
				} else if (this.debugFPS[i] < 30) {
					ctx.fillStyle = '#f6921e';
				 } else {
					ctx.fillStyle = '#00FF00';
				}

				ctx.fillRect(x + (i * 2), y - (this.debugFPS[i] / 60) * 20, 2, 2);
			}

			this.debugCount = Math.max(3, Math.floor(this.fps.getAverage() / 2));
		}

		this.debugCount--;
	}

	/**
	 *
	 */
	_captureScreenshot() {
		const shot = (this.context.gl.canvas as HTMLCanvasElement).toDataURL();
		if (shot && this.onScreenshotCaptured) {
			this.options.captureScreenshot = false;
			this.onScreenshotCaptured(shot);
		}
	}

	/**
	 *
	 */
	captureScreenshot(callback) {
		if (typeof callback === 'function') {
			this.options.captureScreenshot = true;
			this.onScreenshotCaptured = callback;
		}
	}
}

globalThis.Engine = Engine;
export default Engine;
