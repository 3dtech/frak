var TargetTexture = RenderTarget.extend({
	init: function(sizeOrTexture, context, useDepthTexture) {
		var size = sizeOrTexture;
		if (sizeOrTexture instanceof Texture) {
			size = sizeOrTexture.size;
			this.texture = sizeOrTexture;
		}
		this.useDepthTexture = (useDepthTexture === true);

		this._super(size);

		if (this.useDepthTexture) {
			var depthTextureExt = (
				context.gl.getExtension('WEBGL_depth_texture') ||
				context.gl.getExtension('WEBKIT_WEBGL_depth_texture')
			);
			if (!depthTextureExt)
				throw('TargetTexture: Depth texture reqeusted, but not available.');
		}

		this.build(context);
	},

	type: function() {
		return 'TargetTexture';
	},

	build: function(context) {
		var gl = context.gl;
		this.frameBuffer = gl.createFramebuffer();

		// Setup primary color buffer, if not provided
		if(!this.texture) {
			this.texture=new Texture(context);
			gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.size[0], this.size[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		// Setup buffer for depth
		if (this.useDepthTexture) {
			this.depth=new Texture(context);
			gl.bindTexture(gl.TEXTURE_2D, this.depth.glTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.size[0], this.size[1], 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
		else {
			this.depth = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
			gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		}

		// Attach targets to framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.glTexture, 0);
		if (this.useDepthTexture) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
		}
		else {
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
		}

		this.checkStatus(context);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		this.texture.loaded=true;
	},

	checkStatus: function(context) {
		var gl = context.gl;
		var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		switch (status) {
			case gl.FRAMEBUFFER_COMPLETE:
				return true;
			case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
			case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
			case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
			case gl.FRAMEBUFFER_UNSUPPORTED:
				throw("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
			default:
				throw("Incomplete framebuffer: " + status);
		}
	},

	bind: function(context, doNotClear, clearColor) {
		doNotClear = (doNotClear === true);
		clearColor = (clearColor instanceof Color) ? clearColor : false;
		if (!clearColor) {
			if (context.camera)
				clearColor = context.camera.backgroundColor;
			else
				doNotClear = true;
		}

		context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, this.frameBuffer);

		this._super(context);

		if (!doNotClear) {
			context.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
			context.gl.clearDepth(1.0);
			context.gl.clear(context.gl.COLOR_BUFFER_BIT | context.gl.DEPTH_BUFFER_BIT);
		}
	},

	unbind: function(context) {
		this._super(context);
		context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, null);
	}
});
