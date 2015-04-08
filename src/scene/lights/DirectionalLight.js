/**
 * Directional light (affects entire buffer)
 */
var DirectionalLight = Light.extend({
	init: function(direction, color) {
		this._super();

		this.intensity = 1.0;
		this.color = color || new Color(1.0, 1.0, 1.0, 1.0);
		this.direction = vec3.fromValues(1.0, 1.0, 1.0);
		if (direction)
			this.setLightDirection(direction);
		this.shadowResolution = vec2.fromValues(2048, 2048);
		this.shadowBias = 0.001; ///< Used to offset lightspace depth to avoid floating point errors in depth comparison

		this.geometry = null;
		this.material = null;

		this.shadow = null;
		this.lightView = mat4.create();
		this.lightProj = mat4.create();
	},

	type: function() {
		return "DirectionalLight";
	},

	/** Sets light direction. The given vector is re-normalized.
		@param direction {vec3} The new light direction. Does not have to be normalized. */
	setLightDirection: function(direction) {
		vec3.copy(this.direction, direction);
		vec3.normalize(this.direction, this.direction);
	},

	onStart: function(context, engine) {
		this._super();

		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/deferred_light_directional"),
			{
				'lightColor': new UniformColor(this.color),
				'lightIntensity': new UniformFloat(this.intensity),
				'lightDirection': new UniformVec3(vec3.create()),
				'lightView': new UniformMat4(mat4.create()),
				'lightProjection': new UniformMat4(mat4.create()),
				'useShadows': new UniformInt(0),
				'shadowBias': new UniformFloat(0.001)
			},
			[]
		);

		if (this.shadowCasting && !this.shadow) {
			this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
			this.shadowSampler = new Sampler('shadow0', this.shadow.texture);
			this.material.samplers.push(this.shadowSampler);
		}

		var mesh = new Mesh();
		var submesh = new Submesh();
		submesh.positions = [
			-1, -1, 0,
			-1, 1, 0,
			1, 1, 0,
			1, -1, 0
		];
		submesh.normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
		submesh.texCoords2D = [[
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0
		]];
		submesh.faces = [0, 1, 2, 0, 2, 3];
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, this.material);

		this.geometry = new Node("DirectionalLightGeometry");
		this.geometry.addComponent(new MeshComponent(mesh));
		this.geometry.addComponent(new MeshRendererComponent()).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	},

	onUpdate: function(engine) {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
		vec3.copy(this.material.uniforms.lightDirection.value, this.direction);
		this.material.uniforms.lightIntensity.value = this.intensity;
		this.material.uniforms.useShadows.value = this.shadowCasting ? 1 : 0;
		this.material.uniforms.shadowBias.value = this.shadowBias;

		if (this.shadowCasting) {
			if (!this.shadow) {
				this.shadow = new TargetTextureFloat(this.shadowResolution, engine.context, false);
				this.shadowSampler = new Sampler('shadow0', this.shadow.texture);
				this.material.samplers.push(this.shadowSampler);
			}

			mat4.copy(this.material.uniforms.lightView.value, this.lightView);
			mat4.copy(this.material.uniforms.lightProjection.value, this.lightProj);
		}
	},

	getGeometryRenderers: function() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}
});