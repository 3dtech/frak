import Serializable from 'scene/Serializable';
import RenderingContext from '../RenderingContext';
import { merge } from 'Helpers';

type MagFilter = 'linear' | 'nearest';
type GLMagFilter = WebGL2RenderingContext['NEAREST'] | WebGL2RenderingContext['LINEAR'];
type MinFilter = 'linear' | 'nearest' | 'nearestMipmapNearest' | 'nearestMipmapLinear' | 'linearMipmapNearest' | 'linearMipmapLinear';
type GLMinFilter = WebGL2RenderingContext['NEAREST'] | WebGL2RenderingContext['LINEAR'] | WebGL2RenderingContext['NEAREST_MIPMAP_NEAREST'] | WebGL2RenderingContext['NEAREST_MIPMAP_LINEAR'] | WebGL2RenderingContext['LINEAR_MIPMAP_NEAREST'] | WebGL2RenderingContext['LINEAR_MIPMAP_LINEAR'];
type Wrap = 'clamp' | 'repeat' | 'mirror';
type GLWrap = WebGL2RenderingContext['CLAMP_TO_EDGE'] | WebGL2RenderingContext['REPEAT'] | WebGL2RenderingContext['MIRRORED_REPEAT'];

interface TextureOptions {
	flipY?: boolean;
	magFilter?: MagFilter;
	minFilter?: MinFilter;
	noConvertColorSpace?: boolean;
	wrapS?: Wrap;
	wrapT?: Wrap;
}

/**
 * Generic Texture interface
 */
class BaseTexture extends Serializable {
	size: any;
	loaded: any;
	anisotropic: any;
	anisotropyFilter: any;
	extTextureFilterAnisotropic: any;
	/** Legacy, use options.wrap[S|T] = 'clamp' instead */
	clampToEdge = false;
	/** Legacy, use options.minFilter instead */
	mipmapped = false;
	options: TextureOptions = {
		flipY: true,
		magFilter: 'nearest',
		minFilter: 'nearest',
		noConvertColorSpace: false,
		wrapS: 'repeat',
		wrapT: 'repeat',
	};

	constructor() {
		super();
		this.size = vec2.create();
		this.loaded = false;
	}

	type(): any {
		return "BaseTexture";
	}

	excluded(): string[] {
		return (super.excluded() as string[]).concat(['loaded', 'size']);
	}

	/**
	 * Binds this texture
	 * @param context RenderingContext
	 */
	bind(context): any {}

	/**
	 * Unbinds this texture
	 * @param context RenderingContext
	 */
	unbind(context): any {}

	protected applyOptions(context: RenderingContext, target: WebGL2RenderingContext['TEXTURE_2D'] | WebGL2RenderingContext['TEXTURE_CUBE_MAP']) {
		const gl = context.gl;
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.options.flipY);

		if (this.options.noConvertColorSpace) {
			gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
		} else {
			gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.BROWSER_DEFAULT_WEBGL);
		}

		let wrapS: GLWrap = gl.REPEAT;
		let wrapT: GLWrap = gl.REPEAT;

		if (this.clampToEdge) {
			wrapS = gl.CLAMP_TO_EDGE;
			wrapT = gl.CLAMP_TO_EDGE;
		} else {
			if (this.options.wrapS === 'clamp') {
				wrapS = gl.CLAMP_TO_EDGE;
			} else if (this.options.wrapS === 'mirror') {
				wrapS = gl.MIRRORED_REPEAT;
			}

			if (this.options.wrapT === 'clamp') {
				wrapT = gl.CLAMP_TO_EDGE;
			} else if (this.options.wrapT === 'mirror') {
				wrapT = gl.MIRRORED_REPEAT;
			}
		}

		gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrapS);
		gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrapT);

		// Apply mipmapping and filtering settings
		if (this.mipmapped) {
			// Legacy
			gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		} else {
			let magFilter: GLMagFilter = gl.NEAREST;
			if (this.options.magFilter === 'linear') {
				magFilter = gl.LINEAR;
			}

			gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, magFilter);

			this.mipmapped = !(this.options.minFilter === 'nearest' || this.options.minFilter === 'linear');

			let minFilter: GLMinFilter = gl.NEAREST;
			if (this.options.minFilter === 'linear') {
				minFilter = gl.LINEAR;
			} else if (this.options.minFilter === 'nearestMipmapNearest') {
				minFilter = gl.NEAREST_MIPMAP_NEAREST;
			} else if (this.options.minFilter === 'nearestMipmapLinear') {
				minFilter = gl.NEAREST_MIPMAP_LINEAR;
			} else if (this.options.minFilter === 'linearMipmapNearest') {
				minFilter = gl.LINEAR_MIPMAP_NEAREST;
			} else if (this.options.minFilter === 'linearMipmapLinear') {
				minFilter = gl.LINEAR_MIPMAP_LINEAR;
			}

			gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, minFilter);
		}
	}

	setOptions(options: TextureOptions) {
		merge(this.options, options);
	}

	/**
	 * Downsamples the image to a nearest power of two size
	 * @param image Image
	 */
	resizeToPowerOfTwo(image): any {
		function isPowerOfTwo(x) {
			return (x & (x - 1)) == 0;
		}

		// function nextHighestPowerOfTwo(x) {
		// 	return Math.max(Math.min(Math.pow(2, Math.ceil(Math.log(x)/Math.log(2))), 2048), 1);
		// }

		function nextLowestPowerOfTwo(x) {
			return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(x)/Math.log(2))), 2048), 1);
		}

		if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {
			var canvas = document.createElement("canvas");
			canvas.width = nextLowestPowerOfTwo(image.width);
			canvas.height = nextLowestPowerOfTwo(image.height);
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0, image.width, image.height, 0.0, 0.0, canvas.width, canvas.height);
			image = canvas;
		}
		return image;
	}

	anisotropy(context) {
		if (context.engine) {
			if (!context.engine.options.anisotropicFiltering)
				this.anisotropic = false;
			else
				this.anisotropyFilter = context.engine.options.anisotropicFiltering;
		}

		if (this.anisotropic) {
			this.extTextureFilterAnisotropic = context.gl.getExtension('EXT_texture_filter_anisotropic');
			if (!this.extTextureFilterAnisotropic) {
				this.anisotropic = false;
			}
			else {
				var maxAnisotropy = context.gl.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
				this.anisotropyFilter = Math.min(this.anisotropyFilter, maxAnisotropy);
			}
		}
	}

}

globalThis.BaseTexture = BaseTexture;

export { BaseTexture as default, TextureOptions };
