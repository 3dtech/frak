var TargetScreen=RenderTarget.extend({
	init: function(size) {
		this._super(size);
		this.position=vec2.create();
	},

	setPosition: function(x, y) {
		this.position[0]=x;
		this.position[1]=y;
	},

	getPosition: function() {
		return this.position;
	},

	/** Binds target-screen setting screen-sized viewport. Position is not used for viewport! */
	bind: function(context) {
		context.gl.viewport(0, 0, this.size[0], this.size[1]);
	},

	unbind: function(context) {
	}
});
