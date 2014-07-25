/** Material definition */
var Material=Serializable.extend({
	/** Constructor
		@param shader Shader that will be used
		@param uniforms Shader uniforms as object described in Shader.use
		@param samplers Shader samplers as array described in Shader.bindSamplers/unbindSamplers
		@param descriptor MaterialDescriptor instance [optional] */
	init: function(shader, uniforms, samplers, descriptor) {
		this._super();
		this.name = 'Unnamed';
		this.shader = shader; ///< Instance of Shader
		this.uniforms = uniforms; ///< Shader uniforms as described by Shader
		this.samplers = samplers; ///< Shader samplers list
		this.descriptor = descriptor;
	},

	type: function() {
		return "Material";
	},

	/** Binds material
		@param uniforms Optional extra uniforms to go with the material
		@param samplers Optional extra samplers to go with the material */
	bind: function(uniforms, samplers) {
		if (!this.shader) return;

		this.shader.use(this.uniforms);
		if (uniforms)
			this.shader.bindUniforms(uniforms);

		if ((!this.samplers || this.samplers.length == 0) && (!samplers || samplers.length == 0)) {
			if (this.shader.context.engine)
				this.shader.bindSamplers([this.shader.context.engine.WhiteTextureSampler]);
		}
		else {
			if (samplers)
				this.shader.bindSamplers(this.samplers.concat(samplers));
			else
				this.shader.bindSamplers(this.samplers);
		}
	},

	/** Unbinds material
		@param samplers Optional extra samplers to go with the material (the same that were passed to bind()) */
	unbind: function(samplers) {
		if(!this.shader) return;

		if ((!this.samplers || this.samplers.length == 0) && (!samplers || samplers.length == 0)) {
			if (this.shader.context.engine)
				this.shader.unbindSamplers([this.shader.context.engine.WhiteTextureSampler]);
		}
		else {
			if (samplers)
				this.shader.unbindSamplers(this.samplers.concat(samplers));
			else
				this.shader.unbindSamplers(this.samplers);
		}
	},

	instantiate: function() {
		var uniforms={};
		for(var u in this.uniforms) {
			uniforms[u]=this.uniforms[i].clone();
		}

		var samplers=[];
		for(var s in this.samplers) {
			samplers.push(this.samplers[s].clone());
		}

		var copy=new Material(this.shader, uniforms, samplers, this.descriptor);
		copy.name=this.name+" (instance)";
		return copy;
	}
});