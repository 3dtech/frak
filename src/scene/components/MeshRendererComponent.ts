import RendererComponent from 'scene/components/RendererComponent';
import SubmeshRenderer from 'rendering/renderers/SubmeshRenderer';
import MeshComponent from 'scene/components/MeshComponent';
import BoundingBox from 'scene/geometry/BoundingBox';
import BoundingSphere from 'scene/geometry/BoundingSphere';
import Engine from 'engine/Engine';

/** MeshRendererComponent is used to add meshes to scene rendering spaces */
class MeshRendererComponent extends RendererComponent {
	private absoluteTransform = mat4.create();
	meshRenderers: any;

	constructor() {
		super();
		this.meshRenderers = [];
	}

	type(): any {
		return "MeshRendererComponent";
	}

	excluded(): any {
		return super.excluded().concat(["meshRenderers"]);
	}

	createRenderer(context, matrix, submesh, material): any {
		return new SubmeshRenderer(context, matrix, submesh, material);
	}

	onStart(context, engine): any {
		this.updateRenderers(context, engine);
	}

	addRenderers(context, engine): any {
		var scope = this;
		this.node.onEachComponent(function(component) {
			if (component instanceof MeshComponent) {
				for (var submeshIndex=0; submeshIndex < component.mesh.submeshes.length; submeshIndex++) {
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
	}

	removeRenderers(): any {
		for (var i=0; i<this.meshRenderers.length; i++) {
			this.getScene().dynamicSpace.removeRenderer(this.meshRenderers[i]);
		}

		this.meshRenderers = [];
	}

	updateRenderers(context, engine): any {
		this.removeRenderers();
		this.addRenderers(context, engine);
	}

	onEnd(context): any {
		this.removeRenderers();
	}

	onUpdateTransform(absolute): any {
		if (mat4.equals(this.absoluteTransform, absolute)) {
			return;
		}

		mat4.copy(this.absoluteTransform, absolute);

		var renderer;
		var castShadows = this.castShadows;
		var layer = this.node.layer;
		var receiveShadows = this.receiveShadows;
		var lightContribution = this.lightContribution;
		var reflectivity = this.reflectivity;

		for (var i = 0, l = this.meshRenderers.length; i < l; ++i) {
			renderer = this.meshRenderers[i];
			renderer.layer = layer;
			renderer.castShadows = castShadows;
			renderer.receiveShadows = receiveShadows;
			renderer.lightContribution = lightContribution;
			renderer.reflectivity = reflectivity;
			renderer.setMatrix(absolute);
		}
	}

	onEnable() {
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			this.meshRenderers[i].visible = true;
		}

		super.onEnable();
	}

	onDisable() {
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			this.meshRenderers[i].visible = false;
		}

		super.onDisable();
	}

	/** Returns the bounding box of all the Renderers in attached to this component
		The bounding box is in world space.
		@return The {BoundingBox} of all Renderers */
	getBoundingBox(excludeInvisible): any {
		var bounds = new BoundingBox();
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			if (excludeInvisible && !this.meshRenderers[i].visible)
				continue;
			bounds.encapsulateBox(this.meshRenderers[i].globalBoundingBox);
		}
		return bounds;
	}

	/** Returns the bounding sphere of all the Renderers in attached to this component
		The bounding sphere is in world space.
		@return The {BoundingSphere} of all Renderers */
	getBoundingSphere(excludeInvisible): any {
		var bounds = new BoundingSphere();
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			if (excludeInvisible && !this.meshRenderers[i].visible)
				continue;
			bounds.encapsulateSphere(this.meshRenderers[i].globalBoundingSphere);
		}
		return bounds;
	}

	/** Sets all Renderer.transparent to value for all Renderers attached to this component. */
	setTransparency(value): any {
		value = !!value;
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			this.meshRenderers[i].transparent = value;
		}
	}

	/** Returns the SubmeshRenderer attached to the given submesh, if it exists. */
	getSubmeshRenderer(submesh): any {
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			if (this.meshRenderers[i].submesh === submesh)
				return this.meshRenderers[i];
		}
		return false;
	}

	onContextRestored(context) {
		super.onContextRestored(context);
		for (var i = 0; i < this.meshRenderers.length; ++i) {
			this.meshRenderers[i].onContextRestored(context);
		}
	}

	onUpdate(engine: Engine) {
		if (this.castShadows !== this.previousCastShadows) {
			this.previousCastShadows = this.castShadows;
			
			for (var i = 0, l = this.meshRenderers.length; i < l; ++i) {
				this.meshRenderers[i].castShadows = this.castShadows;
			}

			this.getScene()?.dynamicSpace.damage();
		}
	}
}

globalThis.MeshRendererComponent = MeshRendererComponent;
export default MeshRendererComponent;
