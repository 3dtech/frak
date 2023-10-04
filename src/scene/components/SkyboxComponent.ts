import Component from 'scene/components/Component';
import MeshRendererComponent from './MeshRendererComponent';
import Material from 'rendering/materials/Material';
import Sampler from 'rendering/shaders/Sampler';
import Primitives from 'scene/geometry/Primitives';
import CubeTexture from "../../rendering/materials/CubeTexture";
import ShaderDescriptor from "../descriptors/ShaderDescriptor";

class SkyboxComponent extends Component {
	cubeTexture: CubeTexture;
	sampler: Sampler;

	constructor() {
		super();
	}

	type(): any {
		return "SkyboxComponent";
	}

	setup(assetsManager, engine, images): any {
		this.cubeTexture = assetsManager.texturesManager.addCube([
			images[2].source,
			images[3].source,
			images[1].source,
			images[0].source,
			images[4].source,
			images[5].source
		]);
		this.sampler = new Sampler('diffuse0', this.cubeTexture);
	}
}

globalThis.SkyboxComponent = SkyboxComponent;
export default SkyboxComponent;
