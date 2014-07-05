/** Wraps webgl rendering context of canvas */
var RenderingContext=Class.extend({
	/** Constructor
		@param canvas The canvas element that provides rendering context
	*/
	init: function(canvas, contextOptions) {
		if(!("WebGLRenderingContext" in window)) throw "Unable to create rendering context, because browser doesn't support WebGL";
		if(!canvas || canvas.length === 0) throw "RenderingContext requires canvas element";
		this.canvas=canvas;
		contextOptions = contextOptions || { alpha: false };

		// Try to get rendering context for WebGL
		this.gl = canvas[0].getContext("webgl", contextOptions);
		if(!this.gl) this.gl=canvas[0].getContext("experimental-webgl", contextOptions);
		if(!this.gl) this.gl=canvas[0].getContext("moz-webgl", contextOptions);
		if(!this.gl) this.gl=canvas[0].getContext("webkit-3d", contextOptions);
		if(!this.gl) {
			var offset = canvas.offset();
			var msg = $('<div>')
				.css('position', 'relative')
				.css('z-index', 100)
				.css('background-color', 'red')
				.css('padding', 8)
				.text("WebGL seems to be unavailable in this browser.");
			canvas.parent().prepend(msg);
			throw "Failed to acquire GL context from canvas";
		}

		if(typeof WebGLDebugUtils != 'undefined') {
			function throwOnGLError(err, funcName, args) {
				throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName+ JSON.stringify(args);
			}

			this.gl=WebGLDebugUtils.makeDebugContext(this.gl, throwOnGLError);
			console.log("Using WebGLDebugUtils");
		}

		this.gl.enable(this.gl.DEPTH_TEST);

		// Setup viewport
		this.gl.viewport(0, 0, canvas.width(), canvas.height());

		this.modelview=new MatrixStack();		///< Modelview matrix stack
		this.projection=new MatrixStack();	///< Projection matrix stack
		this.light=false; ///< Current light used for rendering (forward rendering only)
		this.shadow=false; ///< Current shadow map (forward rendering only)
		this.camera=false; ///< Current camera used for rendering (used to populate camera uniforms for shaders)
	}
});