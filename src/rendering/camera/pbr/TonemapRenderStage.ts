import Material from "../../materials/Material";
import ShaderDescriptor from "../../../scene/descriptors/ShaderDescriptor";
import RenderingContext from "../../RenderingContext";
import Engine from "../../../engine/Engine";
import Camera from "../Camera";
import PBRRenderStage from "./PBRRenderStage";
import Scene from "../../../scene/Scene";

class TonemapRenderStage extends PBRRenderStage {
	material: Material;

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/tonemap.frag')
			),
			{},
			[]
		);

		engine.assetsManager.load();
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		camera.renderStage.screenQuad.render(context, this.material, camera.renderStage.srcSampler);

		super.onPostRender(context, scene, camera);
	}
}

globalThis.TonemapRenderStage = TonemapRenderStage;
export default TonemapRenderStage;
