/** Material source combines material descriptor and material itself. 
	It is used for loading materials via MaterialSourcesManager. */
var MaterialSource=Descriptor.extend({
	/** Constructor. If source is not given a new texture is created with given width and height.
		@param sourceDescriptor Instance of MaterialSourceDescriptor */
	init: function(sourceDescriptor) {
		this._super();
		this.material=false;
		this.sourceDescriptor=sourceDescriptor;	// Source descriptor
	},
	
	type: function() {
		return "MaterialSource";
	},
	
	equals: function(other) {
		return false;
	}
});