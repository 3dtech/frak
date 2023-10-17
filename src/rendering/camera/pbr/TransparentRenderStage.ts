import AmbientLight from 'scene/lights/AmbientLight';
import DirectionalLight from 'scene/lights/DirectionalLight';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Scene from "../../../scene/Scene";
import PBRPipeline from "../PBRPipeline";
import ImageBasedLight from "../../../scene/lights/ImageBasedLight";
import RenderStage from "../RenderStage";
import MainRenderStage from "./MainRenderStage";
import Shader from "../../shaders/Shader";
import Engine from "../../../engine/Engine";
import Material from "../../materials/Material";
import {context} from "esbuild";
import scene from "../../../scene/Scene";
import camera from "../Camera";

function stringHash(str, seed = 0) {
	let hash = seed;
	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i++) {
		let chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

/**
 * Deferred shading light accumulation pass
 */
class TransparentRenderStage extends RenderStage {
	parent: MainRenderStage;
	directional: any;
	shaderCache = {};
	materials = {};

	constructor() {
		super();

		this.directional = [];
	}

	onStart(context: any, engine: Engine, camera: any) {
		for (const type of ['directional', 'ibl']) {
			this.materials[type] = new Material(
				engine.assetsManager.addShader('shaders/pbr.vert', `shaders/direct_${type}.frag`)
			);
		}
	}

	/// Returns first IBL, if there is one, first directional otherwise;
	getSingleLight(scene): {type: 'directional' | 'ibl', light: ImageBasedLight | DirectionalLight} {
		var directional = null;

		for (var i=0; i<scene.lights.length; i++) {
			var light = scene.lights[i];
			if (!light.enabled) {
				continue;
			}

			if (!light.geometry) {
				continue;
			}

			if (light instanceof ImageBasedLight) {
				return {type: 'ibl', light};
			}

			if (light instanceof DirectionalLight && !directional) {
				directional = light;
			}
		}

		return {type: 'directional', light: directional};
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbuffer.depth);

		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(false);

		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.CULL_FACE);

		gl.blendEquation(gl.FUNC_ADD);

		gl.enable(gl.BLEND);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var light = this.getSingleLight(scene);
		if (!light) {
			return;
		}

		var gl = context.gl;

		gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		this.renderRenderers(context, light.type, light.light, this.parent.organizer.transparentRenderers);

		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.BLEND);

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, null);

		super.onPostRender(context, scene, camera);
	}

	renderRenderers(context, type, light, renderers) {
		for (var i=0; i<renderers.length; i++) {
			var renderer = renderers[i];
			if (!renderer) {
				continue;
			}

			var material = renderer.material;
			var shader = this.selectShader(context, type, material.shader.definitions);
			shader.use();

			// Bind material uniforms and samplers
			shader.bindUniforms(light.material.uniforms);
			shader.bindUniforms(material.uniforms);
			shader.bindSamplers(material.samplers);

			context.modelview.push();
			context.modelview.multiply(renderer.matrix);
			renderer.renderGeometry(context, shader);
			context.modelview.pop();
		}
	}

	selectShader(context: RenderingContext, type: string, defines: string[]): Shader {
		let hash = 0;
		for (const define of defines) {
			hash ^= stringHash(define);
		}

		if (!this.shaderCache[hash]) {
			const baseShader = this.materials[type].shader;

			const shader = new Shader(context, baseShader.descriptor);
			shader.addVertexShader(baseShader.vertexShader.code);
			shader.addFragmentShader(baseShader.fragmentShader.code);
			shader.definitions = defines.slice();

			this.shaderCache[hash] = shader;
		}

		return this.shaderCache[hash];
	}
}

globalThis.TransparentRenderStage = TransparentRenderStage;
export default TransparentRenderStage;
