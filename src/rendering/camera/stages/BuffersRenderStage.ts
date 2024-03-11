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
import Renderer from "../../renderers/Renderer";

class BuffersRenderStage extends RenderStage {
	declare parent: MainRenderStage;
	opaqueShader: Shader;
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
		const defs = [];

		if (engine.options.emissiveEnabled) {
			defs.push('EMISSIVE_OUT');
		}

		if (engine.options.legacyAmbient) {
			defs.push('LEGACY_AMBIENT');

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
			defs);
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

		// Use stencil masking to hide parts that aren't supposed to be visible, but still need to be rendered to the
		// depth buffer for immersive rendering
		let currentlyVisible = true;
		const render = (r: Renderer, s: Shader) => {
			const toBeVisible = !!(camera.stencilMask & r.material.stencilLayer);
			if (toBeVisible !== currentlyVisible) {
				gl.stencilFunc(gl.ALWAYS, toBeVisible ? 1 : 0, 0xFF);
				currentlyVisible = toBeVisible;
			}

			r.renderGeometry(context, s);
		};

		// Render opaque geometry to the g-buffer
		scene.organizer.opaqueRenderers.run(
			context,
			this.opaqueShader,
			this.parent.filteredRenderers,
			undefined,
			this.materialBind,
			render
		);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.DEPTH_TEST);

		this.parent.gbuffer.unbind(context);
	}
}

globalThis.BuffersRenderStage = BuffersRenderStage;
export default BuffersRenderStage;
