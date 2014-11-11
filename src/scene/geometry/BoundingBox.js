/**
 * Axis aligned bounding box class
 */
var BoundingBox=BoundingVolume.extend({
	/** Constructor */
	init: function(center, size) {
		this._super(center);
		this.size=vec3.create();
		if (size) vec3.copy(this.size, size);
		this.extents=vec3.scale(vec3.create(), this.size, 0.5);
		this.min=vec3.create();
		this.max=vec3.create();
		this.recalculate();
	},

	type: function() {
		return "BoundingBox";
	},

	/** Recalculates the extents, min and max variables for this bounding-box */
	recalculate: function() {
		vec3.scale(this.size, this.extents, 2.0);
		if (this.center) {
			vec3.subtract(this.min, this.center, this.extents);
			vec3.add(this.max, this.center, this.extents);
		}
	},

	/** Transforms this bounding box by given matrix
		@param mat {mat4} Transformation matrix
		@return New {BoundingBox} */
	transform: function(mat) {
		var box = new BoundingBox();
		if (!this.center)
			return box;

		var a=0.0, b=0.0;
		mat4.translation(box.min, mat);
		mat4.translation(box.max, mat);

		for (var j=0; j<3; j++ ) {
			for (var i=0; i<3; i++ ) {
				a = mat[i*4+j] * this.min[i];
				b = mat[i*4+j] * this.max[i];
				if(a < b) {
					box.min[j] += a;
					box.max[j] += b;
				}
				else {
					box.min[j] += b;
					box.max[j] += a;
				}
			}
		}

		vec3.subtract(box.size, box.max, box.min);
		vec3.scale(box.extents, box.size, 0.5);
		box.center = vec3.add(vec3.create(), box.min, box.extents);
		return box;
	},

	/** Returns true if the box has 0 size.
		@return True if the box has 0 size */
	isPoint: function() {
		return (this.size[0]==0.0 && this.size[1]==0.0 && this.size[2]==0.0);
	},

	/** Returns the radius of a sphere that can entirely encapsulate this box.
		@return The radius of a sphere that can entirely encapsulate this box */
	getOuterSphereRadius: function() {
		return vec3.len(this.extents);
	},

	/** Checks if point is inside bounding-box
		@param point Instance of vec3
		@return True, if point is inside the bounding-box */
	containsPoint: function(point) {
		if(!this.center) return false;	// This bounding-box is not defined, point can not be in something that is not defined
		if (point[0]>=this.min[0] && point[1]>=this.min[1] && point[2]>=this.min[2] &&
			point[0]<=this.max[0] && point[1]<=this.max[1] && point[2]<=this.max[2])
			return true;
		return false;
	},

	/** Checks if another bounding-box is inside this bounding-box
		@param box Instance of BoundingBox
		@return True, if another bounding-box is inside this bounding-box */
	containsBox: function(box) {
		if(!this.center) return false;	// This bounding-box is not defined, another box cannot be in something that is not defined
		return (this.containsPoint(box.min) && this.containsPoint(box.max));
	},

	/** Checks if another bounding-box intersects this bounding-box
		@param box Instance of BoundingBox
		@return True, if another bounding-box is intersecting this bounding-box */
	intersectsBox: function(box) {
		if(!this.center) return false;	// This bounding-box is not defined, another box cannot be in something that is not defined
		return (this.max[0] > box.min[0] &&
				this.min[0] < box.max[0] &&
				this.max[1] > box.min[1] &&
				this.min[0] < box.max[1] &&
				this.max[2] > box.min[2] &&
				this.min[2] < box.max[2]);
	},

	/** Checks if a plane intersects this bounding-box
		@param plane Instance of {Plane}
		@return {boolean} True, if the plane intersects this bounding-box */
	intersectsPlane: function(plane) {
		if (!this.center) return false;

		var localMin = BoundingVolumeVectorCache[0];
		var localMax = BoundingVolumeVectorCache[1];
		var p = BoundingVolumeVectorCache[2];

		vec3.copy(localMin, this.max);
		vec3.copy(localMax, this.min);

		var minDist = Infinity;
		var maxDist = -Infinity;

		var d = plane.getDistanceToPoint(this.min);
		if (d<minDist) { vec3.copy(localMin, this.min); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, this.min); maxDist=d; }

		d = plane.getDistanceToPoint(this.max);
		if (d<minDist) { vec3.copy(localMin, this.max); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, this.max); maxDist=d; }

		vec3.set(p, this.min[0], this.min[1], this.max[2]);
		d = plane.getDistanceToPoint(p);
		if (d<minDist) { vec3.copy(localMin, p); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, p); maxDist=d; }

		vec3.set(p, this.min[0], this.max[1], this.min[2]);
		d = plane.getDistanceToPoint(p);
		if (d<minDist) { vec3.copy(localMin, p); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, p); maxDist=d; }

		vec3.set(p, this.min[0], this.max[1], this.max[2]);
		d = plane.getDistanceToPoint(p);
		if (d<minDist) { vec3.copy(localMin, p); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, p); maxDist=d; }

		vec3.set(p, this.max[0], this.min[1], this.min[2]);
		d = plane.getDistanceToPoint(p);
		if (d<minDist) { vec3.copy(localMin, p); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, p); maxDist=d; }

		vec3.set(p, this.max[0], this.min[1], this.max[2]);
		d = plane.getDistanceToPoint(p);
		if (d<minDist) { vec3.copy(localMin, p); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, p); maxDist=d; }

		vec3.set(p, this.max[0], this.max[1], this.min[2]);
		d = plane.getDistanceToPoint(p);
		if (d<minDist) { vec3.copy(localMin, p); minDist=d; }
		if (d>maxDist) { vec3.copy(localMax, p); maxDist=d; }

		if (!plane.sameSide(localMin, localMax))
			return true;
		if (plane.pointOnPlane(localMin) || plane.pointOnPlane(localMax))
			return true;
		return false;
	},

	/** Checks if a triangle intersects this bounding-box
		@param p0 Instance of {vec3}
		@param p1 Instance of {vec3}
		@param p2 Instance of {vec3}
		@return {boolean} True, if triangle(p0,p1,p2) intersects this bounding-box */
	intersectsTriangle: function(p0, p1, p2) {
		if (!this.center) return false;

		// Test trinagle plane
		AABBPlaneCache.setByPoints(p0, p1, p2);
		if (!this.intersectsPlane(AABBPlaneCache))
			return false;

		if (this.containsPoint(p0) || this.containsPoint(p1) || this.containsPoint(p2))
			return true;

		// Test triangle AABB
		var min = BoundingVolumeVectorCache[0];
		var max = BoundingVolumeVectorCache[1];
		vec3.copy(min, p0);
		vec3.copy(max, p0);
		for (var i=0; i<3; i++) {
			if (p1[i]<min[i]) min[i]=p1[i];
			if (p2[i]<min[i]) min[i]=p2[i];
			if (p1[i]>max[i]) max[i]=p1[i];
			if (p2[i]>max[i]) max[i]=p2[i];
		}
		if (!(this.max[0] >= min[0] &&
			this.min[0] <= max[0] &&
			this.max[1] >= min[1] &&
			this.min[0] <= max[1] &&
			this.max[2] >= min[2] &&
			this.min[2] <= max[2])) return false;

		// xy-axis rect
		var proj0 = vec2.fromValues(p0[0], p0[1]);
		var proj1 = vec2.fromValues(p1[0], p1[1]);
		var proj2 = vec2.fromValues(p2[0], p2[1]);
		var projMin=vec2.fromValues(this.min[0], this.min[1]);
		var projMax=vec2.fromValues(this.max[0], this.max[1]);

		if (!LineRectIntersection2D(proj0, proj1, projMin, projMax) &&
			!LineRectIntersection2D(proj1, proj2, projMin, projMax) &&
			!LineRectIntersection2D(proj2, proj0, projMin, projMax))
		{
			if (!PointInTriangle2D(proj0, proj1, proj2, projMin))
				return false;
		}

		// zy-axis rect
		vec2.set(proj0, p0[2], p0[1]);
		vec2.set(proj1, p1[2], p1[1]);
		vec2.set(proj2, p2[2], p2[1]);
		vec2.set(projMin, this.min[2], this.min[1]);
		vec2.set(projMax, this.max[2], this.max[1]);
		if (!LineRectIntersection2D(proj0, proj1, projMin, projMax) &&
			!LineRectIntersection2D(proj1, proj2, projMin, projMax) &&
			!LineRectIntersection2D(proj2, proj0, projMin, projMax))
		{
			if (!PointInTriangle2D(proj0, proj1, proj2, projMin))
				return false;
		}

		// xz-axis rect
		vec2.set(proj0, p0[0], p0[2]);
		vec2.set(proj1, p1[0], p1[2]);
		vec2.set(proj2, p2[0], p2[2]);
		vec2.set(projMin, this.min[0], this.min[2]);
		vec2.set(projMax, this.max[0], this.max[2]);
		if (!LineRectIntersection2D(proj0, proj1, projMin, projMax) &&
			!LineRectIntersection2D(proj1, proj2, projMin, projMax) &&
			!LineRectIntersection2D(proj2, proj0, projMin, projMax))
		{
			if (!PointInTriangle2D(proj0, proj1, proj2, projMin))
				return false;
		}
		return true;
	},

	/** Resizes the bounding-box to encapsulate the given point
		@param point Instance of {vec3} */
	encapsulatePoint: function(point) {
		if (!this.center) {
			this.center=vec3.clone(point);
			this.extents[0]=0.0;
			this.extents[1]=0.0;
			this.extents[2]=0.0;
			this.recalculate();
			return;
		}
		if (this.containsPoint(point))
			return;

		var delta = vec3.subtract(BoundingVolumeVectorCache[0], point, this.center);
		for (var axis = 0; axis<3; axis++) {
			if (Math.abs(delta[axis])>this.extents[axis]) {
				this.extents[axis]+=(Math.abs(delta[axis])-this.extents[axis])/2.0;
				this.center[axis] = point[axis] + (point[axis]>this.center[axis]?-1.0:1.0)*this.extents[axis];
			}
		}
		this.recalculate();
	},

	/** Resizes the bounding-box to encapsulate the given box
		@param box Instance of {BoundingBox} */
	encapsulateBox: function(box) {
		if (!box.center)
			return;

		if(!this.center) { // This bounding-sphere is still undefined, use the other sphere
			this.center=vec3.clone(box.center);
			this.extents=vec3.clone(box.extents);
			this.recalculate();
			return;
		}
		if(this.containsBox(box))
			return;
		this.encapsulatePoint(box.min);
		this.encapsulatePoint(box.max);
	},

	/** Generates the 8 bounding box vertices.
		@return The 8 bounding box vertices. */
	getVertices: function() {
		var vertices = [];
		vertices.push(
			vec3.create(), vec3.create(), vec3.create(), vec3.create(),
			vec3.create(), vec3.create(), vec3.create(), vec3.create());
		vec3.add(vertices[0], this.center, [ this.extents[0],  this.extents[1],  this.extents[2]]); // RTB
		vec3.add(vertices[1], this.center, [-this.extents[0],  this.extents[1],  this.extents[2]]); // LTB
		vec3.add(vertices[2], this.center, [ this.extents[0], -this.extents[1],  this.extents[2]]); // RBB
		vec3.add(vertices[3], this.center, [-this.extents[0], -this.extents[1],  this.extents[2]]); // LBB
		vec3.add(vertices[4], this.center, [ this.extents[0],  this.extents[1], -this.extents[2]]); // RTF
		vec3.add(vertices[5], this.center, [-this.extents[0],  this.extents[1], -this.extents[2]]); // LTF
		vec3.add(vertices[6], this.center, [ this.extents[0], -this.extents[1], -this.extents[2]]); // RBF
		vec3.add(vertices[7], this.center, [-this.extents[0], -this.extents[1], -this.extents[2]]); // LBF
		return vertices;
	},

	/** @return String representation of this BoundingBox */
	toString: function() {
		return "BoundingBox[\n"+
			"\tcenter=("+this.center[0]+", "+this.center[1]+", "+this.center[2]+")\n"+
			"\tmin=("+this.min[0]+", "+this.min[1]+", "+this.min[2]+")\n"+
			"\tmax=("+this.max[0]+", "+this.max[1]+", "+this.max[2]+")\n"+
			"\textents=("+this.extents[0]+", "+this.extents[1]+", "+this.extents[2]+")\n"+
			"\tsize=("+this.size[0]+", "+this.size[1]+", "+this.size[2]+")\n"+
		"]\n";
	}
});

