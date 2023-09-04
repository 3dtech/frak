import Serializable from 'scene/Serializable';
import FRAK from 'FRAK';

/** Implements serialization of objects. Serializable objects are treated as special
	and their included/excluded function return values are used to decide which of their fields to serialize.
	This Serializer does NOT serialize Serializable objects uniquely and does not support any cyclic references.

	Uses following reserved properties of all objects:
	_visited_

	Additionally uses following reserved properties of Serializable objects:
	_id_
	_type_
	_properties_

	*/

class Serializer {
	serializables: any;

	constructor() {
		this.serializables={};	// All serializable objects found during serialization. These will be referenced by their respective IDs through reference type
	}

	/** Constructs a serializable copy of this object */
	serializableCopy(stack, value, excluded, depth, maximumDepth): any {
		var result={};
		var fields=value.getSerializableFields(excluded);

		if(depth>=maximumDepth) {
			var trace=[];
			for(var s in stack) {
				trace.push(stack[s].type());
			}
			throw "Reached maximum depth for serialization: "+depth+" at "+value.type();
		}

		stack=stack.slice(0);
		stack.splice(0, 0, value);

		for(var f in fields) {
			var field=fields[f];

			if(field instanceof Serializable) result[f]=this.serializableCopy(stack, field, excluded, depth+1, maximumDepth);
			else if(field instanceof Array || field instanceof Float32Array) {
				var arrayResult=[];
				for(var i in field) {
					if(field[i] instanceof Serializable) {
						arrayResult.push(this.serializableCopy(stack, field[i], excluded, depth+1, maximumDepth));
					}
					else arrayResult.push(field[i]);
				}
				result[f]=arrayResult;
			}
			else result[f]=fields[f];
		}

		return {"_type_": value.type(), "_properties_": result};
	}

	/** Serializes given object
		@param object Object to be serialized
		@param excluded Excluded fields for all objects
		@return List of serializable attributes. Return true to include all fields. */
	serialize(object, excluded, maximumDepth): any {
		this.serializables={};	// Clear all serializable objects
		var r=this.serializableCopy([], object, excluded, 0, maximumDepth);
		return JSON.stringify({'_root_': r, '_serializables_': this.serializables}, undefined, 2);
	}

	/** Unserializes all serializable objects */
	unserializeSerializables(data): any {
		for(var id in data) {
			this.serializables[id]=this.unserializeCopy(data[id]);
		}
	}

	/** Unserializes a parsed serialized object */
	unserializeCopy(v): any {
		// Unserialize array
		if(v instanceof Array) {
			for(var p in v) {
				v[p]=this.unserializeCopy(v[p]);
			}
			return v;
		}
		// Unserialize object
		else if(v instanceof Object) {
			// This is a serializable object reference, store temporary reference
			if(v._reference_) {
				return v;
			}
			// This is an actual serialized Serializable object, unserialize it nice and proper (should only be found under _serializables_)
			else if(v._type_) {
				var t=new (window as any)[v._type_]();
				t.onBeforeUnserialize();
				for(var p in v._properties_) {
					t[p]=this.unserializeCopy(v._properties_[p]);
				}
				t.onAfterUnserialize();
				return t;
			}
			// This is just a common object
			return v;
		}
		// Something atomic, just return it as it is
		else {
			return t;
		}
	}

	/** Resolve references to serializable objects */
	resolveReferences(object, key): any {
		if(object[key] instanceof Array) {
			for(var p in object[key]) {
				object[key][p]=this.resolveReferences(object[key], p);
			}
		}
		else if(object[key] instanceof Object) {
			// Resolve the reference
			if(object[key]._reference_) {
				object[key]=this.serializables[object[key]._id_];
			}
			else {
				for(var p in object[key]) {
					object[key][p]=this.resolveReferences(object[key], p);
				}
			}
		}
	}

	/** Unserializes data */
	unserialize(text) {
		var data = FRAK.parseJSON(text);
		this.serializables={};
		// Unserialize all serializable objects (as much as possible)
		this.unserializeSerializables(data['_serializables_']);

		// Unserialize root object
		var unserialized=this.unserializeCopy(data['_root_']);

		// Resolve references to serializable objects
		for(var i in this.serializables) {
			this.resolveReferences(this.serializables, i);
		}
		this.resolveReferences(data, '_serializables_');

		return unserialized;
	}

}

globalThis.Serializer = Serializer;

export default Serializer;
