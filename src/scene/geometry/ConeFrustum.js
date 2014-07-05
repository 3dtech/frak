/** A cone frustum */
var ConeFrustum=Class.extend({
	/** Constructor
		@param cone Instance of InfiniteCone
		@param nearDistance Near-plane distance of cone-frustum
		@param farDistance Far-plane distance of cone-frustm */
	init: function(cone, near, far) {
		this.cone=cone;
		this.nearPlane=new Plane(cone.origin+cone.ray.getDirection()*nearDistance, cone.ray.getDirection());
		this.farPlane=new Plane(cone.origin+cone.ray.getDirection()*farDistance, cone.ray.getDirection());
	},
	
	/** Checks if frustum contains given point
		@param point Instance of vec3
		@return True, if point is inside the frustum */
	containsPoint: function(point) { 
		return ray.distanceOfPoint(point)<this.radiusAtPoint(point);
	},
	
	/** Checks if frustum contains given bounding-sphere
		@param boundingSphere Instance of BoundingSphere
		@return True, if sphere is inside the frustum */
	containsSphere: function(boundingSphere) { 
		return this.cone.containsSphere(boundingSphere) && 
		       this.nearPlane.pointInFront(boundingSphere.position) &&
		       this.nearPlane.pointInBack(boundingSphere.position);
	}
});