import Component from 'scene/components/Component';

/** Transform class holds transformation matrix and provides
  extra functionality for manipulating vectors/matrices and subtransformations. */
class Transform extends Component {
	relative: any;
	absolute: any;

	/** Constructor
		@param relative Relative 4x4 transformation matrix [optional]. If omitted an identity matrix is created instead */
	constructor(relative?) {
		super();
		if(relative) {
			this.relative=relative;
		}
		else {
			this.relative=mat4.identity(mat4.create());
		}

		this.absolute=mat4.copy(mat4.create(), this.relative);							// Default absolute transformation is the same as relative
	}

	onAdd(node): any {
		node.transform=this;
	}

	type(): any {
		return "Transform";
	}

	excluded(): any {
		return super.excluded().concat(["absolute"]);
	}

	/** Given reference transformation matrix calculates relative transformation matrix from this absolute matrix
		@param referenceMatrix Parent matrix, if not given relative transformation matrix will be made equal to absolute matrix of this Transform [optional] */
	calculateRelativeFromAbsolute(referenceMatrix?): any {
		if(!referenceMatrix) {
			mat4.copy(this.relative, this.absolute);
			return;
		}

		// Construct inverse matrix from parent absolute matrix
		var referenceInverse=mat4.invert(mat4.create(), referenceMatrix);

		// Take back absolute parent axis (ie multiply new absolute matrix with parent inverse) to calculate relative transform
		mat4.multiply(this.relative, this.absolute, referenceInverse);
	}

	/** Returns the absolute world position of this transform.
		@return the absolute world position of this transform */
	getPosition(out): any {
		if (!out)
			out=vec3.create();
		return mat4.translation(out, this.absolute);
	}

	getRelativePosition(out): any {
		if (!out)
			out=vec3.create();
		return mat4.translation(out, this.relative);
	}

	/** Sets relative position of transform
		@param position Position as vec3 */
	setPosition(position): any {
		mat4.fromRotationTranslation(this.relative, quat.fromMat4(quat.create(), this.relative), position);
	}

	/** Returns the absolute rotation of this transform.
		@return the absolute rotation of this transform */
	getRotation(out): any {
		if (!out)
			out = quat.create();
		return quat.fromMat4(out, this.absolute);
	}

	/** Translates node
		@param offset Translation offset {vec3} */
	translate(offset): any {
		this.relative=mat4.translate(this.relative, this.relative, offset);
	}

	/** Rotates node
		@param angle Rotation angle in radians {float}
		@param axis Rotation axis {vec3} */
	rotate(angle, axis): any {
		this.relative=mat4.rotate(this.relative, this.relative, angle, axis);
	}

	/** Scales node
		@param scale Scale amount {vec3} */
	scale(scale): any {
		this.relative=mat4.scale(this.relative, this.relative, scale);
	}

	/** Returns a clone of this transformation.
		@return a new instance of {Transform} */
	clone(): this {
		var t = super.clone();
		t.relative=mat4.clone(this.relative);
		t.absolute=mat4.clone(this.absolute);
		return t;
	}
}

globalThis.Transform = Transform;
export default Transform;
