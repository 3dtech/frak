import Camera from 'rendering/camera/Camera';
import CameraComponent from 'scene/components/CameraComponent';

/** Camera providing orthographic projection */
class OrthoCamera extends CameraComponent {
	constructor(left, right, bottom, top, near, far) {
		if(!left) left=0;
		if(!right) right=512;
		if(!bottom) bottom=512;
		if(!top) top=0;
		if(!near) near=-100;
		if(!far) far=100;
		var projection=mat4.ortho(mat4.create(), left, right, bottom, top, near, far)
		super(new Camera(mat4.identity(mat4.create()), projection));
	}

	type() {
		return "OrthoCamera";
	}
}

globalThis.OrthoCamera = OrthoCamera;
export default OrthoCamera;
