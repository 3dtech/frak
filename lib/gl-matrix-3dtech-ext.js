/**
 * @fileoverview gl-matrix-3dtech-ext - Extension for high performance matrix and vector operations library (version 2.0.0) by Brandon Jones and Colin MacKenzie IV
 * @author Jaanus Uri, Martti Savolainen
 * @version 1.0.0
 * @description To be included after gl-matrix library. Adds following methods to gl-matrix library:
		mat3.normalize(out, m) - Normalizes the matrix m to out
		mat4.normalize(out, m) - Normalizes the matrix m to out
		mat4.submat3(out, m, pos) - Stores submatrix in out (mat3) from given mat4 at given vec2 position
		mat4.setsubmat3(out, m, pos) - Sets submatrix in out (mat4) based on given mat3 at given vec2 position
		mat4.rotation(out, m) - Stores mat4 in out thats first 3 rows and columns are submatrix of input mat4 and rest is equal to identity matrix
		mat4.translation(out, m) - Stores vec3 in out that contain translation of given matrix
		mat4.getScale(out, m) - Stores vec3 in out that contains the scale component of the given matrix
		mat4.decompose(outTranslation, outRotation, outScale, m) - Stores vec3 in outTranslation, outRotation and outScale that contain the translation,
		                                                           rotation and scale component of the given matrix respectively
		mat4.fromRotationTranslationScale(out, r, t, s) - Stores transformation matrix in out (mat4) from rotation (quat), translation (vec3) and scale (vec3)
		mat4.fromTranslation(out, v) - Stores transformation matrix in out (mat4) from translation (vec3)
		quat.euler(out, pitch, yaw, roll) - Stores a quat in out create from the Euler angles (pitch, yaw, roll)
		quat.getEuler(out, q) - Stores vec3 in out that contains the Euler angles computed from q (pitch, yaw, roll)
		quat.fromMat3(out, m) - Stores quat in out that has the rotation from the rotation matrix m
		quat.fromMat4(out, m) - Stores quat in out that has the rotation from the rotation matrix m
		quat.rotationDifference(out, q1, q2) - Stores quat in out that has the rotation difference of q1 and q2
		quat.angle(q1, q2) - Returns the angle between the two rotations in radians
		quat.slerp(out, q1, q2, t) - Spherically interpolates between q1 and q2 by t
 */

/* Copyright (c) 2012, 3D Technologies R&D. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

globalThis.EPSILON = 0.000001;

if (typeof mat3 === 'undefined') {
	globalThis.mat3 = {};
}

mat3.normalize = function(out, m) {
	var v;

	v = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2]);
	out[0] = m[0] / v;
	out[1] = m[1] / v;
	out[2] = m[2] / v;
	v = Math.sqrt(m[3] * m[3] + m[4] * m[4] + m[5] * m[5]);
	out[3] = m[3] / v;
	out[4] = m[4] / v;
	out[5] = m[5] / v;
	v = Math.sqrt(m[6] * m[6] + m[7] * m[7] + m[8] * m[8]);
	out[6] = m[6] / v;
	out[7] = m[7] / v;
	out[8] = m[8] / v;

	return out;
};

if (typeof mat4 === 'undefined') {
	globalThis.mat4 = {};
}

mat4.submat3 = function(out, m, pos) {
	out[0] = m[0 + pos[0] + pos[1] * 4];
	out[1] = m[1 + pos[0] + pos[1] * 4];
	out[2] = m[2 + pos[0] + pos[1] * 4];

	out[3] = m[4 + pos[0] + pos[1] * 4];
	out[4] = m[5 + pos[0] + pos[1] * 4];
	out[5] = m[6 + pos[0] + pos[1] * 4];

	out[6] = m[8 + pos[0] + pos[1] * 4];
	out[7] = m[9 + pos[0] + pos[1] * 4];
	out[8] = m[10 + pos[0] + pos[1] * 4];

	return out;
};

mat4.setsubmat3 = function(out, m, pos) {
	out[0 + pos[0] + pos[1] * 4] = m[0];
	out[1 + pos[0] + pos[1] * 4] = m[1];
	out[2 + pos[0] + pos[1] * 4] = m[2];

	out[4 + pos[0] + pos[1] * 4] = m[3];
	out[5 + pos[0] + pos[1] * 4] = m[4];
	out[6 + pos[0] + pos[1] * 4] = m[5];

	out[8 + pos[0] + pos[1] * 4] = m[6];
	out[9 + pos[0] + pos[1] * 4] = m[7];
	out[10 + pos[0] + pos[1] * 4] = m[8];

	return out;
};

mat4.rotation = function(out, m) {
	out[0] = m[0];
	out[1] = m[1];
	out[2] = m[2];
	out[3] = 0.0;

	out[4] = m[4];
	out[5] = m[5];
	out[6] = m[6];
	out[7] = 0.0;

	out[8] = m[8];
	out[9] = m[9];
	out[10] = m[10];
	out[11] = 0.0;

	out[12] = 0.0;
	out[13] = 0.0;
	out[14] = 0.0;
	out[15] = 1.0;

	return out;
};

mat4.translation = function(out, m) {
	out[0] = m[12];
	out[1] = m[13];
	out[2] = m[14];

	return out;
};

mat4.getScale = function(out, m) {
	out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2] + m[3] * m[3]);
	out[1] = Math.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6] + m[7] * m[7]);
	out[2] = Math.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10] + m[11] * m[11]);

	return out;
};

mat4.normalize = function(out, m) {
	var v;

	v = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2] + m[3] * m[3]);
	out[0] = m[0] / v;
	out[1] = m[1] / v;
	out[2] = m[2] / v;
	out[3] = m[3] / v;
	v = Math.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6] + m[7] * m[7]);
	out[4] = m[4] / v;
	out[5] = m[5] / v;
	out[6] = m[6] / v;
	out[7] = m[7] / v;
	v = Math.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10] + m[11] * m[11]);
	out[8] = m[8] / v;
	out[9] = m[9] / v;
	out[10] = m[10] / v;
	out[11] = m[11] / v;
	v = Math.sqrt(m[12] * m[12] + m[13] * m[13] + m[14] * m[14] + m[15] * m[15]);
	out[12] = m[12] / v;
	out[13] = m[13] / v;
	out[14] = m[14] / v;
	out[15] = m[15] / v;

	return out;
};

/**
 * Creates a matrix from a rotation, translation and scale
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} r Rotation quaternion
 * @param {vec3} t Translation vector
 * @param {vec3} s Scale vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function(out, r, t, s) {
	mat4.fromRotationTranslation(out, r, t);
	mat4.scale(out, out, s);

	return out;
};

/**
 * Creates a matrix from translation
 */
