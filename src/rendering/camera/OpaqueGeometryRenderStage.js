/**
 * Render-stage for rendering opaque geometry.
 */
var OpaqueGeometryRenderStage = RenderStage.extend({
	init: function() {
		this._super();
		this.activeLights = [];
	},

	getDirectionalLights: function(scene) {
		if (this.activeLights.length < scene.lights.length)
			this.activeLights.length = scene.lights.length;

		var index = 0;
		var light;
		for (var i = 0; i < scene.lights.length; ++i) {
			light = scene.lights[i];
			if (!(light instanceof DirectionalLight))
				continue;
			if (!light.enabled)
				continue;
			this.activeLights[index++] = light;
		}

		for (var i = index; i < scene.lights.length; ++i)
			this.activeLights[i] = null;
		return this.activeLights;
	},

	onPostRender: function(context, scene, camera) {
		var lights = this.getDirectionalLights(scene);

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		// Render solid renderers with the first light
		if (lights.length > 0 && lights[0])
			context.light = lights[0];

		if (this.parent.organizer.enableDynamicBatching) {
			this.parent.renderBatched(context, this.parent.organizer.opaqueBatchList);
		}
		else {
			this.parent.renderBruteForce(context, this.parent.organizer.solidRenderers);
		}

		// Render solid geometry with the rest of the lights
		if (lights.length > 1 && lights[1]) {
			gl.depthMask(false);
			gl.depthFunc(gl.LEQUAL);
			gl.blendFunc(gl.ONE, gl.ONE);
			gl.enable(gl.BLEND);
			// Note: Fordward renderer only supports directional lighting at this point
			for (var l = 1; l < lights.length; l++) {
				if (!lights[l])
					break;

				context.light = lights[l];
				if (this.parent.organizer.enableDynamicBatching) {
					this.parent.renderBatched(context, this.parent.organizer.opaqueBatchList);
					this.parent.renderBatched(context, this.parent.organizer.customBatchList);
				}
				else {
					this.parent.renderBruteForce(context, this.parent.organizer.solidRenderers);
					this.parent.renderBruteForce(context, this.parent.organizer.customRenderers);
				}
			}
			gl.disable(gl.BLEND);
			gl.depthMask(true);
			gl.depthFunc(gl.LESS);
		}

		if (this.parent.organizer.enableDynamicBatching) {
			this.parent.renderBatched(context, this.parent.organizer.unlitBatchList);
		} else {
			this.parent.renderBruteForce(context, this.parent.organizer.unlitRenderers);
		}

		gl.disable(gl.DEPTH_TEST);
		context.light = false;
	}

});
