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

interface File {
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

function transform(data: string, file: File) {
	const classMatch = /^(?<preamble>[^]*?)(?:var|const|let)\s+(?<className>\w+)\s*=\s*(?<super>\w+)\.extend\s*\((?<content>[^]*)\)/.exec(data);

	let out = data;
	if (classMatch) {
		const { className, content, preamble, super: superClass } = classMatch.groups!;

		out = preamble;
	}

	return out;
}

async function parseFile(file: File) {
	await Deno.mkdir(dstPath + file.directory, { recursive: true });

	const source = await Deno.readTextFile(srcPath + file.path);

	const data = transform(source, file);

	await Deno.writeTextFile(`${dstPath + file.directory + file.name}.ts`, data);
}

files.forEach(parseFile);
