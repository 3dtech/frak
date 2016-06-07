/** Text component is used to render text at given node */
var TextComponent=MeshComponent.extend({
	/** Constructor
		@param text Default text to display */
	init: function(text, wrap) {
		this._super(new Mesh());
		this.context = false;
		this.material = false;
		this.texture = false;
		this.wrap = wrap ? 0 : wrap;
		this.sampler = new Sampler('diffuse0', null);
		this.lines = [];

		// Text properties
		this.color = new Color(0.0, 0.0, 0.0, 1.0); ///< Color of the text
		this.fontSize = 56; ///< Font pixel size
		this.style = 'normal'; ///< Font style (italic, normal, oblique)
		this.variant = 'normal'; ///< Font variant (normal, small-caps)
		this.weight = 'normal'; ///< Font weight (normal, bold, bolder, lighter, 100..900)
		this.family = 'monospace'; ///< Font family
		this.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0); ///< Background color
		this.outline = true; ///< Set to true if text outline is desired
		this.outlineColor = new Color(1.0, 1.0, 1.0, 1.0); ///< Color of the text outline
		this.outlineWidth = 5; ///< Outline width
		this.textLength = 0;

		this.setText(text);
	},

	excluded: function() {
		return this._super().concat(["material", "texture", "sampler", "context"]);
	},

	type: function() {
		return "TextComponent";
	},

	/** Private. Applies text styles to 2D context. */
	applyTextStyles: function(ctx2d) {
		if (this.outline) {
			ctx2d.strokeStyle = this.outlineColor.toString();
			ctx2d.lineWidth = this.outlineWidth;
		}
		ctx2d.fillStyle = this.color.toString();
		ctx2d.textBaseline = 'middle';
		ctx2d.textAlign = 'center';
		ctx2d.font = this.font;
	},

	updateFont: function() {
		this.font = '';
		if (this.style != 'normal') this.font += this.style + ' ';
		if (this.variant != 'normal') this.font += this.variant + ' ';
		if (this.weight != 'normal') this.font += this.weight + ' ';
		this.font += this.fontSize + 'px ' + this.family;
	},

	updateText: function() {
		if (!this.context || this.text.length == 0)
			return;

		var rendererComponent = this.node.getComponent(TextRendererComponent);
		if (!rendererComponent)
			return;

		this.updateFont();
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		this.applyTextStyles(ctx);

		if(this.wrap)
			this.lines = this.getLines(this.text);
		else
			this.textLength = ctx.measureText(this.text).width;


		canvas.width = nextHighestPowerOfTwo(ctx.measureText(this.text).width);
		canvas.height = nextHighestPowerOfTwo(2.0 * this.fontSize);

		// Draw background
		ctx.fillStyle = this.backgroundColor.toString();
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		this.applyTextStyles(ctx);

		// Draw text outline
		if (this.outline)
			ctx.strokeText(this.text, canvas.width/2, canvas.height/2);

		// Draw text
		ctx.fillText(this.text, canvas.width/2, canvas.height/2);

		this.texture.setImage(this.context, canvas);

		var height = 1.0;
		var width = canvas.width / canvas.height;
		var submesh = this.mesh.submeshes[0];
		submesh.positions[0] = -0.5*width;
		submesh.positions[1] = -0.5*height;
		submesh.positions[3] = -0.5*width;
		submesh.positions[4] =  0.5*height;
		submesh.positions[6] =  0.5*width;
		submesh.positions[7] =  0.5*height;
		submesh.positions[9] =  0.5*width;
		submesh.positions[10]= -0.5*height;
		submesh.recalculateBounds();

		if (rendererComponent.meshRenderers.length>0) {
			var renderer = rendererComponent.meshRenderers[0];
			renderer.buffer.update('position', submesh.positions);
		}
	},

	onStart: function(context, engine) {
		this.context = context;
		this.material = new Material(
			engine.assetsManager.addShaderSource("transparent"),
			{
				"diffuse": new UniformColor({r:1.0, g:1.0, b:1.0, a:1.0})
			},
			[ this.sampler ]
		);
		this.material.shader.requirements.transparent = true;
		this.material.name = 'TextComponentMaterial';
		this.texture = new Texture(context);
		this.texture.mipmapped = true;
		this.texture.clampToEdge = true;
		this.sampler.texture = this.texture;

		var submesh = new Submesh();
		submesh.positions = new Float32Array(12);
		submesh.normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
		submesh.texCoords2D = [[
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0
		]];
		submesh.faces = [0, 1, 2, 0, 2, 3];
		submesh.recalculateBounds();
		this.mesh.addSubmesh(submesh, this.material);

		this.updateText();
	},

	/** Sets text and generates text mesh */
	setText: function(text) {
		this.text = String(text);
		this.updateText();
	},

	getLines: function(text, linesCount) {
		var words = text.split(" ");
		var lines = [];
		var currentLine = words[0];

		if(linesCount <= 0)
			return words;

		if(words.length <= linesCount)
			return words;

		for (var i = 1; i < words.length; i++) {
			if(currentLine.length > text.length / linesCount){
				lines.push(currentLine);
				currentLine = "";
			}
			else {
				currentLine += " "+words[i];
			}
		}

		lines.push(currentLine);

		return lines;
	},

	onContextRestored: function(context) {
		if (this.texture)
			delete this.texture;
		this.texture = new Texture(context);
		this.texture.mipmapped = true;
		this.texture.clampToEdge = true;
		this.sampler.texture = this.texture;
	}
});
