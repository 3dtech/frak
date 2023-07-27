import ShaderRenderStage from 'rendering/camera/ShaderRenderStage.js'

/** Render-stage that outputs geometry using a custom shader. */

class FallbackRenderStage extends ShaderRenderStage {
	shader: any;
	
	constructor(shader, target) {
		super(target);
		this.shader=shader;
	}

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