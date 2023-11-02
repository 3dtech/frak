import Color from 'rendering/Color';
import RenderTarget from 'rendering/camera/RenderTarget';
import Texture from 'rendering/materials/Texture';
import FRAK from 'Helpers';
import RenderingContext from 'rendering/RenderingContext';

/** Render target with multiple draw buffers */
class TargetTextureMulti extends RenderTarget {
	options: any;
	extDrawBuffers: any;
	extTextureFloat: any;
	extTextureHalfFloat: any;
	extTextureFloatLinear: any;
	extTextureHalfFloatLinear: any;
	maxColorAttachments: any;
	maxDrawBuffers: any;
	targets: any;
	depth: any;
	frameBuffer: any;
	rebuild: any;

	constructor(context, size, options) {
		var extColorFloat = context.gl.getExtension("EXT_color_buffer_float");
		if (!extColorFloat)
			throw('TargetTextureFloat: Floating point COLOR textures are not supported on this system.');

		super(size);

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

		// Check draw buffer limits
		this.maxColorAttachments = context.gl.getParameter(context.gl.MAX_COLOR_ATTACHMENTS);
		this.maxDrawBuffers = context.gl.getParameter(context.gl.MAX_DRAW_BUFFERS);

		if (this.options.numTargets > this.maxDrawBuffers) {
			throw('TargetTextureMulti: Too many targets requested. System only supports {0} draw buffers.'.format(this.maxDrawBuffers));
		}

		this.targets = [];
		this.depth = null;
		this.frameBuffer = null;

		this.build(context);
	}

	type(): any {
		return 'TargetTextureMulti';
	}

	setSize(width, height): any {
		super.setSize(width, height);
		this.rebuild = true;
	}

	getDataType(context): any {
		if (this.options.dataType == 'unsigned')
			return context.gl.UNSIGNED_BYTE;

		return context.gl.FLOAT;
	}

	getInternalFormat(context): any {
		if (this.options.dataType == 'float')
			return context.gl.RGBA16F;
		return context.gl.RGBA;
	}

	getTextureFilter(context): any {
		if (this.options.dataType == 'float') {
			return context.gl.LINEAR;
		}
		return context.gl.NEAREST;
	}

	createBuffer(context, filtering?, dataType?, format?): any {
		var gl = context.gl;
		var texture = new Texture(context);

		if (!filtering)
			filtering = this.getTextureFilter(context);

		if (!dataType)
			dataType = this.getDataType(context);

		if (!format) {
			format = gl.RGBA;
		}

		gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
		gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, format, dataType, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		texture.loaded = true;
		return texture;
	}

	build(context: RenderingContext): any {
		var i;
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
		var COLOR_ATTACHMENT0 = context.gl.COLOR_ATTACHMENT0;
		for (i=0; i<this.options.numTargets; ++i) {
			var texture = this.createBuffer(context);
			this.targets.push(texture);
			buffers.push(COLOR_ATTACHMENT0 + i);
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

		this.checkStatus(context);

		// Attach color
		for (i=0; i<this.targets.length; ++i) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.targets[i].glTexture, 0);
		}

		this.checkStatus(context);
		gl.drawBuffers(buffers);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	checkStatus(context): any {
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
	}

	bind(context, doNotClear?, clearColor?, clearFlags?): any {
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
				gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
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

		super.bind(context);

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
	}

	unbind(context) {
		super.unbind(context);
		context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, null);
	}
}

globalThis.TargetTextureMulti = TargetTextureMulti;
export default TargetTextureMulti;
