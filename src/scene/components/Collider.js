/**
 * Base collider class
 */
var Collider=Component.extend({
	init: function() {
		this._super();
	},

	type: function() {
		return "Collider";
	},
	
	onStart: function(context, engine) {
		this.getScene().dynamicSpace.addCollider(this);
	},
	
	onEnd: function(context, engine) {
		this.getScene().dynamicSpace.removeCollider(this);
	},
	
	/** Tests if ray collides with this collider
		@param ray Instance of Ray in world space
		@param result Instance of RayTestResult (optional)
		@param collideInvisible If true, invisible colliders are evaluated as well (optional)
		@return True if ray intersects this collider */
	rayTest: function(ray, result, collideInvisible) {
		return false;
	}
});