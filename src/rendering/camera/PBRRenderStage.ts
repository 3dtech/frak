import Sampler from 'rendering/shaders/Sampler';
import PostProcessRenderStage from './PostProcessRenderStage';
import MainRenderStage from './pbr/MainRenderStage';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import TargetTexture from './TargetTexture';

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRRenderStage extends PostProcessRenderStage {
	debugger: any;

	getGeneratorStage() {
		return new MainRenderStage();
	}

	onPreRender(context, scene, camera): any {
		var cameraTarget = camera.target;

		this.src.resetViewport();
		this.dst.resetViewport();

		if (cameraTarget.size[0] != this.src.size[0] || cameraTarget.size[1] != this.src.size[1]) {
			this.setSize(cameraTarget.size[0], cameraTarget.size[1]);
			this.src.setSize(cameraTarget.size[0], cameraTarget.size[1]);
			this.dst.setSize(cameraTarget.size[0], cameraTarget.size[1]);
		}

		camera.target = this.src;
		this.generator.render(context, scene, camera);
		camera.target = cameraTarget;
	}

	onPostRender(context, scene, camera): any {
		if (camera.target instanceof TargetTexture) {
			camera.target.bind(context);
			this.renderEffect(context, this.material, this.srcSampler);
			camera.target.unbind(context);
		}
		else {
			camera.target.bind(context);
			this.renderEffect(context, this.material, this.srcSampler, true);
			camera.target.unbind(context);
		}

		this.swapBuffers();

		if (!this.debugger)
			this.initDebugger(context, scene);
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

	initDebugger(context, scene) {
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
