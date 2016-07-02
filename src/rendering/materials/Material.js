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

		this.boundSamplers = new Array();
		this.numBoundSamplers = 0;
	},

	type: function() {
		return "Material";
	},

	internalBindSampler: function(sampler) {
		this.boundSamplers[this.numBoundSamplers++] = sampler;
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
				this.internalBindSampler(this.shader.context.engine.WhiteTextureSampler);
		}
		else {
			if (samplers) {
				for (var i=0; i<samplers.length; ++i)
					this.internalBindSampler(samplers[i]);
			}

			for (var i=0; i<this.samplers.length; ++i)
				this.internalBindSampler(this.samplers[i]);
		}

		this.shader.bindSamplers(this.boundSamplers);
	},

	/** Unbinds material
		@param samplers Optional extra samplers to go with the material (the same that were passed to bind()) */
	unbind: function(samplers) {
		if (!this.shader)
			return;

		this.shader.unbindSamplers(this.boundSamplers);

		for (var i=0; i<this.boundSamplers.length; ++i) {
			this.boundSamplers[i] = null;
		}
		this.numBoundSamplers = 0;
	},

	instantiate: function() {
		var uniforms = {};
		for (var i in this.uniforms) {
			uniforms[i] = this.uniforms[i].clone();
		}

		var samplers = [];
		for (var i in this.samplers) {
			if(typeof this.samplers[i] == "object")
				samplers.push(this.samplers[i].clone());
		}

		var copy = new Material(this.shader, uniforms, samplers, this.descriptor);
		copy.name = this.name+" (instance)";
		return copy;
	}
});
