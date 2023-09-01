import Serializable from 'scene/Serializable.js'

/** Class that should be used in components when uninitialized objects are desired and to enable
	dragging values to serializable object variables for components in editor. */

class TypeReference extends Serializable {
	valueType: any;
	value: any;

	/** Constructor */
	constructor(type, value?) {
		super();
		this.valueType=type;
		this.value=value;
	}

	type(): any {
		return "TypeReference";
	}

	isNull() {
		return !this.value;
	}

}

globalThis.TypeReference = TypeReference;

export default TypeReference;
