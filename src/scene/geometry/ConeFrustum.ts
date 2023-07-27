import InfiniteCone from 'scene/geometry/InfiniteCone.js'
import Plane from 'scene/geometry/Plane.js'
import BoundingSphere from 'scene/geometry/BoundingSphere.js'

/** A cone frustum */

class ConeFrustum {
	cone: any;
	nearPlane: any;
	farPlane: any;
	
	/** Constructor
		@param cone Instance of InfiniteCone
		@param nearDistance Near-plane distance of cone-frustum
		@param farDistance Far-plane distance of cone-frustm */
	constructor(cone, near, far) {
		this.cone=cone;
		this.nearPlane=new Plane(cone.origin+cone.ray.getDirection()*nearDistance, cone.ray.getDirection());
		this.farPlane=new Plane(cone.origin+cone.ray.getDirection()*farDistance, cone.ray.getDirection());
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
	containsSphere(boundingSphere) { 
		return this.cone.containsSphere(boundingSphere) && 
		       this.nearPlane.pointInFront(boundingSphere.position) &&
		       this.nearPlane.pointInBack(boundingSphere.position);
	}

}

globalThis.ConeFrustum = ConeFrustum;

export default ConeFrustum;