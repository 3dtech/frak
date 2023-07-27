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
const files: SourceFile[] = [];

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

function transform(data: string, _file: SourceFile) {
	const classMatch = /^(?<preamble>[^]*?)(?:var|const|let)\s+(?<className>\w+)\s*=\s*(?<super>\w+)\.extend\s*\((?<content>[^]*)\)/.exec(data);

	let out = data;
	const usedImports: Set<string> = new Set();
	if (classMatch) {
		const { className, content, preamble, super: superClass } = classMatch.groups!;

		if (superClass !== 'FrakClass') {
			usedImports.add(superClass);
		}

		let innerContent = content;
		const contentMatch = /{(?<inner>[^]*)}/.exec(content);
		if (contentMatch) {
			innerContent = contentMatch.groups!.inner;
		}

		const members = new Set([...innerContent.matchAll(
				/this\.(?<member>[\w\d_]+)\s*?=/g
			)].map(m => m.groups!.member));

		[...innerContent.matchAll(
			/\s(?<name>[A-Z][\w\d_]*)/g
		)].forEach(i => usedImports.add(i.groups!.name));

		innerContent = innerContent
			.replace(/(?<name>[\w\d_]+):\s*function\s*\((?<args>.*?)\)\s*{(?<content>[^]*?)},/g, (...args) => {
				const groups = args[args.length - 1];
				const name = groups.name !== 'init' ? groups.name : 'constructor';
				const content = groups.content.replace(
					'this._super',
					() => name === 'constructor' ? 'super' : `super.${name}`
				);

				return `${name}(${groups.args})${name !== 'constructor' ? ': any' : ''} {${content}}`;
			})
			.replace(/(?<name>[\w\d_]+):\s*?function/, '$<name>');	// Last function

		const classContent =
`class ${className}${superClass !== 'FrakClass' ? ` extends ${superClass}` : ''} {
${
	[...members].map(m => `\t${m}: any;`).join('\n')
}
	${innerContent}
}`;

	out =
`${
	[...usedImports]
		.filter(i => i !== className && !!imports[i])
		.map(i => `import ${i} from '${imports[i]}'`)
		.join('\n')
}

${preamble}
${classContent}

globalThis.${className} = ${className};

export default ${className};`;
	}

	return out;
}

async function parseFile(data: string, file: SourceFile) {
	await Deno.mkdir(dstPath + file.directory, { recursive: true });

	data = transform(data, file);

	await Deno.writeTextFile(`${dstPath + file.directory + file.name}.ts`, data);
}

(await Promise.all(files.map(parseImports))).forEach(([data, file]) => parseFile(data as string, file as SourceFile));
