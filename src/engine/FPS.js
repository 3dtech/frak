import { FRAK, FrakClass } from '../FRAK';

/** FPS class manages frame time measurements.
 * Its instance is accessible from Engine where it is used
 * to measure time spent on drawing a frame and weighted average frames
 * per second. */
export default class FPS extends FrakClass {
  init() {
    this.frametime = 0.0; // Average frametime is 0 at first
    this.lastMeasurement = (new Date()).getTime(); // Store current time
    this.averageMultiplier = 0.95; // Interpolation multiplier of current average value during measurement
    this.delta = 0.0;
  }

  /** Measures time since last call to measure or from init. */
  measure() {
    const current = FRAK.timestamp();
    if (current - this.lastMeasurement > 0) {
      this.frametime = this.frametime * this.averageMultiplier + this.delta * (1.0 - this.averageMultiplier);
      this.delta = current - this.lastMeasurement;
    }
    this.lastMeasurement = current;
  }

  /** Gets currently measured average FPS */
  getAverage() {
    if (this.frametime <= 0.0) return 0.0;
    return 1000.0 / this.frametime;
  }

  /** Gets time in milliseconds that has passed between two last calls to measure() */
  getDelta() {
    return this.delta;
  }
}
