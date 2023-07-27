import Descriptor from 'scene/descriptors/Descriptor.js'

/** Shader descriptor is used for describing shader sources */

class ShaderDescriptor extends Descriptor {
	vertexSource: any;
	fragmentSource: any;
	definitions: any;

	/** Constructor. If fragmentSource is not given then vertexOrUnifiedSource will be
		used to construct paths to both vertex and fragment program by appending .vert and .frag respectively.
		@param vertexOrUnifiedSource Vertex program path or path to both vertex and fragment
		                             programs (omit extension), if fragmentSource is not given
		@param fragmentSource Fragment program path [optional] */
	constructor(vertexOrUnifiedSource, fragmentSource, definitions?) {
		super();
		if(!fragmentSource) {
			this.vertexSource=vertexOrUnifiedSource+".vert";
			this.fragmentSource=vertexOrUnifiedSource+".frag";
		}
		else {
			this.vertexSource=vertexOrUnifiedSource;
			this.fragmentSource=fragmentSource;
		}

		this.definitions = [];

		if (definitions) {
			this.definitions = definitions;
		}
	}

	type(): any {
		return "ShaderDescriptor";
	}

	equals(other): any {
		if(!super.equals(other)) return false;
		return this.vertexSource==other.vertexSource && this.fragmentSource==other.fragmentSource && this.definitions == other.definitions;
	}

	getVertexShaderPath(): any {
		var path = this.getParentDirectory() + this.vertexSource;
		return path;
	}

	getFragmentShaderPath() {
		var path = this.getParentDirectory() + this.fragmentSource;
		return path;
	}

}

globalThis.ShaderDescriptor = ShaderDescriptor;

export default ShaderDescriptor;
