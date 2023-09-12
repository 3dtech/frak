import ShaderRenderStage from 'rendering/camera/ShaderRenderStage';

/** Render-stage that outputs geometry using a custom shader. */
class FallbackRenderStage extends ShaderRenderStage {
	// Events
	/** Called after rendering substages of this render-stage */
	onPostRender(context, scene, camera) {
		this.shader.use();
		// Cast camera frustum over scene
		var renderers=scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		for(var i=0; i<renderers.length; i++) {
			renderers[i].renderGeometry(context, this.shader);
		}
	}
}

globalThis.FallbackRenderStage = FallbackRenderStage;
export default FallbackRenderStage;
