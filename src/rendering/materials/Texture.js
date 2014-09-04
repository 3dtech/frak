/** Texture instance. */
var Texture=Serializable.extend({
	/** Creates a texture
		@param context Instance of RenderingContext (optional) */
	init: function(context) {
		this.glTexture=false;
		this.name=false;		///< Texture name assigned by manager
		this.size=false;		///< Texture size
		this.mipmapped=true;	///< Set to true for subsequent calls to update, setImage or pasteImage to generate mipmaps
		this.clampToEdge = false;
		this.loaded=false;

		if (context)
			this.create(context);
	},

	type: function() {
		return "Texture";
	},

	excluded: function() {
		return this._super().concat(["glTexture", "context", "loaded", "size"]);
	},

	create: function(context) {
		this.glTexture=context.gl.createTexture();
	},

	clearImage: function(context, color, size) {
		if(this.glTexture===false)
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
		this.size = [size, size];
		this.loaded = true;
	},

	/** Updates texture uploading contents of given image to WebGL texture
		@param context RenderingContext instance
		@param position Offset where to copy the given image as instance of vec2
		@param image Image or canvas element */
	pasteImage: function(context, position, image) {
		if(!this.loaded) return;
		var gl=context.gl;
		this.bind(context);
		gl.texSubImage2D(gl.TEXTURE_2D, 0, position[0]*this.size[0], position[1]*this.size[1],
                       gl.RGBA, gl.UNSIGNED_BYTE, image);
		if(this.mipmapped) gl.generateMipmap(gl.TEXTURE_2D);
		this.unbind(context);
		this.loaded=true;
	},


	/** Updates texture by uploading new image
		@param context RenderingContext instance
		@param inputImage Image or canvas element */
	setImage: function(context, inputImage) {
		if (this.glTexture===false)
			this.create(context);
		if(!this.glTexture) throw "Unable to update texture. glTexture not available.";
		var gl=context.gl;
		context.gl.bindTexture(context.gl.TEXTURE_2D, this.glTexture);
		var image=this.resizeToPowerOfTwo(inputImage);
		this.size=[image.width, image.height];

		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		// Apply clamp to edge settings
		if (this.clampToEdge) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}

		// Apply mipmapping settings
		if(this.mipmapped) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			gl.generateMipmap(gl.TEXTURE_2D);
		}
		else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		}

		context.gl.bindTexture(context.gl.TEXTURE_2D, null);
		if(image!=inputImage) delete image;
		this.loaded=true;
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

	bind: function(context) {
		if(!this.loaded) return;
		if((this.size[0] & (this.size[0] - 1)) != 0 || (this.size[1] & (this.size[1] - 1)) != 0) {
			// NOT power of two!
			console.log('Not power of 2 texture: ', this.name, " (", this.size[0], "x", this.size[1]);
		}
		context.gl.bindTexture(context.gl.TEXTURE_2D, this.glTexture);
	},

	unbind: function(context) {
		if(!this.loaded) return;
		context.gl.bindTexture(context.gl.TEXTURE_2D, null);
	},

	resizeToPowerOfTwo: function(image) {
		function isPowerOfTwo(x) {
				return (x & (x - 1)) == 0;
		}

		function nextHighestPowerOfTwo(x) {
			return Math.max(Math.min(Math.pow(2, Math.ceil(Math.log(x)/Math.log(2))), 2048), 1);
		}

		function nextLowestPowerOfTwo(x) {
			return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(x)/Math.log(2))), 2048), 1);
		}

		if(!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {
			var canvas = document.createElement("canvas");
			canvas.width = nextLowestPowerOfTwo(image.width);
			canvas.height = nextLowestPowerOfTwo(image.height);
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0, image.width, image.height, 0.0, 0.0, canvas.width, canvas.height);
			image = canvas;
		}
		return image;
	}
});