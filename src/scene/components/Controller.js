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
		this.keyStates={};
		this.bindings={};
		this.canvas = false;
		this.keymap={
			'enter':13,
			'escape':27,
		'backspace': 8,
			'tab':	 9 ,
			'shift': 16,
			'ctrl':	 17,
			'alt': 	 18,
			'pause': 19,
		'caps_lock': 20, 
		'page_up':	 33,
		'page_down': 34,
			'end':	 35,
			'home':	 36,
		'left_arrow':37,
		'up_arrow' 	:38,
	'right_arrow'	:39, 
	'down_arrow' 	:40,
			'insert':45,
			'delete':46,
'left_window_key' 	:91, 
'right_window_key' 	:92, 
 'select_key'       :93,
 'numpad_0' 	 	:96, 
 'numpad_1' 	 	:97, 
'numpad_2' 	 		:98, 
 'numpad_3'			:99, 
 'numpad_4' 	 	:100,
 'numpad_5'		 	:101,
'numpad_6' 	 		:102,
 'numpad_7'	 		:103,
 'numpad_8' 	 	:104, 
 'numpad_9' 		:105,
'multiply'		 	:106, 
 'add' 	 			:107, 
 'subtract' 	 	:109, 
 'decimal_point' 	:110,
 'divide' 	 		:111, 
 'f1' 	 			:112, 
 'f2' 	 			:113, 
 'f3' 	 			:114, 
 'f4' 	 			:115,
 'f5' 	 			:116, 
 'f6' 	 			:117,
'f7' 	 			:118,
 'f8'				:119, 
 'f9' 				:120,
 'f10'			 	:121,
'f11'		  	 	:122, 
 'f12' 				:123, 
 'num_lock' 		:144, 
 'scroll_lock' 	 	:145, 
 'semi_colon' 	 	:186, 
 'equal_sign' 	 	:187, 
 'comma' 	 		:188, 
 'dash' 	 		:189, 
 'period' 			:190, 
 'forward_slash' 	:191, 
 'grave_accent' 	:192, 
 'open_bracket' 	:219, 
 'back_slash' 		:220, 
 'close_braket' 	:221, 
 'single_quote' 	:222,
 '0' 	 :48,
 '1' 	 :49,
 '2' 	 :50, 
 '3' 	 :51, 
 '4' 	 :52, 
 '5' 	 :53, 
 '6' 	 :54, 
 '7'	 :55, 
 '8' 	 :56, 
 '9' 	 :57, 
 'a' 	 :65, 
 'b' 	 :66, 
 'c' 	 :67, 
 'd' 	 :68,
 'e' 	 :69, 
 'f' 	 :70, 
 'g' 	 :71, 
 'h' 	 :72, 
 'i'	 :73, 
 'j' 	 :74, 
 'k' 	 :75, 
 'l' 	 :76, 
 'm' 	 :77, 
 'n' 	 :78, 
 'o' 	 :79, 
 'p' 	 :80, 
 'q' 	 :81, 
 'r' 	 :82, 
 's' 	 :83, 
 't' 	 :84, 
 'u' 	 :85, 
 'v' 	 :86, 
 'w' 	 :87, 
 'x' 	 :88, 
 'y' 	 :89, 
 'z' 	 :90
			};
	},
	
	excluded: function() {
		return this._super().concat(["delta", "dragDelta", "position", "oldPosition", "startDragPosition", "buttons", "keyStates"]);
	},
	
	type: function() {
		return "Controller";
	},
	
	// Methods
	/** Binds key to callback */
	bind: function(key, callback) {
		if (key in this.keymap)
			this.bindings[this.keymap[key]]=callback;
		else
			this.bindings[key.charCodeAt(0)]=callback;
	},
	
	keyDown: function(key) {
		if (!this.enabled)
			return;
		this.keyStates[key]=true;
		this.onKeyDown(key);
		this.onKeyStateChange(key, true);
	},
	
	keyUp: function(key) {
		if (!this.enabled)
			return;
		delete this.keyStates[key];
		this.onKeyUp(key);
		this.onKeyStateChange(key, false);
	},
	
	mouseMove: function(position) {
		if (!this.enabled)
			return;
		this.position=position;
		if(this.oldPosition) {
			vec2.subtract(this.delta, this.oldPosition, this.position);
			this.onMouseMove(this.position, this.buttons, this.delta);
		}
		this.oldPosition=this.position;
	},
	
	mouseDown: function(position, button) {
		if (!this.enabled)
			return;
		this.buttons[button]=true;
		this.position=position;
		this.startDragPosition=vec2.clone(this.position);
		this.onButtonDown(this.position, button, this.delta);
	},
	
	mouseUp: function(position, button) {
		if (!this.enabled)
			return;
		this.buttons[button]=false;
		this.position=position;
		if (this.startDragPosition)
			vec2.subtract(this.dragDelta, this.position, this.startDragPosition);
		this.onButtonUp(this.position, button, this.delta);
	},
	
	click: function(button) {
		if (!this.enabled)
			return;
		this.onClick(this.position, button, this.dragDelta);
	},

	processKeyEvents: function(engine) {
		for(var key in this.keyStates) {
			this.onKey(key, engine.fps.getDelta()/1000.0);
		}
	},
	
	// Events
	/** Called when starting engine */
	onStart: function(context, engine) {
		// Set controller to started mode
		var me=this;
		this.canvas = context.canvas;
		this.buttons=[false, false, false];
		context.canvas.contextmenu(function(){ return false; });
		context.canvas.attr("tabindex", "0");
		context.canvas.keydown(function(event) { me.keyDown(event.which); });
		context.canvas.keyup(function(event) { me.keyUp(event.which); });
		context.canvas.mousemove(function(event) { 
			var offset = context.canvas.offset(); 
			var relX = event.pageX - offset.left;
			var relY = event.pageY - offset.top;
			me.mouseMove([relX, relY]); });
		context.canvas.mousedown(function(event) {
			var offset = context.canvas.offset(); 
			var relX = event.pageX - offset.left;
			var relY = event.pageY - offset.top;
			me.mouseDown([relX, relY], event.button); });
		context.canvas.mouseup(function(event) {
			var offset = context.canvas.offset(); 
			var relX = event.pageX - offset.left;
			var relY = event.pageY - offset.top;
			me.mouseUp([relX, relY], event.button); });
		context.canvas.click(function(event) { $(this).focus(); me.click(event.button); });
	},
	
	onUpdate: function(engine) {
		this.processKeyEvents(engine);
	},
	
	/** Called each update while key is pressed */
	onKey: function(keyCode, deltaTime) {
		if(this.bindings[keyCode]) {
			var method=this.bindings[keyCode];
			this[method](deltaTime);
		}
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
	onMouseMove: function(position, buttons, delta) {}
});