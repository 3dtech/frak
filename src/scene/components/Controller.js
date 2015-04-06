/** Controller components are used to handle user input. */
var Controller=Component.extend({
	init: function() {
		this._super();
		this.delta=vec2.create();
		this.dragDelta=vec2.create();
		this.position=false;
		this.oldPosition=false;
		this.startDragPosition=false;
		this.buttons=[false, false, false];
	},

	excluded: function() {
		return this._super().concat(["delta", "dragDelta", "position", "oldPosition", "startDragPosition", "buttons", "keyStates"]);
	},

	type: function() {
		return "Controller";
	},

	onAddScene: function(node){
		node.scene.engine.input.registerController(this);
	},

	onRemoveScene: function(node) {
		node.scene.engine.input.unregisterController(this);
	},

	// Methods
	/** Binds key to callback */
	bind: function(key, callback, obj) {
		if(this.node){
			if(key && callback && obj){
				this.node.scene.engine.input.bind(key, callback, obj);
			}
		}
	},

	/** Override this to give your Controller priority over others using the same event. */
	getPriority: function(eventName) {
		return 0;
	},

	// Events
	/** Called when starting engine */
	onStart: function(context, engine) {
		for (var i=0; i<this.buttons.length; i++)
			this.buttons[i]=false;
	},

	onUpdate: function(engine) {
	},

	/** Called when key is either pressed or released */
	onKeyStateChange: function(key, state) { },

	/** Called when key is pressed */
	onKeyDown: function(key) { },

	/** Called when key is released */
	onKeyUp: function(key) { },

	/** Called when button is pressed */
	onButtonDown: function(position, button, delta) { },

	/** Called when button is released */
	onButtonUp: function(position, button, delta) { },

	/** Called when button is clicked */
	onClick: function(position, button, delta) { },

	/** Called when mouse is moved
		@param position Position of mouse as vec2
		@param buttons Buttons as array
		@param delta Mouse movement delta as vec2 */
	onMouseMove: function(position, buttons, delta) {},

	onMouseDown: function(position, button, delta){
		this.buttons[button] = true;
	},

	onMouseUp: function(position, button, delta){
		this.buttons[button] = false;
	}
});