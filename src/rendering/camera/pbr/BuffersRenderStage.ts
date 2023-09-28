import Material from 'rendering/materials/Material';
import RenderStage from '../RenderStage';
import Color from 'rendering/Color';
import MainRenderStage from './MainRenderStage';
import Engine from 'engine/Engine';
import RenderingContext from 'rendering/RenderingContext';

class BuffersRenderStage extends RenderStage {
	parent: MainRenderStage;
	clearColor = new Color(0, 0, 0, 0);
	material: Material;

	constructor() {
		super();
		this.clearColor;
	}

	onStart(context: any, engine: Engine, camera: any) {
		this.material = new Material(engine.assetsManager.addShaderSource('shaders/pbr', [

		]), {}, []);
	}

	onPostRender(context: RenderingContext, scene, camera): any {
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
		this.renderBatches(context, scene, camera, this.parent.organizer.opaqueBatchList);

		// Render parts of transparent geometry to the g-buffer where alpha = 1
		this.renderBatches(context, scene, camera, this.parent.organizer.transparentBatchList);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.DEPTH_TEST);

		this.parent.gbuffer.unbind(context);
	}

	renderBatches(context, scene, camera, batches) {
		for (var i=0; i<batches.length; i++) {
			var batch = batches[i];
			var batchMaterial = batch.get(0).material;
			var shader = batchMaterial.shader;
			shader.use();

			var samplers = batchMaterial.samplers.slice();

			// Bind material uniforms and samplers
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(samplers);

			var renderer;
			for (var j=0; j<batch.length; ++j) {
				renderer = batch.get(j);
				context.modelview.push();
				context.modelview.multiply(renderer.matrix);
				renderer.renderGeometry(context, shader); // This will bind all default uniforms
				context.modelview.pop();
			}

			shader.unbindSamplers(samplers);
		}
	}
}

globalThis.BuffersRenderStage = BuffersRenderStage;
export default BuffersRenderStage;
