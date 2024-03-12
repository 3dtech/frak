import Sampler from 'rendering/shaders/Sampler';
import PostProcessRenderStage from './PostProcessRenderStage';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import RenderingContext from "rendering/RenderingContext";
import Scene from "scene/Scene";
import Camera from "../Camera";
import Engine from "engine/Engine";
import UniformBlock from '../../shaders/UniformBlock';

type CameraBlock = {
	projection: Float32Array;
	projectionInverse: Float32Array;
	view: Float32Array;
	viewInverse: Float32Array;
	zNear: Float32Array;
	zFar: Float32Array;
	cameraPosition: Float32Array;
};

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRPipeline extends PostProcessRenderStage {
	debugger: any;
	debugActive = false;
	cameraBlock: UniformBlock;
	cameraBlockValues: CameraBlock;

	onStart(context: RenderingContext, engine: Engine, camera: Camera) {
		super.onStart(context, engine, camera);

		// We disable rendering before the shader is loaded and the UBO is created to avoid spamming the console with errors
		this.disable();
		this.material.shader = engine.assetsManager.addShader('shaders/uv.vert', 'shaders/quad.frag');

		engine.assetsManager.shadersManager.load(() => {
			if (!this.material.shader.linked) {
				this.material.shader.link();
			}

			this.cameraBlockValues = {
				projection: mat4.create(),
				projectionInverse: mat4.create(),
				view: mat4.create(),
				viewInverse: mat4.create(),
				zNear: new Float32Array(1),
				zFar: new Float32Array(1),
				cameraPosition: vec3.create(),
			};

			this.cameraBlock = new UniformBlock(context, 'Camera', this.cameraBlockValues);
			this.cameraBlock.create(context, this.material.shader.program);
			this.cameraBlock.bind(context, 0);

			this.enable();
		});
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		var cameraTarget = camera.target;

		if (cameraTarget.size[0] != this.src.size[0] || cameraTarget.size[1] != this.src.size[1]) {
			this.setSize(cameraTarget.size[0], cameraTarget.size[1]);
			this.src.setSize(cameraTarget.size[0], cameraTarget.size[1]);
			this.dst.setSize(cameraTarget.size[0], cameraTarget.size[1]);

			this.src.resetViewport();
			this.dst.resetViewport();
		}

		mat4.copy(this.cameraBlockValues.projection, context.projection.top());
		mat4.invert(this.cameraBlockValues.projectionInverse, this.cameraBlockValues.projection);
		mat4.copy(this.cameraBlockValues.view, camera.viewMatrix);
		mat4.copy(this.cameraBlockValues.viewInverse, camera.viewInverseMatrix);
		this.cameraBlockValues.zNear[0] = camera.near;
		this.cameraBlockValues.zFar[0] = camera.far;
		vec3.copy(this.cameraBlockValues.cameraPosition, camera.getPosition());

		this.cameraBlock.update(context);

		super.onPreRender(context, scene, camera);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		super.onPostRender(context, scene, camera);

		if (this.debugActive) {
			if (!this.debugger) {
				this.initDebugger(context, scene);
			}
			var gl = context.gl;
			gl.clearColor(0, 0, 0, 1);
			gl.colorMask(false, false, false, true);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.colorMask(true, true, true, false);
			gl.disable(gl.DEPTH_TEST);
			gl.disable(gl.CULL_FACE);
			context.modelview.push();
			this.material.shader.use();
			for (var i = 0; i < this.debugger.quads.length; i++) {
				this.debugger.sampler.texture = this.debugger.quads[i].texture;
				this.material.shader.bindSamplers([this.debugger.sampler]);
				this.debugger.quads[i].quad.render(this.material.shader);
			}
			context.modelview.pop();
		}
	}

	replaceViewProjection(context: RenderingContext, projection: any, view: any) {
		const gl = context.gl;
		this.cameraBlock.bindBuffer(context);
		this.cameraBlock.updateIndividual(context, 'projection', projection);
		this.cameraBlock.updateIndividual(context, 'view', view);
		this.cameraBlock.unbindBuffer(context);
	}

	restoreViewProjection(context: RenderingContext, camera: Camera) {
		const gl = context.gl;
		this.cameraBlock.bindBuffer(context);
		this.cameraBlock.updateIndividual(context, 'projection', context.projection.top());
		this.cameraBlock.updateIndividual(context, 'view', camera.viewMatrix);
		this.cameraBlock.unbindBuffer(context);
	}

	debug(v) {
		this.debugActive = !!v;
	}

	initDebugger(context, scene) {
		this.debugger = {
			quads: [],
			sampler: new Sampler('src', null)
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
		if (context.engine.options.emissiveEnabled) {
			this.debugger.quads.push({quad: createQuad(x += size, y, size, size), texture: buffer.targets[3]});
		}
		if (context.engine.options.legacyAmbient) {
			this.debugger.quads.push({quad: createQuad(x += size, y, size, size), texture: buffer.targets[context.engine.options.emissiveEnabled ? 4 : 3]});
		}
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.oitAccum.texture });
		this.debugger.quads.push({ quad: createQuad(x += size, y, size, size), texture: this.generator.oitReveal.texture });

		// Draw shadowmaps
		size = 0.5;
		x = -1;
		y = 1 - size;
		for (var i=0; i<scene.directionalLights.length; i++) {
			if (
				!scene.directionalLights[i].enabled ||
				!scene.directionalLights[i].shadowCasting ||
				!scene.directionalLights[i].shadow
			) {
				continue;
			}
			this.debugger.quads.push({ quad: createQuad(x, y, size, size),  texture: scene.directionalLights[i].shadow.texture });
			x+=size;
		}
	}
}

globalThis.PBRPipeline = PBRPipeline;
export default PBRPipeline;
