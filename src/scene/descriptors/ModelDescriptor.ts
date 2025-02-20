import Descriptor from 'scene/descriptors/Descriptor';

/** Model descriptor is used for describing model source path */
class ModelDescriptor extends Descriptor {
	constructor(public source = '', public format = 'auto') {
		super();
	}

	/**
	 *
	 */
	getFormat() {
		if (this.format === 'auto') {
			if (this.source.endsWith('.data')) {
				// Legacy
				return 'binary';
			}

			return this.source.split('.').pop() ?? 'binary';
		}

		return this.format;
	}

	/**
	 *
	 */
	override type(): any {
		return 'ModelDescriptor';
	}
}

globalThis.ModelDescriptor = ModelDescriptor;
export default ModelDescriptor;
