import Sampler from 'rendering/shaders/Sampler';
import PostProcessRenderStage from './PostProcessRenderStage';
import MainRenderStage from './pbr/MainRenderStage';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import AntiAliasPostProcess from "./AntiAliasPostProcess";
import UniformMat4 from "../shaders/UniformMat4";
import UniformFloat from "../shaders/UniformFloat";
import UniformVec3 from "../shaders/UniformVec3";
import RenderingContext from "../RenderingContext";
import Scene from "../../scene/Scene";
import Camera from "./Camera";
import Engine from "../../engine/Engine";

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRPipeline extends PostProcessRenderStage {
	debugger: any;
	uboBuffer: WebGLBuffer;
	uboOffsets = {};
	zNear = new Float32Array();
	zFar = new Float32Array();

	getGeneratorStage() {
		return new MainRenderStage();
	}

	onStart(context: RenderingContext, engine: Engine, camera: Camera) {
		this.addStage(new AntiAliasPostProcess());
		super.onStart(context, engine, camera);

		// We disable rendering before the shader is loaded and the UBO is created to avoid spamming the console with errors
		this.disable();
		this.material.shader = engine.assetsManager.addShader('shaders/uv.vert', 'shaders/quad.frag');

		engine.assetsManager.shadersManager.load(() => {
			if (!this.material.shader.linked) {
				this.material.shader.link();
			}

			const gl = context.gl;
			const blockIndex = gl.getUniformBlockIndex(this.material.shader.program, "Camera_block_0");
			const blockSize = gl.getActiveUniformBlockParameter(this.material.shader.program, blockIndex, gl.UNIFORM_BLOCK_DATA_SIZE);

			this.uboBuffer = gl.createBuffer();

			gl.bindBuffer(gl.UNIFORM_BUFFER, this.uboBuffer);
			gl.bufferData(gl.UNIFORM_BUFFER, blockSize, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.UNIFORM_BUFFER, null);

			gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, this.uboBuffer);

			const uboVariables = [
				'projection',
				'view',
				'viewInverse',
				'zNear',
				'zFar',
				'cameraPosition'
			];
			const uboIndices = gl.getUniformIndices(this.material.shader.program, uboVariables);
			const uboOffsets = gl.getActiveUniforms(this.material.shader.program, uboIndices, gl.UNIFORM_OFFSET);

			uboVariables.forEach((v, i) => {
				this.uboOffsets[v] = uboOffsets[i];
			});

			this.enable();
		});

		this.initDebugger(context);
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;

		gl.bindBuffer(gl.UNIFORM_BUFFER, this.uboBuffer);

		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['modelview'], context.modelview.top());
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['projection'], context.projection.top());

		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['view'], camera.viewMatrix);
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['viewInverse'], camera.viewInverseMatrix);
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['cameraPosition'], camera.getPosition());

		if (camera.near) {
			this.zNear[0] = camera.near;
			gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['zNear'], this.zNear);
		}

		if (camera.far) {
			this.zFar[0] = camera.far;
			gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['zFar'], this.zFar);
		}

		gl.bindBuffer(gl.UNIFORM_BUFFER, null);

		super.onPreRender(context, scene, camera);
	}

	onPostRender(context, scene, camera): any {
		super.onPostRender(context, scene, camera);

		var gl = context.gl;
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		context.modelview.push();
		for (var i=0; i<this.debugger.quads.length; i++) {
			this.debugger.sampler.texture = this.debugger.quads[i].texture;
			this.material.bind({}, [this.debugger.sampler]);
			this.debugger.quads[i].quad.render(this.material.shader);
			this.material.unbind();
		}
		context.modelview.pop();
	}

	initDebugger(context) {
		this.debugger = {
			quads: [],
			sampler: new Sampler('tex0', null)
		};

		function createQuad(x, y, width, height) {
			var vertices = [x,y,0, x,y+height,0, x+width,y+height,0, x+width,y,0];
			var quad = new TrianglesRenderBufferVAO(context, [0, 1, 2, 0, 2, 3]);
			quad.add('position', vertices, 3);
			quad.add('uv0', [0,0, 0,1, 1,1, 1,0], 2);
			return quad;
		}

		var buffer = this.generator.gbuffer;
		var size = 2/7;
		var x = -1;
		var y = -1;

		this.debugger.quads.push({ quad: createQuad(x, y, size, size), texture: buffer.targets[0] });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[1] });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[2] });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[3] });
	}
}

globalThis.PBRPipeline = PBRPipeline;
export default PBRPipeline;
