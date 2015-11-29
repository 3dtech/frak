/** External texture instance. */
var TexturesManager=Manager.extend({
	/**
	 * Constructor
	 * @param renderingContext Instance of RenderingContext
	 * @param assetsPath Default search path for any assets requested
	 */
	init: function(context, assetsPath) {
		this._super(assetsPath);
		this.context = context;
	},

	/** Adds new texture descriptor to loading queue. This is a helper
		function to load textures simply by providing path */
	add: function(source) {
		source = this.sourceCallback(source);
		var d = new TextureDescriptor(source);
		return this.addDescriptor(d);
	},

	/** Adds a new cube texture
		* @param sources Array of 6 image URIs
		* @return CubeTexture
		*/
	addCube: function(sources) {
		if (sources.length != 6)
			throw "TexturesManager.addCube: Cube textures require 6 image URIs";
		var descriptors = [];
		var cube = new CubeTextureDescriptor();
		for (var i=0; i<sources.length; i++) {
			cube.sources.push(this.sourceCallback(sources[i]));
		}
		return this.addDescriptor(cube);
	},

	createResource: function(textureDescriptor) {
		if (textureDescriptor instanceof CubeTextureDescriptor) {
			var texture = new CubeTexture(this.context);
			texture.name = 'Cubemap'; // TODO: name from filenames
			return texture;
		}

		var texture = new Texture(this.context);
		texture.name = textureDescriptor.source;
		return texture;
	},

	loadResource: function(textureDescriptor, textureResource, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(textureDescriptor);
		var scope = this;

		if (textureDescriptor instanceof CubeTextureDescriptor) {
			var faces = [
				CubeTexture.FRONT,
				CubeTexture.BACK,
				CubeTexture.LEFT,
				CubeTexture.RIGHT,
				CubeTexture.BOTTOM,
				CubeTexture.TOP
			];
			(function next() {
				if (faces.length == 0) {
					loadedCallback(descriptor, textureResource);
					return;
				}
				var face = faces.shift();
				Logistics.getImage(descriptor.getFaceFullPath(face), function(image) {
					textureResource.setFace(scope.context, face, image);
					delete image;
					next();
				}).
				error(function() {
					failedCallback(descriptor);
				});
			})();
		}
		else {
			Logistics.getImage(descriptor.getFullPath(), function(image) {
				textureResource.setImage(scope.context, image);
				delete image;
				loadedCallback(descriptor, textureResource);
			}).
			error(function() {
				failedCallback(descriptor);
			});
		}
	}
});
