import Component from 'scene/components/Component';

type Vec2 = [number, number];

interface Events {
	onClick: [position: Vec2, button: number, delta: Vec2];
	onKeyDown: [key: string, code: string];
	onKeyUp: [key: string, code: string];
	onMouseMove: [position: Vec2, button: number, delta: Vec2];
	onMouseWheel: [position: Vec2, delta: number, direction: number];
	onRotate: [position: Vec2, rotation: number];
	onPinch: [position: Vec2, scale: number];
}

/** Controller components are used to handle user input. */
class Controller extends Component {
	protected keyCodeStates: { [key: string]: boolean } = {};
	protected keyStates: { [key: string]: boolean } = {};

	delta: any;
	dragDelta: any;
	position: any;
	oldPosition: any;
	startDragPosition: any;
	buttons: any;

	constructor() {
		super();
		this.delta = vec2.create();
		this.dragDelta = vec2.create();
		this.position = false;
		this.oldPosition = false;
		this.startDragPosition = false;
		this.buttons = [false, false, false];
	}

	/**
	 *
	 */
	excluded(): any {
		return super.excluded().concat(['delta', 'dragDelta', 'position', 'oldPosition', 'startDragPosition', 'buttons', 'keyStates']);
	}

	/**
	 *
	 */
	type(): any {
		return 'Controller';
	}

	/**
	 *
	 */
	onAddScene(node): any {
		node.scene.engine.input.registerController(this);
	}

	/**
	 *
	 */
	onRemoveScene(node): any {
		node.scene.engine.input.unregisterController(this);
	}

	// Methods
	/** Binds key to callback */
	bind(key, callback, obj): any {
		if (this.node) {
			if (key && callback && obj) {
				this.node.scene.engine.input.bind(key, callback, obj);
			}
		}
	}

	/** Override this to give your Controller priority over others using the same event. */
	getPriority(eventName): any {
		return 0;
	}

	/** Gets the state of a key */
	key(key: string): boolean {
		return this.keyStates[key] ?? false;
	}

	/** Gets the state of a key by scancode */
	keyCode(code: string): boolean {
		return this.keyCodeStates[code] ?? false;
	}

	// Events
	/** Called when starting engine */
	onStart(context, engine): any {
		for (let i = 0; i < this.buttons.length; i++) { this.buttons[i] = false; }
	}

	/**
	 *
	 */
	onUpdate(engine, pass): any {
	}

	/**
	 *
	 */
	onEvent<K extends keyof Events>(event: K, args: Events[K]): any {
		this[event].apply(this, args);
	}

	/** Called when key is either pressed or released */
	onKeyStateChange(key, state): any { }

	/** Called when key is pressed */
	onKeyDown(key: string, code: string) {
		this.keyStates[key] = true;
		this.keyCodeStates[key] = true;
	}

	/** Called when key is released */
	onKeyUp(key: string, code: string) {
		this.keyStates[key] = false;
		this.keyCodeStates[key] = false;
	}

	/** Called when button is pressed */
	onButtonDown(position, button, delta): any { }

	/** Called when button is released */
	onButtonUp(position, button, delta): any { }

	/** Called when button is clicked */
	onClick(position, button, delta): any { }

	/** Called when mouse is moved */
	onMouseMove(position, button, delta): any {}

	/**
	 *
	 */
	onPan(position, delta) {}

	/**
	 *
	 */
	onMouseWheel(position, delta, direction) {}

	/**
	 *
	 */
	onRotate(position, rotation) {}

	/**
	 *
	 */
	onPinch(position, scale) {}
}

globalThis.Controller = Controller;
export type { Events };
export { Controller as default };
