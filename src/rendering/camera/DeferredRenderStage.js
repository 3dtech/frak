/**
 * Deferred shading implementation
 */
var DeferredRenderStage = PostProcessRenderStage.extend({
	init: function() {
		this._super();

		this.debugActive = true;
		this.debugger = null;

		// TODO: check that the system can handle deferred rendering
	},

	getGeneratorStage: function() {
		return new DeferredShadingRenderStage();
	},

	debug: function(val) {
		this.debugActive = !(val === false);
	},

	initDebugger: function(context, scene) {
		this.debugger = {};

		function createQuad(x, y, width, height) {
			var vertices = [x,y,0, x,y+height,0, x+width,y+height,0, x+width,y,0];
			var quad = new TrianglesRenderBuffer(context, [0, 1, 2, 0, 2, 3]);
			quad.add('position', vertices, 3);
			quad.add("uv0", [0,0, 0,1, 1,1, 1,0], 2);
			return quad;
		}

		var buffer = this.generator.gbufferStage.buffer;

		this.debugger.quads = [];
		this.debugger.quads.push({ quad: createQuad(-1, -1, 0.5, 0.5),   texture: buffer.targets[0] });
		this.debugger.quads.push({ quad: createQuad(-0.5, -1, 0.5, 0.5), texture: buffer.targets[1] });
		this.debugger.quads.push({ quad: createQuad(0, -1, 0.5, 0.5),    texture: buffer.targets[2] });
		this.debugger.quads.push({ quad: createQuad(0.5, -1, 0.5, 0.5),  texture: buffer.targets[3] });

		this.debugger.quads.push({ quad: createQuad(0.5, -0.5, 0.5, 0.5),  texture: this.generator.oitStage.transparencyTarget.texture });
		this.debugger.quads.push({ quad: createQuad(0.5, 0, 0.5, 0.5),  texture: this.generator.oitStage.transparencyWeight.texture });


		for (var i=0; i<scene.lights.length; i++) {
			if (!scene.lights[i].enabled)
				continue;
			if (!scene.lights[i].shadowCasting)
				continue;
			if (!scene.lights[i].shadow)
				continue;
			if (scene.lights[i] instanceof DirectionalLight) {
				this.debugger.quads.push({ quad: createQuad(0.5, 0.5, 0.5, 0.5),  texture: scene.lights[i].shadow.texture });
				break;
			}
		}

		this.debugger.sampler = new Sampler('tex0', null);
	},

	onPostRender: function(context, scene, camera) {
		this._super(context, scene, camera);

		if (this.debugActive) {
			if (!this.debugger)
				this.initDebugger(context, scene);
			var gl = context.gl;
			gl.disable(gl.DEPTH_TEST);
			gl.disable(gl.CULL_FACE);
			for (var i=0; i<this.debugger.quads.length; i++) {
				this.debugger.sampler.texture = this.debugger.quads[i].texture;
				this.material.bind({}, [this.debugger.sampler]);
				this.renderQuad(context, this.material.shader, this.debugger.quads[i].quad);
				this.material.unbind([this.debugger.sampler]);
			}
		}
	},
});