import {stringHash} from "../Helpers";

class DefinitionsHelper {
	hash = 0;

	constructor(public definitions: string[] = [], private hashPrefix = '') {
		for (const definition of definitions) {
			this.hash ^= stringHash(`${hashPrefix}${definition}`);
		}
	}

	removeDefinition(name: string, hasValue = false) {
		const test = (v: string) => {
			if (hasValue) {
				return v.startsWith(`${name} `);
			} else {
				return v === name;
			}
		};

		for (let i = 0; i < this.definitions.length; i++) {
			if (test(this.definitions[i])) {
				this.hash ^= stringHash(`${this.hashPrefix}${this.definitions[i]}`);	// Remove hash
				this.definitions.splice(i, 1);

				break;
			}
		}
	}

	/** Add a #define, replacing an existing one if needed */
	addDefinition(name: string, value?: string) {
		const hasValue = value !== undefined;
		const definition = `${name}${hasValue ? ` ${value}` : ''}`;

		this.removeDefinition(name, hasValue);

		this.definitions.push(definition);
		this.hash ^= stringHash(`${this.hashPrefix}${definition}`);	// Add hash
	}

	clone() {
		return new DefinitionsHelper(this.definitions.slice(), this.hashPrefix);
	}
}

globalThis.DefinitionsHelper = DefinitionsHelper;
export default DefinitionsHelper;
