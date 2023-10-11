import AmbientLight from 'scene/lights/AmbientLight';
import DirectionalLight from 'scene/lights/DirectionalLight';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Scene from "../../../scene/Scene";
import PBRPipeline from "../PBRPipeline";
import ImageBasedLight from "../../../scene/lights/ImageBasedLight";

/**
 * Deferred shading light accumulation pass
 */
class PBRLightsRenderStage extends PBRRenderStage {
	directional: any;

	constructor() {
		super();

		this.directional = [];
	}

	getLightsWithGeometry(scene): any {
		this.directional = [];
		var ambient = [];
		var other = [];
		var ibl = [];

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

			if (light instanceof ImageBasedLight) {
				ibl.push(light);
				continue;
			}

			other.push(light);
		}

		return ambient.concat(this.directional).concat(ibl);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var lights = this.getLightsWithGeometry(scene);
		if (!lights.length) {
			return;
		}

		var gl = context.gl;

		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);

		this.renderLight(context, camera.renderStage, lights[0]);

		gl.enable(gl.BLEND);

		for (var i=1; i<lights.length; i++) {
			this.renderLight(context, camera.renderStage, lights[i]);
		}

		gl.disable(gl.BLEND);

		super.onPostRender(context, scene, camera);
	}

	renderLight(context, cameraStage: PBRPipeline, light) {
		var shader = light.material.shader;

		shader.use();
		shader.bindUniforms(light.material.uniforms);

		var samplers;
		if (light.material.samplers.length>0) {
			samplers = light.material.samplers.concat(this.parent.sharedSamplers);
		} else {
			samplers = this.parent.sharedSamplers;
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

		//shader.unbindSamplers(samplers);
	}
}

globalThis.PBRLightsRenderStage = PBRLightsRenderStage;
export default PBRLightsRenderStage;
