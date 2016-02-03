/**
 * Used by AssetsManager to load shaders.
 */
var ShadersManager=Manager.extend({
	/**
	 * Constructor
	 * @param renderingContext Instance of RenderingContext
	 * @param assetsPath Default search path for any assets requested
	 */
	init: function(context, assetsPath) {
		this._super(assetsPath);
		this.context = context;

		this.aliases = {
			'diffuse': 'shaders/default/diffuse',
			'normalmapped': 'shaders/default/normalmapped',
			'transparent': 'shaders/default/transparent',
			'reflective': 'shaders/default/reflective',

			// The following are deprecated:
			'test': 'shaders/default/test',
			'fallback': 'shaders/default/fallback',
			'depthrgba': 'shaders/default/DepthRGBA',
			'gaussianblur': 'shaders/default/GaussianBlur'
		};

		this.textManager = new TextManager();
	},

	add: function(vertexSource, fragmentSource) {
		vertexSource = this.sourceCallback(vertexSource);
		fragmentSource = this.sourceCallback(fragmentSource);
		return this.addDescriptor(new ShaderDescriptor(vertexSource, fragmentSource));
	},

	/** Adds both vertex and fragment shader by appending .vert and .frag to source */
	addSource: function(source) {
		var alias = source.toLowerCase();
		if (alias in this.aliases)
			source = this.aliases[alias];
		source = this.sourceCallback(source);
		return this.addDescriptor(new ShaderDescriptor(source+'.vert', source+'.frag'));
	},

	// Protected methods
	createResource: function(shaderDescriptor) {
		return new Shader(this.context, shaderDescriptor);
	},

	loadResource: function(shaderDescriptor, shaderResource, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(shaderDescriptor);
		var vertexShader = this.textManager.add(descriptor.getVertexShaderPath());
		var fragmentShader = this.textManager.add(descriptor.getFragmentShaderPath());
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
});
