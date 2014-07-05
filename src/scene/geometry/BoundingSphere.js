/** BoundingSphere class */
var BoundingSphere=BoundingVolume.extend({
	/** Constructor */
	init: function(center, radius) {
		this._super(center);
		this.radius=0.0;
		if (radius) this.radius=radius;
	},
	
	type: function() {
		return "BoundingSphere";
	},
	
	/** Returns true if the sphere has 0 radius. */
	isPoint: function() {
		return (this.radius==0.0);
	},
	
	/** Checks if point is inside bounding-sphere
		@param point Instance of vec3
		@return True, if point is inside the bounding-sphere */
	containsPoint: function(point) {
		if(!this.center) return false;	// This bounding-sphere is not defined, point can not be in something that is not defined
		return vec3.distance(point, this.center)<=this.radius;
	},
	
	/** Checks if a sphere is inside this bounding-sphere
		@param sphere Instance of BoundingSphere
		@return True, if another bounding-sphere is inside the bounding-sphere */
	containsSphere: function(sphere) {
		if(!this.center) return false;	// This bounding-sphere is not defined, another sphere can not be in something that is not defined
		return vec3.distance(sphere.center, this.center)<=this.radius-sphere.radius;
	},
	
	/** Checks if a sphere intersects this bounding-sphere
		@param sphere Instance of BoundingSphere
		@return True, if another bounding-sphere is intersecting this bounding-sphere */
	intersectsSphere: function(sphere) {
		if(!this.center) return false;	// This bounding-sphere is not defined, another sphere can not be in something that is not defined
		var d = vec3.squaredLength(vec3.subtract(BoundingVolumeVectorCache[0], this.center, sphere.center));
		var radiiSum = this.radius+sphere.radius;
		return (d<=radiiSum*radiiSum);
	},
	
	/** Encapsulates a point inside bounding-sphere */
	encapsulatePoint: function(point) {
		if (!this.center) {
			this.center=vec3.clone(point);
			this.radius=0.0;
			return;
		}
		if (this.containsPoint(point))
			return;
		var dir = vec3.subtract(BoundingVolumeVectorCache[0], this.center, point);
		var length = vec3.length(dir) + this.radius;
		vec3.normalize(dir, dir);
		this.radius=length/2.0;
		var tmp = vec3.scale(BoundingVolumeVectorCache[1], dir, this.radius);
		vec3.add(this.center, point, tmp);
	},
	
	/** Encapsulates another bounding-sphere inside bounding-sphere */
	encapsulateSphere: function(sphere) {
		if (!sphere.center)
			return;
		
		if(!this.center) {										// This bounding-sphere is still undefined, use the other sphere
			this.center=vec3.clone(sphere.center);
			this.radius=sphere.radius;
			return;
		}
		
		if(this.containsSphere(sphere)) return;	// Sphere is already contained
		
		// Encapsulate the sphere, if it is outside
		var dir = vec3.subtract(BoundingVolumeVectorCache[0], sphere.center, this.center);
		var length = vec3.length(dir) + sphere.radius;
		vec3.normalize(dir, dir);
		vec3.scale(dir, dir, length);
		var pt = vec3.add(BoundingVolumeVectorCache[2], this.center, dir);
		this.encapsulatePoint(pt);
	},
	
	/** Transforms this bounding-sphere by given matrix 
		@return New bounding-sphere */
	transform: function(mat) {
		if (!this.center)
			return new BoundingSphere();
		var scale = mat4.getScale(BoundingVolumeVectorCache[0], mat);
		var c = vec3.transformMat4(BoundingVolumeVectorCache[1], this.center, mat);
		return new BoundingSphere(c, this.radius*Math.max(scale[0],scale[1],scale[2]));
	},
	
	toString: function() {
		return "BoundingSphere["+
			"center=("+this.center[0]+", "+this.center[1]+", "+this.center[2]+") "+
			"radius="+this.radius+
		"]";
	}
});