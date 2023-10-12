import Material from 'rendering/materials/Material';
import RenderStage from '../RenderStage';
import Color from 'rendering/Color';
import MainRenderStage from './MainRenderStage';
import Engine from 'engine/Engine';
import RenderingContext from 'rendering/RenderingContext';
import Shader from "../../shaders/Shader";

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

class BuffersRenderStage extends RenderStage {
	parent: MainRenderStage;
	material: Material;
	clearColor = new Color(0, 0, 0, 0);
	shaderCache = {};

	onStart(context: any, engine: Engine, camera: any) {
		this.material = new Material(engine.assetsManager.addShaderSource('shaders/pbr', []), {}, []);
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
		// this.renderBatches(context, scene, camera, this.parent.organizer.transparentBatchList);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
		gl.disable(gl.DEPTH_TEST);

		this.parent.gbuffer.unbind(context);
	}

	renderBatches(context, scene, camera, batches) {
		for (var i=0; i<batches.length; i++) {
			var batch = batches[i];
			if (!batch.length) {
				continue;
			}

			var batchMaterial = batch.get(0).material;
			var shader = this.selectShader(context, batchMaterial.shader.definitions);
			shader.use();

			// Bind material uniforms and samplers
			shader.bindUniforms(camera.renderStage.sharedUniforms);
			shader.bindUniforms(batchMaterial.uniforms);
			shader.bindSamplers(batchMaterial.samplers);

			var renderer;
			for (var j=0; j<batch.length; ++j) {
				renderer = batch.get(j);
				context.modelview.push();
				context.modelview.multiply(renderer.matrix);
				renderer.renderGeometry(context, shader);
				context.modelview.pop();
			}

			shader.unbindSamplers(batchMaterial.samplers);
		}
	}

	selectShader(context: RenderingContext, defines: string[]): Shader {
		let hash = 0;
		for (const define of defines) {
			hash ^= stringHash(define);
		}

		if (!this.shaderCache[hash]) {
			const baseShader = this.material.shader;

			const shader = new Shader(context, baseShader.descriptor);
			shader.addVertexShader(baseShader.vertexShader.code);
			shader.addFragmentShader(baseShader.fragmentShader.code);
			shader.definitions = defines.slice();

			this.shaderCache[hash] = shader;
		}

		return this.shaderCache[hash];
	}
}

globalThis.BuffersRenderStage = BuffersRenderStage;
export default BuffersRenderStage;
