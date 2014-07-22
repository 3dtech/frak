/**
 * Post-processing stage used to do image space anti-aliasing.
 */
var AntiAliasPostProcess = PostProcess.extend({
	init: function() {
		this._super();
	},

	onStart: function(context, engine) {
		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/postprocess_fxaa"),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.size)),
				"reduce_min": new UniformFloat(1.0 / 16.0),
				"reduce_mul": new UniformFloat(1.0 / 8.0),
				"span_max": new UniformFloat(8.0)
			},
			[]);
		this.material.name = 'AntiAlias';

		engine.assetsManager.load();
	}
});
