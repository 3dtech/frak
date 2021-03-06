/** Render-stage that uses forward rendering to render meshes with materials and directional lighting */
var MaterialRenderStage = RenderStage.extend({
	init: function () {
		this._super();
		this.organizer = new RendererOrganizer();

		this.solidRenderers = [];
		this.solidRendererBatches = {};

		this.transparentRenderers = [];
		this.transparentRendererBatches = {};

		this.shadowFallback = null;
		this.diffuseFallback = null;

		this.bindCameraTarget = {
			started: true,
			start: function () {
			},
			render: function (context, scene, camera) {
				camera.target.bind(context);
			}
		};

		this.unbindCameraTarget = {
			started: true,
			start: function () {
			},
			render: function (context, scene, camera) {
				camera.target.unbind(context);
			}
		};

		// Rendering order is defined as follows:
		this.shadowMapStage = this.addStage(new ShadowMapRenderStage());
		this.depthStage = this.addStage(new DepthRenderStage()).disable();
		this.oitStage = this.addStage(new OITRenderStage()).disable();
		this.addStage(this.bindCameraTarget);
		this.skyboxStage = this.addStage(new SkyboxRenderStage());
		this.opaqueStage = this.addStage(new OpaqueGeometryRenderStage());
		this.transparentStage = this.addStage(new TransparentGeometryRenderStage());
		this.addStage(this.unbindCameraTarget);

		// internal cache
		this.eyePosition = vec3.create();
		this.invModelview = mat4.create();

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

		// Shadow uniforms cache
		this.shadowUniforms = {
			"lightView": new UniformMat4(mat4.create()),
			"lightProjection": new UniformMat4(mat4.create()),
			"shadowBias": new UniformFloat(0.001),
			"hasFloat": new UniformInt(1),
			"useVSM": new UniformInt(1)
		};

		this.cachedUniforms = null;

		this.samplerAccum = new SamplerAccumulator();
	},

	onStart: function (context, engine, camera) {
		this.diffuseFallback = new Sampler('diffuse0', engine.WhiteTexture);
		this.shadowFallback = new Sampler('shadow0', engine.WhiteTexture);

		if (engine.options.ssao === true) {
			this.depthStage.enable();
		}

		if (engine.options.transparencyMode != 'sorted') {
			this.oitStage.enable();
		}
	},

	/** Prepares shadow-mapping uniforms that are shared between all materials. */
	prepareShadowContext: function (context, scene) {
		if (!this._shadowContext) {
			this._shadowContext = {
				'shadow0': this.shadowFallback,
				'lightProjection': this.shadowUniforms.lightProjection,
				'lightView': this.shadowUniforms.lightView
			};
		}

		context.shadow = this._shadowContext;
		context.shadow.shadow0 = this.shadowFallback;

		var light = this.shadowMapStage.getFirstShadowCastingLight(scene, true);
		if (!light)
			return;

		mat4.copy(this.shadowUniforms.lightView.value, light.lightView);
		mat4.copy(this.shadowUniforms.lightProjection.value, light.lightProj);
		this.shadowUniforms.shadowBias.value = light.shadowBias;
		this.shadowUniforms.hasFloat.value = (light.shadow instanceof TargetTextureFloat) ? 1 : 0;
		if (this.shadowUniforms.hasFloat.value == 1 && this.shadowMapStage.extStandardDerivatives)
			this.shadowUniforms.useVSM.value = 1;
		else
			this.shadowUniforms.useVSM.value = 0;

		context.shadow.shadow0 = light.shadowSampler;
	},

	/** Prepares Light uniforms that are shared between all materials. */
	prepareLightContext: function (context, scene) {
		for (var i = 0; i < scene.lights.length; i++) {
			var light = scene.lights[i];
			if (!(light instanceof DirectionalLight))
				continue;
			if (!light.enabled)
				continue;

			if (light.uniforms) {
				vec3.copy(light.uniforms.lightDirection.value, light.direction);
				light.uniforms.lightIntensity.value = light.intensity;
				light.uniforms.lightColor.value[0] = light.color.r;
				light.uniforms.lightColor.value[1] = light.color.g;
				light.uniforms.lightColor.value[2] = light.color.b;
				light.uniforms.lightColor.value[3] = light.color.a;
				light.uniforms.useShadows.value = light.shadowCasting ? 1 : 0;
			}
			else {
				light.uniforms = {
					'lightDirection': new UniformVec3(light.direction),
					'lightColor': new UniformColor(light.color),
					'lightIntensity': new UniformFloat(light.intensity),
					'useShadows': new UniformInt(light.shadowCasting ? 1 : 0)
				};
			}
		}
	},

	/** Prepares data shared among most renderers. */
	prepareShared: function (context) {
		// Inverse modelview matrix and eye position
		mat4.invert(this.invModelview, context.modelview.top());
		mat4.translation(this.eyePosition, this.invModelview);

		// Prepares view and projection uniforms; these won't change during rendering.
		mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
		mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
		mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);
	},

	/** Acquires and organizes the visible renderers. */
	onPreRender: function (context, scene, camera) {
		// Prepare shared uniforms
		this.prepareShared(context);

		var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		this.organizer.sort(scene.engine, renderers, this.eyePosition);
		this.solidRenderers = this.organizer.solidRenderers;
		this.transparentRenderers = this.organizer.transparentRenderers;
		this.solidRendererBatches = this.organizer.solidRendererBatches;
		this.transparentRendererBatches = this.organizer.transparentRendererBatches;

		// Prepare uniforms for sub-stages
		this.prepareLightContext(context, scene);
		this.prepareShadowContext(context, scene);
	},

	onPostRender: function (context, scene, camera) {
		// Remove stage data from context
		context.shadow = false;
		context.light = false;
	},

	/** Renders renderers in batches by material */
	renderBatched: function (context, batches) {
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

					// Bind shadow uniforms
					if (context.shadow)
						shader.bindUniforms(this.shadowUniforms);

					// Bind shared uniforms
					shader.bindUniforms(this.sharedUniforms);

					// Bind light uniforms to shader
					if (context.light && context.light.uniforms)
						shader.bindUniforms(context.light.uniforms);
				}

				// Bind samplers
				this.samplerAccum.add(context.shadow.shadow0);
				for (var j = 0, msl = material.samplers.length; j < msl; ++j) {
					this.samplerAccum.add(material.samplers[j]);
				}
				if (this.samplerAccum.length === 0) {
					this.samplerAccum.add(this.diffuseFallback);
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
	renderBruteForce: function (context, renderers) {
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
