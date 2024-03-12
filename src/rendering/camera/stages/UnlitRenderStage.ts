import RenderingContext from "rendering/RenderingContext";
import Engine from "engine/Engine";
import Scene from "scene/Scene";
import Camera from "../Camera";
import Shader from "rendering/shaders/Shader";
import PBRRenderStage from "./PBRRenderStage";

class UnlitRenderStage extends PBRRenderStage {
	shader: Shader;

	onStart(context: RenderingContext, engine: Engine, camera: any) {
		this.shader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/unlit.frag',
			['MATERIAL_UNLIT']);
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		super.onPreRender(context, scene, camera);

		const gl = context.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(true);
		gl.disable(gl.STENCIL_TEST);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;

		scene.organizer.unlitRenderers.run(
			context,
			this.shader,
			this.parent.filteredRenderers,
			undefined,
			undefined,
			(r, s) => {
				if (!!(camera.stencilMask & r.material.stencilLayer)) {
					r.renderGeometry(context, s);
				}
			}
		);

		gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);

		super.onPostRender(context, scene, camera);
	}
}

globalThis.UnlitRenderStage = UnlitRenderStage;
export default UnlitRenderStage;
