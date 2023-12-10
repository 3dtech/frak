import BoundingVolume from 'scene/geometry/BoundingVolume';
import BoundingSphere from 'scene/geometry/BoundingSphere';
import BoundingBox from 'scene/geometry/BoundingBox';


/** Ray class */
class Ray {
	infinite: any;
	origin: any;
	destination: any;

	/** Constructor
		@param origin The origin point of the ray {vec3}
		@param destination The destination point of the ray {vec3} */
	constructor(origin, destination) {
		this.infinite=false;
		this.origin=vec3.create();
		this.destination=vec3.create();
		if (origin) vec3.copy(this.origin, origin);
		if (destination) vec3.copy(this.destination, destination);
	}

	/** Clones the ray
		@return A copy of this {Ray} */
	clone(): any {
		var ray = new Ray(this.origin, this.destination);
		ray.infinite = this.infinite;
		return ray;
	}

	/** Returns the length of this ray.
		@return The lenght of this ray {number} */
	getLength(): any {
		return vec3.distance(this.origin, this.destination);
	}

	/** Returns the normalized direction vector of this ray.
		@param out Instance of {vec3}. If present, the vector is written to out [optional]
		@return The normalized direction vector of this ray */
	getDirection(out?): any {
		if (!out) out=vec3.create();
		this.getVector(out);
		vec3.normalize(out, out);
		return out;
	}

	/** Returns the direction vector of this ray.
		@param out Instance of {vec3}. If present, the vector is written to out [optional]
		@return The direction vector of this ray */
	getVector(out?): any {
		if (!out) out=vec3.create();
		vec3.subtract(out, this.destination, this.origin);
		return out;
	}

	/** Transforms the ray origin and destination by the given matrix.
		@param mat {mat4} */
	transform(mat): any {
		vec3.transformMat4(this.origin, this.origin, mat);
		vec3.transformMat4(this.destination, this.destination, mat);
	}

	/** Transforms the ray origin and direction by the given matrix and
		scales the transformed ray to the given length.
		@param mat {mat4}
		@param length {number} */
	transformWithLength(mat, length): any {
		var rotscale = mat4.clone(mat);
		rotscale[12]=0.0;
		rotscale[13]=0.0;
		rotscale[14]=0.0;
		var dir = this.getDirection(); // normalized direction
		vec3.transformMat4(this.origin, this.origin, mat); // origin transformed by TRS
		vec3.transformMat4(dir, dir, rotscale); // direction transformed by RS
		vec3.scale(dir, dir, length); // arbitrary length for direction
		vec3.add(this.destination, this.origin, dir); // compute destination point at origin + length*dir
	}

	/** Returns an interpolated point on the ray given the distance from the origin.
		@param t The distance from the origin {number}
		@return Instance of {vec3} */
	getPointOnRay(t): any {
		var p = vec3.create();
		var d = this.getVector();
		vec3.add(p, this.origin, vec3.scale(d, d, t));
		return p;
	}

	/** Returns a the closest point to the given point on the ray
		@param point The point that will be projected to the this ray {vec3}
		@return The projected point on the ray {vec3} */
	getClosestPointOnRay(point): any {
		var dir = this.getDirection();
		var length = vec3.dot(dir, vec3.subtract(vec3.create(), point, this.origin));
		return vec3.add(vec3.create(), this.origin, vec3.scale(dir, dir, length));
	}

	/** Calculates distance of point from the ray. If the point lies in the opposite direction from ray direction,
		the returned distance is distance from the origin point.
		@return Distance of point from ray {number} */
	distanceOfPoint(point): any {
		if(vec3.dot(this.getDirection(), vec3.subtract(vec3.create(), point, this.origin))<=0) return vec3.distance(point, this.origin);
		return vec3.length(vec3.cross(vec3.create(), this.getDirection(), vec3.subtract(vec3.create(), point, this.origin)));
	}

