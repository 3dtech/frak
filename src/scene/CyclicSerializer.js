import {FRAK, FrakClass} from '../FRAK';
import {Serializable} from "./Serializable";

/** Implements serialization of objects. Serializable objects are treated as special
 and their included/excluded function return values are used to decide which of their fields to serialize.
 Additionally Serializable objects are serialized uniquely, meaning that they are only serialized once by their id and
 they are always referenced.

 Uses following reserved properties of all objects:
 _visited_

 Additionally uses following reserved properties of Serializable objects:
 _id_
 _reference_
 _type_
 _properties_
 _root_
 _serializables_

 */
export class CyclicSerializer extends FrakClass {
	init() {
		this.serializables = {};	// All serializable objects found during serialization. These will be referenced by their respective IDs through reference type
		this.visited = [];
	}

	/** Constructs a serializable copy of an object */
	serializableCopy(stack, value, excluded, depth, maximumDepth) {
		if (depth >= maximumDepth) return {};

		stack = stack.slice(0);
		stack.push(value);

		try {
			// We have an object
			if (typeof value === 'object') {
				if (!value) return null;

				// Handle special case of serializable object
				if (value instanceof Serializable) {
					// If serialized copy of this serializable object doesn't exist, create a new one
					if (!this.serializables[value.id]) {
						this.serializables[value.id] = true;	// Set it to true immediately such that we break any cyclic references
						value.onBeforeSerialize();
						var fields = value.getSerializableFields(value, excluded);
						for (var f in fields) {
							fields[f] = this.serializableCopy(stack, fields[f], excluded, depth + 1, maximumDepth);
						}
						value.onAfterSerialize();
						this.serializables[value.id] = {'_type_': value.type(), '_properties_': fields};
					}

					return {"_reference_": true, "_id_": value.id};
				}
				// Handle arrays
				else if (value instanceof Array || value instanceof Float32Array) {
					var result = [];
					for (var f in value) {
						result.push(this.serializableCopy(stack, value[f], excluded, depth + 1, maximumDepth));
					}
					return result;
				}
				// Handle unknown type of object
				else {
					if (value._visited_) {
						console.warn('Already visited object: ', value);
						return;
					}
					value._visited_ = true;
					var fields = {};
					for (var f in value) {
						fields[f] = this.serializableCopy(stack, value[f], excluded, depth + 1, maximumDepth);
					}
					return fields;
				}
			}
			// Not an object, simply return the value
			else {
				return value;
			}
		} catch (e) {
			console.warn("Caught: ", value, e);
			console.warn("Stack: ");
			console.warn(stack);
			throw e;
		}
	}

	/** Serializes given object
	 @param object Object to be serialized
	 @param excluded Excluded fields for all objects
	 @return List of serializable attributes. Return true to include all fields. */
	serialize(object, excluded, maximumDepth) {
		this.serializables = {};	// Clear all serializable objects
		var r = this.serializableCopy([], object, excluded, 0, maximumDepth);
		return JSON.stringify({'_root_': r, '_serializables_': this.serializables}, undefined, 2);
	}

	/** Unserializes all serializable objects */
	unserializeSerializables(data) {
		for (var id in data) {
			this.serializables[id] = this.unserializeCopy(data[id]);
		}
	}

	/** Unserializes a parsed serialized object */
	unserializeCopy(v) {
		// Unserialize array
		if (v instanceof Array) {
			for (var p in v) {
				v[p] = this.unserializeCopy(v[p]);
			}
			return v;
		}
		// Unserialize object
		else if (v instanceof Object) {
			// This is a serializable object reference, store temporary reference
			if (v._reference_) {
				return v;
			}
			// This is an actual serialized Serializable object, unserialize it nice and proper (should only be found under _serializables_)
			else if (v._type_) {
				var t = new window[v._type_]();
				//console.log('unserialized: ', v._type_);
				t.onBeforeUnserialize();
				for (var p in v._properties_) {
					t[p] = this.unserializeCopy(v._properties_[p]);
				}
				return t;
			}
			// This is just a common object
			return v;
		}
		// Something atomic, just return it as it is
		else {
			return v;
		}
	}

	/** Resolve references to serializable objects */
	resolveReferences(object, key, depth) {
		if (depth > 32) return;
		if (object[key] instanceof Array) {
			// console.log(depth+' (a): ', key, object[key] instanceof Serializable);
			for (var p in object[key]) {
				this.resolveReferences(object[key], p, depth + 1);
			}
		} else if (object[key] instanceof Object && !('_visited_' in object[key])) {
			// Resolve the reference
			if (object[key]._reference_) {
				object[key] = this.serializables[object[key]._id_];
			} else if (object[key] instanceof Serializable) {
				object[key]._visited_ = true;
				this.visited.push(object[key]);

				for (var k in object[key]) {
					this.resolveReferences(object[key], k, depth + 1);
				}
			} else {
				//console.log('Not a serializable object: ', key, object[key]);
			}
		}
	}

	/** Unserializes data */
	unserialize(text) {
		var data = FRAK.parseJSON(text);
		this.serializables = {};
		// Unserialize all serializable objects (as much as possible)
		this.unserializeSerializables(data['_serializables_']);

		// Unserialize root object
		var unserialized = {_root_: this.unserializeCopy(data['_root_'])};

		this.resolveReferences(unserialized, '_root_', 0);

		// Resolve references to serializable objects
		for (var i in this.serializables) {
			this.resolveReferences(this.serializables, i, 0);
		}

		for (var i in this.visited) {
			if (this.visited[i] instanceof Serializable) {
				this.visited[i].onAfterUnserialize();
			}
		}

		// Remove _visited_ properties
		for (var i in this.visited) {
			delete this.visited[i]._visited_;
		}

		return unserialized['_root_'];
	}
}
