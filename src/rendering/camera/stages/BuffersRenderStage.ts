import RenderStage from './RenderStage';
import Color from 'rendering/Color';
import MainRenderStage from './MainRenderStage';
import Engine from 'engine/Engine';
import RenderingContext from 'rendering/RenderingContext';
import Shader from "rendering/shaders/Shader";
import Camera from "../Camera";
import Scene from "scene/Scene";
import Material from "../../materials/Material";
import UniformColor from "../../shaders/UniformColor";

class BuffersRenderStage extends RenderStage {
	parent: MainRenderStage;
	opaqueShader: Shader;
	blendShader: Shader;
	clearColor = new Color(0, 0, 0, 0);
	private materialBind = (m: Material, s: Shader) => {
		s.bindUniforms(m.uniforms);
		s.bindSamplers(m.samplers);
	};
	private activeAmbient = false;
	private noAmbientUniforms = {
		ambient: new UniformColor(new Color(0, 0, 0, 0))
	};

	onStart(context: any, engine: Engine, camera: any) {
		const defs = [
			'ALPHAMODE_OPAQUE 0',
			'ALPHAMODE_MASK 1',
			'ALPHAMODE_BLEND 2',
		];

		if (engine.options.emissiveEnabled) {
			defs.push('EMISSIVE_OUT');
		}

		if (engine.options.legacyAmbient) {
			defs.push('AMBIENT_OUT');

			// We overwrite the material bind function to handle legacy ambient for objects that don't have the ambient
			// uniform set. This is so a previous object's ambient value doesn't bleed into the next object.
			this.materialBind = (m: Material, s: Shader) => {
				const activeAmbient = Object.hasOwn(m.uniforms, 'ambient');
				if (this.activeAmbient && !activeAmbient) {
					s.bindUniforms(this.noAmbientUniforms);
				}

				this.activeAmbient = activeAmbient;

				s.bindUniforms(m.uniforms);
				s.bindSamplers(m.samplers);
			};
		}

		this.opaqueShader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/pbr.frag',
			defs.concat([
				'ALPHAMODE ALPHAMODE_OPAQUE'
			]));

		this.blendShader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/pbr.frag',
			defs.concat([
				'ALPHAMODE ALPHAMODE_BLEND'
			]));
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;

		this.parent.gbuffer.bind(context, false, this.clearColor);

		gl.depthMask(true);
		gl.colorMask(true, true, true, true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0xFF);
		gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
		gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

		this.activeAmbient = true;	// So we bind (lack of) ambient for the first renderer
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		// Render opaque geometry to the g-buffer
		scene.organizer.opaqueRenderers.run(
			context,
			this.opaqueShader,
			this.parent.filteredRenderers,
			undefined,
			this.materialBind
		);

		// Render parts of transparent geometry to the g-buffer where alpha = 1
		scene.organizer.transparentRenderers.run(
			context,
			this.blendShader,
			this.parent.filteredRenderers,
			undefined,
			this.materialBind
		);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.DEPTH_TEST);

		this.parent.gbuffer.unbind(context);
	}
}

globalThis.BuffersRenderStage = BuffersRenderStage;
export default BuffersRenderStage;
