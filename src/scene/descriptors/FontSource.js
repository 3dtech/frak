/** FontSource class is used to keep font data while loading new font source. */
var FontSource=Descriptor.extend({
	/** Constructor 
		@param sourceDescriptor Instance of FontSourceDescriptor */
	init: function(sourceDescriptor) {
		this._super();
		this.sourceDescriptor=sourceDescriptor;	// Source descriptor
		this.font=false;				// Font
	},
	
	type: function() {
		return "FontSource";
	},
	
	equals: function(other) {
		if(!this._super(other)) return false;
		if(this.sourceDescriptor && other.sourceDescriptor) {
			if(!this.ourceDescriptor.equals(other.sourceDescriptor)) return false;
		}
		else if(this.sourceDescriptor!=other.sourceDescriptor) return false;
		
		return true;
	}
});