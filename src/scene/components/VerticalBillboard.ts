import Billboard from 'scene/components/Billboard';
import Camera from 'rendering/camera/Camera';

/** Makes the node always face camera, but is locked in a vertical (Y-axis) position */
class VerticalBillboard extends Billboard {
	type(): any {
		return "VerticalBillboard";
	}

	onUpdate(engine) {
		if (!(this.cameraToLookAt instanceof Camera))
			throw "VerticalBillboard.cameraToLookAt is not an instance of Camera";

		var delta=engine.fps.getDelta()/1000.0;
		var invViewMatrix = mat4.invert(this.cacheMat4[0], this.cameraToLookAt.viewMatrix);
		var rotation = quat.fromMat4(this.cacheQuat[0], invViewMatrix);
		quat.multiply(rotation, rotation, quat.euler(this.cacheQuat[1], 0.0, 180.0, 0.0));
		if (this.smoothRotation) {
			rotation[0]=0.0;
			rotation[2]=0.0;
			quat.normalize(rotation, rotation);
			var localRotation = quat.fromMat4(this.cacheQuat[1], this.node.transform.relative);
			quat.slerp(rotation, localRotation, rotation, this.rotationSpeed * delta);
		}
		quat.normalize(rotation, rotation);
		var localPosition = mat4.translation(this.cacheVec3[0], this.node.transform.relative);
		var localScale = mat4.getScale(this.cacheVec3[1], this.node.transform.relative);
		mat4.fromRotationTranslationScale(this.node.transform.relative, rotation, localPosition, localScale);
	}
}

globalThis.VerticalBillboard = VerticalBillboard;
export default VerticalBillboard;