/** Tests if 2D lines AB and CD intersect.
	@param a Instance of {vec2}
	@param b Instance of {vec2}
	@param c Instance of {vec2}
	@param d Instance of {vec2}
	@param out Instance of {vec2} [optional]
	@return {boolean} True if lines AB and CD intersect */
function LineLineIntersection2D(a, b, c, d, out) {
	/*
			(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
		r = -----------------------------
			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)

			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		s = -----------------------------
			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
	*/
	var denom = (b[0]-a[0])*(d[1]-c[1])-(b[1]-a[1])*(d[0]-c[0]);
	if (denom==0.0)
		return false;
	var r = ( (a[1]-c[1])*(d[0]-c[0])-(a[0]-c[0])*(d[1]-c[1]) ) / denom;
	var s = ( (a[1]-c[1])*(b[0]-a[0])-(a[0]-c[0])*(b[1]-a[1]) ) / denom;
	if (r<0.0 || r>1.0 || s<0.0 || s>1.0)
		return false;
	if (out) {
		out[0]=a[0]+r*(b[0]-a[0]);
		out[1]=a[1]+r*(b[1]-a[1]);
	}
	return true;
}

/** Tests if the 2D line AB intersects a rectangle defined by min and max.
	@param a Instance of {vec2}
	@param b Instance of {vec2}
	@param min Instance of {vec2}
	@param max Instance of {vec2}
	@return {boolean} True if the 2D line AB intersects the rectangle defined by min and max */
