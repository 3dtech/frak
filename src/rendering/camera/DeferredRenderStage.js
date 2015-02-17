/**
 * Deferred shading implementation
 */
var DeferredRenderStage = PostProcessRenderStage.extend({
	init: function() {
		this._super();

		// TODO: check that the system can handle deferred rendering

		// #1 - render OIT (renders to 2 float targets)
		// #2 - render geometry to g-buffer (renders to 4 float targets)
		// -- - bind camera target (renders to normal RGBA target)
		// #3 - render light shapes and use g-buffer to apply right color, apply OIT data
		// -- - unbind camera target
		// #4 - apply post processing effects (normal RGBA targets swapped once per effect)
	},

	getGeneratorStage: function() {
		return new DeferredShadingRenderStage();
	}

	// onStart: function(context, engine, camera) {
	// 	this._super();
	// }
});