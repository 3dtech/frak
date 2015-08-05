/** Render-target class */
var RenderTarget=Class.extend({
	init: function(size) {
		this.viewport = {
			position: vec2.create(),
			size: vec2.create()
		};

		this.size = vec2.create();
		if (size) {
			vec2.copy(this.size, size);
			vec2.copy(this.viewport.size, size);
		}
	},

	type: function() {
		return 'RenderTarget';
	},

	/** Binds this rendertarget. All subsequent draw calls go to this render-target */
	bind: function(context) {
		context.gl.viewport(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
		context.gl.scissor(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
		context.gl.enable(context.gl.SCISSOR_TEST);
	},

	/** Unbinds this rendertarget. */
	unbind: function(context) {
		context.gl.disable(context.gl.SCISSOR_TEST);
	},

	/** Sets RenderTarget size */
	setSize: function(width, height) {
		this.size[0] = width;
		this.size[1] = height;
	},

	/** Returns RenderTarget size */
	getSize: function() {
		return this.size;
	},

	/** Sets RenderTarget viewport position and size */
	setViewport: function(x, y, width, height) {
		vec2.set(this.viewport.position, x, y);
		vec2.set(this.viewport.size, width, height);
	},

	/** Inherits viewport parameters from another RenderTarget */
	inheritViewport: function(other) {
		vec2.copy(this.viewport.position, other.viewport.position);
		vec2.copy(this.viewport.size, other.viewport.size);
	},

	/** Sets viewport to cover the entire RenderTarget */
	resetViewport: function() {
		this.setViewport(0, 0, this.size[0], this.size[1])
	}
});