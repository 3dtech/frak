/** Shader descriptor is used for describing shader sources */
var ShaderDescriptor=Descriptor.extend({
	/** Constructor. If fragmentSource is not given then vertexOrUnifiedSource will be
		used to construct paths to both vertex and fragment program by appending .vert and .frag respectively.
		@param vertexOrUnifiedSource Vertex program path or path to both vertex and fragment
		                             programs (omit extension), if fragmentSource is not given
		@param fragmentSource Fragment program path [optional] */
	init: function(vertexOrUnifiedSource, fragmentSource) {
		this._super();
		if(!fragmentSource) {
			this.vertexSource=vertexOrUnifiedSource+".vert";
			this.fragmentSource=vertexOrUnifiedSource+".frag";
		}
		else {
			this.vertexSource=vertexOrUnifiedSource;
			this.fragmentSource=fragmentSource;
		}
	},

	type: function() {
		return "ShaderDescriptor";
	},

	equals: function(other) {
		if(!this._super(other)) return false;
		return this.vertexSource==other.vertexSource && this.fragmentSource==other.fragmentSource;
	},

	getVertexShaderPath: function() {
		var path = this.getParentDirectory() + this.vertexSource;
		return path;
	},

	getFragmentShaderPath: function() {
		var path = this.getParentDirectory() + this.fragmentSource;
		return path;
	}
});