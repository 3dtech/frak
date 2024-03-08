import MeshComponent from 'scene/components/MeshComponent';
import Mesh from 'scene/geometry/Mesh';
import Sampler from 'rendering/shaders/Sampler';
import Material, { RendererType, TransparencyType } from 'rendering/materials/Material';
import UniformColor from 'rendering/shaders/UniformColor';
import Texture from 'rendering/materials/Texture';
import Submesh from 'scene/geometry/Submesh';
import Color from 'rendering/Color';
import TextRendererComponent from './TextRendererComponent';

/** Text component is used to render text at given node */
class TextComponent extends MeshComponent {
	context: any;
	material: any;
	texture: any;
	wrap: any;
	sampler: any;
	lines: any;
	canvasWidth: any;
	canvasHeight: any;
	color: any;
	fontSize: any;
	style: any;
	variant: any;
	weight: any;
	family: any;
	backgroundColor: any;
	outline: any;
	outlineColor: any;
	outlineWidth: any;
	textLength: any;
	textHeight: any;
	font: any;
	text: any;
	unlit = false;
	stencilLayer = 1;

	/** Constructor
		@param text Default text to display */
	constructor(text, wrap) {
		super(new Mesh());
		this.context = false;
		this.material = false;
		this.texture = false;
		this.wrap = wrap > 0 ? wrap : 0;
		this.sampler = new Sampler('diffuse0', null);
		this.lines = [];
		this.canvasWidth = 0;
		this.canvasHeight = 0;

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
		this.textHeight = 0;

		this.setText(text);
	}

	excluded(): any {
		return super.excluded().concat(["material", "texture", "sampler", "context"]);
	}

	type(): any {
		return "TextComponent";
	}

	/** Private. Applies text styles to 2D context. */
	applyTextStyles(ctx2d): any {
		if (this.outline) {
			ctx2d.strokeStyle = this.outlineColor.toString();
			ctx2d.lineWidth = this.outlineWidth;
		}
		ctx2d.fillStyle = this.color.toString();
		ctx2d.textBaseline = 'middle';
		ctx2d.textAlign = 'center';
		ctx2d.font = this.font;
	}

	updateFont(): any {
		this.font = '';
		if (this.style != 'normal') this.font += this.style + ' ';
		if (this.variant != 'normal') this.font += this.variant + ' ';
		if (this.weight != 'normal') this.font += this.weight + ' ';
		this.font += this.fontSize + 'px ' + this.family;
	}

	updateText(): any {
		if (this.text.length == 0)
			return;

		this.updateFont();
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		this.applyTextStyles(ctx);
		this.lines = [this.text];

		if(this.wrap) {
			this.lines = this.getLines(this.text, this.wrap);
		}

		for(var l in this.lines) {
			this.textLength = Math.max(this.textLength, ctx.measureText(this.lines[l]).width);
		}
		this.textHeight = 1.2 * this.fontSize * this.lines.length;
		canvas.width = this.canvasWidth = nextHighestPowerOfTwo(this.textLength);
		canvas.height = this.canvasHeight = nextHighestPowerOfTwo(this.textHeight);
		var top = (this.canvasHeight - this.textHeight) / 2;

		// Draw background
		ctx.fillStyle = this.backgroundColor.toString();
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		this.applyTextStyles(ctx);

		// Draw text outline
		if (this.outline) {
			for(var l in this.lines) {
				ctx.strokeText(this.lines[l], canvas.width/2, (1.2 * this.fontSize * (l as any) ) + top + (this.fontSize * 0.6));
			}
		}

		// Draw text
		for(var l in this.lines) {
			ctx.fillText(this.lines[l], canvas.width/2, (1.2 * this.fontSize * (l as any) ) + top + (this.fontSize * 0.6));
		}

		if (!this.context) return;

		var rendererComponent = this.node.getComponent(TextRendererComponent);
		if (!rendererComponent)
			return;

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
	}

	onStart(context, engine): any {
		this.context = context;
		this.material = new Material(
			engine.assetsManager.addShaderSource("transparent"),
			{
				"diffuse": new UniformColor({r:1.0, g:1.0, b:1.0, a:1.0})
			},
			[ this.sampler ]
		);
		this.material.setOptions({
			type: this.unlit ? RendererType.Unlit : RendererType.PBR,
			transparency: TransparencyType.Transparent,
		});
		this.material.stencilLayer = this.stencilLayer;
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
	}

	/** Sets text and generates text mesh */
	setText(text): any {
		this.text = String(text);
		this.updateText();
	}

	getLines(text, linesCount): any {
		var words = text.replace(/\&shy;/g, " &shy; ").split(" ");
		var textLength = text.replace("&shy;", "-").length;
		var lines = [];
		var currentLine = words[0];

		if (linesCount <= 0)
			return words;

		if (words.length <= linesCount)
			return words;

		for (var i = 1; i < words.length; i++) {
			if (words[i].toLowerCase() !== "&shy;") {
				if (currentLine.length > textLength / linesCount) {
					lines.push(currentLine);
					currentLine = words[i];
				} else {
					currentLine += " " + words[i];
				}
			} else { //try to put word breaker
				if (currentLine.length + 1 > textLength / linesCount) {
					lines.push(currentLine + "-");
					currentLine = "";
				} else if (i + 1 < words.length) {
					lines.push(currentLine + words[++i]);
					currentLine = "";
				}
			}
		}
		if (currentLine !== "")
			lines.push(currentLine);

		return lines;
	}

	onContextRestored(context) {
		if (this.texture)
			delete this.texture;
		this.texture = new Texture(context);
		this.texture.mipmapped = true;
		this.texture.clampToEdge = true;
		this.sampler.texture = this.texture;
	}
}

globalThis.TextComponent = TextComponent;
export default TextComponent;
