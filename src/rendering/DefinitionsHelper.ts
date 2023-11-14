import {stringHash} from "../Helpers";

class DefinitionsHelper {
	hash = 0;

	constructor(public definitions: string[] = []) {}

	/** Add a #define, replacing an existing one if needed */
	addDefinition(name: string, value?: string) {
		const definition = `${name}${value ? ` ${value}` : ''}`;
		// Remove existing definition if value is provided
		if (value) {
			for (let i = 0; i < this.definitions.length; i++) {
				if (this.definitions[i].startsWith(`${name} `)) {
					this.hash ^= stringHash(this.definitions[i]);	// Remove hash
					this.definitions.splice(i, 1);
					break;
				}
			}
		}

		// Add new definition
		if (value || this.definitions.indexOf(definition) === -1) {
			this.definitions.push(definition);
			this.hash ^= stringHash(definition);
		}
	}
}

globalThis.DefinitionsHelper = DefinitionsHelper;
export default DefinitionsHelper;
