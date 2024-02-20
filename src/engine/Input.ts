import Engine from './Engine';
import Controller, { Events } from '../scene/components/Controller';

type ActivePointers = { [key: number]: PointerEvent };
type RemoveListener = () => void;

// TODO: Multi-touch, position in canvas coordinates

class Input {
	private controllers: Controller[] = [];
	private metaListeners: RemoveListener[] = [];
	private listeners: RemoveListener[] = [];

	/** Constructor
		@param engine The engine instance
		@param canvas The canvas element we want the events from
	*/
	constructor(public engine: Engine, private canvas: HTMLCanvasElement) {}

	/** Dispatches an event to all controllers */
	private dispatch<K extends keyof Events>(name: K, ...args: Events[K]) {
		for (const controller of this.controllers) {
			controller.onEvent(name, args);
		}
	}

	/** Creates a listener and returns a remove function */
	private createListener(target: EventTarget, name: string, handler: EventListener, options?: AddEventListenerOptions): RemoveListener {
		target.addEventListener(name, handler, options);

		return () => target.removeEventListener(name, handler, options);
	}

	/** Adds a listener with a remove function that removes itself */
	private addListener(target: EventTarget, name: string, handler: EventListener, options?: AddEventListenerOptions, list = this.listeners): RemoveListener {
		const innerRemove = this.createListener(target, name, handler, options);
		const remove = () => {
			innerRemove();
			list.splice(list.indexOf(remove), 1);
		};

		list.push(remove);

		return remove;
	}

	/** Adds a listener to the canvas that is removed when the input is stopped */
	private addMetaListener(target: EventTarget, name: string, handler: EventListener, options?: AddEventListenerOptions) {
		return this.addListener(target, name, handler, options, this.metaListeners);
	}

	/** Sets up listeners for meta events */
	private setupMetaEvents() {
		if (this.metaListeners.length) {
			return;
		}

		// Prevent page scroll
		this.addMetaListener(this.canvas, 'touchmove', ev => ev.preventDefault());
		this.addMetaListener(this.canvas, 'contextmenu', ev => ev.preventDefault());
	}

	/** Sets up listeners for input events */
	private setupEvents() {
		if (this.listeners.length) {
			return;
		}

		this.setupPanEvents();
		this.setupWheelEvent();
		this.setupClickEvent();
		this.setupPinchEvent();
		this.setupRotateEvent();
	}

	/** Removes listeners from a given list */
	private removeListeners(list = this.listeners) {
		for (let i = list.length - 1; i >= 0; i--) {
			list[i]();
		}
	}

	/** Starts input, sets up events */
	public start() {
		this.setupMetaEvents();
		this.setupEvents();
	}

	/** Pauses input, removes listeners */
	public pause() {
		this.removeListeners();
	}

	/** Stops input, removes all listeners */
	public stop() {
		this.removeListeners(this.metaListeners);
		this.removeListeners();
	}

	/** Used to set up handlers for events involving pointers */
	public setupPointerEvent(
		start: (touches: ActivePointers, id: number) => void,
		move: (touches: ActivePointers, id: number) => void,
		end: (touches: ActivePointers, id: number) => void,
		testPointerDown: (touches: ActivePointers, id: number) => boolean,
		testPointerUp: (touches: ActivePointers, id: number) => boolean,
	) {
		const activePointers: ActivePointers = {};
		let active = false;
		let removeMove: RemoveListener | null = null;
		let removeUp: RemoveListener | null = null;

		// We only listen for this once the first pointer is down, to ignore other pointerup events from other elements
		const pointerUp = (ev: PointerEvent) => {
			const test = testPointerUp(activePointers, ev.pointerId);

			delete activePointers[ev.pointerId];

			if (Object.keys(activePointers).length === 0) {
				removeUp?.();
				removeMove?.();
			}

			if (active && test) {
				active = false;

				end(activePointers, ev.pointerId);
			}
		};

		const pointerMove = (ev: PointerEvent) => {
			// Update pointer location even if not active
			activePointers[ev.pointerId] = ev;

			if (active) {
				// Prevent page panning with touch
				ev.preventDefault();

				move(activePointers, ev.pointerId);
			}
		};

		const pointerDown = (ev: PointerEvent) => {
			activePointers[ev.pointerId] = ev;

			if (Object.keys(activePointers).length === 1) {
				removeUp = this.addListener(document, 'pointerup', pointerUp);
				removeMove = this.addListener(document, 'pointermove', pointerMove);
			}

			const test = testPointerDown(activePointers, ev.pointerId);
			if (!active && test) {
				active = true;

				start(activePointers, ev.pointerId);
			} else if (active && !test) {
				active = false;

				end(activePointers, ev.pointerId);
			}
		};

		this.addListener(this.canvas, 'pointerdown', pointerDown);
	}