mat4.fromTranslation = function(out, v) {
	out[0] = 1.0;
	out[1] = 0.0;
	out[2] = 0.0;
	out[3] = 0.0;
	out[4] = 0.0;
	out[5] = 1.0;
	out[6] = 0.0;
	out[7] = 0.0;
	out[8] = 0.0;
	out[9] = 0.0;
	out[10] = 1.0;
	out[11] = 0.0;
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1.0;

	return out;
};

/**
 * Decomposes the matrix m to its Translation-Rotation-Scale components
 */
mat4.decompose = function(outTranslation, outRotation, outScale, m) {
	mat4.translation(outTranslation, m);
	quat.fromMat4(outRotation, m);
	mat4.getScale(outScale, m);
};

mat4.isIdentity = function(m) {
	if (Math.abs(m[0] - 1.0) > EPSILON) return false;

	if (Math.abs(m[5] - 1.0) > EPSILON) return false;

	if (Math.abs(m[10] - 1.0) > EPSILON) return false;

	if (Math.abs(m[15] - 1.0) > EPSILON) return false;

	if (Math.abs(m[1]) > EPSILON) return false;

	if (Math.abs(m[2]) > EPSILON) return false;

	if (Math.abs(m[3]) > EPSILON) return false;

	if (Math.abs(m[4]) > EPSILON) return false;

	if (Math.abs(m[6]) > EPSILON) return false;

	if (Math.abs(m[7]) > EPSILON) return false;

	if (Math.abs(m[8]) > EPSILON) return false;

	if (Math.abs(m[9]) > EPSILON) return false;

	if (Math.abs(m[11]) > EPSILON) return false;

	if (Math.abs(m[12]) > EPSILON) return false;

	if (Math.abs(m[13]) > EPSILON) return false;

	if (Math.abs(m[14]) > EPSILON) return false;

	return true;
};

if (typeof quat === 'undefined') {
	globalThis.quat = {};
}

quat.euler = function(out, pitch, yaw, roll) {
	var Deg2Rad = (Math.PI * 2.0) / 360.0;
	var q = quat.create();

	var dir = vec3.fromValues(0.0, 0.0, 1.0);

	quat.setAxisAngle(out, dir, Deg2Rad * roll); // Qz

	vec3.set(dir, 0.0, 1.0, 0.0);
	quat.setAxisAngle(q, dir, Deg2Rad * yaw); // Qy

	quat.mul(out, out, q); // Qz * Qy

	vec3.set(dir, 1.0, 0.0, 0.0);
	quat.setAxisAngle(q, dir, Deg2Rad * pitch); // Qx

	quat.mul(out, out, q); // (Qz * Qy) * Qx

	return out;
};

