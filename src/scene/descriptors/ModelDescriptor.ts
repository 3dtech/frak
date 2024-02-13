import Descriptor from 'scene/descriptors/Descriptor';

/** Model descriptor is used for describing model source path */
class ModelDescriptor extends Descriptor {
	format: any;

	constructor(source?, format?) {
		super();
		this.source = source;
		this.format = format || 'auto';
	}

	type(): any {
		return "ModelDescriptor";
	}

	getFormat() {
		if (this.format == 'auto') {
			if (this.source.endsWith('.data'))
				return 'binary';
			if (this.source.endsWith('.json'))
				return 'json';
			if (this.source.endsWith('.gltf'))
				return 'gltf';
			if (this.source.endsWith('.glb'))
				return 'glb';
			return 'binary';
		}
		return this.format;
	}

	isJSON() {
		const format = this.getFormat();

		return format === 'json' || format === 'gltf';
	}
}

globalThis.ModelDescriptor = ModelDescriptor;
export default ModelDescriptor;
