/**
 * Builds FRAK bundled shaders
 * run: node build-shaders
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const OUTPUT_PATH = './src/rendering/shaders/BuiltInShaders.ts';
const BUNDLE_RELATIVE_PATH = './assets';
const EXTENSION_FILTER = ['.vert', '.frag', '.glsl'];

let profiles = {
	'webgl2': './assets/shaders',
	'snippets': './assets/shaders/snippets',
};

async function main() {
	let output = {};

	for (let profile in profiles) {
		console.log('Bundling profile: %s', profile);
		output[profile] = {};
		let shadersPath = profiles[profile];
		let bundleBasePath = path.posix.relative(BUNDLE_RELATIVE_PATH, shadersPath);

		try {
			let files = await readdir(shadersPath);
			for (let file of files) {
				if (EXTENSION_FILTER.indexOf(path.extname(file)) == -1)
					continue;
				let relativePath = path.join(shadersPath, file);
				output[profile][path.posix.join(bundleBasePath, file)] = {
					name: file.replace(/\./, "_"),
					relativePath,
				};
			}
		}
		catch (err) {
			console.log(err);
		}
	}

	let js = `// @ts-nocheck: Imports are fine with esbuild and TS doesn't let us turn off a single error type\n`;
	for (let profile in output) {
		for (const [path, shader] of Object.entries(output[profile])) {
			js += `import ${shader.name} from '../../../assets/${path}';\n`;
		}
	}

	js += `\nconst BuiltInShaders = {\n`;

	for (let profile in output) {
		js += `	'${profile}': {\n`;
		for (const [path, shader] of Object.entries(output[profile])) {
			js += `		'${path}': ${shader.name},\n`;
		}
		js += `	},\n`;
	}

	js += `};\n\nglobalThis.BuiltInShaders = BuiltInShaders;\nexport default BuiltInShaders;\n`;

	await writeFile(OUTPUT_PATH, js);
	console.log('Output written to %s', OUTPUT_PATH);
}

main();
