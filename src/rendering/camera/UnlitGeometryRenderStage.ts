import RenderStage from 'rendering/camera/RenderStage';

/**
 * Render-stage for rendering opaque geometry.
 */
class UnlitGeometryRenderStage extends RenderStage {


	constructor() {
		super();
	}

	onPostRender(context, scene, camera) {
		var gl = context.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		if (this.parent.organizer.enableDynamicBatching) {
			this.parent.renderBatched(context, this.parent.organizer.unlitBatchList);
		} else {
			this.parent.renderBruteForce(context, this.parent.organizer.unlitRenderers);
		}

		gl.disable(gl.DEPTH_TEST);
	}
}

globalThis.UnlitGeometryRenderStage = UnlitGeometryRenderStage;
export default UnlitGeometryRenderStage;
