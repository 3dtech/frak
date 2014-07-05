/** Base-class for classes that know their own type and can be cloned. */
var Cloneable=Class.extend({
	/** @return Type of object. Default returns false. */
	type: function() {
		return false;
	},
	
	/** Constructs a new object of this type with default values */
	clone: function() {
		return ( typeof window[this.type()] === 'function' ) ? 
              new window[this.type()]() : { };
	}
});