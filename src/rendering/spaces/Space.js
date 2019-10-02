import {FrakClass} from "../../FRAK";

/** Space contains renderable geometry that can be queried. Space! Wanna go to space! */
export class Space extends FrakClass {
	init() {
	}

	/** Casts a frustum over geometry
	 @param frustum Instance of Frustum
	 @param layerMask Layer mask (int)
	 @return An array of geometry inside the frustum or intersecting it (elements of array are of type Renderer) */
	frustumCast(frustum, layerMask) {
	}

	/** Casts a ray over geometry
	 @param frustum Instance of Frustum
	 @return An array of geometry or intersecting the ray (elements of array are of type Renderer) */
	rayCast(ray) {
	}

	/** Casts a line over geometry
	 @param frustum Instance of Frustum
	 @return An array of geometry or intersecting the line (elements of array are of type Renderer) */
	lineCast(line) {
	}
}
