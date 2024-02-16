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
		this.setupPointerEvents();
	}

	setupPointerEvents() {
		this.canvas.addEventListener('touchmove', ev => ev.preventDefault());
		this.canvas.addEventListener('contextmenu', ev => ev.preventDefault());

		this.setupPanEvents();
	}

	setupPointerEvent(
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

	setupPanEvent(
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
			id = pointerId;
			button = touches[pointerId].button;

			vec2.set(lastXY, touches[pointerId].clientX, touches[pointerId].clientY);
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
				if (button === -1) {
					controller.onPan(null, delta);
				} else {
					controller.onMouseMove(null, button, delta);
				}
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

	setupMouseEvent(button: number) {
		let started = false;

		// We want to listen to mouse events even when more buttons are pressed
		this.setupPanEvent(
			(touches, id) =>
				started ||
				(touches[id].button === button && touches[id].pointerType === 'mouse'),
			() => {
				started = true;
			},
			() => {
				started = false;
			},
		);
	}

	setupPanEvents() {
		this.setupMouseEvent(0);
		this.setupMouseEvent(2);

		this.setupPanEvent((touches, id) => Object.keys(touches).length === 1);
	}

	setupPinchEvent() {}

	update() {}

	registerController(controller: Controller) {
		this.controllers.push(controller);
	}

	bind(...args: any[]) {

	}
}

globalThis.Input = Input;
export default Input;
