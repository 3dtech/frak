/** Base-class for classes that know their own type and can be cloned. */
class Cloneable {
	/** @return Type of object. Default returns false. */
	type(): string | false {
		return false;
	}

	/** Constructs a new object of this type with default values */
	clone() {
		const type = this.type();
		return (type && typeof window[type] === 'function') ?
			new (window as any)[type]() : {};
	}
}

globalThis.Cloneable = Cloneable;
export default Cloneable;