quat.getEuler = function(out, q) {
	var Rad2Deg = 360.0 / (Math.PI * 2.0);

	var m = mat4.fromRotationTranslation(mat4.create(), q, [0.0, 0.0, 0.0]);
	var cmp = function(a, b) {
		return Math.abs(a - b) <= EPSILON;
	};

	var crossPositive = function(q1, eulerAngles) {
		var q2 = quat.euler(quat.create(), eulerAngles[0], eulerAngles[1], eulerAngles[2]);

		quat.normalize(q2, q2);
		var diff = quat.rotationDifference(quat.create(), q1, q2);

		return (Math.abs(1.0 - diff[3]) < EPSILON);
	};

	if (!cmp(Math.abs(m[2]), 1.0)) {
		var solution = function(theta) {
			var cosTheta = Math.cos(theta);

			out[0] = Math.atan2(m[6] / cosTheta, m[10] / cosTheta) * Rad2Deg;
			out[1] = theta * Rad2Deg;
			out[2] = Math.atan2(m[1] / cosTheta, m[0] / cosTheta) * Rad2Deg;
		};

		var theta = -Math.asin(m[2]);

		solution(theta);

		if (!crossPositive(q, out)) { // use second solution set
			theta = Math.PI - theta;
			solution(theta);
		}
	} else {
		if (cmp(m[2], -1.0)) {
			out[0] = 0.0;
			out[1] = 90.0;
			out[2] = -Rad2Deg * Math.atan2(m[4], m[8]);
		} else {
			out[0] = 0.0;
			out[1] = -90.0;
			out[2] = Rad2Deg * Math.atan2(-m[4], -m[8]);
		}
	}

	return out;
};

quat.fromMat3 = function(out, m) {
	var tr = m[0] + m[4] + m[8];
	if (tr > EPSILON) {
		var s = Math.sqrt(1.0 + tr) * 2.0;

		out[3] = 0.25 * s;
		out[0] = (m[5] - m[7]) / s;
		out[1] = (m[6] - m[2]) / s;
		out[2] = (m[1] - m[3]) / s;
	} else if ((m[0] > m[4]) && (m[0] > m[8])) {
		var s = Math.sqrt(1.0 + m[0] - m[4] - m[8]) * 2.0;

		out[3] = (m[5] - m[7]) / s;
		out[0] = 0.25 * s;
		out[1] = (m[1] + m[3]) / s;
		out[2] = (m[6] + m[2]) / s;
	} else if (m[4] > m[8]) {
		var s = Math.sqrt(1.0 + m[4] - m[0] - m[8]) * 2.0;

		out[3] = (m[6] - m[2]) / s;
		out[0] = (m[1] + m[3]) / s;
		out[1] = 0.25 * s;
		out[2] = (m[5] + m[7]) / s;
	} else {
		var s = Math.sqrt(1.0 + m[8] - m[0] - m[4]) * 2.0;

		out[3] = (m[1] - m[3]) / s;
		out[0] = (m[6] + m[2]) / s;
		out[1] = (m[5] + m[7]) / s;
		out[2] = 0.25 * s;
	}

	return out;
};

quat.fromMat4 = function(out, m) {
	var rot = mat4.submat3(mat3.create(), m, [0, 0]);

	mat3.normalize(rot, rot);
	quat.fromMat3(out, rot);
	quat.normalize(out, out);

	return out;
};

quat.rotationDifference = function(out, q1, q2) {
	quat.multiply(out, q2, quat.conjugate(quat.create(), q1));

	return out;
};

/**
 * @return Angle between two quaternions in radians
 */
quat.angle = function(q1, q2) {
	var cosTheta = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3];
	if (Math.abs(1.0 - cosTheta) < EPSILON) {
		cosTheta = 1.0;
	}

	if (Math.abs(1.0 + cosTheta) < EPSILON) {
		cosTheta = -1.0;
	}

	return Math.acos(cosTheta) * 2.0;
};

quat.slerp = function(out, q1, q2, t) {
	var cos = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3]; // cosine of the angle between the two rotations
	if (Math.abs(1.0 - cos) < EPSILON) cos = 1.0;

	if (Math.abs(1.0 + cos) < EPSILON) cos = -1.0;

	var scale1, scale2;
	if ((1.0 - Math.abs(cos)) > EPSILON) {
		var halfAngle = Math.acos(Math.abs(cos));
		var sin = Math.sin(halfAngle);

		scale1 = Math.sin(((1.0 - t) * halfAngle) / sin);
		scale2 = Math.sin((t * halfAngle) / sin);
	} else {
		scale1 = 1.0 - t;
		scale2 = t;
	}

	if (cos < 0.0) {
		scale2 = -scale2;
	}

	var q1scaled = quat.scale(quat.create(), q1, scale1);
	var q2scaled = quat.scale(quat.create(), q2, scale2);

	quat.add(out, q1scaled, q2scaled);

	return out;
};

