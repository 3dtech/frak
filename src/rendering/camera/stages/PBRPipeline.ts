import Sampler from 'rendering/shaders/Sampler';
import PostProcessRenderStage from './PostProcessRenderStage';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import RenderingContext from "rendering/RenderingContext";
import Scene from "scene/Scene";
import Camera from "../Camera";
import Engine from "engine/Engine";

// TODO: Remove PostProcessRenderStage for this? / vice-versa
class PBRPipeline extends PostProcessRenderStage {
	debugger: any;
	debugActive = false;
	uboBuffer: WebGLBuffer;
	uboOffsets = {};
	zNear = new Float32Array();
	zFar = new Float32Array();
	inverseProjection = mat4.create();

	onStart(context: RenderingContext, engine: Engine, camera: Camera) {
		super.onStart(context, engine, camera);

		// We disable rendering before the shader is loaded and the UBO is created to avoid spamming the console with errors
		this.disable();
		this.material.shader = engine.assetsManager.addShader('shaders/uv.vert', 'shaders/quad.frag');

		engine.assetsManager.shadersManager.load(() => {
			if (!this.material.shader.linked) {
				this.material.shader.link();
			}

			const gl = context.gl;
			const blockIndex = gl.getUniformBlockIndex(this.material.shader.program, "Camera");
			const blockSize = gl.getActiveUniformBlockParameter(this.material.shader.program, blockIndex, gl.UNIFORM_BLOCK_DATA_SIZE);

			this.uboBuffer = gl.createBuffer();

			gl.bindBuffer(gl.UNIFORM_BUFFER, this.uboBuffer);
			gl.bufferData(gl.UNIFORM_BUFFER, blockSize, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.UNIFORM_BUFFER, null);

			gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, this.uboBuffer);

			const uboVariables = [
				'projection',
				'projectionInverse',
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
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;

		gl.bindBuffer(gl.UNIFORM_BUFFER, this.uboBuffer);

		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['projection'], context.projection.top());
		mat4.invert(this.inverseProjection, context.projection.top());
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['projectionInverse'], this.inverseProjection);

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
			for (var i = 0; i < this.debugger.quads.length; i++) {
				this.debugger.sampler.texture = this.debugger.quads[i].texture;
				this.material.bind({}, [this.debugger.sampler]);
				this.debugger.quads[i].quad.render(this.material.shader);
				this.material.unbind();
			}
			context.modelview.pop();
		}
	}

	replaceViewProjection(context: RenderingContext, projection: any, view: any) {
		const gl = context.gl;
		gl.bindBuffer(gl.UNIFORM_BUFFER, this.uboBuffer);
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['projection'], projection);
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['view'], view);
		gl.bindBuffer(gl.UNIFORM_BUFFER, null);
	}

	restoreViewProjection(context: RenderingContext, camera: Camera) {
		const gl = context.gl;
		gl.bindBuffer(gl.UNIFORM_BUFFER, this.uboBuffer);
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['projection'], context.projection.top());
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.uboOffsets['view'], camera.viewMatrix);
		gl.bindBuffer(gl.UNIFORM_BUFFER, null);
	}

	debug(v) {
		this.debugActive = !!v;
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
		if (context.engine.options.emissiveEnabled) {
			this.debugger.quads.push({quad: createQuad(x += size, y, size, size), texture: buffer.targets[3]});
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
