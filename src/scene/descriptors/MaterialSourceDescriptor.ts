import Descriptor from 'scene/descriptors/Descriptor.js'
import Material from 'rendering/materials/Material.js'

/** Material source descriptor is used to keep material source
	that can be loaded with MaterialSourceManager. It loads material
	source from given source path and then goes on to load sources
	necessary to load the material fully */

class MaterialSourceDescriptor extends Descriptor {
	source: any;
	
	/** Constructor.
		@param source Material source path
		*/
	constructor(source) {
		super();
		this.source=source;
	}

	type(): any {
		return "MaterialSourceDescriptor";
	}

	equals(other) {
		return this.source==other.source;
	}

}

globalThis.MaterialSourceDescriptor = MaterialSourceDescriptor;

export default MaterialSourceDescriptor;