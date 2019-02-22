/**
 * 2D texture instance.
 */
var Texture = BaseTexture.extend({
	/**
	 * Constructor
	 * @param context RenderingContext (optional)
	 */
	init: function(context) {
		this._super(context);

		this.glTexture = null; ///< GL texture ID
		this.name = false;		///< Texture name assigned by manager
		this.mipmapped = true;	///< Set to true for subsequent calls to update, setImage or pasteImage to generate mipmaps
		this.clampToEdge = false;
		this.anisotropic = true;
		this.anisotropyFilter = 4; // 4x filtering by default
		this.image = null;

		if (context)
			this.create(context);
	},

	type: function() {
		return "Texture";
	},

	excluded: function() {
		return this._super().concat(["glTexture"]);
	},

	bind: function(context) {
		if (!this.loaded) {
			context.gl.bindTexture(context.gl.TEXTURE_2D, null);
			return;
		}
		context.gl.bindTexture(context.gl.TEXTURE_2D, this.glTexture);
	},

	unbind: function(context) {
		context.gl.bindTexture(context.gl.TEXTURE_2D, null);
	},

	create: function(context) {
		this.anisotropy(context);
		this.glTexture = context.gl.createTexture();
	},

	/**
	 * Sets the texture to a solid color, (size x size)
	 * @param context RenderingContext
	 * @param color Color of the image
	 * @param size {number} The size of the texture side in pixels
	 */
	clearImage: function(context, color, size) {
		if(this.glTexture === null)
			this.create(context);
		size = size || 1;
		var gl = context.gl;
		gl.bindTexture(context.gl.TEXTURE_2D, this.glTexture);
		var data = new Uint8Array(size * size * 4);
		for (var i=0; i<size*size*4; i+=4) {
			data[i+0] = color[0];
			data[i+1] = color[1];
			data[i+2] = color[2];
			data[i+3] = color[3];
		}
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(context.gl.TEXTURE_2D, null);
		vec2.set(this.size, size, size);
		this.loaded = true;
	},

	/** Updates texture uploading contents of given image to WebGL texture
		@param context RenderingContext instance
		@param position Offset where to copy the given image as instance of vec2
		@param image Image or canvas element */
	pasteImage: function(context, position, image) {
		if (!this.loaded)
			return;
		this.bind(context);
		var gl = context.gl;
		gl.texSubImage2D(gl.TEXTURE_2D, 0,
			position[0]*this.size[0], position[1]*this.size[1],
			gl.RGBA, gl.UNSIGNED_BYTE, image);
		if (this.mipmapped)
			gl.generateMipmap(gl.TEXTURE_2D);
		this.unbind(context);
		this.loaded = true;
	},


	/** Updates texture by uploading new image
		@param context RenderingContext instance
		@param inputImage Image or canvas element */
	setImage: function(context, inputImage, noResize) {
		if (!this.glTexture)
			this.create(context);

		if (!this.glTexture)
			throw "Unable to update texture. glTexture not available.";

		var image = inputImage;
		if (!noResize)
			image = this.resizeToPowerOfTwo(inputImage);
		vec2.set(this.size, image.width, image.height);

		var gl = context.gl;
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		// Apply clamp to edge settings
		if (this.clampToEdge) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}

		// Apply mipmapping and filtering settings
		if (this.mipmapped) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			gl.generateMipmap(gl.TEXTURE_2D);
			if (this.anisotropic) {
				gl.texParameteri(gl.TEXTURE_2D, this.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropyFilter);
			}
		}
		else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
		this.image = image;
		this.loaded = true;

		if ((this.size[0] & (this.size[0] - 1)) != 0 ||
			(this.size[1] & (this.size[1] - 1)) != 0) {
			console.warn('Created a not power of 2 texture: {0} ({1}x{2})'
				.format(this.name, this.size[0], this.size[1]));
		}
	},

	/** @return WebGLUnsignedByteArray with contents of texture */
	getImage: function(context) {
		if(!this.glTexture) throw "Unable to get image. glTexture not available.";
		var gl=context.gl;
		var targetTexture=new TargetTexture(this, context, false);
		targetTexture.bind(context);
		var result=new Uint8Array(this.size[0]*this.size[1]*4);
		context.gl.readPixels(0, 0, this.size[0], this.size[1], gl.RGBA, gl.UNSIGNED_BYTE, result);
		targetTexture.unbind(context);
		return result;
	},

	onContextRestored: function(context) {
		this.glTexture = null;
		this.loaded = false;
		if (this.image) {
			this.setImage(context, this.image);
		}
	}
});
