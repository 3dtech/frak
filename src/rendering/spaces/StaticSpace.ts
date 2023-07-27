import Space from 'rendering/spaces/Space.js'
import Renderer from 'rendering/renderers/Renderer.js'

/** Static scene renderer renders scene as was when it the renderer is added to renderers list.
	Even if scene is modified, it is still rendered as it was. */

class StaticSpace extends Space {

	
	constructor(context) { 
		
	}

	/** Casts a frustum over geometry
		@param frustum Instance of Frustum
		@param layerMask Layer mask (int)
		@return An array of geometry inside the frustum or intersecting it (elements of array are of type Renderer) */
	frustumCast(frustum, layerMask): any { }

	/** Casts a ray over geometry
		@param frustum Instance of Frustum
		@return An array of geometry or intersecting the ray (elements of array are of type Renderer) */
	rayCast(ray): any { }

	/** Casts a line over geometry
		@param frustum Instance of Frustum
		@return An array of geometry or intersecting the line (elements of array are of type Renderer) */
	lineCast(line) { }

}

globalThis.StaticSpace = StaticSpace;

export default StaticSpace;