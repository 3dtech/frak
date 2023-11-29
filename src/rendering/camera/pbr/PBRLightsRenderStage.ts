import AmbientLight from 'scene/lights/AmbientLight';
import DirectionalLight from 'scene/lights/DirectionalLight';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Scene from "../../../scene/Scene";
import PBRPipeline from "../PBRPipeline";
import ImageBasedLight from "../../../scene/lights/ImageBasedLight";
import Engine from "../../../engine/Engine";
import Shader from "../../shaders/Shader";
import Material from "../../materials/Material";
import Light from "../../../scene/components/Light";

interface ShaderCache {
	[key: string]: Shader;
}

/**
 * Deferred shading light accumulation pass
 */
class PBRLightsRenderStage extends PBRRenderStage {
	shaderCache: ShaderCache = {};

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		for (const type of ['ambient', 'directional', 'ibl']) {
			this.shaderCache[type] = engine.assetsManager.addShader('shaders/uv.vert', `shaders/pbr_${type}.frag`);
		}
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		const gl = context.gl;
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);

		let firstLight = true;

		// Ambient
		if (scene.ambientLights.length) {
			firstLight = this.renderLights(this.shaderCache.ambient, scene.ambientLights, context, camera, firstLight);
		}

		// Directional
		if (scene.directionalLights.length) {
			firstLight = this.renderLights(this.shaderCache.directional, scene.directionalLights, context, camera, firstLight);
		}

		// IBL
		if (scene.imageBasedLights.length) {
			firstLight = this.renderLights(this.shaderCache.imageBased, scene.imageBasedLights, context, camera, firstLight);
		}

		// TODO: Point lights

		gl.disable(gl.BLEND);

		super.onPostRender(context, scene, camera);
	}

	renderLights(shader: Shader, lights: Light[], context: RenderingContext, camera: Camera, first: boolean) {
		shader.use();
		shader.bindSamplers(this.parent.sharedSamplers);

		for (const light of lights) {
			if (!light.enabled) {
				continue;
			}

			shader.bindUniforms(light.material.uniforms);
			if (light.material.samplers && light.material.samplers.length) {
				shader.bindSamplers(this.parent.sharedSamplers.concat(light.material.samplers));
			}

			camera.renderStage.screenQuad.quad.render();

			if (first) {
				context.gl.enable(context.gl.BLEND);
				first = false;
			}
		}

		return first;
	}
}

globalThis.PBRLightsRenderStage = PBRLightsRenderStage;
export default PBRLightsRenderStage;
