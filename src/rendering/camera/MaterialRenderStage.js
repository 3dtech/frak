/** Render-stage that uses forward rendering to render meshes with materials and directional lighting */
var MaterialRenderStage=RenderStage.extend({
	init: function() {
		this._super();

		this.enableDynamicBatching = true; ///< Set to false to turn off dynamic batching of renderers by material.

		this.visibleRenderers=0;
		this.visibleSolidRenderers=0;
		this.visibleSolidBatches=0;
		this.visibleSolidFaces=0;
		this.visibleTransparentRenderers=0;
		this.visibleTransparentFaces=0;
		this.visibleTransparentBatches=0;

		this.solidRenderers=[];
		this.solidRendererBatches={};

		this.transparentRenderers=[];
		this.transparentRendererBatches={};

		this.shadowMapFallbackSampler = false; // TODO: refactor?

		this.bindCameraTarget = {
			started: true,
			start: function() {},
			render: function(context, scene, camera) {
				camera.target.bind(context);
			}
		};

		this.unbindCameraTarget = {
			started: true,
			start: function() {},
			render: function(context, scene, camera) {
				camera.target.unbind(context);
			}
		};

		// Rendering order is defined as follows:
		this.shadowMapStage = this.addStage(new ShadowMapRenderStage());
        this.positionBufferStage = this.addStage(new PositionBufferRenderStage());
		this.oitStage = this.addStage(new OITRenderStage());
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
			"modelviewInverse": new UniformMat4(null)
		};

		// Shadow uniforms cache
		this.shadowUniforms = {
			"lightView": new UniformMat4(mat4.create()),
			"lightProjection": new UniformMat4(mat4.create()),
			"shadowIntensity": new UniformFloat(0.0)
		};
	},

	/** Prepares shadow-mapping uniforms that are shared between all materials. */
	prepareShadowContext: function(context, scene) {
		if (this.shadowMapFallbackSampler===false) {
			this.shadowMapFallbackSampler = new Sampler('shadow0', scene.engine.WhiteTexture);
		}

		if (!this.shadowMapStage.active)
			return;

		var light = this.shadowMapStage.getFirstShadowCastingLight(scene);
		if (!light)
			return;

		mat4.copy(this.shadowUniforms.lightView.value, this.shadowMapStage.lightView);
		mat4.copy(this.shadowUniforms.lightProjection.value, this.shadowMapStage.lightProj);
		this.shadowUniforms.shadowIntensity.value = light.shadowIntensity;

		context.shadow = {
			'shadow0': this.shadowMapStage.shadowSampler,
			'linearDepthConstant': this.shadowMapStage.material.uniforms.linearDepthConstant,
			'lightProjection': this.shadowUniforms.lightProjection,
			'lightView': this.shadowUniforms.lightView,
			'shadowIntensity': this.shadowUniforms.shadowIntensity
		};
	},

	/** Prepares Light uniforms that are shared between all materials. */
	prepareLightContext: function(context, scene) {
		for (var i=0; i<scene.lights.length; i++) {
			var light = scene.lights[i];
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
	prepareShared: function(context) {
		// Inverse modelview matrix and eye position
		mat4.invert(this.invModelview, context.modelview.top());
		mat4.translation(this.eyePosition, this.invModelview);

		// Prepares view and projection uniforms; these won't change during rendering.
		mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
		mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
		mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);
	},

	/** Acquires and organizes the visible renderers. */
	onPreRender: function(context, scene, camera) {
		this.solidRendererBatches = {};
		this.transparentRendererBatches = {};
		this.solidRenderers.length = 0;
		this.transparentRenderers.length = 0;

		this.visibleSolidRenderers=0;
		this.visibleSolidBatches=0;
		this.visibleSolidFaces=0;
		this.visibleTransparentRenderers=0;
		this.visibleTransparentFaces=0;
		this.visibleTransparentBatches=0;

		var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		this.visibleRenderers = renderers.length;

		for (var i=0; i < renderers.length; i++) {
			if (renderers[i].transparent) {
				if (this.enableDynamicBatching && scene.engine.options.transparencyMode != 'sorted') {
					if (renderers[i].material.id in this.transparentRendererBatches) {
						this.transparentRendererBatches[renderers[i].material.id].push(renderers[i]);
					}
					else {
						this.transparentRendererBatches[renderers[i].material.id]=[renderers[i]];
						this.visibleTransparentBatches++;
					}
				}
				this.transparentRenderers.push(renderers[i]);
				this.visibleTransparentFaces += renderers[i].submesh.faces.length;
			}
			else {
				if (this.enableDynamicBatching) {
					if (renderers[i].material.id in this.solidRendererBatches) {
						this.solidRendererBatches[renderers[i].material.id].push(renderers[i]);
					}
					else {
						this.solidRendererBatches[renderers[i].material.id]=[renderers[i]];
						this.visibleSolidBatches++;
					}
				}
				this.visibleSolidFaces += renderers[i].submesh.faces.length;
				this.solidRenderers.push(renderers[i]);
			}
		}

		this.visibleTransparentRenderers = this.transparentRenderers.length;
		this.visibleSolidRenderers = this.solidRenderers.length;

		// Sort transparent renderers
		if (scene.engine.options.transparencyMode == 'sorted') {
			var eyePosition = this.eyePosition;
			this.transparentRenderers.sort(function(a, b) {
				var d1 = vec3.squaredDistance(eyePosition, a.globalBoundingSphere.center);
				var d2 = vec3.squaredDistance(eyePosition, b.globalBoundingSphere.center);
				if (d1>d2) return -1;
				if (d1<d2) return 1;
				return 0;
			});
		}

		// Prepare uniforms for sub-stages
		this.prepareShared(context);
		this.prepareLightContext(context, scene);
		this.prepareShadowContext(context, scene);
	},

	onPostRender: function(context, scene, camera) {
		// Remove stage data from context
		context.shadow = false;
		context.light = false;
	},

	/** Renders renderers in batches by material */
	renderBatched: function(context, batches) {
		var globalSamplers = [];
		if (context.shadow) {
			globalSamplers.push(context.shadow.shadow0);
		}
		else {
			globalSamplers.push(this.shadowMapFallbackSampler);
		}

		var usedShader = false;
		for (var i in batches) {
			var batch = batches[i];

			// Use shader
			var material = batch[0].material;
			var shader = material.shader;
			if (shader != usedShader) {
				shader.use();
				usedShader = shader;

				// Bind shadow uniforms
				if(context.shadow) shader.bindUniforms(this.shadowUniforms);

				// Bind shared uniforms
				shader.bindUniforms(this.sharedUniforms);

				// Bind light uniforms to shader
				if (context.light && context.light.uniforms)
					shader.bindUniforms(context.light.uniforms);
			}

			// Bind samplers
			var samplers=globalSamplers.concat(material.samplers);
			shader.bindSamplers(samplers);

			// Bind material uniforms
			shader.bindUniforms(material.uniforms);

			for(var j=0; j<batch.length; ++j) {
				context.modelview.push();
				context.modelview.multiply(batch[j].matrix);

				// Bind renderer specific uniforms
				this.rendererUniforms.model.value = batch[j].matrix;
				this.rendererUniforms.modelview.value = context.modelview.top();
				this.rendererUniforms.modelviewInverse.value = this.invModelview;

				shader.bindUniforms(this.rendererUniforms);

				batch[j].render(context);

				context.modelview.pop();
			}

			// Unbind shader
			shader.unbindSamplers(samplers);
		}
	},

	/** Renders without dynamic batching */
	renderBruteForce: function(context, renderers) {
		var globalSamplers = [];
		if (context.shadow) {
			globalSamplers.push(context.shadow.shadow0);
		}
		else {
			globalSamplers.push(this.shadowMapFallbackSampler);
		}

		for (var j=0; j<renderers.length; ++j) {
			var renderer=renderers[j];

			context.modelview.push();
			context.modelview.multiply(renderer.matrix);

			renderer.material.bind(renderer.getDefaultUniforms(context), globalSamplers);
			renderer.render(context);
			renderer.material.unbind(globalSamplers);

			context.modelview.pop();
		}
	}
});