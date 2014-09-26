/** Render-stage that uses forward rendering to render meshes with materials and directional lighting */
var MaterialRenderStage=RenderStage.extend({
	init: function() {
		this._super();
		this.visibleRenderers=0;
		this.visibleSolidRenderers=0;
		this.visibleSolidBatches=0;
		this.visibleSolidFaces=0;
		this.visibleTransparentRenderers=0;
		this.visibleTransparentFaces=0;

		this.solidRenderers=[];
		this.solidRendererBatches=[];
		this.transparentRenderers=[];


		this.shadowMapStage=this.addStage(new ShadowMapRenderStage());
		this.shadowMapFallbackSampler = false;

		// order independent transparency
		this.transparencyTarget = false;
		this.transparencySampler = false;
		this.transparencyWeight = false;
		this.transparencyWeightSampler = false;
		this.transparencyAccum = false;
		this.oitClearColor = new Color(0.0, 0.0, 0.0, 0.0);

		// internal cache
		this.eyePosition=vec3.create();
		this.invModelview=mat4.create();

		// Shared uniforms cache
		this.sharedUniforms={
			"time": new UniformFloat(0),
			"view": new UniformMat4(mat4.create()),
			"viewInverse": new UniformMat4(mat4.create()),
			"projection": new UniformMat4(mat4.create())
		};

		// Renderer uniforms cache
		this.rendererUniforms={
			"model": new UniformMat4(mat4.create()),
			"modelview": new UniformMat4(mat4.create()),
			"modelviewInverse": new UniformMat4(mat4.create())
		};

		// Light uniforms cache
		this.lightUniforms={
			"lightDirection": new UniformVec3(vec3.create()),
			"lightColor": new UniformColor(new Color()),
			"lightIntensity": new UniformFloat(0.0),
			"useShadows": new UniformInt(0)
		};

		this.shadowUniforms={
			"linearDepthConstant": new UniformFloat(0.0),
			"lightView": new UniformMat4(mat4.create()),
			"lightProjection": new UniformMat4(mat4.create()),
			"shadowIntensity": new UniformFloat(0.0)
		};

		this.enableDynamicBatching=true;

		this._addUniforms = function(uniforms, other) {
			if (!other) return;
			for (var key in other)
				uniforms[key] = other[key];
		};
	},

	onStart: function(context, engine, camera) {
		var size = camera.target.size;
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
		engine.assetsManager.load();
	},

	prepareShadowContext: function(context, scene) {
		if (this.shadowMapFallbackSampler===false) {
			this.shadowMapFallbackSampler = new Sampler('shadow0', scene.engine.WhiteTexture);
		}

		if (!this.shadowMapStage.active)
			return;

		var light = this.shadowMapStage.getFirstShadowCastingLight(scene);
		if (!light)
			return;

		context.shadow={
			'shadow0': this.shadowMapStage.shadowSampler,
			'linearDepthConstant': this.shadowMapStage.material.uniforms["linearDepthConstant"],
			'lightProjection': new UniformMat4(this.shadowMapStage.lightProj),
			'lightView': new UniformMat4(this.shadowMapStage.lightView),
			'shadowIntensity': new UniformFloat(light.shadowIntensity)
		};
	},

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
			}
			else {
				light.uniforms = {
					'lightDirection': new UniformVec3(light.direction),
					'lightColor': new UniformColor(light.color),
					'lightIntensity': new UniformFloat(light.intensity)
				};
			}
		}
	},

	onPreRender: function(context, scene, camera) {
		// Acquire and organize the visible renderers
		this.solidRendererBatches={};
		this.solidRenderers.length=0;
		this.transparentRenderers.length=0;

		this.visibleSolidRenderers=0;
		this.visibleSolidBatches=0;
		this.visibleSolidFaces=0;
		this.visibleTransparentFaces=0;

		var renderers=scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		for(var i in renderers) {
			if (renderers[i].transparent) {
				this.transparentRenderers.push(renderers[i]);
				this.visibleTransparentFaces+=renderers[i].submesh.faces.length;
			}
			else {
				if(this.enableDynamicBatching) {
					if(renderers[i].material.id in this.solidRendererBatches) this.solidRendererBatches[renderers[i].material.id].push(renderers[i]);
					else {
						this.solidRendererBatches[renderers[i].material.id]=[renderers[i]];
						this.visibleSolidBatches++;
					}
				}
				this.visibleSolidFaces+=renderers[i].submesh.faces.length;
				this.solidRenderers.push(renderers[i]);
				this.visibleSolidRenderers++;
			}
		}
		this.visibleRenderers=renderers.length;
		this.visibleTransparentRenderers=this.transparentRenderers.length;

		// Sort transparent renderers
		if (scene.engine.options.transparencyMode == 'sorted') {
			mat4.invert(this.invModelview, context.modelview.top());
			mat4.translation(this.eyePosition, this.invModelview);
			var eyePosition = this.eyePosition;
			this.transparentRenderers.sort(function(a, b) {
				var d1 = vec3.squaredDistance(eyePosition, a.globalBoundingSphere.center);
				var d2 = vec3.squaredDistance(eyePosition, b.globalBoundingSphere.center);
				if (d1>d2) return -1;
				if (d1<d2) return 1;
				return 0;
			});
		}
	},

	onPostRender: function(context, scene, camera) {
		this.prepareShadowContext(context, scene);
		this.prepareLightContext(context, scene);

		if (scene.engine.options.transparencyMode == 'sorted') {
			camera.target.bind(context);
			this.renderSkybox(context, scene, camera);
			this.renderSolid(context, scene, camera);
			this.renderTransparent(context, scene, camera);
			camera.target.unbind(context);
		}

		else if (scene.engine.options.transparencyMode == 'blended' ||
		         scene.engine.options.transparencyMode == 'stochastic')
		{
			camera.target.bind(context);

			this.renderSkybox(context, scene, camera);

			// Render solid geometry as normal
			this.renderSolid(context, scene, camera);

			// Render alpha mapped geometry
			this.renderAlphaMapped(context, scene, camera);

			camera.target.unbind(context);

			// Render transparency info that will be composited in OITPostProcess
			this.renderOIT(context, scene, camera);
		}

		context.shadow=false;
	},

	/** Renders solid renderers in batches */
	renderBatched: function(context) {
		var date=new Date();
		var batches=this.solidRendererBatches;

		var globalSamplers = [];

		// Prepare camera/projection uniforms; these won't change during rendering batches.
		this.sharedUniforms.projection = new UniformMat4(context.projection.top());
		this.sharedUniforms.view = new UniformMat4(context.camera.viewMatrix);
		this.sharedUniforms.viewInverse=new UniformMat4(context.camera.viewInverseMatrix);
		this.sharedUniforms.time.value=date.getTime();

		// Optionally prepare light uniforms. Light also won't change during rendering batches.
		if(context.light) {
			this.lightUniforms.lightDirection=new UniformVec3(context.light.direction);
			this.lightUniforms.lightColor=new UniformColor(context.light.color);
			this.lightUniforms.lightIntensity=new UniformFloat(context.light.intensity);
			this.lightUniforms.useShadows=new UniformInt(context.shadow?1:0);
		}

		// And shadow uniforms, if needed
		if(context.shadow) {
			this.shadowUniforms.linearDepthConstant=context.shadow.linearDepthConstant;
			this.shadowUniforms.lightView=context.shadow.lightView;
			this.shadowUniforms.lightProjection=context.shadow.lightProjection;
			this.shadowUniforms.shadowIntensity=context.shadow.shadowIntensity;

			globalSamplers.push(context.shadow.shadow0);
		}
		else {
			globalSamplers.push(this.shadowMapFallbackSampler);
		}

		var usedShader=false;

		for (var i in batches) {
			var batch=batches[i];

			// if(batch.length==0) continue; // Not necessary, because batches with size 0 can not exist

			// Use shader
			var material=batch[0].material;
			var shader=material.shader;
			if(shader!=usedShader) {
				shader.use();
				usedShader=shader;

				// Bind shadow uniforms
				if(context.shadow) shader.bindUniforms(this.shadowUniforms);

				// Bind shared uniforms
				shader.bindUniforms(this.sharedUniforms);

				// Bind light uniforms to shader
				if(context.light) shader.bindUniforms(this.lightUniforms);
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
				this.rendererUniforms.model.value=batch[j].matrix;
				this.rendererUniforms.modelview.value=context.modelview.top();
				this.rendererUniforms.modelviewInverse.value=mat4.invert(mat4.create(), context.modelview.top());

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
		var globalSamplers=[];
		if (context.shadow) {
			globalSamplers.push(context.shadow.shadow0);
		}
		else {
			globalSamplers.push(this.shadowMapFallbackSampler);
		}

		for(var j=0; j<renderers.length; ++j) {
			var renderer=renderers[j];

			context.modelview.push();
			context.modelview.multiply(renderer.matrix);

			renderer.material.bind(renderer.getDefaultUniforms(context), globalSamplers);
			renderer.render(context);
			renderer.material.unbind(globalSamplers);

			context.modelview.pop();
		}
	},

	renderSkybox: function(context, scene, camera) {
		var skybox = scene.cameraNode.getComponent(SkyboxComponent);
		if (!skybox) {
			return;
		}

		var globalSamplers = [this.shadowMapFallbackSampler];

		var renderComponent = skybox.meshNode.getComponent(MeshRendererComponent);
		var renderers = renderComponent.meshRenderers;
		for (var i=0; i < renderers.length; i++) {
			var renderer = renderers[i];

			var defaultUniforms = renderer.getDefaultUniforms(context);
			var modelMatrix = mat4.create();
			mat4.translate(modelMatrix, modelMatrix, camera.getPosition());
			defaultUniforms.model = new UniformMat4(modelMatrix);
			defaultUniforms.lightDirection=new UniformVec3(vec3.create());
			defaultUniforms.lightColor=new UniformColor(new Color());
			defaultUniforms.lightIntensity=new UniformFloat(1.0);
			defaultUniforms.ambient=new UniformColor(new Color());

			renderer.material.bind(defaultUniforms, globalSamplers);
			renderer.render(context);
			renderer.material.unbind(globalSamplers);
		}
	},

	renderSolid: function(context, scene, camera) {
		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		// Render solid renderers with the first light
		if (scene.lights.length>0)
			context.light=scene.lights[0];

		if(this.enableDynamicBatching) {
			this.renderBatched(context);
		}
		else {
			this.renderBruteForce(context, this.solidRenderers);
		}

		context.light=false;

		// Render solid geometry with the rest of the lights
		if (scene.lights.length>1) {
			gl.depthMask(false);
			gl.depthFunc(gl.LEQUAL);
			gl.blendFunc(gl.ONE, gl.ONE);
			gl.enable(gl.BLEND);
			for (var l=1; l<scene.lights.length; l++) {
				context.light=scene.lights[l];

				if(this.enableDynamicBatching) {
					this.renderBatched(context);
				}
				else {
					this.renderBruteForce(context, this.solidRenderers);
				}
			}
			gl.disable(gl.BLEND);
			gl.depthMask(true);
			gl.depthFunc(gl.LESS);
		}

		gl.disable(gl.DEPTH_TEST);
	},

	/** Renders all alpha-mapped geometry to current buffer */
	renderAlphaMapped: function(context, scene, camera) {
		var gl = context.gl;
		gl.depthMask(true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		this.transparencyAccum.uniforms['render_mode'].value = 2;
		for (var i in this.transparentRenderers) {
			var renderer = this.transparentRenderers[i];
			context.modelview.push();
			context.modelview.multiply(renderer.matrix);

			var uniforms = {};
			this._addUniforms(uniforms, renderer.material.uniforms);
			this._addUniforms(uniforms, renderer.getDefaultUniforms(context));

			this.transparencyAccum.bind(uniforms, renderer.material.samplers);
			renderer.renderGeometry(context, this.transparencyAccum.shader);
			this.transparencyAccum.unbind();

			context.modelview.pop();
		}

		gl.disable(gl.DEPTH_TEST);
	},

	renderTransparent: function(context, scene, camera) {
		var gl = context.gl;
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		gl.depthMask(false);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		this.renderBruteForce(context, this.transparentRenderers);

		gl.disable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(true);
	},

	_renderOITPass: function(context, scene, camera, renderColor) {
		var gl = context.gl;

		// Depth only pass for solid geometry
		gl.depthMask(true);
		gl.colorMask(false, false, false, false);
		this.renderSolid(context, scene, camera);
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
			if (renderColor) {
				gl.depthMask(true);
				this.transparencyAccum.uniforms['render_mode'].value = 3;
			}
			else {
				gl.depthMask(false);
				gl.blendEquation(gl.FUNC_ADD);
				gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
				gl.enable(gl.BLEND);
				this.transparencyAccum.uniforms['render_mode'].value = 1;
			}

		}

		for (var i in this.transparentRenderers) {
			var renderer = this.transparentRenderers[i];
			context.modelview.push();
			context.modelview.multiply(renderer.matrix);

			var uniforms = {};
			this._addUniforms(uniforms, renderer.material.uniforms);
			this._addUniforms(uniforms, renderer.getDefaultUniforms(context));

			this.transparencyAccum.bind(uniforms, renderer.material.samplers);
			renderer.renderGeometry(context, this.transparencyAccum.shader);
			this.transparencyAccum.unbind();

			context.modelview.pop();
		}

		gl.disable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(true);
	},

	renderOIT: function(context, scene, camera) {
		// Transparent color texture
		this.oitClearColor.set(0.0, 0.0, 0.0, 0.0);
		this.transparencyTarget.bind(context, false, this.oitClearColor);
		this._renderOITPass(context, scene, camera, true);
		this.transparencyTarget.unbind(context);

		// Transparent alpha amount texture
		this.oitClearColor.set(1.0, 1.0, 1.0, 1.0);
		this.transparencyWeight.bind(context, false, this.oitClearColor);
		this._renderOITPass(context, scene, camera, false);
		this.transparencyWeight.unbind(context);

		/**
		 * TODO: the accumulation pass can be rolled into a single pass shader,
		 *       but it requires MRT.
		 */
	}
});