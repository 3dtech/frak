/** Resource component */
var Resource=Component.extend({
	init: function() {
		this._super();
		this.descriptor=false;	// One of the descriptor types
	},
	
	excluded: function() {
		return this._super().concat(["resource"]);
	},
	
	type: function() {
		return "ResourceComponent";
	}
});