/**
 * Blur
 */
var BlurPostProcess = PostProcess.extend({
	init: function(blurSize) {
		this._super();
		this.blurSize = vec2.fromValues(1.0, 1.0);
		if (blurSize)
			vec2.copy(this.blurSize, blurSize);
	},

	onStart: function(context, engine) {
		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/postprocess_blur"),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.size)),
				"BlurSize": new UniformVec2(this.blurSize)
			},
			[]);
		this.material.name = 'Blur';

		engine.assetsManager.load();
	},

	onPreRender: function(context, scene, camera) {
		this._super(context, scene, camera);
		vec2.set(this.material.uniforms.ViewportSize.value, this.parent.size[0], this.parent.size[1]);
	}
});
