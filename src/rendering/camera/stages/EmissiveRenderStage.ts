import Material from 'rendering/materials/Material';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import ShaderDescriptor from "scene/descriptors/ShaderDescriptor";
import PBRRenderStage from "./PBRRenderStage";
import Engine from "engine/Engine";
import Scene from "scene/Scene";

/**
 * Deferred shading light accumulation pass
 */
class EmissiveRenderStage extends PBRRenderStage {
	material: Material;

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		super.onStart(context, engine, camera);

		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/pbr_emissive.frag')
			),
			{},
			[]
		);

		engine.assetsManager.load();
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);

		gl.enable(gl.BLEND);

		camera.renderStage.screenQuad.render(context, this.material, this.parent.sharedSamplers);

		gl.disable(gl.BLEND);

		super.onPostRender(context, scene, camera);
	}
}

globalThis.EmissiveRenderStage = EmissiveRenderStage;
export default EmissiveRenderStage;
