/**
 * Post-processing stage used to do order independent transparency.
 */
var OITPostProcess = PostProcess.extend({
	init: function() {
		this._super();
	},

	onStart: function(context, engine) {
		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/OITRender"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('OITRender')),
			{
				'ViewportSize': new UniformVec2(vec2.clone(this.parent.src.size)),
				'render_mode': new UniformInt(0)
			},
			[
				this.parent.generator.oitStage.transparencySampler,
				this.parent.generator.oitStage.transparencyWeightSampler
			]);
		this.material.name = 'OIT';

		engine.assetsManager.load();
	},

	onPreRender: function(context, scene, camera) {
		this._super(context, scene, camera);

		vec2.copy(this.material.uniforms.ViewportSize.value, this.parent.src.size);
		switch (scene.engine.options.transparencyMode) {
			case 'blended':
				this.material.uniforms['render_mode'].value = 0;
				break;
			case 'stochastic':
				this.material.uniforms['render_mode'].value = 1;
				break;
		}
	}
});
