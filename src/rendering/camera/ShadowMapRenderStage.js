/**
 * Shadow map generator for the forward renderer
 */
var ShadowMapRenderStage=RenderStage.extend({
	init: function(size) {
		this._super();

		this.material = null;

		this.clearColor = new Color(0.0, 0.0, 0.0, 1.0);
		this.lightPosition = vec3.create();
		this.lightLookTarget = vec3.create();
		this.lightUpVector = vec3.fromValues(0, 1, 0);
		this.aabbVertices = [
			vec3.create(), vec3.create(), vec3.create(), vec3.create(),
			vec3.create(), vec3.create(), vec3.create(), vec3.create()
		];

		this.sceneAABB = new BoundingBox();
		this.lightFrustum = new BoundingBox();
	},

	onStart: function(context, engine) {
		var shader = 'forward_shadow';

		this.extStandardDerivatives = context.gl.getExtension('OES_standard_derivatives');
		if (this.extStandardDerivatives)
			shader = 'forward_shadow_vsm';

		this.material = new Material(
			engine.assetsManager.addShader("shaders/default/forward_shadow.vert", "shaders/default/{0}.frag".format(shader)),
			{
				'hasFloat': new UniformInt(1)
			},
			[]
		);

		engine.assetsManager.load();
	},

	onPostRender: function(context, scene, camera) {
		var light = this.getFirstShadowCastingLight(scene);
		if (!light)
			return;

		this.computeSceneBounds();
		vec3.copy(this.lightPosition, this.sceneAABB.center);
		vec3.sub(this.lightLookTarget, this.lightPosition, light.direction);
		mat4.lookAt(light.lightView, this.lightPosition, this.lightLookTarget, this.lightUpVector);


		this.sceneAABB.getVertices(this.aabbVertices);
		for (var i=0; i<8; i++) {
			vec3.transformMat4(this.aabbVertices[i], this.aabbVertices[i], light.lightView);
		}

		this.lightFrustum.set(this.aabbVertices[0], [0, 0, 0]);
		for (var i=1; i<8; i++) {
			this.lightFrustum.encapsulatePoint(this.aabbVertices[i]);
		}

		mat4.ortho(light.lightProj,
			this.lightFrustum.min[0],
			this.lightFrustum.max[0],
			this.lightFrustum.min[1],
			this.lightFrustum.max[1],
			this.lightFrustum.min[2],
			this.lightFrustum.max[2]
		);

		if (light.shadow instanceof TargetTextureFloat)
			this.material.uniforms.hasFloat.value = 1;
		else
			this.material.uniforms.hasFloat.value = 0;

		context.projection.push();
		context.projection.load(light.lightProj);
		context.modelview.push();
		context.modelview.load(light.lightView);

		light.shadow.bind(context, false, this.clearColor);

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);
		gl.colorMask(true, true, true, true);

		// Render opaque geometry
		this.material.bind();
		var renderers = this.parent.organizer.solidRenderers;
		for (var i=0; i<renderers.length; ++i) {
			if (!(renderers[i].layer & light.shadowMask))
				continue;
			if (!renderers[i].castShadows)
				continue;

			context.modelview.push();
			context.modelview.multiply(renderers[i].matrix);
			this.material.shader.bindUniforms(renderers[i].material.uniforms);
			renderers[i].renderGeometry(context, this.material.shader);
			context.modelview.pop();
		}

		this.material.unbind();

		// Render alpha mapped portions of opaque geometry
		this.renderAlphaMapped(context, light);

		gl.disable(gl.DEPTH_TEST);

		light.shadow.unbind(context);

		context.modelview.pop();
		context.projection.pop();
	},

	renderAlphaMapped: function(context, light) {
		var batches = this.parent.organizer.transparentBatchList;
		var shader = this.material.shader;
		var fallbackSamplers = [this.parent.diffuseFallback];

		shader.use();

		// Bind shared uniforms
		shader.bindUniforms(this.material.uniforms);
		shader.bindUniforms(this.parent.sharedUniforms);

		var samplers;
		for (var i=0; i<batches.length; i++) {
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
				if (!(batch[j].layer & light.shadowMask))
					continue;
				if (!batch[j].castShadows)
					continue;

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

	/** Computes bounding box containing all visible renderers */
	computeSceneBounds: function() {
		if (this.sceneAABB.center === false)
			this.sceneAABB.center = vec3.create();
		vec3.set(this.sceneAABB.center, 0, 0, 0);
		vec3.set(this.sceneAABB.extents, 0, 0, 0);
		this.sceneAABB.recalculate();

		var opaque = this.parent.organizer.solidRenderers;
		var transparent = this.parent.organizer.transparentRenderers;

		for (var i=0; i<opaque.length; i++) {
			if (!opaque[i].castShadows)
				continue;
			this.sceneAABB.encapsulateBox(opaque[i].globalBoundingBox);
		}

		for (var i=0; i<transparent.length; i++) {
			if (!transparent[i].castShadows)
				continue;
			this.sceneAABB.encapsulateBox(transparent[i].globalBoundingBox);
		}

		return this.sceneAABB;
	},

	/** Returns the first shadow casting directional light or false. */
	getFirstShadowCastingLight: function(scene) {
		for (var i=0; i<scene.lights.length; i++) {
			if (!(scene.lights[i] instanceof DirectionalLight))
				continue;
			if (!scene.lights[i].enabled)
				continue;
			if (scene.lights[i].shadowCasting === true)
				return scene.lights[i];
		}
		return false;
	}
});