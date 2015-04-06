/** Wraps webgl rendering context of canvas */
var RenderingContext=Class.extend({
	/** Constructor
		@param canvas The canvas element that provides rendering context
	*/
	init: function(canvas, contextOptions) {
		if (!("WebGLRenderingContext" in window))
			throw "Unable to create rendering context, because browser doesn't support WebGL";

		if (typeof(canvas) === 'string') {
			canvas = document.getElementById(canvas);
		}

		if (jQuery && canvas instanceof jQuery) {
			canvas = canvas[0];
		}

		if (!canvas)
			throw "RenderingContext requires a canvas element";

		this.canvas = canvas;
		contextOptions = contextOptions || { alpha: false };

		// Try to get rendering context for WebGL
		this.gl = this.canvas.getContext("webgl", contextOptions);
		if (!this.gl) this.gl = this.canvas.getContext("experimental-webgl", contextOptions);
		if (!this.gl) this.gl = this.canvas.getContext("moz-webgl", contextOptions);
		if (!this.gl) this.gl = this.canvas.getContext("webkit-3d", contextOptions);

		// Acquiring context failed
		if (!this.gl) {
			var msg = document.createElement("div");
			msg.style.position = "relative";
			msg.style.zIndex = 100;
			msg.style.backgroundColor = "red";
			msg.style.padding = "8px";
			msg.textContent = "WebGL seems to be unavailable in this browser.";
			var parent = canvas.parentNode;
			parent.insertBefore(msg, parent.firstChild);
			throw "Failed to acquire GL context from canvas";
		}

		if(typeof WebGLDebugUtils != 'undefined') {
			function throwOnGLError(err, funcName, args) {
				throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName+ JSON.stringify(args);
			}

			this.gl = WebGLDebugUtils.makeDebugContext(this.gl, throwOnGLError);
			console.warn("Using WebGLDebugUtils");
		}

		this.modelview = new MatrixStack();		///< Modelview matrix stack
		this.projection = new MatrixStack();	///< Projection matrix stack
		this.light = false; ///< Current light used for rendering (forward rendering only)
		this.shadow = false; ///< Current shadow map (forward rendering only)
		this.camera = false; ///< Current camera used for rendering (used to populate camera uniforms for shaders)
		this.engine = false; ///< Current engine used for rendering
	}
});