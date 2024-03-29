import Descriptor from 'scene/descriptors/Descriptor';

/** Text descriptor is used for describing text sources */
class TextDescriptor extends Descriptor {
	/** Constructor
		@param source Path to text */
	constructor(source) {
		super();
		this.source=source;
	}

	type(): any {
		return "TextDescriptor";
	}

	equals(other) {
		if(!super.equals(other)) return false;
		return this.source==other.source;
	}
}

globalThis.TextDescriptor = TextDescriptor;
export default TextDescriptor;
