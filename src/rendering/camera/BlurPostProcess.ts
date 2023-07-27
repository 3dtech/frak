import PostProcess from 'rendering/camera/PostProcess.js'
import Material from 'rendering/materials/Material.js'
import UniformVec2 from 'rendering/shaders/UniformVec2.js'

/**
 * Blur
 */

class BlurPostProcess extends PostProcess {
	blurSize: any;
	material: any;

	constructor(blurSize) {
		super();
		this.blurSize = vec2.fromValues(1.0, 1.0);
		if (blurSize)
			vec2.copy(this.blurSize, blurSize);
	}

	onStart(context, engine): any {
		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/postprocess_blur"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('postprocess_blur')),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.size)),
				"BlurSize": new UniformVec2(this.blurSize)
			},
			[]);
		this.material.name = 'Blur';

		engine.assetsManager.load();
	}

	onPreRender(context, scene, camera) {
		super.onPreRender(context, scene, camera);
		vec2.set(this.material.uniforms.ViewportSize.value, this.parent.size[0], this.parent.size[1]);
	}

}

globalThis.BlurPostProcess = BlurPostProcess;

export default BlurPostProcess;
