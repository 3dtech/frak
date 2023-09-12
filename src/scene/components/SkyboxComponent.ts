import Component from 'scene/components/Component';
import MeshRendererComponent from './MeshRendererComponent';
import Material from 'rendering/materials/Material';
import Sampler from 'rendering/shaders/Sampler';
import Primitives from 'scene/geometry/Primitives';

class SkyboxComponent extends Component {
	cubeTexture: any;
	meshNode: any;

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
		var extent = 1.0;
		if (engine.scene && engine.scene.camera && engine.scene.camera.far) {
			extent = Math.sqrt(engine.scene.camera.far*engine.scene.camera.far / 3.0);
		}
		this.meshNode = Primitives.box([0, 0, 0], [extent, extent, extent], new Material(
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('skybox')),
			{},
			[new Sampler('skybox0', this.cubeTexture)]
		));
		this.node.addNode(this.meshNode);

		var meshRenderer = this.meshNode.getComponent(MeshRendererComponent);
		meshRenderer.castShadows=false;
		meshRenderer.disable();
		meshRenderer.addRenderers(engine.context, engine);
	}
}

globalThis.SkyboxComponent = SkyboxComponent;
export default SkyboxComponent;
