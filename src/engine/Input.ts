

/**
	Input handles user input (touch, mouse, keyboard).
	*/

import { FrakCallback } from "FRAK";
import HammerWF from '../../lib/hammer.min.js';

class Input {
	controllers: any;
	engine: any;
	canvas: any;
	lastPinch: any;
	lastRotation: any;
	buttons: any;
	button: any;
	position: any;
	delta: any;
	lastDelta: any;
	deltaChange: any;
	scrollDelta: any;
	hammertime: any;
	singlepan: any;
	bindings: any;
	keyStates: any;
	wfPanEnabled: any;
	keymap: any;
	pressed: any;

	constructor(engine, canvas) {
		this.controllers = []; //Holds all Controllers
		this.engine = engine;
		this.canvas = canvas;
		this.lastPinch = 0;
		this.lastRotation = 0;
		this.buttons = [false, false, false];
		this.button = -1;

		this.position = vec2.create();
		this.delta = vec2.create();

		this.lastDelta = vec2.create(); //REVIEW IT
		this.deltaChange = vec2.create(); // buffer

		this.scrollDelta = 0;

		if(typeof HammerWF) {
			this.hammertime = HammerWF(this.canvas);
			this.hammertime.get('pinch').set({ enable: true });
			this.hammertime.get('rotate').set({ enable: true });
			this.hammertime.get('pan').set({ threshold: 0, pointers: 0});


			this.singlepan = new HammerWF.Pan({
				event: 'pan',
				direction: HammerWF.DIRECTION_ALL,
				threshold: 5,
				pointers: 1
			});

			this.hammertime.add(this.singlepan);
		}

		this.bindings = {};
		this.keyStates = {};
		this.wfPanEnabled = false;

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
			'space': 32,
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
	}

	setup(): any {
		this.registerKeyboardEvents();
		this.registerPointerEvents();
	}

	registerController(controller): any {
		this.controllers.push(controller);
		return true;
	}

	registerPointerEvents(): any {
		if(this.hammertime){
			this.hammertime.on("pinch", FrakCallback(this, this.onPinch));
			this.hammertime.on("pinchend", FrakCallback(this, this.onPinchEnd));
			this.hammertime.on("tap", FrakCallback(this, this.onTap));
			this.hammertime.on("transformstart", FrakCallback(this, this.onTransformStart));
			//this.hammertime.on("pan", FrakCallback(this, this.onPan));
			this.hammertime.on("panstart", FrakCallback(this, this.onPanStart));
			this.hammertime.on("panend", FrakCallback(this, this.onPanEnd));
			this.hammertime.on("rotate", FrakCallback(this, this.onRotate));
			this.hammertime.on("rotateend", FrakCallback(this, this.onRotateEnd));
			this.hammertime.on("touch", FrakCallback(this, this.onTouch));
			this.hammertime.on("panleft panright panup pandown", FrakCallback(this, this.onPan));
		}

		this.canvas.addEventListener("mousewheel", FrakCallback(this, this.onMouseWheel));
		this.canvas.addEventListener("DOMMouseScroll", FrakCallback(this, this.onMouseWheelMOZ));

		this.canvas.addEventListener('contextmenu', function(e) {
			e.preventDefault();
		}, false);
	}

	registerKeyboardEvents(): any {
		if(this.canvas){
			this.canvas.addEventListener("keydown", FrakCallback(this, this.onKeyDown));
			this.canvas.addEventListener("keyup", FrakCallback(this, this.onKeyUp));
			if (this.canvas.focus)
				this.canvas.focus();
		}
	}

	unregisterController(controller): any {
		var index = this.controllers.indexOf(controller);
		if(index > -1){
			this.controllers.splice(index, 1);
			return true;
		}
		return false;
	}

	/**
	* Binds callbacks to keyboard events
	*/
	bind(key, callback, obj): any {
		if(key && callback && obj){
			if (key in this.keymap)
				this.bindings[this.keymap[key]]=[obj, callback];
			else
				this.bindings[key.charCodeAt(0)]=[obj, callback];
		}

	}

	sendEvent(funcName, ...args): any {
		if (!this.engine.running) // Drop events if engine is paused
			return;

		args = Array.prototype.slice.call(args, 0);
		args = args.slice(1, args.length); //remove funcName
		var activated = [];
		for (var i=0; i < this.controllers.length; i++) {
			if (this.controllers[i][funcName])
				activated.push(this.controllers[i]);
		}

		activated.sort(function(a, b) {
			return b.getPriority(funcName) - a.getPriority(funcName);
		});

		for (var i=0; i<activated.length; i++) {
			if (activated[i][funcName].apply(activated[i], args) === true)
				break;
		}
	}
	/**
	*	Translates the given coordinates accordance to the element
	*/
	translateCoordinates(out, x, y): any {
		var rect = this.canvas.getBoundingClientRect();
		var relX = x - rect.left;
		var relY = y - rect.top;
		return vec2.set(out, relX, relY);
	}

