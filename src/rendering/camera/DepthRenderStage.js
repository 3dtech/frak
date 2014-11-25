/**
 * Renders scene depth to a texture
 */
var DepthRenderStage = RenderStage.extend({
	init: function(size) {
		this._super();
		this.target = null;
		this.sampler = new Sampler('depth0', null);
		this.size = vec2.fromValues(1024, 1024);
		if (size)
			vec2.copy(this.size, size);
	},

	onStart: function(context, engine) {
		try {
			this.target = new TargetTextureFloat(this.size, context, false);
			this.sampler.texture = this.target.texture;
		}
		catch (e) {
			console.warn('DepthRenderStage: ', e);
			this.disable();
			return;
		}

		this.material=new Material(
			engine.assetsManager.addShaderSource("shaders/default/depth"),
			{
				'zNear': new UniformFloat(0.1),
				'zFar': new UniformFloat(1000.0)
			},
			[]
		);
	},

	onPreRender: function(context, scene, camera) {
		if (camera.target.size[0] != this.size[0] || camera.target.size[1] != this.size[1]) {
			var size = camera.target.size;
			vec2.copy(this.size, size);
			this.target.setSize(size[0], size[1]);
		}
	},

	onPostRender: function(context, scene, camera) {
		this.material.uniforms.zNear.value = camera.near;
		this.material.uniforms.zFar.value = camera.far;

		this.target.bind(context);

		var gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);
		this.material.bind();

		// Render opaque geometry
		var renderers = this.parent.solidRenderers;
		for (var i=0; i<renderers.length; ++i) {
			context.modelview.push();
			context.modelview.multiply(renderers[i].matrix);
			renderers[i].renderGeometry(context, this.material.shader);
			context.modelview.pop();
		}

		// Render alpha mapped portions of opaque geometry
		this.parent.oitStage.renderAlphaMapped(context, scene, camera);

		this.material.unbind();
		gl.disable(gl.DEPTH_TEST);

		this.target.unbind(context);
	}

});