import Cloneable from 'scene/Cloneable';
import Serializer from 'scene/Serializer';
import CyclicSerializer from 'scene/CyclicSerializer';
import FRAK from 'Helpers';

var nextSerializableID=1;

/** Base-class for (partially) serializable classes.
	The fields method must return a list of serializable
	attributes of the class. These attributes are then serialized
	with JSON.stringify, if they don't derive from Serializable.
	If they derive from Serializable class, a copy will be made
	from the original with only required fields. */
class Serializable extends Cloneable {
	serializable: boolean;
	id: number;

	constructor() {
		super();
		this.serializable=true;				//< If this flag is set to false, instance of serializable will not be serialized. Used for loading models
		this.id=nextSerializableID++;
	}

	/** @return List of serializable attributes. Return true to include all fields. */
	included(): string[] | boolean {
		return true;
	}

	/** @return Array of fields that will be excluded or true to exclude all fields.
		Note: If this.included returns true and excluded returns true then exception will be thrown by serialize method. */
	excluded(): string[] | boolean {
		return [];
	}

	/** @return An object with keys as field names that must be serialized */
	getSerializableFields(extraExcluded?: string[]): any {
		var included=this.included();
		var excluded=this.excluded();

		if(included===true && excluded===true) throw "Quantum classes not allowed. A subclass of Serializable tries to both include and exclude all fields.";
		if(included===false && excluded===false) throw "Quantum classes not allowed. A subclass of Serializable tries both not to include and not to exclude all fields.";
		if(included===false || excluded===true) return {};	 // Nothing to include, empty object will be serialized

		var fields: any={};
		var t: any;
		if(included===true) {
			// Add all existing fields
			for(t in this) {
				var getType = {};
				if(this[t] && getType.toString.call(this[t])=='[object Function]' || t=="serializable" || t=='_super') continue;
				fields[t]=this[t];
			}
			if(excluded instanceof Array) {
				excluded=excluded.concat(extraExcluded);
				for(var e=0; e<excluded.length; e++) {
					if(fields[excluded[e]]) delete fields[excluded[e]];
				}
			}
		}

		return fields;
	}

	/** Serializes class taking into account the properties that are included and excluded */
	serialize(excluded?: string[]): any {
		try {
			var serializer=new Serializer();
			return serializer.serialize(this, excluded, 32);
		}
		catch(e) {
			console.warn("Caught serialization exception: ", e);
			throw e;
		}
	}

	/** Unserializes data */
	unserialize(text): any {
		var data = FRAK.parseJSON(text);
		return false;
	}

	/** Serializes data fully including cyclic references */
	serializeCyclic(excluded): any {
		try {
			var serializer=new CyclicSerializer();
			return serializer.serialize(this, excluded, 32);
		}
		catch(e) {
			console.warn("Caught serialization exception: ", e);
			throw e;
		}
	}

	/** Serializes data fully including cyclic references */
	unserializeCyclic(text): any {
		try {
			var serializer=new CyclicSerializer();
			return serializer.unserialize(text);
		}
		catch(e) {
			console.warn("Caught serialization exception: ", e);
			throw e;
		}
	}

	/** Called immediately before the object and all its properties will be serialized */
	onBeforeSerialize(): any {}

	/** Called immediately before the object and all its properties will be serialized */
	onAfterSerialize(): any {}

	/** Called immediately after the object has been created when unserializing it, but none of its properties have been unserialized */
	onBeforeUnserialize(): any {}

	/** Called immediately after the object and all its properties have been unserialized */
	onAfterUnserialize() {}
}

globalThis.Serializable = Serializable;
export default Serializable;
