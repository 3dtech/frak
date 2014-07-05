/** Texture descriptor is used for describing texture sources */
var TextureDescriptor=Descriptor.extend({
	/** Constructor. If source is not given a new texture is created with given width and height.
		@param source Path to texture [optional]
		@param width Width of texture. If given and loaded texture has different width, it will be resized [optional]
		@param height Height of texture. If given and loaded texture has different height, it will be resized [optional] */
	init: function(source, width, height) {
		this._super();
		this.source = source;
		this.width = width;
		this.height = height;
	},

	type: function() {
		return "TextureDescriptor";
	},

	equals: function(other) {
		if(!this._super(other)) return false;
		return this.source==other.source && this.width==other.width && height==other.height;
	}
});