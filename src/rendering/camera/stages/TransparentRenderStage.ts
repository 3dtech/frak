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
import { View } from "../RendererOrganizer";
import UniformColor from '../../shaders/UniformColor';

interface ShaderCache {
	[key: string]: Shader;
}

class TransparentRenderStage extends RenderStage {
	declare parent: MainRenderStage;
	size = vec2.create();
	shaderCache: ShaderCache = {};
	clearBlack = new Color(0, 0, 0, 0);
	clearWhite = new Color(1, 1, 1, 1);
	revealMaterial: Material;
	ppMaterial: Material;
	emptyDefinitions = new DefinitionsHelper([], 'TR_');
	shadowDefinitions = new DefinitionsHelper(['SHADOWS'], 'TR_');
	unlitDefinitions = new DefinitionsHelper(['MATERIAL_UNLIT'], 'TR_');
	ambientLightUniform = {
		ambientLight: new UniformColor(new Color(0, 0, 0, 0)),
	};
	private materialBind = (m: Material, s: Shader) => {
		s.bindUniforms(this.ambientLightUniform);
		s.bindUniforms(m.uniforms);
	};
	private activeAmbient = false;
	private noAmbientUniform = {
		ambient: new UniformColor(new Color(0, 0, 0, 0))
	};

	onStart(context: RenderingContext, engine: Engine, camera: any) {
		if (engine.options.legacyAmbient) {
			this.emptyDefinitions.addDefinition('LEGACY_AMBIENT');
			this.shadowDefinitions.addDefinition('LEGACY_AMBIENT');

			this.materialBind = (m: Material, s: Shader) => {
				const activeAmbient = Object.hasOwn(m.uniforms, 'ambient');
				if (this.activeAmbient && !activeAmbient) {
					s.bindUniforms(this.noAmbientUniform);
				}

				this.activeAmbient = activeAmbient;

				s.bindUniforms(this.ambientLightUniform);
				s.bindUniforms(m.uniforms);
			};
		}

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

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		super.onPreRender(context, scene, camera);
		this.activeAmbient = true;	// So we bind (lack of) ambient for the first renderer
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		const {light, type} = this.getSingleLight(scene);
		if (!light) {
			return;
		}

		if (scene.ambientLights.length) {
			scene.ambientLights[0].color.toVector(this.ambientLightUniform.ambientLight.value);
		}

		const shader = context.selectShader(this.shaderCache[type], light.shadowCasting ? this.shadowDefinitions : this.emptyDefinitions);
		const unlitShader = context.selectShader(this.shaderCache[type], this.unlitDefinitions);

		const gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);

		gl.depthMask(false);

		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.CULL_FACE);

		gl.enable(gl.BLEND);

		const materialBind = (m: Material, s: Shader) => {
			this.materialBind(m, s);

			s.bindSamplers(m.samplers.concat(light.material.samplers));
		};

		const run = (renderers: View, shader: Shader, materialBind?: (m: Material, s: Shader) => void) => {
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
		run(scene.organizer.transparentRenderers, shader, materialBind);
		run(scene.organizer.unlitRenderers, unlitShader, materialBind);

		// Reveal
		this.parent.oitReveal.bind(context, false, this.clearWhite);
		gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
		run(scene.organizer.transparentRenderers, this.revealMaterial.shader);
		run(scene.organizer.unlitRenderers, this.revealMaterial.shader);

		// Draw to screen
		gl.disable(gl.DEPTH_TEST);
		camera.renderStage.dst.bind(context, true);
		gl.blendFuncSeparate(gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.DST_ALPHA);
		camera.renderStage.screenQuad.render(context, this.ppMaterial, []);

		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
}

globalThis.TransparentRenderStage = TransparentRenderStage;
export default TransparentRenderStage;
