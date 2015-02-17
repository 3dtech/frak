/**
 * G-buffer renderer
 */
var GBufferRenderStage = RenderStage.extend({
	init: function() {
		this._super();
		this.organizer = new RendererOrganizer();
		this.buffer = null;
		this.clearColor = new Color(0.0, 0.0, 0.0, 0.0);

		// this.skyboxStage = this.addStage(new SkyboxRenderStage()); // needs to be part of G-buffer
	},

	onStart: function(context, engine, camera) {
		this.buffer = new TargetTextureMulti(context, size, { numTargets: 4 });
		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/deferred_gbuffer"),
			{
				'zNear': new UniformFloat(0.1),
				'zFar': new UniformFloat(1000.0)
			},
			[]);

		engine.assetsManager.load();
	},

	onPreRender: function(context, scene, camera) {
		this.material.uniforms.zNear.value = camera.near;
		this.material.uniforms.zFar.value = camera.far;
	},

	onPostRender: function(context, scene, camera) {
		var gl = context.gl;

		gl.depthMask(true);
		gl.colorMask(true, true, true, true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		this.buffer.bind(context, false, this.clearColor);

		// Render opaque geometry to the g-buffer
		this.renderBatches(context, scene, camera, this.organizer.solidRendererBatches, this.material);

		// Render parts of transparent geometry to the g-buffer where alpha = 1
		this.renderBatches(context, scene, camera, this.organizer.transparentRendererBatches, this.material);

		this.buffer.unbind(context);

		gl.disable(gl.DEPTH_TEST);
	},

	renderBatches: function(context, scene, camera, batches, material) {
		var shader = material.shader;
		shader.use();

		// Bind shared uniforms
		shader.bindUniforms(material.uniforms);
		shader.bindUniforms(this.parent.sharedUniforms);

		for (var i in batches) {
			var batch = batches[i];
			var batchMaterial = batch[0].material;

			var samplers;
			if (material.samplers.length>0) {
				samplers = material.samplers.concat(batchMaterial.samplers);
			}
			else {
				samplers = batchMaterial.samplers;
			}

			if (batchMaterial.samplers.length == 0) {
				samplers.push(this.parent.diffuseFallback);
			}

			// Bind material uniforms and samplers
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(samplers);

			for (var j=0; j<batch.length; ++j) {
				context.modelview.push();
				context.modelview.multiply(batch[j].matrix);

				// Bind renderer specific uniforms
				this.parent.rendererUniforms.model.value = batch[j].matrix;
				this.parent.rendererUniforms.modelview.value = context.modelview.top();
				this.parent.rendererUniforms.modelviewInverse.value = this.invModelview;
				shader.bindUniforms(this.parent.rendererUniforms);

				batch[j].renderGeometry(context, shader);

				context.modelview.pop();
			}

			shader.unbindSamplers(samplers);
		}
	}
});