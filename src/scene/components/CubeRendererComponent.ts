import RendererComponent from 'scene/components/RendererComponent.js'


class CubeRendererComponent extends RendererComponent {

	
	constructor(size) {
		super();
	}
	
	type(): any {
		return "CubeRendererComponent";
	}

}

globalThis.CubeRendererComponent = CubeRendererComponent;

export default CubeRendererComponent;