/**
 * Finds the quaternion twist about an arbitrary axis
 * @param {quat} q The quaternion
 * @param {vec3} axis The normalized axis
 * @return {Number} Quaternion twist about the axis in radians
 */
quat.getTwist = function(q, axis) {
	// get the plane the axis is a normal of
	var orthoNormal = vec3.create();
	var w = vec3.transformQuat(vec3.create(), axis, quat.euler(quat.create(), 90.0, 0.0, 0.0));
	var dot = vec3.dot(axis, w);
	if (Math.abs(dot) > 0.6) {
		w = vec3.transformQuat(axis, quat.euler(quat.create(), 0.0, 90.0, 0.0));
	}

	vec3.normalize(w, w);
	vec3.cross(orthoNormal, axis, w);
	vec3.normalize(orthoNormal, orthoNormal);
	var t = vec3.transformQuat(vec3.create(), orthoNormal, q);

	// project transformed vector onto the plane
	var projected = vec3.sub(vec3.create(), t, vec3.scale(vec3.create(), axis, vec3.dot(t, axis)));

	vec3.normalize(projected, projected);

	// get angle between original vector and projected vector to get angle around normal
	return Math.acos(vec3.dot(orthoNormal, projected));
};

if (typeof vec3 === 'undefined') {
	globalThis.vec3 = {};
}

/** Helper function for transforming an entire vec3 array by matrix m starting from offset. */
vec3.transformVertexArrayMat4 = function(inoutArray, m, offset) {
	var x = 0.0; var y = 0.0; var z = 0.0;
	for (var i = offset; i < inoutArray.length; i += 3) {
		x = inoutArray[i];
		y = inoutArray[i + 1];
		z = inoutArray[i + 2];
		inoutArray[i] = m[0] * x + m[4] * y + m[8] * z + m[12];
		inoutArray[i + 1] = m[1] * x + m[5] * y + m[9] * z + m[13];
		inoutArray[i + 2] = m[2] * x + m[6] * y + m[10] * z + m[14];
	}

	return inoutArray;
};

/** Helper function for transforming an entire vec3 array by quaternion q starting from offset. */
vec3.transformVertexArrayQuat = function(inoutArray, q, offset) {
	var x = 0.0; var y = 0.0; var z = 0.0;
	var qx = q[0]; var qy = q[1]; var qz = q[2]; var qw = q[3];
	var ix = 0.0; var iy = 0.0; var iz = 0.0; var iw = 0.0;

	for (var i = offset; i < inoutArray.length; i += 3) {
		x = inoutArray[i];
		y = inoutArray[i + 1];
		z = inoutArray[i + 2];
		ix = qw * x + qy * z - qz * y;
		iy = qw * y + qz * x - qx * z;
		iz = qw * z + qx * y - qy * x;
		iw = -qx * x - qy * y - qz * z;
		inoutArray[i] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		inoutArray[i + 1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		inoutArray[i + 2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	}

	return inoutArray;
};

/** Writes point + direction * d to out. */
vec3.scaleAndAdd = function(out, point, direction, d) {
	out[0] = point[0] + direction[0] * d;
	out[1] = point[1] + direction[1] * d;
	out[2] = point[2] + direction[2] * d;

	return out;
};

/** Linearly interpolates two float values */
function lerp(v0, v1, t) {
	return v0 + (v1 - v0) * t;
}

globalThis.lerp = lerp;

/** Clamps angle in radians between min and max */
function clampAngle(angle, min, max) {
	if (angle < -2.0 * Math.PI) {
		angle += 2.0 * Math.PI;
	}

	if (angle > 2.0 * Math.PI) {
		angle -= 2.0 * Math.PI;
	}

	angle = Math.max(min, angle);
	angle = Math.min(max, angle);

	return angle;
}

globalThis.clampAngle = clampAngle;

function nextLowestPowerOfTwo(x) {
	return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(x) / Math.log(2))), 2048), 1);
}

globalThis.nextLowestPowerOfTwo = nextLowestPowerOfTwo;

function nextHighestPowerOfTwo(x) {
	return Math.max(Math.min(Math.pow(2, Math.ceil(Math.log(x) / Math.log(2))), 2048), 1);
}

globalThis.nextHighestPowerOfTwo = nextHighestPowerOfTwo;
