import RendererComponent from 'scene/components/RendererComponent';

class CubeRendererComponent extends RendererComponent {
	type(): any {
		return "CubeRendererComponent";
	}

}

globalThis.CubeRendererComponent = CubeRendererComponent;
export default CubeRendererComponent;
