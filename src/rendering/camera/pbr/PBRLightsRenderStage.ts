import RenderStage from 'rendering/camera/RenderStage';
import UniformVec3 from 'rendering/shaders/UniformVec3';
import UniformInt from 'rendering/shaders/UniformInt';
import UniformColor from 'rendering/shaders/UniformColor';
import UniformFloat from 'rendering/shaders/UniformFloat';
import SkyboxRenderStage from 'rendering/camera/SkyboxRenderStage';
import AmbientLight from 'scene/lights/AmbientLight';
import DirectionalLight from 'scene/lights/DirectionalLight';
import Sampler from 'rendering/shaders/Sampler';
import Material from 'rendering/materials/Material';
import Color from 'rendering/Color';
import SamplerAccumulator from 'rendering/shaders/SamplerAccumulator';
import UniformMat4 from 'rendering/shaders/UniformMat4';
import RenderingContext from 'rendering/RenderingContext';
import MainRenderStage from './MainRenderStage';
import Camera from '../Camera';
import ShaderDescriptor from "../../../scene/descriptors/ShaderDescriptor";

/**
 * Deferred shading light accumulation pass
 */
class PBRLightsRenderStage extends RenderStage {
	parent: MainRenderStage;
	sharedUniforms: any;
	sharedSamplers: any;
	directional: any;
	skyboxRenderStage: any;
	backgroundMaterial: any;
	emissiveMaterial: Material;
	samplerAccum = new SamplerAccumulator();

	constructor() {
		super();

		this.sharedUniforms = {
			cameraPosition: new UniformVec3(vec3.create()),
		};

		this.sharedSamplers = [];

		this.directional = [];
	}

	getLightsWithGeometry(scene): any {
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

				continue;
			}

			if (light instanceof DirectionalLight) {
				this.directional.push(light);
				continue;
			}

			other.push(light);
		}

		return ambient.concat(this.directional);
	}

	onStart(context, engine, camera): any {
		var gb = this.parent.gbuffer;

		this.sharedSamplers.push(new Sampler('color', gb.targets[0]));
		this.sharedSamplers.push(new Sampler('normalMetallic', gb.targets[1]));
		this.sharedSamplers.push(new Sampler('positionRoughness', gb.targets[2]));
		this.sharedSamplers.push(new Sampler('emissiveOcclusion', gb.targets[3]));

		this.backgroundMaterial = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_background"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_background')),
			{
				color: new UniformColor(new Color(0.0, 0.0, 1.0, 1.0))
			},
			[]
		);

		this.emissiveMaterial = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/pbr_emissive.frag')
			),
			{},
			[]
		);

		engine.assetsManager.load();
	}

	onPreRender(context, scene, camera): any {
		camera.getPosition(this.sharedUniforms.cameraPosition.value);
	}

	onPostRender(context: RenderingContext, scene, camera: Camera): any {
		var lights = this.getLightsWithGeometry(scene);
		if (!lights.length) {
			return;
		}

		var gl = context.gl;

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbuffer.depth);

		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0x00);

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
		camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
		this.parent.parent.renderEffect(context, this.backgroundMaterial, []);

		gl.stencilFunc(gl.EQUAL, 1, 0xFF);
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);

		gl.enable(gl.BLEND);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);

		for (var i=0; i<lights.length; i++) {
			this.renderLight(context, lights[i]);
		}

		this.parent.parent.screenQuad.render(context, this.emissiveMaterial, this.sharedSamplers);

		gl.disable(gl.BLEND);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, null);
	}

	renderLight(context, light) {
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
	}
}

globalThis.PBRLightsRenderStage = PBRLightsRenderStage;
export default PBRLightsRenderStage;
