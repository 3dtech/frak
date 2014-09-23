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

	createResource: function(textureDescriptor) {
		texture = new Texture(this.context);
		texture.name = textureDescriptor.source;
		return texture;
	},

	loadResource: function(textureDescriptor, textureResource, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(textureDescriptor);
		var scope = this;
		Logistics.getImage(descriptor.getFullPath(), function(image) {
			textureResource.setImage(scope.context, image);
			delete image;
			loadedCallback(descriptor, textureResource);
		}).
		error(function() {
			failedCallback(descriptor);
		});
	}
});