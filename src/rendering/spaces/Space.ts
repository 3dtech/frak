import Renderer from 'rendering/renderers/Renderer.js'

/** Space contains renderable geometry that can be queried. Space! Wanna go to space! */

class Space {


	constructor() {}

	/** Casts a frustum over geometry
		@param frustum Instance of Frustum
		@param layerMask Layer mask (int)
		@return An array of geometry inside the frustum or intersecting it (elements of array are of type Renderer) */
	frustumCast(frustum, layerMask): any { }

	/** Casts a ray over geometry
		@param frustum Instance of Frustum
		@return An array of geometry or intersecting the ray (elements of array are of type Renderer) */
	rayCast(ray, mask?, invisible?): any { }

	/** Casts a line over geometry
		@param frustum Instance of Frustum
		@return An array of geometry or intersecting the line (elements of array are of type Renderer) */
	lineCast(line) { }

}

globalThis.Space = Space;

export default Space;
