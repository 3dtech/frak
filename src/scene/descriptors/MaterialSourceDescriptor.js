/** Material source descriptor is used to keep material source
	that can be loaded with MaterialSourceManager. It loads material
	source from given source path and then goes on to load sources
	necessary to load the material fully */
var MaterialSourceDescriptor=Descriptor.extend({
	/** Constructor.
		@param source Material source path
		*/
	init: function(source) {
		this._super();
		this.source=source;
	},

	type: function() {
		return "MaterialSourceDescriptor";
	},

	equals: function(other) {
		return this.source==other.source;
	}
});