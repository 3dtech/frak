/** MeshComponent is used to keep mesh that can be accessed by rendering or collider components */
var MeshComponent=Component.extend({
	init: function(mesh) {
		this.mesh=mesh;
		this._super();
	},
	
	type: function() {
		return "MeshComponent";
	},
	
	instantiate: function() {
		var c=this._super();
		c.mesh=this.mesh;
		return c;
	}
});