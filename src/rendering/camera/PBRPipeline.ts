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

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRPipeline extends PostProcessRenderStage {
	debugger: any;
	sharedUniforms = {
		modelview: new UniformMat4(mat4.create()),
		projection: new UniformMat4(mat4.create()),
		view: new UniformMat4(mat4.create()),
		viewInverse: new UniformMat4(mat4.create()),
		zNear: new UniformFloat(),
		zFar: new UniformFloat(),
		cameraPosition: new UniformVec3(vec3.create()),
	};

	getGeneratorStage() {
		return new MainRenderStage();
	}

	onStart(context: any, engine: any, camera: any) {
		this.addStage(new AntiAliasPostProcess());
		super.onStart(context, engine, camera);

		this.initDebugger(context);
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		mat4.copy(this.sharedUniforms.modelview.value, context.modelview.top());
		mat4.copy(this.sharedUniforms.projection.value, context.projection.top());

		// Camera uniforms
		mat4.copy(this.sharedUniforms.view.value, camera.viewMatrix);
		mat4.copy(this.sharedUniforms.viewInverse.value, camera.viewInverseMatrix);
        vec3.copy(this.sharedUniforms.cameraPosition.value, camera.getPosition());

		if (camera.near) {
			this.sharedUniforms.zNear.value = camera.near;
		}

		if (camera.far) {
			this.sharedUniforms.zFar.value = camera.far;
		}

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
			this.material.unbind([this.debugger.sampler]);
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
