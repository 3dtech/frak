/**
 * Deferred shading lights phase
 */
var LightsRenderStage = RenderStage.extend({
	init: function() {
		this._super();
	},

	onStart: function(context, engine, camera) {
		// this.material = new Material(
		// 	engine.assetsManager.addShaderSource("shaders/default/deferred_combine"),
		// 	{
		// 	},
		// 	[]);
		// engine.assetsManager.load();
	},

	onPreRender: function(context, scene, camera) {
	},

	onPostRender: function(context, scene, camera) {
	}
});