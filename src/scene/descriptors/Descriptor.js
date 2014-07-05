/** Descriptor is a class that is used to describe a resource and all its sub-resources. */
var Descriptor=Serializable.extend({
	init: function() {
		this._super();
		this.source = '';
		this.parentDescriptor=false; //< Parent resource descriptor, if any
	},

	/** Descriptors should include all fields */
	included: function() {
		return true;
	},

	excluded: function() {
		return this._super().concat(['parentDescriptor']);
	},

	type: function() {
		return "Descriptor";
	},

	/** Checks if this descriptor is equal to another */
	equals: function(other) {
		if (this.type() != other.type()) return false;
		if (this.getFullPath() != other.getFullPath()) return false;
		if (this.parentDescriptor && other.parentDescriptor) {
			if(!this.parentDescriptor.equals(other.parentDescriptor)) return false;
		}
		else if(this.parentDescriptor!=other.parentDescriptor) return false;
		return true;
	},

	getCurrentRelativeDirectory: function() {
		if (this.source.length==0)
			return '';
		return this.source.substring(0, this.source.lastIndexOf('/') + 1);
	},

	getCurrentDirectory: function() {
		var path = '';
		if (this.parentDescriptor)
			path = this.parentDescriptor.getCurrentDirectory();
		return path + this.getCurrentRelativeDirectory();
	},

	getParentDirectory: function() {
		if (this.parentDescriptor)
			return this.parentDescriptor.getCurrentDirectory();
		return '';
	},

	getFullPath: function() {
		var path = this.getParentDirectory() + this.source;
		return path;
	}
});