	/**
	*	Called when user makes a short interaction
	*/
	onTap(event): any {
		if(event){
			var newPos = this.translateCoordinates(this.position, event.center.x, event.center.y);
			this.setMouseButtons(event.frakButtons);
			var button;
			for (button=0; button<this.buttons.length; button++)
				if (this.buttons[button]) break;
			if (button == this.buttons.length)
				button = 0;
			this.sendEvent("onClick", this.position, button, event.pointerType, event);
			this.resetMouseButtons();
		}
	}

	onPan(event): any {
		if(event){
			event.preventDefault();

			vec2.set(this.deltaChange, event.deltaX, event.deltaY);
			vec2.sub(this.deltaChange, this.deltaChange, this.lastDelta);
			vec2.set(this.lastDelta, event.deltaX, event.deltaY);
			this.setMouseButtons(event.frakButtons);

			this.translateCoordinates(this.position, event.center.x, event.center.y);
			if(Math.max(vec2.len(this.deltaChange)) < 100){
				if(event.pointerType == "touch"){
					//console.info("onPan", this.position, this.button, this.deltaChange, event.pointerType, event);
					this.sendEvent("onPan", this.position, this.deltaChange, event.pointerType, event);
				}
				else {
					this.sendEvent("onMouseMove", this.position, this.button, this.deltaChange, event.pointerType, event);
				}

			}
		}
	}

	onPanStart(event): any {
		if(event){
			this.setMouseButtons(event.frakButtons);
			this.translateCoordinates(this.position, event.center.x, event.center.y);
			this.sendEvent("onButtonDown", this.position, this.button, 0.0, event.pointerType, event);
		}
	}

	onPanEnd(event): any {
		vec2.set(this.lastDelta, 0, 0);
		if(event){
			this.setMouseButtons(event.frakButtons);
			this.translateCoordinates(this.position, event.center.x, event.center.y);
			this.sendEvent("onButtonUp", this.position, this.button, 0.0, event.pointerType, event);
			this.resetMouseButtons();
		}
	}

	onTouch(): any {
		console.info("onTouch in frak");
	}

	onTransformStart(event): any {
		event.gesture.preventDefault();
		if(event.gesture){
			this.lastRotation = event.gesture.rotation;
		}
	}

	onPinch(event): any {
		event.preventDefault();
		//Skip if it is still redrawing
		if(event){
			this.translateCoordinates(this.position, event.clientX, event.clientY);
			var scale = event.scale - this.lastPinch;
			this.lastPinch = event.scale - 1;
			this.sendEvent("onPinch", this.position, scale, "touch", event);
		}
	}

	onPinchEnd(): any {
		this.lastPinch = 0;
	}

	onRotate(event): any {
		if(event){
			this.translateCoordinates(this.position, event.clientX, event.clientY);

			var rotation = event.rotation - this.lastRotation;
			//console.info(event.rotation, "-", this.lastRotation, "=",rotation );
			this.lastRotation = event.rotation;
			if(Math.max(rotation) < 10){ //limit too big jumps
				this.sendEvent("onRotate", this.position, rotation, "touch", event);
			}
		}
	}

	onRotateEnd(event): any {
		this.lastRotation = 0;
	}


	onMultiDrag(event): any {
		console.log("Multi drag in frak");

	}

	onMouseWheel(event): any {
		if (!event)
			return;

		event.preventDefault();

		var direction = 0;
		if ('wheelDelta' in event) {
			direction = event.wheelDelta < 0 ? 1 : event.wheelDelta > 0 ? -1 : 0;
		}
		else {
			direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
		}

		this.scrollDelta += event.deltaY;
		this.translateCoordinates(this.position, event.clientX, event.clientY);
		this.sendEvent("onMouseWheel", this.position, this.scrollDelta, direction, "mouse", event);
	}

	/** Firefox mouse wheel handler */
	onMouseWheelMOZ(event): any {
		if (!event)
			return;

		event.preventDefault();

		var direction = event.detail > 0 ? 1 : event.detail < 0 ? -1 : 0;
		this.scrollDelta += event.detail;
		this.translateCoordinates(this.position, event.clientX, event.clientY);
		this.sendEvent("onMouseWheel", this.position, this.scrollDelta, direction, "mouse", event);
	}

