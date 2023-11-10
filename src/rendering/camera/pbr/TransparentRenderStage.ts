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
import TargetTextureMulti from "../TargetTextureMulti";
import Sampler from "../../shaders/Sampler";
import Color from "../../Color";
import UniformColor from "../../shaders/UniformColor";
import ShaderDescriptor from "../../../scene/descriptors/ShaderDescriptor";

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
	size = vec2.create();
	shaderCache = {};
	materials = {};
	clearBlack = new Color(0, 0, 0, 0);
	clearWhite = new Color(1, 1, 1, 1);
	revealMaterial: Material;
	ppMaterial: Material;

	onStart(context: any, engine: Engine, camera: any) {
		for (const type of ['directional', 'ibl']) {
			this.materials[type] = new Material(
				engine.assetsManager.addShader('shaders/pbr.vert', `shaders/direct_${type}.frag`)
			);
		}

		this.revealMaterial = new Material(
			engine.assetsManager.addShader('shaders/pbr.vert', 'shaders/oit_reveal.frag')
		);

		this.ppMaterial = new Material(
			engine.assetsManager.addShader('shaders/uv.vert', 'shaders/pp_oit.frag'),
			{},
			this.parent.oitSamplers
		);
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

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var light = this.getSingleLight(scene);
		if (!light) {
			return;
		}

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);

		gl.depthMask(false);

		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.CULL_FACE);

		gl.enable(gl.BLEND);

		// Accum
		this.parent.oitAccum.bind(context, false, this.clearBlack);
		gl.blendFunc(gl.ONE, gl.ONE);
		this.renderRenderers(context, light.light, this.parent.organizer.sortedTransparentRenderers, this.materials[light.type].shader);

		// Reveal
		this.parent.oitReveal.bind(context, false, this.clearWhite);
		gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
		this.renderRenderers(context, light.light, this.parent.organizer.sortedTransparentRenderers, this.revealMaterial.shader);

		// Draw to screen
		gl.disable(gl.DEPTH_TEST);
		camera.renderStage.dst.bind(context, true);
		gl.blendFunc(gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA);
		camera.renderStage.screenQuad.render(context, this.ppMaterial, []);

		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}

	renderRenderers(context, light, renderers, baseShader: Shader) {
		for (var i=0; i<renderers.length; i++) {
			var renderer = renderers[i];
			if (!renderer) {
				continue;
			}

			var material = renderer.material;
			var shader = this.selectShader(context, material.shader.definitions, baseShader);
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

	selectShader(context: RenderingContext, defines: string[], baseShader: Shader): Shader {
		let hash = stringHash(baseShader.descriptor.fragmentSource);	// TODO: Create global cache, hash in Shader
		for (const define of defines) {
			hash ^= stringHash(define);
		}

		if (!this.shaderCache[hash]) {
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
