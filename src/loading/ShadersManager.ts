import Manager from 'loading/Manager.js'
import RenderingContext from 'rendering/RenderingContext.js'
import TextManager from 'loading/TextManager.js'
import ShaderDescriptor from 'scene/descriptors/ShaderDescriptor.js'
import Shader from 'rendering/shaders/Shader.js'

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

		this.shaderBundle = context.isWebGL2() ? 'webgl2' : 'default';
		if (BuiltInShaders && this.shaderBundle in BuiltInShaders) {
			this.builtin = BuiltInShaders[this.shaderBundle];
		}
		this.setAliases();

		this.textManager = new TextManager();
	}

	setAliases(): any {
		this.aliases = {
			'diffuse': this.bundle('diffuse'),
			'normalmapped': this.bundle('normalmapped'),
			'transparent': this.bundle('transparent'),
			'reflective': this.bundle('reflective'),
			'reflective_masked': this.bundle('reflective_masked'),
			'lines': this.bundle('lines'),
			'pbr': this.bundle('pbr'),

			// The following are deprecated:
			'test': this.bundle('test'),
			'fallback': this.bundle('fallback'),
			'depthrgba': this.bundle('depthrgba'),
			'gaussianblur': this.bundle('gaussianblur'),
		};
	}

	bundle(shaderName): any {
		return 'shaders/{0}/{1}'.format(this.shaderBundle, shaderName);
	}

	add(vertexSource, fragmentSource): any {
		vertexSource = this.sourceCallback(vertexSource);
		fragmentSource = this.sourceCallback(fragmentSource);
		return this.addDescriptor(new ShaderDescriptor(vertexSource, fragmentSource));
	}

	/** Adds both vertex and fragment shader by appending .vert and .frag to source */
	addSource(source, definitions): any {
		var alias = source.toLowerCase();
		if (alias in this.aliases)
			source = this.aliases[alias];
		source = this.sourceCallback(source);
		return this.addDescriptor(new ShaderDescriptor(source+'.vert', source+'.frag', definitions));
	}

	// Protected methods
	createResource(shaderDescriptor): any {
		return new Shader(this.context, shaderDescriptor);
	}

	loadResource(shaderDescriptor, shaderResource, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(shaderDescriptor);

		// this shader is builtin so load it from memory
		if (this.builtin[descriptor.vertexSource] && this.builtin[descriptor.fragmentSource]) {
			console.log('Built in shader loaded:', descriptor.vertexSource, descriptor.fragmentSource);
			shaderResource.addVertexShader(this.builtin[descriptor.vertexSource]);
			shaderResource.addFragmentShader(this.builtin[descriptor.fragmentSource]);
			loadedCallback(descriptor, shaderResource);
		}
		else {
			var vertexShader = this.textManager.add(this.path + descriptor.getVertexShaderPath());
			var fragmentShader = this.textManager.add(this.path + descriptor.getFragmentShaderPath());
			this.textManager.load(function() {
				if(!vertexShader.data) {
					failedCallback(descriptor);
					return;
				}
				if(!fragmentShader.data) {
					failedCallback(descriptor);
					return;
				}
				shaderResource.addVertexShader(vertexShader.data);
				shaderResource.addFragmentShader(fragmentShader.data);
				loadedCallback(descriptor, shaderResource);
			});
		}

	}

}

globalThis.ShadersManager = ShadersManager;

export default ShadersManager;
