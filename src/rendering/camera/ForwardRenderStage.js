/**
 * Forward renderer
 */
var ForwardRenderStage = PostProcessRenderStage.extend({
	init: function() {
		this._super();

		this.debugActive = false;
		this.debugger = null;
	},

	onPostRender: function(context, scene, camera) {
		this._super(context, scene, camera);

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
	},

	debug: function(val) {
		this.debugActive = !(val === false);
	},

	initDebugger: function(context, scene) {
		this.debugger = {
			quads: [],
			sampler: new Sampler('tex0', null)
		};

		function createQuad(x, y, width, height) {
			var vertices = [x,y,0, x,y+height,0, x+width,y+height,0, x+width,y,0];
			var quad = new TrianglesRenderBuffer(context, [0, 1, 2, 0, 2, 3]);
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
		var size = 2/4;
		var x = -1;
		var y = -1;
		if (this.generator.oitStage.enabled) {
			this.debugger.quads.push({ quad: createQuad(x, y, size, size),  texture: this.generator.oitStage.transparencyTarget.texture });
			this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.oitStage.transparencyWeight.texture });
		}

		// Draw depth stage, if enabled
		if (this.generator.depthStage.enabled) {
			this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.depthStage.target.texture });
		}
	}
});
