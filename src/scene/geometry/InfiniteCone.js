/** An infinite cone */
var InfiniteCone=Class.extend({
	/** Constructor
		@param ray Ray containing origin of frustum and direction of frustum
		@param delta Growth of cone radius per unit */
	init: function(ray, delta) {
		this.ray=ray;
		this.delta=delta;
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
		return ray.distanceOfPoint(boundingSphere.position)<this.radiusAtPoint(boundingSphere.position)+boundingSphere.radius;
	},
	
	/** Calculates radius of cone at the given point */
	radiusAtPoint: function(point) {
		return vec3.dot(this.ray.direction, point-this.ray.origin)*this.delta;
	}
});