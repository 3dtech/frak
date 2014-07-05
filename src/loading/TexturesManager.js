/** External texture instance. */
var TexturesManager=Manager.extend({
	/** Creates a texture
		@param context Instance of RenderingContext */
	init: function(context) {
		this._super();
		this.context=context;
	},

	/** Adds new texture descriptor to loading queue. This is a helper
		function to load textures simply by providing path */
	add: function(source) {
		var d=new TextureDescriptor(source);
		return this.addDescriptor(d);
	},

	createResource: function(textureDescriptor) {
		texture=new Texture(this.context);
		texture.name=textureDescriptor.source;
		return texture;
	},

	loadResource: function(textureDescriptor, textureResource, loadedCallback, failedCallback) {
		var me=this;
		Logistics.getImage(this.sourceCallback(textureDescriptor.getFullPath(), textureDescriptor), function(image) {
			textureResource.setImage(me.context, image);
			delete image;
			loadedCallback(textureDescriptor, textureResource);
		}).
		error(function() {
			failedCallback(textureDescriptor);
		});
	}
});