function LineRectIntersection2D(a, b, min, max) {
	if (LineLineIntersection2D(a, b, min, [min[0], max[1]]) ||
		LineLineIntersection2D(a, b, [min[0], max[1]], max) ||
		LineLineIntersection2D(a, b, max, [max[0], min[1]]) ||
		LineLineIntersection2D(a, b, min, [max[0], min[1]]))
		return true;
	return false;
}

function PointInTriangle2D(p1, p2, p3, pt) {
	/*
		pt = p1 + (p2 - p1) * u + (p3 - p1) * v

		     (y2 - y3)(x - x3) + (x3 - x2)(y - y3)
		u = ---------------------------------------
		    (y2 - y3)(x1 - x3) + (x3 - x2)(y1 - y3)

		     (y3 - y1)(x - x3) + (x1 - x3)(y - y3)
		v = ---------------------------------------
		    (y2 - y3)(x1 - x3) + (x3 - x2)(y1 - y3)
	*/
	var det = (p2[1] - p3[1])*(p1[0] - p3[0]) + (p3[0] - p2[0])*(p1[1] - p3[1]);
	// if det is 0 (p1,p2,p3) does not form a triangle
	if (det==0.0) return false;
	var u = ( (p2[1]-p3[1])*(pt[0]-p3[0]) + (p3[0] - p2[0])*(pt[1] - p3[1]) ) / det;
	var v = ( (p3[1]-p1[1])*(pt[0]-p3[0]) + (p1[0] - p3[0])*(pt[1] - p3[1]) ) / det;
	if (u>=0.0 && v>=0.0 && u+v<=1.0)
		return true;
	return false;
}
