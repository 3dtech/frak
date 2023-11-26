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

interface MaterialCache {
	[key: string]: Material;
}

/**
 * Deferred shading light accumulation pass
 */
class PBRLightsRenderStage extends PBRRenderStage {
	materialCache: MaterialCache = {};

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		for (const type of ['ambient', 'directional', 'ibl']) {
			this.materialCache[type] = new Material(
				engine.assetsManager.addShader('shaders/uv.vert', `shaders/pbr_${type}.frag`),
				{},
				[]
			);
		}
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		const gl = context.gl;
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);

		let firstLight = true;

		// Ambient
		if (scene.ambientLights.length) {
			firstLight = this.renderLights(this.materialCache.ambient, scene.ambientLights, context, camera, firstLight);
		}

		// Directional
		if (scene.directionalLights.length) {
			firstLight = this.renderLights(this.materialCache.directional, scene.directionalLights, context, camera, firstLight);
		}

		// IBL
		if (scene.imageBasedLights.length) {
			firstLight = this.renderLights(this.materialCache.imageBased, scene.imageBasedLights, context, camera, firstLight);
		}

		// TODO: Point lights

		gl.disable(gl.BLEND);

		super.onPostRender(context, scene, camera);
	}

	renderLights(material: Material, lights: Light[], context: RenderingContext, camera: Camera, first: boolean) {
		material.bind(null, this.parent.sharedSamplers);

		for (const light of lights) {
			material.shader.bindUniforms(light.material.uniforms);
			if (light.material.samplers) {
				material.shader.bindSamplers(this.parent.sharedSamplers.concat(light.material.samplers));
			}

			camera.renderStage.screenQuad.quad.render();

			if (first) {
				context.gl.enable(context.gl.BLEND);
				first = false;
			}
		}

		material.unbind();

		return first;
	}
}

globalThis.PBRLightsRenderStage = PBRLightsRenderStage;
export default PBRLightsRenderStage;
