/** Used to load shaders similar to the TexturesManager.
	Example of usage:
	<pre>
	var renderingContext=new RenderingContext($('#canvas'));
	var shadersManager=new ShadersManager(renderingContext);

	// If they are already loaded, the shader will be ready automatically, otherwise it will be ready
	// after call to load has successfully loaded.
	// If either fragment or test shader fails to load, fallback shader is used instead from ./shaders/fallback.(vert|frag)
	var shader=shadersManager.add('test.vert', 'test.frag');	// Request vertex/fragment shader pair.
	</pre>
	*/
var ShadersManager=Manager.extend({
	/** Constructor
		@param context Instance of RenderingContext */
	init: function(context) {
		this._super();
		this.context = context;
		this.shadersPath = '';

		this.aliases = {
			'diffuse': 'shaders/default/diffuse',
			'transparent': 'shaders/default/transparent',
			'test': 'shaders/default/test',
			'fallback': 'shaders/default/fallback',
			'depthrgba': 'shaders/default/DepthRGBA',
			'gaussianblur': 'shaders/default/GaussianBlur'
		};

		this.textManager = new TextManager();
	},

	add: function(vertexSource, fragmentSource) {
		return this.addDescriptor(new ShaderDescriptor(vertexSource, fragmentSource));
	},

	/** Adds both vertex and fragment shader by appending .vert and .frag to source */
	addSource: function(source) {
		if(this.aliases[source.toLowerCase()]) source=this.aliases[source.toLowerCase()];
		source = this.shadersPath + source;
		return this.addDescriptor(new ShaderDescriptor(source+'.vert', source+'.frag'));
	},

	// Protected methods
	createResource: function(shaderDescriptor) {
		return new Shader(this.context, shaderDescriptor);
	},

	loadResource: function(shaderDescriptor, shaderResource, loadedCallback, failedCallback) {
		var vertexShader=this.textManager.add(shaderDescriptor.getVertexShaderPath());
		var fragmentShader=this.textManager.add(shaderDescriptor.getFragmentShaderPath());
		this.textManager.load(function() {
			if(!vertexShader.data) {
				failedCallback(shaderDescriptor);
				return;
			}
			if(!fragmentShader.data) {
				failedCallback(shaderDescriptor);
				return;
			}
			shaderResource.addVertexShader(vertexShader.data);
			shaderResource.addFragmentShader(fragmentShader.data);
			loadedCallback(shaderDescriptor, shaderResource);
		});
	}
});