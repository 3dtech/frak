/**
 * Utility class for pre-organizing renderers for the rendering pipeline.
 */
var RendererOrganizer = FrakClass.extend({
	init: function() {
		this.enableDynamicBatching = true; ///< Set to false to turn off dynamic batching of renderers by material.
		this.solidRenderers = [];
		this.transparentRenderers = [];

		this.opaqueBatchList = [];
		this.transparentBatchList = [];

		this.reset();
	},

	reset: function() {
		this.solidRendererBatches = {};
		this.transparentRendererBatches = {};
		this.solidRenderers.length = 0;
		this.transparentRenderers.length = 0;

		this.opaqueBatchList.length = 0;
		this.transparentBatchList.length = 0;

		this.visibleSolidRenderers = 0;
		this.visibleSolidBatches = 0;
		this.visibleSolidFaces = 0;
		this.visibleTransparentRenderers = 0;
		this.visibleTransparentFaces = 0;
		this.visibleTransparentBatches = 0;
	},

	sort: function(engine, renderers, eyePosition) {
		this.reset();

		this.visibleRenderers = 0;
		var renderer;
		for (var i=0; i < renderers.length; i++) {
			renderer = renderers[i];
			if (!renderer)
				continue;

			this.visibleRenderers++;

			if (renderer.transparent) {
				if (this.enableDynamicBatching && engine.options.transparencyMode != 'sorted') {
					if (renderer.material.id in this.transparentRendererBatches) {
						this.transparentRendererBatches[renderer.material.id].push(renderer);
					}
					else {
						this.transparentRendererBatches[renderer.material.id] = [renderer];
						this.visibleTransparentBatches++;
					}
				}
				this.transparentRenderers.push(renderer);
				if (renderer instanceof SubmeshRenderer)
					this.visibleTransparentFaces += renderer.submesh.faces.length / 3;
			}
			else {
				if (this.enableDynamicBatching) {
					if (renderer.material.id in this.solidRendererBatches) {
						this.solidRendererBatches[renderer.material.id].push(renderer);
					}
					else {
						this.solidRendererBatches[renderer.material.id] = [renderer];
						this.visibleSolidBatches++;
					}
				}
				this.solidRenderers.push(renderer);
				if (renderer instanceof SubmeshRenderer)
					this.visibleSolidFaces += renderer.submesh.faces.length / 3;
			}
		}

		for (var id in this.solidRendererBatches) {
			this.opaqueBatchList.push(this.solidRendererBatches[id]);
		}

		for (var id in this.transparentRendererBatches) {
			this.transparentBatchList.push(this.transparentRendererBatches[id]);
		}

		this.visibleTransparentRenderers = this.transparentRenderers.length;
		this.visibleSolidRenderers = this.solidRenderers.length;

		// Sort transparent renderers
		if (engine.options.transparencyMode == 'sorted' && eyePosition) {
			this.transparentRenderers.sort(function(a, b) {
				var d1 = vec3.squaredDistance(eyePosition, a.globalBoundingSphere.center);
				var d2 = vec3.squaredDistance(eyePosition, b.globalBoundingSphere.center);
				if (d1>d2) return -1;
				if (d1<d2) return 1;
				return 0;
			});
		}
	}
});
