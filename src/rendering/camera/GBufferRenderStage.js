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
		this.damaged = true;

		this.perBatchUniforms = {
			'useNormalmap': new UniformInt(0),
			'useReflection': new UniformInt(0),
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

		this.normalmapFallback =  new Sampler('normal0');
		this.maskFallback =  new Sampler('mask');
		this.envFallback =  new Sampler('env0');
		this.envFallback.createFallbackCubeTexture(context);
		this.envFallback.texture = fallbackCubeTexture;


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
		this.renderBatches(context, scene, camera, this.parent.organizer.opaqueBatchList, this.material);

		// Render parts of transparent geometry to the g-buffer where alpha = 1
		this.renderBatches(context, scene, camera, this.parent.organizer.transparentBatchList, this.material);

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

		for (var i=0; i<batches.length; i++) {
			var batch = batches[i];
			if (batch.length == 0)
				continue;
			var batchMaterial = batch.get(0).material;

			// Check if material has a normal-map
			this.perBatchUniforms.useNormalmap.value = 0;
			this.perBatchUniforms.useReflection.value = 0;
			var hasMask = false;
			for (var m=0; m<batchMaterial.samplers.length; m++) {
				if (batchMaterial.samplers[m].name == 'normal0') {
					this.perBatchUniforms.useNormalmap.value = 1;
					continue;
				}
				if (batchMaterial.samplers[m].name == 'env0') {
					this.perBatchUniforms.useReflection.value = 1;
					continue;
				}
				if (batchMaterial.samplers[m].name == 'mask') {
					hasMask = true;
					continue;
				}
			}

			var samplers;
			if (material.samplers.length>0) {
				samplers = material.samplers.concat(batchMaterial.samplers);
			}
			else {
				samplers = batchMaterial.samplers.slice();
			}

			if (batchMaterial.samplers.length == 0) {
				samplers.push(this.parent.diffuseFallback);
			}

			if (this.perBatchUniforms.useNormalmap.value == 0) {
				samplers.push(this.normalmapFallback);
			}

			if (this.perBatchUniforms.useReflection.value == 0) {
				samplers.push(this.envFallback);
				samplers.push(this.maskFallback);
			}
			else if (this.perBatchUniforms.useReflection.value == 1 && !hasMask) {
				samplers.push(this.maskFallback);
			}

			// Bind material uniforms and samplers
			shader.bindUniforms(this.perBatchUniforms);
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(samplers);

			var renderer;
			for (var j=0; j<batch.length; ++j) {
				renderer = batch.get(j);
				context.modelview.push();
				context.modelview.multiply(renderer.matrix);
				renderer.renderGeometry(context, shader); // This will bind all default uniforms
				context.modelview.pop();
			}

			shader.unbindSamplers(samplers);
		}
	}
});
