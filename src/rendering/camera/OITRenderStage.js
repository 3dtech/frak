/**
 * Render-stage for rendering the SkyboxComponent.
 */
var OITRenderStage = RenderStage.extend({
	init: function() {
		this._super();

		this.diffuseFallback = null;
		this.oitClearColor = new Color(0.0, 0.0, 0.0, 0.0);
		this.transparencyTarget = false;
		this.transparencySampler = false;
		this.transparencyWeight = false;
		this.transparencyWeightSampler = false;
		this.transparencyAccum = false;
	},

	onStart: function(context, engine, camera) {
		var size = camera.target.size;
		this.diffuseFallback = new Sampler('diffuse0', engine.WhiteTexture);
		this.transparencyTarget = new TargetTextureFloat(size, context, false);
		this.transparencySampler = new Sampler('oitAccum', this.transparencyTarget.texture);
		this.transparencyWeight = new TargetTextureFloat(size, context, false);
		this.transparencyWeightSampler = new Sampler('oitWeight', this.transparencyWeight.texture);
		this.transparencyAccum = new Material(
			engine.assetsManager.addShaderSource("shaders/default/OITAccum"),
			{
				'render_mode': new UniformInt(0)
			},
			[]);
		this.opaqueDepthMaterial = new Material(
			engine.assetsManager.addShaderSource("diffuse"),
			{
				'useShadows': new UniformInt(0),
				'ambient': new UniformColor(),
				'diffuse': new UniformColor()
			},
			[
				this.diffuseFallback,
				new Sampler('shadow0', engine.WhiteTexture)
			]);
		engine.assetsManager.load();
	},

	onPostRender: function(context, scene, camera) {
		if (camera.target.size[0] != this.transparencyTarget.size[0] || camera.target.size[1] != this.transparencyTarget.size[1]) {
			this.transparencyTarget.setSize(camera.target.size[0], camera.target.size[1]);
			this.transparencyWeight.setSize(camera.target.size[0], camera.target.size[1]);
		}

		// Transparent color texture
		this.oitClearColor.set(0.0, 0.0, 0.0, 0.0);
		this.transparencyTarget.bind(context, false, this.oitClearColor);
		this.renderPass(context, scene, camera, true);
		this.transparencyTarget.unbind(context);

		// Transparent alpha amount texture
		this.oitClearColor.set(1.0, 1.0, 1.0, 1.0);
		this.transparencyWeight.bind(context, false, this.oitClearColor);
		this.renderPass(context, scene, camera, false);
		this.transparencyWeight.unbind(context);

		/**
		 * TODO: the accumulation pass can be rolled into a single pass shader, but it requires MRT.
		 */
	},

	renderTransparentBatches: function(context, scene, camera, material) {
		var batches = this.parent.organizer.transparentRendererBatches;
		var shader = material.shader;

		shader.use();

		// Bind shared uniforms
		shader.bindUniforms(material.uniforms);
		shader.bindUniforms(this.parent.sharedUniforms);
		if (context.light && context.light.uniforms)
			shader.bindUniforms(context.light.uniforms);

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
				samplers.push(this.diffuseFallback);
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
				shader.bindUniforms(this.parent.rendererUniforms);

				batch[j].renderGeometry(context, shader);

				context.modelview.pop();
			}

			shader.unbindSamplers(samplers);
		}
	},

	renderAlphaMapped: function(context, scene, camera) {
		var gl = context.gl;
		gl.depthMask(true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		this.transparencyAccum.uniforms['render_mode'].value = 2; // Enables the alpha-test in accum shader
		this.renderTransparentBatches(context, scene, camera, this.transparencyAccum);

		gl.disable(gl.DEPTH_TEST);
	},

	renderOpaque: function(context, scene, camera) {
		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);

		var shader = this.opaqueDepthMaterial.shader;
		shader.use();
		shader.bindUniforms(this.parent.sharedUniforms);
		shader.bindUniforms(this.opaqueDepthMaterial.uniforms);
		shader.bindSamplers(this.opaqueDepthMaterial.samplers);

		var renderers = this.parent.organizer.solidRenderers;
		for (var i=0; i<renderers.length; i++) {
			context.modelview.push();
			context.modelview.multiply(renderers[i].matrix);
			this.parent.rendererUniforms.model.value = renderers[i].matrix;
			this.parent.rendererUniforms.modelview.value = context.modelview.top();
			shader.bindUniforms(this.parent.rendererUniforms);

			renderers[i].renderGeometry(context, shader);

			context.modelview.pop();
		}

		shader.unbindSamplers(this.opaqueDepthMaterial.samplers);

		gl.disable(gl.DEPTH_TEST);
	},

	renderPass: function(context, scene, camera, renderColor) {
		var gl = context.gl;

		// Depth only pass for opaque geometry
		gl.depthMask(true);
		gl.colorMask(false, false, false, false);
		this.renderOpaque(context, scene, camera);
		this.renderAlphaMapped(context, scene, camera);

		// Transparency accumulation pass
		gl.colorMask(true, true, true, true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		if (scene.engine.options.transparencyMode == 'blended') {
			// Color mode
			if (renderColor) {
				gl.depthMask(false);
				gl.blendEquation(gl.FUNC_ADD);
				gl.blendFunc(gl.ONE, gl.ONE);
				gl.enable(gl.BLEND);
				this.transparencyAccum.uniforms['render_mode'].value = 0;
			}

			// Reveal amount mode
			else {
				gl.depthMask(false);
				gl.blendEquation(gl.FUNC_ADD);
				gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
				gl.enable(gl.BLEND);
				this.transparencyAccum.uniforms['render_mode'].value = 1;
			}
		}

		if (scene.engine.options.transparencyMode == 'stochastic') {
			// Color mode
			if (renderColor) {
				gl.depthMask(true);
				this.transparencyAccum.uniforms['render_mode'].value = 3;
			}

			// Reveal amount mode
			else {
				gl.depthMask(false);
				gl.blendEquation(gl.FUNC_ADD);
				gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
				gl.enable(gl.BLEND);
				this.transparencyAccum.uniforms['render_mode'].value = 1;
			}
		}

		this.renderTransparentBatches(context, scene, camera, this.transparencyAccum);

		gl.disable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(true);
	}
});