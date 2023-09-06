import Descriptor from 'scene/descriptors/Descriptor';

/** Texture descriptor is used for describing texture sources */

class TextureDescriptor extends Descriptor {
	_source: any;
	width: any;
	height: any;
	locked: any;

	/** Constructor. If source is not given a new texture is created with given width and height.
		@param source Path to texture [optional]
		@param width Width of texture. If given and loaded texture has different width, it will be resized [optional]
		@param height Height of texture. If given and loaded texture has different height, it will be resized [optional]
		@param locked Whether or not to prevent modification of the source path after creation [optional] */
	constructor(source?, width?, height?, locked?) {
		super();
		this.source = source;
		this._source = source;
		this.width = width;
		this.height = height;
		this.locked = locked;
	}

	type(): any {
		return 'TextureDescriptor';
	}

	equals(other): any {
		if (!super.equals(other)) return false;
		return this.source == other.source && this.width == other.width && this.height == other.height;
	}

	getFullPath() {
		if (this.locked) {
			return this._source;
		} else {
			return super.getFullPath();
		}
	}

}

globalThis.TextureDescriptor = TextureDescriptor;

export default TextureDescriptor;
