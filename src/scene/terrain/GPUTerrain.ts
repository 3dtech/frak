import MeshRendererComponent from 'scene/components/MeshRendererComponent.js'
import TextureDescriptor from 'scene/descriptors/TextureDescriptor.js'
import Material from 'rendering/materials/Material.js'
import UniformColor from 'rendering/shaders/UniformColor.js'
import UniformVec2 from 'rendering/shaders/UniformVec2.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import Sampler from 'rendering/shaders/Sampler.js'
import Mesh from 'scene/geometry/Mesh.js'
import Submesh from 'scene/geometry/Submesh.js'
import MeshComponent from 'scene/components/MeshComponent.js'

/** GPU terrain renderer */

class GPUTerrain extends MeshRendererComponent {
	options: any;
	uvSize: any;
	heightSource: any;
	colorSource: any;
	cameraPosition: any;
	height: any;
	color: any;
	material: any;

	constructor(heightImage, colorImage, options) {
		super();

		this.options = FRAK.extend({
			size: 1024,
			verticalScale: 64,
			numCones: 8,
			initialConeSize: 32
		}, options);

		this.uvSize = Math.pow(2, this.options.numCones-1) * this.options.initialConeSize;

		this.heightSource = new TextureDescriptor(heightImage);
		this.colorSource = new TextureDescriptor(colorImage);

		// Pre-allocated variables
		this.cameraPosition = vec3.create();
	}

	type(): any {
		return "TerrainComponent";
	}

	onStart(context, engine): any {
		this.height = engine.assetsManager.texturesManager.addDescriptor(this.heightSource);
		this.color = engine.assetsManager.texturesManager.addDescriptor(this.colorSource);

		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/terrain"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('terrain')),
			{
				"diffuse": new UniformColor({r:1.0, g:1.0, b:1.0, a:1.0}),
				"ambient": new UniformColor({r:0.2, g:0.2, b:0.2}),

				"uvOffset": new UniformVec2(vec2.fromValues(0.0, 0.0)),
				"uvScale": new UniformVec2(vec2.fromValues(1.0, 1.0)),
				"verticalScale": new UniformFloat(this.options.verticalScale)
			},
			[
				new Sampler("diffuse0", this.color),
				new Sampler("height", this.height)
			]
		);

		var terrainMesh = new TerrainMesh();
		terrainMesh.generate(this.options.initialConeSize, 1, this.options.numCones);

		var mesh = new Mesh();
		var submesh = new Submesh();
		submesh.positions = terrainMesh.positions;
		submesh.barycentric = terrainMesh.barycentric;
		submesh.normals = terrainMesh.normals;
		submesh.texCoords2D = [terrainMesh.uv];
		submesh.faces = terrainMesh.faces;

		submesh.calculateTangents();
		// submesh.calculateBarycentric();
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, this.material);
		this.node.addComponent(new MeshComponent(mesh));

		super.onStart(context, engine);

		// this.meshRenderers[0].buffer.generateBarycentric();

		// TODO: in deferred renderer mode disable this.meshRenderers

		engine.assetsManager.load();
	}

	onPreRender(context, camera) {
		// Position the terrain mesh straight under camera
		camera.getPosition(this.cameraPosition);
		this.cameraPosition[1] = 0.0;

		var u = (this.cameraPosition[0] + this.options.size/2.0) / this.options.size;
		var v = (this.cameraPosition[2] + this.options.size/2.0) / this.options.size;

		vec2.set(this.material.uniforms.uvScale.value, this.uvSize/this.options.size, this.uvSize/this.options.size);
		vec2.set(this.material.uniforms.uvOffset.value, u, v);
		this.material.uniforms.verticalScale.value = this.options.verticalScale;

		this.node.transform.setPosition(this.cameraPosition);
	}

}

globalThis.GPUTerrain = GPUTerrain;

export default GPUTerrain;
