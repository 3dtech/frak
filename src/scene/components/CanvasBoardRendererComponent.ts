import MeshRendererComponent from 'scene/components/MeshRendererComponent.js'

/** TextRendererComponent is used to add text components to scene rendering spaces */

class CanvasBoardRendererComponent extends MeshRendererComponent {

	
	type() {
		return "CanvasBoardRendererComponent";
	}

}

globalThis.CanvasBoardRendererComponent = CanvasBoardRendererComponent;

export default CanvasBoardRendererComponent;