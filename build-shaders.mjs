/**
 * Builds FRAK bundled shaders
 * run: node build-shaders
 */

import { readdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path/posix';

const OUTPUT_PATH = './src/rendering/shaders/BuiltInShaders.ts';
const ASSETS_PATH = './assets';
const ASSETS_RELATIVE_PATH = relative(dirname(OUTPUT_PATH), ASSETS_PATH);
const EXTENSION_FILTER = ['.vert', '.frag', '.glsl'];

const profiles = {
	'webgl2': './assets/shaders',
	'snippets': './assets/shaders/snippets',
};

async function main() {
	let output = {};

	for (let profile in profiles) {
		console.log('Bundling profile: %s', profile);
		output[profile] = {};
		let shadersPath = profiles[profile];
		let bundleBasePath = relative(ASSETS_PATH, shadersPath);

		try {
			let files = await readdir(shadersPath);
			for (let file of files) {
				if (EXTENSION_FILTER.indexOf(extname(file)) === -1)
					continue;

				output[profile][join(bundleBasePath, file)] = file.replace(/\./, "_");
			}
		}
		catch (err) {
			console.log(err);
		}
	}

	let js = `// @ts-nocheck: Imports are fine with esbuild and TS doesn't let us turn off a single error type\n`;
	for (let profile in output) {
		for (const [path, shader] of Object.entries(output[profile])) {
			js += `import ${shader} from '${ASSETS_RELATIVE_PATH}/${path}';\n`;
		}
	}

	js += `\nconst BuiltInShaders = {\n`;

	for (let profile in output) {
		js += `\t'${profile}': {\n`;
		for (const [path, shader] of Object.entries(output[profile])) {
			js += `\t\t'${path}': ${shader},\n`;
		}
		js += `\t},\n`;
	}

	js += `};\n\nglobalThis.BuiltInShaders = BuiltInShaders;\nexport default BuiltInShaders;\n`;

	await writeFile(OUTPUT_PATH, js);
}

main().then(() => {
	console.log(`Shaders written to ${OUTPUT_PATH}`);
});
