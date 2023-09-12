import Component from 'scene/components/Component';

/** Controller components are used to handle user input. */
class Controller extends Component {
	delta: any;
	dragDelta: any;
	position: any;
	oldPosition: any;
	startDragPosition: any;
	buttons: any;

	constructor() {
		super();
		this.delta=vec2.create();
		this.dragDelta=vec2.create();
		this.position=false;
		this.oldPosition=false;
		this.startDragPosition=false;
		this.buttons=[false, false, false];
	}

	excluded(): any {
		return super.excluded().concat(["delta", "dragDelta", "position", "oldPosition", "startDragPosition", "buttons", "keyStates"]);
	}

	type(): any {
		return "Controller";
	}

	onAddScene(node): any {
		node.scene.engine.input.registerController(this);
	}

	onRemoveScene(node): any {
		node.scene.engine.input.unregisterController(this);
	}

	// Methods
	/** Binds key to callback */
	bind(key, callback, obj): any {
		if(this.node){
			if(key && callback && obj){
				this.node.scene.engine.input.bind(key, callback, obj);
			}
		}
	}

	/** Override this to give your Controller priority over others using the same event. */
	getPriority(eventName): any {
		return 0;
	}

	// Events
	/** Called when starting engine */
	onStart(context, engine): any {
		for (var i=0; i<this.buttons.length; i++)
			this.buttons[i]=false;
	}

	onUpdate(engine, pass): any {
	}

	/** Called when key is either pressed or released */
	onKeyStateChange(key, state): any { }

	/** Called when key is pressed */
	onKeyDown(key): any { }

	/** Called when key is released */
	onKeyUp(key): any { }

	/** Called when button is pressed */
	onButtonDown(position, button, delta): any { }

	/** Called when button is released */
	onButtonUp(position, button, delta): any { }

	/** Called when button is clicked */
	onClick(position, button, delta): any { }

	/** Called when mouse is moved
		@param position Position of mouse as vec2
		@param buttons Buttons as array
		@param delta Mouse movement delta as vec2 */
	onMouseMove(position, buttons, delta): any {}

	onMouseDown(position, button, delta): any {
		this.buttons[button] = true;
	}

	onMouseUp(position, button, delta){
		this.buttons[button] = false;
	}
}

globalThis.Controller = Controller;
export default Controller;
