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
import DefinitionsHelper from "../../DefinitionsHelper";
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

		gl.depthMask(false);

		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.CULL_FACE);

		gl.enable(gl.BLEND);

		// Accum
		this.parent.oitAccum.bind(context, false, this.clearBlack);
		gl.blendFunc(gl.ONE, gl.ONE);
		scene.organizer.transparentRenderers.run(context, shader, this.parent.filteredRenderers, s => {
			s.use(light.material.uniforms);
		}, (m, s) => {
			s.bindUniforms(m.uniforms);
			s.bindSamplers(m.samplers.concat(light.material.samplers));
		});

		// Reveal
		this.parent.oitReveal.bind(context, false, this.clearWhite);
		gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
		scene.organizer.transparentRenderers.run(context, this.revealMaterial.shader, this.parent.filteredRenderers, s => {
			s.use(light.material.uniforms);
		}, (m, s) => {
			s.bindUniforms(m.uniforms);
			s.bindSamplers(m.samplers.concat(light.material.samplers));
		});

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
