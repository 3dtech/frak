import Engine from './Engine';
import Controller from '../scene/components/Controller';

type ActivePointers = { [key: number]: PointerEvent };

class Input {
	private controllers: Controller[] = [];

	/** Constructor
		@param engine The engine instance
		@param canvas The canvas element we want the events from
	*/
	constructor(public engine: Engine, private canvas: HTMLCanvasElement) {
		this.setupEvents();
	}

	private setupEvents() {
		// Prevent page scroll
		this.canvas.addEventListener('touchmove', ev => ev.preventDefault());
		this.canvas.addEventListener('contextmenu', ev => ev.preventDefault());

		this.setupPanEvents();
		this.setupWheelEvent();
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

	/** Helper for handling panning */
	private setupPanEvent(
		startPredicate: (touches: ActivePointers, id: number) => boolean,
		started = () => {},
		ended = () => {},
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
			started();
		}

		const move = (touches: ActivePointers, pointerId: number) => {
			if (pointerId !== id) {
				return;
			}

			vec2.set(xy, touches[pointerId].clientX, touches[pointerId].clientY);
			vec2.sub(delta, xy, lastXY);
			vec2.copy(lastXY, xy);

			for (const controller of this.controllers) {
				// TODO: Pass along info about touch (legacy onPan isn't great, so let's break compatibility)
				controller.onMouseMove(null, button, delta);
			}
		}

		const end = (touches: ActivePointers, pointerId: number) => {
			id = 0;
			button = -1;
			ended();
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
		// Mouse panning
		this.setupPanEvent(
			(touches, id) => touches[id].pointerType === 'mouse',
		);

		// Single touch panning
		this.setupPanEvent(
			(touches, id) =>
				Object.values(touches).filter(t => t.pointerType === 'touch').length === 1
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

			for (const controller of this.controllers) {
				controller.onMouseWheel(null, delta, direction);
			}
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
