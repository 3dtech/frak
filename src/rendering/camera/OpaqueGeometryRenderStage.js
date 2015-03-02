/**
 * Render-stage for rendering opaque geometry.
 */
var OpaqueGeometryRenderStage = RenderStage.extend({

	getDirectionalLights: function(scene) {
		var lights = [];
		for (var i=0; i<scene.lights.length; i++) {
			if (!(scene.lights[i] instanceof DirectionalLight))
				continue;
			if (!scene.lights[i].enabled)
				continue;
			lights.push(scene.lights[i]);
		}
		return lights;
	},

	onPostRender: function(context, scene, camera) {
		var lights = this.getDirectionalLights(scene);

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		// Render solid renderers with the first light
		if (lights.length>0)
			context.light = lights[0];

		if (this.parent.organizer.enableDynamicBatching) {
			this.parent.renderBatched(context, this.parent.solidRendererBatches);
		}
		else {
			this.parent.renderBruteForce(context, this.parent.solidRenderers);
		}

		// Render solid geometry with the rest of the lights
		if (lights.length>1) {
			gl.depthMask(false);
			gl.depthFunc(gl.LEQUAL);
			gl.blendFunc(gl.ONE, gl.ONE);
			gl.enable(gl.BLEND);
			// Note: Fordward renderer only supports directional lighting at this point
			for (var l=1; l<lights.length; l++) {
				context.light = lights[l];

				if (this.parent.organizer.enableDynamicBatching) {
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