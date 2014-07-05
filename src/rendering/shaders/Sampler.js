/** Samplers are used as parameters for shaders. 

	Sampler automatically binds texture to next available texture slot
	in shader when passed to Shader.bindSamplers and binds uniform1i with its name. 
	
	To assign a texture slot to multiple uniforms use UniformInt instead
	with Shader.use(uniforms) method and bind textures with Shader.bindTextures/unbindTextures.
	
	Examples:
	<pre>
	-------------------------------
	// Fragment-shader used by all examples
	uniform sampler2D texture0;
	uniform sampler2D texture1;
	
	varying vec2 fragTexcoord;
	
	void main(void) { 
		gl_FragColor = texture2D(texture, fragTexcoord);
	}
	
	-------------------------------
	Example with automatic texture slot assignment:
	var texture0=new Texture();
	var texture1=new Texture();
	
	var samplers=[
			new Sampler("texture0", texture0),
			new Sampler("texture1", texture1)
		];
	shader.use();
	shader.bindSamplers(samplers);
	
	// Render geometry ...
	
	shader.unbindSamplers(samplers);
	
	-------------------------------
	Example with manual texture slot assignment:
	// Create textures array with only one texture
	var textures=[new Texture()];
	
	// Assign both texture0 and texture1 the first slot
	var uniforms={
			"texture0": new UniformInt(0),
			"texture1": new UniformInt(0)
		};
	shader.use(uniforms);
	shader.bindTextures(textures);
	
	// Render geometry ...
	shader.unbindTextures(textures);
	</pre>
*/
var fallbackTexture=false;	// Doesn't exist by default, but will be loaded before texture is loaded or if it is not passed to sampler
var Sampler=Serializable.extend({
	/** Constructor 
		@param name Name of uniform variable that this sampler will be bound to 
		@param texture An instance of Texture */
	init: function(name, texture) {
		this.name=name;
		this.texture=texture;
	},
	
	type: function() {
		return "Sampler";
	},
	
	createFallbackTexture: function(context) {
		fallbackTexture=new Texture(context);
		var canvas = document.createElement("canvas");
		canvas.width=2;
		canvas.height=2;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(0,0,2,2);
		fallbackTexture.setImage(context, canvas);
	},
	
	/** Binds sampler to uniform.  Must be paired with corresponding unbind call.
		@param context Rendering context
		@param uniformLocation Location of uniform variable (gotten from shader)
		@param slotIndex The slot to store texture at */
	bind: function(context, uniformLocation, slotIndex) {
		context.gl.activeTexture(slotIndex+context.gl.TEXTURE0);
		context.gl.uniform1i(uniformLocation, slotIndex);

		if(!this.texture || !this.texture.loaded) {
			if(!fallbackTexture) {
				this.createFallbackTexture(context);
			}
			fallbackTexture.bind(context);
			return;
		}
		this.texture.bind(context);
	},
	
	/** Unbinds previously bound sampler. Must be paired with corresponding bind call. */
	unbind: function(context, uniformLocation, slotIndex) {
		context.gl.activeTexture(slotIndex+context.gl.TEXTURE0);
		if(!this.texture || !this.texture.loaded) {
			fallbackTexture.unbind(context);
			return;
		}
		this.texture.unbind(context);
	},
	
	/** Clones the sampler */
	clone: function() {
		var c=this._super();
		c.name=this.name;
		c.texture=this.texture;
		return c;
	}
});