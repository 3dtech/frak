/**
 * Renders scene depth to a texture
 */
var DepthRenderStage = RenderStage.extend({
	init: function(size) {
		this._super();
		this.target = null;
		this.sampler = new Sampler('depth0', null);
		this.size = vec2.fromValues(1024, 1024);
		if (size)
			vec2.copy(this.size, size);

		this.clearColor = new Color(0.0, 0.0, 0.0, 0.0);
	},

	onStart: function(context, engine) {
		try {
			this.target = new TargetTextureFloat(this.size, context, false);
			this.sampler.texture = this.target.texture;
		}
		catch (e) {
			console.warn('DepthRenderStage: ', e);
			this.disable();
			return;
		}

		this.material=new Material(
			// engine.assetsManager.addShaderSource("shaders/default/depth"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('depth')),
			{
				'zNear': new UniformFloat(0.1),
				'zFar': new UniformFloat(1000.0)
			},
			[]
		);
	},

	onPreRender: function(context, scene, camera) {
		this.target.resetViewport();

		if (camera.target.size[0] != this.size[0] || camera.target.size[1] != this.size[1]) {
			var size = camera.target.size;
			vec2.copy(this.size, size);
			this.target.setSize(size[0], size[1]);
		}
	},

	onPostRender: function(context, scene, camera) {
		this.material.uniforms.zNear.value = camera.near;
		this.material.uniforms.zFar.value = camera.far;

		context.projection.push();
		context.projection.load(camera.projectionMatrix);
		context.modelview.push();
		context.modelview.load(camera.viewMatrix);

		this.target.bind(context, false, this.clearColor);

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		// Render opaque geometry
		this.material.bind();
		var renderers = this.parent.organizer.solidAndCustomRenderers;
		for (var i=0; i<renderers.length; ++i) {
			if (!renderers[i])
				continue;
			context.modelview.push();
			context.modelview.multiply(renderers[i].matrix);
			this.material.shader.bindUniforms(renderers[i].material.uniforms);
			renderers[i].renderGeometry(context, this.material.shader);
			context.modelview.pop();
		}
		this.material.unbind();

		// Render alpha mapped portions of opaque geometry
		this.renderAlphaMapped(context, scene, camera);

		gl.disable(gl.DEPTH_TEST);

		this.target.unbind(context);

		context.modelview.pop();
		context.projection.pop();
	},

	renderAlphaMapped: function(context, scene, camera) {
		var batches = this.parent.organizer.transparentBatchList;
		var shader = this.material.shader;

		shader.use();

		// Bind shared uniforms
		shader.bindUniforms(this.material.uniforms);
		shader.bindUniforms(this.parent.sharedUniforms);
		if (context.light && context.light.uniforms)
			shader.bindUniforms(context.light.uniforms);

		for (var i=0; i<batches.length; i++) {
			var batch = batches[i];
			if (batch.length == 0)
				continue;
			var batchMaterial = batch.get(0).material;

			var samplers;
			if (this.material.samplers.length>0) {
				samplers = this.material.samplers.concat(batchMaterial.samplers);
			}
			else {
				samplers = batchMaterial.samplers;
			}

			// Bind material uniforms and samplers
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(samplers);

			var renderer;
			for (var j=0; j<batch.length; ++j) {
				renderer = batch.get(j);
				context.modelview.push();
				context.modelview.multiply(renderer.matrix);

				// Bind renderer specific uniforms
				this.parent.rendererUniforms.model.value = renderer.matrix;
				this.parent.rendererUniforms.modelview.value = context.modelview.top();
				shader.bindUniforms(this.parent.rendererUniforms);

				renderer.renderGeometry(context, shader);

				context.modelview.pop();
			}

			shader.unbindSamplers(samplers);
		}
	}
});
