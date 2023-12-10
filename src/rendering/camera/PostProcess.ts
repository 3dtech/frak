import RenderStage from './stages/RenderStage';
import PostProcessRenderStage from './stages/PostProcessRenderStage';

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
		if (!(this.parent instanceof PostProcessRenderStage))
			throw "PostProcess can only be the sub-stage of a PostProcessRenderStage";
	}

	onPostRender(context, scene, camera) {
		if (!this.material)
			throw "PostProcess must have a material defined"

		this.parent.dst.bind(context);
		this.parent.renderEffect(context, this.material, this.parent.srcSampler);
		this.parent.dst.unbind(context);
		this.parent.swapBuffers();
	}
}

globalThis.PostProcess = PostProcess;
export default PostProcess;
