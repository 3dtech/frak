import RenderStage from 'rendering/camera/RenderStage.js'

/** Render-stage that outputs geometry using a custom shader. */

class ShaderRenderStage extends RenderStage {
	shader: any;
	uniforms: any;

	constructor(shader, target) {
		super();
		this.shader=shader;
		this.uniforms={};				// Extra uniforms
	}

	// Events
	/** Called after rendering substages of this render-stage */
	onPostRender(context, scene, camera) {
		this.shader.use(this.uniforms);

		if(this.shader.requirements.transparent) {
			context.gl.blendFunc(context.gl.SRC_ALPHA, context.gl.ONE);
			context.gl.enable(context.gl.BLEND);
		}

		// Cast camera frustum over scene
		var renderers=scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		for(var i=0; i<renderers.length; i++) {
			renderers[i].renderGeometry(context, this.shader);
		}

		if(this.shader.requirements.transparent) {
			context.gl.disable(context.gl.BLEND);
		}
	}

}

globalThis.ShaderRenderStage = ShaderRenderStage;

export default ShaderRenderStage;
