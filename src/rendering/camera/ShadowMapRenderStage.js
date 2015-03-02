/** Render-stage used for generating a depth map from the first shadow-casting light's point of view */
var ShadowMapRenderStage=RenderStage.extend({
	init: function(size) {
		this._super();

		this.size = 2048;
		if (size)
			this.size = size;

		this.target = false; // Will be replaced by TargetTexture once we receive context
		this.shadowSampler=false; // Will be replaced by Sampler once we receive context
		this.material=false; // Will be replaced by Shader once we receive context
		this.lightView = mat4.create();
		this.lightProj = mat4.create();
		this.active=false;
		this.blurEnabled = false;

		// internal cache
		this.lightPosition=vec3.create();
		this.blurProj=mat4.create();
		this.blurView=mat4.identity(mat4.create());
	},

	onStart: function(context, engine) {
		this.target=new TargetTexture([this.size, this.size], context, false);
		this.shadowSampler=new Sampler('shadow0', this.target.texture);
		this.blurSampler=new Sampler('tex0', this.target.texture);

		this.helperTarget=new TargetTexture([this.size, this.size], context, false);
		this.helperTargetSampler=new Sampler('tex0', this.helperTarget.texture);

		this.material=new Material(
			engine.assetsManager.addShaderSource("DepthRGBA"),
			{
				// "packingType": new UniformInt(1)
				"packingType": new UniformInt(2)
			},
			[]
		);

		this.gaussianBlurMaterial=new Material(
			engine.assetsManager.addShaderSource("GaussianBlur"),
			{
				"screenWidth": new UniformFloat(1.0),
				"screenHeight": new UniformFloat(1.0),
				"orientation": new UniformInt(0),
				"kernelSize": new UniformInt(5),
				"modelview": new UniformMat4(false),
				"projection": new UniformMat4(false)
			}, []
		);

		var vertices = [0,0,0, 0,1,0, 1,1,0, 1,0,0];
		var uvs = [0,1, 0,0, 1,0, 1,1];
		var faces = [0, 1, 2, 0, 2, 3];
		this.quad=new TrianglesRenderBuffer(context, faces);
		this.quad.add('position', vertices, 3);
		this.quad.add('texcoord2d0', uvs, 2);

		engine.assetsManager.load(function(){}); // Start loading, if not already loading
	},

	onPostRender: function(context, scene, camera) {
		this.active=false;

		if (!this.parent || !(this.parent instanceof MaterialRenderStage))
			return;

		if (!this.target || !this.material)
			return;

		var light = this.getFirstShadowCastingLight(scene);
		if (!light)
			return;

		this.renderShadows(context, scene, light);
		if (this.blurEnabled) {
			this.blurShadows(context, this.helperTarget, this.blurSampler, 0, light.shadowBlurKernelSize);
			this.blurShadows(context, this.target, this.helperTargetSampler, 1, light.shadowBlurKernelSize);
		}
		this.active=true;
	},

	getFirstShadowCastingLight: function(scene) {
		for (var i=0; i<scene.lights.length; i++) {
			if (!(scene.lights[i] instanceof DirectionalLight))
				continue;
			if (!scene.lights[i].enabled)
				continue;
			if (scene.lights[i].shadowCasting===true)
				return scene.lights[i];
		}
		return false;
	},

	getSceneBounds: function(scene) {
		var bounds = new BoundingSphere();
		scene.root.onEachChild(function(subnode) {
			var meshRenderer = subnode.getComponent(MeshRendererComponent);
			if (meshRenderer && meshRenderer.enabled && meshRenderer.castShadows)
				bounds.encapsulateSphere(meshRenderer.getBoundingSphere());
		});
		return bounds;
	},

	renderShadows: function(context, scene, light) {
		var bounds = this.getSceneBounds(scene);
		mat4.ortho(this.lightProj, -bounds.radius, bounds.radius, -bounds.radius, bounds.radius, 0.1, bounds.radius*2.0);
		vec3.scale(this.lightPosition, light.direction, bounds.radius);
		mat4.lookAt(this.lightView, this.lightPosition, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

		this.target.bind(context);
		var gl = context.gl;

		gl.depthMask(true);
		gl.clearDepth(1.0);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


		context.projection.push();
		context.projection.load(this.lightProj);
		context.modelview.push();
		context.modelview.load(this.lightView);

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);

		this.material.bind();

		// gl.cullFace(gl.BACK);
		// gl.cullFace(gl.FRONT);
		// gl.enable(gl.CULL_FACE);
		for (var i in this.parent.solidRenderers) {
			if ((this.parent.solidRenderers[i].layer & light.shadowMask) &&
				this.parent.solidRenderers[i].visible &&
				this.parent.solidRenderers[i].castShadows) {

				context.modelview.push();
				context.modelview.multiply(this.parent.solidRenderers[i].matrix);

				this.parent.solidRenderers[i].renderGeometry(context, this.material.shader);

				context.modelview.pop();
			}
		}
		// gl.disable(gl.CULL_FACE);

		// for (var i in this.parent.transparentRenderers) {
		// 	if ((this.parent.transparentRenderers[i].layer & light.shadowMask) &&
		// 		this.parent.transparentRenderers[i].visible &&
		// 		this.parent.transparentRenderers[i].castShadows) {
		// 		context.modelview.push();
		// 		context.modelview.multiply(this.parent.transparentRenderers[i].matrix);
		// 		this.parent.transparentRenderers[i].renderGeometry(context, this.material.shader);
		// 		context.modelview.pop();
		// 	}
		// }

		this.material.unbind();

		gl.depthMask(true);
		gl.disable(gl.DEPTH_TEST);

		context.modelview.pop();
		context.projection.pop();

		this.target.unbind(context);
	},

	blurShadows: function(context, target, source, orientation, kernelSize) {
		this.gaussianBlurMaterial.shader.use();
		if (!this.gaussianBlurMaterial.shader.linked)
			return;

		var gl = context.gl;
		var size = target.getSize();
		mat4.ortho(this.blurProj, 0, size[0], size[1], 0, -10, 10);
		this.gaussianBlurMaterial.uniforms["screenWidth"].value=size[0];
		this.gaussianBlurMaterial.uniforms["screenHeight"].value=size[1];
		this.gaussianBlurMaterial.uniforms["orientation"].value=orientation;
		this.gaussianBlurMaterial.uniforms["kernelSize"].value=kernelSize;

		context.projection.push();
		context.projection.load(this.blurProj);
		context.modelview.push();
		context.modelview.load(this.blurView);

		target.bind(context);
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		this.gaussianBlurMaterial.uniforms['modelview'].value=context.modelview.top();
		this.gaussianBlurMaterial.uniforms['projection'].value=context.projection.top();
		this.gaussianBlurMaterial.bind({}, [source]);
		var shader = this.gaussianBlurMaterial.shader;
		var locations=[];
		for(var bufferName in this.quad.buffers) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.quad.buffers[bufferName]);
			var bufferLocation = shader.getAttribLocation(bufferName);
			if (bufferLocation==-1)
				continue;

			gl.enableVertexAttribArray(bufferLocation);
			locations.push(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.quad.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
		}
		this.quad.drawElements();
		for (var i in locations)
			gl.disableVertexAttribArray(locations[i]);
		this.gaussianBlurMaterial.unbind();

		target.unbind(context);

		context.modelview.pop();
		context.projection.pop();
	}
});