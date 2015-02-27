// Deprecation: this will become a base class for any light component and
// the directional light functionality will move to DirectionalLight

/** Base class for all lights */
var Light = Component.extend({
	init: function() {
		this._super();
		this.color = new Color(1.0, 1.0, 1.0, 1.0);
		this.intensity = 1.0;

		this.direction = vec3.fromValues(0.0, -1.0, 0.0); // TODO: move to DirectionalLight

		this.shadowIntensity = 0.40;
		this.shadowBlurKernelSize=5; ///< Should always be an integer in range [1,10]
		this.shadowCasting=false;
		this.shadowMask=0xFFFFFFFF;
	},

	type: function() {
		return "Light";
	},

	// TODO: move to DirectionalLight
	/** Sets light direction. The given vector is re-normalized.
		@param direction {vec3} The new light direction. Does not have to be normalized. */
	setLightDirection: function(direction) {
		vec3.copy(this.direction, direction);
		vec3.normalize(this.direction, this.direction);
	},

	onAddScene: function(node) {
		node.scene.lights.push(this);
	},

	onRemoveScene: function(node) {
		var lights = node.scene.lights;
		for (var i=0; i<lights.length; i++) {
			if (lights[i]==this) {
				lights.splice(i, 1);
				i--;
			}
		}
	},

	getGeometryRenderers: function() {
		return [];
	},

	isPositional: function() {
		return false;
	}
});