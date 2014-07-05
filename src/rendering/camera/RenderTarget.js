/** Render-target class */
var RenderTarget=Class.extend({
	init: function(size) {
		this.size=vec2.create();
		if (size) vec2.copy(this.size, size);
	},
	
	/** Binds this rendertarget. All subsequent draw calls go to this render-target */
	bind: function(context) {
		context.gl.viewport(0, 0, this.size[0], this.size[1]);
	},
	
	/** Unbinds this rendertarget. */
	unbind: function(context) {
	},
	
	setSize: function(width, height) {
		this.size[0]=width;
		this.size[1]=height;
	},
	
	getSize: function() {
		return this.size;
	}
});