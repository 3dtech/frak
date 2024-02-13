import Manager from 'loading/Manager';
import TextManager from 'loading/TextManager';
import ShaderDescriptor from 'scene/descriptors/ShaderDescriptor';
import Shader from 'rendering/shaders/Shader';
import BuiltInShaders from 'rendering/shaders/BuiltInShaders';

/**
 * Used by AssetsManager to load shaders.
 */
class ShadersManager extends Manager {
	sourceCallback: any;
	context: any;
	builtin: any;
	shaderBundle: any;
	textManager: any;
	aliases: any;

	/**
	 * Constructor
	 * @param renderingContext Instance of RenderingContext
	 * @param assetsPath Default search path for any assets requested
	 */
	constructor(context, assetsPath?) {
		super(assetsPath);
		this.sourceCallback = function(source) {
			return source;
		};
		this.context = context;
		this.builtin = {};

		this.shaderBundle = 'webgl2';
		if (BuiltInShaders && this.shaderBundle in BuiltInShaders) {
			this.builtin = BuiltInShaders[this.shaderBundle];
		}
		this.setAliases();

		this.textManager = new TextManager();
	}

	setAliases(): any {
		this.aliases = {
			'lines': 'shaders/lines',
		};
	}

	bundle(shaderName): any {
		return `shaders/webgl2/${shaderName}`;
	}

	getSnippet(name: string): string {
		return BuiltInShaders['snippets'][`shaders/${name}`];
	}

	add(vertexSource, fragmentSource, definitions?): Shader {
		vertexSource = this.sourceCallback(vertexSource);
		fragmentSource = this.sourceCallback(fragmentSource);
		return this.addDescriptor(new ShaderDescriptor(vertexSource, fragmentSource, definitions));
	}

	/** Adds both vertex and fragment shader by appending .vert and .frag to source */
	addSource(source, definitions?): Shader {
		var alias = source.toLowerCase();
		if (alias in this.aliases)
			source = this.aliases[alias];
		source = this.sourceCallback(source);
		return this.addDescriptor(new ShaderDescriptor(source+'.vert', source+'.frag', definitions));
	}

	// Protected methods
	createResource(shaderDescriptor: ShaderDescriptor) {
		return new Shader(this.context, shaderDescriptor);
	}

	async loadResource(shaderDescriptor: ShaderDescriptor, shaderResource: Shader) {
		const descriptor = this.descriptorCallback(shaderDescriptor);

		if (this.builtin[descriptor.vertexSource] && this.builtin[descriptor.fragmentSource]) {
			// this shader is builtin so load it from memory
			console.log('Built in shader loaded:', descriptor.vertexSource, descriptor.fragmentSource);

			shaderResource.addVertexShader(this.builtin[descriptor.vertexSource]);
			shaderResource.addFragmentShader(this.builtin[descriptor.fragmentSource]);

			return [descriptor, shaderResource] as [ShaderDescriptor, Shader];
		} else {
			const vertexShader = this.textManager.add(this.path + descriptor.getVertexShaderPath());
			const fragmentShader = this.textManager.add(this.path + descriptor.getFragmentShaderPath());

			try {
				await this.textManager.load();
			} catch (e) {
				throw descriptor;
			}

			if (!vertexShader.data || !fragmentShader.data) {
				throw descriptor;
			}

			shaderResource.addVertexShader(vertexShader.data);
			shaderResource.addFragmentShader(fragmentShader.data);

			return [descriptor, shaderResource] as [ShaderDescriptor, Shader];
		}
	}
}

globalThis.ShadersManager = ShadersManager;
export default ShadersManager;
