/**
	Input handles user input (touch, mouse, keyboard).
*/
var Input = Class.extend({
	init: function(engine, canvas){
		this.controllers = []; //Holds all Controllers
		this.engine = engine;
		this.canvas = canvas;
		this.lastPinch = 0;
		this.lastRotation = 0;

		this.position = vec2.create();
		this.delta = vec2.create();

		this.lastDelta = vec2.create(); //REVIEW IT
		this.deltaChange = vec2.create(); // buffer

		this.scrollDelta = 0;

		this.hammertime = HammerWF(this.canvas);
		this.hammertime.get('pinch').set({ enable: true });
		this.hammertime.get('rotate').set({ enable: true });
		this.hammertime.get('pan').set({ threshold: 5 });

		this.bindings = {};
		this.keyStates = {};

		this.keymap = {
			'enter': 13,
			'escape': 27,
			'backspace': 8,
			'tab': 9,
			'shift': 16,
			'ctrl': 17,
			'alt': 18,
			'pause': 19,
			'caps_lock': 20,
			'page_up': 33,
			'page_down': 34,
			'end': 35,
			'home': 36,
			'left_arrow': 37,
			'up_arrow': 38,
			'right_arrow': 39,
			'down_arrow': 40,
			'insert': 45,
			'delete': 46,
			'left_window_key': 91,
			'right_window_key': 92,
			'select_key': 93,
			'numpad_0': 96,
			'numpad_1': 97,
			'numpad_2': 98,
			'numpad_3': 99,
			'numpad_4': 100,
			'numpad_5': 101,
			'numpad_6': 102,
			'numpad_7': 103,
			'numpad_8': 104,
			'numpad_9': 105,
			'multiply': 106,
			'add': 107,
			'subtract': 109,
			'decimal_point': 110,
			'divide': 111,
			'f1': 112,
			'f2': 113,
			'f3': 114,
			'f4': 115,
			'f5': 116,
			'f6': 117,
			'f7': 118,
			'f8': 119,
			'f9': 120,
			'f10': 121,
			'f11': 122,
			'f12': 123,
			'num_lock': 144,
			'scroll_lock': 145,
			'semi_colon': 186,
			'equal_sign': 187,
			'comma': 188,
			'dash': 189,
			'period': 190,
			'forward_slash': 191,
			'grave_accent': 192,
			'open_bracket': 219,
			'back_slash': 220,
			'close_braket': 221,
			'single_quote': 222,
			'0': 48,
			'1': 49,
			'2': 50,
			'3': 51,
			'4': 52,
			'5': 53,
			'6': 54,
			'7': 55,
			'8': 56,
			'9': 57,
			'a': 65,
			'b': 66,
			'c': 67,
			'd': 68,
			'e': 69,
			'f': 70,
			'g': 71,
			'h': 72,
			'i': 73,
			'j': 74,
			'k': 75,
			'l': 76,
			'm': 77,
			'n': 78,
			'o': 79,
			'p': 80,
			'q': 81,
			'r': 82,
			's': 83,
			't': 84,
			'u': 85,
			'v': 86,
			'w': 87,
			'x': 88,
			'y': 89,
			'z': 90
		};

		this.setup();
	},

	setup: function(){
		this.registerKeyboardEvents();
		this.registerPointerEvents();
	},

	registerController: function(controller){
		this.controllers.push(controller);
		return true;
	},

	registerPointerEvents: function(){
		if(this.hammertime){
			this.hammertime.on("pinch", ClassCallback(this, this.onPinch));
			this.hammertime.on("pinchend", ClassCallback(this, this.onPinchEnd));
			this.hammertime.on("tap", ClassCallback(this, this.onTap));
			this.hammertime.on("transformstart", ClassCallback(this, this.onTransformStart));
			this.hammertime.on("pan", ClassCallback(this, this.onPan));
			this.hammertime.on("panend", ClassCallback(this, this.onPanEnd));
			this.hammertime.on("rotate", ClassCallback(this, this.onRotate));
			this.hammertime.on("rotateend", ClassCallback(this, this.onRotateEnd));
			this.hammertime.on("touch", ClassCallback(this, this.onTouch));
		}

		this.canvas.addEventListener("mousewheel", ClassCallback(this, this.onMouseWheel));

		this.canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
	},

	registerKeyboardEvents: function(){
		var me=this;
		if(this.canvas){
			this.canvas.addEventListener("keydown", ClassCallback(this, this.onKeyDown));
			this.canvas.addEventListener("keyup", ClassCallback(this, this.onKeyUp));
		}
	},

	unregisterController: function(controller){
		var index = this.controllers.indexOf(controller);
		if(index > -1){
			this.controllers.splice(index, 1);
			return true;
		}
		return false;
	},

	/**
	* Binds callbacks to keyboard events
	*/
	bind: function(key, callback, obj){
		if(key && callback && obj){
			if (key in this.keymap)
				this.bindings[this.keymap[key]]=[obj, callback];
			else
				this.bindings[key.charCodeAt(0)]=[obj, callback];
		}

	},

	sendEvent: function(funcName){
		var args = Array.prototype.slice.call(arguments, 0);
		args = args.slice(1, args.length); //remove funcName
		//console.info("sendEvent", funcName, args);
		for(var i=0; i < this.controllers.length; i++){
			if(this.controllers[i][funcName]){
				this.controllers[i][funcName].apply(this.controllers[i], args);
			}
		}
	},
	/**
	*	Translates the given coordinates accordance to the element
	*/
	translateCoordinates: function(out, x, y){
		var rect = this.canvas.getBoundingClientRect();
		var relX = x - rect.left;
		var relY = y - rect.top;
		return vec2.set(out, relX, relY);
	},

	/**
	*	Called when user makes a short interaction
	*/
	onTap: function(event){
		if(event){
			var newPos = this.translateCoordinates(this.position, event.center.x, event.center.y);
			this.sendEvent("onClick", this.position, 0, event.pointerType, event);
		}
	},

	onPan: function(event){
		if(event){
			event.preventDefault();

			vec2.set(this.deltaChange, event.deltaX, event.deltaY);
			vec2.sub(this.deltaChange, this.deltaChange, this.lastDelta);
			vec2.set(this.lastDelta, event.deltaX, event.deltaY);

			this.button = 0;
			if(event.srcEvent && event.srcEvent.button)
				this.button = event.srcEvent.button;

			this.translateCoordinates(this.position, event.center.x, event.center.y);
			if(Math.max(vec2.len(this.deltaChange)) < 100){
				this.sendEvent("onMouseMove", this.position, this.button, this.deltaChange, event.pointerType, event);
			}
		}
	},

	onPanEnd: function(){
		vec2.set(this.lastDelta, 0, 0);
	},

	onTouch: function(){
		//console.info("onTouch");
	},

	onTransformStart: function(event){
		event.gesture.preventDefault();
		if(event.gesture){
			this.lastRotation = event.gesture.rotation;
		}
	},

	onPinch: function(event){
		event.preventDefault();
		//Skip if it is still redrawing
		if(event){
			this.translateCoordinates(this.position, event.clientX, event.clientY);
			var scale = event.scale - this.lastPinch;
			this.lastPinch = event.scale;
			this.sendEvent("onPinch", this.position, event.scale, "touch", event);
		}
	},

	onPinchEnd: function(){
		this.lastPinch = 0;
	},

	onRotate: function(event){
		if(event){
			this.translateCoordinates(this.position, event.clientX, event.clientY);
			var rotation = event.rotation - this.lastRotation;
			this.lastRotation = event.rotation;
			if(Math.max(rotation) < 10){ //limit too big jumps
				this.sendEvent("onRotate", this.position, rotation, "touch", event);
			}

		}
	},

	onRotateEnd: function(event){
		this.lastRotation = 0;
	},


	onMultiDrag: function(event){

	},

	onMouseWheel: function(event){
		if(event){
			this.scrollDelta += event.deltaY;
			this.translateCoordinates(this.position, event.clientX, event.clientY);
			this.sendEvent("onMouseWheel", this.position, this.scrollDelta, "mouse", event);
		}
	},

	onKeyDown: function(event){
		if(event){
			this.sendEvent("onKeyDown", event.which, "keyboard", event);
			this.sendEvent("onKeyStateChange", event.which, true, "keyboard", event);
			this.keyStates[event.which] = true;
		}
	},

	onKeyUp: function(event) {
		if(event){
			this.sendEvent("onKeyUp", event.which, "keyboard", event);
			this.sendEvent("onKeyStateChange", event.which, false, "keyboard", event);
			delete this.keyStates[event.which];

		}
	},
	/**
	*	Called when engine redraws
	*/
	update: function(){
		this.processKeyEvents();
	},

	processKeyEvents: function() {
		for(var key in this.keyStates){
			if(this.bindings[key]) {
				var method=this.bindings[key];
				if(method && typeof method[0] == "object" && typeof method[1] === "string"){
					method[0][method[1]](this.engine.fps.getDelta()/1000.0, key);
				}

			}
		}
	}
});
//Hack for Hammer.js to enable other mouse buttons
HammerWF.MouseInput.prototype.handler = function(ev) {
		var MOUSE_INPUT_MAP = {
			mousedown: 1,
			mousemove: 2,
			mouseup: 4,
		};

		var INPUT_START = 1;
		var INPUT_MOVE = 2;
		var INPUT_END = 4;

		var eventType = MOUSE_INPUT_MAP[ev.type];

		//fix other mouse buttons
        if (eventType == INPUT_START && ev.button > -1) {
            this.pressed = true;
        }
        //fix other mouse buttons
        if (eventType & INPUT_MOVE && ev.which !== 1) {
            //eventType = INPUT_END;
        }

        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
        if (!this.pressed || !this.allow) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: 'mouse',
            srcEvent: ev
        });
};