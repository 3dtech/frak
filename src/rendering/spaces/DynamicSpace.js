/** Dynamic space contains submesh renderers that can be moved around and the changes will be reflected in queries. Wanna go to space! */
var DynamicSpace=Space.extend({
	init: function() {
		this.renderers=[];
		this.colliders=[];
	},

	/** Add new renderer
		@param renderer Instance of {Renderer} */
	addRenderer: function(renderer) {
		this.renderers.push(renderer);
	},

	/** Removes a renderer
		@param renderer Instance of {Renderer} */
	removeRenderer: function(renderer) {
		for (var i in this.renderers) {
			if (this.renderers[i]===renderer) {
				this.renderers.splice(i, 1);
				return true;
			}
		}
		return false;
	},

	/** Add new collider
		@param collider Instance of {Collider} */
	addCollider: function(collider) {
		this.colliders.push(collider);
	},

	/** Removes a collider
		@param collider Instance of {Collider} */
	removeCollider: function(collider) {
		for (var i in this.colliders) {
			if (this.colliders[i]===collider) {
				this.colliders.splice(i, 1);
				return true;
			}
		}
		return false;
	},

	/** TODO: Actually cast the frustum
		Casts a frustum over geometry
		@param frustum Instance of Frustum
		@param layerMask Layer mask (int)
		@return An array of geometry inside the frustum or intersecting it (elements of array are of type Renderer) */
	frustumCast: function(frustum, layerMask) {
		var ret = [];
		for (var i in this.renderers) {
			if (this.renderers[i].visible && (this.renderers[i].layer & layerMask))
				ret.push(this.renderers[i]);
		}
		return ret;
	},

	/** Casts a ray over the colliders in this space
		@param ray Instance of Ray
		@param layerMask Layer mask (int)
		@param collideInvisible If set to true the ray will also collide with invisible colliders
		@return A RayTestResult instance */
	rayCast: function(ray, layerMask, collideInvisible) {
		var result = new RayTestResult(ray);
		if (!layerMask)
			return result;
		for (var i in this.colliders) {
			if (!this.colliders[i].enabled)
				continue;
			if (this.colliders[i].node.layer & layerMask) {
				this.colliders[i].rayTest(ray, result, collideInvisible);
			}
		}
		return result;
	}
});