	/** Tests if the ray intersects a bounding volume
		@param boundingVolume Instance of a class extending {BoundingVolume}
		@param result Instance of {RayTestResult} (optional)
		@return {boolean} True if ray intersects the bounding volume or false if it doesn't */
	intersectBoundingVolume(boundingVolume, result): any {
		if (!(boundingVolume instanceof BoundingVolume) || !boundingVolume.center)
			return false;
		if (boundingVolume instanceof BoundingSphere) {
			return this.intersectSphere(boundingVolume.center, boundingVolume.radius, result);
		}
		if (boundingVolume instanceof BoundingBox) {
			return this.intersectAABB(boundingVolume.min, boundingVolume.max, result);
		}
		return false;
	}

	/** Tests if the ray intersects a plane
		@param plane Instance of {Plane}
		@param result Instance of {RayTestResult} (optional)
		@return {boolean} True if ray intersects the plane or false if it doesn't */
	intersectPlane(plane, result): any {
		if (plane.sameSide(this.origin, this.destination))
			return false;
		var dir = this.getDirection();
		var t = -plane.getDistanceToPoint(this.origin) / vec3.dot(dir, plane.normal);
		if (result)
			result.add(vec3.add(vec3.create(), this.origin, vec3.scale(dir, dir, t)));
		return true;
	}

