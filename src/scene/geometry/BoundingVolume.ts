import Serializable from 'scene/Serializable';

/**
 * Abstract bounding volume class.
 */
class BoundingVolume extends Serializable {
	center: any;

	/** Constructor */
	constructor(center?) {
		super();
		this.center=false;
		if (center) this.center=vec3.clone(center);
	}

	type(): any {
		return "BoundingVolume";
	}

	/** Returns true if the bounding volume has volume greater than 0.
		@return {boolean} True if the bounding volume has volume greater than 0 */
	isPoint(): any {
		return true;
	}

	/** Returns the string representation of this bounding volume.
		@return The {string} representation of this bounding volume */
	toString() {
		return "BoundingVolume[center=("+this.center[0]+","+this.center[1]+","+this.center[2]+")]";
	}
}

globalThis.BoundingVolumeVectorCache = [
	vec3.create(),
	vec3.create(),
	vec3.create()
];

globalThis.BoundingVolume = BoundingVolume;
export default BoundingVolume;
