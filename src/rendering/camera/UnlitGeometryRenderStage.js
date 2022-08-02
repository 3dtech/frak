/**
 * Render-stage for rendering opaque geometry.
 */
var UnlitGeometryRenderStage = RenderStage.extend({
	init: function() {
		this._super();

		// Shared uniforms cache
		this.sharedUniforms = {
			"view": new UniformMat4(mat4.create()),
			"viewInverse": new UniformMat4(mat4.create()),
			"projection": new UniformMat4(mat4.create())
		};

		// Renderer uniforms cache
		// These are set to null because they are only given values of existing matrices temporarily while rendering
		this.rendererUniforms = {
			"model": new UniformMat4(null),
			"modelview": new UniformMat4(null),
			"receiveShadows": new UniformInt(1)
		};

		this.samplerAccum = new SamplerAccumulator();
	},

	onPostRender: function(context, scene, camera) {
		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		if (this.parent.organizer.enableDynamicBatching) {
			this.renderBatched(context, this.parent.organizer.unlitBatchList);
		}
		else {
			this.renderBruteForce(context, this.parent.organizer.unlitRenderers);
		}

		gl.disable(gl.DEPTH_TEST);
	},

	/** Renders renderers in batches by material */
	renderBatched: function(context, batches) {
		//console.log("RenderBatched", context, batches);
		var usedShader = false;
		var material, batch, shader, renderer;
		for (var i = 0, l = batches.length; i < l; ++i) {
			batch = batches[i];

			// Use shader
			if (batch.get(0)) {
				material = batch.get(0).material;
				shader = material.shader;

				if (shader != usedShader) {
					shader.use();
					usedShader = shader;

					// Bind shared uniforms
					shader.bindUniforms(this.parent.sharedUniforms);
				}

				// Bind samplers
				this.samplerAccum.add(context.shadow.shadow0);
				for (var j = 0, msl = material.samplers.length; j < msl; ++j) {
					this.samplerAccum.add(material.samplers[j]);
				}
				if (this.samplerAccum.length === 0) {
					this.samplerAccum.add(this.parent.diffuseFallback);
				}

				shader.bindSamplers(this.samplerAccum.samplers);

				// Bind material uniforms
				shader.bindUniforms(material.uniforms);

				for (var j = 0, bl = batch.length; j < bl; ++j) {
					renderer = batch.get(j);
					context.modelview.push();
					context.modelview.multiply(renderer.matrix);

					// Bind renderer specific uniforms
					this.rendererUniforms.model.value = renderer.matrix;
					this.rendererUniforms.modelview.value = context.modelview.top();
					this.rendererUniforms.receiveShadows.value = renderer.receiveShadows;

					shader.bindUniforms(this.rendererUniforms);

					renderer.render(context);

					context.modelview.pop();
				}

				// Unbind shader
				shader.unbindSamplers(this.samplerAccum.samplers);
				this.samplerAccum.clear();
			}
		}
	},

	/** Renders without dynamic batching */
	renderBruteForce: function(context, renderers) {
		for (var j = 0; j < renderers.length; ++j) {
			var renderer = renderers[j];
			if (!renderer)
				break;

			context.modelview.push();
			context.modelview.multiply(renderer.matrix);

			this.cachedUniforms = renderer.getDefaultUniforms(context, null);
			//this.cachedUniforms = renderer.getDefaultUniforms(context, this.cachedUniforms);
			renderer.material.bind(
				this.cachedUniforms,
				context.shadow.shadow0
			);
			renderer.render(context);
			renderer.material.unbind();

			context.modelview.pop();
		}
	}

});
