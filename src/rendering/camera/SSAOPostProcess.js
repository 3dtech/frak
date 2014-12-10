var SSAOPostProcess = PostProcess.extend({
	init: function(size) {
		this._super();
	},

	onStart: function(context, engine) {
		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/postprocess_ssao"),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.size)),
				"ssaoOnly": new UniformInt((this.ssaoOnly === true) ? 1 : 0),
				"gdisplace": new UniformFloat((engine.options.ssaoGDisplace) ? engine.options.ssaoGDisplace : 0.3),
				"radius": new UniformFloat((engine.options.ssaoRadius) ? engine.options.ssaoRadius : 2.0),
				"luminanceInfluence": new UniformFloat((engine.options.ssaoLuminanceInfluence) ? engine.options.ssaoLuminanceInfluence : 0.7),
				"brightness": new UniformFloat((engine.options.ssaoBrightness) ? engine.options.ssaoBrightness : 1.0),
			},
			[
				this.parent.generator.depthStage.sampler
			]
		);
		this.material.name = "SSAO";

		if (engine.options.transparencyMode == 'sorted') {
			this.material.samplers.push(new Sampler('oitWeight', engine.WhiteTexture));
		}
		else {
			this.material.samplers.push(this.parent.generator.oitStage.transparencyWeightSampler);
		}

		engine.assetsManager.load();
	},

	onPreRender: function(context, scene, camera) {
		this._super(context, scene, camera);


		vec2.set(this.material.uniforms.ViewportSize.value, this.parent.size[0], this.parent.size[1]);
		this.material.uniforms.ssaoOnly.value = (this.ssaoOnly === true) ? 1 : 0;
	}
});