/** Class that should be used in components when uninitialized objects are desired and to enable
	dragging values to serializable object variables for components in editor. */
var TypeReference=Serializable.extend({ 
	/** Constructor */
	init: function(type, value) {
		this._super();
		this.valueType=type;
		this.value=value;
	},
	
	type: function() {
		return "TypeReference";
	},
	
	isNull: function() {
		return !this.value;
	}
});

//@ sourceURL=TypeReference.js