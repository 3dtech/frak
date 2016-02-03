/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */

(function(){
	var initializing = false;
	// var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	var fnTest = /\b_super\b/;

	// The base FrakClass implementation (does nothing)
	this.FrakClass = function(){};

	// Create a new FrakClass that inherits from this class
	FrakClass.extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn) {
				return function() {
					var tmp = this._super;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]) :
			prop[name];
		}

		prototype['_getset'] = function(member, fnBaseName) {
			var fnName;
			var getter = function() { return member; };
			var setter = function(value) { member = value; };

			fnName = 'get'+fnBaseName;
			if (fnName in prop) {
				prototype[fnName] = (function(fn) {
					return function() {
						var tmp = this._super;
						this._super = getter;
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(prop[fnName]);
			}
			else {
				prototype[fnName] = getter;
			}

			fnName = 'set'+fnBaseName;
			if (fnName in prop) {
				prototype[fnName] = (function(fn) {
					return function() {
						var tmp = this._super;
						this._super = setter;
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(prop[fnName]);
			}
			else {
				prototype[fnName] = setter;
			}
		};

		// The dummy class constructor
		function FrakClass() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		FrakClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		FrakClass.prototype.constructor = FrakClass;

		// And make this class extendable
		FrakClass.extend = arguments.callee;

		return FrakClass;
	};
})();

function FrakCallback(classScope, fnCallback) {
	return function() { return fnCallback.apply(classScope, arguments); };
};