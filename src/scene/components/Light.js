/** Basic directional light */
var Light=Component.extend({ 
	init: function() {
		this._super();
		this.direction=vec3.fromValues(0.0, -1.0, 0.0);
		this.color=new Color();
		this.intensity=1.0;
		this.shadowIntensity=0.40;
		this.shadowBlurKernelSize=5; ///< Should always be an integer in range [1,10]
		this.shadowCasting=false;
		this.shadowMask=0xFFFFFFFF;
	},
	
	type: function() {
		return "Light";
	},

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
	}
});