import {Cloneable} from "./Cloneable";
import {Serializer} from "./Serializer";
import {CyclicSerializer} from "./CyclicSerializer";

/** Base-class for (partially) serializable classes.
 The fields method must return a list of serializable
 attributes of the class. These attributes are then serialized
 with JSON.stringify, if they don't derive from Serializable.
 If they derive from Serializable class, a copy will be made
 from the original with only required fields. */
var nextSerializableID = 1;

export class Serializable extends Cloneable {
	init() {
		this.serializable = true;				//< If this flag is set to false, instance of serializable will not be serialized. Used for loading models
		this.id = nextSerializableID++;
	}

	/** @return List of serializable attributes. Return true to include all fields. */
	included() {
		return true;
	}

	/** @return Array of fields that will be excluded or true to exclude all fields.
	 Note: If this.included returns true and excluded returns true then exception will be thrown by serialize method. */
	excluded() {
		return [];
	}

	/** @return An object with keys as field names that must be serialized */
	getSerializableFields(extraExcluded) {
		var included = this.included();
		var excluded = this.excluded();

		if (included === true && excluded === true) throw "Quantum classes not allowed. A subclass of Serializable tries to both include and exclude all fields.";
		if (included === false && excluded === false) throw "Quantum classes not allowed. A subclass of Serializable tries both not to include and not to exclude all fields.";
		if (included === false || excluded === true) return {};	 // Nothing to include, empty object will be serialized

		var fields = {};
		if (included === true) {
			// Add all existing fields
			for (var t in this) {
				var getType = {};
				if (this[t] && getType.toString.call(this[t]) == '[object Function]' || t == "serializable" || t == '_super') continue;
				fields[t] = this[t];
			}
			if (excluded instanceof Array) {
				excluded = excluded.concat(extraExcluded);
				for (var e = 0; e < excluded.length; e++) {
					if (fields[excluded[e]]) delete fields[excluded[e]];
				}
			}
		}
		if (excluded === true) {
			fields = [];
			for (var i = 0; i < included.length; i++) {
				var t = included[i];
				var getType = {};
				if (this[t] && getType.toString.call(this[t]) == '[object Function]' || t == "serializable" || t == '_super') continue;
				fields[t] = this[t];
			}
		}

		return fields;
	}

	/** Serializes class taking into account the properties that are included and excluded */
	serialize(excluded) {
		try {
			var serializer = new Serializer();
			return serializer.serialize(this, excluded, 32);
		} catch (e) {
			console.warn("Caught serialization exception: ", e);
			throw e;
		}
	}

	/** Unserializes data */
	unserialize(text) {
		var data = FRAK.parseJSON(text);
		return false;
	}

	/** Serializes data fully including cyclic references */
	serializeCyclic(excluded) {
		try {
			var serializer = new CyclicSerializer();
			return serializer.serialize(this, excluded, 32);
		} catch (e) {
			console.warn("Caught serialization exception: ", e);
			throw e;
		}
	}

	/** Serializes data fully including cyclic references */
	unserializeCyclic(text) {
		try {
			var serializer = new CyclicSerializer();
			return serializer.unserialize(text);
		} catch (e) {
			console.warn("Caught serialization exception: ", e);
			throw e;
		}
	}

	/** Called immediately before the object and all its properties will be serialized */
	onBeforeSerialize() {
	}

	/** Called immediately before the object and all its properties will be serialized */
	onAfterSerialize() {
	}

	/** Called immediately after the object has been created when unserializing it, but none of its properties have been unserialized */
	onBeforeUnserialize() {
	}

	/** Called immediately after the object and all its properties have been unserialized */
	onAfterUnserialize() {
	}
}
