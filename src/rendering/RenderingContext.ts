import MatrixStack from 'rendering/MatrixStack';
import RendererComponent from 'scene/components/RendererComponent';
import TextComponent from 'scene/components/TextComponent';
import FRAK from 'Helpers';
import Engine from 'engine/Engine';
import Shader from "./shaders/Shader";
import DefinitionsHelper from "./DefinitionsHelper";

interface ShaderCache {
	[shaderHash: number]: {
		[definitionsHash: number]: Shader;
	};
}

type Canvas = HTMLCanvasElement | string | null;

/** Wraps webgl rendering context of canvas */
class RenderingContext {
	canvas: HTMLCanvasElement;
	gl: WebGL2RenderingContext;
	modelview: MatrixStack;
	projection: MatrixStack;
	light: any;
	shadow: any;
	camera: any;
	engine: Engine;
	shaderCache: ShaderCache = {};

	/** Constructor
		@param canvas The canvas element that provides rendering context
	*/
	constructor(canvas: Canvas, engine: Engine, contextOptions?: WebGLContextAttributes, errorCallback?) {
		if (typeof canvas === 'string' && typeof document !== 'undefined') {
			canvas = document.getElementById(canvas) as HTMLCanvasElement;
		}

		if (typeof window !== 'undefined' && (window as any).jQuery && canvas instanceof (window as any).jQuery) {
			canvas = (canvas as any)[0];
		}

		if (!('WebGL2RenderingContext' in window)) {
			throw 'Unable to create rendering context, because browser doesn\'t support WebGL2';
		}

		if (!canvas)
			throw 'RenderingContext requires a canvas element';

		this.canvas = canvas as HTMLCanvasElement;

		if (typeof WebGLDebugUtils !== 'undefined') {
			this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
			(this.canvas as any).setRestoreTimeout(2000);
		}

		// Try to get rendering context for WebGL
		const gl = this.canvas.getContext('webgl2', Object.assign({
			xrCompatible: true,
		}, contextOptions));

		// Acquiring context failed
		if (!gl) {
			var hideError = false;
			if (FRAK.isFunction(errorCallback))
				hideError = errorCallback();

			if (!hideError && typeof document !== 'undefined') {
				var msg = document.createElement('div');
				msg.style.position = 'relative';
				msg.style.zIndex = '100';
				msg.style.backgroundColor = 'red';
				msg.style.padding = '8px';
				msg.textContent = 'WebGL seems to be unavailable in this browser.';
				var parent = this.canvas.parentNode;
				parent!.insertBefore(msg, parent!.firstChild);
			}

			throw 'Failed to acquire GL context from canvas';
		}

		this.gl = gl;

		if (typeof(WebGLDebugUtils) !== 'undefined') {
			this.gl = WebGLDebugUtils.makeDebugContext(
				this.gl,
				function throwOnGLError(err, funcName, args) {
					throw WebGLDebugUtils.glEnumToString(err) +
					' was caused by call to: ' + funcName + JSON.stringify(args);
				});
			console.warn('Using WebGLDebugUtils');
		}

		this.modelview = new MatrixStack(); ///< Modelview matrix stack
		this.projection = new MatrixStack(); ///< Projection matrix stack
		this.light = false; ///< Current light used for rendering (forward rendering only)
		this.shadow = false; ///< Current shadow map (forward rendering only)
		this.camera = false; ///< Current camera used for rendering (used to populate camera uniforms for shaders)
		this.engine = engine; ///< Current engine used for rendering
	}

	selectShader(baseShader: Shader, definitions: DefinitionsHelper): Shader {
		if (!this.shaderCache[baseShader.hash]) {
			this.shaderCache[baseShader.hash] = {};
		}

		if (!this.shaderCache[baseShader.hash][definitions.hash]) {
			const shader = new Shader(this, baseShader.descriptor);
			shader.hash ^= shader.definitions.hash;	// Remove old definitions hash
			shader.definitions = baseShader.definitions.clone();	// In case there were definitions not in the descriptor
			shader.hash ^= shader.definitions.hash;	// Re-add hash
			shader.addVertexShader(baseShader.vertexShader.code);
			shader.addFragmentShader(baseShader.fragmentShader.code);
			for (const definition of definitions.definitions) {
				const [name, value] = definition.split(' ');
				shader.addDefinition(name, value);
			}

			this.shaderCache[baseShader.hash][definitions.hash] = shader;
		}

		return this.shaderCache[baseShader.hash][definitions.hash];
	}

	getShaderSnippet(name: string): string {
		return this.engine.assetsManager.shadersManager.getSnippet(name);
	}

	error(): any {
		if (this.isContextLost())
			throw Error('Context lost');
		var err = this.gl.getError();
		if (err > 0 && typeof(WebGLDebugUtils) !== 'undefined') {
			throw Error('GL_ERROR: ' + WebGLDebugUtils.glEnumToString(err));
		}
		return err;
	}

	isContextLost(): any {
		if (!this.gl)
			return true;
		return this.gl.isContextLost();
	}

	/** Tries to restore the GL state in fresh context. Requires this.engine to be set. */
	restore() {
		if (!this.engine)
			return false;

		var contextLost = this.gl.getError(); // Remove the GL_CONTEXT_LOST_WEBGL error
		var ctx = this;
		var engine = this.engine;

		// Restore shaders
		var texturesManager = engine.assetsManager.texturesManager;
		for (var i in texturesManager.cache) {
			var texture = texturesManager.cache[i];
			texture.onContextRestored(ctx);
		}

		// Restore geometry
		var rootNode = engine.scene.root;
		rootNode.onEachChildComponent(function (component) {
			if (component instanceof RendererComponent ||
				component instanceof TextComponent)
				component.onContextRestored(ctx);
		});

		// Restore lights
		for (var j = 0; j < engine.scene.lights.length; ++j) {
			engine.scene.lights[j].onContextRestored(ctx);
		}

		// Restore fallback textures
		engine.WhiteTexture.glTexture = null;
		engine.WhiteTexture.loaded = false;
		engine.WhiteTexture.clearImage(ctx, [0xFF, 0xFF, 0xFF, 0xFF]);

		// Reset global fallback textures
		if (fallbackTexture)
			fallbackTexture.onContextRestored(ctx);

		if (fallbackCubeTexture)
			fallbackCubeTexture.onContextRestored(ctx);

		// Restore render targets and render stages
		if (engine.scene && engine.scene.cameraComponent)
			engine.scene.cameraComponent.onContextRestored(ctx);

		// Restore shaders
		var shadersManager = engine.assetsManager.shadersManager;
		for (var i in shadersManager.cache) {
			var shader = shadersManager.cache[i];
			shader.onContextRestored(ctx);
		}

		return true;
	}
}

globalThis.RenderingContext = RenderingContext;
export { RenderingContext as default, Canvas };
