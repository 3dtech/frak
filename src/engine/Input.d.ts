// Helper types

/** Map of active pointers for events */
type ActivePointers = Map<number, PointerEvent>;

/** Removes a listener */
type RemoveListener = () => void;

/** Callback for pointer events
 * @param {ActivePointers} touches Map of active pointers
 * @param {number} id The id of the pointer that triggered the event
 * */
type PointerEventCallback = (touches: ActivePointers, id: number) => void;

/** Test if the event should be started on pointer down
 * @param {ActivePointers} touches Map of active pointers
 * @param {number} id The id of the pointer that was pressed
 *
 * @returns {boolean} True if the event should be started
 * */
type TestPointerDown = (touches: ActivePointers, id: number) => boolean;

/** Test if the event should be ended on pointer up
 * @param {ActivePointers} touches Map of active pointers **before** the last pointer was released
 * @param {number} id The id of the pointer that was released
 *
 * @returns {boolean} True if the event should be ended
 * */
type TestPointerUp = (touches: ActivePointers, id: number) => boolean;

type Vec2 = [number, number];
