import Sampler from 'rendering/shaders/Sampler';
import PostProcessRenderStage from './PostProcessRenderStage';
import MainRenderStage from './pbr/MainRenderStage';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import AntiAliasPostProcess from "./AntiAliasPostProcess";
import UniformMat4 from "../shaders/UniformMat4";
import UniformInt from "../shaders/UniformInt";
import UniformFloat from "../shaders/UniformFloat";
import UniformVec3 from "../shaders/UniformVec3";

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRPipeline extends PostProcessRenderStage {
	debugger: any;

	getGeneratorStage() {
		return new MainRenderStage();
	}

	onStart(context: any, engine: any, camera: any) {
		this.addStage(new AntiAliasPostProcess());
		super.onStart(context, engine, camera);

		this.initDebugger(context);
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
			this.material.unbind([this.debugger.sampler]);
		}
		context.modelview.pop();
	}

	/**
	 * Returns default uniforms used commonly for everything.
	 * @param context Instance of RenderingContext
	 * @param uniforms Optional previously allocated uniforms object (cache) that the values will be written to.
	 */
	getDefaultUniforms(context, uniforms): any {
		if (typeof uniforms !== 'object' || uniforms === null) {
			uniforms = {};
		}

		if (uniforms.hasOwnProperty('modelview')) mat4.copy(uniforms.modelview.value, context.modelview.top());
		else uniforms.modelview = new UniformMat4(context.modelview.top());

		if (uniforms.hasOwnProperty('projection')) mat4.copy(uniforms.projection.value, context.projection.top());
		else uniforms.projection = new UniformMat4(context.projection.top());

		// Camera uniforms
		if (context.camera) {
			if (uniforms.hasOwnProperty('view')) mat4.copy(uniforms.view.value, context.camera.viewMatrix);
			else uniforms.view = new UniformMat4(context.camera.viewMatrix);

			if (uniforms.hasOwnProperty('viewInverse')) mat4.copy(uniforms.viewInverse.value, context.camera.viewInverseMatrix);
			else uniforms.viewInverse = new UniformMat4(context.camera.viewInverseMatrix);

			if (context.camera.near) {
				if (uniforms.hasOwnProperty('zNear')) uniforms.zNear.value = context.camera.near;
				else uniforms.zNear = new UniformFloat(context.camera.near);
			}

			if (context.camera.far) {
				if (uniforms.hasOwnProperty('zFar')) uniforms.zFar.value = context.camera.far;
				else uniforms.zFar = new UniformFloat(context.camera.far);
			}

			if (uniforms.hasOwnProperty('cameraPosition')) vec3.copy(uniforms.cameraPosition.value, context.camera.getPosition());
			else uniforms.cameraPosition = new UniformVec3(context.camera.getPosition());
		}

		return uniforms;
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
