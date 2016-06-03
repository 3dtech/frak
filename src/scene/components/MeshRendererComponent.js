/** MeshRendererComponent is used to add meshes to scene rendering spaces */
var MeshRendererComponent=RendererComponent.extend({
	init: function() {
		this.meshRenderers = [];
		this._super();
	},

	type: function() {
		return "MeshRendererComponent";
	},

	excluded: function() {
		return this._super().concat(["meshRenderers"]);
	},

	createRenderer: function(context, matrix, submesh, material) {
		return new SubmeshRenderer(context, matrix, submesh, material);
	},

	onStart: function(context, engine) {
		this.updateRenderers(context, engine);
	},

	addRenderers: function(context, engine) {
		var scope = this;
		this.node.onEachComponent(function(component) {
			if (component instanceof MeshComponent) {
				for (var submeshIndex in component.mesh.submeshes) {
					var submesh = component.mesh.submeshes[submeshIndex];
					var material = component.mesh.getMaterial(submesh.materialIndex);
					if (!material) {
						console.warn('Failed to find submesh material: ', component.node.name, component.node);
						continue;
					}

					if (submesh.positions.length == 0 || submesh.faces.length == 0)
						continue;

					var submeshRenderer = scope.createRenderer(context, scope.node.transform.absolute, submesh, material);
					scope.getScene().dynamicSpace.addRenderer(submeshRenderer);
					scope.meshRenderers.push(submeshRenderer);
					if (!scope.enabled)
						submeshRenderer.visible = false;
				}
			}
		});
	},

	removeRenderers: function() {
		for (var i=0; i<this.meshRenderers.length; i++) {
			this.getScene().dynamicSpace.removeRenderer(this.meshRenderers[i]);
		}
	},

	updateRenderers: function(context, engine) {
		this.removeRenderers();
		this.addRenderers(context, engine);
	},

	onEnd: function(context) {
		this.removeRenderers();
	},

	onUpdateTransform: function(absolute) {
		for (var i=0; i<this.meshRenderers.length; i++) {
			this.meshRenderers[i].layer = this.node.layer;
			this.meshRenderers[i].castShadows = this.castShadows;
			this.meshRenderers[i].receiveShadows = this.receiveShadows;
			this.meshRenderers[i].lightContribution = this.lightContribution;
			this.meshRenderers[i].setMatrix(absolute);
		}
	},

	onEnable: function() {
		for (var i=0; i<this.meshRenderers.length; i++)
			this.meshRenderers[i].visible = true;
	},

	onDisable: function() {
		for (var i=0; i<this.meshRenderers.length; i++)
			this.meshRenderers[i].visible = false;
	},

	/** Returns the bounding box of all the Renderers in attached to this component
		The bounding box is in world space.
		@return The {BoundingBox} of all Renderers */
	getBoundingBox: function(excludeInvisible) {
		var bounds = new BoundingBox();
		for (var i=0; i<this.meshRenderers.length; i++) {
			if (excludeInvisible && !this.meshRenderers[i].visible)
				continue;
			bounds.encapsulateBox(this.meshRenderers[i].globalBoundingBox);
		}
		return bounds;
	},

	/** Returns the bounding sphere of all the Renderers in attached to this component
		The bounding sphere is in world space.
		@return The {BoundingSphere} of all Renderers */
	getBoundingSphere: function(excludeInvisible) {
		var bounds = new BoundingSphere();
		for (var i=0; i<this.meshRenderers.length; i++) {
			if (excludeInvisible && !this.meshRenderers[i].visible)
				continue;
			bounds.encapsulateSphere(this.meshRenderers[i].globalBoundingSphere);
		}
		return bounds;
	},

	/** Sets all Renderer.transparent to value for all Renderers attached to this component. */
	setTransparency: function(value) {
		value = !!value;
		for (var i=0; i<this.meshRenderers.length; i++) {
			this.meshRenderers[i].transparent=value;
		}
	},

	/** Returns the SubmeshRenderer attached to the given submesh, if it exists. */
	getSubmeshRenderer: function(submesh) {
		for (var i=0; i<this.meshRenderers.length; i++) {
			if (this.meshRenderers[i].submesh === submesh)
				return this.meshRenderers[i];
		}
		return false;
	}
});