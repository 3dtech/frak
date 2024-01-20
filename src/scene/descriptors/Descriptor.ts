import Serializable from 'scene/Serializable';

/** Descriptor is a class that is used to describe a resource and all its sub-resources. */
class Descriptor extends Serializable {
	source: String;
	parentDescriptor: any;

	constructor() {
		super();
		this.source = '';
		this.parentDescriptor = false; //< Parent resource descriptor, if any
	}

	/** Descriptors should include all fields */
	included(): any {
		return true;
	}

	excluded(): string[] {
		return (super.excluded() as string[]).concat(['parentDescriptor']);
	}

	type(): any {
		return "Descriptor";
	}

	/** Checks if this descriptor is equal to another */
	equals(other): any {
		if (this.type() != other.type()) return false;
		if (this.getFullPath() != other.getFullPath()) return false;
		if (this.parentDescriptor && other.parentDescriptor) {
			if(!this.parentDescriptor.equals(other.parentDescriptor)) return false;
		}
		else if(this.parentDescriptor!=other.parentDescriptor) return false;
		return true;
	}

	getCurrentRelativeDirectory(): any {
		if (this.source.length==0)
			return '';
		return this.source.substring(0, this.source.lastIndexOf('/') + 1);
	}

	getCurrentDirectory(): any {
		var path = '';
		if (this.parentDescriptor)
			path = this.parentDescriptor.getCurrentDirectory();
		return path + this.getCurrentRelativeDirectory();
	}

	getParentDirectory(): any {
		if (this.parentDescriptor)
			return this.parentDescriptor.getCurrentDirectory();
		return '';
	}

	getFullPath() {
		var path = this.getParentDirectory() + this.source;
		return path;
	}
}

globalThis.Descriptor = Descriptor;
export default Descriptor;
