/**
 * G-buffer renderer
 */
var GBufferRenderStage = RenderStage.extend({
	init: function() {
		this._super();
		this.buffer = null;
		this.clearColor = new Color(0.0, 0.0, 0.0, 0.0);
		this.size = vec2.create();
		this.quality = 1.0;
		this.damaged = false;

		this.perBatchUniforms = {
			'useNormalmap': new UniformInt(0)
		};
	},

	setQuality: function(quality) {
		quality = parseFloat(quality);
		if (quality>0.0) {
			this.quality = quality;
			this.damaged = true;
		}
	},

	onStart: function(context, engine, camera) {
		vec2.copy(this.size, this.parent.size);
		var size = vec2.scale(vec2.create(), this.size, this.quality);
		this.buffer = new TargetTextureMulti(context, size, { numTargets: 4, stencil: true });

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

		if (this.damaged) {
			var size = vec2.scale(vec2.create(), this.size, this.quality);
			this.buffer.setSize(size[0], size[1]);
			this.damaged = false;
		}
	},

	onPostRender: function(context, scene, camera) {
		var gl = context.gl;

		this.buffer.bind(context, false, this.clearColor);

		gl.depthMask(true);
		gl.colorMask(true, true, true, true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0xFF);
		gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
		gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

		// Render opaque geometry to the g-buffer
		this.renderBatches(context, scene, camera, this.parent.organizer.solidRendererBatches, this.material);

		// Render parts of transparent geometry to the g-buffer where alpha = 1
		this.renderBatches(context, scene, camera, this.parent.organizer.transparentRendererBatches, this.material);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.DEPTH_TEST);

		this.buffer.unbind(context);
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

			// Check if material has a normal-map
			this.perBatchUniforms.useNormalmap.value = 0;
			for (var i=0; i<batchMaterial.samplers.length; i++) {
				if (batchMaterial.samplers[i].name == 'normal0') {
					this.perBatchUniforms.useNormalmap.value = 1;
					break;
				}
			}

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
			shader.bindUniforms(this.perBatchUniforms);
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(samplers);

			for (var j=0; j<batch.length; ++j) {
				context.modelview.push();
				context.modelview.multiply(batch[j].matrix);

				// Bind renderer specific uniforms
				this.parent.rendererUniforms.model.value = batch[j].matrix;
				this.parent.rendererUniforms.modelview.value = context.modelview.top();
				this.parent.rendererUniforms.modelviewInverse.value = this.parent.invModelview;
				shader.bindUniforms(this.parent.rendererUniforms);

				batch[j].renderGeometry(context, shader);

				context.modelview.pop();
			}

			shader.unbindSamplers(samplers);
		}
	}
});