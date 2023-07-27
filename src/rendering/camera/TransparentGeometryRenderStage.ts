import RenderStage from 'rendering/camera/RenderStage.js'

/**
 * Render-stage for rendering transparent geometry.
 */

class TransparentGeometryRenderStage extends RenderStage {

	

	/** Renders transparent renderers in the given order (assumes they are sorted back-to-front). */
	renderSorted(context, scene, camera): any {
		var gl = context.gl;
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		gl.depthMask(false);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		this.parent.renderBruteForce(context, this.parent.organizer.transparentRenderers);

		gl.disable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(true);
	}

	onPostRender(context, scene, camera) {
		if (scene.engine.options.transparencyMode == 'sorted') {
			this.renderSorted(context, scene, camera);
		}

		// Order independent techniques only require the alpha-mapped opaque geometry to be rendered
		else {
			this.parent.oitStage.renderAlphaMapped(context, scene, camera);
		}
	}

}

globalThis.TransparentGeometryRenderStage = TransparentGeometryRenderStage;

export default TransparentGeometryRenderStage;