/**
 * Soft shadows render stage for deferred renderer
 */
var SoftShadowsRenderStage = RenderStage.extend({
	init: function() {
		this._super();
		this.quality = 1.0;
		this.damaged = false;

		this.sharedUniforms = {
			'cameraPosition': new UniformVec3(vec3.create()),
			'shadowOnly': new UniformInt(1),
			'useSoftShadows': new UniformInt(0)
		};
		this.sharedSamplers = [];
		this.clearColor = new Color(0.0, 0.0, 0.0, 0.0);
		this.target = null;
	},

	setQuality: function(quality) {
		quality = parseFloat(quality);
		if (quality>0.0) {
			this.quality = quality;
			this.damaged = true;
		}
	},

	getShadowCastingLights: function(scene) {
		var directional = [];
		for (var i=0; i<scene.lights.length; i++) {
			var light = scene.lights[i];
			if (!light.enabled)
				continue;
			if (!light.shadowCasting)
				continue;
			if (!light.geometry)
				continue;
			if (light instanceof DirectionalLight) {
				directional.push(light);
			}
		}
		return directional;
	},

	onStart: function(context, engine, camera) {
		var gb = this.parent.gbufferStage.buffer;
		this.sharedSamplers.push(new Sampler('gb0', gb.targets[0]));
		this.sharedSamplers.push(new Sampler('gb1', gb.targets[1]));
		this.sharedSamplers.push(new Sampler('gb2', gb.targets[2]));
		this.sharedSamplers.push(new Sampler('gb3', gb.targets[3]));

		this.target = new TargetTexture(this.parent.size, context, false);
		this.blurTarget = new TargetTexture(this.parent.size, context, false);
		this.blurSampler = new Sampler('src', this.target.texture);

		this.blurHorizontal = new Material(engine.assetsManager.addShader("shaders/default/shadow_blurh.vert", "shaders/default/shadow_blur.frag"), {},[]);
		this.blurVertical = new Material(engine.assetsManager.addShader("shaders/default/shadow_blurv.vert", "shaders/default/shadow_blur.frag"), {},[]);

		engine.assetsManager.load();
	},

	onPreRender: function(context, scene, camera) {
		if (this.damaged) {
			var size = vec2.scale(vec2.create(), this.parent.size, this.quality);
			this.target.setSize(size[0], size[1]);
			this.blurTarget.setSize(size[0], size[1]);
			this.damaged = false;
		}
	},

	onPostRender: function(context, scene, camera) {
		var lights = this.getShadowCastingLights(scene);
		if (lights.length == 0)
			return;

		camera.getPosition(this.sharedUniforms.cameraPosition.value);

		var gl = context.gl;
		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);
		gl.blendEquation(gl.FUNC_ADD);
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.enable(gl.BLEND);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);

		this.target.bind(context, false, this.clearColor);
		for (var i=0; i<lights.length; i++) {
			this.renderLight(context, lights[i]);
		}
		this.target.unbind(context);

		gl.disable(gl.BLEND);

		// H-blur
		this.blurSampler.texture = this.target.texture;
		this.blurTarget.bind(context, false, this.clearColor);
		this.parent.parent.renderEffect(context, this.blurHorizontal, this.blurSampler);
		this.blurTarget.unbind(context);

		// V-blur
		this.blurSampler.texture = this.blurTarget.texture;
		this.target.bind(context, false, this.clearColor);
		this.parent.parent.renderEffect(context, this.blurVertical, this.blurSampler);
		this.target.unbind(context);
	},

	renderLight: function(context, light) {
		var material = light.material;
		var shader = material.shader;
		shader.use();
		shader.bindUniforms(this.parent.sharedUniforms);
		shader.bindUniforms(this.sharedUniforms);
		shader.bindUniforms(material.uniforms);

		var samplers;
		if (material.samplers.length>0) {
			samplers = material.samplers.concat(this.sharedSamplers);
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