/**
 * Deferred shading light accumulation pass
 */
var LightsRenderStage = RenderStage.extend({
	init: function() {
		this._super();

		this.sharedUniforms = {
			'cameraPosition': new UniformVec3(vec3.create()),
			'shadowOnly': new UniformInt(0),
			'useSoftShadows': new UniformInt(1)
		};
		this.sharedSamplers = [];

		this.skyboxRenderStage = new SkyboxRenderStage();
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

		this.backgroundMaterial = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_background"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_background')),
			{
				'color': new UniformColor(new Color(1.0, 1.0, 1.0, 1.0))
			},
			[]
		);

		engine.assetsManager.load();

		this.skyboxRenderStage.start(context, engine, camera);
	},

	onPreRender: function(context, scene, camera) {
		this.sharedUniforms.useSoftShadows.value = this.parent.softShadowsStage.enabled ? 1 : 0;
		camera.getPosition(this.sharedUniforms.cameraPosition.value);
	},

	onPostRender: function(context, scene, camera) {
		var lights = this.getLightsWithGeometry(scene);
		var gl = context.gl;

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbufferStage.buffer.depth);

		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0x00);

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
		camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
		this.parent.parent.renderEffect(context, this.backgroundMaterial, this.sharedSamplers[1]);
		this.skyboxRenderStage.render(context, scene, camera);

		gl.stencilFunc(gl.EQUAL, 1, 0xFF);
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.enable(gl.BLEND);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);
		for (var i=0; i<lights.length; i++) {
			this.renderLight(context, lights[i]);
		}
		gl.disable(gl.BLEND);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);
	},

	renderLight: function(context, light) {
		var shadowSampler;
		if (light.shadowCasting) {
			if (light instanceof DirectionalLight && this.sharedUniforms.useSoftShadows.value == 1) {
				shadowSampler = light.shadowSampler.texture;
				light.shadowSampler.texture = this.parent.softShadowsStage.target.texture;
			}
		}

		var shader = light.material.shader;
		shader.use();
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
			}

			renderers[j].renderGeometry(context, shader);

			context.modelview.pop();
		}

		shader.unbindSamplers(samplers);

		if (light.shadowCasting) {
			if (light instanceof DirectionalLight && this.sharedUniforms.useSoftShadows.value == 1) {
				light.shadowSampler.texture = shadowSampler;
			}
		}
	}
});
