/** Keeps track of renderers */
var Renderers=Class.extend({
	/** Constructor 
	  @param canvas The canvas element that provides rendering context */
	init: function(canvas) {
		this.context=new RenderingContext(canvas);   ///< Rendering context that will be used by all renderers of this element
		this.renderers=[];													 ///< All renderers assigned to this context

		var me=this;
		this.canvas.bind('resize', function(event) { me.onResize(event); });					
	},

	addRenderer: function(renderer) {
		this.renderers.push(renderer);
	},

	/** Called when rendering is required */
	onRender: function() {
		for(var i in this.renderers) {
			this.renderers[i].onRender(this);
		}
	},
	
	/** Called each time the canvas is resized. Default implementation calls 
	  resize on all renderers attached to this context.
		@param event Event data */
	onResize: function(event) {
		for(var i in this.renderers) {
			this.renderers[i].onResize(event);
		}
	}	
});