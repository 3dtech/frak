/**
 * Render-stage for rendering opaque geometry.
 */
var OpaqueGeometryRenderStage = RenderStage.extend({

	onPostRender: function(context, scene, camera) {
		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		// Render solid renderers with the first light
		if (scene.lights.length>0)
			context.light = scene.lights[0];

		if (this.parent.enableDynamicBatching) {
			this.parent.renderBatched(context, this.parent.solidRendererBatches);
		}
		else {
			this.parent.renderBruteForce(context, this.parent.solidRenderers);
		}

		// Render solid geometry with the rest of the lights
		if (scene.lights.length>1) {
			gl.depthMask(false);
			gl.depthFunc(gl.LEQUAL);
			gl.blendFunc(gl.ONE, gl.ONE);
			gl.enable(gl.BLEND);
			for (var l=1; l<scene.lights.length; l++) {
				context.light = scene.lights[l];
				if (this.parent.enableDynamicBatching) {
					this.parent.renderBatched(context, this.parent.solidRendererBatches);
				}
				else {
					this.parent.renderBruteForce(context, this.parent.solidRenderers);
				}
			}
			gl.disable(gl.BLEND);
			gl.depthMask(true);
			gl.depthFunc(gl.LESS);
		}

		gl.disable(gl.DEPTH_TEST);
		context.light = false;
	}

});