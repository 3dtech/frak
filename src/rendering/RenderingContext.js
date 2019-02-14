/** Wraps webgl rendering context of canvas */
var RenderingContext = FrakClass.extend({
	/** Constructor
		@param canvas The canvas element that provides rendering context
	*/
	init: function(canvas, contextOptions, errorCallback, version) {
		// this.version = 0;
		// if (typeof window !== 'undefined' && !('WebGLRenderingContext' in window))
		// 	throw 'Unable to create rendering context, because browser doesn\'t support WebGL';

		if (typeof canvas === 'string' && typeof document !== 'undefined') {
			canvas = document.getElementById(canvas);
		}

		if (typeof window !== 'undefined' && window.jQuery && canvas instanceof jQuery) {
			canvas = canvas[0];
		}

		this.version = version;
		if (this.version === 'auto') {
			if ('WebGL2RenderingContext' in window) {
				this.version = 'webgl2';
			} else {
				this.version = 'webgl';
				if (!('WebGLRenderingContext' in window)) {
					throw 'Unable to create rendering context, because browser doesn\'t support WebGL';
				}
			}
		}

		if (!canvas)
			throw 'RenderingContext requires a canvas element';

		this.canvas = canvas;

		if (typeof WebGLDebugUtils !== 'undefined') {
			this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
			this.canvas.setRestoreTimeout(2000);
		}

		contextOptions = contextOptions || { alpha: false };

		// Try to get rendering context for WebGL
		if (this.version === 'webgl2') {
			this.gl = this.canvas.getContext('webgl2', contextOptions);
			if (!this.gl && version === 'auto') this.version = 'webgl';
		}
		if (this.version === 'webgl') {
			this.gl = this.canvas.getContext('webgl', contextOptions);
			if (!this.gl) this.gl = this.canvas.getContext('experimental-webgl', contextOptions);
			if (!this.gl) this.gl = this.canvas.getContext('moz-webgl', contextOptions);
			if (!this.gl) this.gl = this.canvas.getContext('webkit-3d', contextOptions);
		}
		// this.gl = this.canvas.getContext("webgl2", contextOptions);
		// this.version = this.gl ? 2 : 1;
		// if (!this.gl) this.gl = this.canvas.getContext("webgl", contextOptions);
		// if (!this.gl) this.gl = this.canvas.getContext("experimental-webgl", contextOptions);
		// if (!this.gl) this.gl = this.canvas.getContext("moz-webgl", contextOptions);
		// if (!this.gl) this.gl = this.canvas.getContext("webkit-3d", contextOptions);

		// Acquiring context failed
		if (!this.gl) {
			var hideError = false;
			if (FRAK.isFunction(errorCallback))
				hideError = errorCallback();

			if (!hideError && typeof document !== 'undefined') {
				var msg = document.createElement('div');
				msg.style.position = 'relative';
				msg.style.zIndex = 100;
				msg.style.backgroundColor = 'red';
				msg.style.padding = '8px';
				msg.textContent = 'WebGL seems to be unavailable in this browser.';
				var parent = canvas.parentNode;
				parent.insertBefore(msg, parent.firstChild);
			}

			throw 'Failed to acquire GL context from canvas';
		}

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
		this.engine = false; ///< Current engine used for rendering
	},

	error: function() {
		if (this.isContextLost())
			throw Error('Context lost');
		var err = this.gl.getError();
		if (err > 0 && typeof(WebGLDebugUtils) !== 'undefined') {
			throw Error('GL_ERROR: ' + WebGLDebugUtils.glEnumToString(err));
		}
		return err;
	},

	isContextLost: function() {
		if (!this.gl)
			return true;
		return this.gl.isContextLost();
	},

	/** Tries to restore the GL state in fresh context. Requires this.engine to be set. */
	restore: function() {
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
		for (var i = 0; i < engine.scene.lights.length; ++i) {
			engine.scene.lights[i].onContextRestored(ctx);
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
});
