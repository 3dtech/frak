import PostProcess from "../PostProcess";
import Material from "../../materials/Material";
import ShaderDescriptor from "../../../scene/descriptors/ShaderDescriptor";

class TonemapRenderStage extends PostProcess {
	onStart(context, engine, camera): any {
		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/tonemap.frag')
			),
			{},
			[]
		);
	}
}

globalThis.TonemapRenderStage = TonemapRenderStage;
export default TonemapRenderStage;
