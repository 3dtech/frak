/** Text descriptor is used for describing text sources */
var TextDescriptor=Descriptor.extend({
	/** Constructor
		@param source Path to text */
	init: function(source) {
		this._super();
		this.source=source;
	},

	type: function() {
		return "TextDescriptor";
	},

	equals: function(other) {
		if(!this._super(other)) return false;
		return this.source==other.source;
	}
});