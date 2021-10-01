/** Texture descriptor where the source cannot be modified */
var LockedTextureDescriptor = TextureDescriptor.extend({
	/** Constructor. If source is not given a new texture is created with given width and height.
		@param source Path to texture [optional]
		@param width Width of texture. If given and loaded texture has different width, it will be resized [optional]
		@param height Height of texture. If given and loaded texture has different height, it will be resized [optional] */
	init: function(source, width, height) {
		this._super(source, width, height);
		this._source = source;
	},

	type: function() {
		return "LockedTextureDescriptor";
	},

	getFullPath: function() {
		return this._source;
	}
});
