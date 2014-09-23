/** Font descriptor points to font text file(s) and font data  */
var FontDescriptor=Descriptor.extend({
	/** Constructor
		@param fontTexturePaths Paths to font textures as an array of  {Array}
		@param fontDataPath Path to font information (.xml file generated with Bitmap Font Generator) {string}
		@param materialSourceDescriptor Descriptor for font material [optional] {MaterialSourceDescriptor} */
	init: function(fontTexturePaths, fontDataPath, materialSourceDescriptor) {
		this._super();
		this.fontTexturePaths=fontTexturePaths;
		this.fontDataPath=fontDataPath;
		this.materialSourceDescriptor=materialSourceDescriptor;
	},

	type: function() {
		return "FontDescriptor";
	},

	equals: function(other) {
		if (!this._super(other))
			return false;
		if (this.fontTexturePaths.length != other.fontTexturePaths)
			return false;
		for (var i in this.fontTexturePaths) {
			if (this.fontTexturePaths[i] != other.fontTexturePaths[i])
				return false;
		}
		if (this.fontDataPath != other.fontDataPath)
			return false;
		if (this.materialSourceDescriptor && other.materialSourceDescriptor) {
			if (!this.materialSourceDescriptor.equals(other.materialSourceDescriptor))
				return false;
		}
		else if (this.materialSourceDescriptor != other.materialSourceDescriptor)
			return false;
		return true;
	},

	getFullTexturePaths: function() {
		var parentDirectory = this.getParentDirectory();
		var texturePaths=[];
		for(var i in this.fontTexturePaths) {
			texturePaths.push(parentDirectory + this.fontTexturePaths[i]);
		}
		return texturePaths;
	},

	getFullDataPath: function() {
		return this.getParentDirectory() + this.fontDataPath;
	}
});