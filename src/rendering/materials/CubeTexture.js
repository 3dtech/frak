/**
 * CubeTexture for using samplerCube type samplers in shaders
 */
var CubeTexture = BaseTexture.extend({
	/**
	 * Constructor
	 * @param context RenderingContext (optional)
	 */
	init: function(context) {
		console.log('CubeTexture')
		this._super(context);

		this.glTexture = null;
		this.name = false;		///< Texture name assigned by manager
		this.mipmapped = false;	///< Set to true for subsequent calls to update, setImage or pasteImage to generate mipmaps
		this.clampToEdge = true;
		this.anisotropic = true;
		this.anisotropyFilter = 4; // 4x filtering by default
		this.images = {};

		if (context)
			this.create(context);
	},

	type: function() {
		return "CubeTexture";
	},

	excluded: function() {
		return this._super().concat(["glTexture"]);
	},

	bind: function(context) {
		if (!this.loaded) {
			context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, null);
			return;
		}
		context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, this.glTexture);
	},

	unbind: function(context) {
		context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, null);
	},

	getGLCubeFace: function(context, face) {
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
	},

	create: function(context) {
		this.anisotropy(context);
		this.glTexture = context.gl.createTexture();

		var gl = context.gl;
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);

		// Apply clamp to edge settings
		if (this.clampToEdge) {
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}

		// Apply mipmapping and filtering settings
		if (this.mipmapped) {
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
			if (this.anisotropic) {
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, this.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropyFilter);
			}
		}
		else {
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		}

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	},

	setFace: function(context, face, inputImage, noResize) {
		if (this.glTexture === false)
			this.create(context);

		if (!this.glTexture)
			throw "Unable to update cube texture. glTexture not available.";

		var image = inputImage;
		if (face in this.images) {
			delete this.images[face].image;
		}
		this.images[face] = { image: image, noResize: !!noResize };

		face = this.getGLCubeFace(context, face);
		if (!face)
			throw "Not a valid CubeTexture face.";

		if (!noResize)
			image = this.resizeToPowerOfTwo(inputImage);
		vec2.set(this.size, image.width, image.height);

		var gl = context.gl;
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

		this.loaded = true;
		if ((this.size[0] & (this.size[0] - 1)) != 0 ||
			(this.size[1] & (this.size[1] - 1)) != 0) {
			console.warn('Created a not power of 2 texture: {0} ({1}x{2})'
				.format(this.name, this.size[0], this.size[1]));
		}
	},

	onContextRestored: function(context) {
		this.glTexture = null;
		this.create(context);
		this.loaded = false;
		for (var face in this.images) {
			var item = this.images[face];
			this.setFace(context, parseInt(face), item.image, item.noResize);
		}
	}
});

/**
 * CubeTexture face constants
 */
CubeTexture.FRONT = 0;
CubeTexture.BACK = 1;
CubeTexture.LEFT = 2;
CubeTexture.RIGHT = 3;
CubeTexture.BOTTOM = 4;
CubeTexture.TOP = 5;
