/** Base class for all lights */
var Light = Component.extend({
	init: function() {
		this._super();
		this.color = new Color(1.0, 1.0, 1.0, 1.0);
		this.intensity = 1.0;
		this.shadowCasting = false;
		this.shadowMask = 0xFFFFFFFF;
		this.damaged = true;
	},

	type: function() {
		return "Light";
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
	},

	onContextRestored: function(context) {},

	damage: function() {
		this.damaged = true;
	},

	undamage: function() {
		this.damaged = false;
	}
});
