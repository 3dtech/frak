import RenderTarget from 'rendering/camera/RenderTarget';
import Texture from 'rendering/materials/Texture';
import Color from 'rendering/Color';


class TargetTexture extends RenderTarget {
	texture: any;
	useDepthTexture: any;
	useStencilBuffer: any;
	rebuild: any;
	frameBuffer: any;
	depth: any;

	constructor(sizeOrTexture, context, useDepthTexture?, useStencilBuffer?) {
		var size = sizeOrTexture;
		if (sizeOrTexture instanceof Texture) {
			size = sizeOrTexture.size;
		}
		super(size);
		if (sizeOrTexture instanceof Texture) {
			this.texture = sizeOrTexture;
		}

		this.useDepthTexture = (useDepthTexture === true);
		this.useStencilBuffer = (useStencilBuffer === true);
		this.rebuild = false;

		this.build(context);
	}

	type(): any {
		return 'TargetTexture';
	}

	setSize(width, height): any {
		super.setSize(width, height);
		this.rebuild = true;
	}

	getDataType(context): any {
		return context.gl.UNSIGNED_BYTE;
	}

	getInternalFormat(context): any {
		return context.gl.RGBA;
	}

	getTextureFilter(context): any {
		return context.gl.NEAREST;
	}

	build(context): any {
		var gl = context.gl;
		this.frameBuffer = gl.createFramebuffer();

		// Setup primary color buffer, if not provided
		if (!this.texture) {
			this.texture = new Texture(context);
			gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
			gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		// Setup buffer for depth
		if (this.useDepthTexture) {
			this.depth = new Texture(context);
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

			if (this.useStencilBuffer) {
				gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]);
				gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			}
			else {
				gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
				gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			}
		}

		// Attach targets to framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.glTexture, 0);
		if (this.useDepthTexture) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
		}
		else {
			if (this.useStencilBuffer) {
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.depth);
			}
			else {
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
			}
		}

		this.checkStatus(context);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		this.texture.loaded=true;
	}

	checkStatus(context): any {
		var gl = context.gl;
		var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		switch (status) {
			case gl.FRAMEBUFFER_COMPLETE:
				return true;
			case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				throw("TargetTexture: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
			case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				throw("TargetTexture: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
			case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				throw("TargetTexture: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
			case gl.FRAMEBUFFER_UNSUPPORTED:
				throw("TargetTexture: Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
			default:
				throw("TargetTexture: Incomplete framebuffer: " + status);
		}
	}

	bind(context, doNotClear?, clearColor?, clearFlags?): any {
		var gl = context.gl;

		if (this.rebuild) {
			gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
			gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);

			gl.bindTexture(gl.TEXTURE_2D, null);

			if (this.useDepthTexture) {
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
				if (this.useStencilBuffer)
					gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]);
				else
					gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
				gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			}

			this.rebuild = false;
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
			if (this.useStencilBuffer) {
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

globalThis.TargetTexture = TargetTexture;

export default TargetTexture;
