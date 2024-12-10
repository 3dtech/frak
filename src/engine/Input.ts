/// <reference path="Input.d.ts" />

import type Engine from './Engine';
import type { Events } from '../scene/components/Controller';
import type Controller from '../scene/components/Controller';

const createListener: CreateListener = (
	target: EventTarget,
	name: string,
	handler: EventListener,
	options?: AddEventListenerOptions,
) => {
	target.addEventListener(name, handler, options);

	return () => target.removeEventListener(name, handler, options);
};

/** Input manager */
class Input {
	private readonly controllers: Controller[] = [];
	private readonly metaListeners: RemoveListener[] = [];
	private readonly listeners: RemoveListener[] = [];
	private readonly cacheVec2 = vec2.create();

	/** Constructor
	 * @param engine The engine instance
	 * @param canvas The canvas element we want the events from
	 * */
	constructor(public engine: Engine, private readonly canvas: HTMLCanvasElement) {}

	/** Dispatches an event to all controllers */
	private dispatch<K extends keyof Events>(name: K, ...args: Events[K]) {
		for (const controller of this.controllers) {
			controller.onEvent(name, args);
		}
	}

	/** Adds a listener with a remove function that removes itself */
	private addListener(
		target: EventTarget,
		name: string,
		handler: EventListener,
		options?: AddEventListenerOptions,
		list = this.listeners,
	): RemoveListener {
		const innerRemove = createListener(target, name, handler, options);
		const remove = () => {
			innerRemove();
			list.splice(list.indexOf(remove), 1);
		};

		list.push(remove);

		return remove;
	}

	/** Adds a listener to the canvas that is removed when the input is stopped */
	private addMetaListener(
		target: EventTarget,
		name: string,
		handler: EventListener,
		options?: AddEventListenerOptions,
	) {
		return this.addListener(target, name, handler, options, this.metaListeners);
	}

	/** Sets up listeners for meta events */
	private setupMetaEvents() {
		if (this.metaListeners.length) {
			return;
		}

		// Prevent page scroll
		this.addMetaListener(this.canvas, 'touchmove', ev => {
			if (ev.cancelable) { ev.preventDefault(); }
		});

		this.addMetaListener(this.canvas, 'contextmenu', ev => {
			if (ev.cancelable) { ev.preventDefault(); }
		});
	}

