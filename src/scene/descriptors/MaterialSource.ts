import Descriptor from 'scene/descriptors/Descriptor.js'
import MaterialSourceDescriptor from 'scene/descriptors/MaterialSourceDescriptor.js'

/** Material source combines material descriptor and material itself. 
	It is used for loading materials via MaterialSourcesManager. */

class MaterialSource extends Descriptor {
	material: any;
	sourceDescriptor: any;
	
	/** Constructor. If source is not given a new texture is created with given width and height.
		@param sourceDescriptor Instance of MaterialSourceDescriptor */
	constructor(sourceDescriptor) {
		super();
		this.material=false;
		this.sourceDescriptor=sourceDescriptor;	// Source descriptor
	}
	
	type(): any {
		return "MaterialSource";
	}
	
	equals(other) {
		return false;
	}

}

globalThis.MaterialSource = MaterialSource;

export default MaterialSource;