	/** Tests if the ray intersects a triangle given by three points.
		@param p0 Instance of {vec3}
		@param p1 Instance of {vec3}
		@param p2 Instance of {vec3}
		@param result Instance of {RayTestResult} (optional)
		@return {boolean} True if ray intersects the triangle or false if it doesn't */
	intersectTriangle(p0, p1, p2, result): any {
		var v0 = vec3.subtract(RayTestLocalCache[0], p2, p0);
		var v1 = vec3.subtract(RayTestLocalCache[1], p1, p0);
		var normal = vec3.cross(RayTestLocalCache[2], v1, v0);
		vec3.normalize(normal, normal);

		// Find distance from origin and dest to the plane defined by the triangle
		var d1 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.origin, p0), normal);
		var d2 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.destination, p0), normal);

		// Check if the ray is going through the plane of the triangle
		if ((d1*d2)>=0.0)
			return false;

		// Find point on the ray that intersects with the plane
		var hit = this.getVector();
		hit = vec3.add(hit, this.origin, vec3.scale(hit, hit, (-d1/(d2-d1))));

		// Check if the intersection point is within the triangle
		var v2 = vec3.subtract(RayTestLocalCache[2], hit, p0);
		var dot00 = vec3.dot(v0, v0);
		var dot01 = vec3.dot(v0, v1);
		var dot02 = vec3.dot(v0, v2);
		var dot11 = vec3.dot(v1, v1);
		var dot12 = vec3.dot(v1, v2);
		var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
		if (u>=0.0 && v>=0.0 && u+v<=1.0) {
			if (result) result.add(hit);
			return true;
		}
		return false;
	}

	/** Tests if the ray intersects a triangle given by three points
		and returns the distance on the ray if the intersection occurs
		or false otherwise.
		@param p0 Instance of {vec3}
		@param p1 Instance of {vec3}
		@param p2 Instance of {vec3}
		@return Distance on the ray in the range of [0,1] or false if no intersection occurs */
	intersectTriangleDistanceOnly(p0, p1, p2): any {
		var v0 = vec3.subtract(RayTestLocalCache[0], p2, p0);
		var v1 = vec3.subtract(RayTestLocalCache[1], p1, p0);
		var normal = vec3.cross(RayTestLocalCache[2], v1, v0);
		vec3.normalize(normal, normal);

		// Find distance from origin and dest to the plane defined by the triangle
		var d1 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.origin, p0), normal);
		var d2 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.destination, p0), normal);

		// Check if the ray is going through the plane of the triangle
		if ((d1*d2)>=0.0)
			return false;

		// Find point on the ray that intersects with the plane
		var hit = this.getVector();
		var t = (-d1/(d2-d1));
		hit = vec3.add(hit, this.origin, vec3.scale(hit, hit, t));

		// Check if the intersection point is within the triangle
		var v2 = vec3.subtract(RayTestLocalCache[2], hit, p0);
		var dot00 = vec3.dot(v0, v0);
		var dot01 = vec3.dot(v0, v1);
		var dot02 = vec3.dot(v0, v2);
		var dot11 = vec3.dot(v1, v1);
		var dot12 = vec3.dot(v1, v2);
		var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
		if (u>=0.0 && v>=0.0 && u+v<=1.0)
			return t;
		return false;
	}

	/** Tests if the ray intersects a sphere
		@param center The center of the sphere {vec3}
		@param radius The radius of the sphere {number}
		@param result Instance of {RayTestResult} (optional)
		@return {boolean} True if ray intersects the sphere or false if it doesn't */
	intersectSphere(center, radius, result): any {
		var v = vec3.sub(RayTestLocalCache[0], this.origin, center);
		var direction = this.getDirection();
		var dv = vec3.dot(direction, v);
		var tmp = dv*dv - vec3.dot(v, v) + radius*radius;
		if (Math.abs(tmp)<EPSILON) { // Ray touches sphere
			if (result)
				result.add(vec3.add(vec3.create(), this.origin, vec3.scale(direction, direction, -dv)));
			return true;
		}
		if (tmp>0.0) { // Ray goes thru the sphere
			if (result) {
				result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[0], direction, -dv - Math.sqrt(tmp))));
				result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[0], direction, -dv + Math.sqrt(tmp))));
			}
			return true;
		}
		return false;
	}

	/** Tests if the ray intersects ab axis-aligned bounding box
		@param min The min vertex of the box {vec3}
		@param max The max vertex of the box {vec3}
		@param result Instance of {RayTestResult} (optional)
		@return {boolean} True if ray intersects the box or false if it doesn't */
	intersectAABB(min, max, result): any {
		var dir = this.getDirection(RayTestLocalCache[0]);
		var tmin = RayTestLocalCache[1];
		var tmax = RayTestLocalCache[2];

		dir[0] = 1.0 / dir[0];
		dir[1] = 1.0 / dir[1];
		dir[2] = 1.0 / dir[2];
		tmin[0] = (min[0]-this.origin[0])*dir[0];
		tmax[0] = (max[0]-this.origin[0])*dir[0];
		tmin[1] = (min[1]-this.origin[1])*dir[1];
		tmax[1] = (max[1]-this.origin[1])*dir[1];
		tmin[2] = (min[2]-this.origin[2])*dir[2];
		tmax[2] = (max[2]-this.origin[2])*dir[2];

		var t0 = Math.max(Math.min(tmin[0], tmax[0]), Math.min(tmin[1], tmax[1]), Math.min(tmin[2], tmax[2]));
		var t1 = Math.min(Math.max(tmin[0], tmax[0]), Math.max(tmin[1], tmax[1]), Math.max(tmin[2], tmax[2]));

		if (t1<0.0 || t0>t1)
			return false;
		if (this.infinite) {
			if (result) {
				this.getDirection(dir);
				result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t0)));
				result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t1)));
			}
			return true;
		}

		// This handles rays that start and/or end inside the AABB
		if (t0*t0 > vec3.sqrDist(this.origin, this.destination)) {
			if ((this.origin[0]<min[0] || this.origin[1]<min[1] || this.origin[2]<min[2] ||
				this.origin[0]>max[0] || this.origin[1]>max[1] || this.origin[2]>max[2]) &&
				(this.destination[0]<min[0] || this.destination[1]<min[1] || this.destination[2]<min[2] ||
				this.destination[0]>max[0] || this.destination[1]>max[1] || this.destination[2]>max[2]))
				return false;
		}

		if (result) {
			this.getDirection(dir);
			result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t0)));
			result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t1)));
		}
		return true;
	}

	toString() {
		return 'Ray(' + vec3.str(this.origin) + ', ' + vec3.str(this.destination) + ', infinite = ' + this.infinite +')';
	}
}

globalThis.Ray = Ray;
export default Ray;
