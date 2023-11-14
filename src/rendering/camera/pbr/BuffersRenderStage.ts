import Material from 'rendering/materials/Material';
import RenderStage from '../RenderStage';
import Color from 'rendering/Color';
import MainRenderStage from './MainRenderStage';
import Engine from 'engine/Engine';
import RenderingContext from 'rendering/RenderingContext';
import Shader from "../../shaders/Shader";
import {View} from "../RendererOrganizer";
import PBRPipeline from "../PBRPipeline";
import Camera from "../Camera";
import Scene from "../../../scene/Scene";

class BuffersRenderStage extends RenderStage {
	parent: MainRenderStage;
	opaqueShader: Shader;
	blendShader: Shader;
	clearColor = new Color(0, 0, 0, 0);

	onStart(context: any, engine: Engine, camera: any) {
		this.opaqueShader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/pbr.frag',
			[
				'ALPHAMODE_OPAQUE 0',
				'ALPHAMODE_MASK 1',
				'ALPHAMODE_BLEND 2',
				'ALPHAMODE ALPHAMODE_OPAQUE'
			]);

		this.blendShader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/pbr.frag',
			[
				'ALPHAMODE_OPAQUE 0',
				'ALPHAMODE_MASK 1',
				'ALPHAMODE_BLEND 2',
				'ALPHAMODE ALPHAMODE_BLEND'
			]);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		this.parent.gbuffer.bind(context, false, this.clearColor);

		gl.depthMask(true);
		gl.colorMask(true, true, true, true);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.DEPTH_TEST);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0xFF);
		gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
		gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

		// Render opaque geometry to the g-buffer
		// this.renderBatches(context, this.opaqueShader, camera.renderStage, this.parent.organizer.opaqueRenderers);
		this.parent.organizer.opaqueRenderers.run(context, camera.renderStage, this.opaqueShader, this.parent.filteredRenderers);

		// Render parts of transparent geometry to the g-buffer where alpha = 1
		// this.renderBatches(context, this.blendShader, camera.renderStage, this.parent.organizer.transparentRenderers);
		this.parent.organizer.transparentRenderers.run(context, camera.renderStage, this.blendShader, this.parent.filteredRenderers);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.DEPTH_TEST);

		this.parent.gbuffer.unbind(context);
	}

	/*renderBatches(context: RenderingContext, baseShader: Shader, pipeline: PBRPipeline, view: View) {
		const filteredRenderers = this.parent.filteredRenderers;
		view.start();

		let material = view.nextBatchMaterial(filteredRenderers);
		while (material) {
			const shader = pipeline.selectShader(context, baseShader, material.definitions);
			shader.use();

			shader.bindUniforms(material.uniforms);
			shader.bindSamplers(material.samplers);

			let renderer = view.next(filteredRenderers);
			while (renderer) {
				context.modelview.push();
				context.modelview.multiply(renderer.matrix);
				renderer.renderGeometry(context, shader);
				context.modelview.pop();

				renderer = view.next(filteredRenderers);
			}

			material = view.nextBatchMaterial(filteredRenderers);
		}
	}*/
}

globalThis.BuffersRenderStage = BuffersRenderStage;
export default BuffersRenderStage;