	onKeyDown(event): any {
		if(event){
			this.sendEvent("onKeyDown", event.which, "keyboard", event);
			this.sendEvent("onKeyStateChange", event.which, true, "keyboard", event);
			this.keyStates[event.which] = true;
		}
	}

	onKeyUp(event): any {
		if(event){
			this.sendEvent("onKeyUp", event.which, "keyboard", event);
			this.sendEvent("onKeyStateChange", event.which, false, "keyboard", event);
			delete this.keyStates[event.which];

		}
	}
	/**
	*	Called when engine redraws
	*/
	update(): any {
		this.processKeyEvents();
	}

	processKeyEvents(): any {
		for(var key in this.keyStates){
			if(this.bindings[key]) {
				var method=this.bindings[key];
				if(method && typeof method[0] == "object" && typeof method[1] === "string"){
					method[0][method[1]](this.engine.fps.getDelta()/1000.0, key);
				}

			}
		}
	}

	setMouseButtons(buttons): any {
		if (!buttons || buttons.length < 3)
			return;

		this.button = -1;
		for (var i=0; i<3; i++) {
			this.buttons[i] = buttons[i];
			if (buttons[i] === true)
				this.button = i;
		}
	}

	resetMouseButtons() {
		this.button = -1;
		this.buttons[0]=false;
		this.buttons[1]=false;
		this.buttons[2]=false;
	}
}

//Hack for Hammer.js to enable other mouse buttons
if(typeof HammerWF !== "undefined") {
	HammerWF.MouseInput.prototype.handler = function(ev) {
		if (ev.type == 'mousedown') {
			this.pressed = true;
		}


		if (!this.pressed || !this.allow)
			return;

		if (ev.type == 'mouseup') {
			this.pressed = false;
		}

		var buttons = [false, false, false];

	// Detect button the Microsoft/Mozilla way
	if ('buttons' in ev) {
		buttons[0] = !!(ev.buttons & 1); // left
		buttons[1] = !!(ev.buttons & 4); // middle
		buttons[2] = !!(ev.buttons & 2); // right
	}

	// Detect button the W3C way
	else if ('button' in ev) {
		buttons[ev.button] = true;
	}

	var MOUSE_INPUT_MAP = {
		mousedown: 1,
		mousemove: 2,
		mouseup: 4,
	};

	this.callback(this.manager, MOUSE_INPUT_MAP[ev.type], {
		pointers: [ev],
		changedPointers: [ev],
		pointerType: 'mouse',
		srcEvent: ev,
		frakButtons: buttons
	});
};

HammerWF.PointerEventInput.prototype.handler = function(ev) {
	var store = this.store;
	var removePointer = false;

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var POINTER_INPUT_MAP = {
		pointerdown: INPUT_START,
		pointermove: INPUT_MOVE,
		pointerup: INPUT_END,
		pointercancel: INPUT_CANCEL,
		pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
		2: INPUT_TYPE_TOUCH,
		3: INPUT_TYPE_PEN,
		4: INPUT_TYPE_MOUSE,
		5: INPUT_TYPE_KINECT
	};

	function inArray(src, find, findByKey) {
		if (src.indexOf && !findByKey) {
			return src.indexOf(find);
		} else {
			var i = 0;
			while (i < src.length) {
				if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
					return i;
				}
				i++;
			}
			return -1;
		}
	}

	var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	// get index of the event in the store
	var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	// start and mouse must be down
	if (eventType & INPUT_START) {
		if (storeIndex < 0) {
			store.push(ev);
			storeIndex = store.length - 1;
		}
	} else if (eventType & (INPUT_END | INPUT_CANCEL)) {
		removePointer = true;
	}

	// it not found, so the pointer hasn't been down (so it's probably a hover)
	if (storeIndex < 0) {
		return;
	}

	// update the event in the store
	store[storeIndex] = ev;

	var buttons = [
		!!(ev.buttons & 1), // left
		!!(ev.buttons & 4), // middle
		!!(ev.buttons & 2)  // right
		];

		this.callback(this.manager, eventType, {
			pointers: store,
			changedPointers: [ev],
			pointerType: pointerType,
			srcEvent: ev,
			frakButtons: buttons
		});

		if (removePointer) {
		// remove from the store
		store.splice(storeIndex, 1);
	}
}

}

globalThis.Input = Input;

export default Input;
