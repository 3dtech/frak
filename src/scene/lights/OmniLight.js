/**
 * Omni-directional light (sphere)
 */
var OmniLight = Light.extend({
	init: function(size, color) {
		this._super();
		this.size = size || 1.0;
		this.color = color || new Color(1.0, 1.0, 1.0, 1.0);
		this.intensity = 1.0;
		this.geometry = null;
		this.material = null;
	},

	type: function() {
		return "OmniLight";
	},

	onStart: function(context, engine) {
		this._super();

		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_light_omni"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_light_omni')),
			{
				'lightColor': new UniformColor(this.color),
				'lightPosition': new UniformVec3(vec3.create()),
				'lightIntensity': new UniformFloat(this.intensity),
				'lightRadius': new UniformFloat(this.size)
			},
			[]
		);

		this.geometry = Primitives.sphere(this.size, 16, 16, this.material);
		this.geometry.getComponent(MeshRendererComponent).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	},

	onPreRender: function() {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
		this.node.transform.getPosition(this.material.uniforms.lightPosition.value);
		this.material.uniforms.lightIntensity.value = this.intensity;
		this.material.uniforms.lightRadius.value = this.size;
	},

	getGeometryRenderers: function() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	},

	isPositional: function() {
		return true;
	}
});
