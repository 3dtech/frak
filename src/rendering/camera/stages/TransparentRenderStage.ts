import DirectionalLight from 'scene/lights/DirectionalLight';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import Scene from "scene/Scene";
import ImageBasedLight from "scene/lights/ImageBasedLight";
import RenderStage from "./RenderStage";
import MainRenderStage from "./MainRenderStage";
import Shader from "rendering/shaders/Shader";
import Engine from "engine/Engine";
import Material from "rendering/materials/Material";
import Color from "rendering/Color";
import DefinitionsHelper from "rendering/DefinitionsHelper";
import {View} from "../RendererOrganizer";

interface ShaderCache {
	[key: string]: Shader;
}

class TransparentRenderStage extends RenderStage {
	parent: MainRenderStage;
	size = vec2.create();
	shaderCache: ShaderCache = {};
	clearBlack = new Color(0, 0, 0, 0);
	clearWhite = new Color(1, 1, 1, 1);
	revealMaterial: Material;
	ppMaterial: Material;
	emptyDefinitions = new DefinitionsHelper();
	shadowDefinitions = new DefinitionsHelper(['SHADOWS']);

	onStart(context: RenderingContext, engine: Engine, camera: any) {
		for (const type of ['directional', 'ibl']) {
			this.shaderCache[type] = engine.assetsManager.addShader('shaders/mesh.vert', `shaders/direct_${type}.frag`);
		}

		this.revealMaterial = new Material(
			engine.assetsManager.addShader('shaders/mesh.vert', 'shaders/oit_reveal.frag')
		);

		this.ppMaterial = new Material(
			engine.assetsManager.addShader('shaders/uv.vert', 'shaders/pp_oit.frag'),
			{},
			this.parent.oitSamplers
		);
	}

	/// Get the main light in the scene
	getSingleLight(scene: Scene): {type: 'directional' | 'ibl', light: ImageBasedLight | DirectionalLight} {
		return {
			type: scene.light instanceof ImageBasedLight ? 'ibl' : 'directional',
			light: scene.light,
		};
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		const {light, type} = this.getSingleLight(scene);
		if (!light) {
			return;
		}

		const shader = context.selectShader(this.shaderCache[type], light.shadowCasting ? this.shadowDefinitions : this.emptyDefinitions);

		const gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);

		gl.depthMask(false);

		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.CULL_FACE);

		gl.enable(gl.BLEND);

		const materialBind = (m: Material, s: Shader) => {
			s.bindUniforms(m.uniforms);
			s.bindSamplers(m.samplers.concat(light.material.samplers));
		};

		const run = (renderers: View, shader: Shader) => {
			renderers.run(
				context,
				null,
				this.parent.filteredRenderers,
				r => {
					const s = context.selectShader(shader, r.material.definitions);
					s.use(light.material.uniforms);
					return s;
				},
				materialBind
			);
		};

		// Accum
		this.parent.oitAccum.bind(context, false, this.clearBlack);
		gl.blendFunc(gl.ONE, gl.ONE);
		run(scene.organizer.transparentRenderers, shader);
		run(scene.organizer.unlitRenderers, shader);

		// Reveal
		this.parent.oitReveal.bind(context, false, this.clearWhite);
		gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
		run(scene.organizer.transparentRenderers, this.revealMaterial.shader);
		run(scene.organizer.unlitRenderers, this.revealMaterial.shader);

		// Draw to screen
		gl.disable(gl.DEPTH_TEST);
		camera.renderStage.dst.bind(context, true);
		gl.blendFunc(gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA);
		camera.renderStage.screenQuad.render(context, this.ppMaterial, []);

		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
}

globalThis.TransparentRenderStage = TransparentRenderStage;
export default TransparentRenderStage;
