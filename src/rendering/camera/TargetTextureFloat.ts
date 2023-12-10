import TargetTexture from 'rendering/camera/TargetTexture';
import Texture from 'rendering/materials/Texture';

class TargetTextureFloat extends TargetTexture {
	linear: any;

	constructor(sizeOrTexture, context, useDepthTexture, useNearestFiltering?) {
		var extColorFloat = context.gl.getExtension("EXT_color_buffer_float");
		if (!extColorFloat)
			throw('TargetTextureFloat: Floating point COLOR textures are not supported on this system.');

		super(sizeOrTexture, context, useDepthTexture);

		this.linear = false;
	}

	type(): any {
		return 'TargetTextureFloat';
	}

	getDataType(context): any {
		return context.gl.FLOAT;
	}

	getInternalFormat(context): any {
		return context.gl.RGBA16F;
	}

	getTextureFilter(context): any {
		if (this.linear)
			return context.gl.LINEAR;
		return context.gl.NEAREST;
	}

	build(context) {
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

		this.texture.loaded = true;
	}
}

globalThis.TargetTextureFloat = TargetTextureFloat;
export default TargetTextureFloat;
