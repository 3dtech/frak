/**
 * Post-processing stage used to do order independent transparency.
 */
var OITPostProcess = PostProcess.extend({
	init: function() {
		this._super();
	},

	onStart: function(context, engine) {
		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/OITRender"),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.size))
			},
			[ this.parent.generator.transparencySampler, this.parent.generator.transparencyWeightSampler ]);
		this.material.name = 'OIT';

		engine.assetsManager.load();
	}
});
