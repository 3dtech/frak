/**
 * Shadow map generator for the deferred renderer
 */
var DeferredShadowRenderStage = RenderStage.extend({
	init: function() {
		this._super();
		this.material = null;
		this.directional = [];
		this.sceneBounds = new BoundingSphere();
		this.clearColor = new Color(0.0, 0.0, 0.0, 0.0);
		this.lightPosition = vec3.create();
	},

	onStart: function(context, engine, camera) {
		this.extStandardDerivatives = context.gl.getExtension('OES_standard_derivatives');

		this.material=new Material(
			engine.assetsManager.addShaderSource("shaders/default/deferred_shadow_directional"),
			{
				'zNear': new UniformFloat(0.1),
				'zFar': new UniformFloat(1000.0)
			},
			[]
		);

		engine.assetsManager.load();
	},

	/** Collects all shadow casting lights */
	collectLights: function(scene) {
		this.directional.length = 0;
		for (var i=0; i<scene.lights.length; i++) {
			if (!scene.lights[i].enabled)
				continue;
			if (!scene.lights[i].shadowCasting)
				continue;
			if (!scene.lights[i].shadow)
				continue;
			if (scene.lights[i] instanceof DirectionalLight)
				this.directional.push(scene.lights[i]);
		}
	},

	/** Computes bounding sphere containing all visible renderers */
	computeSceneBounds: function() {
		vec3.set(this.sceneBounds.center, 0, 0, 0);
		this.sceneBounds.radius = 0.0;

		var opaque = this.parent.organizer.solidRenderers;
		var transparent = this.parent.organizer.transparentRenderers;

		for (var i=0; i<opaque.length; i++) {
			if (!opaque[i].castShadows)
				continue;
			this.sceneBounds.encapsulateSphere(opaque[i].globalBoundingSphere);
		}

		for (var i=0; i<transparent.length; i++) {
			if (!transparent[i].castShadows)
				continue;
			this.sceneBounds.encapsulateSphere(transparent[i].globalBoundingSphere);
		}

		return this.sceneBounds;
	},

	renderDirectionalLightDepth: function(context, light, size) {
		this.material.uniforms.zNear.value = 0.1;
		this.material.uniforms.zFar.value = size*2.0;

		mat4.ortho(light.lightProj, -size, size, -size, size, 0.1, size*2.0);
		vec3.scale(this.lightPosition, light.direction, size);
		mat4.lookAt(light.lightView, this.lightPosition, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

		context.projection.push();
		context.projection.load(light.lightProj);
		context.modelview.push();
		context.modelview.load(light.lightView);

		light.shadow.bind(context, false, this.clearColor);

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		// Render opaque geometry
		this.material.bind();
		var renderers = this.parent.organizer.solidRenderers;
		for (var i=0; i<renderers.length; ++i) {
			if (!(renderers[i].layer & light.shadowMask))
				continue;
			context.modelview.push();
			context.modelview.multiply(renderers[i].matrix);
			this.material.shader.bindUniforms(renderers[i].material.uniforms);
			renderers[i].renderGeometry(context, this.material.shader);
			context.modelview.pop();
		}
		this.material.unbind();

		// Render alpha mapped portions of opaque geometry
		this.renderAlphaMapped(context);

		gl.disable(gl.DEPTH_TEST);

		light.shadow.unbind(context);

		context.modelview.pop();
		context.projection.pop();
	},

	renderAlphaMapped: function(context) {
		var batches = this.parent.organizer.transparentRendererBatches;
		var shader = this.material.shader;
		var fallbackSamplers = [this.parent.diffuseFallback];

		shader.use();

		// Bind shared uniforms
		shader.bindUniforms(this.material.uniforms);
		shader.bindUniforms(this.parent.sharedUniforms);

		var samplers;
		for (var i in batches) {
			var batch = batches[i];
			var batchMaterial = batch[0].material;

			if (batchMaterial.samplers.length>0)
				samplers = batchMaterial.samplers;
			else
				samplers = fallbackSamplers;

			// Bind material uniforms and samplers
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
	},

	onPreRender: function(context, scene, camera) {
		this.collectLights(scene);
		var radius = this.computeSceneBounds().radius;

		for (var i=0; i<this.directional.length; i++) {
			this.renderDirectionalLightDepth(context, this.directional[i], radius);
		}
	},

	onPostRender: function(context, scene, camera) {
	}
});