	/** Helper for handling events involving panning */
	private setupPanEvent(
		startPredicate: (touches: ActivePointers, id: number) => boolean,
		started = (pos: [number, number], button: number) => {},
		moved = (pos: [number, number], delta: [number, number], button: number) => {},
		ended = (pos: [number, number]) => {},
	) {
		let id = 0;
		let button = -1;
		const lastXY = vec2.create();
		const xy = vec2.create();
		const delta = vec2.create();

		const start = (touches: ActivePointers, pointerId: number) => {
			const ev = touches[pointerId];

			id = pointerId;
			button = ev.button;

			vec2.set(lastXY, ev.clientX, ev.clientY);
			started(lastXY, button);
		}

		const move = (touches: ActivePointers, pointerId: number) => {
			if (pointerId !== id) {
				return;
			}

			vec2.set(xy, touches[pointerId].clientX, touches[pointerId].clientY);
			vec2.sub(delta, xy, lastXY);
			vec2.copy(lastXY, xy);

			moved(xy, delta, button);
		}

		const end = (touches: ActivePointers, pointerId: number) => {
			id = 0;
			button = -1;
			ended(lastXY);
		}

		const testPointerDown = (touches: ActivePointers, pointerId: number) => {
			return startPredicate(touches, pointerId);
		}

		const testPointerUp = (touches: ActivePointers, pointerId: number) => {
			return pointerId === id;
		}

		this.setupPointerEvent(start, move, end, testPointerDown, testPointerUp);
	}

	private setupPanEvents() {
		this.setupPanEvent(
			(touches, id) => Object.keys(touches).length === 1,
			undefined,
			(pos: [number, number], delta: [number, number], button: number) => {
				// TODO: Pass along info about touch (legacy onPan isn't great, so let's break compatibility)
				this.dispatch('onMouseMove', pos, button, delta);
			}
		);
	}

	private setupClickEvent() {
		const MAX_DELTA_TIME = 250;
		const MAX_DELTA_SQ = 100;

		let startTime = 0;
		let distance = 0;
		let button = -1;

		this.setupPanEvent(
			(touches, id) => Object.keys(touches).length === 1,
			(pos, btn) => {
				startTime = performance.now();
				distance = 0;
				button = btn;
			},
			(delta, btn) => {
				distance += delta[0] * delta[0] + delta[1] * delta[1];
			},
			pos => {
				const endTime = performance.now();
				const deltaTime = endTime - startTime;

				if (deltaTime > MAX_DELTA_TIME) {
					return;
				}

				if (distance > MAX_DELTA_SQ) {
					return;
				}

				this.dispatch('onClick', pos, button, [0, 0]);
			}
		);
	}

	setupPinchEvent() {
		let startCenter = vec2.create();
		let startDistance = 0;
		let lastScale = 0;

		this.setupPointerEvent(
			(touches, id) => {
				const keys = Object.keys(touches);
				const a = touches[keys[0]];
				const b = touches[keys[1]];

				lastScale = 0;
				startDistance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
				vec2.set(startCenter, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
			},
			(touches, id) => {
				const keys = Object.keys(touches);
				const a = touches[keys[0]];
				const b = touches[keys[1]];

				const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
				const center = vec2.set(vec2.create(), (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);

				const eventScale = distance / startDistance;
				const scale = eventScale - lastScale;

				lastScale = eventScale - 1;

				this.dispatch('onPinch', center, scale);
			},
			() => {},
			(touches, id) => Object.keys(touches).length === 2,
			(touches, id) => Object.keys(touches).length !== 2,
		);
	}

	setupRotateEvent() {}

	setupWheelEvent() {
		const handler = (ev: WheelEvent) => {
			ev.preventDefault();

			let delta = ev.deltaY;
			if (delta === 0) {
				return;
			}

			const direction = Math.sign(delta);

			this.dispatch('onMouseWheel', [ev.clientX, ev.clientY], delta, direction);
		};

		this.addListener(this.canvas, 'wheel', handler, { passive: false });
	}

	update() {}

	registerController(controller: Controller) {
		this.controllers.push(controller);
	}

	bind(...args: any[]) {

	}
}

globalThis.Input = Input;
export default Input;
