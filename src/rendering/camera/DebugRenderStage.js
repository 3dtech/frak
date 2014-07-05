/** Render-stage that is used to output debug information for geometry. */
var DebugRenderStage=RenderStage.extend({
	init: function(target, engine) {
		this._super(target);
		this.shader=engine.assetsManager.addShaderSource('shaders/default/debug');
		engine.assetsManager.load();
	},
	
	// Events
	/** Called after rendering substages of this render-stage */
	onPostRender: function(context, scene, camera) {		
		// Cast camera frustum over scene
		var renderers=scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		
		context.gl.blendFunc(context.gl.SRC_ALPHA, context.gl.ONE_MINUS_SRC_ALPHA);
		context.gl.enable(context.gl.BLEND);
		
		// Render solid renderers and store transparent renderers in separate array
		this.shader.use({"color": new UniformVec4([0.5, 1.0, 0.0, 0.3])});
		
		var transparentRenderers=[];
		for(var i in renderers) {
			if(!renderers[i].transparent) {
				renderers[i].renderGeometry(context, this.shader);
				this.visibleSolidRenderers++;
			}
			else {
				transparentRenderers.push(renderers[i]);
			}
		}
	
		this.shader.use({"color": new UniformVec4([0.5, 0.5, 1.0, 0.3])});
		for(var i in transparentRenderers) {
			transparentRenderers[i].renderGeometry(context, this.shader);
		}
		
		context.gl.disable(context.gl.BLEND);
	}
});