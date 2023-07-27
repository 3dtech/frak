import RenderStage from 'rendering/camera/RenderStage.js'
import RendererOrganizer from 'rendering/camera/RendererOrganizer.js'
import ShadowMapRenderStage from 'rendering/camera/ShadowMapRenderStage.js'
import DepthRenderStage from 'rendering/camera/DepthRenderStage.js'
import OITRenderStage from 'rendering/camera/OITRenderStage.js'
import SkyboxRenderStage from 'rendering/camera/SkyboxRenderStage.js'
import OpaqueGeometryRenderStage from 'rendering/camera/OpaqueGeometryRenderStage.js'
import TransparentGeometryRenderStage from 'rendering/camera/TransparentGeometryRenderStage.js'
import UniformMat4 from 'rendering/shaders/UniformMat4.js'
import UniformVec3 from 'rendering/shaders/UniformVec3.js'
import UniformColor from 'rendering/shaders/UniformColor.js'
import Renderer from 'rendering/renderers/Renderer.js'
import UniformInt from 'rendering/shaders/UniformInt.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import Sampler from 'rendering/shaders/Sampler.js'
import TargetTextureFloat from 'rendering/camera/TargetTextureFloat.js'
import Light from 'scene/components/Light.js'
import DirectionalLight from 'scene/lights/DirectionalLight.js'
import AmbientLight from 'scene/lights/AmbientLight.js'
import UniformVec4 from 'rendering/shaders/UniformVec4'

/** Render-stage that uses forward rendering to render meshes with materials and directional lighting */

class MaterialRenderStage extends RenderStage {
	organizer: any;
	solidRenderers: any;
	solidRendererBatches: any;
	transparentRenderers: any;
	transparentRendererBatches: any;
	shadowFallback: any;
	diffuseFallback: any;
	bindCameraTarget: any;
	unbindCameraTarget: any;
	shadowMapStage: any;
	depthStage: any;
	oitStage: any;
	skyboxStage: any;
	opaqueStage: any;
	transparentStage: any;
	eyePosition: any;
	invModelview: any;
	sharedUniforms: any;
	rendererUniforms: any;
	shadowUniforms: any;
	cachedUniforms: any;
	samplerAccum: any;
	_shadowContext: any;

	constructor() {
		super();
		this.organizer = new RendererOrganizer();

		this.solidRenderers = [];
		this.solidRendererBatches = {};

		this.transparentRenderers = [];
		this.transparentRendererBatches = {};

		this.shadowFallback = null;
		this.diffuseFallback = null;

		this.bindCameraTarget = {
			started: true,
			start () {
			},
			render(context, scene, camera): any {
				camera.target.bind(context);
			}
		};

		this.unbindCameraTarget = {
			started: true,
			start: function () {
			},
			render(context, scene, camera): any {
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
			"projection": new UniformMat4(mat4.create()),
			'cameraPosition': new UniformVec3(vec3.create()),
			ambient: new UniformVec4(vec4.create()),
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
	}

	onStart(context, engine, camera): any {
		this.diffuseFallback = new Sampler('diffuse0', engine.WhiteTexture);
		this.shadowFallback = new Sampler('shadow0', engine.WhiteTexture);

		if (engine.options.ssao === true) {
			this.depthStage.enable();
		}

		if (engine.options.transparencyMode != 'sorted') {
			this.oitStage.enable();
		}
	}

	/** Prepares shadow-mapping uniforms that are shared between all materials. */
	prepareShadowContext(context, scene): any {
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
	}

	/** Prepares Light uniforms that are shared between all materials. */
	prepareLightContext(context, scene): any {
		vec4.set(this.sharedUniforms.ambient.value, 0, 0, 0, 1);

		for (var i = 0; i < scene.lights.length; i++) {
			var light = scene.lights[i];
			if (!light.enabled) {
				continue;
			}

			if (light instanceof DirectionalLight) {
				light = light as any;
				if (light.uniforms) {
					vec3.copy(light.uniforms.lightDirection.value, light.direction);
					light.uniforms.lightIntensity.value = light.intensity;
					light.uniforms.lightColor.value[0] = light.color.r;
					light.uniforms.lightColor.value[1] = light.color.g;
					light.uniforms.lightColor.value[2] = light.color.b;
					light.uniforms.lightColor.value[3] = light.color.a;
					light.uniforms.useShadows.value = light.shadowCasting ? 1 : 0;
				} else {
					light.uniforms = {
						lightDirection: new UniformVec3(light.direction),
						lightColor: new UniformColor(light.color),
						lightIntensity: new UniformFloat(light.intensity),
						useShadows: new UniformInt(light.shadowCasting ? 1 : 0)
					};
				}
			} else if (light instanceof AmbientLight) {
				this.sharedUniforms.ambient.value[0] += light.color.r;
				this.sharedUniforms.ambient.value[1] += light.color.g;
				this.sharedUniforms.ambient.value[2] += light.color.b;
			}
		}
	}

	/** Prepares data shared among most renderers. */
	prepareShared(context): any {
		// Inverse modelview matrix and eye position
		mat4.invert(this.invModelview, context.modelview.top());
		mat4.translation(this.eyePosition, this.invModelview);

		// Prepares view and projection uniforms; these won't change during rendering.
		mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
		mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
		mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);
		vec3.copy(this.sharedUniforms.cameraPosition.value, context.camera.getPosition());
	}

	/** Acquires and organizes the visible renderers. */
	onPreRender(context, scene, camera): any {
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
	}

	onPostRender(context, scene, camera): any {
		// Remove stage data from context
		context.shadow = false;
		context.light = false;
	}

	/** Renders renderers in batches by material */
	renderBatched(context, batches): any {
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
	}

	/** Renders without dynamic batching */
	renderBruteForce(context, renderers): any {
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

}

globalThis.MaterialRenderStage = MaterialRenderStage;

export default MaterialRenderStage;