	/** Sets up listeners for input events */
	private setupEvents() {
		if (this.listeners.length) {
			return;
		}

		this.setupPanEvent();
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

	private transformCoordinates(xy: Vec2) {
		const rect = this.canvas.getBoundingClientRect();

		return vec2.set(this.cacheVec2, xy[0] - rect.left, xy[1] - rect.top) as Vec2;
	}

	/** Helper for handling events involving panning */
	private setupPanHandler(
		startPredicate: TestPointerDown,
		started = (pos: Vec2, button: number) => {},
		moved = (pos: Vec2, delta: Vec2, button: number) => {},
		ended = (touches: ActivePointers, pos: Vec2) => {},
	) {
		let id = 0;
		let button = -1;
		const lastXY = vec2.create();
		const xy = vec2.create();
		const delta = vec2.create();

		const start = (touches: ActivePointers, pointerId: number) => {
			const ev = touches.get(pointerId);

			id = pointerId;
			button = ev.button;

			vec2.set(lastXY, ev.clientX, ev.clientY);
			started(lastXY, button);
		};

		const move = (touches: ActivePointers, pointerId: number) => {
			if (pointerId !== id) {
				return;
			}

			const ev = touches.get(pointerId);

			vec2.set(xy, ev.clientX, ev.clientY);
			vec2.sub(delta, xy, lastXY);
			vec2.copy(lastXY, xy);

			moved(xy, delta, button);
		};

		const end = (touches: ActivePointers, pointerId: number) => {
			id = 0;
			button = -1;
			vec2.set(delta, 0, 0);
			ended(touches, lastXY);
		};

		this.setupPointerHandler(start, move, end, startPredicate);
	}

	private setupPanEvent() {
		this.setupPanHandler(
			(touches, id) => touches.size === 1,
			undefined,
			(pos: Vec2, delta: Vec2, button: number) => {
				this.dispatch('onMouseMove', this.transformCoordinates(pos), button, delta);
			},
		);
	}

	private setupClickEvent() {
		const MAX_DELTA_TIME = 250;
		const MAX_DELTA_SQ = 100;

		const startPosition = vec2.create();
		const delta = vec2.create();
		let startTime = 0;
		let deltaSq = 0;
		let button = -1;

		this.setupPanHandler(
			(touches, id) => touches.size === 1,
			(pos, btn) => {
				vec2.copy(startPosition, pos);

				startTime = performance.now();
				deltaSq = 0;
				button = btn;
			},
			(pos, delta, btn) => {
				deltaSq += delta[0] * delta[0] + delta[1] * delta[1];
			},
			(pointers, pos) => {
				if (pointers.size !== 0) {
					return;
				}

				vec2.sub(delta, pos, startPosition);

				const endTime = performance.now();
				const deltaTime = endTime - startTime;

				if (deltaTime > MAX_DELTA_TIME) {
					return;
				}

				if (deltaSq > MAX_DELTA_SQ) {
					return;
				}

				this.dispatch('onClick', this.transformCoordinates(pos), button, delta);
			},
		);
	}

	private setupPinchEvent() {
		const center = vec2.create();
		let aId = 0;
		let bId = 0;
		let startDistance = 0;
		let lastScale = 0;

		this.setupPointerHandler(
			(touches, id) => {
				[aId, bId] = [...touches.keys()];

				const a = touches.get(aId);
				const b = touches.get(bId);

				lastScale = 0;
				startDistance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
			},
			(touches, id) => {
				const a = touches.get(aId);
				const b = touches.get(bId);

				const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

				vec2.set(center, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);

				const eventScale = distance / startDistance;
				const scale = eventScale - lastScale;

				lastScale = eventScale - 1;

				this.dispatch('onPinch', this.transformCoordinates(center), scale);
			},
			() => {},
			(touches, id) => touches.size === 2,
		);
	}

	private setupRotateEvent() {
		const center = vec2.create();
		let aId = 0;
		let bId = 0;
		let lastRotation = 0;

		this.setupPointerHandler(
			(touches, id) => {
				[aId, bId] = [...touches.keys()];
				const a = touches.get(aId);
				const b = touches.get(bId);

				lastRotation = Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX) * (180 / Math.PI);
			},
			(touches, id) => {
				const a = touches.get(aId);
				const b = touches.get(bId);

				const rotation = Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX) * (180 / Math.PI);

				vec2.set(center, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);

				let delta = rotation - lastRotation;
				while (delta < -180) {
					delta += 360;
				}

				while (delta > 180) {
					delta -= 360;
				}

				lastRotation = rotation;

				this.dispatch('onRotate', this.transformCoordinates(center), delta);
			},
			() => {

			},
			(touches, id) => touches.size === 2,
		);
	}

	private setupWheelEvent() {
		const pos = vec2.create();
		const handler = (ev: WheelEvent) => {
			if (ev.cancelable) {
				ev.preventDefault();
			}

			let delta = ev.deltaY;
			if (delta === 0) {
				return;
			}

			const direction = Math.sign(delta);

			vec2.set(pos, ev.clientX, ev.clientY);

			this.dispatch('onMouseWheel', this.transformCoordinates(pos), delta, direction);
		};

		this.addListener(this.canvas, 'wheel', handler, { passive: false });
	}

	/** Starts input, sets up events */
	start() {
		this.setupMetaEvents();
		this.setupEvents();
	}

	/** Pauses input, removes listeners */
	pause() {
		this.removeListeners();
	}

	/** Stops input, removes all listeners */
	stop() {
		this.removeListeners(this.metaListeners);
		this.removeListeners();
	}

	/** Used to set up handlers for events involving pointers
	 * @param start The callback for when the event is started
	 * @param move The callback for when a pointer is moved
	 * @param end The callback for when the event is ended
	 * @param testPointerDown The test for if the event should be started on pointer down,
	 * called *after* pointer added to active pointers
	 * */
	setupPointerHandler(
		start: PointerEventCallback,
		move: PointerEventCallback,
		end: PointerEventCallback,
		testPointerDown: TestPointerDown,
	) {
		const activePointers: ActivePointers = new Map();
		let active = false;
		let removeMove: RemoveListener | null = null;
		let removeUp: RemoveListener | null = null;

		const clear = () => {
			activePointers.clear();

			removeUp?.();
			removeMove?.();

			removeUp = null;
			removeMove = null;

			active = false;
		};

		const pointerUp = (ev: PointerEvent) => {
			if (!activePointers.has(ev.pointerId)) {
				// Ignore other pointers

				return;
			}

			activePointers.delete(ev.pointerId);

			if (active) {
				end(activePointers, ev.pointerId);
			}

			clear();
		};

		const pointerMove = (ev: PointerEvent) => {
			if (activePointers.has(ev.pointerId)) {
				activePointers.set(ev.pointerId, ev);
			} else {
				// Ignore other pointers
				return;
			}

			if (active) {
				// Prevent page panning with touch
				if (ev.cancelable) { // Browser complains
					ev.preventDefault();
				}

				move(activePointers, ev.pointerId);
			}
		};

		const pointerDown = (ev: PointerEvent) => {
			activePointers.set(ev.pointerId, ev);

			if (activePointers.size > 0 && !removeMove && !removeUp) {
				removeUp = this.addListener(window, 'pointerup', pointerUp);
				removeMove = this.addListener(window, 'pointermove', pointerMove);
			}

			const test = testPointerDown(activePointers, ev.pointerId);
			if (!active && test) {
				active = true;

				start(activePointers, ev.pointerId);
			} else if (active && !test) {
				// Too many pointers
				end(activePointers, ev.pointerId);
				clear();
			}
		};

		this.addListener(this.canvas, 'pointerdown', pointerDown);
	}

	// eslint-disable-next-line class-methods-use-this
	/**
	 *
	 */
	update() {}

	/**
	 *
	 */
	registerController(controller: Controller) {
		const index = this.controllers.indexOf(controller);
		if (index === -1) {
			this.controllers.push(controller);

			return true;
		}

		return false;
	}

	/**
	 *
	 */
	unregisterController(controller: Controller) {
		const index = this.controllers.indexOf(controller);
		if (index !== -1) {
			this.controllers.splice(index, 1);

			return true;
		}

		return false;
	}

	// eslint-disable-next-line class-methods-use-this
	/**
	 *
	 */
	bind(...args: any[]) {}
}

globalThis.Input = Input;
export default Input;
