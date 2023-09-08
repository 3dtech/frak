import RenderStage from 'rendering/camera/RenderStage';
import RendererOrganizer from 'rendering/camera/RendererOrganizer';
import DeferredShadowRenderStage from 'rendering/camera/DeferredShadowRenderStage';
import OITRenderStage from 'rendering/camera/OITRenderStage';
import GBufferRenderStage from 'rendering/camera/GBufferRenderStage';
import SoftShadowsRenderStage from 'rendering/camera/SoftShadowsRenderStage';
import LightsRenderStage from 'rendering/camera/LightsRenderStage';
import UnlitGeometryRenderStage from 'rendering/camera/UnlitGeometryRenderStage';
import UniformMat4 from 'rendering/shaders/UniformMat4';
import UniformInt from 'rendering/shaders/UniformInt';
import Sampler from 'rendering/shaders/Sampler';
import SamplerAccumulator from 'rendering/shaders/SamplerAccumulator';

/**
 * Deferred shading implementation
 */
class DeferredShadingRenderStage extends RenderStage {
	organizer: any;
	diffuseFallback: any;
	size: any;
	bindCameraTarget: any;
	unbindCameraTarget: any;
	shadowStage: any;
	oitStage: any;
	gbufferStage: any;
	softShadowsStage: any;
	lightsStage: any;
	customStage: any;
	sharedUniforms: any;
	rendererUniforms: any;
	samplerAccum: any;
	cachedUniforms: any;

	constructor() {
		super();
		this.organizer = new RendererOrganizer();
		this.diffuseFallback = null;
		this.size = vec2.create();

		this.bindCameraTarget = {
			started: true,
			start() {},
			render(context, scene, camera): any {
				camera.target.bind(context, true);
			}
		};

		this.unbindCameraTarget = {
			started: true,
			start: function() {},
			render(context, scene, camera): any {
				camera.target.unbind(context);
			}
		};

		// Rendering order is defined as follows:
		this.shadowStage = this.addStage(new DeferredShadowRenderStage());
		this.oitStage = this.addStage(new OITRenderStage());
		this.gbufferStage = this.addStage(new GBufferRenderStage());
		this.softShadowsStage = this.addStage(new SoftShadowsRenderStage()).disable();
		this.addStage(this.bindCameraTarget);
		this.lightsStage = this.addStage(new LightsRenderStage());
		this.customStage = this.addStage(new UnlitGeometryRenderStage());
		this.addStage(this.unbindCameraTarget);

		// Shared uniforms cache
		this.sharedUniforms = {
			view: new UniformMat4(mat4.create()),
			viewInverse: new UniformMat4(mat4.create()),
			projection: new UniformMat4(mat4.create())
		};

		// Renderer uniforms cache
		// These are set to null because they are only given values of existing matrices temporarily while rendering
		this.rendererUniforms = {
			model: new UniformMat4(null),
			modelview: new UniformMat4(null),
			receiveShadows: new UniformInt(1)
		};

		this.samplerAccum = new SamplerAccumulator();
	}

	onStart(context, engine, camera): any {
		this.diffuseFallback = new Sampler('diffuse0', engine.WhiteTexture);
		vec2.copy(this.size, this.parent.size);

		if (engine.options.softShadows) {
			this.softShadowsStage.enable();
		}
	}

	/** Prepares data shared among most renderers. */
	prepareShared(context): any {
		// Prepares view and projection uniforms; these won't change during rendering.
		mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
		mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
		mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);

		vec2.copy(this.size, this.parent.size);
	}

	/** Acquires and organizes the visible renderers. */
	onPreRender(context, scene, camera): any {
		// Prepare shared uniforms
		this.prepareShared(context);

		var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);

		this.organizer.sort(scene.engine, renderers);
	}

	onPostRender(context, scene, camera): any {}

	/** Renders renderers in batches by material */
	renderBatched(context, batches, uniforms): any {
		// console.log("RenderBatched", context, batches);
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
					shader.bindUniforms(this.sharedUniforms);
					shader.bindUniforms(uniforms);
				}

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
	renderBruteForce(context, renderers, uniforms) {
		for (var j = 0; j < renderers.length; ++j) {
			var renderer = renderers[j];
			if (!renderer) {
				break;
			}

			context.modelview.push();
			context.modelview.multiply(renderer.matrix);

			this.cachedUniforms = renderer.getDefaultUniforms(context, uniforms);
			// this.cachedUniforms = renderer.getDefaultUniforms(context, this.cachedUniforms);
			renderer.material.bind(
				this.cachedUniforms
			);

			renderer.render(context);
			renderer.material.unbind();

			context.modelview.pop();
		}
	}
}

globalThis.DeferredShadingRenderStage = DeferredShadingRenderStage;
export default DeferredShadingRenderStage;
