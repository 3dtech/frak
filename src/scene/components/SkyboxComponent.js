var SkyboxComponent = Component.extend({
	init: function() {
		this._super();
	},

	type: function() {
		return "SkyboxComponent";
	},

	setup: function(assetsManager, engine, images) {
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
});
