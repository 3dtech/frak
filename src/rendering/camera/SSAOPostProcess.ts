import PostProcess from 'rendering/camera/PostProcess.js'
import Material from 'rendering/materials/Material.js'
import UniformVec2 from 'rendering/shaders/UniformVec2.js'
import UniformInt from 'rendering/shaders/UniformInt.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import Sampler from 'rendering/shaders/Sampler.js'


class SSAOPostProcess extends PostProcess {
	ssaoOnly: any;
	material: any;

	constructor(size) {
		super();
		this.ssaoOnly = false;
	}

	onStart(context, engine): any {
		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/postprocess_ssao"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('postprocess_ssao')),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.src.size)),
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

		if (engine.options.transparencyMode == 'blended') {
			this.material.samplers.push(this.parent.generator.oitStage.transparencyWeightSampler);
		}
		else {
			this.material.samplers.push(new Sampler('oitWeight', engine.WhiteTexture));
		}

		engine.assetsManager.load();
	}

	onPreRender(context, scene, camera) {
		super.onPreRender(context, scene, camera);

		vec2.set(this.material.uniforms.ViewportSize.value, this.parent.src.size[0], this.parent.src.size[1]);
		this.material.uniforms.ssaoOnly.value = (this.ssaoOnly === true) ? 1 : 0;
	}

}

globalThis.SSAOPostProcess = SSAOPostProcess;

export default SSAOPostProcess;
