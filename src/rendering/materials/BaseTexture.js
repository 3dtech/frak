/**
 * Generic Texture interface
 */
var BaseTexture = Serializable.extend({
	/**
	 * Constructor
	 * @param context RenderingContext (optional)
	 */
	init: function(context) {
		this._super();
		this.size = vec2.create();
		this.loaded = false;
	},

	type: function() {
		return "BaseTexture";
	},

	excluded: function() {
		return this._super().concat(['loaded', 'size']);
	},

	/**
	 * Binds this texture
	 * @param context RenderingContext
	 */
	bind: function(context) {},

	/**
	 * Unbinds this texture
	 * @param context RenderingContext
	 */
	unbind: function(context) {},

	/**
	 * Downsamples the image to a nearest power of two size
	 * @param image Image
	 */
	resizeToPowerOfTwo: function(image) {
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
	},

	anisotropy: function(context) {
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
});
