/** Model descriptor is used for describing model source path */
var ModelDescriptor=Descriptor.extend({
	init: function(source) {
		this._super();
		this.source = source;
	},

	type: function() {
		return "ModelDescriptor";
	}
});