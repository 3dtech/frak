import RenderStage from './RenderStage';
import MainRenderStage from './MainRenderStage';
import RenderingContext from '../../RenderingContext';
import Engine from '../../../engine/Engine';
import Camera from '../Camera';
import Sampler from '../../shaders/Sampler';
import TrianglesRenderBufferVAO from '../../buffers/TrianglesRenderBufferVAO';
import Texture from '../../materials/Texture';
import Scene from '../../../scene/Scene';
import Shader from 'rendering/shaders/Shader';

type Quad = {
	quad: TrianglesRenderBufferVAO,
	texture: Texture,
};

class DebugRenderStage extends RenderStage {
	quads: Quad[] = [];
	sampler = new Sampler('src', null);
	shader: Shader;

	constructor(private readonly generator: MainRenderStage) {
		super();
	}

	onStart(context: RenderingContext, engine: Engine, camera: Camera) {
		super.onStart(context, engine, camera);

		this.shader = engine.assetsManager.shadersManager.add('shaders/uv.vert', 'shaders/quad.frag');
		engine.assetsManager.shadersManager.load();

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

		this.quads.push({ quad: createQuad(x, y, size, size), texture: buffer.targets[0] });
		this.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[1] });
		this.quads.push({ quad: createQuad(x += size, y, size, size), texture: buffer.targets[2] });
		if (context.engine.options.emissiveEnabled) {
			this.quads.push({quad: createQuad(x += size, y, size, size), texture: buffer.targets[3]});
		}
		if (context.engine.options.legacyAmbient) {
			this.quads.push({quad: createQuad(x += size, y, size, size), texture: buffer.targets[context.engine.options.emissiveEnabled ? 4 : 3]});
		}
		this.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.oitAccum.texture });
		this.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.oitReveal.texture });

		// Draw shadowmaps
		size = 0.5;
		x = -1;
		y = 1 - size;
		for (var i=0; i<engine.scene.directionalLights.length; i++) {
			if (
				!engine.scene.directionalLights[i].enabled ||
				!engine.scene.directionalLights[i].shadowCasting ||
				!engine.scene.directionalLights[i].shadow
			) {
				continue;
			}
			this.quads.push({ quad: createQuad(x, y, size, size),  texture: engine.scene.directionalLights[i].shadow.texture });
			x+=size;
		}
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		var gl = context.gl;
		gl.clearColor(0, 0, 0, 1);
		gl.colorMask(false, false, false, true);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.colorMask(true, true, true, false);
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		context.modelview.push();
		this.shader.use();
		for (var i = 0; i < this.quads.length; i++) {
			this.sampler.texture = this.quads[i].texture;
			this.shader.bindSamplers([this.sampler]);
			this.quads[i].quad.render(this.shader);
		}
		context.modelview.pop();

		super.onPostRender(context, scene, camera);
	}
}

globalThis.DebugRenderStage = DebugRenderStage;
export default DebugRenderStage;
