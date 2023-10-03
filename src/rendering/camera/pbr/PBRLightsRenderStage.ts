import UniformColor from 'rendering/shaders/UniformColor';
import AmbientLight from 'scene/lights/AmbientLight';
import DirectionalLight from 'scene/lights/DirectionalLight';
import Material from 'rendering/materials/Material';
import Color from 'rendering/Color';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Engine from "../../../engine/Engine";
import Scene from "../../../scene/Scene";

/**
 * Deferred shading light accumulation pass
 */
class PBRLightsRenderStage extends PBRRenderStage {
	directional: any;
	skyboxRenderStage: any;
	backgroundMaterial: any;

	constructor() {
		super();

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

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		super.onStart(context, engine, camera);

		this.backgroundMaterial = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_background"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_background')),
			{
				color: new UniformColor(new Color(0.0, 0.0, 1.0, 1.0))
			},
			[]
		);

		engine.assetsManager.load();
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var lights = this.getLightsWithGeometry(scene);
		if (!lights.length) {
			return;
		}

		var gl = context.gl;

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
		camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
		camera.renderStage.renderEffect(context, this.backgroundMaterial, []);

		gl.stencilFunc(gl.EQUAL, 1, 0xFF);
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);

		gl.enable(gl.BLEND);

		for (var i=0; i<lights.length; i++) {
			this.renderLight(context, lights[i]);
		}

		gl.disable(gl.BLEND);

		super.onPostRender(context, scene, camera);
	}

	renderLight(context, light) {
		var shader = light.material.shader;

		shader.use();
		shader.bindUniforms(this.parent.sharedUniforms);
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

		shader.unbindSamplers(samplers);
	}
}

globalThis.PBRLightsRenderStage = PBRLightsRenderStage;
export default PBRLightsRenderStage;
