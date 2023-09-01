import MeshRendererComponent from 'scene/components/MeshRendererComponent.js'
import TextComponent from './TextComponent';

/** TextRendererComponent is used to add text components to scene rendering spaces */

class TextRendererComponent extends MeshRendererComponent {


	type(): any {
		return "TextRendererComponent";
	}

	onContextRestored(context) {
		super.onContextRestored(context);
		var textComponent = this.node.getComponent(TextComponent);
		if (textComponent)
			textComponent.updateText();
	}


}

globalThis.TextRendererComponent = TextRendererComponent;

export default TextRendererComponent;
