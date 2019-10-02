import {Space} from './Space';
import {RayTestResult} from "../../scene/geometry/RayTestResult";

/** Dynamic space contains submesh renderers that can be moved around and the changes will be reflected in queries. Wanna go to space! */
export class DynamicSpace extends Space {
	init() {
		this.renderers = [];
		this.colliders = [];
		this.filteredRenderers = [];
	}

	/** Add new renderer
		@param renderer Instance of {Renderer} */
	addRenderer(renderer) {
		this.renderers.push(renderer);
		this.filteredRenderers.push(null);
	}

	/** Removes a renderer
		@param renderer Instance of {Renderer} */
	removeRenderer(renderer) {
		for (var i=0; i<this.renderers.length; i++) {
			if (this.renderers[i]===renderer) {
				this.renderers.splice(i, 1);
				this.filteredRenderers.pop();
				return true;
			}
		}
		return false;
	}

	/** Add new collider
		@param collider Instance of {Collider} */
	addCollider(collider) {
		this.colliders.push(collider);
	}

	/** Removes a collider
		@param collider Instance of {Collider} */
	removeCollider(collider) {
		for (var i=0; i<this.colliders.length; i++) {
			if (this.colliders[i]===collider) {
				this.colliders.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	/** TODO: Actually cast the frustum
		Casts a frustum over geometry
		@param frustum Instance of Frustum
		@param layerMask Layer mask (int)
		@return An array of geometry inside the frustum or intersecting it (elements of array are of type Renderer) */
	frustumCast(frustum, layerMask) {
		var renderer;
		var index = 0;
		for (var i = 0; i < this.renderers.length; ++i) {
			renderer = this.renderers[i];
			if (renderer.visible && (renderer.layer & layerMask)) {
				this.filteredRenderers[index++] = renderer;
			}
		}
		for (var i = index; i < this.filteredRenderers.length; ++i) {
			this.filteredRenderers[i] = null;
		}
		return this.filteredRenderers;
	}

	/** Casts a ray over the colliders in this space
		@param ray Instance of Ray
		@param layerMask Layer mask (int)
		@param collideInvisible If set to true the ray will also collide with invisible colliders
		@return A RayTestResult instance */
	rayCast(ray, layerMask, collideInvisible) {
		var result = new RayTestResult(ray);
		if (!layerMask)
			return result;
		for (var i=0; i<this.colliders.length; i++) {
			if (!this.colliders[i].enabled)
				continue;
			if (this.colliders[i].node.layer & layerMask) {
				this.colliders[i].rayTest(ray, result, collideInvisible);
			}
		}
		return result;
	}
}
