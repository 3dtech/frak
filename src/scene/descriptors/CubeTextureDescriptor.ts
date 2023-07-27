import Descriptor from 'scene/descriptors/Descriptor.js'

/**
 * Cube texture descriptor is used for describing cubemap texture sources
 */

class CubeTextureDescriptor extends Descriptor {
	sources: any;
	source: any;

	/** Constructor. */
	constructor(sources?) {
		super();
		this.sources = sources || [];
	}

	type(): any {
		return "CubeTextureDescriptor";
	}

	equals(other): any {
		if(!super.equals(other))
			return false;
		if (this.sources.length != other.sources.length)
			return false;
		for (var i=0; i<this.sources.length; i++)
			if (this.sources[i] != other.sources[i])
				return false;
		return true;
	}

	getFaceFullPath(index) {
		if (index<0 || index>this.sources.length)
			throw "CubeTextureDescriptor.getFaceFullPath: index out of bounds";

		// FIXME: this is not the prettiest construction ever
		this.source = this.sources[index];
		var path = this.getFullPath();
		this.source = '';
		return path;
	}

}

globalThis.CubeTextureDescriptor = CubeTextureDescriptor;

export default CubeTextureDescriptor;
