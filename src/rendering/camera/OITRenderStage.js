/**
 * Render-stage for rendering order-independent transparency.
 * The final transparency is combined in a post process from the buffers generated here.
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
		try {
			var size = camera.target.size;
			this.transparencyTarget = new TargetTextureFloat(size, context, false);
			this.transparencyWeight = new TargetTextureFloat(size, context, false);
		}
		catch (e) {
			console.warn('OITRenderStage: ', e);
			this.disable();
			return;
		}

		this.transparencySampler = new Sampler('oitAccum', this.transparencyTarget.texture);
		this.transparencyWeightSampler = new Sampler('oitWeight', this.transparencyWeight.texture);
		this.diffuseFallback = new Sampler('diffuse0', engine.WhiteTexture);
		this.envFallback = new Sampler('env0', engine.WhiteTexture);

		// Set up shared depth buffer
		var gl = context.gl;
		this.transparencyWeight.bind(context, true);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.transparencyTarget.depth);
		this.transparencyWeight.unbind(context);
		this.transparencyWeight.depth = this.transparencyTarget.depth;

		this.transparencyAccum = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/OITAccum"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('OITAccum')),
			{
				'render_mode': new UniformInt(0),
				'useNormalmap': new UniformInt(0),
				'useReflection': new UniformInt(0),
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
		this.transparencyTarget.resetViewport();
		this.transparencyWeight.resetViewport();

		if (camera.target.size[0] != this.transparencyTarget.size[0] || camera.target.size[1] != this.transparencyTarget.size[1]) {
			this.transparencyTarget.setSize(camera.target.size[0], camera.target.size[1]);
			this.transparencyWeight.setSize(camera.target.size[0], camera.target.size[1]);

			var gl = context.gl;
			this.transparencyWeight.bind(context, true);
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.transparencyTarget.depth);
			this.transparencyWeight.unbind(context);
			this.transparencyWeight.depth = this.transparencyTarget.depth;
		}

		context.projection.push();
		context.projection.load(camera.projectionMatrix);
		context.modelview.push();
		context.modelview.load(camera.viewMatrix);

		// Transparent color texture
		this.oitClearColor.set(0.0, 0.0, 0.0, 0.0);
		this.transparencyTarget.bind(context, false, this.oitClearColor);

		// Depth only pass for opaque geometry
		context.gl.depthMask(true);
		context.gl.colorMask(false, false, false, false);
		this.renderOpaque(context, scene, camera);
		this.renderAlphaMapped(context, scene, camera);
		context.gl.colorMask(true, true, true, true);

		this.renderPass(context, scene, camera, true);
		this.transparencyTarget.unbind(context);

		// Transparent alpha amount texture
		this.oitClearColor.set(1.0, 1.0, 1.0, 1.0);
		this.transparencyWeight.bind(context, false, this.oitClearColor, context.gl.COLOR_BUFFER_BIT);
		this.renderPass(context, scene, camera, false);
		this.transparencyWeight.unbind(context);

		/**
		 * TODO: the accumulation pass can be rolled into a single pass shader, but it requires MRT.
		 */

		context.modelview.pop();
		context.projection.pop();
	},

	renderTransparentBatches: function(context, scene, camera, material) {
		var shader = material.shader;

		shader.use();

		// Bind shared uniforms
		if (context.light && context.light.uniforms)
			shader.bindUniforms(context.light.uniforms);

		var batches = this.parent.organizer.transparentBatchList;
		for (var i = 0, l = batches.length; i < l; i++) {
			var batch = batches[i];
			if (batch.length == 0)
				continue;
			var batchMaterial = batch.get(0).material;

			var samplers;
			if (material.samplers.length > 0) {
				samplers = material.samplers.concat(batchMaterial.samplers);
			}
			else {
				samplers = batchMaterial.samplers;
			}

			var hasDiffuse, hasEnv;
			for (var m = 0; m < samplers.length; ++m) {
				if (samplers[m].name == 'normal0') {
					material.uniforms.useNormalmap.value = 1;
					continue;
				}
				if (samplers[m].name == 'env0') {
					material.uniforms.useReflection.value = 1;
					hasEnv = true;
					continue;
				}
				if (samplers[m].name == 'diffuse0') {
					hasDiffuse = true;
				}
			}
			/* Shader runs all paths, even if useReflection == 0
			*  This means that if one of the samplers is not bound but
			*  the other is, then both are pointing to texture0
			*  (default when sampler uniform is not set).
			*  Since env0 is a samplerCube and diffuse0 is a sampler2D
			*  this leads to an invalid operation and crashes the shader.
			*  So we make sure both are always present
			*/
			if (!hasDiffuse) {
				samplers.push(this.diffuseFallback);
			}
			if (!hasEnv) {
				samplers.push(this.envFallback);
			}

			shader.bindUniforms(material.uniforms);

			// Bind material uniforms and samplers
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(samplers);

			var renderer;
			for (var j = 0, l2 = batch.length; j < l2; ++j) {
				renderer = batch.get(j);
				context.modelview.push();
				context.modelview.multiply(renderer.matrix);

				renderer.renderGeometry(context, shader);

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
		shader.bindUniforms(this.opaqueDepthMaterial.uniforms);
		shader.bindSamplers(this.opaqueDepthMaterial.samplers);

		var renderers = this.parent.organizer.solidRenderers;
		for (var i=0; i<renderers.length; ++i) {
			if (!renderers[i])
				break;
			context.modelview.push();
			context.modelview.multiply(renderers[i].matrix);

			renderers[i].renderGeometry(context, shader);

			context.modelview.pop();
		}

		shader.unbindSamplers(this.opaqueDepthMaterial.samplers);

		gl.disable(gl.DEPTH_TEST);
	},

	renderPass: function(context, scene, camera, renderColor) {
		var gl = context.gl;

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
