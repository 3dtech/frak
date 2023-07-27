import Ray from 'scene/geometry/Ray.js'
import BoundingSphere from 'scene/geometry/BoundingSphere.js'

/** An infinite cone */

class InfiniteCone {
	ray: any;
	delta: any;
	
	/** Constructor
		@param ray Ray containing origin of frustum and direction of frustum
		@param delta Growth of cone radius per unit */
	constructor(ray, delta) {
		this.ray=ray;
		this.delta=delta;
	}
	
	/** Checks if frustum contains given point
		@param point Instance of vec3
		@return True, if point is inside the frustum */
	containsPoint(point): any { 
		return ray.distanceOfPoint(point)<this.radiusAtPoint(point);
	}
	
	/** Checks if frustum contains given bounding-sphere
		@param boundingSphere Instance of BoundingSphere
		@return True, if sphere is inside the frustum */
	containsSphere(boundingSphere): any { 
		return ray.distanceOfPoint(boundingSphere.position)<this.radiusAtPoint(boundingSphere.position)+boundingSphere.radius;
	}
	
	/** Calculates radius of cone at the given point */
	radiusAtPoint(point) {
		return vec3.dot(this.ray.direction, point-this.ray.origin)*this.delta;
	}

}

globalThis.InfiniteCone = InfiniteCone;

export default InfiniteCone;