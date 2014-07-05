/**
 * Abstract bounding volume class.
 */
var BoundingVolume=Serializable.extend({
	/** Constructor */
	init: function(center) {
		this.center=false;
		if (center) this.center=vec3.clone(center);
	},
	
	type: function() {
		return "BoundingVolume";
	},
	
	/** Returns true if the bounding volume has volume greater than 0. 
		@return {boolean} True if the bounding volume has volume greater than 0 */
	isPoint: function() {
		return true;
	},
	
	/** Returns the string representation of this bounding volume.
		@return The {string} representation of this bounding volume */
	toString: function() {
		return "BoundingVolume[center=("+this.center[0]+","+this.center[1]+","+this.center[2]+")]";
	}
});

var BoundingVolumeVectorCache = [
	vec3.create(),
	vec3.create(),
	vec3.create()
];