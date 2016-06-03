/**
 * Render-stage for rendering transparent geometry.
 */
var TransparentGeometryRenderStage = RenderStage.extend({

	/** Renders transparent renderers in the given order (assumes they are sorted back-to-front). */
	renderSorted: function(context, scene, camera) {
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
	},

	onPostRender: function(context, scene, camera) {
		if (scene.engine.options.transparencyMode == 'sorted') {
			this.renderSorted(context, scene, camera);
		}

		// Order independent techniques only require the alpha-mapped opaque geometry to be rendered
		else {
			this.parent.oitStage.renderAlphaMapped(context, scene, camera);
		}
	}
});