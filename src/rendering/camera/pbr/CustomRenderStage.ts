import RenderingContext from "../../RenderingContext";
import Engine from "../../../engine/Engine";
import Scene from "../../../scene/Scene";
import Camera from "../Camera";
import Shader from "../../shaders/Shader";
import PBRRenderStage from "./PBRRenderStage";

class CustomRenderStage extends PBRRenderStage {

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		super.onPreRender(context, scene, camera);

		const gl = context.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(false);
		gl.disable(gl.STENCIL_TEST);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;

		scene.organizer.customRenderers.run(context, null, this.parent.filteredRenderers, r => {
			r.material.shader.use();
			return r.material.shader;
		});

		gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);

		super.onPostRender(context, scene, camera);
	}
}

globalThis.CustomRenderStage = CustomRenderStage;
export default CustomRenderStage;
