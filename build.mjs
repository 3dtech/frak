import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative } from "node:path";
import { argv, exit } from "node:process";
import { fileURLToPath } from "node:url";
import pkg from "./package.json" with { type: "json" };

import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let wasmPlugin = {
	name: "wasm",
	setup(build) {
		// Resolve ".wasm" files to a path with a namespace
		build.onResolve({ filter: /\.wasm$/ }, (args) => {
			let relativePath = relative(
				__dirname,
				isAbsolute(args.path)
					? args.path
					: join(args.resolveDir, args.path),
			);

			// If this is the import inside the stub module, import the
			// binary itself. Put the path in the "wasm-binary" namespace
			// to tell our binary load callback to load the binary file.
			if (args.namespace === "wasm-stub") {
				return {
					path: relativePath,
					namespace: "wasm-binary",
				};
			}

			// Otherwise, generate the JavaScript stub module for this
			// ".wasm" file. Put it in the "wasm-stub" namespace to tell
			// our stub load callback to fill it with JavaScript.
			//
			// Resolve relative paths to absolute paths here since this
			// resolve callback is given "resolveDir", the directory to
			// resolve imports against.
			if (args.resolveDir === "") {
				return; // Ignore unresolvable paths
			}

			return {
				path: relativePath,
				namespace: "wasm-stub",
			};
		});

		// Virtual modules in the "wasm-stub" namespace are filled with
		// the JavaScript code for compiling the WebAssembly binary. The
		// binary itself is imported from a second virtual module.
		build.onLoad(
			{
				filter: /.*/,
				namespace: "wasm-stub",
			},
			async (args) => ({
				contents: `import wasm from ${JSON.stringify(args.path)}
        export default (imports) =>
          WebAssembly.instantiate(wasm, imports).then(
            result => result.instance.exports)`,
			}),
		);

		// Virtual modules in the "wasm-binary" namespace contain the
		// actual bytes of the WebAssembly file. This uses esbuild's
		// built-in "binary" loader instead of manually embedding the
		// binary data inside JavaScript code ourselves.
		build.onLoad(
			{
				filter: /.*/,
				namespace: "wasm-binary",
			},
			async (args) => ({
				contents: await readFile(args.path),
				loader: "binary",
			}),
		);
	},
};

const module = argv.includes("--module");
for (const v of ["debug", "min"]) {
	const OUTPUT_PATH = `builds/frak${module ? "" : `-${pkg.version}.${v}`}.js`;

	build({
		entryPoints: ["src/entry.ts"],
		bundle: true,
		format: module ? "esm" : "iife",
		minify: v === "min",
		outfile: OUTPUT_PATH,
		plugins: [wasmPlugin],
		loader: {
			".glsl": "text",
			".frag": "text",
			".vert": "text",
		},
	})
	.then(() => {
		console.log(`Build written to ${OUTPUT_PATH}`);
	})
	.catch(() => exit(1));
}
