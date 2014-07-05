/** Font source descriptor points to text file that contains font descriptor  */
var FontSourceDescriptor=Descriptor.extend({
	/** Constructor
		@param source Source path */
	init: function(source) {
		this._super();
		this.source=source;
	},

	type: function() {
		return "FontSourceDescriptor";
	},

	equals: function(other) {
		if (!this._super(other))
			return false;
		return this.source==other.source;
	}
});