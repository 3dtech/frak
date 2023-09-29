import Sampler from 'rendering/shaders/Sampler';
import PostProcessRenderStage from './PostProcessRenderStage';
import MainRenderStage from './pbr/MainRenderStage';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import TonemapRenderStage from './pbr/TonemapRenderStage';

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRRenderStage extends PostProcessRenderStage {
	debugger: any;

	getGeneratorStage() {
		return new MainRenderStage();
	}

	onStart(context: any, engine: any, camera: any) {
		this.addStage(new TonemapRenderStage());
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

globalThis.PBRRenderStage = PBRRenderStage;
export default PBRRenderStage;
