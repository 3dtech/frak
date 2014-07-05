/** Model descriptor is used for describing model source path */
var ModelDescriptor=Descriptor.extend({
	init: function(source, noCollisionTree) {
		this._super();
		this.source=source;
		this.noCollisionTree=noCollisionTree;
		this.texturesFromPath=true;							//< Loads model textures from model path instead of using current directory (ie typically index.html location)
	},

	type: function() {
		return "ModelDescriptor";
	},

	equals: function(other) {
		if(!this._super(other)) return false;
		return this.source==other.source && this.noCollisionTree==other.noCollisionTree && this.texturesFromPath==other.texturesFromPath;
	}
});