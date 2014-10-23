/** Shader program definition.
	Usage:

	// Fetch rendering context
	var renderingContext=new RenderingContext($('#canvas'));

	// Create shader
	var shader=new Shader(renderingContext);

	// Add subshaders
	shader.addVertexShader("attribute vec3 aVertexPosition; void main(void) { gl_Position = vec4(aVertexPosition, 1.0); }");
	shader.addFragmentShader("precision mediump float; void main(void) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }");

	// Start using the shader (it's linked automatically)
	shader.use();
*/
var Shader=Serializable.extend({
	/** Constructor
		@param context Rendering context
		@param descriptor Shader source descriptor normally passed to shader by ShadersManager to make it identifiable later [optional] */
	init: function(context, descriptor) {
		this._super();
		if(!context) throw "RenderingContext not passed to canvas";
		this.descriptor=descriptor;
		this.context=context;
		this.program=context.gl.createProgram();
		this.shaders=[];
		this.requirements=new ShaderRequirements();
		this.linked=false;
		this.failed=false;
		this.uniformLocations={};

		this.explicitLocations = {
			'position': 0,
			'normal': 1,
			'texcoord2d0': 2,
			'tangent': 3,
			'bitangent': 4
		};
	},

	excluded: function() {
		return true;
	},

	included: function() {
		return ["descriptor"];
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
		if (this.failed)
			return;

		for (var i=0; i<this.shaders.length; i++) {
			this.shaders[i].compile(this.context);
		}

		for (var name in this.explicitLocations) {
			this.context.gl.bindAttribLocation(this.program, this.explicitLocations[name], name);
		}

		this.uniformLocations={};
		this.linked=true;
		this.context.gl.linkProgram(this.program);
		if (!this.context.gl.getProgramParameter(this.program, this.context.gl.LINK_STATUS)) {
			this.linked=false;
			this.failed=true;
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
		if (bufferName in this.explicitLocations) {
			return this.explicitLocations[bufferName];
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
		if(!uniforms) return;
		if(!this.linked) return;
		for(var uniformName in uniforms) {
			var uniformLocation=this.getUniformLocation(uniformName);

			if(!uniformLocation || uniformLocation==-1) continue;
			var uniform=uniforms[uniformName];
			if(!uniform) throw "Uniform '"+uniformName+"' is undefined.";
			uniform.bind(this.context, uniformLocation);
		}
	},

	/** Binds all texture samplers.
		@param samplers Array of named texture samplers (values must be instances
		                of of Sampler). Eg [new Sampler("texture1", texture)] */
	bindSamplers: function(samplers) {
		if(!samplers || samplers.length==0) return;
		if(!this.linked) return;

		var gl=this.context.gl;
		var slotIndex=0;
		for (var i=0; i<samplers.length; i++) {
			var sampler=samplers[i];

			var uniformLocation=this.getUniformLocation(sampler.name);
			if(uniformLocation==-1) continue;
			sampler.bind(this.context, uniformLocation, slotIndex);
			slotIndex++;
		}
		gl.activeTexture(gl.TEXTURE0);
	},

	/** Unbinds all texture samplers.
		@param samplers Array of named texture samplers (values must be instances
		                of of Sampler). Eg [new Sampler("texture1", texture)] */
	unbindSamplers: function(samplers) {
		if(!samplers || samplers.length==0) return;
		if(!this.linked) return;
		var gl=this.context.gl;
		var slotIndex=0;
		for (var i=0; i<samplers.length; i++) {
			var sampler=samplers[i];
			var uniformLocation=this.getUniformLocation(sampler.name);
			if(uniformLocation==-1) continue;
			sampler.unbind(this.context, uniformLocation, slotIndex);
			slotIndex++;
		}
		gl.activeTexture(gl.TEXTURE0);
	}
});