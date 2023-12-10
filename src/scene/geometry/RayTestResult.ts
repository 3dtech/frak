import FRAK from 'Helpers';

/** Container for storing ray intersection tests.
	It also provides some more commonly used functions like
	sorting the results and finding the nearest intersection. */
class RayTestResult {
	ray: any;
	hits: any;
	addCallback: any;

	/** Constructor
		@param ray Instance of {Ray}. The given ray is cloned internally. */
	constructor(ray) {
		this.ray=ray.clone();
		this.hits = [];
		this.addCallback=false;
	}

	/** Adds an intersection point to the result
		@param point Instance of {vec3} */
	add(point): any {
		var item = {
			'point': point,
			'collider': false,
			'submesh': false,
			'node': false
		};
		if (FRAK.isFunction(this.addCallback))
			this.addCallback(item);
		this.hits.push(item);
	}

	/** Returns true if there are no intersections stored in the container.
		@return True if there are no intersections stored in the container */
	empty(): any {
		return (this.hits.length==0);
	}

	/** Sorts the intersections in this container from nearest to furthest. */
	sort(): any {
		var scope=this;
		this.hits.sort(function(a, b) {
			var da = vec3.sqrDist(scope.ray.origin, a.point);
			var db = vec3.sqrDist(scope.ray.origin, b.point);
			return da-db;
		});
	}

	/** Returns the intersection point nearest to the origin of the ray.
		@return The intersection point nearest to the origin of the ray */
	nearest() {
		if (this.empty())
			return false;
		var minDist = Infinity;
		var minIndex = 0;
		for (var i=0; i < this.hits.length; i++) {
			var d = vec3.sqrDist(this.ray.origin, this.hits[i].point);
			if (d<minDist) {
				minDist=d;
				minIndex=i;
			}
		}
		return this.hits[minIndex];
	}
}

globalThis.RayTestLocalCache = [
	vec3.create(),
	vec3.create(),
	vec3.create(),
	vec3.create()
];

globalThis.RayTestResult = RayTestResult;
export default RayTestResult;
