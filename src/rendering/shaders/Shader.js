/**
 * Used to compile and link vertex and fragment shader to a shader program.
 */
var Shader=Serializable.extend({
	/** Constructor
		@param context Rendering context
		@param descriptor Shader source descriptor normally passed to shader by ShadersManager to make it identifiable later [optional] */
	init: function(context, descriptor) {
		if (!context) {
			throw 'Shader: RenderingContext required';
		}

		this._super();

		this.descriptor = descriptor;
		this.context = context;
		this.program = context.gl.createProgram();
		this.shaders = [];
		this.requirements = new ShaderRequirements();
		this.linked = false;
		this.failed = false;
		this.uniformLocations = {};

		this.bindings = {};

		this.definitions = [];
	},

	excluded: function() {
		return true;
	},

	included: function() {
		return ['descriptor'];
	},

	/** Creates a fragment shader from given code and adds it to this shader program
		@param code Shader code */
	addVertexShader: function(code) {
		var shader=new VertexShader(this, code);

		this.addShader(shader);
	},

	/** Creates a fragment shader from given code and adds it to this shader program
		@param code Shader code */
	addFragmentShader: function(code) {
		var shader=new FragmentShader(this, code);

		this.addShader(shader);
	},

	/** Adds a shader
		@param shader Instance of VertexShader or FragmentShader */
	addShader: function(shader) {
		this.shaders.push(shader);
		shader.attach();
	},

	/** Compiles and links the shader program */
	link: function() {
		if (this.failed) {
			return;
		}

		for (var i=0; i<this.shaders.length; i++) {
			this.shaders[i].compile(this.context, this.definitions);
		}

		for (var name in ExplicitAttributeLocations) {
			this.context.gl.bindAttribLocation(this.program, ExplicitAttributeLocations[name], name);
		}

		this.uniformLocations = {};
		this.linked = true;
		this.context.gl.linkProgram(this.program);
		var status = this.context.gl.getProgramParameter(this.program, this.context.gl.LINK_STATUS);
		if (!status) {
			console.error('Shader linking failed: ', this.context.gl.getProgramInfoLog(this.program));
			this.linked = false;
			this.failed = true;

			return;
		}

		// if supported, map standard binding blocks immediately
		if (this.context.isWebGL2()) {
			this.updateBlockBindings(this.context);
		}
	},

	/** Uses the shader program. Links automatically, if not linked
		@param uniforms Object of named uniform variables (all values must be instances of Uniform)
		                that will be passed to shader [optional] */
	use: function(uniforms) {
		if(this.failed) return;

		if(this.shaders.length<2) return;	// Don't try to use, there are not enough added subshaders (ie vertex and fragment)

		if(!this.linked) this.link();

		if(!this.linked) return;
		this.context.gl.useProgram(this.program);
		this.bindUniforms(uniforms);
	},

	getAttribLocation: function(bufferName) {
		if (bufferName in ExplicitAttributeLocations) {
			return ExplicitAttributeLocations[bufferName];
		}

		return this.context.gl.getAttribLocation(this.program, bufferName);
	},

	getUniformLocation: function(uniformName) {
		if (!(uniformName in this.uniformLocations)) {
			this.uniformLocations[uniformName] = this.context.gl.getUniformLocation(this.program, uniformName);
		}

		return this.uniformLocations[uniformName];
	},

	/** Binds uniform variables to this shader.
		This method is called by Shader.use, if uniforms are passed to it, but it can be called separately
		as well during batching.
		@param uniforms Uniform variables that will be passed to shader
	*/
	bindUniforms: function(uniforms) {
		if (!uniforms) {
			return;
		}

		if (!this.linked) {
			return;
		}

		for (var uniformName in uniforms) {
			var uniformLocation = this.getUniformLocation(uniformName);

			if (!uniformLocation || uniformLocation == -1) {
				continue;
			}

			var uniform = uniforms[uniformName];
			if (!uniform) {
				throw 'Uniform \''+uniformName+'\' is undefined.';
			}

			uniform.bind(this.context, uniformLocation);
		}
	},

	/** Binds all texture samplers.
		@param samplers Array of named texture samplers (values must be instances
		                of of Sampler). Eg [new Sampler("texture1", texture)] */
	bindSamplers: function(samplers) {
		if (!samplers || samplers.length == 0 || !this.linked) {
			return;
		}

		var gl = this.context.gl;
		var slotIndex = 0;
		for (var i = 0; i < samplers.length; ++i) {
			var sampler = samplers[i];
			if (!sampler) {
				break;
			}

			var uniformLocation = this.getUniformLocation(sampler.name);
			if (uniformLocation == -1) {
				continue;
			}

			sampler.bind(this.context, uniformLocation, slotIndex);
			slotIndex++;
		}

		gl.activeTexture(gl.TEXTURE0);
	},

	/** Unbinds all texture samplers.
		@param samplers Array of named texture samplers (values must be instances
		                of of Sampler). Eg [new Sampler("texture1", texture)] */
	unbindSamplers: function(samplers) {
		if (!samplers || samplers.length == 0 || !this.linked) {
			return;
		}

		var gl = this.context.gl;
		var slotIndex = 0;
		for (var i = 0; i < samplers.length; ++i) {
			var sampler = samplers[i];
			if (!sampler) {
				break;
			}

			var uniformLocation = this.getUniformLocation(sampler.name);
			if(uniformLocation == -1) {
				continue;
			}

			sampler.unbind(this.context, uniformLocation, slotIndex);
			slotIndex++;
		}

		gl.activeTexture(gl.TEXTURE0);
	},

	onContextRestored: function(context) {
		this.context = context;
		this.program = context.gl.createProgram();
		this.uniformLocations = {};
		this.failed = false;
		this.linked = false;

		for (var i=0; i<this.shaders.length; ++i) {
			this.shaders[i].onContextRestored(context);
		}

		this.link();
	},

	updateBlockBindings: function(context) {
		var blocks = [
			'Transform',
			'Material'
		];

		this.bindings = {};

		for (var i = 0; i < blocks.length; ++i) {
			var bindingPoint = i + 1;
			var blockName = blocks[i];
			var blockIndex = context.gl.getUniformBlockIndex(this.program, blockName);
			if (blockIndex == context.gl.INVALID_INDEX) {
				continue;
			}

			this.bindings[blockName] = {
				index: blockIndex,
				name: blockName,
				bindingPoint: bindingPoint
			};
		}
	}
});
