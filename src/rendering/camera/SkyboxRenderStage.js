/**
 * Render-stage for rendering the SkyboxComponent.
 */
var SkyboxRenderStage = RenderStage.extend({
	init: function() {
		this._super();

		// internal cache
		this.uniforms = {
			'model': new UniformMat4(mat4.create()),
			'modelview': new UniformMat4(mat4.create()),
			'modelviewInverse': new UniformMat4(mat4.create()),
			'projection': new UniformMat4(mat4.create()),
			'view': new UniformMat4(mat4.create()),
			'viewInverse': new UniformMat4(mat4.create()),
			'zNear': new UniformFloat(0.0),
			'zFar': new UniformFloat(0.0),

			// Fake light uniforms since Skybox doesn't get lighting but currently uses the default diffuse shader
			'lightDirection': new UniformVec3(vec3.create()),
			'lightColor': new UniformColor(new Color()),
			'lightIntensity': new UniformFloat(1.0),
		};
	},

	onPostRender: function(context, scene, camera) {
		var skybox = scene.cameraNode.getComponent(SkyboxComponent);
		if (!skybox) {
			return;
		}

		var globalSamplers = [this.parent.shadowMapFallbackSampler];

		var renderComponent = skybox.meshNode.getComponent(MeshRendererComponent);
		var renderers = renderComponent.meshRenderers;
		for (var i=0; i < renderers.length; i++) {
			var renderer = renderers[i];

			var defaultUniforms = renderer.getDefaultUniforms(context, this.uniforms);
			mat4.identity(defaultUniforms.model.value);
			mat4.translate(defaultUniforms.model.value, defaultUniforms.model.value, camera.getPosition());

			renderer.material.bind(defaultUniforms, globalSamplers);
			renderer.render(context);
			renderer.material.unbind(globalSamplers);
		}
	}
});