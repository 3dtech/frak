import {FrakClass} from "../FRAK";

/** Base-class for classes that know their own type and can be cloned. */
export class Cloneable extends FrakClass {
	/** @return Type of object. Default returns false. */
	type() {
		return false;
	}
	
	/** Constructs a new object of this type with default values */
	clone() {
		return ( typeof window[this.type()] === 'function' ) ? 
              new window[this.type()]() : { };
	}
}
