var SSAOPostProcess = PostProcess.extend({
    init: function(size) {
        this._super();
    },
    
    onStart: function(context, engine) {
        this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/ssaoblur"),
			{
                "ViewportSize": new UniformVec2(vec2.clone(this.parent.size)),
                "ssaoBlurSize": new UniformInt(2)
            },
			[ new Sampler( "ao0", this.parent.generator.ssaoBufferStage.target.texture )]);
        this.material.name = "SSAO";
        
        engine.assetsManager.load();
    },

	onPreRender: function(context, scene, camera) {
		this._super(context, scene, camera);

		vec2.set(this.material.uniforms.ViewportSize.value, this.parent.size[0], this.parent.size[1]);
	}
});