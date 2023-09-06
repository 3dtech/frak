import PostProcessRenderStage from 'rendering/camera/PostProcessRenderStage';
import DeferredShadingRenderStage from 'rendering/camera/DeferredShadingRenderStage';
import Sampler from 'rendering/shaders/Sampler';
import DirectionalLight from 'scene/lights/DirectionalLight';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';

/**
 * Deferred shading implementation
 */

class DeferredRenderStage extends PostProcessRenderStage {
	debugActive: any;
	debugger: any;

	constructor() {
		super();

		this.debugActive = false;
		this.debugger = null;
	}

	getGeneratorStage(): any {
		return new DeferredShadingRenderStage();
	}

	onPreRender(context, scene, camera): any {
		var cameraTarget = camera.target;

		this.src.resetViewport();
		this.dst.resetViewport();

		if (this.generator.gbufferStage.damaged) {
			var size = vec2.scale(vec2.create(), this.generator.gbufferStage.size, this.generator.gbufferStage.quality);
			this.src.setSize(size[0], size[1]);
			this.dst.setSize(size[0], size[1]);
		}

		this.setSize(cameraTarget.size[0], cameraTarget.size[1]);

		if (this.substages.length>0) {
			camera.target = this.src;
		}
		this.generator.render(context, scene, camera);
		camera.target = cameraTarget;
	}

	onPostRender(context, scene, camera): any {
		super.onPostRender(context, scene, camera);

		if (this.debugActive) {
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
	}

	debug(val): any {
		this.debugActive = !(val === false);
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

		var buffer = this.generator.gbufferStage.buffer;
		var size = 2/7;
		var x = -1;
		var y = -1;

		this.debugger.quads.push({ quad: createQuad(x, y, size, size), texture: buffer.targets[0] });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[1] });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[2] });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[3] });

		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.softShadowsStage.target.texture });

		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.oitStage.transparencyTarget.texture });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.oitStage.transparencyWeight.texture });

		// Draw shadowmaps
		size = 0.5;
		x = -1;
		y = 1 - size;
		for (var i=0; i<scene.lights.length; i++) {
			if (!scene.lights[i].enabled)
				continue;
			if (!scene.lights[i].shadowCasting)
				continue;
			if (!scene.lights[i].shadow)
				continue;
			if (scene.lights[i] instanceof DirectionalLight) {
				this.debugger.quads.push({ quad: createQuad(x, y, size, size),  texture: scene.lights[i].shadow.texture });
				x+=size;
			}
		}

	}

}

globalThis.DeferredRenderStage = DeferredRenderStage;

export default DeferredRenderStage;
