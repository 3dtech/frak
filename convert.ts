/** Files to be transformed manually:
FRAK
Version
DataParserNode
DataParserTypes
DownloadBinary
CollectionUtils
Color
ScreenQuad
SamplerAccumulator
BuiltInShaders
AttributeLocations
Primitives
TerrainMesh
 */

interface SourceFile {
	directory: string;
	extension?: string;
	name: string;
	path: string;
}

const srcPath = '../frak/src/';
const dstPath = 'src/';
const files = [];

const directories = [''];
for (const directory of directories) {
	const sourcePath = srcPath + directory;
	for await (const entry of Deno.readDir(sourcePath)) {
		const path = directory + entry.name;
		if (entry.isDirectory) {
			directories.push(path + '/');
		} else {
			const { extension, name } = /^(?<name>.*?)(?:\.(?<extension>.*))?$/.exec(entry.name)!.groups!;
			files.push({
				directory,
				extension,
				name,
				path,
			});
		}
	}
}

const imports: {[className: string]: string} = {};
async function parseImports(file: SourceFile) {
	const data = await Deno.readTextFile(srcPath + file.path);
	const classMatch = /^(?<preamble>[^]*?)(?:var|const|let)\s+(?<className>\w+)\s*=\s*(?<super>\w+)\.extend\s*\((?<content>[^]*)\)/.exec(data);
	if (classMatch) {
		imports[classMatch.groups!.className] = file.path;
	}

	return [data, file];
}

function transform(data: string, file: SourceFile) {
	const classMatch = /^(?<preamble>[^]*?)(?:var|const|let)\s+(?<className>\w+)\s*=\s*(?<super>\w+)\.extend\s*\((?<content>[^]*)\)/.exec(data);

	let out = data;
	const usedImports = [];
	if (classMatch) {
		const { className, content, preamble, super: superClass } = classMatch.groups!;

		if (superClass !== 'FrakClass') {
			usedImports.push(superClass);
		}

		let classContent = `class ${className}${superClass !== 'FrakClass' ? ` extends ${superClass}` : ''} {`;
		classContent += '}';

		out = `${
			usedImports.map(i => `import ${i} from '/${imports[i]}'`).join('\n')
		}

		${preamble}
		${classContent}

		globalThis.${className} = ${className}`;
	}

	return out;
}

async function parseFile(data: string, file: SourceFile) {
	await Deno.mkdir(dstPath + file.directory, { recursive: true });

	data = transform(data, file);

	await Deno.writeTextFile(`${dstPath + file.directory + file.name}.ts`, data);
}

(await Promise.all(files.map(parseImports))).forEach(([data, file]) => parseFile(data as string, file as SourceFile));
