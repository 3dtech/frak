

/** An infinite plane in 3D space */

class Plane {
	normal: any;
	distance: any;

	/** Constructor */
	constructor() {
		this.normal = vec3.create();
		this.distance = 0.0;
	}

	/** Creates a plane defined by three points
		@param p1 Instance of {vec3}
		@param p2 Instance of {vec3}
		@param p3 Instance of {vec3}
		*/
	setByPoints(p1, p2, p3): any {
		this.normal=vec3.cross(
			vec3.create(),
			vec3.subtract(vec3.create(), p2, p1),
			vec3.subtract(vec3.create(), p3, p1)
		);
		vec3.normalize(this.normal, this.normal);
		this.distance = -vec3.dot(this.normal, p2);
		return this;
	}

	/** Creates a plane defined by point and normal
		@param normal Instance of {vec3}
		@param point Instance of {vec3}
	 */
	setByNormalAndPoint(normal, point): any {
		this.normal=vec3.clone(normal);
		vec3.normalize(this.normal, this.normal);
		this.distance = -vec3.dot(this.normal, point);
		return this;
	}

	/** Returns the signed distance between a plane and a point
		@param point Instance of {vec3}
		@return {number} Signed distance between the plane and the point */
	getDistanceToPoint(point): any {
		return vec3.dot(this.normal, point) + this.distance;
	}

	/** Returns the distance of a point from the plane along a given line
		@param point Instance of {vec3}
		@param direction Instance of {vec3}. Direction of the line
		@return {number} The distance */
	getDistanceOnLine(point, direction): any {
		var p0 = vec3.scale(vec3.create(), this.normal, -this.distance);
		var dot = vec3.dot(direction, this.normal);
		if (Math.abs(dot) < EPSILON)
			return Infinity;
		return vec3.dot(vec3.sub(p0, p0, point), this.normal) / dot;
	}

	/** Returns an intersection of the plane and a line, defined by a point and a direction
		@param point Instance of {vec3}. A point on the line
		@param direction Instance of {vec3}. Direction of the line
		@param out Instance of {vec3}. If present the output is written to out instead. [optional]
		@return {vec3} The intersection point */
	getLineIntersection(point, direction, out): any {
		if (!out) out=vec3.create();
		var d = this.getDistanceOnLine(point, direction);
		vec3.scaleAndAdd(out, point, direction, d);
		return out;
	}

	/** Projects the given point onto this plane.
		@param point Instance of {vec3}
		@param out Instance of {vec3}. If present the output is written to out instead. [optional]
		@return {vec3} The projected point on the plane (the same as out, if out is present) */
	projectToPlane(point, out?): any {
		if (!out) out=vec3.create();
		vec3.scale(out, this.normal, this.getDistanceToPoint(point));
		vec3.sub(out, point, out);
		return out;
	}

	/** Tests if point is in front of the plane
		@param point Instance of {vec3}
		@return {boolean} True, if point is in front of the plane */
	pointInFront(point): any {
		return vec3.dot(this.normal, point)+this.distance>0;
	}

	/** Tests if point is in back of the plane
		@param point Instance of {vec3}
		@return {boolean} True, if point is in back of the plane */
	pointInBack(point): any {
		return vec3.dot(this.normal, point)+this.distance<0;
	}

	/** Tests if point is on the plane
		@param point Instance of {vec3}
		@return {boolean} True, if point is on the plane */
	pointOnPlane(point): any {
		return Math.abs(vec3.dot(this.normal, point)+this.distance)<EPSILON; // NOTE: Requires glmatrix-3dtech-ext
	}

	/** Tests if points p1 and p2 are on the same side of the plane
		@param p1 Instance of {vec3}
		@param p2 Instance of {vec3}
		@return {boolean} True, if points p1 and p2 are on the same side of the plane */
	sameSide(p1, p2): any {
		var d1=vec3.dot(this.normal, p1)+this.distance;
		var d2=vec3.dot(this.normal, p2)+this.distance;
		return !(d1*d2<0.0);
	}

	/** Returns the string representation of this plane.
		@return The {string} representation of this plane */
	toString() {
		return "Plane["+this.normal[0]+", "+this.normal[1]+", "+this.normal[2]+", "+this.distance+"]";
	}

}

globalThis.AABBPlaneCache = new Plane();

globalThis.Plane = Plane;

export default Plane;
