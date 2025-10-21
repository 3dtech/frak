import RenderStage from "./stages/RenderStage";
import PostProcessRenderStage from "./stages/PostProcessRenderStage";

/**
 * Base class for creating image space post-processing render stages.
 */
class PostProcess extends RenderStage {
	material: any;

	constructor() {
		super();
		this.material = false;
	}

	onStart(context, engine, camera): any {
		/* if (!(this.parent instanceof PostProcessRenderStage)) {
			throw "PostProcess can only be the sub-stage of a PostProcessRenderStage";
		} */
		if (!this.material) {
			throw "PostProcess must have a material defined";
		}
	}

	onPostRender(context, scene, camera) {
		camera.renderStage.dst.bind(context);
		camera.renderStage.renderEffect(context, this.material, camera.renderStage.srcSampler);
		camera.renderStage.dst.unbind(context);
		camera.renderStage.swapBuffers();
	}
}

globalThis.PostProcess = PostProcess;
export default PostProcess;
