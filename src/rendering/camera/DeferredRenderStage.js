/**
 * Deferred shading implementation
 */
var DeferredRenderStage = PostProcessRenderStage.extend({
	init: function() {
		this._super();

		this.debugActive = false;
		this.debugger = null;
	},

	onStart: function(context, engine, camera) {
		// Check that the device can handle deferred rendering
		if (!context.gl.getExtension('WEBGL_draw_buffers'))
			throw('DeferredRenderStage: WEBGL_draw_buffers not available.');
		if (!context.gl.getExtension('OES_texture_float'))
			throw('DeferredRenderStage: OES_texture_float not available.');
		if (!context.gl.getExtension('OES_standard_derivatives'))
			throw('DeferredRenderStage: OES_standard_derivatives not available.');

		this._super(context, engine, camera);
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

		var size = 2/7;
		var x = -1;
		var y = -1;

		this.debugger.quads.push({ quad: createQuad(x, y, size, size),   texture: buffer.targets[0] });
		this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size), texture: buffer.targets[1] });
		this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),    texture: buffer.targets[2] });
		this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: buffer.targets[3] });

		this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.softShadowsStage.target.texture });

		this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.oitStage.transparencyTarget.texture });
		this.debugger.quads.push({ quad: createQuad(x+=size, y, size, size),  texture: this.generator.oitStage.transparencyWeight.texture });


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