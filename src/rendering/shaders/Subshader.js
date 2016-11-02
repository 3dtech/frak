/** Subshader is the baseclass that keeps the code that can be linked to shader program later.
	Use VertexShader and FragmentShader to create appropriate types of shaders for ShaderProgram. */
var Subshader=FrakClass.extend({
	init: function(shader, code, type) {
		this.shader=shader;
		this.context=shader.context;
		this.code=code;
		this.type=type;

		// Declared types
		this.VERTEX_SHADER=0;
		this.FRAGMENT_SHADER=1;

		// Created by subclass (either FragmentShader or VertexShader)
		this.compiledShader=false;
		this.failedCompilation=false;
	},

	attach: function() {
		this.context.gl.attachShader(this.shader.program, this.compiledShader);
	},

	getFilename: function() {
		return "Unknown";
	},

	/** Compiles the shader. Normally called by shader program prior to linking. */
	compile: function() {
		if(this.failedCompilation) return;	// Only try to compile one time
		if(!this.compiledShader) throw "WebGL shader has not been created. FragmentShader or VertexShader class instances should be used, not Shader.";
		this.context.gl.shaderSource(this.compiledShader, this.code);
		this.context.gl.compileShader(this.compiledShader);

		var status = this.context.gl.getShaderParameter(this.compiledShader, this.context.gl.COMPILE_STATUS);
		if (!status) {
			if(!this.failedCompilation) {
				this.failedCompilation=true;
				throw "Shader '"+this.getFilename()+"' failed to compile: "+this.context.gl.getShaderInfoLog(this.compiledShader);
			}
		}
	},

	onContextRestored: function(context) {
		this.failedCompilation = false;
		this.context = context;
		this.attach();
	}
});
