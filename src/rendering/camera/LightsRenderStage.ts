import RenderStage from 'rendering/camera/RenderStage.js'
import UniformVec3 from 'rendering/shaders/UniformVec3.js'
import UniformInt from 'rendering/shaders/UniformInt.js'
import UniformColor from 'rendering/shaders/UniformColor.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import SkyboxRenderStage from 'rendering/camera/SkyboxRenderStage.js'
import AmbientLight from 'scene/lights/AmbientLight.js'
import DirectionalLight from 'scene/lights/DirectionalLight.js'
import Sampler from 'rendering/shaders/Sampler.js'
import Material from 'rendering/materials/Material.js'
import Color from 'rendering/Color'

/**
 * Deferred shading light accumulation pass
 */

class LightsRenderStage extends RenderStage {
	sharedUniforms: any;
	sharedSamplers: any;
	directional: any;
	skyboxRenderStage: any;
	backgroundMaterial: any;

	constructor() {
		super();

		this.sharedUniforms = {
			cameraPosition: new UniformVec3(vec3.create()),
			shadowOnly: new UniformInt(0),
			useSoftShadows: new UniformInt(1),
			ambient: new UniformColor(new Color(0, 0, 0, 1)),
			lightDirection: new UniformVec3(vec3.create()),
			lightColor: new UniformColor(),
			lightIntensity: new UniformFloat(),
			useShadows: new UniformInt()
		};

		this.sharedSamplers = [];

		this.directional = [];

		this.skyboxRenderStage = new SkyboxRenderStage();
	}

	getLightsWithGeometry(scene): any {
		vec4.set(this.sharedUniforms.ambient.value, 0, 0, 0, 1);

		this.directional = [];
		var ambient = [];
		var other = [];

		for (var i=0; i<scene.lights.length; i++) {
			var light = scene.lights[i];
			if (!light.enabled) {
				continue;
			}

			if (!light.geometry) {
				continue;
			}

			if (light instanceof AmbientLight) {
				ambient.push(light);

				this.sharedUniforms.ambient.value[0] += light.color.r;
				this.sharedUniforms.ambient.value[1] += light.color.g;
				this.sharedUniforms.ambient.value[2] += light.color.b;

				continue;
			}

			if (light instanceof DirectionalLight) {
				this.directional.push(light);
				continue;
			}

			other.push(light);
		}

		return ambient.concat(this.directional).concat(other);
	}

	onStart(context, engine, camera): any {
		var gb = this.parent.gbufferStage.buffer;

		this.sharedSamplers.push(new Sampler('gb0', gb.targets[0]));
		this.sharedSamplers.push(new Sampler('gb1', gb.targets[1]));
		this.sharedSamplers.push(new Sampler('gb2', gb.targets[2]));
		this.sharedSamplers.push(new Sampler('gb3', gb.targets[3]));

		this.backgroundMaterial = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_background"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_background')),
			{
				color: new UniformColor(new Color(1.0, 1.0, 1.0, 1.0))
			},
			[]
		);

		engine.assetsManager.load();

		this.skyboxRenderStage.start(context, engine, camera);
	}

	onPreRender(context, scene, camera): any {
		this.sharedUniforms.useSoftShadows.value = this.parent.softShadowsStage.enabled ? 1 : 0;
		camera.getPosition(this.sharedUniforms.cameraPosition.value);
	}

	onPostRender(context, scene, camera): any {
		var lights = this.getLightsWithGeometry(scene);
		var gl = context.gl;

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbufferStage.buffer.depth);

		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0x00);

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
		camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
		this.parent.parent.renderEffect(context, this.backgroundMaterial, this.sharedSamplers[1]);
		this.skyboxRenderStage.render(context, scene, camera);

		gl.stencilFunc(gl.EQUAL, 1, 0xFF);
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.enable(gl.BLEND);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);

		for (var i=0; i<lights.length; i++) {
			this.renderLight(context, lights[i]);
		}

		gl.disable(gl.BLEND);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);

		this.renderCustom(context, scene, camera);
	}

	renderCustom(context, scene, camera): any {
		var self = this;

		function renderLight(context, light) {
			vec3.copy(self.sharedUniforms.lightDirection.value, light.direction);
			self.sharedUniforms.lightIntensity.value = light.intensity;
			self.sharedUniforms.lightColor.value[0] = light.color.r;
			self.sharedUniforms.lightColor.value[1] = light.color.g;
			self.sharedUniforms.lightColor.value[2] = light.color.b;
			self.sharedUniforms.lightColor.value[3] = light.color.a;
			self.sharedUniforms.useShadows.value = light.shadowCasting ? 1 : 0;

			if (self.parent.organizer.enableDynamicBatching) {
				self.parent.renderBatched(context, self.parent.organizer.customBatchList, self.sharedUniforms);
			} else {
				self.parent.renderBruteForce(context, self.parent.organizer.customRenderers, self.sharedUniforms);
			}
		}

		var gl = context.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		gl.disable(gl.CULL_FACE);

		if (this.directional.length) {
			renderLight(context, this.directional[0]);
		}

		gl.depthMask(false);
		gl.depthFunc(gl.LEQUAL);
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.enable(gl.BLEND);

		for (var i = 1; i < this.directional.length; i++) {
			renderLight(context, this.directional[i]);
		}

		gl.disable(gl.BLEND);
		gl.depthMask(true);
		gl.depthFunc(gl.LESS);

		gl.disable(gl.DEPTH_TEST);
	}

	renderLight(context, light) {
		var shadowSampler;
		if (light.shadowCasting) {
			if (light instanceof DirectionalLight && this.sharedUniforms.useSoftShadows.value == 1) {
				shadowSampler = light.shadowSampler.texture;
				light.shadowSampler.texture = this.parent.softShadowsStage.target.texture;
			}
		}

		var shader = light.material.shader;

		shader.use();
		shader.bindUniforms(this.sharedUniforms);
		shader.bindUniforms(light.material.uniforms);

		var samplers;
		if (light.material.samplers.length>0) {
			samplers = light.material.samplers.concat(this.sharedSamplers);
		} else {
			samplers = this.sharedSamplers;
		}

		shader.bindSamplers(samplers);

		var renderers = light.getGeometryRenderers();
		for (var j=0; j<renderers.length; j++) {
			context.modelview.push();

			if (light.isPositional()) {
				context.modelview.multiply(renderers[j].matrix);
			}

			renderers[j].renderGeometry(context, shader);

			context.modelview.pop();
		}

		shader.unbindSamplers(samplers);

		if (light.shadowCasting) {
			if (light instanceof DirectionalLight && this.sharedUniforms.useSoftShadows.value == 1) {
				light.shadowSampler.texture = shadowSampler;
			}
		}
	}

}

globalThis.LightsRenderStage = LightsRenderStage;

export default LightsRenderStage;
