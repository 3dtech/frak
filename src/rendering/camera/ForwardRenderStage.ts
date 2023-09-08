import PostProcessRenderStage from 'rendering/camera/PostProcessRenderStage';
import Texture from 'rendering/materials/Texture';
import Sampler from 'rendering/shaders/Sampler';
import DirectionalLight from 'scene/lights/DirectionalLight';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';

/**
 * Forward renderer
 */
class ForwardRenderStage extends PostProcessRenderStage {
	debugActive: any;
	debugger: any;

	constructor() {
		super();

		this.debugActive = false;
		this.debugger = null;
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

			this.debugger.sampler.texture = this.debugger.vsyncTextures[0];
			this.material.bind({}, [this.debugger.sampler]);
			this.debugger.vsyncQuad.render(this.material.shader);
			this.material.unbind([this.debugger.sampler]);
			this.debugger.vsyncTextures.reverse();

			context.modelview.pop();
		}
	}

	debug(val): any {
		this.debugActive = !(val === false);
	}

	initDebugger(context, scene) {

		var texRed = new Texture(context);
		texRed.name = "Red";
		texRed.mipmapped = false;
		texRed.clearImage(context, [0xFF, 0x00, 0x00, 0xFF]);

		var texCyan = new Texture(context);
		texCyan.name = "Red";
		texCyan.mipmapped = false;
		texCyan.clearImage(context, [0x00, 0xFF, 0xFF, 0xFF]);

		this.debugger = {
			quads: [],
			sampler: new Sampler('tex0', null),
			vsyncQuad: createQuad(0.85, 0.85, 0.1, 0.1),
			vsyncTextures: [ texRed, texCyan ]
		};

		function createQuad(x, y, width, height) {
			var vertices = [x,y,0, x,y+height,0, x+width,y+height,0, x+width,y,0];
			var quad = new TrianglesRenderBufferVAO(context, [0, 1, 2, 0, 2, 3]);
			quad.add('position', vertices, 3);
			quad.add("uv0", [0,0, 0,1, 1,1, 1,0], 2);
			return quad;
		}

		// Draw shadowmaps
		var size = 0.5;
		var x = -1;
		var y = 1 - size;
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

		// Draw OIT buffers
		size = 2/4;
		x = -1;
		y = -1;
		if (this.generator.oitStage.enabled) {
			this.debugger.quads.push({ quad: createQuad(x, y, size, size),  texture: this.generator.oitStage.transparencyTarget.texture });
			this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.oitStage.transparencyWeight.texture });
		}

		// Draw depth stage, if enabled
		if (this.generator.depthStage.enabled) {
			this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.depthStage.target.texture });
		}
	}
}

globalThis.ForwardRenderStage = ForwardRenderStage;
export default ForwardRenderStage;
