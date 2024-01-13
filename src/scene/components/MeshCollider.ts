import Collider from 'scene/components/Collider';
import MeshRendererComponent from './MeshRendererComponent';

/** Mesh collider */
class MeshCollider extends Collider {
	constructor() {
		super();
	}

	type(): any {
		return "MeshCollider";
	}

	/** Tests if ray collides with this collider
		@param ray Instance of {Ray} in world space
		@param result Instance of {RayTestResult} (optional)
		@param collideInvisible If true, invisible colliders are evaluated as well (optional) {boolean}
		@return {boolean} True if ray intersects this collider */
	rayTest(ray, result, collideInvisible) {
		if (!this.enabled)
			return false;

		var meshRendererComponent=this.node.getComponent(MeshRendererComponent);
		if (!meshRendererComponent)
			return false;
		var renderers = meshRendererComponent.meshRenderers;
		var a = vec3.create();
		var b = vec3.create();
		var c = vec3.create();
		var hit = false;
		for (var i=0; i<renderers.length; i++) {
			if (!collideInvisible && !renderers[i].visible)
				continue;
			if (ray.intersectBoundingVolume(renderers[i].globalBoundingBox)) {
				var localRay = ray.clone();
				var invMat = mat4.invert(mat4.create(), renderers[i].matrix);
				localRay.transform(invMat);
				var faces = renderers[i].submesh.faces;
				var positions = renderers[i].submesh.positions;
				if (result) {
					var collider=this;
					result.addCallback=function(item) {
						vec3.transformMat4(item.point, item.point, renderers[i].matrix);
						item.submesh=renderers[i].submesh;
						item.collider=collider;
						item.node=collider.node;
					};
				}
				for (var v=0; v<faces.length; v+=3) {
					a[0]=positions[faces[v]*3];
					a[1]=positions[faces[v]*3+1];
					a[2]=positions[faces[v]*3+2];
					b[0]=positions[faces[v+1]*3];
					b[1]=positions[faces[v+1]*3+1];
					b[2]=positions[faces[v+1]*3+2];
					c[0]=positions[faces[v+2]*3];
					c[1]=positions[faces[v+2]*3+1];
					c[2]=positions[faces[v+2]*3+2];
					if (localRay.intersectTriangle(a, b, c, result)) {
						if (!result)
							return true;
						hit=true;
					}
				}
				if (result) result.addCallback=false;
				else if (hit) return true;
			}
		}
		return hit;
	}
}

globalThis.MeshCollider = MeshCollider;
export default MeshCollider;
