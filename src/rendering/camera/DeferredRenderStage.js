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

	initDebugger: function(context) {
		this.debugger = {};

		function createQuad(x, y, width, height) {
			var vertices = [x,y,0, x,y+height,0, x+width,y+height,0, x+width,y,0];
			var quad = new TrianglesRenderBuffer(context, [0, 1, 2, 0, 2, 3]);
			quad.add('position', vertices, 3);
			quad.add("uv0", [0,0, 0,1, 1,1, 1,0], 2);
			return quad;
		}

		this.debugger.quads = [];
		this.debugger.quads.push(createQuad(-1, -1, 0.5, 0.5));
		this.debugger.quads.push(createQuad(-0.5, -1, 0.5, 0.5));
		this.debugger.quads.push(createQuad(0, -1, 0.5, 0.5));
		this.debugger.quads.push(createQuad(0.5, -1, 0.5, 0.5));
		this.debugger.sampler = new Sampler('tex0', null);
	},

	onPostRender: function(context, scene, camera) {
		this._super(context, scene, camera);

		if (this.debugActive) {
			if (!this.debugger)
				this.initDebugger(context);
			var gl = context.gl;
			gl.disable(gl.DEPTH_TEST);
			gl.disable(gl.CULL_FACE);
			var buffer = this.generator.gbufferStage.buffer;
			for (var i=0; i<4; i++) {
				this.debugger.sampler.texture = buffer.targets[i];
				this.material.bind({}, [this.debugger.sampler]);
				this.renderQuad(context, this.material.shader, this.debugger.quads[i]);
				this.material.unbind([this.debugger.sampler]);
			}
		}
	},
});