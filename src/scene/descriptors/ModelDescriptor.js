/** Model descriptor is used for describing model source path */
var ModelDescriptor=Descriptor.extend({
	init: function(source, format) {
		this._super();
		this.source = source;
		this.format = format || 'auto';
	},

	type: function() {
		return "ModelDescriptor";
	},

	getFormat: function() {
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
});
