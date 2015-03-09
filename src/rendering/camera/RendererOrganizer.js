/**
 * Utility class for pre-organizing renderers for the rendering pipeline.
 */
var RendererOrganizer = Class.extend({
	init: function() {
		this.enableDynamicBatching = true; ///< Set to false to turn off dynamic batching of renderers by material.
		this.solidRenderers = [];
		this.transparentRenderers = [];

		this.reset();
	},

	reset: function() {
		this.solidRendererBatches = {};
		this.transparentRendererBatches = {};
		this.solidRenderers.length = 0;
		this.transparentRenderers.length = 0;

		this.visibleSolidRenderers = 0;
		this.visibleSolidBatches = 0;
		this.visibleSolidFaces = 0;
		this.visibleTransparentRenderers = 0;
		this.visibleTransparentFaces = 0;
		this.visibleTransparentBatches = 0;
	},

	sort: function(engine, renderers, eyePosition) {
		this.reset();

		this.visibleRenderers = renderers.length;
		for (var i=0; i < renderers.length; i++) {
			if (renderers[i].transparent) {
				if (this.enableDynamicBatching && engine.options.transparencyMode != 'sorted') {
					if (renderers[i].material.id in this.transparentRendererBatches) {
						this.transparentRendererBatches[renderers[i].material.id].push(renderers[i]);
					}
					else {
						this.transparentRendererBatches[renderers[i].material.id] = [renderers[i]];
						this.visibleTransparentBatches++;
					}
				}
				this.transparentRenderers.push(renderers[i]);
				this.visibleTransparentFaces += renderers[i].submesh.faces.length / 3;
			}
			else {
				if (this.enableDynamicBatching) {
					if (renderers[i].material.id in this.solidRendererBatches) {
						this.solidRendererBatches[renderers[i].material.id].push(renderers[i]);
					}
					else {
						this.solidRendererBatches[renderers[i].material.id] = [renderers[i]];
						this.visibleSolidBatches++;
					}
				}
				this.visibleSolidFaces += renderers[i].submesh.faces.length / 3;
				this.solidRenderers.push(renderers[i]);
			}
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
