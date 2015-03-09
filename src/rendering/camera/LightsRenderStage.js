/**
 * Deferred shading light accumulation pass
 */
var LightsRenderStage = RenderStage.extend({
	init: function() {
		this._super();

		this.sharedUniforms = {
			'cameraPosition': new UniformVec3(vec3.create())
		};
		this.sharedSamplers = [];
	},

	getLightsWithGeometry: function(scene) {
		var ambient = [];
		var directional = [];
		var other = [];

		for (var i=0; i<scene.lights.length; i++) {
			var light = scene.lights[i];
			if (!light.enabled)
				continue;
			if (!light.geometry)
				continue;
			if (light instanceof AmbientLight) {
				ambient.push(light);
				continue;
			}
			if (light instanceof DirectionalLight) {
				directional.push(light);
				continue;
			}
			other.push(light);
		}

		return ambient.concat(directional).concat(other);
	},

	onStart: function(context, engine, camera) {
		var gb = this.parent.gbufferStage.buffer;
		this.sharedSamplers.push(new Sampler('gb0', gb.targets[0]));
		this.sharedSamplers.push(new Sampler('gb1', gb.targets[1]));
		this.sharedSamplers.push(new Sampler('gb2', gb.targets[2]));
		this.sharedSamplers.push(new Sampler('gb3', gb.targets[3]));
	},

	onPostRender: function(context, scene, camera) {
		var gl = context.gl;
		var lights = this.getLightsWithGeometry(scene);

		camera.getPosition(this.sharedUniforms.cameraPosition.value);

		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.enable(gl.BLEND);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);

		for (var i=0; i<lights.length; i++) {
			this.renderLight(context, lights[i]);
		}

		gl.disable(gl.BLEND);
	},

	renderLight: function(context, light) {
		var shader = light.material.shader;
		shader.use();
		shader.bindUniforms(this.parent.sharedUniforms);
		shader.bindUniforms(this.sharedUniforms);
		shader.bindUniforms(light.material.uniforms);

		var samplers;
		if (light.material.samplers.length>0) {
			samplers = light.material.samplers.concat(this.sharedSamplers);
		}
		else {
			samplers = this.sharedSamplers;
		}

		shader.bindSamplers(samplers);

		var renderers = light.getGeometryRenderers();
		for (var j=0; j<renderers.length; j++) {
			context.modelview.push();

			if (light.isPositional()) {
				context.modelview.multiply(renderers[j].matrix);
				this.parent.rendererUniforms.model.value = renderers[j].matrix;
				this.parent.rendererUniforms.modelview.value = context.modelview.top();
				this.parent.rendererUniforms.modelviewInverse.value = this.parent.invModelview;
				shader.bindUniforms(this.parent.rendererUniforms);
			}

			renderers[j].renderGeometry(context, shader);

			context.modelview.pop();
		}

		shader.unbindSamplers(samplers);
	}
});