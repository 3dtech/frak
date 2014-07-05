/** Render-stage that outputs geometry using a custom shader. */
var FallbackRenderStage=ShaderRenderStage.extend({
	init: function(shader, target) {
		this._super(target);
		this.shader=shader;
	},
	
	// Events
	/** Called after rendering substages of this render-stage */
	onPostRender: function(context, scene, camera) {
		this.shader.use();
		// Cast camera frustum over scene
		var renderers=scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		for(var i in renderers) {
			renderers[i].renderGeometry(context, this.shader);
		}
	}
});