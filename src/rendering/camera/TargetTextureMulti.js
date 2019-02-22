/** Render target with multiple draw buffers */
var TargetTextureMulti = RenderTarget.extend({
	init: function(context, size, options) {
		this.options = FRAK.extend({
			dataType: 'float', // possible values: float, unsigned
			filtering: 'linear', // possible values: linear, nearest
			depth: false,
			stencil: false,
			numTargets: 2
		}, options);

		this.extDrawBuffers = null;
		this.extTextureFloat = null;
		this.extTextureHalfFloat = null;
		this.extTextureFloatLinear = null;
		this.extTextureHalfFloatLinear = null;

		if (this.options.numTargets < 1)
			throw('TargetTextureMulti: Must have at least one color target.');

		// Test for draw_buffers
		this.extDrawBuffers = context.gl.getExtension('WEBGL_draw_buffers');
		if (!this.extDrawBuffers)
			throw('TargetTextureMulti: WEBGL_draw_buffers not available.');

		// Test for depth texture, if needed
		if (this.options.depth) {
			var ext = context.gl.getExtension('WEBGL_depth_texture') || context.gl.depthTextureExt;
			if (!ext) ext = context.gl.getExtension('WEBKIT_WEBGL_depth_texture');
			if (!ext)
				throw('TargetTextureMulti: Depth texture reqeusted, but not available.');
		}

		// Check draw buffer limits
		this.maxColorAttachments = context.gl.getParameter(this.extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL);
		this.maxDrawBuffers = context.gl.getParameter(this.extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL);
		if (this.options.numTargets > this.maxDrawBuffers) {
			throw('TargetTextureMulti: Too many targets requested. System only supports {0} draw buffers.'.format(this.maxDrawBuffers));
		}

		// Test for floating point support
		if (this.options.dataType == 'float') {

			if (context.isWebGL2()) {
				this.extColorFloat = context.gl.getExtension("EXT_color_buffer_float");
				this.extTextureHalfFloat = context.gl.HALF_FLOAT;
				this.extTextureFloat = context.gl.FLOAT;
			}
			else {
				this.extTextureHalfFloat = context.gl.getExtension('OES_texture_half_float');
				this.extTextureFloat = context.gl.getExtension('OES_texture_float');
			}

			if (!this.extTextureFloat && !this.extTextureHalfFloat)
				throw('TargetTextureMulti: Floating point textures are not supported on this system.');

			// Test for linear filtering of floating point textures
			if (this.options.filtering == 'linear') {
				this.extTextureFloatLinear = context.gl.getExtension('OES_texture_float_linear');
				this.extTextureHalfFloatLinear = context.gl.getExtension('OES_texture_half_float_linear');
				if (!this.extTextureFloatLinear && !this.extTextureHalfFloatLinear)
					throw('TargetTextureMulti: Linear filtering requested, but not available.');
			}
		}

		this._super(size);

		this.targets = [];
		this.depth = null;
		this.frameBuffer = null;

		this.build(context);
	},

	type: function() {
		return 'TargetTextureMulti';
	},

	setSize: function(width, height) {
		this._super(width, height);
		this.rebuild = true;
	},

	getDataType: function(context) {
		if (this.options.dataType == 'unsigned')
			return context.gl.UNSIGNED_BYTE;


		if (this.extTextureHalfFloat) {
			// System only supports half precision floating point textures
			if (context.isWebGL2()) {
				return context.gl.HALF_FLOAT;
			}
			else if (!this.extTextureFloat) {
				return this.extHalfFloat.HALF_FLOAT_OES;
			}

			// iOS says it supports FLOAT, but in reality it requires it to be HALF_FLOAT
			if (navigator && navigator.platform) {
				switch (navigator.platform) {
					case 'iPad':
					case 'iPod':
					case 'iPhone':
						return this.extTextureHalfFloat.HALF_FLOAT_OES;
					default:
						return context.gl.FLOAT;
				}
			}
		}
		return context.gl.FLOAT;
	},

	getTextureFilter: function(context) {
		if (this.options.dataType == 'float') {
			if (this.extTextureFloatLinear || this.extTextureHalfFloatLinear)
				return context.gl.LINEAR;
			return context.gl.NEAREST;
		}
		return context.gl.NEAREST;
	},

	createBuffer: function(context, filtering, dataType, format) {
		var gl = context.gl;
		var texture = new Texture(context);

		if (!filtering)
			filtering = this.getTextureFilter(context);

		if (!dataType)
			dataType = this.getDataType(context);

		if (!format)
			format = gl.RGBA;

		gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
		gl.texImage2D(gl.TEXTURE_2D, 0, format, this.size[0], this.size[1], 0, format, dataType, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		texture.loaded = true;
		return texture;
	},

	build: function(context) {
		var gl = context.gl;
		this.frameBuffer = gl.createFramebuffer();

		// Setup render buffer or texture for depth
		if (this.options.depth) {
			this.depth = this.createBuffer(context, gl.NEAREST, gl.UNSIGNED_SHORT, gl.DEPTH_COMPONENT);
		} else {
			this.depth = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
			if (this.options.stencil)
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]);
			else
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
			gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		}

		// Setup color attachments
		var buffers = [];
		for (var i=0; i<this.options.numTargets; i++) {
			var texture = this.createBuffer(context);
			this.targets.push(texture);
			buffers.push(this.extDrawBuffers.COLOR_ATTACHMENT0_WEBGL + i);
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

		// Attach depth
		if (this.options.depth) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
		} else {
			if (this.options.stencil)
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.depth);
			else
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
		}

		// Attach color
		for (var i=0; i<this.targets.length; i++) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, this.extDrawBuffers.COLOR_ATTACHMENT0_WEBGL + i, gl.TEXTURE_2D, this.targets[i].glTexture, 0);
		}

		this.checkStatus(context);
		this.extDrawBuffers.drawBuffersWEBGL(buffers);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	},

	checkStatus: function(context) {
		var gl = context.gl;
		var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		switch (status) {
			case gl.FRAMEBUFFER_COMPLETE:
				return true;
			case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				throw("TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
			case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				throw("TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
			case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				throw("TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
			case gl.FRAMEBUFFER_UNSUPPORTED:
				throw("TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
			default:
				throw("TargetTextureMulti: Incomplete framebuffer: " + status);
		}
	},

	bind: function(context, doNotClear, clearColor, clearFlags) {
		var gl = context.gl;

		if (this.rebuild) {
			this.rebuild = false;

			// Resize color targets
			for (var i=0; i<this.targets.length; i++) {
				var target = this.targets[i];
				gl.bindTexture(gl.TEXTURE_2D, target.glTexture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
				gl.bindTexture(gl.TEXTURE_2D, null);
			}

			// Resize depth target
			if (this.options.depth) {
				gl.bindTexture(gl.TEXTURE_2D, this.depth.glTexture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.size[0], this.size[1], 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
				gl.bindTexture(gl.TEXTURE_2D, null);
			}
			else {
				gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
				if (this.options.stencil)
					gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]);
				else
					gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
				gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			}
		}

		doNotClear = (doNotClear === true);
		clearColor = (clearColor instanceof Color) ? clearColor : false;
		if (!clearColor) {
			if (context.camera)
				clearColor = context.camera.backgroundColor;
			else
				doNotClear = true;
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

		this._super(context);

		if (!doNotClear) {
			gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
			gl.clearDepth(1.0);

			var flags = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
			if (this.options.stencil) {
				gl.clearStencil(0);
				flags |= gl.STENCIL_BUFFER_BIT;
			}
			if (clearFlags)
				flags = clearFlags;
			gl.clear(flags);
		}
	},

	unbind: function(context) {
		this._super(context);
		context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, null);
	}
});
