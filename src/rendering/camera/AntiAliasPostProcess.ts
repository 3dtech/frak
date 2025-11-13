import PostProcess from "rendering/camera/PostProcess";
import Material from "rendering/materials/Material";
import UniformVec2 from "rendering/shaders/UniformVec2";
import UniformFloat from "rendering/shaders/UniformFloat";
import type RenderingContext from "rendering/RenderingContext";

/**
 * Post-processing stage used to do image space anti-aliasing.
 */
class AntiAliasPostProcess extends PostProcess {
	onStart(context, engine): any {
		this.material = new Material(

			// engine.assetsManager.addShaderSource("shaders/default/postprocess_fxaa"),
			engine.assetsManager.addShader("shaders/uv.vert", "shaders/pp_fxaa.frag"),
			{
				ViewportSize: new UniformVec2(vec2.clone(engine.scene.camera.renderStage.src.size)),
				reduce_min: new UniformFloat(1.0 / 16.0),
				reduce_mul: new UniformFloat(1.0 / 8.0),
				span_max: new UniformFloat(8.0),
			},
			[],
		);

		this.material.name = "AntiAlias";

		engine.assetsManager.load();
	}

	onPreRender(context, scene, camera) {
		super.onPreRender(context, scene, camera);

		vec2.copy(this.material.uniforms.ViewportSize.value, camera.renderStage.src.size);
	}

	onPostRender(context: any, scene: any, camera: any): void {
		camera.renderStage.renderEffect(context, this.material, camera.renderStage.srcSampler);
	}

	onContextRestored(context: RenderingContext): void {
		this.material.shader.onContextRestored(context);
	}
}

globalThis.AntiAliasPostProcess = AntiAliasPostProcess;
export default AntiAliasPostProcess;
