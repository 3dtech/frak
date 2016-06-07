/**
 * Cube texture descriptor is used for describing cubemap texture sources
 */
var CubeTextureDescriptor = Descriptor.extend({
	/** Constructor. */
	init: function(sources) {
		this._super();
		this.sources = sources || [];
	},

	type: function() {
		return "CubeTextureDescriptor";
	},

	equals: function(other) {
		if(!this._super(other))
			return false;
		if (this.sources.length != other.sources.length)
			return false;
		for (var i=0; i<this.sources.length; i++)
			if (this.sources[i] != other.sources[i])
				return false;
		return true;
	},

	getFaceFullPath: function(index) {
		if (index<0 || index>this.sources.length)
			throw "CubeTextureDescriptor.getFaceFullPath: index out of bounds";

		// FIXME: this is not the prettiest construction ever
		this.source = this.sources[index];
		var path = this.getFullPath();
		this.source = '';
		return path;
	}
});
