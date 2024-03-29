import BaseTexture, { TextureOptions } from 'rendering/materials/BaseTexture';
import RenderingContext from '../RenderingContext';
import { merge } from '../../Helpers';

/**
 * CubeTexture for using samplerCube type samplers in shaders
 */
class CubeTexture extends BaseTexture {
	static FRONT = 0;
	static BACK = 1;
	static LEFT = 2;
	static RIGHT = 3;
	static BOTTOM = 4;
	static TOP = 5;

	glTexture: any;
	name: any;
	images: any;

	constructor(private context?: RenderingContext) {
		super();

		this.glTexture = null;
		this.name = false;		///< Texture name assigned by manager
		this.anisotropic = true;
		this.anisotropyFilter = 4; // 4x filtering by default
		this.images = {};
		this.options = merge(this.options, {
			flipY: true,
			magFilter: 'linear',
			minFilter: 'linear',
			noConvertColorSpace: false,
			wrapS: 'clamp',
			wrapT: 'clamp',
		});

		if (context)
			this.create(context);
	}

	type(): any {
		return "CubeTexture";
	}

	excluded(): any {
		return super.excluded().concat(["glTexture"]);
	}

	bind(context): any {
		if (!this.loaded) {
			context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, null);
			return;
		}
		context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, this.glTexture);
	}

	unbind(context): any {
		context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, null);
	}

	getGLCubeFace(context, face): any {
		var gl = context.gl;
		switch (face) {
			case CubeTexture.FRONT:  return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
			case CubeTexture.BACK:   return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
			case CubeTexture.LEFT:   return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
			case CubeTexture.RIGHT:  return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
			case CubeTexture.TOP:    return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
			case CubeTexture.BOTTOM: return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
		}
		return null;
	}

	create(context): any {
		this.anisotropy(context);
		this.glTexture = context.gl.createTexture();

		var gl = context.gl;
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);

		this.applyOptions(context, gl.TEXTURE_CUBE_MAP);

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}

	setFace(context, face, inputImage, noResize = false): any {
		if (this.glTexture === false)
			this.create(context);

		if (!this.glTexture)
			throw "Unable to update cube texture. glTexture not available.";

		var image = inputImage;
		if (face in this.images) {
			delete this.images[face].image;
		}
		this.images[face] = { image, noResize };

		face = this.getGLCubeFace(context, face);
		if (!face)
			throw "Not a valid CubeTexture face.";

		if (!noResize)
			image = this.resizeToPowerOfTwo(inputImage);
		vec2.set(this.size, image.width, image.height);

		var gl = context.gl;
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
		gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

		this.loaded = true;
		if ((this.size[0] & (this.size[0] - 1)) != 0 ||
			(this.size[1] & (this.size[1] - 1)) != 0) {
			console.warn(`Created a not power of 2 texture: ${this.name} (${this.size[0]}x${this.size[1]})`);
		}
	}

	setOptions(options: TextureOptions) {
		super.setOptions(options);

		if (this.loaded && this.context) {
			const gl = this.context.gl;
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
			this.applyOptions(this.context, gl.TEXTURE_CUBE_MAP);

			for (var face in this.images) {
				var item = this.images[face];
				this.setFace(this.context, parseInt(face), item.image, item.noResize);
			}

			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		}
	}

	onContextRestored(context) {
		this.glTexture = null;
		this.create(context);
		this.loaded = false;
		for (var face in this.images) {
			var item = this.images[face];
			this.setFace(context, parseInt(face), item.image, item.noResize);
		}
	}
}

globalThis.CubeTexture = CubeTexture;
export default CubeTexture;
