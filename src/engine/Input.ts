import Engine from './Engine';
import Controller, { Events } from '../scene/components/Controller';

type ActivePointers = { [key: number]: PointerEvent };

// TODO: Multi-touch, pause handling

class Input {
	private controllers: Controller[] = [];

	/** Constructor
		@param engine The engine instance
		@param canvas The canvas element we want the events from
	*/
	constructor(public engine: Engine, private canvas: HTMLCanvasElement) {
		this.setupEvents();
	}

	private dispatch<K extends keyof Events>(name: K, ...args: Events[K]) {
		for (const controller of this.controllers) {
			controller.onEvent(name, args);
		}
	}

	private setupEvents() {
		// Prevent page scroll
		this.canvas.addEventListener('touchmove', ev => ev.preventDefault());
		this.canvas.addEventListener('contextmenu', ev => ev.preventDefault());

		this.setupPanEvents();
		this.setupWheelEvent();
		this.setupClickEvent();
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

		// We only listen for this once the first pointer is down, to ignore other pointerup events from other elements
		const pointerUp = (ev: PointerEvent) => {
			const test = testPointerUp(activePointers, ev.pointerId);

			delete activePointers[ev.pointerId];

			if (Object.keys(activePointers).length === 0) {
				document.removeEventListener('pointerup', pointerUp);
			}

			if (active && test) {
				active = false;
				document.removeEventListener('pointermove', pointerMove);

				end(activePointers, ev.pointerId);
			}
		};

		const pointerMove = (ev: PointerEvent) => {
			// Prevent page panning with touch
			ev.preventDefault();

			activePointers[ev.pointerId] = ev;
			move(activePointers, ev.pointerId);
		};

		const pointerDown = (ev: PointerEvent) => {
			activePointers[ev.pointerId] = ev;

			if (Object.keys(activePointers).length === 1) {
				document.addEventListener('pointerup', pointerUp);
			}

			const test = testPointerDown(activePointers, ev.pointerId);
			if (!active && test) {
				active = true;
				document.addEventListener('pointermove', pointerMove);

				start(activePointers, ev.pointerId);
			} else if (active && !test) {
				active = false;
				document.removeEventListener('pointermove', pointerMove);

				end(activePointers, ev.pointerId);
			}
		};

		this.canvas.addEventListener('pointerdown', pointerDown);
	}

	/** Helper for handling events involving panning */
	private setupPanEvent(
		startPredicate: (touches: ActivePointers, id: number) => boolean,
		started = (pos: [number, number], button: number) => {},
		moved = (delta: [number, number], button: number) => {},
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

			moved(delta, button);
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
			(delta: [number, number], button: number) => {
				// TODO: Pass along info about touch (legacy onPan isn't great, so let's break compatibility)
				this.dispatch('onMouseMove', null, button, delta);
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
			(touches, id) => true,
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

	setupPinchEvent() {}

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

		this.canvas.addEventListener('wheel', handler, { passive: false });
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
