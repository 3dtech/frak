

/** Base-class for classes that know their own type and can be cloned. */

class Cloneable {

	
	/** @return Type of object. Default returns false. */
	type(): any {
		return false;
	}
	
	/** Constructs a new object of this type with default values */
	clone() {
		return ( typeof window[this.type()] === 'function' ) ? 
              new window[this.type()]() : { };
	}

}

globalThis.Cloneable = Cloneable;

export default Cloneable;