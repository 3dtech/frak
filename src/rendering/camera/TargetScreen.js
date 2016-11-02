var TargetScreen=RenderTarget.extend({
	init: function(size) {
		this._super(size);
		this.position = vec2.create();
	},

	type: function() {
		return 'TargetScreen';
	},

	setPosition: function(x, y) {
		this.position[0] = x;
		this.position[1] = y;
	},

	getPosition: function() {
		return this.position;
	},

	resetViewport: function() {
		this.setViewport(this.position[0], this.position[1], this.size[0], this.size[1]);
	}
});
