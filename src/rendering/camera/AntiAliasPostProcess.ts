import PostProcess from 'rendering/camera/PostProcess.js'
import Material from 'rendering/materials/Material.js'
import UniformVec2 from 'rendering/shaders/UniformVec2.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'

/**
 * Post-processing stage used to do image space anti-aliasing.
 */

class AntiAliasPostProcess extends PostProcess {
	material: any;
	
	constructor() {
		super();
	}

	onStart(context, engine): any {
		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/postprocess_fxaa"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('postprocess_fxaa')),
			{
				"ViewportSize": new UniformVec2(vec2.clone(this.parent.src.size)),
				"reduce_min": new UniformFloat(1.0 / 16.0),
				"reduce_mul": new UniformFloat(1.0 / 8.0),
				"span_max": new UniformFloat(8.0)
			}
			[]);
		this.material.name = 'AntiAlias';

		engine.assetsManager.load();
	},

	onPreRender(context, scene, camera) {
		this._super(context, scene, camera);

		vec2.copy(this.material.uniforms.ViewportSize.value, this.parent.src.size);
	}

}

globalThis.AntiAliasPostProcess = AntiAliasPostProcess;

export default AntiAliasPostProcess;