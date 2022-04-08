var vec2 = {};

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

vec2.create = function() {
    return new Float32Array(2);
};

vec2.clone = function(a) {
    var out = new Float32Array(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

vec2.fromValues = function(x, y) {
    var out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
};

vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

vec2.sub = vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

vec2.mul = vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

vec2.div = vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

vec2.dist = vec2.distance = function(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
};

vec2.sqrDist = vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return x * x + y * y;
};

vec2.len = vec2.length = function(a) {
    var x = a[0], y = a[1];
    return Math.sqrt(x * x + y * y);
};

vec2.sqrLen = vec2.squaredLength = function(a) {
    var x = a[0], y = a[1];
    return x * x + y * y;
};

vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

vec2.normalize = function(out, a) {
    var x = a[0], y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

vec2.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

vec2.lerp = function(out, a, b, t) {
    var ax = a[0], ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

vec2.transformMat2 = function(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = x * m[0] + y * m[1];
    out[1] = x * m[2] + y * m[3];
    return out;
};

vec2.forEach = function() {
    var vec = new Float32Array(2);
    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 2;
        }
        if (!offset) {
            offset = 0;
        }
        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }
        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
        }
        return a;
    };
}();

vec2.str = function(a) {
    return "vec2(" + a[0] + ", " + a[1] + ")";
};

if (typeof exports !== "undefined") {
    exports.vec2 = vec2;
}

if (typeof vec3 === "undefined") {
    var vec3 = {};
}

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

vec3.create = function() {
    return new Float32Array(3);
};

vec3.clone = function(a) {
    var out = new Float32Array(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

vec3.fromValues = function(x, y, z) {
    var out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

vec3.sub = vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

vec3.mul = vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

vec3.div = vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

vec3.dist = vec3.distance = function(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

vec3.sqrDist = vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
    return x * x + y * y + z * z;
};

vec3.len = vec3.length = function(a) {
    var x = a[0], y = a[1], z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

vec3.sqrLen = vec3.squaredLength = function(a) {
    var x = a[0], y = a[1], z = a[2];
    return x * x + y * y + z * z;
};

vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

vec3.normalize = function(out, a) {
    var x = a[0], y = a[1], z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

vec3.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

vec3.lerp = function(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

vec3.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

vec3.forEach = function() {
    var vec = new Float32Array(3);
    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 3;
        }
        if (!offset) {
            offset = 0;
        }
        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }
        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
        }
        return a;
    };
}();

vec3.str = function(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
};

if (typeof exports !== "undefined") {
    exports.vec3 = vec3;
}

var vec4 = {};

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

vec4.create = function() {
    return new Float32Array(4);
};

vec4.clone = function(a) {
    var out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

vec4.fromValues = function(x, y, z, w) {
    var out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

vec4.sub = vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

vec4.mul = vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

vec4.div = vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

vec4.dist = vec4.distance = function(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2], w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

vec4.sqrDist = vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2], w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
};

vec4.len = vec4.length = function(a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

vec4.sqrLen = vec4.squaredLength = function(a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    return x * x + y * y + z * z + w * w;
};

vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

vec4.normalize = function(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var len = x * x + y * y + z * z + w * w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

vec4.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

vec4.lerp = function(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

vec4.forEach = function() {
    var vec = new Float32Array(4);
    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 4;
        }
        if (!offset) {
            offset = 0;
        }
        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }
        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
            a[i + 3] = vec[3];
        }
        return a;
    };
}();

vec4.str = function(a) {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
};

if (typeof exports !== "undefined") {
    exports.vec4 = vec4;
}

var mat2 = {};

var mat2Identity = new Float32Array([ 1, 0, 0, 1 ]);

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

mat2.create = function() {
    return new Float32Array(mat2Identity);
};

mat2.clone = function(a) {
    var out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

mat2.transpose = function(out, a) {
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    return out;
};

mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], det = a0 * a3 - a2 * a1;
    if (!det) {
        return null;
    }
    det = 1 / det;
    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
};

mat2.adjoint = function(out, a) {
    var a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;
    return out;
};

mat2.determinant = function(a) {
    return a[0] * a[3] - a[2] * a[1];
};

mat2.mul = mat2.multiply = function(out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

mat2.rotate = function(out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], s = Math.sin(rad), c = Math.cos(rad);
    out[0] = a0 * c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 * c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

mat2.str = function(a) {
    return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
};

if (typeof exports !== "undefined") {
    exports.mat2 = mat2;
}

if (typeof mat3 === "undefined") {
    var mat3 = {};
}

var mat3Identity = new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

mat3.create = function() {
    return new Float32Array(mat3Identity);
};

mat3.clone = function(a) {
    var out = new Float32Array(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

mat3.transpose = function(out, a) {
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    return out;
};

mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b01 = a22 * a11 - a12 * a21, b11 = -a22 * a10 + a12 * a20, b21 = a21 * a10 - a11 * a20, det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
        return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
};

mat3.determinant = function(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

mat3.mul = mat3.multiply = function(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b00 = b[0], b01 = b[1], b02 = b[2], b10 = b[3], b11 = b[4], b12 = b[5], b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

mat3.str = function(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
};

if (typeof exports !== "undefined") {
    exports.mat3 = mat3;
}

if (typeof mat4 === "undefined") {
    var mat4 = {};
}

var mat4Identity = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

mat4.create = function() {
    return new Float32Array(mat4Identity);
};

mat4.clone = function(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

mat4.transpose = function(out, a) {
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    return out;
};

mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
        return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
};

mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
};

mat4.determinant = function(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

mat4.mul = mat4.multiply = function(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
};

mat4.translate = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
};

mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

mat4.rotate = function(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
    if (Math.abs(len) < GLMAT_EPSILON) {
        return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

mat4.rotateX = function(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

mat4.rotateY = function(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

mat4.rotateZ = function(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

mat4.fromRotationTranslation = function(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

mat4.frustum = function(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left), tb = 1 / (top - bottom), nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
};

mat4.perspective = function(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
};

mat4.ortho = function(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

mat4.lookAt = function(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
    if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
};

mat4.str = function(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
};

if (typeof exports !== "undefined") {
    exports.mat4 = mat4;
}

if (typeof quat === "undefined") {
    var quat = {};
}

var quatIdentity = new Float32Array([ 0, 0, 0, 1 ]);

if (!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 1e-6;
}

quat.create = function() {
    return new Float32Array(quatIdentity);
};

quat.clone = vec4.clone;

quat.fromValues = vec4.fromValues;

quat.copy = vec4.copy;

quat.set = vec4.set;

quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * .5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

quat.add = vec4.add;

quat.mul = quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

quat.scale = vec4.scale;

quat.rotateX = function(out, a, rad) {
    rad *= .5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

quat.rotateY = function(out, a, rad) {
    rad *= .5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3], by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

quat.rotateZ = function(out, a, rad) {
    rad *= .5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3], bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

quat.calculateW = function(out, a) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
    return out;
};

quat.dot = vec4.dot;

quat.lerp = vec4.lerp;

quat.slerp = function(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = a[3];
    var cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw, halfTheta, sinHalfTheta, ratioA, ratioB;
    if (Math.abs(cosHalfTheta) >= 1) {
        if (out !== a) {
            out[0] = ax;
            out[1] = ay;
            out[2] = az;
            out[3] = aw;
        }
        return out;
    }
    halfTheta = Math.acos(cosHalfTheta);
    sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
    if (Math.abs(sinHalfTheta) < .001) {
        out[0] = ax * .5 + bx * .5;
        out[1] = ay * .5 + by * .5;
        out[2] = az * .5 + bz * .5;
        out[3] = aw * .5 + bw * .5;
        return out;
    }
    ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    out[0] = ax * ratioA + bx * ratioB;
    out[1] = ay * ratioA + by * ratioB;
    out[2] = az * ratioA + bz * ratioB;
    out[3] = aw * ratioA + bw * ratioB;
    return out;
};

quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3, invDot = dot ? 1 / dot : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
};

quat.conjugate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

quat.len = quat.length = vec4.length;

quat.sqrLen = quat.squaredLength = vec4.squaredLength;

quat.normalize = vec4.normalize;

quat.str = function(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
};

var EPSILON = 1e-6;

if (typeof mat3 === "undefined") {
    var mat3 = {};
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

if (typeof mat4 === "undefined") {
    var mat4 = {};
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
    out[3] = 0;
    out[4] = m[4];
    out[5] = m[5];
    out[6] = m[6];
    out[7] = 0;
    out[8] = m[8];
    out[9] = m[9];
    out[10] = m[10];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
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

mat4.fromRotationTranslationScale = function(out, r, t, s) {
    mat4.fromRotationTranslation(out, r, t);
    mat4.scale(out, out, s);
    return out;
};

mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

mat4.decompose = function(outTranslation, outRotation, outScale, m) {
    mat4.translation(outTranslation, m);
    quat.fromMat4(outRotation, m);
    mat4.getScale(outScale, m);
};

mat4.isIdentity = function(m) {
    if (Math.abs(m[0] - 1) > EPSILON) return false;
    if (Math.abs(m[5] - 1) > EPSILON) return false;
    if (Math.abs(m[10] - 1) > EPSILON) return false;
    if (Math.abs(m[15] - 1) > EPSILON) return false;
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

if (typeof quat === "undefined") {
    var quat = {};
}

quat.euler = function(out, pitch, yaw, roll) {
    var Deg2Rad = Math.PI * 2 / 360;
    var q = quat.create();
    var dir = vec3.fromValues(0, 0, 1);
    quat.setAxisAngle(out, dir, Deg2Rad * roll);
    vec3.set(dir, 0, 1, 0);
    quat.setAxisAngle(q, dir, Deg2Rad * yaw);
    quat.mul(out, out, q);
    vec3.set(dir, 1, 0, 0);
    quat.setAxisAngle(q, dir, Deg2Rad * pitch);
    quat.mul(out, out, q);
    return out;
};

quat.getEuler = function(out, q) {
    var Rad2Deg = 360 / (Math.PI * 2);
    var m = mat4.fromRotationTranslation(mat4.create(), q, [ 0, 0, 0 ]);
    var cmp = function(a, b) {
        return Math.abs(a - b) <= EPSILON;
    };
    var crossPositive = function(q1, eulerAngles) {
        var q2 = quat.euler(quat.create(), eulerAngles[0], eulerAngles[1], eulerAngles[2]);
        quat.normalize(q2, q2);
        var diff = quat.rotationDifference(quat.create(), q1, q2);
        return Math.abs(1 - diff[3]) < EPSILON;
    };
    if (!cmp(Math.abs(m[2]), 1)) {
        var solution = function(theta) {
            var cosTheta = Math.cos(theta);
            out[0] = Math.atan2(m[6] / cosTheta, m[10] / cosTheta) * Rad2Deg;
            out[1] = theta * Rad2Deg;
            out[2] = Math.atan2(m[1] / cosTheta, m[0] / cosTheta) * Rad2Deg;
        };
        var theta = -Math.asin(m[2]);
        solution(theta);
        if (!crossPositive(q, out)) {
            theta = Math.PI - theta;
            solution(theta);
        }
    } else {
        if (cmp(m[2], -1)) {
            out[0] = 0;
            out[1] = 90;
            out[2] = -Rad2Deg * Math.atan2(m[4], m[8]);
        } else {
            out[0] = 0;
            out[1] = -90;
            out[2] = Rad2Deg * Math.atan2(-m[4], -m[8]);
        }
    }
    return out;
};

quat.fromMat3 = function(out, m) {
    var tr = m[0] + m[4] + m[8];
    if (tr > EPSILON) {
        var s = Math.sqrt(1 + tr) * 2;
        out[3] = .25 * s;
        out[0] = (m[5] - m[7]) / s;
        out[1] = (m[6] - m[2]) / s;
        out[2] = (m[1] - m[3]) / s;
    } else if (m[0] > m[4] && m[0] > m[8]) {
        var s = Math.sqrt(1 + m[0] - m[4] - m[8]) * 2;
        out[3] = (m[5] - m[7]) / s;
        out[0] = .25 * s;
        out[1] = (m[1] + m[3]) / s;
        out[2] = (m[6] + m[2]) / s;
    } else if (m[4] > m[8]) {
        var s = Math.sqrt(1 + m[4] - m[0] - m[8]) * 2;
        out[3] = (m[6] - m[2]) / s;
        out[0] = (m[1] + m[3]) / s;
        out[1] = .25 * s;
        out[2] = (m[5] + m[7]) / s;
    } else {
        var s = Math.sqrt(1 + m[8] - m[0] - m[4]) * 2;
        out[3] = (m[1] - m[3]) / s;
        out[0] = (m[6] + m[2]) / s;
        out[1] = (m[5] + m[7]) / s;
        out[2] = .25 * s;
    }
    return out;
};

quat.fromMat4 = function(out, m) {
    var rot = mat4.submat3(mat3.create(), m, [ 0, 0 ]);
    mat3.normalize(rot, rot);
    quat.fromMat3(out, rot);
    quat.normalize(out, out);
    return out;
};

quat.rotationDifference = function(out, q1, q2) {
    quat.multiply(out, q2, quat.conjugate(quat.create(), q1));
    return out;
};

quat.angle = function(q1, q2) {
    var cosTheta = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3];
    if (Math.abs(1 - cosTheta) < EPSILON) cosTheta = 1;
    if (Math.abs(1 + cosTheta) < EPSILON) cosTheta = -1;
    return Math.acos(cosTheta) * 2;
};

quat.slerp = function(out, q1, q2, t) {
    var cos = q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3];
    if (Math.abs(1 - cos) < EPSILON) cos = 1;
    if (Math.abs(1 + cos) < EPSILON) cos = -1;
    var scale1, scale2;
    if (1 - Math.abs(cos) > EPSILON) {
        var halfAngle = Math.acos(Math.abs(cos));
        var sin = Math.sin(halfAngle);
        scale1 = Math.sin((1 - t) * halfAngle / sin);
        scale2 = Math.sin(t * halfAngle / sin);
    } else {
        scale1 = 1 - t;
        scale2 = t;
    }
    if (cos < 0) scale2 = -scale2;
    var q1scaled = quat.scale(quat.create(), q1, scale1);
    var q2scaled = quat.scale(quat.create(), q2, scale2);
    quat.add(out, q1scaled, q2scaled);
    return out;
};

quat.getTwist = function(q, axis) {
    var orthoNormal = vec3.create();
    var w = vec3.transformQuat(vec3.create(), axis, quat.euler(quat.create(), 90, 0, 0));
    var dot = vec3.dot(axis, w);
    if (Math.abs(dot) > .6) w = vec3.transformQuat(axis, quat.euler(quat.create(), 0, 90, 0));
    vec3.normalize(w, w);
    vec3.cross(orthoNormal, axis, w);
    vec3.normalize(orthoNormal, orthoNormal);
    var t = vec3.transformQuat(vec3.create(), orthoNormal, q);
    var projected = vec3.sub(vec3.create(), t, vec3.scale(vec3.create(), axis, vec3.dot(t, axis)));
    vec3.normalize(projected, projected);
    return Math.acos(vec3.dot(orthoNormal, projected));
};

if (typeof vec3 === "undefined") {
    var vec3 = {};
}

vec3.transformVertexArrayMat4 = function(inoutArray, m, offset) {
    var x = 0, y = 0, z = 0;
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

vec3.transformVertexArrayQuat = function(inoutArray, q, offset) {
    var x = 0, y = 0, z = 0, qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = 0, iy = 0, iz = 0, iw = 0;
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

vec3.scaleAndAdd = function(out, point, direction, d) {
    out[0] = point[0] + direction[0] * d;
    out[1] = point[1] + direction[1] * d;
    out[2] = point[2] + direction[2] * d;
    return out;
};

function lerp(v0, v1, t) {
    return v0 + (v1 - v0) * t;
}

function clampAngle(angle, min, max) {
    if (angle < -2 * Math.PI) angle += 2 * Math.PI;
    if (angle > 2 * Math.PI) angle -= 2 * Math.PI;
    angle = Math.max(min, angle);
    angle = Math.min(max, angle);
    return angle;
}

function nextLowestPowerOfTwo(x) {
    return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(x) / Math.log(2))), 2048), 1);
}

function nextHighestPowerOfTwo(x) {
    return Math.max(Math.min(Math.pow(2, Math.ceil(Math.log(x) / Math.log(2))), 2048), 1);
}

(function(global) {
    var compatibility = {
        ArrayBuffer: typeof ArrayBuffer !== "undefined",
        DataView: typeof DataView !== "undefined" && ("getFloat64" in DataView.prototype || "getFloat64" in new DataView(new ArrayBuffer(1))),
        NodeBuffer: typeof Buffer !== "undefined" && "readInt16LE" in Buffer.prototype
    };
    var dataTypes = {
        Int8: 1,
        Int16: 2,
        Int32: 4,
        Uint8: 1,
        Uint16: 2,
        Uint32: 4,
        Float32: 4,
        Float64: 8
    };
    var nodeNaming = {
        Int8: "Int8",
        Int16: "Int16",
        Int32: "Int32",
        Uint8: "UInt8",
        Uint16: "UInt16",
        Uint32: "UInt32",
        Float32: "Float",
        Float64: "Double"
    };
    var jDataView = function(buffer, byteOffset, byteLength, littleEndian) {
        if (!(this instanceof jDataView)) {
            throw new Error("jDataView constructor may not be called as a function");
        }
        this.buffer = buffer;
        if (!(compatibility.NodeBuffer && buffer instanceof Buffer) && !(compatibility.ArrayBuffer && buffer instanceof ArrayBuffer) && typeof buffer !== "string") {
            throw new TypeError("jDataView buffer has an incompatible type");
        }
        this._isArrayBuffer = compatibility.ArrayBuffer && buffer instanceof ArrayBuffer;
        this._isDataView = compatibility.DataView && this._isArrayBuffer;
        this._isNodeBuffer = compatibility.NodeBuffer && buffer instanceof Buffer;
        this._littleEndian = littleEndian === undefined ? false : littleEndian;
        var bufferLength = this._isArrayBuffer ? buffer.byteLength : buffer.length;
        if (byteOffset === undefined) {
            byteOffset = 0;
        }
        this.byteOffset = byteOffset;
        if (byteLength === undefined) {
            byteLength = bufferLength - byteOffset;
        }
        this.byteLength = byteLength;
        if (!this._isDataView) {
            if (typeof byteOffset !== "number") {
                throw new TypeError("jDataView byteOffset is not a number");
            }
            if (typeof byteLength !== "number") {
                throw new TypeError("jDataView byteLength is not a number");
            }
            if (byteOffset < 0) {
                throw new Error("jDataView byteOffset is negative");
            }
            if (byteLength < 0) {
                throw new Error("jDataView byteLength is negative");
            }
        }
        if (this._isDataView) {
            this._view = new DataView(buffer, byteOffset, byteLength);
            this._start = 0;
        }
        this._start = byteOffset;
        if (byteOffset + byteLength > bufferLength) {
            throw new Error("jDataView (byteOffset + byteLength) value is out of bounds");
        }
        this._offset = 0;
        if (this._isDataView) {
            for (var type in dataTypes) {
                if (!dataTypes.hasOwnProperty(type)) {
                    continue;
                }
                (function(type, view) {
                    var size = dataTypes[type];
                    view["get" + type] = function(byteOffset, littleEndian) {
                        if (littleEndian === undefined) {
                            littleEndian = view._littleEndian;
                        }
                        if (byteOffset === undefined) {
                            byteOffset = view._offset;
                        }
                        view._offset = byteOffset + size;
                        return view._view["get" + type](byteOffset, littleEndian);
                    };
                })(type, this);
            }
        } else if (this._isNodeBuffer && compatibility.NodeBuffer) {
            for (var type in dataTypes) {
                if (!dataTypes.hasOwnProperty(type)) {
                    continue;
                }
                var name;
                if (type === "Int8" || type === "Uint8") {
                    name = "read" + nodeNaming[type];
                } else if (littleEndian) {
                    name = "read" + nodeNaming[type] + "LE";
                } else {
                    name = "read" + nodeNaming[type] + "BE";
                }
                (function(type, view, name) {
                    var size = dataTypes[type];
                    view["get" + type] = function(byteOffset, littleEndian) {
                        if (littleEndian === undefined) {
                            littleEndian = view._littleEndian;
                        }
                        if (byteOffset === undefined) {
                            byteOffset = view._offset;
                        }
                        view._offset = byteOffset + size;
                        return view.buffer[name](view._start + byteOffset);
                    };
                })(type, this, name);
            }
        } else {
            for (var type in dataTypes) {
                if (!dataTypes.hasOwnProperty(type)) {
                    continue;
                }
                (function(type, view) {
                    var size = dataTypes[type];
                    view["get" + type] = function(byteOffset, littleEndian) {
                        if (littleEndian === undefined) {
                            littleEndian = view._littleEndian;
                        }
                        if (byteOffset === undefined) {
                            byteOffset = view._offset;
                        }
                        view._offset = byteOffset + size;
                        if (view._isArrayBuffer && (view._start + byteOffset) % size === 0 && (size === 1 || littleEndian)) {
                            return new global[type + "Array"](view.buffer, view._start + byteOffset, 1)[0];
                        } else {
                            if (typeof byteOffset !== "number") {
                                throw new TypeError("jDataView byteOffset is not a number");
                            }
                            if (byteOffset + size > view.byteLength) {
                                throw new Error("jDataView (byteOffset + size) value is out of bounds");
                            }
                            return view["_get" + type](view._start + byteOffset, littleEndian);
                        }
                    };
                })(type, this);
            }
        }
    };
    if (compatibility.NodeBuffer) {
        jDataView.createBuffer = function() {
            var buffer = new Buffer(arguments.length);
            for (var i = 0; i < arguments.length; ++i) {
                buffer[i] = arguments[i];
            }
            return buffer;
        };
    } else if (compatibility.ArrayBuffer) {
        jDataView.createBuffer = function() {
            var buffer = new ArrayBuffer(arguments.length);
            var view = new Int8Array(buffer);
            for (var i = 0; i < arguments.length; ++i) {
                view[i] = arguments[i];
            }
            return buffer;
        };
    } else {
        jDataView.createBuffer = function() {
            return String.fromCharCode.apply(null, arguments);
        };
    }
    jDataView.prototype = {
        compatibility: compatibility,
        getString: function(length, byteOffset) {
            var value;
            if (byteOffset === undefined) {
                byteOffset = this._offset;
            }
            if (typeof byteOffset !== "number") {
                throw new TypeError("jDataView byteOffset is not a number");
            }
            if (length < 0 || byteOffset + length > this.byteLength) {
                throw new Error("jDataView length or (byteOffset+length) value is out of bounds");
            }
            if (this._isNodeBuffer) {
                value = this.buffer.toString("ascii", this._start + byteOffset, this._start + byteOffset + length);
            } else {
                value = "";
                for (var i = 0; i < length; ++i) {
                    var char = this.getUint8(byteOffset + i);
                    value += String.fromCharCode(char > 127 ? 65533 : char);
                }
            }
            this._offset = byteOffset + length;
            return value;
        },
        getChar: function(byteOffset) {
            return this.getString(1, byteOffset);
        },
        tell: function() {
            return this._offset;
        },
        seek: function(byteOffset) {
            if (typeof byteOffset !== "number") {
                throw new TypeError("jDataView byteOffset is not a number");
            }
            if (byteOffset < 0 || byteOffset > this.byteLength) {
                throw new Error("jDataView byteOffset value is out of bounds");
            }
            return this._offset = byteOffset;
        },
        _endianness: function(byteOffset, pos, max, littleEndian) {
            return byteOffset + (littleEndian ? max - pos - 1 : pos);
        },
        _getFloat64: function(byteOffset, littleEndian) {
            var b0 = this._getUint8(this._endianness(byteOffset, 0, 8, littleEndian)), b1 = this._getUint8(this._endianness(byteOffset, 1, 8, littleEndian)), b2 = this._getUint8(this._endianness(byteOffset, 2, 8, littleEndian)), b3 = this._getUint8(this._endianness(byteOffset, 3, 8, littleEndian)), b4 = this._getUint8(this._endianness(byteOffset, 4, 8, littleEndian)), b5 = this._getUint8(this._endianness(byteOffset, 5, 8, littleEndian)), b6 = this._getUint8(this._endianness(byteOffset, 6, 8, littleEndian)), b7 = this._getUint8(this._endianness(byteOffset, 7, 8, littleEndian)), sign = 1 - 2 * (b0 >> 7), exponent = ((b0 << 1 & 255) << 3 | b1 >> 4) - (Math.pow(2, 10) - 1), mantissa = (b1 & 15) * Math.pow(2, 48) + b2 * Math.pow(2, 40) + b3 * Math.pow(2, 32) + b4 * Math.pow(2, 24) + b5 * Math.pow(2, 16) + b6 * Math.pow(2, 8) + b7;
            if (exponent === 1024) {
                if (mantissa !== 0) {
                    return NaN;
                } else {
                    return sign * Infinity;
                }
            }
            if (exponent === -1023) {
                return sign * mantissa * Math.pow(2, -1022 - 52);
            }
            return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);
        },
        _getFloat32: function(byteOffset, littleEndian) {
            var b0 = this._getUint8(this._endianness(byteOffset, 0, 4, littleEndian)), b1 = this._getUint8(this._endianness(byteOffset, 1, 4, littleEndian)), b2 = this._getUint8(this._endianness(byteOffset, 2, 4, littleEndian)), b3 = this._getUint8(this._endianness(byteOffset, 3, 4, littleEndian)), sign = 1 - 2 * (b0 >> 7), exponent = (b0 << 1 & 255 | b1 >> 7) - 127, mantissa = (b1 & 127) << 16 | b2 << 8 | b3;
            if (exponent === 128) {
                if (mantissa !== 0) {
                    return NaN;
                } else {
                    return sign * Infinity;
                }
            }
            if (exponent === -127) {
                return sign * mantissa * Math.pow(2, -126 - 23);
            }
            return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
        },
        _getInt32: function(byteOffset, littleEndian) {
            var b = this._getUint32(byteOffset, littleEndian);
            return b > Math.pow(2, 31) - 1 ? b - Math.pow(2, 32) : b;
        },
        _getUint32: function(byteOffset, littleEndian) {
            var b3 = this._getUint8(this._endianness(byteOffset, 0, 4, littleEndian)), b2 = this._getUint8(this._endianness(byteOffset, 1, 4, littleEndian)), b1 = this._getUint8(this._endianness(byteOffset, 2, 4, littleEndian)), b0 = this._getUint8(this._endianness(byteOffset, 3, 4, littleEndian));
            return b3 * Math.pow(2, 24) + (b2 << 16) + (b1 << 8) + b0;
        },
        _getInt16: function(byteOffset, littleEndian) {
            var b = this._getUint16(byteOffset, littleEndian);
            return b > Math.pow(2, 15) - 1 ? b - Math.pow(2, 16) : b;
        },
        _getUint16: function(byteOffset, littleEndian) {
            var b1 = this._getUint8(this._endianness(byteOffset, 0, 2, littleEndian)), b0 = this._getUint8(this._endianness(byteOffset, 1, 2, littleEndian));
            return (b1 << 8) + b0;
        },
        _getInt8: function(byteOffset) {
            var b = this._getUint8(byteOffset);
            return b > Math.pow(2, 7) - 1 ? b - Math.pow(2, 8) : b;
        },
        _getUint8: function(byteOffset) {
            if (this._isArrayBuffer) {
                return new Uint8Array(this.buffer, byteOffset, 1)[0];
            } else if (this._isNodeBuffer) {
                return this.buffer[byteOffset];
            } else {
                return this.buffer.charCodeAt(byteOffset) & 255;
            }
        }
    };
    if (typeof jQuery !== "undefined" && jQuery.fn.jquery >= "1.6.2") {
        var convertResponseBodyToText = function(byteArray) {
            var scrambledStr;
            try {
                scrambledStr = IEBinaryToArray_ByteStr(byteArray);
            } catch (e) {
                var IEBinaryToArray_ByteStr_Script = "Function IEBinaryToArray_ByteStr(Binary)\r\n" + "\tIEBinaryToArray_ByteStr = CStr(Binary)\r\n" + "End Function\r\n" + "Function IEBinaryToArray_ByteStr_Last(Binary)\r\n" + "\tDim lastIndex\r\n" + "\tlastIndex = LenB(Binary)\r\n" + "\tif lastIndex mod 2 Then\r\n" + "\t\tIEBinaryToArray_ByteStr_Last = AscB( MidB( Binary, lastIndex, 1 ) )\r\n" + "\tElse\r\n" + "\t\tIEBinaryToArray_ByteStr_Last = -1\r\n" + "\tEnd If\r\n" + "End Function\r\n";
                window.execScript(IEBinaryToArray_ByteStr_Script, "vbscript");
                scrambledStr = IEBinaryToArray_ByteStr(byteArray);
            }
            var lastChr = IEBinaryToArray_ByteStr_Last(byteArray), result = "", i = 0, l = scrambledStr.length % 8, thischar;
            while (i < l) {
                thischar = scrambledStr.charCodeAt(i++);
                result += String.fromCharCode(thischar & 255, thischar >> 8);
            }
            l = scrambledStr.length;
            while (i < l) {
                result += String.fromCharCode((thischar = scrambledStr.charCodeAt(i++), thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), 
                thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), 
                thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), 
                thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), thischar & 255), thischar >> 8, (thischar = scrambledStr.charCodeAt(i++), 
                thischar & 255), thischar >> 8);
            }
            if (lastChr > -1) {
                result += String.fromCharCode(lastChr);
            }
            return result;
        };
        jQuery.ajaxSetup({
            converters: {
                "* dataview": function(data) {
                    return new jDataView(data);
                }
            },
            accepts: {
                dataview: "text/plain; charset=x-user-defined"
            },
            responseHandler: {
                dataview: function(responses, options, xhr) {
                    if ("mozResponseArrayBuffer" in xhr) {
                        responses.text = xhr.mozResponseArrayBuffer;
                    } else if ("responseType" in xhr && xhr.responseType === "arraybuffer" && xhr.response) {
                        responses.text = xhr.response;
                    } else if ("responseBody" in xhr) {
                        responses.text = convertResponseBodyToText(xhr.responseBody);
                    } else {
                        responses.text = xhr.responseText;
                    }
                }
            }
        });
        jQuery.ajaxPrefilter("dataview", function(options, originalOptions, jqXHR) {
            if (jQuery.support.ajaxResponseType) {
                if (!options.hasOwnProperty("xhrFields")) {
                    options.xhrFields = {};
                }
                options.xhrFields.responseType = "arraybuffer";
            }
            options.mimeType = "text/plain; charset=x-user-defined";
        });
    }
    global.jDataView = (global.module || {}).exports = jDataView;
    if (typeof module !== "undefined") {
        module.exports = jDataView;
    }
})(this);

var FrakClass = function() {};

(function() {
    var initializing = false;
    var fnTest = /\b_super\b/;
    this.FrakClass = function() {};
    FrakClass.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            }(name, prop[name]) : prop[name];
        }
        prototype["_getset"] = function(member, fnBaseName) {
            var fnName;
            var getter = function() {
                return member;
            };
            var setter = function(value) {
                member = value;
            };
            fnName = "get" + fnBaseName;
            if (fnName in prop) {
                prototype[fnName] = function(fn) {
                    return function() {
                        var tmp = this._super;
                        this._super = getter;
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                }(prop[fnName]);
            } else {
                prototype[fnName] = getter;
            }
            fnName = "set" + fnBaseName;
            if (fnName in prop) {
                prototype[fnName] = function(fn) {
                    return function() {
                        var tmp = this._super;
                        this._super = setter;
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                }(prop[fnName]);
            } else {
                prototype[fnName] = setter;
            }
        };
        function FrakClass() {
            if (!initializing && this.init) this.init.apply(this, arguments);
        }
        FrakClass.prototype = prototype;
        FrakClass.prototype.constructor = FrakClass;
        FrakClass.extend = arguments.callee;
        return FrakClass;
    };
})();

function FrakCallback(classScope, fnCallback) {
    return function() {
        return fnCallback.apply(classScope, arguments);
    };
}

if (typeof window !== "undefined") {
    window.requestAnimFrame = function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 16);
        };
    }();
}

(function() {
    if (typeof window !== "undefined") {
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }
})();

if (typeof String.prototype.format !== "function") {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    };
}

if (typeof String.prototype.endsWith !== "function") {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var Logistics = function() {
    var storageSupport = false;
    if (typeof window !== "undefined") {
        storageSupport = "localStorage" in window && window["localStorage"] !== null;
    }
    var queue = [];
    var multiQueue = [];
    var loadedCount = 0;
    var loading = false;
    var afterLoadCallback = null;
    var progressCallback = null;
    var loadedCheckTimer = null;
    var options = {
        loadFromLocalStorage: false,
        storeToLocalStorage: false,
        loadFromFile: false,
        enableCORS: true,
        useCookies: false,
        fallbackFromStorage: false
    };
    var me = this;
    var typefunctions = {
        text: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                dt.data = http.responseText;
            },
            store: function(dt) {
                return dt.data;
            },
            restore: function(dt, data) {
                return data;
            }
        },
        json: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                try {
                    dt.data = JSON.parse(http.responseText);
                } catch (e) {
                    if (typeof console !== "undefined" && console.error) {
                        console.error("JSON parsing failed for " + dt.url, e);
                    }
                }
            },
            store: function(dt) {
                return JSON.stringify(dt.data);
            },
            restore: function(dt, data) {
                if (data) {
                    return JSON.parse(data);
                } else {
                    return {};
                }
            }
        },
        xml: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                if (http.responseXML) {
                    dt.data = http.responseXML;
                } else {
                    dt.data = parseXML(http.responseText);
                }
            },
            store: function(dt) {
                if (XMLSerializer) {
                    return new XMLSerializer().serializeToString(dt.data);
                } else {
                    return "";
                }
            },
            restore: function(dt, data) {
                return parseXML(data);
            }
        },
        image: {
            load: function(dt) {
                if (dt) {
                    dt.data = new Image();
                    if (dt.useCORS) {
                        dt.data.crossOrigin = "Anonymous";
                    }
                    dt.data.onload = function() {
                        dt.ready();
                    };
                    dt.data.onerror = function() {
                        dt.failed();
                    };
                    dt.data.src = dt.url;
                }
            },
            parse: function(dt) {},
            store: function(dt) {
                var canvas = document.createElement("canvas");
                canvas.width = dt.data.width;
                canvas.height = dt.data.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(dt.data, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                canvas = null;
                return dataURL;
            },
            restore: function(dt, data) {
                var img = new Image();
                img.src = data;
                return img;
            }
        },
        binary: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                dt.data = http.response;
            },
            store: function(dt) {
                var str = "";
                var bytes = new Uint8Array(dt.data);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    str += String.fromCharCode(bytes[i]);
                }
                return window.btoa(str);
            },
            restore: function(dt, data) {
                var buf = new ArrayBuffer(data.length * 2);
                var bufView = new Uint16Array(buf);
                for (var i = 0, strLen = data.length; i < strLen; i++) {
                    bufView[i] = data.charCodeAt(i);
                }
                return buf;
            }
        }
    };
    var DataTransporter = function(_url, _params, _success, _type, _requestType) {
        this.url = _url;
        this.params = _params;
        this.success = _success;
        this.dataType = _type;
        this.loaded = false;
        this.data = false;
        this.requestType = _requestType;
        this.useCORS = false;
        this.options = {};
        this.successCallback = _success;
        this.errorCallback = false;
        this.alwaysCallback = false;
        this.progressCallback = false;
        this.setOption = function(key, value) {
            this.options[key] = value;
        };
        this.getOption = function(key) {
            return this.options[key];
        };
        this.ready = function() {
            this.loaded = true;
            loadedCount++;
            callSuccess(this);
            callProgress();
        };
        this.failed = function() {
            loadedCount++;
            callProgress();
            callError(this);
        };
        this.done = function(callback) {
            this.successCallback = callback;
        };
        this.fail = function(callback) {
            this.errorCallback = callback;
        };
        this.error = function(callback) {
            this.errorCallback = callback;
        };
        this.always = function(callback) {
            this.alwaysCallback = callback;
        };
        this.progress = function(callback) {
            this.progressCallback = callback;
        };
        this.toString = function() {
            return this.data;
        };
    };
    var MultiTransporter = function(urlList, _success) {
        this.urls = urlList;
        this.results = {};
        this.loadedCount = 0;
        this.count = 0;
        this.successCallback = _success;
        this.load = function() {
            var dt = null;
            var url = null;
            for (var key in this.urls) {
                if (this.urls.hasOwnProperty(key)) {
                    this.count++;
                }
            }
            for (var i in this.urls) {
                url = this.urls[i];
                if (url && url.url && url.type) {
                    dt = get(url.url, undefined, callback(this, this.ready, i), url.type);
                    dt.setOption("logistics.multi.key", i);
                    dt.fail(callback(this, this.fail));
                }
            }
        };
        this.ready = function(data, status, dt) {
            var key = dt.getOption("logistics.multi.key");
            this.results[key] = data;
            this.loadedCount++;
            this.checkIfAllReady();
        };
        this.fail = function(dt) {
            this.loadedCount++;
            this.checkIfAllReady();
        };
        this.getKeyForURL = function(url) {};
        this.checkIfAllReady = function() {
            if (this.loadedCount >= this.count) {
                if (typeof this.successCallback === "function") {
                    this.successCallback(this.results);
                }
            }
        };
    };
    var get = function(_url, _params, _success, _type) {
        var _requestType = "GET";
        if (typeof _params === "function") {
            _success = _params;
            _params = undefined;
        } else if (_params && typeof _params === "object") {
            _requestType = "POST";
        }
        var dt = new DataTransporter(_url, _params, _success, _type, _requestType);
        if (options.enableCORS) {
            dt.useCORS = ifCORSNeeded(_url);
        }
        if (dt) {
            queue.push(dt);
            startLoad(dt);
        }
        return dt;
    };
    var getMultiple = function(urlList, success) {
        var mt = new MultiTransporter(urlList, success);
        multiQueue.push(mt);
        mt.load();
    };
    var ifCORSNeeded = function(_url) {
        if (typeof document === "undefined") return false;
        var url = _url.match(/(https?:)?\/\/([^\/]+)\/(.*)/);
        if (!url) return false;
        if (url[1] === document.location.origin) return false;
        return true;
    };
    var startLoad = function(dt) {
        load(dt);
        return true;
    };
    var load = function(dt) {
        if (options.loadFromLocalStorage && inLocalStorage(dt)) {
            restore(dt);
        } else {
            getTypeFunction(dt.dataType, "load")(dt);
        }
    };
    var inLocalStorage = function(dt) {
        if (storageSupport && localStorage.getItem(dt.url) !== null) {
            return true;
        }
        return false;
    };
    var restore = function(dt) {
        dt.data = getTypeFunction(dt.dataType, "restore")(dt, loadFromLocalStorage(dt));
        dt.ready();
    };
    var getTypeFunction = function(type, method) {
        if (typefunctions && typefunctions[type] && typefunctions[type][method]) {
            return typefunctions[type][method];
        } else if (typefunctions && typefunctions[type]) {
            return typefunctions[type];
        }
        return function() {
            if (typeof console !== "undefined" && console.warn) {
                console.warn("Method " + method + " for " + type + " not found");
            }
        };
    };
    var setTypeFunction = function(type, method) {
        if (type && method) {
            typefunctions[type] = method;
        }
    };
    var makeHTTPRequest = function(dt) {
        var xhr = getHTTPObject(dt);
        if (xhr && dt) {
            var url = dt.url;
            xhr.open(dt.requestType, url, true);
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain");
            }
            if (dt.dataType == "binary") {
                xhr.responseType = "arraybuffer";
                if (dt.useCORS) {
                    xhr.setRequestHeader("Content-Type", "application/x-3dtechdata");
                }
            }
            if (dt.useCORS && options.useCookies) {
                xhr.withCredentials = true;
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        dt.loaded = true;
                        loadedCount++;
                        getTypeFunction(dt.dataType, "parse")(dt, xhr);
                        callSuccess(dt);
                    } else {
                        loadedCount++;
                        callError(dt);
                    }
                } else {
                    if (typeof dt.progressCallback === "function") {
                        dt.progressCallback(xhr);
                    }
                }
            };
            xhr.ontimeout = function() {
                loadedCount++;
                callError(dt);
            };
            callProgress();
            xhr.send(null);
        } else {
            throw "http failed";
        }
    };
    var parseXML = function(data) {
        var xml = null;
        if (!data || typeof data !== "string") {
            return xml;
        }
        if (window.DOMParser) {
            var parser = new DOMParser();
            xml = parser.parseFromString(data, "text/xml");
        } else {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(data);
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            throw "XML parsing failed";
        }
        return xml;
    };
    var getHTTPObject = function(dt) {
        var http = false;
        if (dt.useCORS && window.XDomainRequest) {
            try {
                http = new XDomainRequest();
            } catch (E) {
                http = false;
            }
        } else if (XMLHttpRequest) {
            try {
                http = new XMLHttpRequest();
            } catch (e) {
                http = false;
            }
        } else if (typeof ActiveXObject !== "undefined") {
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
                alert(2);
            } catch (e) {
                try {
                    http = new ActiveXObject("Microsoft.XMLHTTP");
                    alert(3);
                } catch (E) {
                    http = false;
                }
            }
        }
        return http;
    };
    var clear = function() {
        queue = [];
        multiQueue = [];
        loadedCount = 0;
        loading = false;
    };
    var store = function() {
        if (storageSupport) {
            for (var i in queue) {
                storeToLocalStorage(queue[i]);
            }
        } else {
            console.warn("localStorage isn't supported");
        }
    };
    var clearStorage = function() {
        localStorage.clear();
    };
    var storeToLocalStorage = function(dt) {
        if (storageSupport) {
            try {
                localStorage[dt.url] = getTypeFunction(dt.dataType, "store")(dt);
            } catch (err) {
                console.warn("localStorage limit exceeded");
            }
        } else {
            console.warn("localStorage isn't supported");
        }
    };
    var loadFromLocalStorage = function(dt) {
        return localStorage[dt.url];
    };
    var callSuccess = function(dt) {
        if (dt && typeof dt.successCallback === "function") {
            dt.successCallback(dt.data, "success", dt);
            callIfFinished();
        }
        if (dt && options.storeToLocalStorage) {
            storeToLocalStorage(dt);
        }
    };
    var callError = function(dt) {
        if (dt && options.fallbackFromStorage && inLocalStorage(dt)) {
            restore(dt);
            return;
        } else if (dt && typeof dt.errorCallback === "function") {
            dt.errorCallback(dt, "error", "");
        }
        callIfFinished();
    };
    var callProgress = function() {
        if (progressCallback && typeof progressCallback === "function" && queue.length && loadedCount) {
            progressCallback(loadedCount / queue.length);
        }
    };
    var callIfFinished = function() {
        if (loadedCheckTimer === null) {
            loadedCheckTimer = setTimeout(finishedChecker, 5);
        }
    };
    var finishedChecker = function() {
        loadedCheckTimer = null;
        if (queue.length == loadedCount && afterLoadCallback && typeof afterLoadCallback === "function") {
            afterLoadCallback();
        }
    };
    var callback = function(classScope, fnCallback) {
        return function() {
            return fnCallback.apply(classScope, arguments);
        };
    };
    var setOption = function(key, value) {
        options[key] = value;
    };
    var getOption = function(key) {
        return options[key];
    };
    return {
        count: function() {
            return queue.length;
        },
        loadedCount: function() {
            return loadedCount;
        },
        clear: function() {
            clear();
        },
        get: function(url, params, success, type, reload) {
            return get(url, params, success, toLowerCase(type));
        },
        getJSON: function(url, params, success, reload) {
            return get(url, params, success, "json", reload);
        },
        getImage: function(url, params, success, reload) {
            return get(url, params, success, "image", reload);
        },
        getBinary: function(url, params, success, reload) {
            return get(url, params, success, "binary", reload);
        },
        getXML: function(url, params, success, reload) {
            return get(url, params, success, "xml", reload);
        },
        getText: function(url, params, success, reload) {
            return get(url, params, success, "text", reload);
        },
        getMultiple: function(urlList, success, reload) {
            getMultiple(urlList, success, reload);
        },
        store: function() {
            store();
        },
        clearStorage: function() {
            clearStorage();
        },
        types: function() {
            return typefunctions;
        },
        onFinishedLoading: function(callback) {
            afterLoadCallback = callback;
        },
        onProgress: function(callback) {
            progressCallback = callback;
        },
        getQueue: function() {
            return queue;
        },
        getTypeFunction: function(type, method) {
            return getTypeFunction(type, method);
        },
        setTypeFunction: function(type, method) {
            return setTypeFunction(type, method);
        },
        getOption: function(key) {
            return getOption(key);
        },
        setOption: function(key, value) {
            setOption(key, value);
        }
    };
}();

!function(a, b, c, d) {
    "use strict";
    function e(a, b, c) {
        return setTimeout(k(a, c), b);
    }
    function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
    }
    function g(a, b, c) {
        var e;
        if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length; ) b.call(c, a[e], e, a), 
        e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
    function h(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length; ) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), 
        f++;
        return a;
    }
    function i(a, b) {
        return h(a, b, !0);
    }
    function j(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c);
    }
    function k(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }
    function l(a, b) {
        return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a;
    }
    function m(a, b) {
        return a === d ? b : a;
    }
    function n(a, b, c) {
        g(r(b), function(b) {
            a.addEventListener(b, c, !1);
        });
    }
    function o(a, b, c) {
        g(r(b), function(b) {
            a.removeEventListener(b, c, !1);
        });
    }
    function p(a, b) {
        for (;a; ) {
            if (a == b) return !0;
            a = a.parentNode;
        }
        return !1;
    }
    function q(a, b) {
        return a.indexOf(b) > -1;
    }
    function r(a) {
        return a.trim().split(/\s+/g);
    }
    function s(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);
        for (var d = 0; d < a.length; ) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;
            d++;
        }
        return -1;
    }
    function t(a) {
        return Array.prototype.slice.call(a, 0);
    }
    function u(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length; ) {
            var g = b ? a[f][b] : a[f];
            s(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
        }
        return c && (d = b ? d.sort(function(a, c) {
            return a[b] > c[b];
        }) : d.sort()), d;
    }
    function v(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ib.length; ) {
            if (c = ib[g], e = c ? c + f : b, e in a) return e;
            g++;
        }
        return d;
    }
    function w() {
        return ob++;
    }
    function x(b) {
        var c = b.ownerDocument || b;
        return c.defaultView || c.parentWindow || a;
    }
    function y(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, 
        this.domHandler = function(b) {
            l(a.options.enable, [ a ]) && c.handler(b);
        }, this.init();
    }
    function z(a) {
        var b, c = a.options.inputClass;
        return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A);
    }
    function A(a, b, c) {
        var d = c.pointers.length, e = c.changedPointers.length, f = b & yb && d - e === 0, g = b & (Ab | Bb) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), 
        a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
    }
    function B(a, b) {
        var c = a.session, d = b.pointers, e = d.length;
        c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = F(d);
        b.timeStamp = nb(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), 
        b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, 
        b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
        var j = a.element;
        p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j;
    }
    function C(a, b) {
        var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
        (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        }, d = a.offsetDelta = {
            x: c.x,
            y: c.y
        }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
    }
    function D(a, b) {
        var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
        if (b.eventType != Bb && (i > xb || h.velocity === d)) {
            var j = h.deltaX - b.deltaX, k = h.deltaY - b.deltaY, l = G(i, j, k);
            e = l.x, f = l.y, c = mb(l.x) > mb(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b;
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
    }
    function E(a) {
        for (var b = [], c = 0; c < a.pointers.length; ) b[c] = {
            clientX: lb(a.pointers[c].clientX),
            clientY: lb(a.pointers[c].clientY)
        }, c++;
        return {
            timeStamp: nb(),
            pointers: b,
            center: F(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        };
    }
    function F(a) {
        var b = a.length;
        if (1 === b) return {
            x: lb(a[0].clientX),
            y: lb(a[0].clientY)
        };
        for (var c = 0, d = 0, e = 0; b > e; ) c += a[e].clientX, d += a[e].clientY, e++;
        return {
            x: lb(c / b),
            y: lb(d / b)
        };
    }
    function G(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        };
    }
    function H(a, b) {
        return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb;
    }
    function I(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e);
    }
    function J(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI;
    }
    function K(a, b) {
        return J(b[1], b[0], Lb) - J(a[1], a[0], Lb);
    }
    function L(a, b) {
        return I(b[0], b[1], Lb) / I(a[0], a[1], Lb);
    }
    function M() {
        this.evEl = Nb, this.evWin = Ob, this.allow = !0, this.pressed = !1, y.apply(this, arguments);
    }
    function N() {
        this.evEl = Rb, this.evWin = Sb, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    function O() {
        this.evTarget = Ub, this.evWin = Vb, this.started = !1, y.apply(this, arguments);
    }
    function P(a, b) {
        var c = t(a.touches), d = t(a.changedTouches);
        return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [ c, d ];
    }
    function Q() {
        this.evTarget = Xb, this.targetIds = {}, y.apply(this, arguments);
    }
    function R(a, b) {
        var c = t(a.touches), d = this.targetIds;
        if (b & (yb | zb) && 1 === c.length) return d[c[0].identifier] = !0, [ c, c ];
        var e, f, g = t(a.changedTouches), h = [], i = this.target;
        if (f = c.filter(function(a) {
            return p(a.target, i);
        }), b === yb) for (e = 0; e < f.length; ) d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length; ) d[g[e].identifier] && h.push(g[e]), b & (Ab | Bb) && delete d[g[e].identifier], 
        e++;
        return h.length ? [ u(f.concat(h), "identifier", !0), h ] : void 0;
    }
    function S() {
        y.apply(this, arguments);
        var a = k(this.handler, this);
        this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a);
    }
    function T(a, b) {
        this.manager = a, this.set(b);
    }
    function U(a) {
        if (q(a, bc)) return bc;
        var b = q(a, cc), c = q(a, dc);
        return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b;
    }
    function V(a) {
        this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), 
        this.state = ec, this.simultaneous = {}, this.requireFail = [];
    }
    function W(a) {
        return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : "";
    }
    function X(a) {
        return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : "";
    }
    function Y(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a;
    }
    function Z() {
        V.apply(this, arguments);
    }
    function $() {
        Z.apply(this, arguments), this.pX = null, this.pY = null;
    }
    function _() {
        Z.apply(this, arguments);
    }
    function ab() {
        V.apply(this, arguments), this._timer = null, this._input = null;
    }
    function bb() {
        Z.apply(this, arguments);
    }
    function cb() {
        Z.apply(this, arguments);
    }
    function db() {
        V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, 
        this._input = null, this.count = 0;
    }
    function eb(a, b) {
        return b = b || {}, b.recognizers = m(b.recognizers, eb.defaults.preset), new fb(a, b);
    }
    function fb(a, b) {
        b = b || {}, this.options = i(b, eb.defaults), this.options.inputTarget = this.options.inputTarget || a, 
        this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, 
        this.input = z(this), this.touchAction = new T(this, this.options.touchAction), 
        gb(this, !0), g(b.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        }, this);
    }
    function gb(a, b) {
        var c = a.element;
        c.style && g(a.options.cssProps, function(a, d) {
            c.style[v(c.style, d)] = b ? a : "";
        });
    }
    function hb(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
    }
    var ib = [ "", "webkit", "moz", "MS", "ms", "o" ], jb = b.createElement("div"), kb = "function", lb = Math.round, mb = Math.abs, nb = Date.now, ob = 1, pb = /mobile|tablet|ip(ad|hone|od)|android/i, qb = "ontouchstart" in a, rb = v(a, "PointerEvent") !== d, sb = qb && pb.test(navigator.userAgent), tb = "touch", ub = "pen", vb = "mouse", wb = "kinect", xb = 25, yb = 1, zb = 2, Ab = 4, Bb = 8, Cb = 1, Db = 2, Eb = 4, Fb = 8, Gb = 16, Hb = Db | Eb, Ib = Fb | Gb, Jb = Hb | Ib, Kb = [ "x", "y" ], Lb = [ "clientX", "clientY" ];
    y.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), 
            this.evWin && n(x(this.element), this.evWin, this.domHandler);
        },
        destroy: function() {
            this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), 
            this.evWin && o(x(this.element), this.evWin, this.domHandler);
        }
    };
    var Mb = {
        mousedown: yb,
        mousemove: zb,
        mouseup: Ab
    }, Nb = "mousedown", Ob = "mousemove mouseup";
    j(M, y, {
        handler: function(a) {
            var b = Mb[a.type];
            b & yb && 0 === a.button && (this.pressed = !0), b & zb && 1 !== a.which && (b = Ab), 
            this.pressed && this.allow && (b & Ab && (this.pressed = !1), this.callback(this.manager, b, {
                pointers: [ a ],
                changedPointers: [ a ],
                pointerType: vb,
                srcEvent: a
            }));
        }
    });
    var Pb = {
        pointerdown: yb,
        pointermove: zb,
        pointerup: Ab,
        pointercancel: Bb,
        pointerout: Bb
    }, Qb = {
        2: tb,
        3: ub,
        4: vb,
        5: wb
    }, Rb = "pointerdown", Sb = "pointermove pointerup pointercancel";
    a.MSPointerEvent && (Rb = "MSPointerDown", Sb = "MSPointerMove MSPointerUp MSPointerCancel"), 
    j(N, y, {
        handler: function(a) {
            var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Pb[d], f = Qb[a.pointerType] || a.pointerType, g = f == tb, h = s(b, a.pointerId, "pointerId");
            e & yb && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ab | Bb) && (c = !0), 
            0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [ a ],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1));
        }
    });
    var Tb = {
        touchstart: yb,
        touchmove: zb,
        touchend: Ab,
        touchcancel: Bb
    }, Ub = "touchstart", Vb = "touchstart touchmove touchend touchcancel";
    j(O, y, {
        handler: function(a) {
            var b = Tb[a.type];
            if (b === yb && (this.started = !0), this.started) {
                var c = P.call(this, a, b);
                b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: tb,
                    srcEvent: a
                });
            }
        }
    });
    var Wb = {
        touchstart: yb,
        touchmove: zb,
        touchend: Ab,
        touchcancel: Bb
    }, Xb = "touchstart touchmove touchend touchcancel";
    j(Q, y, {
        handler: function(a) {
            var b = Wb[a.type], c = R.call(this, a, b);
            c && this.callback(this.manager, b, {
                pointers: c[0],
                changedPointers: c[1],
                pointerType: tb,
                srcEvent: a
            });
        }
    }), j(S, y, {
        handler: function(a, b, c) {
            var d = c.pointerType == tb, e = c.pointerType == vb;
            if (d) this.mouse.allow = !1; else if (e && !this.mouse.allow) return;
            b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c);
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy();
        }
    });
    var Yb = v(jb.style, "touchAction"), Zb = Yb !== d, $b = "compute", _b = "auto", ac = "manipulation", bc = "none", cc = "pan-x", dc = "pan-y";
    T.prototype = {
        set: function(a) {
            a == $b && (a = this.compute()), Zb && this.manager.element.style && (this.manager.element.style[Yb] = a), 
            this.actions = a.toLowerCase().trim();
        },
        update: function() {
            this.set(this.manager.options.touchAction);
        },
        compute: function() {
            var a = [];
            return g(this.manager.recognizers, function(b) {
                l(b.options.enable, [ b ]) && (a = a.concat(b.getTouchAction()));
            }), U(a.join(" "));
        },
        preventDefaults: function(a) {
            if (!Zb) {
                var b = a.srcEvent, c = a.offsetDirection;
                if (this.manager.session.prevented) return void b.preventDefault();
                var d = this.actions, e = q(d, bc), f = q(d, dc), g = q(d, cc);
                return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0;
            }
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0, a.preventDefault();
        }
    };
    var ec = 1, fc = 2, gc = 4, hc = 8, ic = hc, jc = 16, kc = 32;
    V.prototype = {
        defaults: {},
        set: function(a) {
            return h(this.options, a), this.manager && this.manager.touchAction.update(), this;
        },
        recognizeWith: function(a) {
            if (f(a, "recognizeWith", this)) return this;
            var b = this.simultaneous;
            return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
        },
        dropRecognizeWith: function(a) {
            return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], 
            this);
        },
        requireFailure: function(a) {
            if (f(a, "requireFailure", this)) return this;
            var b = this.requireFail;
            return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this;
        },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this)) return this;
            a = Y(a, this);
            var b = s(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this;
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0;
        },
        canRecognizeWith: function(a) {
            return !!this.simultaneous[a.id];
        },
        emit: function(a) {
            function b(b) {
                c.manager.emit(c.options.event + (b ? W(d) : ""), a);
            }
            var c = this, d = this.state;
            hc > d && b(!0), b(), d >= hc && b(!0);
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void (this.state = kc);
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length; ) {
                if (!(this.requireFail[a].state & (kc | ec))) return !1;
                a++;
            }
            return !0;
        },
        recognize: function(a) {
            var b = h({}, a);
            return l(this.options.enable, [ this, b ]) ? (this.state & (ic | jc | kc) && (this.state = ec), 
            this.state = this.process(b), void (this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(), 
            void (this.state = kc));
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    }, j(Z, V, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b;
        },
        process: function(a) {
            var b = this.state, c = a.eventType, d = b & (fc | gc), e = this.attrTest(a);
            return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc;
        }
    }), j($, Z, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Jb
        },
        getTouchAction: function() {
            var a = this.options.direction, b = [];
            return a & Hb && b.push(dc), a & Ib && b.push(cc), b;
        },
        directionTest: function(a) {
            var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
            return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb, 
            c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb, 
            c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
        },
        attrTest: function(a) {
            return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a));
        },
        emit: function(a) {
            this.pX = a.deltaX, this.pY = a.deltaY;
            var b = X(a.direction);
            b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
        }
    }), j(_, Z, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ bc ];
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc);
        },
        emit: function(a) {
            if (this._super.emit.call(this, a), 1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + b, a);
            }
        }
    }), j(ab, V, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function() {
            return [ _b ];
        },
        process: function(a) {
            var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ab | Bb) && !f) this.reset(); else if (a.eventType & yb) this.reset(), 
            this._timer = e(function() {
                this.state = ic, this.tryEmit();
            }, b.time, this); else if (a.eventType & Ab) return ic;
            return kc;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function(a) {
            this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(), 
            this.manager.emit(this.options.event, this._input)));
        }
    }), j(bb, Z, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ bc ];
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc);
        }
    }), j(cb, Z, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: Hb | Ib,
            pointers: 1
        },
        getTouchAction: function() {
            return $.prototype.getTouchAction.call(this);
        },
        attrTest: function(a) {
            var b, c = this.options.direction;
            return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY), 
            this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab;
        },
        emit: function(a) {
            var b = X(a.direction);
            b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
        }
    }), j(db, V, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ ac ];
        },
        process: function(a) {
            var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & yb && 0 === this.count) return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ab) return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, 
                this._input = a;
                var i = this.count % b.taps;
                if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                    this.state = ic, this.tryEmit();
                }, b.interval, this), fc) : ic;
            }
            return kc;
        },
        failTimeout: function() {
            return this._timer = e(function() {
                this.state = kc;
            }, this.options.interval, this), kc;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function() {
            this.state == ic && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        }
    }), eb.VERSION = "2.0.4", eb.defaults = {
        domEvents: !1,
        touchAction: $b,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [ [ bb, {
            enable: !1
        } ], [ _, {
            enable: !1
        }, [ "rotate" ] ], [ cb, {
            direction: Hb
        } ], [ $, {
            direction: Hb
        }, [ "swipe" ] ], [ db ], [ db, {
            event: "doubletap",
            taps: 2
        }, [ "tap" ] ], [ ab ] ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var lc = 1, mc = 2;
    fb.prototype = {
        set: function(a) {
            return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), 
            this.input.target = a.inputTarget, this.input.init()), this;
        },
        stop: function(a) {
            this.session.stopped = a ? mc : lc;
        },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers, e = b.curRecognizer;
                (!e || e && e.state & ic) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length; ) c = d[f], b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), 
                !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c), f++;
            }
        },
        get: function(a) {
            if (a instanceof V) return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
            return null;
        },
        add: function(a) {
            if (f(a, "add", this)) return this;
            var b = this.get(a.options.event);
            return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), 
            a;
        },
        remove: function(a) {
            if (f(a, "remove", this)) return this;
            var b = this.recognizers;
            return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this;
        },
        on: function(a, b) {
            var c = this.handlers;
            return g(r(a), function(a) {
                c[a] = c[a] || [], c[a].push(b);
            }), this;
        },
        off: function(a, b) {
            var c = this.handlers;
            return g(r(a), function(a) {
                b ? c[a].splice(s(c[a], b), 1) : delete c[a];
            }), this;
        },
        emit: function(a, b) {
            this.options.domEvents && hb(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length) {
                b.type = a, b.preventDefault = function() {
                    b.srcEvent.preventDefault();
                };
                for (var d = 0; d < c.length; ) c[d](b), d++;
            }
        },
        destroy: function() {
            this.element && gb(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), 
            this.element = null;
        }
    }, h(eb, {
        INPUT_START: yb,
        INPUT_MOVE: zb,
        INPUT_END: Ab,
        INPUT_CANCEL: Bb,
        STATE_POSSIBLE: ec,
        STATE_BEGAN: fc,
        STATE_CHANGED: gc,
        STATE_ENDED: hc,
        STATE_RECOGNIZED: ic,
        STATE_CANCELLED: jc,
        STATE_FAILED: kc,
        DIRECTION_NONE: Cb,
        DIRECTION_LEFT: Db,
        DIRECTION_RIGHT: Eb,
        DIRECTION_UP: Fb,
        DIRECTION_DOWN: Gb,
        DIRECTION_HORIZONTAL: Hb,
        DIRECTION_VERTICAL: Ib,
        DIRECTION_ALL: Jb,
        Manager: fb,
        Input: y,
        TouchAction: T,
        TouchInput: Q,
        MouseInput: M,
        PointerEventInput: N,
        TouchMouseInput: S,
        SingleTouchInput: O,
        Recognizer: V,
        AttrRecognizer: Z,
        Tap: db,
        Pan: $,
        Swipe: cb,
        Pinch: _,
        Rotate: bb,
        Press: ab,
        on: n,
        off: o,
        each: g,
        merge: i,
        extend: h,
        inherit: j,
        bindFn: k,
        prefixed: v
    }), typeof define == kb && define.amd ? define(function() {
        return eb;
    }) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb;
}(window, document, "HammerWF");

var frakVersion = "1.4.4";

if (typeof exports !== "undefined") exports.version = frakVersion;

function FRAK(callback) {
    if (typeof callback == "function") callback();
}

FRAK.raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

FRAK.caf = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame;

FRAK.performance = typeof window !== "undefined" ? window.performance ? window.performance.now : false : false;

FRAK.performanceNOW = function() {
    return window.performance.now.apply(window.performance);
};

FRAK.extend = function() {
    for (var i = 1; i < arguments.length; ++i) {
        for (var key in arguments[i]) {
            if (key in arguments[i]) arguments[0][key] = arguments[i][key];
        }
    }
    return arguments[0];
};

FRAK.isFunction = function(f) {
    return typeof f === "function";
};

FRAK.isEmptyObject = function(o) {
    for (var prop in o) {
        if (prop in o) return false;
    }
    return true;
};

FRAK.parseJSON = function(s) {
    if (typeof window !== "undefined" && window.JSON && window.JSON.parse) return window.JSON.parse(s);
    if (typeof JSON !== "undefined") {
        return JSON.parse(s);
    }
    throw "FRAK.parseJSON: No JSON parser available.";
};

FRAK.timestamp = function() {
    if (FRAK.performance) return FRAK.performanceNOW;
    return Date.now;
}();

FRAK.requestAnimationFrame = function() {
    if (typeof window !== "undefined") {
        if (FRAK.raf) {
            return function() {
                return FRAK.raf.apply(window, arguments);
            };
        }
        return function(f) {
            return window.setTimeout(f, 1e3 / 60);
        };
    } else if (typeof setTimeout !== "undefined") {
        return function(f) {
            return setTimeout(f, 1e3 / 60);
        };
    }
}();

FRAK.cancelAnimationFrame = function() {
    if (typeof window !== "undefined") {
        if (FRAK.caf) return function() {
            return FRAK.caf.apply(window, arguments);
        };
    } else if (typeof clearTimeout !== "undefined") {
        return clearTimeout;
    }
}();

FRAK.fullscreenEnabled = function() {
    if (typeof document !== "undefined") {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
    } else return false;
}();

FRAK.requestFullscreen = function(element) {
    (element.requestFullscreen || element.requestFullScreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen || element.msRequestFullScreen || function() {}).call(element);
};

FRAK.exitFullscreen = function() {
    (document.exitFullscreen || document.exitFullScreen || document.webkitExitFullscreen || document.webkitExitFullScreen || document.mozExitFullscreen || document.mozExitFullScreen || document.msExitFullscreen || document.msExitFullScreen || function() {}).call(document);
};

FRAK.isFullscreen = function() {
    return document.isFullScreen || document.isFullscreen || document.webkitIsFullscreen || document.webkitIsFullScreen || document.mozIsFullscreen || document.mozIsFullScreen || document.msIsFullscreen || document.msIsFullScreen;
};

FRAK.isWebGLSupported = function() {
    var canvas = document.createElement("canvas");
    var _gl = null;
    try {
        _gl = canvas.getContext("webgl");
    } catch (x) {
        _gl = null;
    }
    if (_gl == null) {
        try {
            _gl = canvas.getContext("experimental-webgl");
        } catch (x) {
            _gl = null;
        }
    }
    canvas.remove();
    return !!_gl;
};

var Cloneable = FrakClass.extend({
    type: function() {
        return false;
    },
    clone: function() {
        return typeof window[this.type()] === "function" ? new (window[this.type()])() : {};
    }
});

var nextSerializableID = 1;

var Serializable = Cloneable.extend({
    init: function() {
        this.serializable = true;
        this.id = nextSerializableID++;
    },
    included: function() {
        return true;
    },
    excluded: function() {
        return [];
    },
    getSerializableFields: function(extraExcluded) {
        var included = this.included();
        var excluded = this.excluded();
        if (included === true && excluded === true) throw "Quantum classes not allowed. A subclass of Serializable tries to both include and exclude all fields.";
        if (included === false && excluded === false) throw "Quantum classes not allowed. A subclass of Serializable tries both not to include and not to exclude all fields.";
        if (included === false || excluded === true) return {};
        var fields = {};
        if (included === true) {
            for (var t in this) {
                var getType = {};
                if (this[t] && getType.toString.call(this[t]) == "[object Function]" || t == "serializable" || t == "_super") continue;
                fields[t] = this[t];
            }
            if (excluded instanceof Array) {
                excluded = excluded.concat(extraExcluded);
                for (var e = 0; e < excluded.length; e++) {
                    if (fields[excluded[e]]) delete fields[excluded[e]];
                }
            }
        }
        if (excluded === true) {
            fields = [];
            for (var i = 0; i < included.length; i++) {
                var t = included[i];
                var getType = {};
                if (this[t] && getType.toString.call(this[t]) == "[object Function]" || t == "serializable" || t == "_super") continue;
                fields[t] = this[t];
            }
        }
        return fields;
    },
    serialize: function(excluded) {
        try {
            var serializer = new Serializer();
            return serializer.serialize(this, excluded, 32);
        } catch (e) {
            console.warn("Caught serialization exception: ", e);
            throw e;
        }
    },
    unserialize: function(text) {
        var data = FRAK.parseJSON(text);
        return false;
    },
    serializeCyclic: function(excluded) {
        try {
            var serializer = new CyclicSerializer();
            return serializer.serialize(this, excluded, 32);
        } catch (e) {
            console.warn("Caught serialization exception: ", e);
            throw e;
        }
    },
    unserializeCyclic: function(text) {
        try {
            var serializer = new CyclicSerializer();
            return serializer.unserialize(text);
        } catch (e) {
            console.warn("Caught serialization exception: ", e);
            throw e;
        }
    },
    onBeforeSerialize: function() {},
    onAfterSerialize: function() {},
    onBeforeUnserialize: function() {},
    onAfterUnserialize: function() {}
});

var Serializer = FrakClass.extend({
    init: function() {
        this.serializables = {};
    },
    serializableCopy: function(stack, value, excluded, depth, maximumDepth) {
        var result = {};
        var fields = value.getSerializableFields(excluded);
        if (depth >= maximumDepth) {
            var trace = [];
            for (var s in stack) {
                trace.push(stack[s].type());
            }
            throw "Reached maximum depth for serialization: " + depth + " at " + value.type();
        }
        stack = stack.slice(0);
        stack.splice(0, 0, value);
        for (var f in fields) {
            var field = fields[f];
            if (field instanceof Serializable) result[f] = this.serializableCopy(stack, field, excluded, depth + 1, maximumDepth); else if (field instanceof Array || field instanceof Float32Array) {
                var arrayResult = [];
                for (var i in field) {
                    if (field[i] instanceof Serializable) {
                        arrayResult.push(this.serializableCopy(stack, field[i], excluded, depth + 1, maximumDepth));
                    } else arrayResult.push(field[i]);
                }
                result[f] = arrayResult;
            } else result[f] = fields[f];
        }
        return {
            _type_: value.type(),
            _properties_: result
        };
    },
    serialize: function(object, excluded, maximumDepth) {
        this.serializables = {};
        var r = this.serializableCopy([], object, excluded, 0, maximumDepth);
        return JSON.stringify({
            _root_: r,
            _serializables_: this.serializables
        }, undefined, 2);
    },
    unserializeSerializables: function(data) {
        for (var id in data) {
            this.serializables[id] = this.unserializeCopy(data[id]);
        }
    },
    unserializeCopy: function(v) {
        if (v instanceof Array) {
            for (var p in v) {
                v[p] = this.unserializeCopy(v[p]);
            }
            return v;
        } else if (v instanceof Object) {
            if (v._reference_) {
                return v;
            } else if (v._type_) {
                var t = new window[v._type_]();
                t.onBeforeUnserialize();
                for (var p in v._properties_) {
                    t[p] = this.unserializeCopy(v._properties_[p]);
                }
                t.onAfterUnserialize();
                return t;
            }
            return v;
        } else {
            return t;
        }
    },
    resolveReferences: function(object, key) {
        if (object[key] instanceof Array) {
            for (var p in object[key]) {
                object[key][p] = this.resolveReferences(object[key], p);
            }
        } else if (object[key] instanceof Object) {
            if (object[key]._reference_) {
                object[key] = this.serializables[object[key]._id_];
            } else {
                for (var p in object[key]) {
                    object[key][p] = this.resolveReferences(object[key], p);
                }
            }
        }
    },
    unserialize: function(text) {
        var data = FRAK.parseJSON(text);
        this.serializables = {};
        this.unserializeSerializables(data["_serializables_"]);
        var unserialized = this.unserializeCopy(data["_root_"]);
        for (var i in this.serializables) {
            this.resolveReferences(this.serializables, i);
        }
        this.resolveReferences(data, "_serializables_");
        return unserialized;
    }
});

var CyclicSerializer = FrakClass.extend({
    init: function() {
        this.serializables = {};
        this.visited = [];
    },
    serializableCopy: function(stack, value, excluded, depth, maximumDepth) {
        if (depth >= maximumDepth) return {};
        stack = stack.slice(0);
        stack.push(value);
        try {
            if (typeof value === "object") {
                if (!value) return null;
                if (value instanceof Serializable) {
                    if (!this.serializables[value.id]) {
                        this.serializables[value.id] = true;
                        value.onBeforeSerialize();
                        var fields = value.getSerializableFields(value, excluded);
                        for (var f in fields) {
                            fields[f] = this.serializableCopy(stack, fields[f], excluded, depth + 1, maximumDepth);
                        }
                        value.onAfterSerialize();
                        this.serializables[value.id] = {
                            _type_: value.type(),
                            _properties_: fields
                        };
                    }
                    return {
                        _reference_: true,
                        _id_: value.id
                    };
                } else if (value instanceof Array || value instanceof Float32Array) {
                    var result = [];
                    for (var f in value) {
                        result.push(this.serializableCopy(stack, value[f], excluded, depth + 1, maximumDepth));
                    }
                    return result;
                } else {
                    if (value._visited_) {
                        console.warn("Already visited object: ", value);
                        return;
                    }
                    value._visited_ = true;
                    var fields = {};
                    for (var f in value) {
                        fields[f] = this.serializableCopy(stack, value[f], excluded, depth + 1, maximumDepth);
                    }
                    return fields;
                }
            } else {
                return value;
            }
        } catch (e) {
            console.warn("Caught: ", value, e);
            console.warn("Stack: ");
            console.warn(stack);
            throw e;
        }
    },
    serialize: function(object, excluded, maximumDepth) {
        this.serializables = {};
        var r = this.serializableCopy([], object, excluded, 0, maximumDepth);
        return JSON.stringify({
            _root_: r,
            _serializables_: this.serializables
        }, undefined, 2);
    },
    unserializeSerializables: function(data) {
        for (var id in data) {
            this.serializables[id] = this.unserializeCopy(data[id]);
        }
    },
    unserializeCopy: function(v) {
        if (v instanceof Array) {
            for (var p in v) {
                v[p] = this.unserializeCopy(v[p]);
            }
            return v;
        } else if (v instanceof Object) {
            if (v._reference_) {
                return v;
            } else if (v._type_) {
                var t = new window[v._type_]();
                t.onBeforeUnserialize();
                for (var p in v._properties_) {
                    t[p] = this.unserializeCopy(v._properties_[p]);
                }
                return t;
            }
            return v;
        } else {
            return v;
        }
    },
    resolveReferences: function(object, key, depth) {
        if (depth > 32) return;
        if (object[key] instanceof Array) {
            for (var p in object[key]) {
                this.resolveReferences(object[key], p, depth + 1);
            }
        } else if (object[key] instanceof Object && !("_visited_" in object[key])) {
            if (object[key]._reference_) {
                object[key] = this.serializables[object[key]._id_];
            } else if (object[key] instanceof Serializable) {
                object[key]._visited_ = true;
                this.visited.push(object[key]);
                for (var k in object[key]) {
                    this.resolveReferences(object[key], k, depth + 1);
                }
            } else {}
        }
    },
    unserialize: function(text) {
        var data = FRAK.parseJSON(text);
        this.serializables = {};
        this.unserializeSerializables(data["_serializables_"]);
        var unserialized = {
            _root_: this.unserializeCopy(data["_root_"])
        };
        this.resolveReferences(unserialized, "_root_", 0);
        for (var i in this.serializables) {
            this.resolveReferences(this.serializables, i, 0);
        }
        for (var i in this.visited) {
            if (this.visited[i] instanceof Serializable) {
                this.visited[i].onAfterUnserialize();
            }
        }
        for (var i in this.visited) {
            delete this.visited[i]._visited_;
        }
        return unserialized["_root_"];
    }
});

var TypeReference = Serializable.extend({
    init: function(type, value) {
        this._super();
        this.valueType = type;
        this.value = value;
    },
    type: function() {
        return "TypeReference";
    },
    isNull: function() {
        return !this.value;
    }
});

function CollectionReference(list) {
    this.list = list;
}

function CollectionView(listReference, fnFilter, keepExact) {
    this.listReference = listReference;
    this.view = [];
    this.keepExact = !!keepExact;
    this.fnFilter = fnFilter;
    this.length = 0;
    var scope = this;
    this.update = function() {
        if (scope.keepExact || scope.view.length < scope.listReference.list.length) scope.view.length = scope.listReference.list.length;
    };
    this.filter = function() {
        scope.update();
        var index = 0;
        var i = 0;
        var item;
        for (;i < scope.listReference.list.length; ++i) {
            item = scope.listReference.list[i];
            if (!item) break;
            if (scope.fnFilter(item)) scope.view[index++] = item;
        }
        scope.length = index;
        for (i = index; i < scope.listReference.list.length; ++i) {
            scope.view[index++] = null;
        }
    };
    this.forEach = function(callback) {
        for (var i = 0; i < scope.length; ++i) {
            callback(scope.view[i], i);
        }
    };
    this.get = function(index) {
        if (index >= 0 && index < scope.length) return scope.view[index];
        throw Error("Accessing element out of bounds");
    };
}

var Color = function(r, g, b, a) {
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
    this.clone = function() {
        return new Color(this.r, this.g, this.b, this.a);
    };
    this.fromHex = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
        if (result) {
            this.r = parseInt(result[1], 16) / 255;
            this.g = parseInt(result[2], 16) / 255;
            this.b = parseInt(result[3], 16) / 255;
            if (result[4]) this.a = parseInt(result[4], 16) / 255;
        }
        return this;
    };
    this.toHex = function() {
        return "#" + ("0" + Math.round(this.r * 255).toString(16)).slice(-2) + ("0" + Math.round(this.g * 255).toString(16)).slice(-2) + ("0" + Math.round(this.b * 255).toString(16)).slice(-2) + ("0" + Math.round(this.a * 255).toString(16)).slice(-2);
    };
    this.toString = function() {
        return "rgba(" + Math.floor(this.r * 255) + ", " + Math.floor(this.g * 255) + ", " + Math.floor(this.b * 255) + ", " + this.a + ")";
    };
    this.toVector = function(out) {
        if (!out) out = vec4.create();
        vec4.set(out, this.r, this.g, this.b, this.a);
        return out;
    };
    this.set = function(r, g, b, a) {
        if (typeof r == "number") this.r = r;
        if (typeof g == "number") this.g = g;
        if (typeof b == "number") this.b = b;
        if (typeof a == "number") this.a = a;
        return this;
    };
    this.set(r, g, b, a);
};

var MatrixStack = FrakClass.extend({
    init: function() {
        this.stack = [ mat4.identity(mat4.create()) ];
        this.allocated = [];
        for (var i = 0; i < 64; i++) this.allocated.push(mat4.create());
    },
    top: function() {
        return this.stack[this.stack.length - 1];
    },
    push: function() {
        if (this.allocated.length == 0) {
            this.allocated.push(mat4.create());
        }
        this.stack.push(mat4.copy(this.allocated.pop(), this.stack[this.stack.length - 1]));
    },
    pop: function() {
        this.allocated.push(this.stack.pop());
    },
    multiply: function(matrix) {
        mat4.multiply(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], matrix);
    },
    load: function(matrix) {
        mat4.copy(this.stack[this.stack.length - 1], matrix);
    },
    size: function() {
        return this.stack.length;
    }
});

var RenderingContext = FrakClass.extend({
    init: function(canvas, contextOptions, errorCallback, version) {
        if (typeof canvas === "string" && typeof document !== "undefined") {
            canvas = document.getElementById(canvas);
        }
        if (typeof window !== "undefined" && window.jQuery && canvas instanceof jQuery) {
            canvas = canvas[0];
        }
        this.version = version;
        if (this.version === "auto") {
            if ("WebGL2RenderingContext" in window) {
                this.version = "webgl2";
            } else {
                this.version = "webgl";
                if (!("WebGLRenderingContext" in window)) {
                    throw "Unable to create rendering context, because browser doesn't support WebGL";
                }
            }
        }
        if (!canvas) throw "RenderingContext requires a canvas element";
        this.canvas = canvas;
        if (typeof WebGLDebugUtils !== "undefined") {
            this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
            this.canvas.setRestoreTimeout(2e3);
        }
        contextOptions = contextOptions || {
            alpha: false
        };
        if (this.version === "webgl2") {
            this.gl = this.canvas.getContext("webgl2", contextOptions);
            if (!this.gl && version === "auto") this.version = "webgl";
        }
        if (this.version === "webgl") {
            this.gl = this.canvas.getContext("webgl", contextOptions);
            if (!this.gl) this.gl = this.canvas.getContext("experimental-webgl", contextOptions);
            if (!this.gl) this.gl = this.canvas.getContext("moz-webgl", contextOptions);
            if (!this.gl) this.gl = this.canvas.getContext("webkit-3d", contextOptions);
        }
        if (!this.gl) {
            var hideError = false;
            if (FRAK.isFunction(errorCallback)) hideError = errorCallback();
            if (!hideError && typeof document !== "undefined") {
                var msg = document.createElement("div");
                msg.style.position = "relative";
                msg.style.zIndex = 100;
                msg.style.backgroundColor = "red";
                msg.style.padding = "8px";
                msg.textContent = "WebGL seems to be unavailable in this browser.";
                var parent = canvas.parentNode;
                parent.insertBefore(msg, parent.firstChild);
            }
            throw "Failed to acquire GL context from canvas";
        }
        if (typeof WebGLDebugUtils !== "undefined") {
            this.gl = WebGLDebugUtils.makeDebugContext(this.gl, function throwOnGLError(err, funcName, args) {
                throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName + JSON.stringify(args);
            });
            console.warn("Using WebGLDebugUtils");
        }
        this.modelview = new MatrixStack();
        this.projection = new MatrixStack();
        this.light = false;
        this.shadow = false;
        this.camera = false;
        this.engine = false;
    },
    error: function() {
        if (this.isContextLost()) throw Error("Context lost");
        var err = this.gl.getError();
        if (err > 0 && typeof WebGLDebugUtils !== "undefined") {
            throw Error("GL_ERROR: " + WebGLDebugUtils.glEnumToString(err));
        }
        return err;
    },
    isContextLost: function() {
        if (!this.gl) return true;
        return this.gl.isContextLost();
    },
    isWebGL2: function() {
        return this.version == "webgl2";
    },
    restore: function() {
        if (!this.engine) return false;
        var contextLost = this.gl.getError();
        var ctx = this;
        var engine = this.engine;
        var texturesManager = engine.assetsManager.texturesManager;
        for (var i in texturesManager.cache) {
            var texture = texturesManager.cache[i];
            texture.onContextRestored(ctx);
        }
        var rootNode = engine.scene.root;
        rootNode.onEachChildComponent(function(component) {
            if (component instanceof RendererComponent || component instanceof TextComponent) component.onContextRestored(ctx);
        });
        for (var i = 0; i < engine.scene.lights.length; ++i) {
            engine.scene.lights[i].onContextRestored(ctx);
        }
        engine.WhiteTexture.glTexture = null;
        engine.WhiteTexture.loaded = false;
        engine.WhiteTexture.clearImage(ctx, [ 255, 255, 255, 255 ]);
        if (fallbackTexture) fallbackTexture.onContextRestored(ctx);
        if (fallbackCubeTexture) fallbackCubeTexture.onContextRestored(ctx);
        if (engine.scene && engine.scene.cameraComponent) engine.scene.cameraComponent.onContextRestored(ctx);
        var shadersManager = engine.assetsManager.shadersManager;
        for (var i in shadersManager.cache) {
            var shader = shadersManager.cache[i];
            shader.onContextRestored(ctx);
        }
        return true;
    }
});

function SamplerAccumulator() {
    this.samplers = [];
    this.length = 0;
    var scope = this;
    this.add = function(sampler) {
        scope.samplers[scope.length++] = sampler;
    };
    this.clear = function() {
        for (var i = 0, l = scope.samplers.length; i < l; ++i) {
            scope.samplers[i] = null;
        }
        scope.length = 0;
    };
}

var ExplicitAttributeLocations = {
    position: 0,
    normal: 1,
    texcoord2d0: 2,
    uv0: 2,
    tangent: 3,
    bitangent: 4
};

var Subshader = FrakClass.extend({
    init: function(shader, code, type) {
        this.shader = shader;
        this.context = shader.context;
        this.code = code;
        this.type = type;
        this.VERTEX_SHADER = 0;
        this.FRAGMENT_SHADER = 1;
        this.compiledShader = false;
        this.failedCompilation = false;
    },
    attach: function() {
        this.context.gl.attachShader(this.shader.program, this.compiledShader);
    },
    getFilename: function() {
        return "Unknown";
    },
    compile: function() {
        if (this.failedCompilation) return;
        if (!this.compiledShader) throw "WebGL shader has not been created. FragmentShader or VertexShader class instances should be used, not Shader.";
        this.context.gl.shaderSource(this.compiledShader, this.code);
        this.context.gl.compileShader(this.compiledShader);
        var status = this.context.gl.getShaderParameter(this.compiledShader, this.context.gl.COMPILE_STATUS);
        if (!status) {
            if (!this.failedCompilation) {
                this.failedCompilation = true;
                throw "Shader '" + this.getFilename() + "' failed to compile: " + this.context.gl.getShaderInfoLog(this.compiledShader);
            }
        }
    },
    onContextRestored: function(context) {
        this.failedCompilation = false;
        this.context = context;
        this.attach();
    }
});

var VertexShader = Subshader.extend({
    init: function(shader, code) {
        this._super(shader, code, this.VERTEX_SHADER);
        this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
    },
    getFilename: function() {
        return this.shader.descriptor.vertexSource;
    },
    onContextRestored: function(context) {
        this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
        this._super(context);
    }
});

var FragmentShader = Subshader.extend({
    init: function(shader, code) {
        this._super(shader, code, this.FRAGMENT_SHADER);
        this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
    },
    getFilename: function() {
        return this.shader.descriptor.fragmentSource;
    },
    onContextRestored: function(context) {
        this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
        this._super(context);
    }
});

var ShaderRequirements = FrakClass.extend({
    init: function() {
        this.barycentric = false;
        this.bitangents = false;
        this.tangents = false;
        this.transparent = false;
        this.texCoords2D = true;
    },
    apply: function(renderBuffer) {
        if (this.barycentric && !renderBuffer.buffers["barycentric"]) renderBuffer.generateBarycentric();
        if (this.texCoords2D && !renderBuffer.buffers["texcoord2d0"]) renderBuffer.generateTexCoords();
    }
});

var Shader = Serializable.extend({
    init: function(context, descriptor) {
        if (!context) throw "Shader: RenderingContext required";
        this._super();
        this.descriptor = descriptor;
        this.context = context;
        this.program = context.gl.createProgram();
        this.shaders = [];
        this.requirements = new ShaderRequirements();
        this.linked = false;
        this.failed = false;
        this.uniformLocations = {};
        this.bindings = {};
    },
    excluded: function() {
        return true;
    },
    included: function() {
        return [ "descriptor" ];
    },
    addVertexShader: function(code) {
        var shader = new VertexShader(this, code);
        this.addShader(shader);
    },
    addFragmentShader: function(code) {
        var shader = new FragmentShader(this, code);
        this.addShader(shader);
    },
    addShader: function(shader) {
        this.shaders.push(shader);
        shader.attach();
    },
    link: function() {
        if (this.failed) return;
        for (var i = 0; i < this.shaders.length; i++) {
            this.shaders[i].compile(this.context);
        }
        for (var name in ExplicitAttributeLocations) {
            this.context.gl.bindAttribLocation(this.program, ExplicitAttributeLocations[name], name);
        }
        this.uniformLocations = {};
        this.linked = true;
        this.context.gl.linkProgram(this.program);
        var status = this.context.gl.getProgramParameter(this.program, this.context.gl.LINK_STATUS);
        if (!status) {
            console.error("Shader linking failed: ", this.context.gl.getProgramInfoLog(this.program));
            this.linked = false;
            this.failed = true;
            return;
        }
        if (this.context.isWebGL2()) this.updateBlockBindings(this.context);
    },
    use: function(uniforms) {
        if (this.failed) return;
        if (this.shaders.length < 2) return;
        if (!this.linked) this.link();
        if (!this.linked) return;
        this.context.gl.useProgram(this.program);
        this.bindUniforms(uniforms);
    },
    getAttribLocation: function(bufferName) {
        if (bufferName in ExplicitAttributeLocations) {
            return ExplicitAttributeLocations[bufferName];
        }
        return this.context.gl.getAttribLocation(this.program, bufferName);
    },
    getUniformLocation: function(uniformName) {
        if (!(uniformName in this.uniformLocations)) {
            this.uniformLocations[uniformName] = this.context.gl.getUniformLocation(this.program, uniformName);
        }
        return this.uniformLocations[uniformName];
    },
    bindUniforms: function(uniforms) {
        if (!uniforms) return;
        if (!this.linked) return;
        for (var uniformName in uniforms) {
            var uniformLocation = this.getUniformLocation(uniformName);
            if (!uniformLocation || uniformLocation == -1) continue;
            var uniform = uniforms[uniformName];
            if (!uniform) throw "Uniform '" + uniformName + "' is undefined.";
            uniform.bind(this.context, uniformLocation);
        }
    },
    bindSamplers: function(samplers) {
        if (!samplers || samplers.length == 0 || !this.linked) return;
        var gl = this.context.gl;
        var slotIndex = 0;
        for (var i = 0; i < samplers.length; ++i) {
            var sampler = samplers[i];
            if (!sampler) break;
            var uniformLocation = this.getUniformLocation(sampler.name);
            if (uniformLocation == -1) continue;
            sampler.bind(this.context, uniformLocation, slotIndex);
            slotIndex++;
        }
        gl.activeTexture(gl.TEXTURE0);
    },
    unbindSamplers: function(samplers) {
        if (!samplers || samplers.length == 0 || !this.linked) return;
        var gl = this.context.gl;
        var slotIndex = 0;
        for (var i = 0; i < samplers.length; ++i) {
            var sampler = samplers[i];
            if (!sampler) break;
            var uniformLocation = this.getUniformLocation(sampler.name);
            if (uniformLocation == -1) continue;
            sampler.unbind(this.context, uniformLocation, slotIndex);
            slotIndex++;
        }
        gl.activeTexture(gl.TEXTURE0);
    },
    onContextRestored: function(context) {
        this.context = context;
        this.program = context.gl.createProgram();
        this.uniformLocations = {};
        this.failed = false;
        this.linked = false;
        for (var i = 0; i < this.shaders.length; ++i) {
            this.shaders[i].onContextRestored(context);
        }
        this.link();
    },
    updateBlockBindings: function(context) {
        var blocks = [ "Transform", "Material" ];
        this.bindings = {};
        for (var i = 0; i < blocks.length; ++i) {
            var bindingPoint = i + 1;
            var blockName = blocks[i];
            var blockIndex = context.gl.getUniformBlockIndex(this.program, blockName);
            if (blockIndex == context.gl.INVALID_INDEX) continue;
            this.bindings[blockName] = {
                index: blockIndex,
                name: blockName,
                bindingPoint: bindingPoint
            };
        }
    }
});

var Uniform = Cloneable.extend({
    init: function(value) {
        this.value = value;
    },
    bind: function(context, uniformLocation) {},
    clone: function() {
        var c = this._super();
        c.value = this.value;
        return c;
    }
});

var UniformInt = Uniform.extend({
    bind: function(context, uniformLocation) {
        context.gl.uniform1i(uniformLocation, this.value);
    },
    type: function() {
        return "UniformInt";
    }
});

var UniformFloat = Uniform.extend({
    bind: function(context, uniformLocation) {
        context.gl.uniform1f(uniformLocation, this.value);
    },
    type: function() {
        return "UniformFloat";
    }
});

var UniformVec2 = Uniform.extend({
    init: function(value) {
        if (!value) value = vec2.create();
        if (value instanceof Float32Array) {
            this._super(value);
        } else {
            this._super(new Float32Array(value));
        }
    },
    type: function() {
        return "UniformVec2";
    },
    bind: function(context, uniformLocation) {
        context.gl.uniform2fv(uniformLocation, this.value);
    },
    clone: function() {
        var c = this._super();
        c.value = vec2.clone(this.value);
        return c;
    }
});

var UniformVec3 = Uniform.extend({
    init: function(value) {
        if (!value) value = vec3.create();
        if (value instanceof Float32Array) {
            this._super(value);
        } else {
            this._super(new Float32Array(value));
        }
    },
    type: function() {
        return "UniformVec3";
    },
    bind: function(context, uniformLocation) {
        context.gl.uniform3fv(uniformLocation, this.value);
    },
    clone: function() {
        var c = this._super();
        c.value = vec3.clone(this.value);
        return c;
    }
});

var UniformVec4 = Uniform.extend({
    init: function(value) {
        if (!value) value = vec4.create();
        if (value instanceof Float32Array) {
            this._super(value);
        } else {
            this._super(new Float32Array(value));
        }
    },
    type: function() {
        return "UniformVec4";
    },
    bind: function(context, uniformLocation) {
        context.gl.uniform4fv(uniformLocation, this.value);
    },
    clone: function() {
        var c = this._super();
        c.value = vec4.clone(this.value);
        return c;
    }
});

var UniformColor = UniformVec4.extend({
    init: function(value) {
        if (!value) {
            this._super(vec4.fromValues(1, 1, 1, 1));
            return;
        }
        if (value instanceof Color) {
            this._super(value.toVector());
            return;
        }
        if ("r" in value && "g" in value && "b" in value && "a" in value) {
            this._super(vec4.fromValues(value.r, value.g, value.b, value.a));
            return;
        }
        this._super(vec4.fromValues(1, 1, 1, 1));
    },
    type: function() {
        return "UniformColor";
    }
});

var UniformMat2 = Uniform.extend({
    type: function() {
        return "UniformMat2";
    },
    bind: function(context, uniformLocation) {
        context.gl.uniformMatrix2fv(uniformLocation, 0, this.value);
    },
    clone: function() {
        var c = this._super();
        c.value = mat2.clone(this.value);
        return c;
    }
});

var UniformMat3 = Uniform.extend({
    bind: function(context, uniformLocation) {
        context.gl.uniformMatrix3fv(uniformLocation, false, this.value);
    },
    type: function() {
        return "UniformMat3";
    },
    clone: function() {
        var c = this._super();
        c.value = mat3.clone(this.value);
        return c;
    }
});

var UniformMat4 = Uniform.extend({
    bind: function(context, uniformLocation) {
        context.gl.uniformMatrix4fv(uniformLocation, false, this.value);
    },
    type: function() {
        return "UniformMat4";
    },
    clone: function() {
        var c = this._super();
        c.value = mat4.clone(this.value);
        return c;
    }
});

var fallbackTexture = false;

var fallbackCubeTexture = false;

var Sampler = Serializable.extend({
    init: function(name, texture) {
        this.name = name;
        this.texture = texture;
    },
    type: function() {
        return "Sampler";
    },
    createFallbackTexture: function(context) {
        fallbackTexture = new Texture(context);
        var canvas = document.createElement("canvas");
        canvas.width = 2;
        canvas.height = 2;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, 2, 2);
        fallbackTexture.setImage(context, canvas);
    },
    createFallbackCubeTexture: function(context) {
        fallbackCubeTexture = new CubeTexture(context);
        var canvas = document.createElement("canvas");
        canvas.width = 2;
        canvas.height = 2;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, 2, 2);
        fallbackCubeTexture.setFace(context, CubeTexture.FRONT, canvas, true);
        fallbackCubeTexture.setFace(context, CubeTexture.BACK, canvas, true);
        fallbackCubeTexture.setFace(context, CubeTexture.LEFT, canvas, true);
        fallbackCubeTexture.setFace(context, CubeTexture.RIGHT, canvas, true);
        fallbackCubeTexture.setFace(context, CubeTexture.TOP, canvas, true);
        fallbackCubeTexture.setFace(context, CubeTexture.BOTTOM, canvas, true);
    },
    bind: function(context, uniformLocation, slotIndex) {
        context.gl.activeTexture(slotIndex + context.gl.TEXTURE0);
        context.gl.uniform1i(uniformLocation, slotIndex);
        if (!this.texture || !this.texture.loaded) {
            if (!fallbackTexture) {
                this.createFallbackTexture(context);
            }
            fallbackTexture.bind(context);
            return;
        }
        this.texture.bind(context);
    },
    unbind: function(context, uniformLocation, slotIndex) {
        context.gl.activeTexture(slotIndex + context.gl.TEXTURE0);
        if (!this.texture || !this.texture.loaded) {
            fallbackTexture.unbind(context);
            return;
        }
        this.texture.unbind(context);
    },
    clone: function() {
        var c = this._super();
        c.name = this.name;
        c.texture = this.texture;
        return c;
    }
});

var Camera = Serializable.extend({
    init: function(viewMatrix, projectionMatrix, renderStage) {
        this.viewMatrix = viewMatrix;
        this.projectionMatrix = projectionMatrix;
        this.viewInverseMatrix = mat4.create();
        mat4.invert(this.viewInverseMatrix, this.viewMatrix);
        this.renderStage = renderStage;
        this.target = new TargetScreen();
        this.backgroundColor = new Color(0, 0, 0, 0);
        this.clearMask = false;
        this.order = 0;
        this.layerMask = 4294967295;
        this.frustum = false;
        var stereo = false;
        this.stereo = function(v) {
            if (v) stereo = true;
            if (v === false) stereo = false;
            return stereo;
        };
        var stereoEyeDistance = 2;
        this.stereoEyeDistance = function(v) {
            if (v) stereoEyeDistance = v;
            return stereoEyeDistance;
        };
        this._viewportSize = vec2.create();
        this._viewportPosition = vec2.create();
        this._originalViewMatrix = mat4.create();
        this._eyeSeparation = mat4.create();
        this._cacheQuat = quat.create();
        this._strafe = vec3.create();
        this._translation = vec3.create();
    },
    type: function() {
        return "Camera";
    },
    excluded: function() {
        return [ "renderStage", "target" ];
    },
    clearBuffers: function(context) {
        context.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
        context.gl.clearDepth(1);
        context.gl.depthMask(true);
        if (this.clearMask === false) {
            context.gl.clear(context.gl.COLOR_BUFFER_BIT | context.gl.DEPTH_BUFFER_BIT);
        } else {
            context.gl.clear(this.clearMask);
        }
    },
    startRender: function(context) {
        context.projection.push();
        context.projection.multiply(this.projectionMatrix);
        context.modelview.push();
        context.modelview.multiply(this.viewMatrix);
    },
    renderScene: function(context, scene, preRenderCallback, postRenderCallback) {
        if (preRenderCallback) preRenderCallback(context, this);
        this.renderStage.render(context, scene, this);
        if (postRenderCallback) postRenderCallback(context, this);
    },
    endRender: function(context) {
        context.modelview.pop();
        context.projection.pop();
    },
    render: function(context, scene, preRenderCallback, postRenderCallback) {
        this.target.resetViewport();
        this.clearBuffers(context);
        context.camera = this;
        if (this.stereo()) {
            mat4.invert(this.viewInverseMatrix, this.viewMatrix);
            vec2.copy(this._viewportPosition, this.target.viewport.position);
            vec2.copy(this._viewportSize, this.target.viewport.size);
            var half = this._viewportSize[0] / 2;
            this.target.viewport.size[0] = half;
            var halfEyeDistance = this.stereoEyeDistance() / 2;
            this.getStrafeVector(this._strafe);
            mat4.copy(this._originalViewMatrix, this.viewMatrix);
            vec3.scale(this._translation, this._strafe, -halfEyeDistance);
            mat4.fromRotationTranslation(this._eyeSeparation, quat.create(), this._translation);
            mat4.mul(this.viewMatrix, this.viewMatrix, this._eyeSeparation);
            mat4.invert(this.viewInverseMatrix, this.viewMatrix);
            this.target.viewport.position[0] = 0;
            this.startRender(context);
            this.renderScene(context, scene, preRenderCallback, postRenderCallback);
            this.endRender(context);
            mat4.copy(this.viewMatrix, this._originalViewMatrix);
            vec3.scale(this._translation, this._strafe, halfEyeDistance);
            mat4.fromRotationTranslation(this._eyeSeparation, quat.create(), this._translation);
            mat4.mul(this.viewMatrix, this.viewMatrix, this._eyeSeparation);
            mat4.invert(this.viewInverseMatrix, this.viewMatrix);
            this.target.viewport.position[0] = half;
            this.startRender(context);
            this.renderScene(context, scene, preRenderCallback, postRenderCallback);
            this.endRender(context);
            vec2.copy(this.target.viewport.position, this._viewportPosition);
            vec2.copy(this.target.viewport.size, this._viewportSize);
            mat4.copy(this.viewMatrix, this._originalViewMatrix);
        } else {
            mat4.invert(this.viewInverseMatrix, this.viewMatrix);
            this.startRender(context);
            this.renderScene(context, scene, preRenderCallback, postRenderCallback);
            this.endRender(context);
        }
        context.camera = false;
    },
    getFieldOfView: function() {
        return 2 * Math.atan(1 / this.projectionMatrix[5]);
    },
    getDirection: function(out) {
        if (!out) out = vec3.create();
        out[0] = -this.viewMatrix[8];
        out[1] = -this.viewMatrix[9];
        out[2] = -this.viewMatrix[10];
        return out;
    },
    getUpVector: function(out) {
        if (!out) out = vec3.create();
        out[0] = this.viewMatrix[4];
        out[1] = this.viewMatrix[5];
        out[2] = this.viewMatrix[6];
        return out;
    },
    getStrafeVector: function(out) {
        if (!out) out = vec3.create();
        out[0] = this.viewMatrix[0];
        out[1] = this.viewMatrix[1];
        out[2] = this.viewMatrix[2];
        return out;
    },
    getPosition: function(out) {
        if (!out) out = vec3.create();
        mat4.translation(out, this.viewInverseMatrix);
        return out;
    },
    setPosition: function(position) {
        var p = this.getPosition();
        vec3.sub(p, p, position);
        var m = mat4.fromTranslation(mat4.create(), p);
        mat4.mul(this.viewMatrix, this.viewMatrix, m);
    },
    center: function(point) {
        var dir = this.getDirection();
        var pos = this.getPosition();
        var plane = new Plane();
        plane.setByNormalAndPoint(dir, pos);
        var p = plane.projectToPlane(point);
        this.setPosition(p);
    },
    fitToView: function(boundingVolume) {
        if (!(boundingVolume instanceof BoundingVolume) || !boundingVolume.center) return;
        this.center(boundingVolume.center);
        if (boundingVolume.isPoint()) return;
        var size = 0;
        if (boundingVolume instanceof BoundingSphere) {
            size = boundingVolume.radius * 2;
        } else if (boundingVolume instanceof BoundingBox) {
            size = boundingVolume.getOuterSphereRadius() * 2;
        }
        var distance = size / Math.sin(this.getFieldOfView() / 2) - size;
        var dir = this.getDirection();
        var pos = vec3.create();
        vec3.scale(dir, dir, -distance);
        vec3.add(pos, boundingVolume.center, dir);
        this.setPosition(pos);
    }
});

function TransparencySort(a, b) {
    if (!a && !b) return 0;
    if (a && !b) return -1;
    if (!a && b) return 1;
    var d1 = vec3.squaredDistance(TransparencySort.cmpValue, a.globalBoundingSphere.center);
    var d2 = vec3.squaredDistance(TransparencySort.cmpValue, b.globalBoundingSphere.center);
    if (d1 > d2) return -1;
    if (d1 < d2) return 1;
    return 0;
}

TransparencySort.cmpValue = vec3.create();

function Batch(list) {
    this.indices = new Array();
    this.length = 0;
    var scope = this;
    this.clear = function() {
        for (var i = 0, l = scope.indices.length; i < l; ++i) scope.indices[i] = -1;
        scope.length = 0;
    };
    this.add = function(index) {
        function indexOfFor(ar, v) {
            for (var i = 0, l = ar.length; i < l; i++) {
                if (ar[i] === v) {
                    return true;
                }
            }
            return false;
        }
        if (indexOfFor(scope.indices, index)) return;
        scope.indices[scope.length++] = index;
    };
    this.get = function(index) {
        if (index >= 0 && index < scope.indices.length) {
            var listIndex = scope.indices[index];
            if (listIndex >= 0 && listIndex < list.length) return list[listIndex];
        }
    };
}

var RendererOrganizer = FrakClass.extend({
    init: function() {
        this.enableDynamicBatching = true;
        this.solidRenderers = [];
        this.transparentRenderers = [];
        this.customRenderers = [];
        this.opaqueBatchList = [];
        this.transparentBatchList = [];
        this.customBatchList = [];
        this.batchIndex = {};
        this.renderers = new CollectionReference([]);
        this.viewSolidRenderers = new CollectionView(this.renderers, function(renderer) {
            return !renderer.transparent && !renderer.customShader;
        });
        this.viewTransparentRenderers = new CollectionView(this.renderers, function(renderer) {
            return renderer.transparent && !renderer.customShader;
        });
        this.viewCustomRenderers = new CollectionView(this.renderers, function(renderer) {
            return renderer.customShader;
        });
        this.visibleRenderers = 0;
        this.visibleSolidRenderers = 0;
        this.visibleSolidBatches = 0;
        this.visibleSolidFaces = 0;
        this.visibleTransparentRenderers = 0;
        this.visibleTransparentFaces = 0;
        this.visibleTransparentBatches = 0;
        this.visibleCustomRenderers = 0;
        this.visibleCustomFaces = 0;
        this.visibleCustomBatches = 0;
    },
    updateStats: function() {
        this.visibleSolidRenderers = this.viewSolidRenderers.length;
        this.visibleTransparentRenderers = this.viewTransparentRenderers.length;
        this.visibleCustomRenderers = this.viewCustomRenderers.length;
        this.visibleRenderers = this.visibleSolidRenderers + this.visibleTransparentRenderers + this.visibleCustomRenderers;
    },
    batch: function(batchList, renderers) {
        var i;
        var batch;
        for (i = 0; i < batchList.length; ++i) {
            batchList[i].clear();
        }
        var renderer;
        for (i = 0; i < renderers.length; ++i) {
            renderer = renderers[i];
            if (!renderer) break;
            if (renderer.material.id in this.batchIndex) {
                batch = batchList[this.batchIndex[renderer.material.id]];
            } else {
                batch = new Batch(renderers);
                batchList.push(batch);
                this.batchIndex[renderer.material.id] = batchList.length - 1;
            }
            if (batch) batch.add(i); else {
                batch = new Batch(renderers);
                batchList.push(batch);
                this.batchIndex[renderer.material.id] = batchList.length - 1;
            }
        }
    },
    sort: function(engine, renderers, eyePosition) {
        this.renderers.list = renderers;
        this.viewSolidRenderers.filter();
        this.viewTransparentRenderers.filter();
        this.viewCustomRenderers.filter();
        this.solidRenderers = this.viewSolidRenderers.view;
        this.transparentRenderers = this.viewTransparentRenderers.view;
        this.customRenderers = this.viewCustomRenderers.view;
        if (this.enableDynamicBatching) {
            if (engine.options.transparencyMode != "sorted") {
                this.batch(this.transparentBatchList, this.transparentRenderers);
            }
            this.batch(this.opaqueBatchList, this.solidRenderers);
            this.batch(this.customBatchList, this.customRenderers);
        }
        if (engine.options.transparencyMode == "sorted" && eyePosition) {
            vec3.copy(TransparencySort.cmpValue, eyePosition);
            this.transparentRenderers.sort(TransparencySort);
        }
        this.updateStats();
    }
});

function ScreenQuad(context, x, y, width, height) {
    x = x || -1;
    y = y || -1;
    width = width || 2;
    height = height || 2;
    var faces = [ 0, 1, 2, 0, 2, 3 ];
    if (context.engine && context.engine.options.useVAO === true) {
        try {
            this.quad = new TrianglesRenderBufferVAO(context, faces);
        } catch (e) {
            this.quad = new TrianglesRenderBuffer(context, faces);
        }
    } else {
        this.quad = new TrianglesRenderBuffer(context, faces);
    }
    this.vertices = new Float32Array(12);
    this.vertices[0] = x;
    this.vertices[1] = y;
    this.vertices[3] = x;
    this.vertices[4] = y + height;
    this.vertices[6] = x + width;
    this.vertices[7] = y + height;
    this.vertices[9] = x + width;
    this.vertices[10] = y;
    this.quad.add("position", this.vertices, 3);
    this.quad.add("uv0", [ 0, 0, 0, 1, 1, 1, 1, 0 ], 2);
}

ScreenQuad.prototype.update = function(x, y, width, height) {
    this.vertices[0] = x;
    this.vertices[1] = y;
    this.vertices[3] = x;
    this.vertices[4] = y + height;
    this.vertices[6] = x + width;
    this.vertices[7] = y + height;
    this.vertices[9] = x + width;
    this.vertices[10] = y;
    this.quad.update("position", this.vertices);
};

ScreenQuad.prototype.render = function(context, material, samplerOrList) {
    var gl = context.gl;
    var samplers;
    if (samplerOrList) {
        if (samplerOrList instanceof Sampler) samplers = [ samplerOrList ]; else samplers = samplerOrList;
    }
    material.bind({}, samplers);
    this.quad.render(material.shader);
    material.unbind(samplers);
};

var RenderStage = FrakClass.extend({
    init: function() {
        this.parent = false;
        this.substages = [];
        this.started = false;
        this.enabled = true;
    },
    addStage: function(stage) {
        stage.parent = this;
        this.substages.push(stage);
        return stage;
    },
    removeStage: function(stage) {
        for (var i = 0; i < this.substages.length; i++) {
            if (this.substages[i] === stage) {
                stage.parent = false;
                this.substages.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    removeStagesByType: function(stageType) {
        var removed = [];
        for (var i = 0; i < this.substages.length; i++) {
            if (this.substages[i] instanceof stageType) {
                removed.push(this.substages[i]);
                this.substages.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < removed.length; i++) {
            removed[i].parent = false;
        }
        return removed;
    },
    clearStages: function() {
        for (var i = 0; i < this.substages.length; i++) {
            this.substages[i].parent = false;
        }
        this.substages = [];
    },
    getStageByType: function(stageType) {
        for (var i = 0; i < this.substages.length; i++) {
            if (this.substages[i] instanceof stageType) return this.substages[i];
        }
        return false;
    },
    start: function(context, engine, camera) {
        this.started = true;
        this.onStart(context, engine, camera);
        for (var i = 0; i < this.substages.length; i++) this.substages[i].start(context, engine, camera);
    },
    render: function(context, scene, camera) {
        if (!this.enabled) return;
        this.onPreRender(context, scene, camera);
        for (var i = 0; i < this.substages.length; i++) {
            if (!this.substages[i].started) this.substages[i].start(context, scene.engine, camera);
            this.substages[i].render(context, scene, camera);
        }
        this.onPostRender(context, scene, camera);
    },
    enable: function() {
        this.enabled = true;
        this.onEnable();
        return this;
    },
    disable: function() {
        this.enabled = false;
        this.onDisable();
        return this;
    },
    onStart: function(context, engine, camera) {},
    onPreRender: function(context, scene, camera) {},
    onPostRender: function(context, scene, camera) {},
    onEnable: function() {},
    onDisable: function() {}
});

var MaterialRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.organizer = new RendererOrganizer();
        this.solidRenderers = [];
        this.solidRendererBatches = {};
        this.transparentRenderers = [];
        this.transparentRendererBatches = {};
        this.shadowFallback = null;
        this.diffuseFallback = null;
        this.bindCameraTarget = {
            started: true,
            start: function() {},
            render: function(context, scene, camera) {
                camera.target.bind(context);
            }
        };
        this.unbindCameraTarget = {
            started: true,
            start: function() {},
            render: function(context, scene, camera) {
                camera.target.unbind(context);
            }
        };
        this.shadowMapStage = this.addStage(new ShadowMapRenderStage());
        this.depthStage = this.addStage(new DepthRenderStage()).disable();
        this.oitStage = this.addStage(new OITRenderStage()).disable();
        this.addStage(this.bindCameraTarget);
        this.skyboxStage = this.addStage(new SkyboxRenderStage());
        this.opaqueStage = this.addStage(new OpaqueGeometryRenderStage());
        this.transparentStage = this.addStage(new TransparentGeometryRenderStage());
        this.addStage(this.unbindCameraTarget);
        this.eyePosition = vec3.create();
        this.invModelview = mat4.create();
        this.sharedUniforms = {
            view: new UniformMat4(mat4.create()),
            viewInverse: new UniformMat4(mat4.create()),
            projection: new UniformMat4(mat4.create()),
            cameraPosition: new UniformVec3(vec3.create())
        };
        this.rendererUniforms = {
            model: new UniformMat4(null),
            modelview: new UniformMat4(null),
            receiveShadows: new UniformInt(1)
        };
        this.shadowUniforms = {
            lightView: new UniformMat4(mat4.create()),
            lightProjection: new UniformMat4(mat4.create()),
            shadowBias: new UniformFloat(.001),
            hasFloat: new UniformInt(1),
            useVSM: new UniformInt(1)
        };
        this.cachedUniforms = null;
        this.samplerAccum = new SamplerAccumulator();
    },
    onStart: function(context, engine, camera) {
        this.diffuseFallback = new Sampler("diffuse0", engine.WhiteTexture);
        this.shadowFallback = new Sampler("shadow0", engine.WhiteTexture);
        if (engine.options.ssao === true) {
            this.depthStage.enable();
        }
        if (engine.options.transparencyMode != "sorted") {
            this.oitStage.enable();
        }
    },
    prepareShadowContext: function(context, scene) {
        if (!this._shadowContext) {
            this._shadowContext = {
                shadow0: this.shadowFallback,
                lightProjection: this.shadowUniforms.lightProjection,
                lightView: this.shadowUniforms.lightView
            };
        }
        context.shadow = this._shadowContext;
        context.shadow.shadow0 = this.shadowFallback;
        var light = this.shadowMapStage.getFirstShadowCastingLight(scene, true);
        if (!light) return;
        mat4.copy(this.shadowUniforms.lightView.value, light.lightView);
        mat4.copy(this.shadowUniforms.lightProjection.value, light.lightProj);
        this.shadowUniforms.shadowBias.value = light.shadowBias;
        this.shadowUniforms.hasFloat.value = light.shadow instanceof TargetTextureFloat ? 1 : 0;
        if (this.shadowUniforms.hasFloat.value == 1 && this.shadowMapStage.extStandardDerivatives) this.shadowUniforms.useVSM.value = 1; else this.shadowUniforms.useVSM.value = 0;
        context.shadow.shadow0 = light.shadowSampler;
    },
    prepareLightContext: function(context, scene) {
        for (var i = 0; i < scene.lights.length; i++) {
            var light = scene.lights[i];
            if (!(light instanceof DirectionalLight)) continue;
            if (!light.enabled) continue;
            if (light.uniforms) {
                vec3.copy(light.uniforms.lightDirection.value, light.direction);
                light.uniforms.lightIntensity.value = light.intensity;
                light.uniforms.lightColor.value[0] = light.color.r;
                light.uniforms.lightColor.value[1] = light.color.g;
                light.uniforms.lightColor.value[2] = light.color.b;
                light.uniforms.lightColor.value[3] = light.color.a;
                light.uniforms.useShadows.value = light.shadowCasting ? 1 : 0;
            } else {
                light.uniforms = {
                    lightDirection: new UniformVec3(light.direction),
                    lightColor: new UniformColor(light.color),
                    lightIntensity: new UniformFloat(light.intensity),
                    useShadows: new UniformInt(light.shadowCasting ? 1 : 0)
                };
            }
        }
    },
    prepareShared: function(context) {
        mat4.invert(this.invModelview, context.modelview.top());
        mat4.translation(this.eyePosition, this.invModelview);
        mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
        mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
        mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);
        vec3.copy(this.sharedUniforms.cameraPosition.value, context.camera.getPosition());
    },
    onPreRender: function(context, scene, camera) {
        this.prepareShared(context);
        var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
        this.organizer.sort(scene.engine, renderers, this.eyePosition);
        this.solidRenderers = this.organizer.solidRenderers;
        this.transparentRenderers = this.organizer.transparentRenderers;
        this.solidRendererBatches = this.organizer.solidRendererBatches;
        this.transparentRendererBatches = this.organizer.transparentRendererBatches;
        this.prepareLightContext(context, scene);
        this.prepareShadowContext(context, scene);
    },
    onPostRender: function(context, scene, camera) {
        context.shadow = false;
        context.light = false;
    },
    renderBatched: function(context, batches) {
        var usedShader = false;
        var material, batch, shader, renderer;
        for (var i = 0, l = batches.length; i < l; ++i) {
            batch = batches[i];
            if (batch.get(0)) {
                material = batch.get(0).material;
                shader = material.shader;
                if (shader != usedShader) {
                    shader.use();
                    usedShader = shader;
                    if (context.shadow) shader.bindUniforms(this.shadowUniforms);
                    shader.bindUniforms(this.sharedUniforms);
                    if (context.light && context.light.uniforms) shader.bindUniforms(context.light.uniforms);
                }
                this.samplerAccum.add(context.shadow.shadow0);
                for (var j = 0, msl = material.samplers.length; j < msl; ++j) {
                    this.samplerAccum.add(material.samplers[j]);
                }
                if (this.samplerAccum.length === 0) {
                    this.samplerAccum.add(this.diffuseFallback);
                }
                shader.bindSamplers(this.samplerAccum.samplers);
                shader.bindUniforms(material.uniforms);
                for (var j = 0, bl = batch.length; j < bl; ++j) {
                    renderer = batch.get(j);
                    context.modelview.push();
                    context.modelview.multiply(renderer.matrix);
                    this.rendererUniforms.model.value = renderer.matrix;
                    this.rendererUniforms.modelview.value = context.modelview.top();
                    this.rendererUniforms.receiveShadows.value = renderer.receiveShadows;
                    shader.bindUniforms(this.rendererUniforms);
                    renderer.render(context);
                    context.modelview.pop();
                }
                shader.unbindSamplers(this.samplerAccum.samplers);
                this.samplerAccum.clear();
            }
        }
    },
    renderBruteForce: function(context, renderers) {
        for (var j = 0; j < renderers.length; ++j) {
            var renderer = renderers[j];
            if (!renderer) break;
            context.modelview.push();
            context.modelview.multiply(renderer.matrix);
            this.cachedUniforms = renderer.getDefaultUniforms(context, null);
            renderer.material.bind(this.cachedUniforms, context.shadow.shadow0);
            renderer.render(context);
            renderer.material.unbind();
            context.modelview.pop();
        }
    }
});

var ShaderRenderStage = RenderStage.extend({
    init: function(shader, target) {
        this._super(target);
        this.shader = shader;
        this.uniforms = {};
    },
    onPostRender: function(context, scene, camera) {
        this.shader.use(this.uniforms);
        if (this.shader.requirements.transparent) {
            context.gl.blendFunc(context.gl.SRC_ALPHA, context.gl.ONE);
            context.gl.enable(context.gl.BLEND);
        }
        var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
        for (var i = 0; i < renderers.length; i++) {
            renderers[i].renderGeometry(context, this.shader);
        }
        if (this.shader.requirements.transparent) {
            context.gl.disable(context.gl.BLEND);
        }
    }
});

var DepthRenderStage = RenderStage.extend({
    init: function(size) {
        this._super();
        this.target = null;
        this.sampler = new Sampler("depth0", null);
        this.size = vec2.fromValues(1024, 1024);
        if (size) vec2.copy(this.size, size);
        this.clearColor = new Color(0, 0, 0, 0);
    },
    onStart: function(context, engine) {
        try {
            this.target = new TargetTextureFloat(this.size, context, false);
            this.sampler.texture = this.target.texture;
        } catch (e) {
            console.warn("DepthRenderStage: ", e);
            this.disable();
            return;
        }
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("depth")), {
            zNear: new UniformFloat(.1),
            zFar: new UniformFloat(1e3)
        }, []);
    },
    onPreRender: function(context, scene, camera) {
        this.target.resetViewport();
        if (camera.target.size[0] != this.size[0] || camera.target.size[1] != this.size[1]) {
            var size = camera.target.size;
            vec2.copy(this.size, size);
            this.target.setSize(size[0], size[1]);
        }
    },
    onPostRender: function(context, scene, camera) {
        this.material.uniforms.zNear.value = camera.near;
        this.material.uniforms.zFar.value = camera.far;
        context.projection.push();
        context.projection.load(camera.projectionMatrix);
        context.modelview.push();
        context.modelview.load(camera.viewMatrix);
        this.target.bind(context, false, this.clearColor);
        var gl = context.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        this.material.bind();
        var renderers = this.parent.organizer.solidRenderers;
        for (var i = 0; i < renderers.length; ++i) {
            if (!renderers[i]) break;
            context.modelview.push();
            context.modelview.multiply(renderers[i].matrix);
            this.material.shader.bindUniforms(renderers[i].material.uniforms);
            renderers[i].renderGeometry(context, this.material.shader);
            context.modelview.pop();
        }
        this.material.unbind();
        this.renderAlphaMapped(context, scene, camera);
        gl.disable(gl.DEPTH_TEST);
        this.target.unbind(context);
        context.modelview.pop();
        context.projection.pop();
    },
    renderAlphaMapped: function(context, scene, camera) {
        var batches = this.parent.organizer.transparentBatchList;
        var shader = this.material.shader;
        shader.use();
        shader.bindUniforms(this.material.uniforms);
        shader.bindUniforms(this.parent.sharedUniforms);
        if (context.light && context.light.uniforms) shader.bindUniforms(context.light.uniforms);
        for (var i = 0; i < batches.length; i++) {
            var batch = batches[i];
            if (batch.length == 0) continue;
            var batchMaterial = batch.get(0).material;
            var samplers;
            if (this.material.samplers.length > 0) {
                samplers = this.material.samplers.concat(batchMaterial.samplers);
            } else {
                samplers = batchMaterial.samplers;
            }
            shader.bindUniforms(batchMaterial.uniforms);
            shader.bindSamplers(samplers);
            var renderer;
            for (var j = 0; j < batch.length; ++j) {
                renderer = batch.get(j);
                context.modelview.push();
                context.modelview.multiply(renderer.matrix);
                this.parent.rendererUniforms.model.value = renderer.matrix;
                this.parent.rendererUniforms.modelview.value = context.modelview.top();
                shader.bindUniforms(this.parent.rendererUniforms);
                renderer.renderGeometry(context, shader);
                context.modelview.pop();
            }
            shader.unbindSamplers(samplers);
        }
    }
});

var ShadowMapRenderStage = RenderStage.extend({
    init: function(size) {
        this._super();
        this.material = null;
        this.clearColor = new Color(0, 0, 0, 1);
        this.lightPosition = vec3.create();
        this.lightLookTarget = vec3.create();
        this.lightUpVector = vec3.fromValues(0, 1, 0);
        this.aabbVertices = [ vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create() ];
        this.sceneAABB = new BoundingBox();
        this.lightFrustum = new BoundingBox();
    },
    onStart: function(context, engine) {
        var shader = "forward_shadow";
        if (context.isWebGL2()) {
            shader = "forward_shadow_vsm";
        } else {
            this.extStandardDerivatives = context.gl.getExtension("OES_standard_derivatives");
            if (this.extStandardDerivatives) shader = "forward_shadow_vsm";
        }
        this.material = new Material(engine.assetsManager.addShader(engine.assetsManager.shadersManager.bundle("forward_shadow.vert"), engine.assetsManager.shadersManager.bundle("{0}.frag".format(shader))), {
            hasFloat: new UniformInt(1)
        }, []);
        engine.assetsManager.load();
    },
    onPostRender: function(context, scene, camera) {
        var light = this.getFirstShadowCastingLight(scene, false);
        if (!light) return;
        this.computeSceneBounds();
        vec3.copy(this.lightPosition, this.sceneAABB.center);
        vec3.sub(this.lightLookTarget, this.lightPosition, light.direction);
        mat4.lookAt(light.lightView, this.lightPosition, this.lightLookTarget, this.lightUpVector);
        this.sceneAABB.getVertices(this.aabbVertices);
        for (var i = 0; i < 8; ++i) {
            vec3.transformMat4(this.aabbVertices[i], this.aabbVertices[i], light.lightView);
        }
        this.lightFrustum.set(this.aabbVertices[0], [ 0, 0, 0 ]);
        for (var i = 1; i < 8; ++i) {
            this.lightFrustum.encapsulatePoint(this.aabbVertices[i]);
        }
        mat4.ortho(light.lightProj, this.lightFrustum.min[0], this.lightFrustum.max[0], this.lightFrustum.min[1], this.lightFrustum.max[1], this.lightFrustum.min[2], this.lightFrustum.max[2]);
        if (light.shadow instanceof TargetTextureFloat) this.material.uniforms.hasFloat.value = 1; else this.material.uniforms.hasFloat.value = 0;
        context.projection.push();
        context.projection.load(light.lightProj);
        context.modelview.push();
        context.modelview.load(light.lightView);
        light.shadow.bind(context, false, this.clearColor);
        var gl = context.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        gl.colorMask(true, true, true, true);
        this.material.bind();
        var renderers = this.parent.organizer.solidRenderers;
        for (var i = 0; i < renderers.length; ++i) {
            if (!renderers[i]) break;
            if (!(renderers[i].layer & light.shadowMask)) continue;
            if (!renderers[i].castShadows) continue;
            context.modelview.push();
            context.modelview.multiply(renderers[i].matrix);
            this.material.shader.bindUniforms(renderers[i].material.uniforms);
            renderers[i].renderGeometry(context, this.material.shader);
            context.modelview.pop();
        }
        this.material.unbind();
        this.renderAlphaMapped(context, light);
        gl.disable(gl.DEPTH_TEST);
        light.shadow.unbind(context);
        light.updateSamplers();
        light.undamage();
        this.parent.prepareShadowContext(context, scene);
        context.modelview.pop();
        context.projection.pop();
    },
    renderAlphaMapped: function(context, light) {
        var batches = this.parent.organizer.transparentBatchList;
        var shader = this.material.shader;
        var fallbackSamplers = [ this.parent.diffuseFallback ];
        shader.use();
        shader.bindUniforms(this.material.uniforms);
        shader.bindUniforms(this.parent.sharedUniforms);
        var samplers;
        for (var i = 0; i < batches.length; ++i) {
            var batch = batches[i];
            if (batch.length == 0) continue;
            var batchMaterial = batch.get(0).material;
            if (batchMaterial.samplers.length > 0) samplers = batchMaterial.samplers; else samplers = fallbackSamplers;
            shader.bindUniforms(batchMaterial.uniforms);
            shader.bindSamplers(samplers);
            var renderer;
            for (var j = 0; j < batch.length; ++j) {
                renderer = batch.get(j);
                if (!(renderer.layer & light.shadowMask)) continue;
                if (!renderer.castShadows) continue;
                context.modelview.push();
                context.modelview.multiply(renderer.matrix);
                this.parent.rendererUniforms.model.value = renderer.matrix;
                this.parent.rendererUniforms.modelview.value = context.modelview.top();
                shader.bindUniforms(this.parent.rendererUniforms);
                renderer.renderGeometry(context, shader);
                context.modelview.pop();
            }
            shader.unbindSamplers(samplers);
        }
    },
    computeSceneBounds: function() {
        if (this.sceneAABB.center === false) this.sceneAABB.center = vec3.create();
        vec3.set(this.sceneAABB.center, 0, 0, 0);
        vec3.set(this.sceneAABB.extents, 0, 0, 0);
        this.sceneAABB.recalculate();
        var opaque = this.parent.organizer.solidRenderers;
        var transparent = this.parent.organizer.transparentRenderers;
        for (var i = 0; i < opaque.length; ++i) {
            if (!opaque[i]) break;
            if (!opaque[i].castShadows) continue;
            this.sceneAABB.encapsulateBox(opaque[i].globalBoundingBox);
        }
        for (var i = 0; i < transparent.length; ++i) {
            if (!transparent[i]) break;
            if (!transparent[i].castShadows) continue;
            this.sceneAABB.encapsulateBox(transparent[i].globalBoundingBox);
        }
        return this.sceneAABB;
    },
    getFirstShadowCastingLight: function(scene, ignoreDamage) {
        for (var i = 0; i < scene.lights.length; ++i) {
            if (!(scene.lights[i] instanceof DirectionalLight)) continue;
            if (!scene.lights[i].enabled) continue;
            if (!ignoreDamage && scene.engine.options.shadowManualUpdate && !scene.lights[i].damaged) continue;
            if (scene.lights[i].shadowCasting === true) return scene.lights[i];
        }
        return false;
    }
});

var PositionBufferRenderStage = RenderStage.extend({
    init: function(size) {
        this._super();
        this.size = 2048;
        if (size) this.size = size;
        this.target = false;
    },
    onStart: function(context, engine) {
        this.target = new TargetTextureFloat([ this.size, this.size ], context, false);
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("positionbuffer")), {
            ViewportSize: new UniformVec2(vec2.clone(engine.scene.camera.target.size))
        }, []);
        var vertices = [ 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0 ];
        var uvs = [ 0, 1, 0, 0, 1, 0, 1, 1 ];
        var faces = [ 0, 1, 2, 0, 2, 3 ];
        this.quad = new TrianglesRenderBuffer(context, faces);
        this.quad.add("position", vertices, 3);
        this.quad.add("texcoord2d0", uvs, 2);
        engine.assetsManager.load(function() {});
    },
    onPreRender: function(context, scene, camera) {
        vec2.set(this.material.uniforms.ViewportSize.value, camera.target.size[0], camera.target.size[1]);
    },
    onPostRender: function(context, scene, camera) {
        if (!this.parent || !(this.parent instanceof MaterialRenderStage)) return;
        if (!this.target || !this.material) return;
        this.target.bind(context);
        var gl = context.gl;
        gl.depthMask(true);
        gl.clearDepth(1);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        this.material.bind();
        for (var i = 0; i < this.parent.solidRenderers.length; ++i) {
            if (!this.parent.solidRenderers[i]) break;
            if (this.parent.solidRenderers[i].layer && this.parent.solidRenderers[i].visible) {
                context.modelview.push();
                context.modelview.multiply(this.parent.solidRenderers[i].matrix);
                this.parent.solidRenderers[i].renderGeometry(context, this.material.shader);
                context.modelview.pop();
            }
        }
        this.material.unbind();
        gl.depthMask(true);
        gl.disable(gl.DEPTH_TEST);
        this.target.unbind(context);
    }
});

var SSAOBufferRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.size = false;
        this.quad = false;
        this.target = false;
    },
    setSize: function(width, height) {
        if (this.size === false) this.size = vec2.create();
        this.size[0] = width;
        this.size[1] = height;
    },
    onStart: function(context, engine) {
        if (!this.size) {
            this.size = vec2.clone(engine.scene.camera.target.size);
        }
        this.target = new TargetTextureFloat([ engine.scene.camera.target.size[0], engine.scene.camera.target.size[1] ], context, false);
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("ssao")), {
            ViewportSize: new UniformVec2(vec2.clone(engine.scene.camera.target.size)),
            ssaoGDisplace: new UniformFloat(engine.options.ssaoGDisplace ? engine.options.ssaoGDisplace : 6),
            ssaoRadius: new UniformFloat(engine.options.ssaoRadius ? engine.options.ssaoRadius : 8),
            ssaoDivider: new UniformFloat(engine.options.ssaoDivider ? engine.options.ssaoDivider : .5)
        }, [ new Sampler("position0", this.parent.positionBufferStage.target.texture) ]);
        this.material.name = "SSAO";
        var vertices = [ -1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0 ];
        var uvs = [ 0, 1, 0, 0, 1, 0, 1, 1 ];
        var faces = [ 0, 1, 2, 0, 2, 3 ];
        this.quad = new TrianglesRenderBuffer(context, faces);
        this.quad.add("position", vertices, 3);
        this.quad.add("texcoord2d0", uvs, 2);
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        var cameraTarget = camera.target;
        if (cameraTarget.size[0] != this.target.size[0] || cameraTarget.size[1] != this.target.size[1]) {
            vec2.set(this.material.uniforms.ViewportSize.value, camera.target.size[0], camera.target.size[1]);
            this.setSize(cameraTarget.size[0], cameraTarget.size[1]);
            this.target.setSize(cameraTarget.size[0], cameraTarget.size[1]);
        }
    },
    onPostRender: function(context, scene, camera) {
        if (!this.parent || !(this.parent instanceof MaterialRenderStage)) return;
        if (!this.target || !this.material) return;
        this.target.bind(context);
        var gl = context.gl;
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.material.bind();
        if (this.material.shader.linked) {
            var locations = [];
            for (var bufferName in this.quad.buffers) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.quad.buffers[bufferName]);
                var bufferLocation = gl.getAttribLocation(this.material.shader.program, bufferName);
                if (bufferLocation == -1) continue;
                gl.enableVertexAttribArray(bufferLocation);
                locations.push(bufferLocation);
                gl.vertexAttribPointer(bufferLocation, this.quad.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
            }
            this.quad.drawElements();
            for (var i in locations) gl.disableVertexAttribArray(locations[i]);
        }
        this.material.unbind();
        this.target.unbind(context);
    }
});

var SkyboxRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.uniforms = {
            model: new UniformMat4(mat4.create()),
            modelview: new UniformMat4(mat4.create()),
            projection: new UniformMat4(mat4.create()),
            view: new UniformMat4(mat4.create()),
            viewInverse: new UniformMat4(mat4.create()),
            zNear: new UniformFloat(0),
            zFar: new UniformFloat(0),
            lightDirection: new UniformVec3(vec3.create()),
            lightColor: new UniformColor(new Color()),
            lightIntensity: new UniformFloat(1)
        };
        this.shadowFallback = null;
    },
    onStart: function(context, engine, camera) {
        this.shadowFallback = new Sampler("shadow0", engine.WhiteTexture);
    },
    onPostRender: function(context, scene, camera) {
        var skybox = scene.cameraNode.getComponent(SkyboxComponent);
        if (!skybox) {
            return;
        }
        var globalSamplers = [ this.shadowFallback ];
        var renderComponent = skybox.meshNode.getComponent(MeshRendererComponent);
        var renderers = renderComponent.meshRenderers;
        for (var i = 0; i < renderers.length; i++) {
            var renderer = renderers[i];
            var defaultUniforms = renderer.getDefaultUniforms(context, this.uniforms);
            mat4.identity(defaultUniforms.model.value);
            mat4.translate(defaultUniforms.model.value, defaultUniforms.model.value, camera.getPosition());
            renderer.material.bind(defaultUniforms, globalSamplers);
            renderer.render(context);
            renderer.material.unbind(globalSamplers);
        }
    }
});

var OpaqueGeometryRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.activeLights = [];
    },
    getDirectionalLights: function(scene) {
        if (this.activeLights.length < scene.lights.length) this.activeLights.length = scene.lights.length;
        var index = 0;
        var light;
        for (var i = 0; i < scene.lights.length; ++i) {
            light = scene.lights[i];
            if (!(light instanceof DirectionalLight)) continue;
            if (!light.enabled) continue;
            this.activeLights[index++] = light;
        }
        for (var i = index; i < scene.lights.length; ++i) this.activeLights[i] = null;
        return this.activeLights;
    },
    onPostRender: function(context, scene, camera) {
        var lights = this.getDirectionalLights(scene);
        var gl = context.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        if (lights.length > 0 && lights[0]) context.light = lights[0];
        if (this.parent.organizer.enableDynamicBatching) {
            this.parent.renderBatched(context, this.parent.organizer.opaqueBatchList);
        } else {
            this.parent.renderBruteForce(context, this.parent.organizer.solidRenderers);
        }
        if (lights.length > 1 && lights[1]) {
            gl.depthMask(false);
            gl.depthFunc(gl.LEQUAL);
            gl.blendFunc(gl.ONE, gl.ONE);
            gl.enable(gl.BLEND);
            for (var l = 1; l < lights.length; l++) {
                if (!lights[l]) break;
                context.light = lights[l];
                if (this.parent.organizer.enableDynamicBatching) {
                    this.parent.renderBatched(context, this.parent.organizer.opaqueBatchList);
                } else {
                    this.parent.renderBruteForce(context, this.parent.organizer.solidRenderers);
                }
            }
            gl.disable(gl.BLEND);
            gl.depthMask(true);
            gl.depthFunc(gl.LESS);
        }
        if (this.parent.organizer.enableDynamicBatching) {
            this.parent.renderBatched(context, this.parent.organizer.customBatchList);
        } else {
            this.parent.renderBruteForce(context, this.parent.organizer.customRenderers);
        }
        gl.disable(gl.DEPTH_TEST);
        context.light = false;
    }
});

var CustomGeometryRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.sharedUniforms = {
            view: new UniformMat4(mat4.create()),
            viewInverse: new UniformMat4(mat4.create()),
            projection: new UniformMat4(mat4.create())
        };
        this.rendererUniforms = {
            model: new UniformMat4(null),
            modelview: new UniformMat4(null),
            receiveShadows: new UniformInt(1)
        };
        this.samplerAccum = new SamplerAccumulator();
    },
    onPostRender: function(context, scene, camera) {
        var gl = context.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        if (this.parent.organizer.enableDynamicBatching) {
            this.renderBatched(context, this.parent.organizer.customBatchList);
        } else {
            this.renderBruteForce(context, this.parent.organizer.customRenderers);
        }
        gl.disable(gl.DEPTH_TEST);
    },
    renderBatched: function(context, batches) {
        var usedShader = false;
        var material, batch, shader, renderer;
        for (var i = 0, l = batches.length; i < l; ++i) {
            batch = batches[i];
            if (batch.get(0)) {
                material = batch.get(0).material;
                shader = material.shader;
                if (shader != usedShader) {
                    shader.use();
                    usedShader = shader;
                    shader.bindUniforms(this.parent.sharedUniforms);
                }
                this.samplerAccum.add(context.shadow.shadow0);
                for (var j = 0, msl = material.samplers.length; j < msl; ++j) {
                    this.samplerAccum.add(material.samplers[j]);
                }
                if (this.samplerAccum.length === 0) {
                    this.samplerAccum.add(this.parent.diffuseFallback);
                }
                shader.bindSamplers(this.samplerAccum.samplers);
                shader.bindUniforms(material.uniforms);
                for (var j = 0, bl = batch.length; j < bl; ++j) {
                    renderer = batch.get(j);
                    context.modelview.push();
                    context.modelview.multiply(renderer.matrix);
                    this.rendererUniforms.model.value = renderer.matrix;
                    this.rendererUniforms.modelview.value = context.modelview.top();
                    this.rendererUniforms.receiveShadows.value = renderer.receiveShadows;
                    shader.bindUniforms(this.rendererUniforms);
                    renderer.render(context);
                    context.modelview.pop();
                }
                shader.unbindSamplers(this.samplerAccum.samplers);
                this.samplerAccum.clear();
            }
        }
    },
    renderBruteForce: function(context, renderers) {
        for (var j = 0; j < renderers.length; ++j) {
            var renderer = renderers[j];
            if (!renderer) break;
            context.modelview.push();
            context.modelview.multiply(renderer.matrix);
            this.cachedUniforms = renderer.getDefaultUniforms(context, null);
            renderer.material.bind(this.cachedUniforms, context.shadow.shadow0);
            renderer.render(context);
            renderer.material.unbind();
            context.modelview.pop();
        }
    }
});

var TransparentGeometryRenderStage = RenderStage.extend({
    renderSorted: function(context, scene, camera) {
        var gl = context.gl;
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.depthMask(false);
        gl.depthFunc(gl.LESS);
        gl.enable(gl.DEPTH_TEST);
        this.parent.renderBruteForce(context, this.parent.organizer.transparentRenderers);
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(true);
    },
    onPostRender: function(context, scene, camera) {
        if (scene.engine.options.transparencyMode == "sorted") {
            this.renderSorted(context, scene, camera);
        } else {
            this.parent.oitStage.renderAlphaMapped(context, scene, camera);
        }
    }
});

var OITRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.diffuseFallback = null;
        this.oitClearColor = new Color(0, 0, 0, 0);
        this.transparencyTarget = false;
        this.transparencySampler = false;
        this.transparencyWeight = false;
        this.transparencyWeightSampler = false;
        this.transparencyAccum = false;
    },
    onStart: function(context, engine, camera) {
        try {
            var size = camera.target.size;
            this.transparencyTarget = new TargetTextureFloat(size, context, false);
            this.transparencyWeight = new TargetTextureFloat(size, context, false);
        } catch (e) {
            console.warn("OITRenderStage: ", e);
            this.disable();
            return;
        }
        this.transparencySampler = new Sampler("oitAccum", this.transparencyTarget.texture);
        this.transparencyWeightSampler = new Sampler("oitWeight", this.transparencyWeight.texture);
        this.diffuseFallback = new Sampler("diffuse0", engine.WhiteTexture);
        this.envFallback = new Sampler("env0", engine.WhiteTexture);
        var gl = context.gl;
        this.transparencyWeight.bind(context, true);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.transparencyTarget.depth);
        this.transparencyWeight.unbind(context);
        this.transparencyWeight.depth = this.transparencyTarget.depth;
        this.transparencyAccum = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("OITAccum")), {
            render_mode: new UniformInt(0),
            useNormalmap: new UniformInt(0),
            useReflection: new UniformInt(0)
        }, []);
        this.opaqueDepthMaterial = new Material(engine.assetsManager.addShaderSource("diffuse"), {
            useShadows: new UniformInt(0),
            ambient: new UniformColor(),
            diffuse: new UniformColor()
        }, [ this.diffuseFallback, new Sampler("shadow0", engine.WhiteTexture) ]);
        engine.assetsManager.load();
    },
    onPostRender: function(context, scene, camera) {
        this.transparencyTarget.resetViewport();
        this.transparencyWeight.resetViewport();
        if (camera.target.size[0] != this.transparencyTarget.size[0] || camera.target.size[1] != this.transparencyTarget.size[1]) {
            this.transparencyTarget.setSize(camera.target.size[0], camera.target.size[1]);
            this.transparencyWeight.setSize(camera.target.size[0], camera.target.size[1]);
            var gl = context.gl;
            this.transparencyWeight.bind(context, true);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.transparencyTarget.depth);
            this.transparencyWeight.unbind(context);
            this.transparencyWeight.depth = this.transparencyTarget.depth;
        }
        context.projection.push();
        context.projection.load(camera.projectionMatrix);
        context.modelview.push();
        context.modelview.load(camera.viewMatrix);
        this.oitClearColor.set(0, 0, 0, 0);
        this.transparencyTarget.bind(context, false, this.oitClearColor);
        context.gl.depthMask(true);
        context.gl.colorMask(false, false, false, false);
        this.renderOpaque(context, scene, camera);
        this.renderAlphaMapped(context, scene, camera);
        context.gl.colorMask(true, true, true, true);
        this.renderPass(context, scene, camera, true);
        this.transparencyTarget.unbind(context);
        this.oitClearColor.set(1, 1, 1, 1);
        this.transparencyWeight.bind(context, false, this.oitClearColor, context.gl.COLOR_BUFFER_BIT);
        this.renderPass(context, scene, camera, false);
        this.transparencyWeight.unbind(context);
        context.modelview.pop();
        context.projection.pop();
    },
    renderTransparentBatches: function(context, scene, camera, material) {
        var shader = material.shader;
        shader.use();
        if (context.light && context.light.uniforms) shader.bindUniforms(context.light.uniforms);
        var batches = this.parent.organizer.transparentBatchList;
        for (var i = 0, l = batches.length; i < l; i++) {
            var batch = batches[i];
            if (batch.length == 0) continue;
            var batchMaterial = batch.get(0).material;
            var samplers;
            if (material.samplers.length > 0) {
                samplers = material.samplers.concat(batchMaterial.samplers);
            } else {
                samplers = batchMaterial.samplers;
            }
            var hasDiffuse, hasEnv;
            for (var m = 0; m < samplers.length; ++m) {
                if (samplers[m].name == "normal0") {
                    material.uniforms.useNormalmap.value = 1;
                    continue;
                }
                if (samplers[m].name == "env0") {
                    material.uniforms.useReflection.value = 1;
                    hasEnv = true;
                    continue;
                }
                if (samplers[m].name == "diffuse0") {
                    hasDiffuse = true;
                }
            }
            if (!hasDiffuse) {
                samplers.push(this.diffuseFallback);
            }
            if (!hasEnv) {
                samplers.push(this.envFallback);
            }
            shader.bindUniforms(material.uniforms);
            shader.bindUniforms(batchMaterial.uniforms);
            shader.bindSamplers(samplers);
            var renderer;
            for (var j = 0, l2 = batch.length; j < l2; ++j) {
                renderer = batch.get(j);
                context.modelview.push();
                context.modelview.multiply(renderer.matrix);
                renderer.renderGeometry(context, shader);
                context.modelview.pop();
            }
            shader.unbindSamplers(samplers);
        }
    },
    renderAlphaMapped: function(context, scene, camera) {
        var gl = context.gl;
        gl.depthMask(true);
        gl.depthFunc(gl.LESS);
        gl.enable(gl.DEPTH_TEST);
        this.transparencyAccum.uniforms["render_mode"].value = 2;
        this.renderTransparentBatches(context, scene, camera, this.transparencyAccum);
        gl.disable(gl.DEPTH_TEST);
    },
    renderOpaque: function(context, scene, camera) {
        var gl = context.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        var shader = this.opaqueDepthMaterial.shader;
        shader.use();
        shader.bindUniforms(this.opaqueDepthMaterial.uniforms);
        shader.bindSamplers(this.opaqueDepthMaterial.samplers);
        var renderers = this.parent.organizer.solidRenderers;
        for (var i = 0; i < renderers.length; ++i) {
            if (!renderers[i]) break;
            context.modelview.push();
            context.modelview.multiply(renderers[i].matrix);
            renderers[i].renderGeometry(context, shader);
            context.modelview.pop();
        }
        shader.unbindSamplers(this.opaqueDepthMaterial.samplers);
        gl.disable(gl.DEPTH_TEST);
    },
    renderPass: function(context, scene, camera, renderColor) {
        var gl = context.gl;
        gl.colorMask(true, true, true, true);
        gl.depthFunc(gl.LESS);
        gl.enable(gl.DEPTH_TEST);
        if (scene.engine.options.transparencyMode == "blended") {
            if (renderColor) {
                gl.depthMask(false);
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ONE);
                gl.enable(gl.BLEND);
                this.transparencyAccum.uniforms["render_mode"].value = 0;
            } else {
                gl.depthMask(false);
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
                gl.enable(gl.BLEND);
                this.transparencyAccum.uniforms["render_mode"].value = 1;
            }
        }
        if (scene.engine.options.transparencyMode == "stochastic") {
            if (renderColor) {
                gl.depthMask(true);
                this.transparencyAccum.uniforms["render_mode"].value = 3;
            } else {
                gl.depthMask(false);
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
                gl.enable(gl.BLEND);
                this.transparencyAccum.uniforms["render_mode"].value = 1;
            }
        }
        this.renderTransparentBatches(context, scene, camera, this.transparencyAccum);
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(true);
    }
});

var PostProcessRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.size = false;
        this.src = false;
        this.dst = false;
        this.srcSampler = false;
        this.dstSampler = false;
        this.textureQuad = false;
        this.screenQuad = false;
        this.material = false;
        this.generator = this.getGeneratorStage();
        this.generator.parent = this;
    },
    setSize: function(width, height) {
        if (this.size === false) this.size = vec2.create();
        this.size[0] = width;
        this.size[1] = height;
    },
    getGeneratorStage: function() {
        return new MaterialRenderStage();
    },
    onStart: function(context, engine, camera) {
        if (!this.size) {
            this.size = vec2.clone(camera.target.size);
        }
        this.src = new TargetTexture(this.size, context, false, true);
        this.srcSampler = new Sampler("src", this.src.texture);
        this.dst = new TargetTexture(this.size, context, false, true);
        this.dstSampler = new Sampler("src", this.dst.texture);
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("ScreenQuad")), {}, []);
        this.material.name = "To Screen";
        this.textureQuad = new ScreenQuad(context);
        this.screenQuad = new ScreenQuad(context);
        engine.assetsManager.load();
        this.generator.start(context, engine, camera);
    },
    onPreRender: function(context, scene, camera) {
        var cameraTarget = camera.target;
        this.src.resetViewport();
        this.dst.resetViewport();
        if (cameraTarget.size[0] != this.src.size[0] || cameraTarget.size[1] != this.src.size[1]) {
            this.setSize(cameraTarget.size[0], cameraTarget.size[1]);
            this.src.setSize(cameraTarget.size[0], cameraTarget.size[1]);
            this.dst.setSize(cameraTarget.size[0], cameraTarget.size[1]);
        }
        if (this.substages.length > 0) {
            camera.target = this.src;
        }
        this.generator.render(context, scene, camera);
        camera.target = cameraTarget;
    },
    onPostRender: function(context, scene, camera) {
        if (this.substages.length == 0) return;
        if (camera.target instanceof TargetTexture) {
            camera.target.bind(context);
            this.renderEffect(context, this.material, this.srcSampler);
            camera.target.unbind(context);
        } else {
            camera.target.bind(context);
            this.renderEffect(context, this.material, this.srcSampler, true);
            camera.target.unbind(context);
        }
        this.swapBuffers();
    },
    swapBuffers: function() {
        var tmpTexture = this.src;
        var tmpSampler = this.srcSampler;
        this.src = this.dst;
        this.srcSampler = this.dstSampler;
        this.dst = tmpTexture;
        this.dstSampler = tmpSampler;
    },
    renderEffect: function(context, material, sampler, renderToScreen) {
        var gl = context.gl;
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (renderToScreen === true) this.screenQuad.render(context, material, sampler); else this.textureQuad.render(context, material, sampler);
    }
});

var ForwardRenderStage = PostProcessRenderStage.extend({
    init: function() {
        this._super();
        this.debugActive = false;
        this.debugger = null;
    },
    onPostRender: function(context, scene, camera) {
        this._super(context, scene, camera);
        if (this.debugActive) {
            if (!this.debugger) this.initDebugger(context, scene);
            var gl = context.gl;
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.CULL_FACE);
            context.modelview.push();
            for (var i = 0; i < this.debugger.quads.length; i++) {
                this.debugger.sampler.texture = this.debugger.quads[i].texture;
                this.material.bind({}, [ this.debugger.sampler ]);
                this.debugger.quads[i].quad.render(this.material.shader);
                this.material.unbind([ this.debugger.sampler ]);
            }
            this.debugger.sampler.texture = this.debugger.vsyncTextures[0];
            this.material.bind({}, [ this.debugger.sampler ]);
            this.debugger.vsyncQuad.render(this.material.shader);
            this.material.unbind([ this.debugger.sampler ]);
            this.debugger.vsyncTextures.reverse();
            context.modelview.pop();
        }
    },
    debug: function(val) {
        this.debugActive = !(val === false);
    },
    initDebugger: function(context, scene) {
        var texRed = new Texture(context);
        texRed.name = "Red";
        texRed.mipmapped = false;
        texRed.clearImage(context, [ 255, 0, 0, 255 ]);
        var texCyan = new Texture(context);
        texCyan.name = "Red";
        texCyan.mipmapped = false;
        texCyan.clearImage(context, [ 0, 255, 255, 255 ]);
        this.debugger = {
            quads: [],
            sampler: new Sampler("tex0", null),
            vsyncQuad: createQuad(.85, .85, .1, .1),
            vsyncTextures: [ texRed, texCyan ]
        };
        function createQuad(x, y, width, height) {
            var vertices = [ x, y, 0, x, y + height, 0, x + width, y + height, 0, x + width, y, 0 ];
            var quad = new TrianglesRenderBuffer(context, [ 0, 1, 2, 0, 2, 3 ]);
            quad.add("position", vertices, 3);
            quad.add("uv0", [ 0, 0, 0, 1, 1, 1, 1, 0 ], 2);
            return quad;
        }
        var size = .5;
        var x = -1;
        var y = 1 - size;
        for (var i = 0; i < scene.lights.length; i++) {
            if (!scene.lights[i].enabled) continue;
            if (!scene.lights[i].shadowCasting) continue;
            if (!scene.lights[i].shadow) continue;
            if (scene.lights[i] instanceof DirectionalLight) {
                this.debugger.quads.push({
                    quad: createQuad(x, y, size, size),
                    texture: scene.lights[i].shadow.texture
                });
                x += size;
            }
        }
        size = 2 / 4;
        x = -1;
        y = -1;
        if (this.generator.oitStage.enabled) {
            this.debugger.quads.push({
                quad: createQuad(x, y, size, size),
                texture: this.generator.oitStage.transparencyTarget.texture
            });
            this.debugger.quads.push({
                quad: createQuad(x += size, y, size, size),
                texture: this.generator.oitStage.transparencyWeight.texture
            });
        }
        if (this.generator.depthStage.enabled) {
            this.debugger.quads.push({
                quad: createQuad(x += size, y, size, size),
                texture: this.generator.depthStage.target.texture
            });
        }
    }
});

var DeferredRenderStage = PostProcessRenderStage.extend({
    init: function() {
        this._super();
        this.debugActive = false;
        this.debugger = null;
    },
    onStart: function(context, engine, camera) {
        if (!context.isWebGL2() && !context.gl.getExtension("WEBGL_draw_buffers")) throw "DeferredRenderStage: WEBGL_draw_buffers not available.";
        if (!context.isWebGL2() && !context.gl.getExtension("OES_texture_float")) throw "DeferredRenderStage: OES_texture_float not available.";
        if (!context.isWebGL2() && !context.gl.getExtension("OES_standard_derivatives")) throw "DeferredRenderStage: OES_standard_derivatives not available.";
        this._super(context, engine, camera);
    },
    getGeneratorStage: function() {
        return new DeferredShadingRenderStage();
    },
    onPreRender: function(context, scene, camera) {
        var cameraTarget = camera.target;
        this.src.resetViewport();
        this.dst.resetViewport();
        if (this.generator.gbufferStage.damaged) {
            var size = vec2.scale(vec2.create(), this.generator.gbufferStage.size, this.generator.gbufferStage.quality);
            this.src.setSize(size[0], size[1]);
            this.dst.setSize(size[0], size[1]);
        }
        this.setSize(cameraTarget.size[0], cameraTarget.size[1]);
        if (this.substages.length > 0) {
            camera.target = this.src;
        }
        this.generator.render(context, scene, camera);
        camera.target = cameraTarget;
    },
    onPostRender: function(context, scene, camera) {
        this._super(context, scene, camera);
        if (this.debugActive) {
            if (!this.debugger) this.initDebugger(context, scene);
            var gl = context.gl;
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.CULL_FACE);
            context.modelview.push();
            for (var i = 0; i < this.debugger.quads.length; i++) {
                this.debugger.sampler.texture = this.debugger.quads[i].texture;
                this.material.bind({}, [ this.debugger.sampler ]);
                this.debugger.quads[i].quad.render(this.material.shader);
                this.material.unbind([ this.debugger.sampler ]);
            }
            context.modelview.pop();
        }
    },
    debug: function(val) {
        this.debugActive = !(val === false);
    },
    initDebugger: function(context, scene) {
        this.debugger = {
            quads: [],
            sampler: new Sampler("tex0", null)
        };
        function createQuad(x, y, width, height) {
            var vertices = [ x, y, 0, x, y + height, 0, x + width, y + height, 0, x + width, y, 0 ];
            var quad = new TrianglesRenderBuffer(context, [ 0, 1, 2, 0, 2, 3 ]);
            quad.add("position", vertices, 3);
            quad.add("uv0", [ 0, 0, 0, 1, 1, 1, 1, 0 ], 2);
            return quad;
        }
        var buffer = this.generator.gbufferStage.buffer;
        var size = 2 / 7;
        var x = -1;
        var y = -1;
        this.debugger.quads.push({
            quad: createQuad(x, y, size, size),
            texture: buffer.targets[0]
        });
        this.debugger.quads.push({
            quad: createQuad(x += size, y, size, size),
            texture: buffer.targets[1]
        });
        this.debugger.quads.push({
            quad: createQuad(x += size, y, size, size),
            texture: buffer.targets[2]
        });
        this.debugger.quads.push({
            quad: createQuad(x += size, y, size, size),
            texture: buffer.targets[3]
        });
        this.debugger.quads.push({
            quad: createQuad(x += size, y, size, size),
            texture: this.generator.softShadowsStage.target.texture
        });
        this.debugger.quads.push({
            quad: createQuad(x += size, y, size, size),
            texture: this.generator.oitStage.transparencyTarget.texture
        });
        this.debugger.quads.push({
            quad: createQuad(x += size, y, size, size),
            texture: this.generator.oitStage.transparencyWeight.texture
        });
        size = .5;
        x = -1;
        y = 1 - size;
        for (var i = 0; i < scene.lights.length; i++) {
            if (!scene.lights[i].enabled) continue;
            if (!scene.lights[i].shadowCasting) continue;
            if (!scene.lights[i].shadow) continue;
            if (scene.lights[i] instanceof DirectionalLight) {
                this.debugger.quads.push({
                    quad: createQuad(x, y, size, size),
                    texture: scene.lights[i].shadow.texture
                });
                x += size;
            }
        }
    }
});

var DeferredShadingRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.organizer = new RendererOrganizer();
        this.diffuseFallback = null;
        this.size = vec2.create();
        this.bindCameraTarget = {
            started: true,
            start: function() {},
            render: function(context, scene, camera) {
                camera.target.bind(context, true);
            }
        };
        this.unbindCameraTarget = {
            started: true,
            start: function() {},
            render: function(context, scene, camera) {
                camera.target.unbind(context);
            }
        };
        this.shadowStage = this.addStage(new DeferredShadowRenderStage());
        this.oitStage = this.addStage(new OITRenderStage());
        this.gbufferStage = this.addStage(new GBufferRenderStage());
        this.softShadowsStage = this.addStage(new SoftShadowsRenderStage()).disable();
        this.addStage(this.bindCameraTarget);
        this.lightsStage = this.addStage(new LightsRenderStage());
        this.customStage = this.addStage(new CustomGeometryRenderStage());
        this.addStage(this.unbindCameraTarget);
        this.sharedUniforms = {
            view: new UniformMat4(mat4.create()),
            viewInverse: new UniformMat4(mat4.create()),
            projection: new UniformMat4(mat4.create())
        };
        this.rendererUniforms = {
            model: new UniformMat4(null),
            modelview: new UniformMat4(null),
            receiveShadows: new UniformInt(1)
        };
    },
    onStart: function(context, engine, camera) {
        this.diffuseFallback = new Sampler("diffuse0", engine.WhiteTexture);
        vec2.copy(this.size, this.parent.size);
        if (engine.options.softShadows) this.softShadowsStage.enable();
    },
    prepareShared: function(context) {
        mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
        mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
        mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);
        vec2.copy(this.size, this.parent.size);
    },
    onPreRender: function(context, scene, camera) {
        this.prepareShared(context);
        var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
        this.organizer.sort(scene.engine, renderers);
    },
    onPostRender: function(context, scene, camera) {}
});

var DeferredShadowRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.material = null;
        this.directional = [];
        this.clearColor = new Color(0, 0, 0, 0);
        this.lightPosition = vec3.create();
        this.lightLookTarget = vec3.create();
        this.lightUpVector = vec3.fromValues(0, 1, 0);
        this.aabbVertices = [ vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create() ];
        this.sceneAABB = new BoundingBox();
        this.lightFrustum = new BoundingBox();
    },
    onStart: function(context, engine, camera) {
        if (!context.isWebGL2()) this.extStandardDerivatives = context.gl.getExtension("OES_standard_derivatives");
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("deferred_shadow_directional")), {}, []);
        engine.assetsManager.load();
    },
    collectLights: function(scene) {
        this.directional.length = 0;
        for (var i = 0; i < scene.lights.length; ++i) {
            if (!scene.lights[i].enabled) continue;
            if (!scene.lights[i].shadowCasting) continue;
            if (!scene.lights[i].shadow) continue;
            if (scene.engine.options.shadowManualUpdate && !scene.lights[i].damaged) continue;
            if (scene.lights[i] instanceof DirectionalLight) this.directional.push(scene.lights[i]);
        }
    },
    computeSceneBounds: function() {
        if (this.sceneAABB.center === false) this.sceneAABB.center = vec3.create();
        vec3.set(this.sceneAABB.center, 0, 0, 0);
        vec3.set(this.sceneAABB.extents, 0, 0, 0);
        this.sceneAABB.recalculate();
        var opaque = this.parent.organizer.solidRenderers;
        var transparent = this.parent.organizer.transparentRenderers;
        for (var i = 0; i < opaque.length; ++i) {
            if (!opaque[i]) break;
            if (!opaque[i].castShadows) continue;
            this.sceneAABB.encapsulateBox(opaque[i].globalBoundingBox);
        }
        for (var i = 0; i < transparent.length; ++i) {
            if (!transparent[i]) break;
            if (!transparent[i].castShadows) continue;
            this.sceneAABB.encapsulateBox(transparent[i].globalBoundingBox);
        }
        return this.sceneAABB;
    },
    renderDirectionalLightDepth: function(context, light) {
        vec3.copy(this.lightPosition, this.sceneAABB.center);
        vec3.sub(this.lightLookTarget, this.lightPosition, light.direction);
        mat4.lookAt(light.lightView, this.lightPosition, this.lightLookTarget, this.lightUpVector);
        this.sceneAABB.getVertices(this.aabbVertices);
        for (var i = 0; i < 8; ++i) {
            vec3.transformMat4(this.aabbVertices[i], this.aabbVertices[i], light.lightView);
        }
        this.lightFrustum.set(this.aabbVertices[0], [ 0, 0, 0 ]);
        for (var i = 1; i < 8; ++i) {
            this.lightFrustum.encapsulatePoint(this.aabbVertices[i]);
        }
        mat4.ortho(light.lightProj, this.lightFrustum.min[0], this.lightFrustum.max[0], this.lightFrustum.min[1], this.lightFrustum.max[1], this.lightFrustum.min[2], this.lightFrustum.max[2]);
        context.projection.push();
        context.projection.load(light.lightProj);
        context.modelview.push();
        context.modelview.load(light.lightView);
        light.shadow.bind(context, false, this.clearColor);
        var gl = context.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        this.material.bind();
        var renderers = this.parent.organizer.solidRenderers;
        for (var i = 0; i < renderers.length; ++i) {
            if (!renderers[i]) break;
            if (!(renderers[i].layer & light.shadowMask)) continue;
            if (!renderers[i].castShadows) continue;
            var shader = this.material.shader;
            context.modelview.push();
            context.modelview.multiply(renderers[i].matrix);
            shader.bindUniforms(renderers[i].material.uniforms);
            renderers[i].renderGeometry(context, shader);
            context.modelview.pop();
        }
        this.material.unbind();
        this.renderAlphaMapped(context, light);
        gl.disable(gl.DEPTH_TEST);
        light.shadow.unbind(context);
        light.updateSamplers(context);
        context.modelview.pop();
        context.projection.pop();
        light.undamage();
    },
    renderAlphaMapped: function(context, light) {
        var batches = this.parent.organizer.transparentBatchList;
        var shader = this.material.shader;
        var fallbackSamplers = [ this.parent.diffuseFallback ];
        shader.use();
        shader.bindUniforms(this.material.uniforms);
        var samplers;
        for (var i = 0; i < batches.length; ++i) {
            var batch = batches[i];
            if (batch.length == 0) continue;
            var batchMaterial = batch.get(0).material;
            if (batchMaterial.samplers.length > 0) samplers = batchMaterial.samplers; else samplers = fallbackSamplers;
            shader.bindUniforms(batchMaterial.uniforms);
            shader.bindSamplers(samplers);
            var renderer;
            for (var j = 0; j < batch.length; ++j) {
                var renderer = batch.get(j);
                if (!(renderer.layer & light.shadowMask)) continue;
                if (!renderer.castShadows) continue;
                context.modelview.push();
                context.modelview.multiply(renderer.matrix);
                renderer.renderGeometry(context, shader);
                context.modelview.pop();
            }
            shader.unbindSamplers(samplers);
        }
    },
    onPreRender: function(context, scene, camera) {
        this.collectLights(scene);
        this.computeSceneBounds();
        for (var i = 0; i < this.directional.length; ++i) {
            this.renderDirectionalLightDepth(context, this.directional[i]);
        }
    },
    onPostRender: function(context, scene, camera) {}
});

var GBufferRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.buffer = null;
        this.clearColor = new Color(0, 0, 0, 0);
        this.size = vec2.create();
        this.quality = 1;
        this.damaged = true;
        this.perBatchUniforms = {
            useNormalmap: new UniformInt(0),
            useReflection: new UniformInt(0)
        };
    },
    setQuality: function(quality) {
        quality = parseFloat(quality);
        if (quality > 0) {
            this.quality = quality;
            this.damaged = true;
        }
    },
    onStart: function(context, engine, camera) {
        vec2.copy(this.size, this.parent.size);
        var size = vec2.scale(vec2.create(), this.size, this.quality);
        this.buffer = new TargetTextureMulti(context, size, {
            numTargets: 4,
            stencil: true
        });
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("deferred_gbuffer")), {
            zNear: new UniformFloat(.1),
            zFar: new UniformFloat(1e3)
        }, []);
        this.normalmapFallback = new Sampler("normal0");
        this.maskFallback = new Sampler("mask");
        this.envFallback = new Sampler("env0");
        this.envFallback.createFallbackCubeTexture(context);
        this.envFallback.texture = fallbackCubeTexture;
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        this.material.uniforms.zNear.value = camera.near;
        this.material.uniforms.zFar.value = camera.far;
        if (this.damaged) {
            var size = vec2.scale(vec2.create(), this.size, this.quality);
            this.buffer.setSize(size[0], size[1]);
            this.damaged = false;
        }
    },
    onPostRender: function(context, scene, camera) {
        var gl = context.gl;
        this.buffer.bind(context, false, this.clearColor);
        gl.depthMask(true);
        gl.colorMask(true, true, true, true);
        gl.depthFunc(gl.LESS);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilMask(255);
        gl.stencilFunc(gl.ALWAYS, 1, 255);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        this.renderBatches(context, scene, camera, this.parent.organizer.opaqueBatchList, this.material);
        this.renderBatches(context, scene, camera, this.parent.organizer.transparentBatchList, this.material);
        gl.stencilMask(255);
        gl.disable(gl.STENCIL_TEST);
        gl.disable(gl.DEPTH_TEST);
        this.buffer.unbind(context);
    },
    renderBatches: function(context, scene, camera, batches, material) {
        var shader = material.shader;
        shader.use();
        shader.bindUniforms(material.uniforms);
        for (var i = 0; i < batches.length; i++) {
            var batch = batches[i];
            if (batch.length == 0) continue;
            var batchMaterial = batch.get(0).material;
            this.perBatchUniforms.useNormalmap.value = 0;
            this.perBatchUniforms.useReflection.value = 0;
            var hasMask = false;
            for (var m = 0; m < batchMaterial.samplers.length; m++) {
                if (batchMaterial.samplers[m].name == "normal0") {
                    this.perBatchUniforms.useNormalmap.value = 1;
                    continue;
                }
                if (batchMaterial.samplers[m].name == "env0") {
                    this.perBatchUniforms.useReflection.value = 1;
                    continue;
                }
                if (batchMaterial.samplers[m].name == "mask") {
                    hasMask = true;
                    continue;
                }
            }
            var samplers;
            if (material.samplers.length > 0) {
                samplers = material.samplers.concat(batchMaterial.samplers);
            } else {
                samplers = batchMaterial.samplers.slice();
            }
            if (batchMaterial.samplers.length == 0) {
                samplers.push(this.parent.diffuseFallback);
            }
            if (this.perBatchUniforms.useNormalmap.value == 0) {
                samplers.push(this.normalmapFallback);
            }
            if (this.perBatchUniforms.useReflection.value == 0) {
                samplers.push(this.envFallback);
                samplers.push(this.maskFallback);
            } else if (this.perBatchUniforms.useReflection.value == 1 && !hasMask) {
                samplers.push(this.maskFallback);
            }
            shader.bindUniforms(this.perBatchUniforms);
            shader.bindUniforms(batchMaterial.uniforms);
            shader.bindSamplers(samplers);
            var renderer;
            for (var j = 0; j < batch.length; ++j) {
                renderer = batch.get(j);
                context.modelview.push();
                context.modelview.multiply(renderer.matrix);
                renderer.renderGeometry(context, shader);
                context.modelview.pop();
            }
            shader.unbindSamplers(samplers);
        }
    }
});

var SoftShadowsRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.quality = 1;
        this.damaged = false;
        this.sharedUniforms = {
            cameraPosition: new UniformVec3(vec3.create()),
            shadowOnly: new UniformInt(1),
            useSoftShadows: new UniformInt(0)
        };
        this.sharedSamplers = [];
        this.clearColor = new Color(0, 0, 0, 0);
        this.target = null;
    },
    setQuality: function(quality) {
        quality = parseFloat(quality);
        if (quality > 0) {
            this.quality = quality;
            this.damaged = true;
        }
    },
    getShadowCastingLights: function(scene) {
        var directional = [];
        for (var i = 0; i < scene.lights.length; i++) {
            var light = scene.lights[i];
            if (!light.enabled) continue;
            if (!light.shadowCasting) continue;
            if (!light.geometry) continue;
            if (light instanceof DirectionalLight) {
                directional.push(light);
            }
        }
        return directional;
    },
    onStart: function(context, engine, camera) {
        var gb = this.parent.gbufferStage.buffer;
        this.sharedSamplers.push(new Sampler("gb0", gb.targets[0]));
        this.sharedSamplers.push(new Sampler("gb1", gb.targets[1]));
        this.sharedSamplers.push(new Sampler("gb2", gb.targets[2]));
        this.sharedSamplers.push(new Sampler("gb3", gb.targets[3]));
        this.target = new TargetTexture(this.parent.size, context, false);
        this.blurTarget = new TargetTexture(this.parent.size, context, false);
        this.blurSampler = new Sampler("src", this.target.texture);
        this.blurHorizontal = new Material(engine.assetsManager.addShader(engine.assetsManager.shadersManager.bundle("shadow_blurh.vert"), engine.assetsManager.shadersManager.bundle("shadow_blur.frag")), {}, []);
        this.blurVertical = new Material(engine.assetsManager.addShader(engine.assetsManager.shadersManager.bundle("shadow_blurv.vert"), engine.assetsManager.shadersManager.bundle("shadow_blur.frag")), {}, []);
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        if (this.damaged) {
            var size = vec2.scale(vec2.create(), this.parent.size, this.quality);
            this.target.setSize(size[0], size[1]);
            this.blurTarget.setSize(size[0], size[1]);
            this.damaged = false;
        }
    },
    onPostRender: function(context, scene, camera) {
        var lights = this.getShadowCastingLights(scene);
        if (lights.length == 0) return;
        camera.getPosition(this.sharedUniforms.cameraPosition.value);
        var gl = context.gl;
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(false);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.enable(gl.BLEND);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        this.target.bind(context, false, this.clearColor);
        for (var i = 0; i < lights.length; i++) {
            this.renderLight(context, lights[i]);
        }
        this.target.unbind(context);
        gl.disable(gl.BLEND);
        this.blurSampler.texture = this.target.texture;
        this.blurTarget.bind(context, false, this.clearColor);
        this.parent.parent.renderEffect(context, this.blurHorizontal, this.blurSampler);
        this.blurTarget.unbind(context);
        this.blurSampler.texture = this.blurTarget.texture;
        this.target.bind(context, false, this.clearColor);
        this.parent.parent.renderEffect(context, this.blurVertical, this.blurSampler);
        this.target.unbind(context);
    },
    renderLight: function(context, light) {
        var material = light.material;
        var shader = material.shader;
        shader.use();
        shader.bindUniforms(this.sharedUniforms);
        shader.bindUniforms(material.uniforms);
        var samplers;
        if (material.samplers.length > 0) {
            samplers = material.samplers.concat(this.sharedSamplers);
        } else {
            samplers = this.sharedSamplers;
        }
        shader.bindSamplers(samplers);
        var renderers = light.getGeometryRenderers();
        for (var j = 0; j < renderers.length; j++) {
            context.modelview.push();
            if (light.isPositional()) {
                context.modelview.multiply(renderers[j].matrix);
            }
            renderers[j].renderGeometry(context, shader);
            context.modelview.pop();
        }
        shader.unbindSamplers(samplers);
    }
});

var LightsRenderStage = RenderStage.extend({
    init: function() {
        this._super();
        this.sharedUniforms = {
            cameraPosition: new UniformVec3(vec3.create()),
            shadowOnly: new UniformInt(0),
            useSoftShadows: new UniformInt(1)
        };
        this.sharedSamplers = [];
        this.skyboxRenderStage = new SkyboxRenderStage();
    },
    getLightsWithGeometry: function(scene) {
        var ambient = [];
        var directional = [];
        var other = [];
        for (var i = 0; i < scene.lights.length; i++) {
            var light = scene.lights[i];
            if (!light.enabled) continue;
            if (!light.geometry) continue;
            if (light instanceof AmbientLight) {
                ambient.push(light);
                continue;
            }
            if (light instanceof DirectionalLight) {
                directional.push(light);
                continue;
            }
            other.push(light);
        }
        return ambient.concat(directional).concat(other);
    },
    onStart: function(context, engine, camera) {
        var gb = this.parent.gbufferStage.buffer;
        this.sharedSamplers.push(new Sampler("gb0", gb.targets[0]));
        this.sharedSamplers.push(new Sampler("gb1", gb.targets[1]));
        this.sharedSamplers.push(new Sampler("gb2", gb.targets[2]));
        this.sharedSamplers.push(new Sampler("gb3", gb.targets[3]));
        this.backgroundMaterial = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("deferred_background")), {
            color: new UniformColor(new Color(1, 1, 1, 1))
        }, []);
        engine.assetsManager.load();
        this.skyboxRenderStage.start(context, engine, camera);
    },
    onPreRender: function(context, scene, camera) {
        this.sharedUniforms.useSoftShadows.value = this.parent.softShadowsStage.enabled ? 1 : 0;
        camera.getPosition(this.sharedUniforms.cameraPosition.value);
    },
    onPostRender: function(context, scene, camera) {
        var lights = this.getLightsWithGeometry(scene);
        var gl = context.gl;
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbufferStage.buffer.depth);
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(false);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilMask(0);
        gl.stencilFunc(gl.NOTEQUAL, 1, 255);
        camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
        this.parent.parent.renderEffect(context, this.backgroundMaterial, this.sharedSamplers[1]);
        this.skyboxRenderStage.render(context, scene, camera);
        gl.stencilFunc(gl.EQUAL, 1, 255);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.enable(gl.BLEND);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        for (var i = 0; i < lights.length; i++) {
            this.renderLight(context, lights[i]);
        }
        gl.disable(gl.BLEND);
        gl.stencilMask(255);
        gl.disable(gl.STENCIL_TEST);
    },
    renderLight: function(context, light) {
        var shadowSampler;
        if (light.shadowCasting) {
            if (light instanceof DirectionalLight && this.sharedUniforms.useSoftShadows.value == 1) {
                shadowSampler = light.shadowSampler.texture;
                light.shadowSampler.texture = this.parent.softShadowsStage.target.texture;
            }
        }
        var shader = light.material.shader;
        shader.use();
        shader.bindUniforms(this.sharedUniforms);
        shader.bindUniforms(light.material.uniforms);
        var samplers;
        if (light.material.samplers.length > 0) {
            samplers = light.material.samplers.concat(this.sharedSamplers);
        } else {
            samplers = this.sharedSamplers;
        }
        shader.bindSamplers(samplers);
        var renderers = light.getGeometryRenderers();
        for (var j = 0; j < renderers.length; j++) {
            context.modelview.push();
            if (light.isPositional()) {
                context.modelview.multiply(renderers[j].matrix);
            }
            renderers[j].renderGeometry(context, shader);
            context.modelview.pop();
        }
        shader.unbindSamplers(samplers);
        if (light.shadowCasting) {
            if (light instanceof DirectionalLight && this.sharedUniforms.useSoftShadows.value == 1) {
                light.shadowSampler.texture = shadowSampler;
            }
        }
    }
});

var PostProcess = RenderStage.extend({
    init: function() {
        this._super();
        this.material = false;
    },
    onPostRender: function(context, scene, camera) {
        if (!(this.parent instanceof PostProcessRenderStage)) throw "PostProcess can only be the sub-stage of a PostProcessRenderStage";
        if (!this.material) throw "PostProcess must have a material defined";
        this.parent.dst.bind(context);
        this.parent.renderEffect(context, this.material, this.parent.srcSampler);
        this.parent.dst.unbind(context);
        this.parent.swapBuffers();
    }
});

var AntiAliasPostProcess = PostProcess.extend({
    init: function() {
        this._super();
    },
    onStart: function(context, engine) {
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("postprocess_fxaa")), {
            ViewportSize: new UniformVec2(vec2.clone(this.parent.src.size)),
            reduce_min: new UniformFloat(1 / 16),
            reduce_mul: new UniformFloat(1 / 8),
            span_max: new UniformFloat(8)
        }, []);
        this.material.name = "AntiAlias";
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        this._super(context, scene, camera);
        vec2.copy(this.material.uniforms.ViewportSize.value, this.parent.src.size);
    }
});

var BlurPostProcess = PostProcess.extend({
    init: function(blurSize) {
        this._super();
        this.blurSize = vec2.fromValues(1, 1);
        if (blurSize) vec2.copy(this.blurSize, blurSize);
    },
    onStart: function(context, engine) {
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("postprocess_blur")), {
            ViewportSize: new UniformVec2(vec2.clone(this.parent.size)),
            BlurSize: new UniformVec2(this.blurSize)
        }, []);
        this.material.name = "Blur";
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        this._super(context, scene, camera);
        vec2.set(this.material.uniforms.ViewportSize.value, this.parent.size[0], this.parent.size[1]);
    }
});

var OITPostProcess = PostProcess.extend({
    init: function() {
        this._super();
    },
    onStart: function(context, engine) {
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("OITRender")), {
            ViewportSize: new UniformVec2(vec2.clone(this.parent.src.size)),
            render_mode: new UniformInt(0)
        }, [ this.parent.generator.oitStage.transparencySampler, this.parent.generator.oitStage.transparencyWeightSampler ]);
        this.material.name = "OIT";
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        this._super(context, scene, camera);
        vec2.copy(this.material.uniforms.ViewportSize.value, this.parent.src.size);
        switch (scene.engine.options.transparencyMode) {
          case "blended":
            this.material.uniforms["render_mode"].value = 0;
            break;

          case "stochastic":
            this.material.uniforms["render_mode"].value = 1;
            break;
        }
    }
});

var SSAOPostProcess = PostProcess.extend({
    init: function(size) {
        this._super();
        this.ssaoOnly = false;
    },
    onStart: function(context, engine) {
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("postprocess_ssao")), {
            ViewportSize: new UniformVec2(vec2.clone(this.parent.src.size)),
            ssaoOnly: new UniformInt(this.ssaoOnly === true ? 1 : 0),
            gdisplace: new UniformFloat(engine.options.ssaoGDisplace ? engine.options.ssaoGDisplace : .3),
            radius: new UniformFloat(engine.options.ssaoRadius ? engine.options.ssaoRadius : 2),
            luminanceInfluence: new UniformFloat(engine.options.ssaoLuminanceInfluence ? engine.options.ssaoLuminanceInfluence : .7),
            brightness: new UniformFloat(engine.options.ssaoBrightness ? engine.options.ssaoBrightness : 1)
        }, [ this.parent.generator.depthStage.sampler ]);
        this.material.name = "SSAO";
        if (engine.options.transparencyMode == "blended") {
            this.material.samplers.push(this.parent.generator.oitStage.transparencyWeightSampler);
        } else {
            this.material.samplers.push(new Sampler("oitWeight", engine.WhiteTexture));
        }
        engine.assetsManager.load();
    },
    onPreRender: function(context, scene, camera) {
        this._super(context, scene, camera);
        vec2.set(this.material.uniforms.ViewportSize.value, this.parent.src.size[0], this.parent.src.size[1]);
        this.material.uniforms.ssaoOnly.value = this.ssaoOnly === true ? 1 : 0;
    }
});

var RenderTarget = FrakClass.extend({
    init: function(size) {
        this.viewport = {
            position: vec2.create(),
            size: vec2.create()
        };
        this.size = vec2.create();
        if (size) {
            vec2.copy(this.size, size);
            vec2.copy(this.viewport.size, size);
        }
    },
    type: function() {
        return "RenderTarget";
    },
    bind: function(context) {
        context.gl.viewport(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
        context.gl.scissor(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
        context.gl.enable(context.gl.SCISSOR_TEST);
    },
    unbind: function(context) {
        context.gl.disable(context.gl.SCISSOR_TEST);
    },
    setSize: function(width, height) {
        this.size[0] = width;
        this.size[1] = height;
    },
    getSize: function() {
        return this.size;
    },
    setViewport: function(x, y, width, height) {
        vec2.set(this.viewport.position, x, y);
        vec2.set(this.viewport.size, width, height);
    },
    inheritViewport: function(other) {
        vec2.copy(this.viewport.position, other.viewport.position);
        vec2.copy(this.viewport.size, other.viewport.size);
    },
    resetViewport: function() {
        this.setViewport(0, 0, this.size[0], this.size[1]);
    }
});

var TargetScreen = RenderTarget.extend({
    init: function(size) {
        this._super(size);
        this.position = vec2.create();
    },
    type: function() {
        return "TargetScreen";
    },
    setPosition: function(x, y) {
        this.position[0] = x;
        this.position[1] = y;
    },
    getPosition: function() {
        return this.position;
    },
    resetViewport: function() {
        this.setViewport(this.position[0], this.position[1], this.size[0], this.size[1]);
    }
});

var TargetTexture = RenderTarget.extend({
    init: function(sizeOrTexture, context, useDepthTexture, useStencilBuffer) {
        var size = sizeOrTexture;
        if (sizeOrTexture instanceof Texture) {
            size = sizeOrTexture.size;
            this.texture = sizeOrTexture;
        }
        this.useDepthTexture = useDepthTexture === true;
        this.useStencilBuffer = useStencilBuffer === true;
        this.rebuild = false;
        this._super(size);
        if (this.useDepthTexture && !context.isWebGL2()) {
            var depthTextureExt = context.gl.getExtension("WEBGL_depth_texture") || context.gl.getExtension("WEBKIT_WEBGL_depth_texture") || context.gl.UNSIGNED_INT_24_8;
            if (!depthTextureExt) throw "TargetTexture: Depth texture reqeusted, but not available.";
        }
        this.build(context);
    },
    type: function() {
        return "TargetTexture";
    },
    setSize: function(width, height) {
        this._super(width, height);
        this.rebuild = true;
    },
    getDataType: function(context) {
        return context.gl.UNSIGNED_BYTE;
    },
    getInternalFormat: function(context) {
        return context.gl.RGBA;
    },
    getTextureFilter: function(context) {
        return context.gl.NEAREST;
    },
    build: function(context) {
        var gl = context.gl;
        this.frameBuffer = gl.createFramebuffer();
        if (!this.texture) {
            this.texture = new Texture(context);
            gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
            gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        if (this.useDepthTexture) {
            this.depth = new Texture(context);
            gl.bindTexture(gl.TEXTURE_2D, this.depth.glTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.size[0], this.size[1], 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
        } else {
            this.depth = gl.createRenderbuffer();
            if (this.useStencilBuffer) {
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            } else {
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            }
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.glTexture, 0);
        if (this.useDepthTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
        } else {
            if (this.useStencilBuffer) {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.depth);
            } else {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
            }
        }
        this.checkStatus(context);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.texture.loaded = true;
    },
    checkStatus: function(context) {
        var gl = context.gl;
        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        switch (status) {
          case gl.FRAMEBUFFER_COMPLETE:
            return true;

          case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            throw "TargetTexture: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT";

          case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            throw "TargetTexture: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";

          case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            throw "TargetTexture: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS";

          case gl.FRAMEBUFFER_UNSUPPORTED:
            throw "TargetTexture: Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED";

          default:
            throw "TargetTexture: Incomplete framebuffer: " + status;
        }
    },
    bind: function(context, doNotClear, clearColor, clearFlags) {
        var gl = context.gl;
        if (this.rebuild) {
            gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
            gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            if (this.useDepthTexture) {
                gl.bindTexture(gl.TEXTURE_2D, this.depth.glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.size[0], this.size[1], 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
            } else {
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
                if (this.useStencilBuffer) gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]); else gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            }
            this.rebuild = false;
        }
        doNotClear = doNotClear === true;
        clearColor = clearColor instanceof Color ? clearColor : false;
        if (!clearColor) {
            if (context.camera) clearColor = context.camera.backgroundColor; else doNotClear = true;
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this._super(context);
        if (!doNotClear) {
            gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
            gl.clearDepth(1);
            var flags = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
            if (this.useStencilBuffer) {
                gl.clearStencil(0);
                flags |= gl.STENCIL_BUFFER_BIT;
            }
            if (clearFlags) flags = clearFlags;
            gl.clear(flags);
        }
    },
    unbind: function(context) {
        this._super(context);
        context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, null);
    }
});

var TargetTextureFloat = TargetTexture.extend({
    init: function(sizeOrTexture, context, useDepthTexture, useNearestFiltering) {
        if (context.isWebGL2()) {
            this.extColorFloat = context.gl.getExtension("EXT_color_buffer_float");
            if (!this.extColorFloat) throw "TargetTextureFloat: Floating point COLOR textures are not supported on this system.";
        } else {
            this.extHalfFloat = context.gl.getExtension("OES_texture_half_float");
            this.extFloat = context.gl.getExtension("OES_texture_float");
            if (!this.extFloat && !this.extHalfFloat) throw "TargetTextureFloat: Floating point textures are not supported on this system.";
            this.linearFloat = null;
            this.linearHalf = null;
            if (!useNearestFiltering) {
                this.linearFloat = context.gl.getExtension("OES_texture_float_linear");
                this.linearHalf = context.gl.getExtension("OES_texture_half_float_linear");
            }
        }
        this._super(sizeOrTexture, context, useDepthTexture);
    },
    type: function() {
        return "TargetTextureFloat";
    },
    getDataType: function(context) {
        if (context.isWebGL2()) {
            return context.gl.FLOAT;
        }
        if (this.extHalfFloat) {
            if (!this.extFloat) return this.extHalfFloat.HALF_FLOAT_OES;
            if (navigator) {
                switch (navigator.platform) {
                  case "iPad":
                  case "iPod":
                  case "iPhone":
                    return this.extHalfFloat.HALF_FLOAT_OES;
                }
            }
        }
        return context.gl.FLOAT;
    },
    getInternalFormat: function(context) {
        if (context.isWebGL2()) return context.gl.RGBA16F;
        return context.gl.RGBA;
    },
    getTextureFilter: function(context) {
        if (this.linearFloat && this.linearHalf) return context.gl.LINEAR;
        return context.gl.NEAREST;
    },
    build: function(context) {
        var gl = context.gl;
        this.frameBuffer = gl.createFramebuffer();
        if (!this.texture) {
            this.texture = new Texture(context);
            gl.bindTexture(gl.TEXTURE_2D, this.texture.glTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
            gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        if (this.useDepthTexture) {
            this.depth = new Texture(context);
            gl.bindTexture(gl.TEXTURE_2D, this.depth.glTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.size[0], this.size[1], 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
        } else {
            this.depth = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.glTexture, 0);
        if (this.useDepthTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
        } else {
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
        }
        this.checkStatus(context);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.texture.loaded = true;
    }
});

var TargetTextureMulti = RenderTarget.extend({
    init: function(context, size, options) {
        this.options = FRAK.extend({
            dataType: "float",
            filtering: "linear",
            depth: false,
            stencil: false,
            numTargets: 2
        }, options);
        this.extDrawBuffers = null;
        this.extTextureFloat = null;
        this.extTextureHalfFloat = null;
        this.extTextureFloatLinear = null;
        this.extTextureHalfFloatLinear = null;
        if (this.options.numTargets < 1) throw "TargetTextureMulti: Must have at least one color target.";
        if (!context.isWebGL2()) {
            this.extDrawBuffers = context.gl.getExtension("WEBGL_draw_buffers");
            if (!this.extDrawBuffers) throw "TargetTextureMulti: WEBGL_draw_buffers not available.";
        }
        if (this.options.depth && !context.isWebGL2()) {
            var ext = context.gl.getExtension("WEBGL_depth_texture") || context.gl.depthTextureExt;
            if (!ext) ext = context.gl.getExtension("WEBKIT_WEBGL_depth_texture");
            if (!ext) throw "TargetTextureMulti: Depth texture reqeusted, but not available.";
        }
        if (context.isWebGL2()) {
            this.maxColorAttachments = context.gl.getParameter(context.gl.MAX_COLOR_ATTACHMENTS);
            this.maxDrawBuffers = context.gl.getParameter(context.gl.MAX_DRAW_BUFFERS);
        } else {
            this.maxColorAttachments = context.gl.getParameter(this.extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL);
            this.maxDrawBuffers = context.gl.getParameter(this.extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL);
        }
        if (this.options.numTargets > this.maxDrawBuffers) {
            throw "TargetTextureMulti: Too many targets requested. System only supports {0} draw buffers.".format(this.maxDrawBuffers);
        }
        if (this.options.dataType == "float" && !context.isWebGL2()) {
            this.extTextureFloat = context.gl.getExtension("OES_texture_float");
            this.extTextureHalfFloat = context.gl.getExtension("OES_texture_half_float");
            if (!this.extTextureFloat && !this.extTextureHalfFloat) throw "TargetTextureMulti: Floating point textures are not supported on this system.";
            if (this.options.filtering == "linear") {
                this.extTextureFloatLinear = context.gl.getExtension("OES_texture_float_linear");
                this.extTextureHalfFloatLinear = context.gl.getExtension("OES_texture_half_float_linear");
                if (!this.extTextureFloatLinear && !this.extTextureHalfFloatLinear) throw "TargetTextureMulti: Linear filtering requested, but not available.";
            }
        }
        this._super(size);
        this.targets = [];
        this.depth = null;
        this.frameBuffer = null;
        this.build(context);
    },
    type: function() {
        return "TargetTextureMulti";
    },
    setSize: function(width, height) {
        this._super(width, height);
        this.rebuild = true;
    },
    getDataType: function(context) {
        if (this.options.dataType == "unsigned") return context.gl.UNSIGNED_BYTE;
        if (context.isWebGL2()) {
            return context.gl.FLOAT;
        }
        if (this.extTextureHalfFloat) {
            if (!this.extTextureFloat) {
                return this.extTextureHalfFloat.HALF_FLOAT_OES;
            }
            if (navigator && navigator.platform) {
                switch (navigator.platform) {
                  case "iPad":
                  case "iPod":
                  case "iPhone":
                    return this.extTextureHalfFloat.HALF_FLOAT_OES;

                  default:
                    return context.gl.FLOAT;
                }
            }
        }
        return context.gl.FLOAT;
    },
    getInternalFormat: function(context) {
        if (context.isWebGL2() && this.options.dataType == "float") return context.gl.RGBA16F;
        return context.gl.RGBA;
    },
    getTextureFilter: function(context) {
        if (this.options.dataType == "float") {
            if (context.isWebGL2() || this.extTextureFloatLinear || this.extTextureHalfFloatLinear) return context.gl.LINEAR;
            return context.gl.NEAREST;
        }
        return context.gl.NEAREST;
    },
    createBuffer: function(context, filtering, dataType, format) {
        var gl = context.gl;
        var texture = new Texture(context);
        if (!filtering) filtering = this.getTextureFilter(context);
        if (!dataType) dataType = this.getDataType(context);
        if (!format) {
            format = gl.RGBA;
        }
        gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, format, dataType, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        texture.loaded = true;
        return texture;
    },
    build: function(context) {
        var i;
        var gl = context.gl;
        this.frameBuffer = gl.createFramebuffer();
        if (this.options.depth) {
            this.depth = this.createBuffer(context, gl.NEAREST, gl.UNSIGNED_SHORT, gl.DEPTH_COMPONENT);
        } else {
            this.depth = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
            if (this.options.stencil) gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]); else gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
        var buffers = [];
        var COLOR_ATTACHMENT0 = context.isWebGL2() ? context.gl.COLOR_ATTACHMENT0 : this.extDrawBuffers.COLOR_ATTACHMENT0_WEBGL;
        for (i = 0; i < this.options.numTargets; ++i) {
            var texture = this.createBuffer(context);
            this.targets.push(texture);
            buffers.push(COLOR_ATTACHMENT0 + i);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        if (this.options.depth) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
        } else {
            if (this.options.stencil) gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.depth); else gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
        }
        for (i = 0; i < this.targets.length; ++i) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.targets[i].glTexture, 0);
        }
        this.checkStatus(context);
        if (context.isWebGL2()) {
            gl.drawBuffers(buffers);
        } else {
            this.extDrawBuffers.drawBuffersWEBGL(buffers);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    },
    checkStatus: function(context) {
        var gl = context.gl;
        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        switch (status) {
          case gl.FRAMEBUFFER_COMPLETE:
            return true;

          case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            throw "TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT";

          case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            throw "TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";

          case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            throw "TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS";

          case gl.FRAMEBUFFER_UNSUPPORTED:
            throw "TargetTextureMulti: Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED";

          default:
            throw "TargetTextureMulti: Incomplete framebuffer: " + status;
        }
    },
    bind: function(context, doNotClear, clearColor, clearFlags) {
        var gl = context.gl;
        if (this.rebuild) {
            this.rebuild = false;
            for (var i = 0; i < this.targets.length; i++) {
                var target = this.targets[i];
                gl.bindTexture(gl.TEXTURE_2D, target.glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getTextureFilter(context));
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.getTextureFilter(context));
                gl.texImage2D(gl.TEXTURE_2D, 0, this.getInternalFormat(context), this.size[0], this.size[1], 0, gl.RGBA, this.getDataType(context), null);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            if (this.options.depth) {
                gl.bindTexture(gl.TEXTURE_2D, this.depth.glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.size[0], this.size[1], 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
            } else {
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
                if (this.options.stencil) gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.size[0], this.size[1]); else gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size[0], this.size[1]);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            }
        }
        doNotClear = doNotClear === true;
        clearColor = clearColor instanceof Color ? clearColor : false;
        if (!clearColor) {
            if (context.camera) clearColor = context.camera.backgroundColor; else doNotClear = true;
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this._super(context);
        if (!doNotClear) {
            gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
            gl.clearDepth(1);
            var flags = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
            if (this.options.stencil) {
                gl.clearStencil(0);
                flags |= gl.STENCIL_BUFFER_BIT;
            }
            if (clearFlags) flags = clearFlags;
            gl.clear(flags);
        }
    },
    unbind: function(context) {
        this._super(context);
        context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, null);
    }
});

var RenderBuffer = FrakClass.extend({
    init: function(context, faces, type) {
        if (!type) type = context.gl.STATIC_DRAW;
        this.type = type;
        this.context = context;
        this.debug = false;
        this.buffers = {};
        this.maxFaceIndex = 0;
        for (var i = 0; i < faces.length; i++) this.maxFaceIndex = faces[i] > this.maxFaceIndex ? faces[i] : this.maxFaceIndex;
        this.createFacesBuffer(faces);
    },
    has: function(name) {
        return name in this.buffers;
    },
    add: function(name, items, itemSize) {
        if (items.length / itemSize <= this.maxFaceIndex) throw "RenderBuffer: Buffer '{0}' too small ({1} vertices, {2} max index).".format(name, items.length / itemSize, this.maxFaceIndex);
        var gl = this.context.gl;
        if (!(items instanceof Float32Array)) items = new Float32Array(items);
        this.buffers[name] = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
        gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
        this.buffers[name].itemSize = itemSize;
        this.buffers[name].numItems = items.length / this.buffers[name].itemSize;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    update: function(name, items) {
        if (!(name in this.buffers)) throw "RenderBuffer: Unknown buffer: '{0}'".format(name);
        var buf = this.buffers[name];
        if (items.length / buf.itemSize <= this.maxFaceIndex) throw "RenderBuffer: Buffer '{0}' too small.".format(name);
        if (!(items instanceof Float32Array)) items = new Float32Array(items);
        var gl = this.context.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
        buf.numItems = items.length / buf.itemSize;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    updateFaces: function(faces) {
        var gl = this.context.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), this.type);
        this.facesBuffer.itemSize = 1;
        this.facesBuffer.numItems = faces.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.maxFaceIndex = 0;
        for (var i = 0; i < faces.length; i++) this.maxFaceIndex = faces[i] > this.maxFaceIndex ? faces[i] : this.maxFaceIndex;
    },
    render: function(shader) {
        if (!shader.linked) return;
        var gl = this.context.gl;
        var locations = [];
        for (var bufferName in this.buffers) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[bufferName]);
            var bufferLocation = shader.getAttribLocation(bufferName);
            if (bufferLocation == -1) continue;
            gl.enableVertexAttribArray(bufferLocation);
            locations.push(bufferLocation);
            gl.vertexAttribPointer(bufferLocation, this.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
        }
        this.drawElements();
        for (var i = 0, l = locations.length; i < l; i++) {
            gl.disableVertexAttribArray(locations[i]);
        }
    },
    generateBarycentric: function() {
        var barycentric = new Float32Array(this.buffers["position"].numItems * 3);
        for (var i = 0; i < barycentric.length; i += 9) {
            barycentric[i + 0] = 1;
            barycentric[i + 1] = 0;
            barycentric[i + 2] = 0;
            barycentric[i + 3] = 0;
            barycentric[i + 4] = 1;
            barycentric[i + 5] = 0;
            barycentric[i + 6] = 0;
            barycentric[i + 7] = 0;
            barycentric[i + 8] = 1;
        }
        this.add("barycentric", barycentric, 3);
    },
    generateTexCoords: function() {
        var texcoords = new Float32Array(this.buffers["position"].numItems * 2);
        for (var i = 0; i < texcoords.length; i++) {
            texcoords[i] = 0;
        }
        this.add("texcoord2d0", texcoords, 2);
    },
    drawElements: function() {},
    createFacesBuffer: function(faces) {
        var gl = this.context.gl;
        this.facesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), this.type);
        this.facesBuffer.itemSize = 1;
        this.facesBuffer.numItems = faces.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
});

var LinesRenderBuffer = RenderBuffer.extend({
    init: function(context) {
        this._super(context, [], context.gl.DYNAMIC_DRAW);
    },
    add: function(name, items, itemSize) {
        if (items.length / itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0) throw "RenderBuffer: Buffer '{0}' too small ({1} vertices, {2} max index).".format(name, items.length / itemSize, this.maxFaceIndex);
        var gl = this.context.gl;
        if (!(items instanceof Float32Array)) items = new Float32Array(items);
        this.buffers[name] = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
        gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
        this.buffers[name].itemSize = itemSize;
        this.buffers[name].numItems = items.length / this.buffers[name].itemSize;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    update: function(name, items) {
        if (!(name in this.buffers)) throw "RenderBuffer: Unknown buffer: '{0}'".format(name);
        var buf = this.buffers[name];
        if (items.length / buf.itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0) throw "RenderBuffer: Buffer '{0}' too small.".format(name);
        if (!(items instanceof Float32Array)) items = new Float32Array(items);
        var gl = this.context.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
        buf.numItems = items.length / buf.itemSize;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    drawElements: function() {
        var gl = this.context.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
});

var LinesRenderBufferInstanced = LinesRenderBuffer.extend({
    init: function(context) {
        this._super(context);
        if (context.isWebGL2()) {
            this._drawElementsInstanced = context.gl.drawElementsInstanced.bind(context.gl);
            this._vertexAttribDivisor = context.gl.vertexAttribDivisor.bind(context.gl);
        } else {
            var ext = context.gl.getExtension("ANGLE_instanced_arrays");
            if (!ext) {
                throw "Instancing unsupported";
            }
            this._drawElementsInstanced = ext.drawElementsInstancedANGLE.bind(ext);
            this._vertexAttribDivisor = ext.vertexAttribDivisorANGLE.bind(ext);
        }
        this.divisors = {};
    },
    add: function(name, items, itemSize, divisor) {
        if (items.length / itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0 && divisor === 0) throw "RenderBuffer: Buffer '{0}' too small ({1} vertices, {2} max index).".format(name, items.length / itemSize, this.maxFaceIndex);
        var gl = this.context.gl;
        if (!(items instanceof Float32Array)) items = new Float32Array(items);
        this.buffers[name] = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
        gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
        this.buffers[name].itemSize = itemSize;
        this.buffers[name].numItems = items.length / this.buffers[name].itemSize;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.divisors[name] = divisor;
    },
    update: function(name, items) {
        if (!(name in this.buffers)) throw "RenderBuffer: Unknown buffer: '{0}'".format(name);
        var buf = this.buffers[name];
        if (items.length / buf.itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0 && this.divisors[name] === 0) throw "RenderBuffer: Buffer '{0}' too small.".format(name);
        if (!(items instanceof Float32Array)) items = new Float32Array(items);
        var gl = this.context.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
        buf.numItems = items.length / buf.itemSize;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    render: function(shader, count) {
        if (!shader.linked) return;
        var gl = this.context.gl;
        var locations = [];
        for (var bufferName in this.buffers) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[bufferName]);
            var bufferLocation = shader.getAttribLocation(bufferName);
            if (bufferLocation == -1) continue;
            gl.enableVertexAttribArray(bufferLocation);
            locations.push(bufferLocation);
            gl.vertexAttribPointer(bufferLocation, this.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
            this._vertexAttribDivisor(bufferLocation, this.divisors[bufferName]);
        }
        this.drawElements(count);
        for (var i = 0, l = locations.length; i < l; i++) {
            gl.disableVertexAttribArray(locations[i]);
        }
    },
    drawElements: function(count) {
        var gl = this.context.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        this._drawElementsInstanced(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0, count);
    }
});

var TrianglesRenderBuffer = RenderBuffer.extend({
    init: function(context, faces, type) {
        this._super(context, faces, type);
    },
    drawElements: function() {
        var gl = this.context.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
});

var RenderBufferVAO = RenderBuffer.extend({
    init: function(context, faces, type) {
        if (context.isWebGL2()) {
            this.createVAO = context.gl.createVertexArray.bind(context.gl);
            this.bindVAO = context.gl.bindVertexArray.bind(context.gl);
        } else {
            var extVAO = context.gl.getExtension("OES_vertex_array_object");
            if (!extVAO) throw "RenderBufferVAO: Vertex array objects not supported on this device.";
            this.createVAO = extVAO.createVertexArrayOES.bind(extVAO);
            this.bindVAO = extVAO.bindVertexArrayOES.bind(extVAO);
        }
        this.vao = this.createVAO();
        if (!this.vao) throw "RenderBufferVAO: Unable to create vertex array object.";
        this.damaged = true;
        this._super(context, faces, type);
    },
    add: function(name, items, itemSize) {
        if (items.length / itemSize <= this.maxFaceIndex) throw "RenderBuffer: Buffer '{0}' too small.".format(name);
        this.bindVAO(this.vao);
        this._super(name, items, itemSize);
        this.bindVAO(null);
        this.damaged = true;
    },
    createFacesBuffer: function(faces) {
        var gl = this.context.gl;
        this.bindVAO(this.vao);
        this._super(faces);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
        this.bindVAO(null);
        this.damaged = true;
    },
    bindLocations: function(shader) {
        var gl = this.context.gl;
        this.bindVAO(this.vao);
        var bufferLocation;
        for (var name in this.buffers) {
            bufferLocation = -1;
            if (name in ExplicitAttributeLocations) bufferLocation = ExplicitAttributeLocations[name]; else if (shader) bufferLocation = shader.getAttribLocation(name);
            if (bufferLocation == -1) continue;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
            gl.enableVertexAttribArray(bufferLocation);
            gl.vertexAttribPointer(bufferLocation, this.buffers[name].itemSize, gl.FLOAT, false, 0, 0);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.bindVAO(null);
        this.damaged = false;
    },
    render: function(shader) {
        if (!shader.linked) return;
        if (this.damaged) {
            this.bindLocations();
        }
        this.bindVAO(this.vao);
        this.drawElements();
        this.bindVAO(null);
    }
});

var TrianglesRenderBufferVAO = RenderBufferVAO.extend({
    init: function(context, faces, type) {
        this._super(context, faces, type);
    },
    drawElements: function() {
        var gl = this.context.gl;
        gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
});

var QuadsRenderBuffer = TrianglesRenderBuffer.extend({
    init: function(context, faces, type) {
        var triangles = [];
        for (var i = 0; i < faces.length - 3; i++) {
            triangles.push(faces[i]);
            triangles.push(faces[i + 1]);
            triangles.push(faces[i + 2]);
            triangles.push(faces[i]);
            triangles.push(faces[i + 2]);
            triangles.push(faces[i + 3]);
        }
        this._super(context, triangles, type);
    }
});

var BaseTexture = Serializable.extend({
    init: function(context) {
        this._super();
        this.size = vec2.create();
        this.loaded = false;
    },
    type: function() {
        return "BaseTexture";
    },
    excluded: function() {
        return this._super().concat([ "loaded", "size" ]);
    },
    bind: function(context) {},
    unbind: function(context) {},
    resizeToPowerOfTwo: function(image) {
        function isPowerOfTwo(x) {
            return (x & x - 1) == 0;
        }
        function nextLowestPowerOfTwo(x) {
            return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(x) / Math.log(2))), 2048), 1);
        }
        if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {
            var canvas = document.createElement("canvas");
            canvas.width = nextLowestPowerOfTwo(image.width);
            canvas.height = nextLowestPowerOfTwo(image.height);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            image = canvas;
        }
        return image;
    },
    anisotropy: function(context) {
        if (context.engine) {
            if (!context.engine.options.anisotropicFiltering) this.anisotropic = false; else this.anisotropyFilter = context.engine.options.anisotropicFiltering;
        }
        if (this.anisotropic) {
            this.extTextureFilterAnisotropic = context.gl.getExtension("EXT_texture_filter_anisotropic");
            if (!this.extTextureFilterAnisotropic) {
                this.anisotropic = false;
            } else {
                var maxAnisotropy = context.gl.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                this.anisotropyFilter = Math.min(this.anisotropyFilter, maxAnisotropy);
            }
        }
    }
});

var Texture = BaseTexture.extend({
    init: function(context) {
        this._super(context);
        this.glTexture = null;
        this.name = false;
        this.mipmapped = true;
        this.flipY = true;
        this.clampToEdge = false;
        this.anisotropic = true;
        this.anisotropyFilter = 4;
        this.image = null;
        this.wrapS = false;
        this.wrapT = false;
        if (context) this.create(context);
    },
    type: function() {
        return "Texture";
    },
    excluded: function() {
        return this._super().concat([ "glTexture" ]);
    },
    bind: function(context) {
        if (!this.loaded) {
            context.gl.bindTexture(context.gl.TEXTURE_2D, null);
            return;
        }
        context.gl.bindTexture(context.gl.TEXTURE_2D, this.glTexture);
    },
    unbind: function(context) {
        context.gl.bindTexture(context.gl.TEXTURE_2D, null);
    },
    create: function(context) {
        this.anisotropy(context);
        this.glTexture = context.gl.createTexture();
    },
    clearImage: function(context, color, size) {
        if (this.glTexture === null) this.create(context);
        size = size || 1;
        var gl = context.gl;
        gl.bindTexture(context.gl.TEXTURE_2D, this.glTexture);
        var data = new Uint8Array(size * size * 4);
        for (var i = 0; i < size * size * 4; i += 4) {
            data[i + 0] = color[0];
            data[i + 1] = color[1];
            data[i + 2] = color[2];
            data[i + 3] = color[3];
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(context.gl.TEXTURE_2D, null);
        vec2.set(this.size, size, size);
        this.loaded = true;
    },
    pasteImage: function(context, position, image) {
        if (!this.loaded) return;
        this.bind(context);
        var gl = context.gl;
        gl.texSubImage2D(gl.TEXTURE_2D, 0, position[0] * this.size[0], position[1] * this.size[1], gl.RGBA, gl.UNSIGNED_BYTE, image);
        if (this.mipmapped) gl.generateMipmap(gl.TEXTURE_2D);
        this.unbind(context);
        this.loaded = true;
    },
    setImage: function(context, inputImage, noResize) {
        if (!this.glTexture) this.create(context);
        if (!this.glTexture) throw "Unable to update texture. glTexture not available.";
        var image = inputImage;
        if (!noResize) image = this.resizeToPowerOfTwo(inputImage);
        vec2.set(this.size, image.width, image.height);
        var gl = context.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        if (this.wrapS) {
            var wrap = gl.REPEAT;
            if (this.wrapS === "clamp") {
                wrap = gl.CLAMP_TO_EDGE;
            } else if (this.wrapS === "mirror") {
                wrap = gl.MIRRORED_REPEAT;
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
        }
        if (this.wrapT) {
            var wrap = gl.REPEAT;
            if (this.wrapT === "clamp") {
                wrap = gl.CLAMP_TO_EDGE;
            } else if (this.wrapT === "mirror") {
                wrap = gl.MIRRORED_REPEAT;
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
        }
        if (this.clampToEdge) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        if (this.mipmapped) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            if (this.anisotropic) {
                gl.texParameteri(gl.TEXTURE_2D, this.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropyFilter);
            }
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.image = image;
        this.loaded = true;
        if ((this.size[0] & this.size[0] - 1) != 0 || (this.size[1] & this.size[1] - 1) != 0) {
            console.warn("Created a not power of 2 texture: {0} ({1}x{2})".format(this.name, this.size[0], this.size[1]));
        }
    },
    getImage: function(context) {
        if (!this.glTexture) throw "Unable to get image. glTexture not available.";
        var gl = context.gl;
        var targetTexture = new TargetTexture(this, context, false);
        targetTexture.bind(context);
        var result = new Uint8Array(this.size[0] * this.size[1] * 4);
        context.gl.readPixels(0, 0, this.size[0], this.size[1], gl.RGBA, gl.UNSIGNED_BYTE, result);
        targetTexture.unbind(context);
        return result;
    },
    onContextRestored: function(context) {
        this.glTexture = null;
        this.loaded = false;
        if (this.image) {
            this.setImage(context, this.image);
        }
    }
});

var CubeTexture = BaseTexture.extend({
    init: function(context) {
        this._super(context);
        this.glTexture = null;
        this.name = false;
        this.mipmapped = false;
        this.clampToEdge = true;
        this.anisotropic = true;
        this.anisotropyFilter = 4;
        this.images = {};
        if (context) this.create(context);
    },
    type: function() {
        return "CubeTexture";
    },
    excluded: function() {
        return this._super().concat([ "glTexture" ]);
    },
    bind: function(context) {
        if (!this.loaded) {
            context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, null);
            return;
        }
        context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, this.glTexture);
    },
    unbind: function(context) {
        context.gl.bindTexture(context.gl.TEXTURE_CUBE_MAP, null);
    },
    getGLCubeFace: function(context, face) {
        var gl = context.gl;
        switch (face) {
          case CubeTexture.FRONT:
            return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;

          case CubeTexture.BACK:
            return gl.TEXTURE_CUBE_MAP_POSITIVE_X;

          case CubeTexture.LEFT:
            return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;

          case CubeTexture.RIGHT:
            return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;

          case CubeTexture.TOP:
            return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;

          case CubeTexture.BOTTOM:
            return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
        }
        return null;
    },
    create: function(context) {
        this.anisotropy(context);
        this.glTexture = context.gl.createTexture();
        var gl = context.gl;
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
        if (this.clampToEdge) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        if (this.mipmapped) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            if (this.anisotropic) {
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, this.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropyFilter);
            }
        } else {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    },
    setFace: function(context, face, inputImage, noResize) {
        if (this.glTexture === false) this.create(context);
        if (!this.glTexture) throw "Unable to update cube texture. glTexture not available.";
        var image = inputImage;
        if (face in this.images) {
            delete this.images[face].image;
        }
        this.images[face] = {
            image: image,
            noResize: !!noResize
        };
        face = this.getGLCubeFace(context, face);
        if (!face) throw "Not a valid CubeTexture face.";
        if (!noResize) image = this.resizeToPowerOfTwo(inputImage);
        vec2.set(this.size, image.width, image.height);
        var gl = context.gl;
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        this.loaded = true;
        if ((this.size[0] & this.size[0] - 1) != 0 || (this.size[1] & this.size[1] - 1) != 0) {
            console.warn("Created a not power of 2 texture: {0} ({1}x{2})".format(this.name, this.size[0], this.size[1]));
        }
    },
    onContextRestored: function(context) {
        this.glTexture = null;
        this.create(context);
        this.loaded = false;
        for (var face in this.images) {
            var item = this.images[face];
            this.setFace(context, parseInt(face), item.image, item.noResize);
        }
    }
});

CubeTexture.FRONT = 0;

CubeTexture.BACK = 1;

CubeTexture.LEFT = 2;

CubeTexture.RIGHT = 3;

CubeTexture.BOTTOM = 4;

CubeTexture.TOP = 5;

var Material = Serializable.extend({
    init: function(shader, uniforms, samplers, name, descriptor) {
        this._super();
        this.name = name;
        if (!this.name) this.name = "unnamed_" + Math.round(Math.random() * Math.pow(36, 12)).toString(36);
        this.shader = shader;
        this.uniforms = uniforms;
        this.samplers = samplers;
        this.descriptor = descriptor;
        this.boundSamplers = new SamplerAccumulator();
    },
    type: function() {
        return "Material";
    },
    bind: function(uniforms) {
        if (!this.shader) return;
        this.shader.use(this.uniforms);
        if (uniforms) {
            this.shader.bindUniforms(uniforms);
        }
        var arg;
        for (var i = 1, l = arguments.length; i < l; ++i) {
            arg = arguments[i];
            if (arg instanceof Sampler) {
                this.boundSamplers.add(arg);
            } else if (arg instanceof Array) {
                for (var j = 0, l2 = arg.length; j < l2; ++j) {
                    this.boundSamplers.add(arg[j]);
                }
            }
        }
        for (var i = 0, l3 = this.samplers.length; i < l3; ++i) this.boundSamplers.add(this.samplers[i]);
        if (this.boundSamplers.length == 0 && this.shader.context.engine) {
            this.boundSamplers.add(this.shader.context.engine.DiffuseFallbackSampler);
        }
        this.shader.bindSamplers(this.boundSamplers.samplers);
    },
    unbind: function() {
        if (!this.shader) return;
        this.shader.unbindSamplers(this.boundSamplers.samplers);
        this.boundSamplers.clear();
    },
    instantiate: function() {
        var uniforms = {};
        for (var i in this.uniforms) {
            uniforms[i] = this.uniforms[i].clone();
        }
        var samplers = [];
        for (var i in this.samplers) {
            if (typeof this.samplers[i] == "object") samplers.push(this.samplers[i].clone());
        }
        var copy = new Material(this.shader, uniforms, samplers, this.descriptor);
        copy.name = this.name + " (instance)";
        return copy;
    }
});

var Space = FrakClass.extend({
    init: function() {},
    frustumCast: function(frustum, layerMask) {},
    rayCast: function(ray) {},
    lineCast: function(line) {}
});

var DynamicSpace = Space.extend({
    init: function() {
        this.renderers = [];
        this.colliders = [];
        this.filteredRenderers = [];
    },
    addRenderer: function(renderer) {
        this.renderers.push(renderer);
        this.filteredRenderers.push(null);
    },
    removeRenderer: function(renderer) {
        for (var i = 0; i < this.renderers.length; i++) {
            if (this.renderers[i] === renderer) {
                this.renderers.splice(i, 1);
                this.filteredRenderers.pop();
                return true;
            }
        }
        return false;
    },
    addCollider: function(collider) {
        this.colliders.push(collider);
    },
    removeCollider: function(collider) {
        for (var i = 0; i < this.colliders.length; i++) {
            if (this.colliders[i] === collider) {
                this.colliders.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    frustumCast: function(frustum, layerMask) {
        var renderer;
        var index = 0;
        for (var i = 0; i < this.renderers.length; ++i) {
            renderer = this.renderers[i];
            if (renderer.visible && renderer.layer & layerMask) {
                this.filteredRenderers[index++] = renderer;
            }
        }
        for (var i = index; i < this.filteredRenderers.length; ++i) {
            this.filteredRenderers[i] = null;
        }
        return this.filteredRenderers;
    },
    rayCast: function(ray, layerMask, collideInvisible) {
        var result = new RayTestResult(ray);
        if (!layerMask) return result;
        for (var i = 0; i < this.colliders.length; i++) {
            if (!this.colliders[i].enabled) continue;
            if (this.colliders[i].node.layer & layerMask) {
                this.colliders[i].rayTest(ray, result, collideInvisible);
            }
        }
        return result;
    }
});

var Renderer = FrakClass.extend({
    init: function(matrix) {
        this.matrix = matrix;
        this.layer = 1;
        this.visible = true;
        this.castShadows = true;
        this.receiveShadows = true;
        this.lightContribution = 1;
        this.reflectivity = 0;
        this.transparent = false;
        this.customShader = false;
        this.localBoundingBox = new BoundingBox();
        this.localBoundingSphere = new BoundingSphere();
        this.globalBoundingBox = new BoundingBox();
        this.globalBoundingSphere = new BoundingSphere();
    },
    render: function(context, pass) {
        this.onRender(context, pass);
    },
    renderGeometry: function(context, shader) {
        this.onRenderGeometry(context, shader);
    },
    getDefaultUniforms: function(context, uniforms) {
        if (typeof uniforms !== "object" || uniforms === null) {
            uniforms = {};
        }
        if (uniforms.hasOwnProperty("model")) mat4.copy(uniforms.model.value, this.matrix); else uniforms.model = new UniformMat4(this.matrix);
        if (uniforms.hasOwnProperty("modelview")) mat4.copy(uniforms.modelview.value, context.modelview.top()); else uniforms.modelview = new UniformMat4(context.modelview.top());
        if (uniforms.hasOwnProperty("projection")) mat4.copy(uniforms.projection.value, context.projection.top()); else uniforms.projection = new UniformMat4(context.projection.top());
        if (uniforms.hasOwnProperty("receiveShadows")) uniforms.receiveShadows.value = this.receiveShadows ? 1 : 0; else uniforms.receiveShadows = new UniformInt(this.receiveShadows ? 1 : 0);
        if (uniforms.hasOwnProperty("lightContribution")) uniforms.lightContribution.value = this.lightContribution; else uniforms.lightContribution = new UniformFloat(this.lightContribution);
        if (uniforms.hasOwnProperty("reflectivity")) uniforms.reflectivity.value = this.reflectivity; else uniforms.reflectivity = new UniformFloat(this.reflectivity);
        if (context.camera) {
            if (uniforms.hasOwnProperty("view")) mat4.copy(uniforms.view.value, context.camera.viewMatrix); else uniforms.view = new UniformMat4(context.camera.viewMatrix);
            if (uniforms.hasOwnProperty("viewInverse")) mat4.copy(uniforms.viewInverse.value, context.camera.viewInverseMatrix); else uniforms.viewInverse = new UniformMat4(context.camera.viewInverseMatrix);
            if (context.camera.near) {
                if (uniforms.hasOwnProperty("zNear")) uniforms.zNear.value = context.camera.near; else uniforms.zNear = new UniformFloat(context.camera.near);
            }
            if (context.camera.far) {
                if (uniforms.hasOwnProperty("zFar")) uniforms.zFar.value = context.camera.far; else uniforms.zFar = new UniformFloat(context.camera.far);
            }
            if (uniforms.hasOwnProperty("cameraPosition")) vec3.copy(uniforms.cameraPosition.value, context.camera.getPosition()); else uniforms.cameraPosition = new UniformVec3(context.camera.getPosition());
        }
        if (context.light && context.light.uniforms) {
            uniforms.lightDirection = context.light.uniforms.lightDirection;
            uniforms.lightColor = context.light.uniforms.lightColor;
            uniforms.lightIntensity = context.light.uniforms.lightIntensity;
            uniforms.useShadows = context.light.uniforms.useShadows;
        }
        if (context.shadow) {
            uniforms.lightView = context.shadow.lightView;
            uniforms.lightProjection = context.shadow.lightProjection;
        }
        return uniforms;
    },
    getGlobalSamplers: function(context) {
        var samplers = [];
        if (context.shadow) {
            samplers.push(context.shadow.shadow0);
        }
        return samplers;
    },
    setMatrix: function(matrix) {
        this.matrix = matrix;
        this.updateGlobalBoundingVolumes();
    },
    updateGlobalBoundingVolumes: function() {
        this.localBoundingBox.transform(this.matrix, this.globalBoundingBox);
        this.localBoundingSphere.transform(this.matrix, this.globalBoundingSphere);
    },
    onRender: function(context, pass) {},
    onRenderGeometry: function(context, shader) {}
});

var PrimitiveRenderer = Renderer.extend({
    init: function(matrix, material) {
        this._super(matrix);
        this.material = material;
    }
});

var MeshRenderer = Renderer.extend({
    init: function(context, matrix, mesh) {
        this._super(matrix);
        this.mesh = mesh;
        this.buffers = [];
        this._cache = null;
        for (var submeshIndex in this.mesh.submeshes) {
            var submesh = this.mesh.submeshes[submeshIndex];
            var renderBuffer = new TrianglesRenderBuffer(context, submesh.faces);
            renderBuffer.add("position", submesh.positions, 3);
            for (var texCoords1DIndex in submesh.texCoords1D) {
                renderBuffer.add("texcoord1d" + texCoords1DIndex, submesh.texCoords1D[texCoords1DIndex], 1);
            }
            for (var texCoords2DIndex in submesh.texCoords2D) {
                renderBuffer.add("texcoord2d" + texCoords2DIndex, submesh.texCoords2D[texCoords2DIndex], 2);
            }
            for (var texCoords3DIndex in submesh.texCoords3D) {
                renderBuffer.add("texcoord3d" + texCoords3DIndex, submesh.texCoords3D[texCoords3DIndex], 3);
            }
            if (submesh.normals) renderBuffer.add("normal", submesh.normals, 3);
            if (submesh.tangents) renderBuffer.add("tangent", submesh.tangents, 3);
            if (submesh.bitangents) renderBuffer.add("bitangent", submesh.bitangents, 3);
            this.buffers.push(renderBuffer);
        }
    },
    onRender: function(context) {
        this._cache = this.getDefaultUniforms(context, this._cache);
        for (var submeshIndex in this.mesh.submeshes) {
            var submesh = this.mesh.submeshes[submeshIndex];
            var material = this.mesh.getMaterial(submesh.materialIndex);
            if (!material) continue;
            material.bind(this._cache);
            this.buffers[submeshIndex].render(material.shader);
            material.unbind();
        }
    },
    onRenderGeometry: function(context, shader) {
        this._cache = this.getDefaultUniforms(context, this._cache);
        shader.bindUniforms(this._cache);
        for (var i in this.buffers) {
            this.buffers[i].render(shader);
        }
    }
});

var LineRenderer = Renderer.extend({
    init: function(context, matrix, material) {
        this._super(matrix);
        this.material = material;
        try {
            this.buffer = new LinesRenderBufferInstanced(context);
            this.instanced = true;
        } catch (e) {
            this.buffer = new LinesRenderBuffer(context);
            this.instanced = false;
        }
        this.customShader = true;
        this.count = 0;
    },
    onRender: function(context) {
        this.buffer.render(this.material.shader, this.count);
    },
    onRenderGeometry: function(context, shader) {
        this._cache = this.getDefaultUniforms(context, this._cache);
        shader.bindUniforms(this._cache);
        this.buffer.render(shader, this.count);
    }
});

var SubmeshRenderer = Renderer.extend({
    init: function(context, matrix, submesh, material) {
        this._super(matrix);
        this.submesh = submesh;
        this.material = material;
        this.buffer = [];
        this.failed = false;
        this.transparent = false;
        this.localBoundingBox = this.submesh.boundingBox;
        this.localBoundingSphere = this.submesh.boundingSphere;
        this.updateGlobalBoundingVolumes();
        this.build(context);
        this._cache = null;
    },
    allocBuffer: function(context) {
        if (!this.submesh) throw Error("SubmeshRenderer.allocBuffer: No submesh set");
        if (context.engine && (context.engine.options.useVAO === true || context.isWebGL2())) {
            try {
                this.buffer = new TrianglesRenderBufferVAO(context, this.submesh.faces);
            } catch (e) {
                this.buffer = new TrianglesRenderBuffer(context, this.submesh.faces);
            }
        } else {
            this.buffer = new TrianglesRenderBuffer(context, this.submesh.faces);
        }
    },
    build: function(context) {
        if (this.buffer) delete this.buffer;
        this.allocBuffer(context);
        var submesh = this.submesh;
        this.buffer.add("position", submesh.positions, 3);
        var pointCount = submesh.positions.length / 3;
        if (submesh.texCoords1D) {
            for (var i = 0; i < submesh.texCoords1D.length; ++i) {
                if (submesh.texCoords1D[i].length != pointCount) {
                    console.warn("Wrong number of 1D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords1D[i].length, pointCount));
                    continue;
                }
                this.buffer.add("texcoord1d" + i, submesh.texCoords1D[i], 1);
            }
        }
        if (submesh.texCoords2D) {
            for (var i = 0; i < submesh.texCoords2D.length; ++i) {
                if (submesh.texCoords2D[i].length / 2 != pointCount) {
                    console.warn("Wrong number of 2D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords2D[i].length / 2, pointCount));
                    continue;
                }
                this.buffer.add("texcoord2d" + i, submesh.texCoords2D[i], 2);
            }
        }
        if (submesh.texCoords3D) {
            for (var i = 0; i < submesh.texCoords3D.length; ++i) {
                if (submesh.texCoords3D[i].length / 3 != pointCount) {
                    console.warn("Wrong number of 3D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords3D[i].length / 3, pointCount));
                    continue;
                }
                this.buffer.add("texcoord3d" + i, submesh.texCoords3D[i], 3);
            }
        }
        if (submesh.texCoords4D) {
            for (var i = 0; i < submesh.texCoords4D.length; ++i) {
                if (submesh.texCoords4D[i].length / 4 != pointCount) {
                    console.warn("Wrong number of 4D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords4D[i].length / 4, pointCount));
                    continue;
                }
                this.buffer.add("texcoord4d" + i, submesh.texCoords4D[i], 4);
            }
        }
        if (submesh.normals) {
            if (submesh.positions.length != submesh.normals.length) {
                console.warn("Wrong number of normals. Must be the same as positions.");
            } else {
                this.buffer.add("normal", submesh.normals, 3);
            }
        }
        if (submesh.tangents) {
            if (submesh.positions.length != submesh.tangents.length) {
                console.warn("Wrong number of tangents. Must be the same as positions.");
            } else {
                this.buffer.add("tangent", submesh.tangents, 3);
            }
        }
        if (submesh.bitangents) {
            if (submesh.positions.length != submesh.bitangents.length) {
                console.warn("Wrong number of bitangents. Must be the same as positions.");
            } else {
                this.buffer.add("bitangent", submesh.bitangents, 3);
            }
        }
        if (submesh.barycentric) {
            if (submesh.positions.length != submesh.barycentric.length) {
                console.warn("Wrong number of barycentric coordinates. Must be the same as positions.");
            } else {
                this.buffer.add("barycentric", submesh.barycentric, 3);
            }
        }
        var material = this.material;
        if (!material.uniforms.diffuse) material.uniforms.diffuse = new UniformColor(new Color(1, 1, 1, 1));
        if (!material.uniforms.ambient) material.uniforms.ambient = new UniformColor(new Color(.2, .2, .2, 1));
        if (!material.uniforms.specularStrength) material.uniforms.specularStrength = new UniformFloat(0);
        if (!material.uniforms.specularPower) material.uniforms.specularPower = new UniformInt(8);
        this.transparent = material.shader.requirements.transparent || material.uniforms["diffuse"] && material.uniforms["diffuse"].value[3] < 1 || material.uniforms["ambient"] && material.uniforms["ambient"].value[3] < 1;
        this.failed = false;
    },
    onRender: function(context) {
        this.buffer.render(this.material.shader);
    },
    onRenderGeometry: function(context, shader) {
        this._cache = this.getDefaultUniforms(context, this._cache);
        shader.bindUniforms(this._cache);
        this.buffer.render(shader);
    },
    onContextRestored: function(context) {
        this.build(context);
    }
});

var CubeRenderer = PrimitiveRenderer.extend({
    init: function(context, matrix, size, material) {
        this._super(matrix, material);
        this.size = size;
        var halfsize = this.size / 2;
        var vertices = [ -halfsize, -halfsize, halfsize, halfsize, -halfsize, halfsize, halfsize, -halfsize, -halfsize, -halfsize, -halfsize, -halfsize, -halfsize, halfsize, halfsize, halfsize, halfsize, halfsize, halfsize, halfsize, -halfsize, -halfsize, halfsize, -halfsize ];
        var faces = [ 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 5, 4, 1, 2, 6, 5, 2, 3, 7, 6, 3, 0, 0, 7 ];
        this.renderBuffer = new QuadsRenderBuffer(context, faces);
        this.renderBuffer.add("position", vertices, 3);
    },
    onRender: function(context) {
        this.material.bind({
            modelview: new UniformMat4(context.modelview.top()),
            projection: new UniformMat4(context.projection.top())
        });
        this.renderBuffer.render(this.material.shader);
        this.material.unbind();
    }
});

function DownloadBinary(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        if (this.status == 200) callback(this.response); else callback(false);
    };
    xhr.send();
}

var DataParserTypes = {
    NODE_ROOT: 4096,
    NODE_STRING: 4097,
    NODE_MATRIX3X3: 4098,
    NODE_MATRIX4X4: 4099,
    NODE_MATERIALS: 8192,
    NODE_MATERIAL: 8193,
    NODE_COLOR_AMBIENT: 8194,
    NODE_COLOR_DIFFUSE: 8195,
    NODE_COLOR_SPECULAR: 8196,
    NODE_COLOR_EMISSIVE: 8197,
    NODE_TWOSIDED: 8198,
    NODE_SHININESS: 8199,
    NODE_SHININESS_STRENGTH: 8200,
    NODE_TEXTURES_AMBIENT: 8272,
    NODE_TEXTURES_DIFFUSE: 8273,
    NODE_TEXTURES_SPECULAR: 8274,
    NODE_TEXTURES_EMISSIVE: 8275,
    NODE_TEXTURES_NORMALS: 8276,
    NODE_TEXTURES_HEIGHT: 8277,
    NODE_TEXTURES_SHININESS: 8278,
    NODE_TEXTURES_OPACITY: 8279,
    NODE_TEXTURES_DISPLACEMENT: 8280,
    NODE_TEXTURES_LIGHTMAP: 8281,
    NODE_TEXTURES_REFLECTION: 8282,
    NODE_TEXTURE: 8448,
    NODE_TEXTURE_SCALE: 8449,
    NODE_SHADER_NAME: 8704,
    NODE_GEOMETRY: 12288,
    NODE_MESH: 12544,
    NODE_MATERIAL_REFERENCE: 12545,
    NODE_VERTICES: 12546,
    NODE_NORMALS: 12547,
    NODE_TANGENTS: 12548,
    NODE_BITANGENTS: 12549,
    NODE_TEXTURE_COORDINATES: 12550,
    NODE_FACES: 12551,
    NODE_SCENE: 16384,
    NODE_GROUP: 16385,
    NODE_MESH_REFERENCE: 16386,
    NODE_TRANSFORM_POSITION: 16387,
    NODE_TRANSFORM_ROTATION: 16388,
    NODE_TRANSFORM_SCALE: 16389,
    NODE_GROUP_ID: 16390,
    NODE_COLLISION: 20480,
    NODE_COLLISION_NODE: 20481,
    NODE_COLLISION_AABB_CENTER: 20482,
    NODE_COLLISION_AABB_EXTENTS: 20483,
    NODE_COLLISION_FACE_LIST: 20484,
    NODE_FACE_LIST_NODE_ID: 20496,
    NODE_FACE_LIST_MESH_REFERENCE: 20497,
    NODE_FACE_LIST_INDICES: 20498,
    getName: function(value) {
        for (var name in DataParserTypes) {
            if (DataParserTypes[name] === value) return name;
        }
        return false;
    }
};

var DataParserNode = function(id, length, position) {
    this.id = id;
    this.length = length;
    this.position = position;
    this.HEADER_LENGTH = 8;
    this.end = function() {
        return this.position + this.HEADER_LENGTH + this.length;
    };
};

var DataParserResult = FrakClass.extend({
    init: function() {
        this.data = {
            meshes: [],
            materials: [],
            hierarchy: false,
            collision: false,
            hierarchyNodesByID: {}
        };
    },
    getData: function() {
        return this.data;
    },
    linkReferences: function() {
        for (var i in this.data.meshes) {
            if (this.data.meshes[i].material != -1 && this.data.meshes[i].material in this.data.materials) this.data.meshes[i].material = this.data.materials[this.data.meshes[i].material];
        }
        if (this.data.hierarchy !== false) {
            var scope = this;
            var linkMeshesToGroups = function(group) {
                for (var i in group.meshes) {
                    if (group.meshes[i] >= 0 && group.meshes[i] in scope.data.meshes) group.meshes[i] = scope.data.meshes[group.meshes[i]];
                }
                for (var j in group.children) {
                    linkMeshesToGroups(group.children[j]);
                }
            };
            linkMeshesToGroups(this.data.hierarchy);
        }
    },
    createGroup: function() {
        return {
            name: "",
            id: false,
            parent: false,
            children: [],
            meshes: [],
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
                w: 0
            },
            scale: {
                x: 0,
                y: 0,
                z: 0
            },
            transform: false
        };
    },
    mapGroupID: function(group) {
        this.data.hierarchyNodesByID[group.id] = group;
    },
    setRoot: function(group) {
        this.data.hierarchy = group;
    },
    createMaterialTexture: function() {
        return {
            path: false,
            scale: {
                u: 1,
                v: 1,
                w: 1
            }
        };
    },
    createMaterial: function() {
        return {
            name: "",
            color: {
                ambient: false,
                diffuse: false,
                specular: false,
                emissive: false
            },
            twosided: false,
            shininess: 0,
            shininess_strength: 0,
            shader: false,
            textures: {
                ambient: [],
                diffuse: [],
                specular: [],
                emissive: [],
                normal: [],
                height: [],
                shininess: [],
                opacity: [],
                displacement: [],
                lightmap: [],
                reflection: []
            }
        };
    },
    addMaterial: function(material) {
        this.data.materials.push(material);
    },
    getMaterial: function(index) {
        if (index >= 0 && index < this.data.materials.length) return this.data.materials[index];
        return false;
    },
    createMesh: function(numPoints) {
        var mesh = {
            index: -1,
            material: -1,
            indices: [],
            vertices: []
        };
        for (var i = 0; i < numPoints; i++) mesh.vertices.push(this.createVertex());
        return mesh;
    },
    createVertex: function() {
        return {
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            normal: {
                x: 0,
                y: 0,
                z: 0
            },
            texCoord: [],
            tangent: {
                x: 0,
                y: 0,
                z: 0
            },
            bitangent: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    },
    addMesh: function(mesh) {
        this.data.meshes.push(mesh);
        mesh.index = this.data.meshes.length - 1;
    },
    createCollisionTreeNode: function() {
        return {
            parent: false,
            children: [],
            center: {
                x: 0,
                y: 0,
                z: 0
            },
            extents: {
                x: 0,
                y: 0,
                z: 0
            },
            faces: false
        };
    },
    addFaceList: function(collisionNode, nodeID, meshID, indices) {
        if (nodeID < 0 || meshID < 0 || indices.length == 0) return false;
        if (collisionNode.faces === false) collisionNode.faces = {};
        if (!(nodeID in collisionNode.faces)) collisionNode.faces[nodeID] = {};
        if (!(meshID in collisionNode.faces[nodeID])) collisionNode.faces[nodeID][meshID] = [];
        collisionNode.faces[nodeID][meshID] = collisionNode.faces[nodeID][meshID].concat(indices);
        return true;
    },
    setCollisionTreeRoot: function(node) {
        this.data.collision = node;
    }
});

var DataParser = FrakClass.extend({
    init: function(data, cbOnComplete, cbOnError, cbOnProgress, userdata) {
        this.VERSION = 1;
        this.view = new jDataView(data);
        this.onComplete = cbOnComplete;
        this.onProgress = cbOnProgress;
        this.onError = cbOnError;
        this.userdata = userdata;
        this.result = new DataParserResult();
        this.errors = [];
        this.stack = [];
        this.linkReferences = true;
        this.flipX = false;
        this.warnOnUnknownChunks = true;
        this.isFunction = function(f) {
            return typeof f === "function";
        };
    },
    parse: function() {
        this.push(false, this.parseHeader);
        while (!this.completed()) {
            if (!this.step()) {
                if (this.isFunction(this.onError)) this.onError(this.errors, this.userdata);
                return false;
            }
        }
        if (this.linkReferences) this.result.linkReferences();
        if (this.isFunction(this.onComplete)) this.onComplete(this.result.getData(), this.userdata);
        return true;
    },
    error: function(msg) {
        this.errors.push(msg);
        return false;
    },
    errorExpect: function(bytes, parameter) {
        return this.error("Expected at least " + bytes + " byte" + (bytes > 1 ? "s" : "") + ' for "' + parameter + '"');
    },
    completed: function() {
        if (this.view.tell() == this.view.byteLength) return true;
        return false;
    },
    step: function() {
        var call = this.getCurrentCall();
        if (call) {
            var ret = call(this.getCurrentNode());
            if (this.isFunction(this.onProgress)) this.onProgress(this.view.tell() / this.view.byteLength * 100, this.userdata);
            return ret;
        }
        return false;
    },
    push: function(node, call) {
        this.stack.push({
            node: node,
            call: FrakCallback(this, call)
        });
    },
    pop: function() {
        this.stack.pop();
    },
    getCurrentNode: function() {
        if (this.stack.length > 0) return this.stack[this.stack.length - 1].node;
        return false;
    },
    getCurrentCall: function() {
        if (this.stack.length > 0) return this.stack[this.stack.length - 1].call;
        return false;
    },
    hasDataFor: function(numBytes) {
        if (this.view.byteLength < this.view.tell() + numBytes) return false;
        return true;
    },
    hasDataForNode: function(node) {
        if (this.view.byteLength < node.position + node.length + 8) return false;
        return true;
    },
    getUint32: function() {
        return this.view.getUint32(this.view.tell(), true);
    },
    getFloat32: function() {
        return this.view.getFloat32(this.view.tell(), true);
    },
    getMatrix4x4: function() {
        var mat = [];
        for (var i = 0; i < 4; i++) {
            mat.push([ this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32() ]);
        }
        return mat;
    },
    getColor: function() {
        return {
            r: this.view.getFloat32(this.view.tell(), true),
            g: this.view.getFloat32(this.view.tell(), true),
            b: this.view.getFloat32(this.view.tell(), true),
            a: this.view.getFloat32(this.view.tell(), true)
        };
    },
    parseHeader: function() {
        if (!this.view) return this.error("No data to parse");
        if (!this.parseSignature()) return false;
        var rootNode = this.parseNodeHeader();
        if (rootNode === false) return false;
        if (rootNode.id !== DataParserTypes.NODE_ROOT) return this.error("Root node type is incorrect");
        this.push(rootNode, this.parseRoot);
        return true;
    },
    parseSignature: function() {
        if (!this.hasDataFor(12)) return this.error("Not enough data for 3DTech DATA format header");
        var sig = this.view.getString(10);
        if (sig != "3DTECHDATA") return this.error("The data is not in 3DTech DATA format");
        var version = this.view.getInt16(this.view.tell(), true);
        if (version != this.VERSION) return this.error("Incompatible version");
        if (!this.hasDataFor(8)) return this.error("Could not find root node");
        return true;
    },
    parseNodeHeader: function() {
        if (!this.hasDataFor(8)) return this.error("Not enough data for parsing node header");
        var position = this.view.tell();
        var id = this.getUint32();
        var length = this.getUint32();
        return new DataParserNode(id, length, position);
    },
    skipNode: function(node) {
        if (this.warnOnUnknownChunks) console.warn("DataParser: skipping node ", DataParserTypes.getName(node.id));
        this.view.seek(this.view.tell() + node.length);
    },
    parseMaterial: function(materialNode) {
        var material = this.result.createMaterial();
        while (this.view.tell() < materialNode.end()) {
            var param = this.parseNodeHeader();
            switch (param.id) {
              case DataParserTypes.NODE_STRING:
                material.name = this.view.getString(param.length);
                break;

              case DataParserTypes.NODE_SHADER_NAME:
                material.shader = this.view.getString(param.length);
                break;

              case DataParserTypes.NODE_COLOR_AMBIENT:
                if (param.length != 16) return this.error("Ambient color corrupted");
                material.color.ambient = this.getColor();
                break;

              case DataParserTypes.NODE_COLOR_DIFFUSE:
                if (param.length != 16) return this.error("Diffuse color corrupted");
                material.color.diffuse = this.getColor();
                break;

              case DataParserTypes.NODE_COLOR_SPECULAR:
                if (param.length != 16) return this.error("Specular color corrupted");
                material.color.specular = this.getColor();
                break;

              case DataParserTypes.NODE_COLOR_EMISSIVE:
                if (param.length != 16) return this.error("Emissive color corrupted");
                material.color.emissive = this.getColor();
                break;

              case DataParserTypes.NODE_TWOSIDED:
                if (param.length < 1) return this.errorExpect(1, "material.twosided");
                var twosided = this.view.getChar();
                material.twosided = twosided == 255 ? true : false;
                break;

              case DataParserTypes.NODE_SHININESS:
                if (param.length < 4) return this.errorExpect(4, "material.shininess");
                material.shininess = this.getFloat32();
                break;

              case DataParserTypes.NODE_SHININESS_STRENGTH:
                if (param.length < 4) return this.errorExpect(4, "material.shininess_strength");
                material.shininess_strength = this.getFloat32();
                break;

              case DataParserTypes.NODE_TEXTURES_AMBIENT:
                this.parseMaterialTextures(param, material.textures.ambient);
                break;

              case DataParserTypes.NODE_TEXTURES_DIFFUSE:
                this.parseMaterialTextures(param, material.textures.diffuse);
                break;

              case DataParserTypes.NODE_TEXTURES_SPECULAR:
                this.parseMaterialTextures(param, material.textures.specular);
                break;

              case DataParserTypes.NODE_TEXTURES_EMISSIVE:
                this.parseMaterialTextures(param, material.textures.emissive);
                break;

              case DataParserTypes.NODE_TEXTURES_NORMALS:
                this.parseMaterialTextures(param, material.textures.normal);
                break;

              case DataParserTypes.NODE_TEXTURES_HEIGHT:
                this.parseMaterialTextures(param, material.textures.height);
                break;

              case DataParserTypes.NODE_TEXTURES_SHININESS:
                this.parseMaterialTextures(param, material.textures.shininess);
                break;

              case DataParserTypes.NODE_TEXTURES_OPACITY:
                this.parseMaterialTextures(param, material.textures.opacity);
                break;

              case DataParserTypes.NODE_TEXTURES_DISPLACEMENT:
                this.parseMaterialTextures(param, material.textures.displacement);
                break;

              case DataParserTypes.NODE_TEXTURES_LIGHTMAP:
                this.parseMaterialTextures(param, material.textures.lightmap);
                break;

              case DataParserTypes.NODE_TEXTURES_REFLECTION:
                this.parseMaterialTextures(param, material.textures.reflection);
                break;

              default:
                this.skipNode(param);
                break;
            }
        }
        this.result.addMaterial(material);
        return true;
    },
    parseMaterialTextures: function(texturesNode, list) {
        while (this.view.tell() < texturesNode.end()) {
            var textureNode = this.parseNodeHeader();
            if (textureNode.id == DataParserTypes.NODE_TEXTURE) {
                var texture = this.result.createMaterialTexture();
                while (this.view.tell() < textureNode.end()) {
                    var node = this.parseNodeHeader();
                    switch (node.id) {
                      case DataParserTypes.NODE_STRING:
                        texture.path = this.view.getString(node.length);
                        break;

                      case DataParserTypes.NODE_TEXTURE_SCALE:
                        if (node.length != 12) return this.error("Texture scale is corrupted");
                        texture.scale.u = this.getFloat32();
                        texture.scale.v = this.getFloat32();
                        texture.scale.w = this.getFloat32();
                        break;

                      default:
                        this.skipNode(node);
                        break;
                    }
                }
                if (texture.path !== false) list.push(texture);
            } else {
                this.skipNode(textureNode);
            }
        }
        return true;
    },
    parseMaterials: function(materialsNode) {
        if (!this.hasDataForNode(materialsNode)) {
            return this.error("Not enough data for node '" + DataParserTypes.getName(materialsNode.id) + "'");
        }
        while (this.view.tell() < materialsNode.end()) {
            var node = this.parseNodeHeader();
            if (node.id == DataParserTypes.NODE_MATERIAL) {
                this.parseMaterial(node);
            } else {
                this.skipNode(node);
            }
        }
        this.pop();
        return true;
    },
    parseGeometry: function(geometryNode) {
        if (!this.hasDataForNode(geometryNode)) return this.error("Not enough data for node '" + DataParserTypes.getName(geometryNode.id) + "'");
        if (this.view.tell() >= geometryNode.end()) {
            this.pop();
            return true;
        }
        var meshNode = this.parseNodeHeader();
        if (meshNode.id == DataParserTypes.NODE_MESH) {
            if (!this.hasDataForNode(meshNode)) return this.error("Not enough data for node '" + DataParserTypes.getName(meshNode.id) + "'");
            this.push(meshNode, this.parseMesh);
        } else this.skipNode(meshNode);
        return true;
    },
    parseMesh: function(meshNode) {
        var numPoints = this.getUint32();
        var mesh = this.result.createMesh(numPoints);
        var texCoordSetIndex = 0;
        var noScale = [ 1, 1, 1 ];
        var flipScale = [ 1, 1, 1 ];
        if (this.flipX) flipScale[0] = -1;
        while (this.view.tell() < meshNode.end()) {
            var node = this.parseNodeHeader();
            if (!this.hasDataForNode(node)) return this.error("Not enough data for node '" + DataParserTypes.getName(node.id) + "'");
            switch (node.id) {
              case DataParserTypes.NODE_MATERIAL_REFERENCE:
                if (node.length < 4) return this.errorExpect(4, "mesh.material_reference");
                mesh.material = this.getUint32();
                break;

              case DataParserTypes.NODE_VERTICES:
                if (!this.parseVertices(node, numPoints, mesh.vertices, "position", flipScale)) return false;
                break;

              case DataParserTypes.NODE_NORMALS:
                if (!this.parseVertices(node, numPoints, mesh.vertices, "normal", noScale)) return false;
                break;

              case DataParserTypes.NODE_TANGENTS:
                if (!this.parseVertices(node, numPoints, mesh.vertices, "tangent", noScale)) return false;
                break;

              case DataParserTypes.NODE_BITANGENTS:
                if (!this.parseVertices(node, numPoints, mesh.vertices, "bitangent", noScale)) return false;
                break;

              case DataParserTypes.NODE_TEXTURE_COORDINATES:
                if (node.length < 4) return this.errorExpect(4, "mesh texture coordinates component count");
                var numComponents = this.getUint32();
                if (numComponents == 0 || numComponents > 3) return this.error("Unsupported number of texture coordinate components: " + numComponents);
                if (node.length - 4 != numComponents * numPoints * 4) return this.error("Texture coordinate set " + texCoordSetIndex + " is corrupted");
                var labels = [ "x", "y", "z" ];
                for (var i = 0; i < numPoints; i++) {
                    var texCoord = {};
                    for (var j = 0; j < numComponents; j++) {
                        texCoord[labels[j]] = this.getFloat32();
                    }
                    mesh.vertices[i].texCoord.push(texCoord);
                }
                texCoordSetIndex++;
                break;

              case DataParserTypes.NODE_FACES:
                if (!this.parseFaces(node, mesh.indices)) return false;
                break;

              default:
                this.skipNode(node);
            }
        }
        this.result.addMesh(mesh);
        this.pop();
        return true;
    },
    parseVertices: function(node, count, buffer, component, staticScale) {
        if (node.length != count * 12) return this.error("Node " + DataParserTypes.getName(node.id) + " is corrupted");
        for (var i = 0; i < count; i++) {
            buffer[i][component].x = staticScale[0] * this.getFloat32();
            buffer[i][component].y = staticScale[1] * this.getFloat32();
            buffer[i][component].z = staticScale[2] * this.getFloat32();
        }
        return true;
    },
    parseFaces: function(facesNode, buffer) {
        if (facesNode.length < 4) return this.errorExpect(4, "faces.num_triangles");
        var numTriangles = this.getUint32();
        if (facesNode.length - 4 != numTriangles * 12) return this.error("Faces list is corrupted");
        for (var i = 0; i < numTriangles; i++) {
            buffer.push(this.getUint32());
            buffer.push(this.getUint32());
            buffer.push(this.getUint32());
        }
        return true;
    },
    parseScene: function(sceneNode) {
        if (!this.hasDataForNode(sceneNode)) return this.error("Not enough data for node '" + DataParserTypes.getName(sceneNode.id) + "'");
        while (this.view.tell() < sceneNode.end()) {
            var node = this.parseNodeHeader();
            if (node.id == DataParserTypes.NODE_GROUP) {
                if (!this.parseGroup(node, false)) return false;
            } else this.skipNode(node);
        }
        this.pop();
        return true;
    },
    parseGroup: function(groupNode, parent) {
        if (!this.hasDataForNode(groupNode)) return this.error("Not enough data for node '" + DataParserTypes.getName(groupNode.id) + "'");
        var group = this.result.createGroup();
        if (parent === false) this.result.setRoot(group); else {
            parent.children.push(group);
            group.parent = parent;
        }
        while (this.view.tell() < groupNode.end()) {
            var node = this.parseNodeHeader();
            if (!this.hasDataForNode(node)) return this.error("Not enough data for node '" + DataParserTypes.getName(node.id) + "'");
            switch (node.id) {
              case DataParserTypes.NODE_GROUP_ID:
                if (node.length < 4) return this.error("Group ID is corrupted");
                group.id = this.getUint32();
                this.result.mapGroupID(group);
                break;

              case DataParserTypes.NODE_STRING:
                group.name = this.view.getString(node.length);
                break;

              case DataParserTypes.NODE_TRANSFORM_POSITION:
                if (node.length != 12) return this.error("Group position is corrupted");
                group.position.x = this.getFloat32();
                group.position.y = this.getFloat32();
                group.position.z = this.getFloat32();
                break;

              case DataParserTypes.NODE_TRANSFORM_ROTATION:
                if (node.length != 16) return this.error("Group rotation is corrupted");
                group.rotation.x = this.getFloat32();
                group.rotation.y = this.getFloat32();
                group.rotation.z = this.getFloat32();
                group.rotation.w = this.getFloat32();
                break;

              case DataParserTypes.NODE_TRANSFORM_SCALE:
                if (node.length != 12) return this.error("Group scale is corrupted");
                group.scale.x = this.getFloat32();
                group.scale.y = this.getFloat32();
                group.scale.z = this.getFloat32();
                break;

              case DataParserTypes.NODE_MATRIX4X4:
                if (node.length != 64) return this.error("Group transformation matrix is corrupted");
                group.transform = this.getMatrix4x4();
                break;

              case DataParserTypes.NODE_MESH_REFERENCE:
                if (node.length < 4) return this.error("Group mesh reference is corrupted");
                group.meshes.push(this.getUint32());
                break;

              case DataParserTypes.NODE_GROUP:
                this.parseGroup(node, group);
                break;

              default:
                this.skipNode(node);
            }
        }
        return true;
    },
    parseCollision: function(collisionNode) {
        if (!this.hasDataForNode(collisionNode)) return this.error("Not enough data for node '" + DataParserTypes.getName(collisionNode.id) + "'");
        while (this.view.tell() < collisionNode.end()) {
            var node = this.parseNodeHeader();
            if (node.id == DataParserTypes.NODE_COLLISION_NODE) {
                if (!this.parseCollisionNode(node, false)) return false;
            } else this.skipNode(node);
        }
        this.pop();
        return true;
    },
    parseCollisionNode: function(node, parent) {
        if (!this.hasDataForNode(node)) return this.error("Not enough data for node '" + DataParserTypes.getName(node.id) + "'");
        var collisionTreeNode = this.result.createCollisionTreeNode();
        if (parent === false) this.result.setCollisionTreeRoot(collisionTreeNode); else {
            parent.children.push(collisionTreeNode);
            collisionTreeNode.parent = parent;
        }
        while (this.view.tell() < node.end()) {
            var child = this.parseNodeHeader();
            if (!this.hasDataForNode(child)) return this.error("Not enough data for node '" + DataParserTypes.getName(child.id) + "'");
            switch (child.id) {
              case DataParserTypes.NODE_COLLISION_AABB_CENTER:
                if (child.length != 12) return this.error("Collision node center is corrupted");
                collisionTreeNode.center.x = this.getFloat32();
                collisionTreeNode.center.y = this.getFloat32();
                collisionTreeNode.center.z = this.getFloat32();
                break;

              case DataParserTypes.NODE_COLLISION_AABB_EXTENTS:
                if (child.length != 12) return this.error("Collision node extents are corrupted");
                collisionTreeNode.extents.x = this.getFloat32();
                collisionTreeNode.extents.y = this.getFloat32();
                collisionTreeNode.extents.z = this.getFloat32();
                break;

              case DataParserTypes.NODE_COLLISION_NODE:
                this.parseCollisionNode(child, collisionTreeNode);
                break;

              case DataParserTypes.NODE_COLLISION_FACE_LIST:
                this.parseCollisionFaceList(child, collisionTreeNode);
                break;

              default:
                this.skipNode(child);
            }
        }
        return true;
    },
    parseCollisionFaceList: function(node, collisionTreeNode) {
        if (!this.hasDataForNode(node)) return this.error("Not enough data for node '" + DataParserTypes.getName(node.id) + "'");
        var nodeID = -1;
        var meshID = -1;
        var indices = [];
        while (this.view.tell() < node.end()) {
            var child = this.parseNodeHeader();
            if (!this.hasDataForNode(child)) return this.error("Not enough data for node '" + DataParserTypes.getName(child.id) + "'");
            switch (child.id) {
              case DataParserTypes.NODE_FACE_LIST_NODE_ID:
                if (child.length != 4) return this.error("Face list node ID is corrupted");
                nodeID = this.getUint32();
                break;

              case DataParserTypes.NODE_FACE_LIST_MESH_REFERENCE:
                if (child.length != 4) return this.error("Face list mesh ID is corrupted");
                meshID = this.getUint32();
                break;

              case DataParserTypes.NODE_FACE_LIST_INDICES:
                while (this.view.tell() < child.end()) indices.push(this.getUint32());
                break;

              default:
                this.skipNode(child);
            }
        }
        return this.result.addFaceList(collisionTreeNode, nodeID, meshID, indices);
    },
    parseRoot: function(root) {
        if (!this.hasDataForNode(root)) return this.error("Not enough data for node '" + DataParserTypes.getName(root.id) + "'");
        if (this.view.tell() >= root.end()) return true;
        var node = this.parseNodeHeader();
        switch (node.id) {
          case DataParserTypes.NODE_MATERIALS:
            this.push(node, this.parseMaterials);
            break;

          case DataParserTypes.NODE_GEOMETRY:
            this.push(node, this.parseGeometry);
            break;

          case DataParserTypes.NODE_SCENE:
            this.push(node, this.parseScene);
            break;

          case DataParserTypes.NODE_COLLISION:
            this.push(node, this.parseCollision);
            break;

          default:
            this.skipNode(node);
            break;
        }
        return true;
    }
});

var ThreadedDataParser = DataParser.extend({
    init: function(data, cbOnComplete, cbOnError, cbOnProgress, userdata) {
        this._super(data, cbOnComplete, cbOnError, cbOnProgress, userdata);
        this.timer = false;
        this.inverval = 10;
    },
    parse: function() {
        this.push(false, this.parseHeader);
        this.timer = setTimeout(FrakCallback(this, this.threadStep), this.inverval);
        return true;
    },
    threadStep: function() {
        if (this.completed()) {
            if (this.linkReferences) this.result.linkReferences();
            if (this.isFunction(this.onComplete)) this.onComplete(this.result.getData(), this.userdata);
            return;
        }
        if (!this.step()) {
            if (this.onError && typeof this.onError === "function") this.onError(this.errors, this.userdata);
            return;
        }
        this.timer = setTimeout(FrakCallback(this, this.threadStep), this.inverval);
    }
});

var ModelLoader = FrakClass.extend({
    init: function(context, descriptor, shadersManager, texturesManager) {
        this.descriptor = descriptor;
        this.shadersManager = shadersManager;
        this.texturesManager = texturesManager;
        this.defaultTexture = false;
        this.defaultSampler = false;
        this.nodesByID = {};
        this.submeshesByID = {};
        this.submeshes = [];
    },
    createDefaultTextureSampler: function(context) {
        if (this.defaultTexture) return;
        if (!context.engine) return;
        this.defaultTexture = context.engine.WhiteTexture;
        this.defaultSampler = new Sampler("diffuse0", this.defaultTexture);
    },
    load: function(node, parsedData) {
        node.name = parsedData.hierarchy.name;
        this.loadMaterials(parsedData.materials);
        this.loadSubmeshes(parsedData.meshes);
        this.loadNode(node, parsedData.hierarchy);
        this.loadCollision(node, parsedData);
    },
    loadMaterials: function(parsedMaterials) {
        for (var i = 0; i < parsedMaterials.length; i++) {
            var material = parsedMaterials[i];
            material.instance = new Material();
            this.loadMaterial(material.instance, material);
        }
    },
    loadSubmeshes: function(parsedMeshes) {
        for (var i = 0; i < parsedMeshes.length; i++) {
            var submesh = new Submesh();
            this.loadSubmesh(submesh, parsedMeshes[i]);
            this.submeshesByID[parsedMeshes[i].index] = {
                submesh: submesh,
                material: parsedMeshes[i].material.instance
            };
        }
    },
    loadNode: function(node, parsedNode) {
        node.localCollisionID = parsedNode.id;
        this.nodesByID[node.localCollisionID] = node;
        this.loadTransform(node.transform, parsedNode.transform);
        this.loadMesh(node, parsedNode.meshes);
        for (var child in parsedNode.children) {
            var childNode = new Node(parsedNode.children[child].name);
            this.loadNode(childNode, parsedNode.children[child]);
            node.addNode(childNode);
        }
    },
    loadMesh: function(node, parsedMeshes) {
        if (!parsedMeshes || parsedMeshes.length == 0) return;
        var mesh = new Mesh();
        for (var i in parsedMeshes) {
            if (parsedMeshes[i].index in this.submeshesByID) {
                var o = this.submeshesByID[parsedMeshes[i].index];
                mesh.addSubmesh(o.submesh, o.material);
            }
        }
        node.addComponent(new MeshComponent(mesh));
        node.addComponent(new MeshRendererComponent());
    },
    loadSubmesh: function(submesh, parsedSubmesh) {
        submesh.faces = parsedSubmesh.indices;
        if (parsedSubmesh.vertices.length == 0) return;
        var vertex = parsedSubmesh.vertices[0];
        submesh.positions = this.loadSubmeshBuffer("position", parsedSubmesh.vertices, [ "x", "y", "z" ]);
        if (vertex.normal) submesh.normals = this.loadSubmeshBuffer("normal", parsedSubmesh.vertices, [ "x", "y", "z" ]);
        if (vertex.tangent) submesh.tangents = this.loadSubmeshBuffer("tangent", parsedSubmesh.vertices, [ "x", "y", "z" ]);
        if (vertex.bitangent) submesh.bitangents = this.loadSubmeshBuffer("bitangent", parsedSubmesh.vertices, [ "x", "y", "z" ]);
        if (vertex.texCoord) {
            for (var texCoordIndex in vertex.texCoord) {
                submesh.texCoords2D.push(this.loadSubmeshIndexedBuffer("texCoord", parsedSubmesh.vertices, [ "x", "y" ], texCoordIndex));
            }
        }
        submesh.recalculateBounds();
    },
    loadSubmeshBuffer: function(vertexAttribute, vertices, attributeParameters) {
        buffer = [];
        for (var i in vertices) {
            vertex = vertices[i];
            for (var i in attributeParameters) {
                var attributeParameter = attributeParameters[i];
                buffer.push(vertex[vertexAttribute][attributeParameter]);
            }
        }
        return buffer;
    },
    loadSubmeshIndexedBuffer: function(vertexAttribute, vertices, attributeParameters, attributeIndex) {
        buffer = [];
        for (var i in vertices) {
            vertex = vertices[i];
            for (var i in attributeParameters) {
                var attributeParameter = attributeParameters[i];
                buffer.push(vertex[vertexAttribute][attributeIndex][attributeParameter]);
            }
        }
        return buffer;
    },
    loadMaterial: function(material, parsedMaterial) {
        material.name = parsedMaterial.name;
        material.shader = this.shadersManager.addSource(parsedMaterial.shader);
        material.uniforms = {};
        this.loadUniforms(material.uniforms, parsedMaterial);
        for (var textureType in parsedMaterial.textures) {
            var textures = parsedMaterial.textures[textureType];
            for (var i = 0; i < textures.length; i++) {
                var textureDescriptor = new TextureDescriptor(textures[i].path);
                textureDescriptor.parentDescriptor = this.descriptor;
                var texture = this.texturesManager.addDescriptor(textureDescriptor);
                if (!material.samplers) material.samplers = [];
                material.samplers.push(new Sampler(textureType + i, texture));
                if (textureType == "normal") {
                    material.shader = this.shadersManager.addSource("normalmapped");
                }
            }
        }
        if (!material.samplers && parsedMaterial.shader.toLowerCase() == "diffuse") {
            material.samplers = [];
            this.createDefaultTextureSampler(this.texturesManager.context);
            material.samplers.push(this.defaultSampler);
        }
    },
    loadUniforms: function(uniforms, parsedMaterial) {
        if (parsedMaterial.color.ambient) uniforms["ambient"] = new UniformColor(parsedMaterial.color.ambient); else uniforms["ambient"] = new UniformColor(new Color(.2, .2, .2, 1));
        if (parsedMaterial.color.diffuse) uniforms["diffuse"] = new UniformColor(parsedMaterial.color.diffuse); else uniforms["diffuse"] = new UniformColor(new Color(1, 1, 1, 1));
        if (parsedMaterial.color.emissive) uniforms["emissive"] = new UniformColor(parsedMaterial.color.emissive);
        if (parsedMaterial.color.specular) uniforms["specular"] = new UniformColor(parsedMaterial.color.specular);
        uniforms["twosided"] = new UniformInt(parsedMaterial.twosided + 0);
    },
    loadTransform: function(transform, parsedTransform) {
        transform.relative[0] = parsedTransform[0][0];
        transform.relative[4] = parsedTransform[0][1];
        transform.relative[8] = parsedTransform[0][2];
        transform.relative[12] = parsedTransform[0][3];
        transform.relative[1] = parsedTransform[1][0];
        transform.relative[5] = parsedTransform[1][1];
        transform.relative[9] = parsedTransform[1][2];
        transform.relative[13] = parsedTransform[1][3];
        transform.relative[2] = parsedTransform[2][0];
        transform.relative[6] = parsedTransform[2][1];
        transform.relative[10] = parsedTransform[2][2];
        transform.relative[14] = parsedTransform[2][3];
        transform.relative[3] = parsedTransform[3][0];
        transform.relative[7] = parsedTransform[3][1];
        transform.relative[11] = parsedTransform[3][2];
        transform.relative[15] = parsedTransform[3][3];
    },
    loadCollisionNodeParameters: function(parsedNode, parentCollisionNode) {
        var n = new CollisionOctreeNode([ parsedNode.center.x, parsedNode.center.y, parsedNode.center.z ], parsedNode.extents.x * 2, parentCollisionNode);
        if (parsedNode.faces) n.faces = parsedNode.faces;
        return n;
    },
    loadCollisionNodeSubnodes: function(collisionNode, parsedNode, parsedData) {
        if (parsedNode.children.length == 0) return;
        collisionNode.subnodes = [];
        for (var i = 0; i < 8; i++) {
            var subnode = this.loadCollisionNodeParameters(parsedNode.children[i], collisionNode);
            collisionNode.subnodes.push(subnode);
            this.loadCollisionNodeSubnodes(subnode, parsedNode.children[i], parsedData);
        }
    },
    loadCollision: function(rootNode, parsedData) {
        if (parsedData.collision === false) return;
        var lmc = rootNode.addComponent(new LargeMeshCollider());
        lmc.tree = this.loadCollisionNodeParameters(parsedData.collision, false);
        lmc.tree.nodes = this.nodesByID;
        lmc.tree.submeshes = {};
        for (var mesh_id in this.submeshesByID) lmc.tree.submeshes[mesh_id] = this.submeshesByID[mesh_id].submesh;
        this.loadCollisionNodeSubnodes(lmc.tree, parsedData.collision, parsedData);
    }
});

var ModelLoaderJSON = FrakClass.extend({
    init: function(context, descriptor, shadersManager, texturesManager) {
        this.descriptor = descriptor;
        this.shadersManager = shadersManager;
        this.texturesManager = texturesManager;
        this.defaultTexture = false;
        this.defaultSampler = false;
        this.nodesByID = {};
        this.submeshesByID = {};
        this.submeshes = [];
        this.textureUniformMap = {
            texturesDiffuse: "diffuse",
            texturesNormals: "normal"
        };
    },
    createDefaultTextureSampler: function(context) {
        if (this.defaultTexture) return;
        if (!context.engine) return;
        this.defaultTexture = context.engine.WhiteTexture;
        this.defaultSampler = new Sampler("diffuse0", this.defaultTexture);
    },
    load: function(node, parsedData) {
        if (FRAK.isEmptyObject(parsedData)) return;
        node.name = parsedData.scene.name;
        this.linkReferences(parsedData);
        this.loadMaterials(parsedData.materials);
        this.loadSubmeshes(parsedData.meshes);
        this.loadNode(node, parsedData.scene);
        this.loadCollision(node, parsedData);
    },
    linkReferences: function(data) {
        var mesh;
        var matLen = data.materials.length;
        for (var i = 0, l = data.meshes.length; i < l; i++) {
            mesh = data.meshes[i];
            if (mesh.materialIndex >= 0 && mesh.materialIndex < matLen) mesh.material = data.materials[mesh.materialIndex];
        }
    },
    loadMaterials: function(parsedMaterials) {
        var material;
        for (var i = 0, l = parsedMaterials.length; i < l; i++) {
            material = parsedMaterials[i];
            material.instance = new Material();
            this.loadMaterial(material.instance, material);
        }
    },
    loadMaterial: function(material, parsedMaterial) {
        var shaderName = parsedMaterial.shader || "diffuse";
        material.name = parsedMaterial.name;
        material.shader = this.shadersManager.addSource(shaderName);
        if (shaderName.toLowerCase() == "transparent") {
            material.shader.requirements.transparent = true;
        }
        material.uniforms = {};
        this.loadUniforms(material.uniforms, parsedMaterial);
        for (var textureType in parsedMaterial.textures) {
            var textures = parsedMaterial.textures[textureType];
            for (var i = 0; i < textures.length; i++) {
                var textureDescriptor = new TextureDescriptor(textures[i]);
                textureDescriptor.parentDescriptor = this.descriptor;
                var texture = this.texturesManager.addDescriptor(textureDescriptor);
                var samplerName = "diffuse";
                if (textureType in this.textureUniformMap) samplerName = this.textureUniformMap[textureType];
                if (!material.samplers) material.samplers = [];
                material.samplers.push(new Sampler(samplerName + i, texture));
                if (textureType == "texturesNormals") {
                    material.shader = this.shadersManager.addSource("normalmapped");
                }
            }
        }
        if (!material.samplers && shaderName.toLowerCase() == "diffuse") {
            material.samplers = [];
            this.createDefaultTextureSampler(this.texturesManager.context);
            material.samplers.push(this.defaultSampler);
        }
    },
    loadUniforms: function(uniforms, parsedMaterial) {
        if (parsedMaterial.color.ambient) uniforms["ambient"] = new UniformColor(parsedMaterial.color.ambient); else uniforms["ambient"] = new UniformColor(new Color(.2, .2, .2, 1));
        if (parsedMaterial.color.diffuse) uniforms["diffuse"] = new UniformColor(parsedMaterial.color.diffuse); else uniforms["diffuse"] = new UniformColor(new Color(1, 1, 1, 1));
        if (parsedMaterial.color.emissive) uniforms["emissive"] = new UniformColor(parsedMaterial.color.emissive);
        if (parsedMaterial.color.specular) uniforms["specular"] = new UniformColor(parsedMaterial.color.specular);
        uniforms["twosided"] = new UniformInt(parsedMaterial.twosided + 0);
    },
    loadSubmeshes: function(meshes) {
        var mesh;
        for (var i = 0, l = meshes.length; i < l; i++) {
            var mesh = meshes[i];
            var submesh = new Submesh();
            this.loadSubmesh(submesh, mesh);
            this.submeshesByID[i] = {
                submesh: submesh,
                material: mesh.material.instance
            };
        }
    },
    loadSubmesh: function(submesh, parsedSubmesh) {
        if (!parsedSubmesh.faces || parsedSubmesh.faces.length == 0) return;
        if (!parsedSubmesh.vertices || parsedSubmesh.vertices.length == 0) return;
        submesh.faces = parsedSubmesh.faces;
        submesh.positions = parsedSubmesh.vertices;
        var _parsedSubMesh;
        var pointCount = parsedSubmesh.vertices.length / 3;
        if (parsedSubmesh.normals && parsedSubmesh.normals.length / 3 == pointCount) submesh.normals = parsedSubmesh.normals;
        if (parsedSubmesh.tangents && parsedSubmesh.tangents.length / 3 == pointCount) submesh.tangents = parsedSubmesh.tangents;
        if (parsedSubmesh.bitangents && parsedSubmesh.bitangents.length / 3 == pointCount) submesh.bitangents = parsedSubmesh.bitangents;
        if (parsedSubmesh.texCoords1D) {
            for (var i = 0, l = parsedSubmesh.texCoords1D.length; i < l; i++) {
                _parsedSubMesh = parsedSubmesh.texCoords1D[i];
                if (_parsedSubMesh.length == pointCount) submesh.texCoords1D.push(_parsedSubMesh);
            }
        }
        if (parsedSubmesh.texCoords2D) {
            for (var i = 0, l1 = parsedSubmesh.texCoords2D.length; i < l1; i++) {
                _parsedSubMesh = parsedSubmesh.texCoords2D[i];
                if (_parsedSubMesh.length / 2 == pointCount) {
                    submesh.texCoords2D.push(_parsedSubMesh);
                }
            }
        } else {
            if (parsedSubmesh.texCoords3D) {
                var texCoords;
                for (var i = 0, l2 = parsedSubmesh.texCoords3D.length; i < l2; i++) {
                    _parsedSubMesh = parsedSubmesh.texCoords3D[i];
                    if (_parsedSubMesh.length / 3 !== pointCount) continue;
                    var texCoords2D = [];
                    for (var j = 0; j < _parsedSubMesh.length; j += 3) {
                        texCoords2D.push(_parsedSubMesh[j]);
                        texCoords2D.push(_parsedSubMesh[j + 1]);
                    }
                    submesh.texCoords2D.push(_parsedSubMesh);
                    submesh.yesIGeneratedThese = true;
                }
            }
        }
        if (parsedSubmesh.texCoords3D) {
            for (var i = 0, l3 = parsedSubmesh.texCoords3D.length; i < l3; i++) {
                _parsedSubMesh = parsedSubmesh.texCoords3D[i];
                if (_parsedSubMesh.length / 3 == pointCount) {
                    submesh.texCoords3D.push(_parsedSubMesh);
                }
            }
        }
        if (parsedSubmesh.texCoords4D) {
            for (var i = 0, l4 = parsedSubmesh.texCoords4D.length; i < l4; i++) {
                _parsedSubMesh = parsedSubmesh.texCoords4D[i];
                if (_parsedSubMesh.length / 4 == pointCount) {
                    submesh.texCoords4D.push(_parsedSubMesh);
                }
            }
        }
        submesh.recalculateBounds();
    },
    loadNode: function(node, parsedNode) {
        node.localCollisionID = parsedNode.id;
        this.nodesByID[node.localCollisionID] = node;
        node.transform.relative = parsedNode.relative;
        this.loadMesh(node, parsedNode.meshes);
        var _subnode;
        for (var i = 0, l = parsedNode.subnodes.length; i < l; i++) {
            _subnode = parsedNode.subnodes[i];
            var subnode = new Node(_subnode.name);
            this.loadNode(subnode, _subnode);
            node.addNode(subnode);
        }
    },
    loadMesh: function(node, meshes) {
        if (!meshes || meshes.length == 0) return;
        var mesh = new Mesh();
        for (var i = 0; i < meshes.length; i++) {
            var meshIndex = meshes[i];
            if (!(meshIndex in this.submeshesByID)) {
                continue;
            }
            var o = this.submeshesByID[meshIndex];
            mesh.addSubmesh(o.submesh, o.material);
        }
        node.addComponent(new MeshComponent(mesh));
        node.addComponent(new MeshRendererComponent());
    },
    loadCollisionNodeParameters: function(parsedNode, parentCollisionNode) {
        var n = new CollisionOctreeNode(new Float32Array(parsedNode.center), parsedNode.extents[0] * 2, parentCollisionNode);
        if (parsedNode.faces) n.faces = parsedNode.faces;
        return n;
    },
    loadCollisionNodeSubnodes: function(collisionNode, parsedNode, parsedData) {
        if (!parsedNode.subnodes || parsedNode.subnodes.length != 8) return;
        collisionNode.subnodes = [];
        for (var i = 0; i < 8; i++) {
            var subnode = this.loadCollisionNodeParameters(parsedNode.subnodes[i], collisionNode);
            collisionNode.subnodes.push(subnode);
            this.loadCollisionNodeSubnodes(subnode, parsedNode.subnodes[i], parsedData);
        }
    },
    loadCollision: function(rootNode, parsedData) {
        if (!parsedData.collision) return;
        var lmc = rootNode.addComponent(new LargeMeshCollider());
        lmc.tree = this.loadCollisionNodeParameters(parsedData.collision, false);
        lmc.tree.nodes = this.nodesByID;
        lmc.tree.submeshes = {};
        for (var mesh_id in this.submeshesByID) lmc.tree.submeshes[mesh_id] = this.submeshesByID[mesh_id].submesh;
        this.loadCollisionNodeSubnodes(lmc.tree, parsedData.collision, parsedData);
    }
});

var ModelLoaderGLTF = FrakClass.extend({
    init: function(context, descriptor, shadersManager, texturesManager, format) {
        this.descriptor = descriptor;
        this.shadersManager = shadersManager;
        this.texturesManager = texturesManager;
        this.nodesByID = {};
        this.submeshesByID = {};
        this.submeshes = [];
        this.textureUniformMap = {
            texturesDiffuse: "diffuse",
            texturesNormals: "normal"
        };
        this.binary = format === "glb";
        this.binaryBuffer = false;
        this.buffers = [];
        this.bufferViews = [];
        this.accessors = [];
        this.images = [];
        this.samplers = [];
        this.textures = [];
        this.materials = [];
        this.meshes = [];
    },
    createDefaultTextureSampler: function(context) {
        if (!context.engine) {
            return;
        }
        this.defaultTexture = context.engine.WhiteTexture;
        return new Sampler("diffuse0", this.defaultTexture);
    },
    load: function(node, data, cb) {
        var parsedData;
        if (!this.binary) {
            parsedData = data;
        } else {
            var view = new DataView(data);
            if (view.getUint32(0, true) === 1179937895 && view.getUint32(4, true) === 2 && view.getUint32(8, true) === data.byteLength) {
                parsedData = this.parseJSON(view);
                this.binaryBuffer = this.parseBinaryBuffer(view);
            } else {
                throw "Invalid data";
            }
        }
        if (FRAK.isEmptyObject(parsedData) || FRAK.isEmptyObject(parsedData.asset) || parsedData.asset.version[0] !== "2") {
            return;
        }
        var scope = this;
        this.loadBuffers(parsedData.buffers, function() {
            scope.loadBufferViews(parsedData.bufferViews || []);
            scope.loadAccessors(parsedData.accessors || []);
            scope.loadImages(parsedData.images || []);
            scope.loadSamplers(parsedData.samplers || []);
            scope.loadTextures(parsedData.textures || []);
            scope.loadMaterials(parsedData.materials || []);
            scope.loadMeshes(parsedData.meshes);
            scope.loadScene(node, parsedData);
            cb();
        });
    },
    parseJSON: function(view) {
        var length = view.getUint32(12, true);
        if (view.getUint32(16, true) !== 1313821514) {
            throw "Invalid JSON data";
        }
        var data = new Uint8Array(view.buffer, 20, length);
        var str = "";
        for (var i = 0; i < length; i++) {
            str += String.fromCodePoint(data[i]);
        }
        return JSON.parse(str);
    },
    parseBinaryBuffer: function(view) {
        var jsonLength = view.getUint32(12, true);
        if (20 + jsonLength === view.byteLength) {
            return;
        } else {
            var length = view.getUint32(20 + jsonLength, true);
            if (28 + jsonLength + length !== view.byteLength) {
                return;
            }
            if (view.getUint32(24 + jsonLength, true) !== 5130562) {
                throw "Invalid binary data";
            }
            return view.buffer.slice(28 + jsonLength, 28 + jsonLength + length);
        }
    },
    loadBuffers: function(buffers, cb) {
        var count = 0;
        for (var i = 0, l = buffers.length; i < l; i++) {
            count++;
            var byteLength = buffers[i].byteLength;
            var buffer = {
                length: byteLength
            };
            this.buffers.push(buffer);
            if (!buffers[i].uri) {
                buffer.data = this.binaryBuffer;
                count--;
                continue;
            }
            Logistics.getBinary(buffers[i].uri, function(binaryData) {
                count--;
                if (!binaryData || binaryData.byteLength !== byteLength) {
                    return;
                }
                buffer.data = binaryData;
                if (count === 0) {
                    cb();
                }
            });
        }
        if (count === 0) {
            cb();
        }
    },
    loadBufferViews: function(bufferViews) {
        for (var i = 0, l = bufferViews.length; i < l; i++) {
            var view = bufferViews[i];
            var buffer = this.buffers[view.buffer];
            this.bufferViews.push(new DataView(buffer.data, view.byteOffset || 0, view.byteLength || buffer.length));
        }
    },
    loadAccessors: function(accessors) {
        for (var i = 0, l = accessors.length; i < l; i++) {
            var accessor;
            var view = this.bufferViews[accessors[i].bufferView];
            var itemCount;
            switch (accessors[i].type) {
              case "VEC2":
                itemCount = 2;
                break;

              case "VEC3":
                itemCount = 3;
                break;

              case "VEC4":
                itemCount = 4;
                break;

              case "MAT2":
                itemCount = 4;
                break;

              case "MAT3":
                itemCount = 9;
                break;

              case "MAT4":
                itemCount = 16;
                break;

              default:
                itemCount = 1;
            }
            var arrays = [ Int8Array, Uint8Array, Int16Array, Uint16Array, undefined, Uint32Array, Float32Array ];
            accessor = new arrays[accessors[i].componentType - 5120](view.buffer, view.byteOffset + (accessors[i].byteOffset || 0), accessors[i].count * itemCount);
            this.accessors.push(accessor);
        }
    },
    defaultMaterial: function() {
        var defaultSampler = this.createDefaultTextureSampler(this.shadersManager.context);
        return new Material(this.shadersManager.addSource("pbr"), {}, [ defaultSampler ]);
    },
    loadImages: function(images) {
        for (var i = 0, l = images.length; i < l; i++) {
            var uri;
            if (images[i].uri) {
                uri = images[i].uri;
            } else if (!isNaN(parseInt(images[i].bufferView)) && images[i].mimeType) {
                var blob = new Blob([ this.bufferViews[images[i].bufferView] ], {
                    type: images[i].mimeType
                });
                uri = URL.createObjectURL(blob);
            }
            if (uri) {
                var notRelative = new RegExp("^//|(?:[a-z]+:)", "i");
                var locked = false;
                if (notRelative.test(uri)) {
                    locked = true;
                }
                this.images.push({
                    locked: locked,
                    uri: uri
                });
            }
        }
    },
    loadSamplers: function(samplers) {
        this.samplers = samplers.slice();
    },
    loadTextures: function(textures) {
        for (var i = 0, l = textures.length; i < l; i++) {
            var texture = textures[i];
            if (isNaN(parseInt(texture.source))) {
                continue;
            }
            var descriptorImage = this.images[texture.source];
            var descriptor = new TextureDescriptor(descriptorImage.uri);
            descriptor.locked = descriptorImage.locked;
            descriptor.glTFID = i;
            var image = this.texturesManager.addDescriptor(descriptor);
            image.flipY = false;
            if (!isNaN(parseInt(texture.sampler))) {
                var sampler = this.samplers[texture.sampler];
                if (!isNaN(parseInt(sampler.wrapS))) {
                    if (sampler.wrapS === 33071) {
                        image.wrapS = "clamp";
                    } else if (sampler.wrapS === 33648) {
                        image.wrapS = "mirror";
                    }
                }
                if (!isNaN(parseInt(sampler.wrapT))) {
                    if (sampler.wrapT === 33071) {
                        image.wrapT = "clamp";
                    } else if (sampler.wrapT === 33648) {
                        image.wrapT = "mirror";
                    }
                }
            }
            this.textures.push(image);
        }
    },
    loadMaterials: function(materials) {
        for (var i = 0, l = materials.length; i < l; i++) {
            var material = this.defaultMaterial();
            if (materials[i].name) {
                material.name = materials[i].name;
            }
            if (materials[i].alphaMode === "BLEND") {
                material.shader = this.shadersManager.addSource("transparent");
                material.shader.requirements.transparent = true;
            }
            var diffuse = new Color();
            var metalness = 1;
            var roughness = 1;
            if (materials[i].pbrMetallicRoughness) {
                var bcf = materials[i].pbrMetallicRoughness.baseColorFactor;
                if (bcf) {
                    diffuse.set(bcf[0], bcf[1], bcf[2], bcf[3]);
                }
                var metallicFactor = materials[i].pbrMetallicRoughness.metallicFactor;
                if (!isNaN(parseFloat(metallicFactor))) {
                    metalness = metallicFactor;
                }
                var roughnessFactor = materials[i].pbrMetallicRoughness.roughnessFactor;
                if (!isNaN(parseFloat(roughnessFactor))) {
                    roughness = roughnessFactor;
                }
                var texture = materials[i].pbrMetallicRoughness.baseColorTexture;
                if (texture) {
                    material.samplers = [ new Sampler("diffuse0", this.textures[texture.index]) ];
                }
                var metallicRoughness = materials[i].pbrMetallicRoughness.metallicRoughnessTexture;
                if (metallicRoughness) {
                    material.samplers.push(new Sampler("metallicRoughness0", this.textures[metallicRoughness.index]));
                } else {
                    var metallicSampler = this.createDefaultTextureSampler(this.shadersManager.context);
                    metallicSampler.name = "metallicRoughness0";
                    material.samplers.push(metallicSampler);
                }
            }
            material.uniforms = {
                diffuse: new UniformColor(diffuse),
                perceptual_roughness: new UniformFloat(roughness),
                metalness: new UniformFloat(metalness)
            };
            if (materials[i].normalTexture) {
                material.samplers.push(new Sampler("normal0", this.textures[materials[i].normalTexture.index]));
            }
            this.materials.push(material);
        }
    },
    loadMeshes: function(meshes) {
        for (var i = 0, l = meshes.length; i < l; i++) {
            var mesh = new Mesh();
            for (var j = 0, m = meshes[i].primitives.length; j < m; j++) {
                var material;
                if (!isNaN(parseInt(meshes[i].primitives[j].material))) {
                    material = this.materials[meshes[i].primitives[j].material];
                } else {
                    material = this.defaultMaterial();
                }
                var submesh = this.loadSubmesh(meshes[i].primitives[j]);
                if (submesh) {
                    mesh.addSubmesh(submesh, material);
                } else {
                    continue;
                }
            }
            this.meshes.push(mesh);
        }
    },
    loadSubmesh: function(primitive) {
        var submesh = new Submesh();
        if (isNaN(parseInt(primitive.indices)) || isNaN(parseInt(primitive.attributes.POSITION))) {
            return;
        }
        submesh.faces = this.accessors[primitive.indices];
        submesh.positions = this.accessors[primitive.attributes.POSITION];
        if (!isNaN(parseInt(primitive.attributes.NORMAL))) {
            submesh.normals = this.accessors[primitive.attributes.NORMAL];
        }
        if (!isNaN(parseInt(primitive.attributes.TEXCOORD_0))) {
            submesh.texCoords2D.push(this.accessors[primitive.attributes.TEXCOORD_0]);
        }
        if (!isNaN(parseInt(primitive.attributes.TANGENT))) {
            submesh.tangents = this.accessors[primitive.attributes.TANGENT].filter(function(_, i) {
                return i % 4 !== 3;
            });
        } else {
            submesh.calculateTangents();
        }
        submesh.recalculateBounds();
        return submesh;
    },
    loadScene: function(node, parsedData) {
        var i;
        if (!parsedData.scenes || isNaN(parseInt(parsedData.scene))) {
            for (i = 0, l = this.meshes.length; i < l; i++) {
                var meshNode = new Node();
                var renderer = new MeshRendererComponent();
                renderer.customShader = true;
                meshNode.addComponent(new MeshComponent(this.meshes[i]));
                meshNode.addComponent(renderer);
                meshNode.addComponent(new MeshCollider());
            }
        } else {
            var scene = parsedData.scenes[parsedData.scene];
            for (i = 0, l = scene.nodes && scene.nodes.length || 0; i < l; i++) {
                node.addNode(this.loadNode(parsedData.nodes, scene.nodes[i]));
            }
        }
    },
    loadNode: function(nodes, index) {
        var node = nodes[index];
        var sceneNode = new Node(node.name);
        var renderer = new MeshRendererComponent();
        renderer.customShader = true;
        if (!isNaN(parseInt(node.mesh))) {
            sceneNode.addComponent(new MeshComponent(this.meshes[node.mesh]));
            sceneNode.addComponent(renderer);
            sceneNode.addComponent(new MeshCollider());
        }
        if (node.matrix) {
            sceneNode.transform.relative = node.matrix;
        } else {
            sceneNode.transform.relative = mat4.fromRotationTranslationScale(mat4.create(), node.rotation || quat.create(), node.translation || vec3.create(), node.scale || vec3.fromValues(1, 1, 1));
        }
        for (var i = 0, l = node.children && node.children.length || 0; i < l; i++) {
            sceneNode.addNode(this.loadNode(nodes, node.children[i]));
        }
        return sceneNode;
    }
});

var Manager = FrakClass.extend({
    init: function(assetsPath) {
        var scope = this;
        this.path = "";
        if (assetsPath) this.path = assetsPath;
        if (this.path.length > 0 && this.path.slice(-1) != "/") this.path += "/";
        this.queue = [];
        this.loading = [];
        this.cache = {};
        this.cacheSize = 0;
        this.callbacks = [];
        this.progressCallbacks = [];
        this.sourceCallback = function(source) {
            return scope.path + source;
        };
        this.descriptorCallback = function(descriptor) {
            return descriptor;
        };
        this.onAddToQueue = function(descriptor) {};
        this.onLoaded = function(descriptor) {};
    },
    getTotalItems: function() {
        return this.queue.length + this.loading.length + this.cacheSize;
    },
    getWaitingItems: function() {
        return this.queue.length + this.loading.length;
    },
    getProgress: function() {
        if (this.getTotalItems() == 0) return 1;
        return 1 - this.getWaitingItems() / this.getTotalItems();
    },
    addDescriptor: function(descriptor) {
        var resource = this.cache[descriptor.serialize([ "id" ])];
        if (resource) {
            return resource;
        }
        resource = this.getLoadingResource(descriptor);
        if (resource) {
            return resource;
        }
        this.onAddToQueue(descriptor);
        resource = this.createResource(descriptor);
        this.queue.push([ descriptor, descriptor.serialize([ "id" ]), resource ]);
        return resource;
    },
    getLoadingResource: function(descriptor) {
        var descriptorString = descriptor.serialize([ "id" ]);
        for (var l in this.loading) {
            if (this.loading[l][1] == descriptorString) return this.loading[l][2];
        }
        for (var q in this.queue) {
            if (this.queue[q][1] == descriptorString) return this.queue[q][2];
        }
        return null;
    },
    removeFromCache: function(descriptor) {
        delete this.cache[descriptor];
        this.cacheSize--;
    },
    cleanCache: function() {
        this.cache = {};
        this.cacheSize = 0;
    },
    load: function(callback, progressCallback) {
        if (progressCallback) {
            this.progressCallbacks.push(progressCallback);
        }
        if (callback) {
            this.callbacks.push(callback);
            if (this.callbacks.length > 1) {
                if (this.queue.length == 0) {
                    this.callDoneCallbacks();
                }
                return;
            }
        }
        this.keepLoading();
    },
    keepLoading: function() {
        for (var i = 0; i < this.progressCallbacks.length; i++) {
            this.progressCallbacks[i](this.getProgress());
        }
        if (this.queue.length == 0) {
            this.callDoneCallbacks();
            return;
        }
        var me = this;
        var next = this.queue.shift();
        this.loading.push(next);
        this.loadResource(next[0], next[2], function(d, r) {
            me.cache[d.serialize([ "id" ])] = r;
            me.cacheSize++;
            me.removeLoadedResource(d);
            me.onLoaded(d);
            me.keepLoading();
        }, function(d) {
            console.warn("Failed to load resource with descriptor: ", d.serialize([ "id" ]));
            me.removeLoadedResource(d);
            me.onLoaded(d);
            if (d.getFullPath) console.warn("Full path: ", d.getFullPath());
            me.keepLoading();
        });
    },
    removeLoadedResource: function(descriptor) {
        for (var i in this.loading) {
            if (this.loading[i][0] === descriptor) {
                this.loading.splice(i, 1);
                break;
            }
        }
    },
    callDoneCallbacks: function() {
        var doneCallbacks = this.callbacks;
        this.callbacks = [];
        for (var c = 0; c < doneCallbacks.length; c++) {
            doneCallbacks[c]();
        }
    },
    createResource: function() {
        throw "createResource not implemented by this instance of Manager";
    },
    loadResource: function(descriptor, resource, loadedCallback, failedCallback) {
        throw "loadResource not implemented by this instance of Manager";
    }
});

var TextManager = Manager.extend({
    init: function(assetsPath) {
        this._super(assetsPath);
    },
    add: function(source) {
        source = this.sourceCallback(source);
        return this.addDescriptor(new TextDescriptor(source));
    },
    createResource: function(textDescriptor) {
        return {
            data: false,
            descriptor: textDescriptor
        };
    },
    loadResource: function(textDescriptor, textResource, loadedCallback, failedCallback) {
        var descriptor = this.descriptorCallback(textDescriptor);
        Logistics.getText(descriptor.getFullPath(), function(data) {
            textResource.data = data;
            loadedCallback(descriptor, textResource);
        }).error(function() {
            failedCallback(descriptor);
        });
    }
});

var ShadersManager = Manager.extend({
    init: function(context, assetsPath) {
        this._super(assetsPath);
        this.sourceCallback = function(source) {
            return source;
        };
        this.context = context;
        this.builtin = {};
        this.shaderBundle = context.isWebGL2() ? "webgl2" : "default";
        if (BuiltInShaders && this.shaderBundle in BuiltInShaders) {
            this.builtin = BuiltInShaders[this.shaderBundle];
        }
        this.setAliases();
        this.textManager = new TextManager();
    },
    setAliases: function() {
        this.aliases = {
            diffuse: this.bundle("diffuse"),
            normalmapped: this.bundle("normalmapped"),
            transparent: this.bundle("transparent"),
            reflective: this.bundle("reflective"),
            reflective_masked: this.bundle("reflective_masked"),
            lines: this.bundle("lines"),
            pbr: this.bundle("pbr"),
            test: this.bundle("test"),
            fallback: this.bundle("fallback"),
            depthrgba: this.bundle("depthrgba"),
            gaussianblur: this.bundle("gaussianblur")
        };
    },
    bundle: function(shaderName) {
        return "shaders/{0}/{1}".format(this.shaderBundle, shaderName);
    },
    add: function(vertexSource, fragmentSource) {
        vertexSource = this.sourceCallback(vertexSource);
        fragmentSource = this.sourceCallback(fragmentSource);
        return this.addDescriptor(new ShaderDescriptor(vertexSource, fragmentSource));
    },
    addSource: function(source) {
        var alias = source.toLowerCase();
        if (alias in this.aliases) source = this.aliases[alias];
        source = this.sourceCallback(source);
        return this.addDescriptor(new ShaderDescriptor(source + ".vert", source + ".frag"));
    },
    createResource: function(shaderDescriptor) {
        return new Shader(this.context, shaderDescriptor);
    },
    loadResource: function(shaderDescriptor, shaderResource, loadedCallback, failedCallback) {
        var descriptor = this.descriptorCallback(shaderDescriptor);
        if (this.builtin[descriptor.vertexSource] && this.builtin[descriptor.fragmentSource]) {
            console.log("Built in shader loaded:", descriptor.vertexSource, descriptor.fragmentSource);
            shaderResource.addVertexShader(this.builtin[descriptor.vertexSource]);
            shaderResource.addFragmentShader(this.builtin[descriptor.fragmentSource]);
            loadedCallback(descriptor, shaderResource);
        } else {
            var vertexShader = this.textManager.add(this.path + descriptor.getVertexShaderPath());
            var fragmentShader = this.textManager.add(this.path + descriptor.getFragmentShaderPath());
            this.textManager.load(function() {
                if (!vertexShader.data) {
                    failedCallback(descriptor);
                    return;
                }
                if (!fragmentShader.data) {
                    failedCallback(descriptor);
                    return;
                }
                shaderResource.addVertexShader(vertexShader.data);
                shaderResource.addFragmentShader(fragmentShader.data);
                loadedCallback(descriptor, shaderResource);
            });
        }
    }
});

var TexturesManager = Manager.extend({
    init: function(context, assetsPath) {
        this._super(assetsPath);
        this.context = context;
    },
    add: function(source) {
        source = this.sourceCallback(source);
        var d = new TextureDescriptor(source);
        return this.addDescriptor(d);
    },
    addCube: function(sources) {
        if (sources.length != 6) throw "TexturesManager.addCube: Cube textures require 6 image URIs";
        var descriptors = [];
        var cube = new CubeTextureDescriptor();
        for (var i = 0; i < sources.length; i++) {
            cube.sources.push(this.sourceCallback(sources[i]));
        }
        return this.addDescriptor(cube);
    },
    createResource: function(textureDescriptor) {
        if (textureDescriptor instanceof CubeTextureDescriptor) {
            var texture = new CubeTexture(this.context);
            texture.name = "Cubemap";
            return texture;
        }
        var texture = new Texture(this.context);
        texture.name = textureDescriptor.source;
        return texture;
    },
    loadResource: function(textureDescriptor, textureResource, loadedCallback, failedCallback) {
        var descriptor = this.descriptorCallback(textureDescriptor);
        var scope = this;
        if (textureDescriptor instanceof CubeTextureDescriptor) {
            var faces = [ CubeTexture.FRONT, CubeTexture.BACK, CubeTexture.LEFT, CubeTexture.RIGHT, CubeTexture.BOTTOM, CubeTexture.TOP ];
            (function next() {
                if (faces.length == 0) {
                    loadedCallback(descriptor, textureResource);
                    return;
                }
                var face = faces.shift();
                Logistics.getImage(descriptor.getFaceFullPath(face), function(image) {
                    textureResource.setFace(scope.context, face, image);
                    delete image;
                    next();
                }).error(function() {
                    failedCallback(descriptor);
                });
            })();
        } else {
            Logistics.getImage(descriptor.getFullPath(), function(image) {
                textureResource.setImage(scope.context, image);
                delete image;
                loadedCallback(descriptor, textureResource);
            }).error(function() {
                failedCallback(descriptor);
            });
        }
    }
});

var MaterialsManager = Manager.extend({
    init: function(context, assetsPath, shadersManager, texturesManager) {
        this._super(assetsPath);
        if (shadersManager && !(shadersManager instanceof ShadersManager)) throw "shadersManager is not instance of ShadersManager";
        if (texturesManager && !(texturesManager instanceof TexturesManager)) throw "texturesManager is not instance of TexturesManager";
        if (!shadersManager) shadersManager = new ShadersManager(context);
        this.shadersManager = shadersManager;
        if (!texturesManager) texturesManager = new TexturesManager(context);
        this.texturesManager = texturesManager;
        this.context = context;
    },
    add: function(source) {
        source = this.sourceCallback(source);
        return this.addDescriptor(new MaterialDescriptor(source));
    },
    createResource: function(materialDescriptor) {
        var material = new Material();
        material.descriptor = materialDescriptor;
        return material;
    },
    loadResource: function(materialDescriptor, material, loadedCallback, failedCallback) {
        var descriptor = this.descriptorCallback(materialDescriptor);
        var scope = this;
        var shader;
        if (descriptor.shaderDescriptor) {
            shader = this.shadersManager.addDescriptor(descriptor.shaderDescriptor);
        }
        this.shadersManager.load(function() {
            var textures = {};
            for (var t in descriptor.textureDescriptors) {
                textures[t] = scope.texturesManager.addDescriptor(descriptor.textureDescriptors[t]);
            }
            scope.texturesManager.load(function() {
                if (!material.samplers) material.samplers = [];
                for (var mt in textures) {
                    material.samplers.push(new Sampler(mt, textures[mt]));
                }
                material.shader = shader;
                material.uniforms = descriptor.uniforms;
                if (descriptor.requirements && material.shader) {
                    material.shader.requirements.transparent = descriptor.requirements.transparent;
                }
                loadedCallback(descriptor, material);
            });
        });
    }
});

var MaterialSourcesManager = Manager.extend({
    init: function(context, assetsPath, materialsManager, textManager) {
        this._super(assetsPath);
        if (materialsManager && !(materialsManager instanceof MaterialsManager)) throw "materialsManager is not instance of MaterialsManager";
        if (textManager && !(textManager instanceof TextManager)) throw "textManager is not instance of TextManager";
        if (!materialsManager) materialsManager = new MaterialsManager(context);
        this.materialsManager = materialsManager;
        if (!textManager) textManager = new TextManager();
        this.textManager = textManager;
        this.context = context;
    },
    add: function(source) {
        source = this.sourceCallback(source);
        return this.addDescriptor(new MaterialSourceDescriptor(source));
    },
    createResource: function(materialSourceDescriptor) {
        return new MaterialSource(materialSourceDescriptor);
    },
    loadResource: function(materialSourceDescriptor, materialSource, loadedCallback, failedCallback) {
        var descriptor = this.descriptorCallback(materialSourceDescriptor);
        var text = this.textManager.add(descriptor.getFullPath());
        var scope = this;
        this.textManager.load(function() {
            var result = FRAK.parseJSON(text.data);
            var md = new MaterialDescriptor();
            md.parentDescriptor = descriptor;
            if (result.uniforms) {
                for (var u in result.uniforms) {
                    var uniform = result.uniforms[u];
                    if (uniform instanceof Array) {
                        if (uniform.length == 1) md.uniforms[u] = new UniformFloat(uniform);
                        if (uniform.length == 2) {
                            if (uniform[0] instanceof Array) md.uniforms[u] = new UniformMat2(uniform[0].concat(uniform[1])); else md.uniforms[u] = new UniformVec2(uniform);
                        }
                        if (uniform.length == 3) {
                            if (uniform[0] instanceof Array) md.uniforms[u] = new UniformMat3(uniform[0].concat(uniform[1]).concat(uniform[2])); else md.uniforms[u] = new UniformVec3(uniform);
                        }
                        if (uniform.length == 4) {
                            if (uniform[0] instanceof Array) md.uniforms[u] = new UniformMat4(uniform[0].concat(uniform[1]).concat(uniform[2]).concat(uniform[3])); else md.uniforms[u] = new UniformVec4(uniform);
                        }
                    } else if (uniform instanceof Object) {
                        if (!"a" in uniform) uniform.a = 0;
                        md.uniforms[u] = new UniformColor(uniform);
                    } else if (typeof uniform === "number" && parseFloat(uniform) == parseInt(uniform)) md.uniforms[u] = new UniformInt(uniform); else md.uniforms[u] = new UniformFloat(uniform);
                }
            }
            if (result.textures) {
                for (var t in result.textures) {
                    var textureDescriptor = new TextureDescriptor(result.textures[t]);
                    md.textureDescriptors[t] = textureDescriptor;
                    textureDescriptor.parentDescriptor = md;
                }
            }
            if (result.shader) {
                if (result.shader instanceof Array) {
                    md.shaderDescriptor = new ShaderDescriptor(result.shader[0], result.shader[1]);
                } else {
                    md.shaderDescriptor = new ShaderDescriptor(result.shader);
                }
                md.shaderDescriptor.parentDescriptor = md;
            }
            if (result.requirements) {
                md.requirements = result.requirements;
            }
            materialSource.material = scope.materialsManager.addDescriptor(md);
            scope.materialsManager.load(function() {
                loadedCallback(descriptor, materialSource);
            });
        });
    }
});

var ModelsManager = Manager.extend({
    init: function(context, assetsPath, shadersManager, texturesManager) {
        this._super(assetsPath);
        if (!shadersManager) shadersManager = new ShadersManager(context);
        this.shadersManager = shadersManager;
        if (!texturesManager) texturesManager = new TexturesManager(context);
        this.texturesManager = texturesManager;
    },
    getProgress: function() {
        var progress = this._super();
        if (progress == 1) return progress;
        return progress + (this.texturesManager.getProgress() + this.shadersManager.getProgress()) / 2 / this.getTotalItems();
    },
    add: function(source, format) {
        source = this.sourceCallback(source);
        return this.addDescriptor(new ModelDescriptor(source, format));
    },
    createResource: function() {
        return new Node();
    },
    loadResource: function(modelDescriptor, resource, loadedCallback, failedCallback) {
        var descriptor = this.descriptorCallback(modelDescriptor);
        var scope = this;
        var format = modelDescriptor.getFormat();
        function loadGLTF(data) {
            var modelLoader = new ModelLoaderGLTF(scope.context, descriptor, scope.shadersManager, scope.texturesManager, format);
            modelLoader.load(resource, data, function() {
                loadedCallback(descriptor, resource);
                scope.shadersManager.load(function() {});
                scope.texturesManager.load(function() {});
            });
        }
        if (format == "json") {
            Logistics.getJSON(descriptor.getFullPath(), function(data) {
                var modelLoader = new ModelLoaderJSON(scope.context, descriptor, scope.shadersManager, scope.texturesManager);
                modelLoader.load(resource, data);
                loadedCallback(descriptor, resource);
                scope.shadersManager.load(function() {});
                scope.texturesManager.load(function() {});
            });
        } else if (format == "gltf") {
            Logistics.getJSON(descriptor.getFullPath(), loadGLTF);
        } else if (format == "glb") {
            Logistics.getBinary(descriptor.getFullPath(), loadGLTF);
        } else {
            Logistics.getBinary(descriptor.getFullPath(), function(binaryData) {
                if (!binaryData || binaryData.byteLength == 0) {
                    failedCallback(descriptor);
                    return;
                }
                var parser = scope.createParser(binaryData, function(parsedData, userdata) {
                    var modelLoader = new ModelLoader(scope.context, descriptor, scope.shadersManager, scope.texturesManager);
                    modelLoader.load(resource, parsedData);
                    loadedCallback(descriptor, resource);
                    scope.shadersManager.load(function() {});
                    scope.texturesManager.load(function() {});
                }, function(errors, userdata) {
                    failedCallback(descriptor);
                }, function(progress, userdata) {});
                parser.parse();
            });
        }
    },
    createParser: function(data, cbOnComplete, cbOnError, cbOnProgress, userdata) {
        return new ThreadedDataParser(data, cbOnComplete, cbOnError, cbOnProgress, userdata);
    }
});

var AssetsManager = FrakClass.extend({
    init: function(renderingContext, assetsPath) {
        this.managers = [];
        this.assetsPath = assetsPath;
        var me = this;
        this.loadingCount = 0;
        this.loadedCallbacks = [];
        var addManager = function(manager) {
            manager.onAddToQueue = function(descriptor) {
                me.loadingCount++;
            };
            manager.onLoaded = function(descriptor) {
                me.loadingCount--;
                if (me.loadingCount <= 0) {
                    var callbacks = me.loadedCallbacks.slice(0);
                    me.loadedCallbacks = [];
                    for (var i = 0; i < callbacks.length; i++) {
                        var c = callbacks[i];
                        c();
                    }
                }
            };
            me.managers.push(manager);
        };
        addManager(this.shadersManager = new ShadersManager(renderingContext, this.assetsPath));
        addManager(this.texturesManager = new TexturesManager(renderingContext, this.assetsPath));
        addManager(this.modelsManager = new ModelsManager(renderingContext, this.assetsPath, this.shadersManager, this.texturesManager));
        addManager(this.textManager = new TextManager(this.assetsPath));
        addManager(this.materialsManager = new MaterialsManager(renderingContext, this.assetsPath, this.shadersManager, this.texturesManager));
        addManager(this.materialSourcesManager = new MaterialSourcesManager(renderingContext, this.assetsPath, this.materialsManager, this.textManager));
    },
    addTexture: function(source) {
        return this.texturesManager.add(source);
    },
    addModel: function(source, format) {
        return this.modelsManager.add(source, format);
    },
    addShaderSource: function(source) {
        return this.shadersManager.addSource(source);
    },
    addShader: function(vertexSource, fragmentSource) {
        return this.shadersManager.add(vertexSource, fragmentSource);
    },
    addText: function(source) {
        return this.textManager.add(source);
    },
    addMaterial: function(source) {
        return this.materialSourcesManager.add(source);
    },
    hasItemsInQueue: function() {
        for (var m in this.managers) {
            if (this.managers[m].getWaitingItems() > 0) return true;
        }
        return false;
    },
    load: function(callback, progressCallback) {
        var me = this;
        if (callback) {
            this.loadedCallbacks.push(callback);
        }
        if (!this.hasItemsInQueue()) {
            var callbacks = this.loadedCallbacks.slice(0);
            this.loadedCallbacks = [];
            for (var j = 0; j < callbacks.length; j++) {
                callbacks[j]();
            }
            return;
        }
        function onProgress() {
            if (!progressCallback) return;
            var progress = 0;
            for (var i = 0; i < me.managers.length; i++) {
                if (me.managers[i]) {
                    progress += me.managers[i].getProgress();
                } else progress += 1;
            }
            progressCallback(progress / me.managers.length);
        }
        for (var m = 0; m < this.managers.length; m++) {
            this.managers[m].load(function() {}, onProgress);
        }
    }
});

var BoundingVolume = Serializable.extend({
    init: function(center) {
        this.center = false;
        if (center) this.center = vec3.clone(center);
    },
    type: function() {
        return "BoundingVolume";
    },
    isPoint: function() {
        return true;
    },
    toString: function() {
        return "BoundingVolume[center=(" + this.center[0] + "," + this.center[1] + "," + this.center[2] + ")]";
    }
});

var BoundingVolumeVectorCache = [ vec3.create(), vec3.create(), vec3.create() ];

var BoundingBox = BoundingVolume.extend({
    init: function(center, size) {
        this._super(center);
        this.size = vec3.create();
        if (size) vec3.copy(this.size, size);
        this.extents = vec3.scale(vec3.create(), this.size, .5);
        this.min = vec3.create();
        this.max = vec3.create();
        this.recalculate();
    },
    type: function() {
        return "BoundingBox";
    },
    recalculate: function() {
        vec3.scale(this.size, this.extents, 2);
        if (this.center) {
            vec3.subtract(this.min, this.center, this.extents);
            vec3.add(this.max, this.center, this.extents);
        }
    },
    set: function(center, size) {
        if (center) {
            if (!this.center) this.center = vec3.create();
            vec3.copy(this.center, center);
        }
        if (size) vec3.copy(this.size, size);
        vec3.scale(this.extents, this.size, .5);
        this.recalculate();
    },
    transform: function(mat, out) {
        if (!out) out = new BoundingBox();
        if (!this.center) return out;
        var a = 0, b = 0;
        mat4.translation(out.min, mat);
        mat4.translation(out.max, mat);
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < 3; i++) {
                a = mat[i * 4 + j] * this.min[i];
                b = mat[i * 4 + j] * this.max[i];
                if (a < b) {
                    out.min[j] += a;
                    out.max[j] += b;
                } else {
                    out.min[j] += b;
                    out.max[j] += a;
                }
            }
        }
        vec3.subtract(out.size, out.max, out.min);
        vec3.scale(out.extents, out.size, .5);
        if (!out.center) out.center = vec3.create();
        vec3.add(out.center, out.min, out.extents);
        return out;
    },
    isPoint: function() {
        return this.size[0] == 0 && this.size[1] == 0 && this.size[2] == 0;
    },
    getOuterSphereRadius: function() {
        return vec3.len(this.extents);
    },
    containsPoint: function(point) {
        if (!this.center) return false;
        if (point[0] >= this.min[0] && point[1] >= this.min[1] && point[2] >= this.min[2] && point[0] <= this.max[0] && point[1] <= this.max[1] && point[2] <= this.max[2]) return true;
        return false;
    },
    containsBox: function(box) {
        if (!this.center) return false;
        return this.containsPoint(box.min) && this.containsPoint(box.max);
    },
    intersectsBox: function(box) {
        if (!this.center) return false;
        return this.max[0] > box.min[0] && this.min[0] < box.max[0] && this.max[1] > box.min[1] && this.min[1] < box.max[1] && this.max[2] > box.min[2] && this.min[2] < box.max[2];
    },
    intersectsPlane: function(plane) {
        if (!this.center) return false;
        var localMin = BoundingVolumeVectorCache[0];
        var localMax = BoundingVolumeVectorCache[1];
        var p = BoundingVolumeVectorCache[2];
        vec3.copy(localMin, this.max);
        vec3.copy(localMax, this.min);
        var minDist = Infinity;
        var maxDist = -Infinity;
        var d = plane.getDistanceToPoint(this.min);
        if (d < minDist) {
            vec3.copy(localMin, this.min);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, this.min);
            maxDist = d;
        }
        d = plane.getDistanceToPoint(this.max);
        if (d < minDist) {
            vec3.copy(localMin, this.max);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, this.max);
            maxDist = d;
        }
        vec3.set(p, this.min[0], this.min[1], this.max[2]);
        d = plane.getDistanceToPoint(p);
        if (d < minDist) {
            vec3.copy(localMin, p);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, p);
            maxDist = d;
        }
        vec3.set(p, this.min[0], this.max[1], this.min[2]);
        d = plane.getDistanceToPoint(p);
        if (d < minDist) {
            vec3.copy(localMin, p);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, p);
            maxDist = d;
        }
        vec3.set(p, this.min[0], this.max[1], this.max[2]);
        d = plane.getDistanceToPoint(p);
        if (d < minDist) {
            vec3.copy(localMin, p);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, p);
            maxDist = d;
        }
        vec3.set(p, this.max[0], this.min[1], this.min[2]);
        d = plane.getDistanceToPoint(p);
        if (d < minDist) {
            vec3.copy(localMin, p);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, p);
            maxDist = d;
        }
        vec3.set(p, this.max[0], this.min[1], this.max[2]);
        d = plane.getDistanceToPoint(p);
        if (d < minDist) {
            vec3.copy(localMin, p);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, p);
            maxDist = d;
        }
        vec3.set(p, this.max[0], this.max[1], this.min[2]);
        d = plane.getDistanceToPoint(p);
        if (d < minDist) {
            vec3.copy(localMin, p);
            minDist = d;
        }
        if (d > maxDist) {
            vec3.copy(localMax, p);
            maxDist = d;
        }
        if (!plane.sameSide(localMin, localMax)) return true;
        if (plane.pointOnPlane(localMin) || plane.pointOnPlane(localMax)) return true;
        return false;
    },
    intersectsTriangle: function(p0, p1, p2) {
        if (!this.center) return false;
        AABBPlaneCache.setByPoints(p0, p1, p2);
        if (!this.intersectsPlane(AABBPlaneCache)) return false;
        if (this.containsPoint(p0) || this.containsPoint(p1) || this.containsPoint(p2)) return true;
        var min = BoundingVolumeVectorCache[0];
        var max = BoundingVolumeVectorCache[1];
        vec3.copy(min, p0);
        vec3.copy(max, p0);
        for (var i = 0; i < 3; i++) {
            if (p1[i] < min[i]) min[i] = p1[i];
            if (p2[i] < min[i]) min[i] = p2[i];
            if (p1[i] > max[i]) max[i] = p1[i];
            if (p2[i] > max[i]) max[i] = p2[i];
        }
        if (!(this.max[0] >= min[0] && this.min[0] <= max[0] && this.max[1] >= min[1] && this.min[0] <= max[1] && this.max[2] >= min[2] && this.min[2] <= max[2])) return false;
        var proj0 = vec2.fromValues(p0[0], p0[1]);
        var proj1 = vec2.fromValues(p1[0], p1[1]);
        var proj2 = vec2.fromValues(p2[0], p2[1]);
        var projMin = vec2.fromValues(this.min[0], this.min[1]);
        var projMax = vec2.fromValues(this.max[0], this.max[1]);
        if (!LineRectIntersection2D(proj0, proj1, projMin, projMax) && !LineRectIntersection2D(proj1, proj2, projMin, projMax) && !LineRectIntersection2D(proj2, proj0, projMin, projMax)) {
            if (!PointInTriangle2D(proj0, proj1, proj2, projMin)) return false;
        }
        vec2.set(proj0, p0[2], p0[1]);
        vec2.set(proj1, p1[2], p1[1]);
        vec2.set(proj2, p2[2], p2[1]);
        vec2.set(projMin, this.min[2], this.min[1]);
        vec2.set(projMax, this.max[2], this.max[1]);
        if (!LineRectIntersection2D(proj0, proj1, projMin, projMax) && !LineRectIntersection2D(proj1, proj2, projMin, projMax) && !LineRectIntersection2D(proj2, proj0, projMin, projMax)) {
            if (!PointInTriangle2D(proj0, proj1, proj2, projMin)) return false;
        }
        vec2.set(proj0, p0[0], p0[2]);
        vec2.set(proj1, p1[0], p1[2]);
        vec2.set(proj2, p2[0], p2[2]);
        vec2.set(projMin, this.min[0], this.min[2]);
        vec2.set(projMax, this.max[0], this.max[2]);
        if (!LineRectIntersection2D(proj0, proj1, projMin, projMax) && !LineRectIntersection2D(proj1, proj2, projMin, projMax) && !LineRectIntersection2D(proj2, proj0, projMin, projMax)) {
            if (!PointInTriangle2D(proj0, proj1, proj2, projMin)) return false;
        }
        return true;
    },
    encapsulatePoint: function(point) {
        if (!this.center) {
            this.center = vec3.clone(point);
            this.extents[0] = 0;
            this.extents[1] = 0;
            this.extents[2] = 0;
            this.recalculate();
            return;
        }
        if (this.containsPoint(point)) return;
        var delta = vec3.subtract(BoundingVolumeVectorCache[0], point, this.center);
        for (var axis = 0; axis < 3; axis++) {
            if (Math.abs(delta[axis]) > this.extents[axis]) {
                this.extents[axis] += (Math.abs(delta[axis]) - this.extents[axis]) / 2;
                this.center[axis] = point[axis] + (point[axis] > this.center[axis] ? -1 : 1) * this.extents[axis];
            }
        }
        this.recalculate();
    },
    encapsulateBox: function(box) {
        if (!box.center) return;
        if (!this.center) {
            this.center = vec3.clone(box.center);
            this.extents = vec3.clone(box.extents);
            this.recalculate();
            return;
        }
        if (this.containsBox(box)) return;
        this.encapsulatePoint(box.min);
        this.encapsulatePoint(box.max);
    },
    getVertices: function(vertices) {
        if (!vertices) {
            vertices = [ vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create() ];
        }
        vec3.add(vertices[0], this.center, [ this.extents[0], this.extents[1], this.extents[2] ]);
        vec3.add(vertices[1], this.center, [ -this.extents[0], this.extents[1], this.extents[2] ]);
        vec3.add(vertices[2], this.center, [ this.extents[0], -this.extents[1], this.extents[2] ]);
        vec3.add(vertices[3], this.center, [ -this.extents[0], -this.extents[1], this.extents[2] ]);
        vec3.add(vertices[4], this.center, [ this.extents[0], this.extents[1], -this.extents[2] ]);
        vec3.add(vertices[5], this.center, [ -this.extents[0], this.extents[1], -this.extents[2] ]);
        vec3.add(vertices[6], this.center, [ this.extents[0], -this.extents[1], -this.extents[2] ]);
        vec3.add(vertices[7], this.center, [ -this.extents[0], -this.extents[1], -this.extents[2] ]);
        return vertices;
    },
    toString: function() {
        return "BoundingBox[\n" + "\tcenter=(" + this.center[0] + ", " + this.center[1] + ", " + this.center[2] + ")\n" + "\tmin=(" + this.min[0] + ", " + this.min[1] + ", " + this.min[2] + ")\n" + "\tmax=(" + this.max[0] + ", " + this.max[1] + ", " + this.max[2] + ")\n" + "\textents=(" + this.extents[0] + ", " + this.extents[1] + ", " + this.extents[2] + ")\n" + "\tsize=(" + this.size[0] + ", " + this.size[1] + ", " + this.size[2] + ")\n" + "]\n";
    }
});

function LineLineIntersection2D(a, b, c, d, out) {
    var denom = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]);
    if (denom == 0) return false;
    var r = ((a[1] - c[1]) * (d[0] - c[0]) - (a[0] - c[0]) * (d[1] - c[1])) / denom;
    var s = ((a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1])) / denom;
    if (r < 0 || r > 1 || s < 0 || s > 1) return false;
    if (out) {
        out[0] = a[0] + r * (b[0] - a[0]);
        out[1] = a[1] + r * (b[1] - a[1]);
    }
    return true;
}

function LineRectIntersection2D(a, b, min, max) {
    if (LineLineIntersection2D(a, b, min, [ min[0], max[1] ]) || LineLineIntersection2D(a, b, [ min[0], max[1] ], max) || LineLineIntersection2D(a, b, max, [ max[0], min[1] ]) || LineLineIntersection2D(a, b, min, [ max[0], min[1] ])) return true;
    return false;
}

function PointInTriangle2D(p1, p2, p3, pt) {
    var det = (p2[1] - p3[1]) * (p1[0] - p3[0]) + (p3[0] - p2[0]) * (p1[1] - p3[1]);
    if (det == 0) return false;
    var u = ((p2[1] - p3[1]) * (pt[0] - p3[0]) + (p3[0] - p2[0]) * (pt[1] - p3[1])) / det;
    var v = ((p3[1] - p1[1]) * (pt[0] - p3[0]) + (p1[0] - p3[0]) * (pt[1] - p3[1])) / det;
    if (u >= 0 && v >= 0 && u + v <= 1) return true;
    return false;
}

var BoundingSphere = BoundingVolume.extend({
    init: function(center, radius) {
        this._super(center);
        this.radius = 0;
        if (radius) this.radius = radius;
    },
    type: function() {
        return "BoundingSphere";
    },
    isPoint: function() {
        return this.radius == 0;
    },
    containsPoint: function(point) {
        if (!this.center) return false;
        return vec3.distance(point, this.center) <= this.radius;
    },
    containsSphere: function(sphere) {
        if (!this.center) return false;
        return vec3.distance(sphere.center, this.center) <= this.radius - sphere.radius;
    },
    intersectsSphere: function(sphere) {
        if (!this.center) return false;
        var d = vec3.squaredLength(vec3.subtract(BoundingVolumeVectorCache[0], this.center, sphere.center));
        var radiiSum = this.radius + sphere.radius;
        return d <= radiiSum * radiiSum;
    },
    encapsulatePoint: function(point) {
        if (!this.center) {
            this.center = vec3.clone(point);
            this.radius = 0;
            return;
        }
        if (this.containsPoint(point)) return;
        var dir = vec3.subtract(BoundingVolumeVectorCache[0], this.center, point);
        var length = vec3.length(dir) + this.radius;
        vec3.normalize(dir, dir);
        this.radius = length / 2;
        var tmp = vec3.scale(BoundingVolumeVectorCache[1], dir, this.radius);
        vec3.add(this.center, point, tmp);
    },
    encapsulateSphere: function(sphere) {
        if (!sphere.center) return;
        if (!this.center) {
            this.center = vec3.clone(sphere.center);
            this.radius = sphere.radius;
            return;
        }
        if (this.containsSphere(sphere)) return;
        var dir = vec3.subtract(BoundingVolumeVectorCache[0], sphere.center, this.center);
        var length = vec3.length(dir) + sphere.radius;
        vec3.normalize(dir, dir);
        vec3.scale(dir, dir, length);
        var pt = vec3.add(BoundingVolumeVectorCache[2], this.center, dir);
        this.encapsulatePoint(pt);
    },
    transform: function(mat, out) {
        if (!out) out = new BoundingSphere();
        if (!this.center) return out;
        var scale = mat4.getScale(BoundingVolumeVectorCache[0], mat);
        var c = vec3.transformMat4(BoundingVolumeVectorCache[1], this.center, mat);
        if (!out.center) out.center = vec3.create();
        vec3.copy(out.center, c);
        out.radius = this.radius * Math.max(scale[0], scale[1], scale[2]);
        return out;
    },
    toString: function() {
        return "BoundingSphere[" + "center=(" + this.center[0] + ", " + this.center[1] + ", " + this.center[2] + ") " + "radius=" + this.radius + "]";
    }
});

var Plane = FrakClass.extend({
    init: function() {
        this.normal = vec3.create();
        this.distance = 0;
    },
    setByPoints: function(p1, p2, p3) {
        this.normal = vec3.cross(vec3.create(), vec3.subtract(vec3.create(), p2, p1), vec3.subtract(vec3.create(), p3, p1));
        vec3.normalize(this.normal, this.normal);
        this.distance = -vec3.dot(this.normal, p2);
        return this;
    },
    setByNormalAndPoint: function(normal, point) {
        this.normal = vec3.clone(normal);
        vec3.normalize(this.normal, this.normal);
        this.distance = -vec3.dot(this.normal, point);
        return this;
    },
    getDistanceToPoint: function(point) {
        return vec3.dot(this.normal, point) + this.distance;
    },
    getDistanceOnLine: function(point, direction) {
        var p0 = vec3.scale(vec3.create(), this.normal, -this.distance);
        var dot = vec3.dot(direction, this.normal);
        if (Math.abs(dot) < EPSILON) return Infinity;
        return vec3.dot(vec3.sub(p0, p0, point), this.normal) / dot;
    },
    getLineIntersection: function(point, direction, out) {
        if (!out) out = vec3.create();
        var d = this.getDistanceOnLine(point, direction);
        vec3.scaleAndAdd(out, point, direction, d);
        return out;
    },
    projectToPlane: function(point, out) {
        if (!out) out = vec3.create();
        vec3.scale(out, this.normal, this.getDistanceToPoint(point));
        vec3.sub(out, point, out);
        return out;
    },
    pointInFront: function(point) {
        return vec3.dot(this.normal, point) + this.distance > 0;
    },
    pointInBack: function(point) {
        return vec3.dot(this.normal, point) + this.distance < 0;
    },
    pointOnPlane: function(point) {
        return Math.abs(vec3.dot(this.normal, point) + this.distance) < EPSILON;
    },
    sameSide: function(p1, p2) {
        var d1 = vec3.dot(this.normal, p1) + this.distance;
        var d2 = vec3.dot(this.normal, p2) + this.distance;
        return !(d1 * d2 < 0);
    },
    toString: function() {
        return "Plane[" + this.normal[0] + ", " + this.normal[1] + ", " + this.normal[2] + ", " + this.distance + "]";
    }
});

var AABBPlaneCache = new Plane();

var Ray = FrakClass.extend({
    init: function(origin, destination) {
        this.infinite = false;
        this.origin = vec3.create();
        this.destination = vec3.create();
        if (origin) vec3.copy(this.origin, origin);
        if (destination) vec3.copy(this.destination, destination);
    },
    clone: function() {
        var ray = new Ray(this.origin, this.destination);
        ray.infinite = this.infinite;
        return ray;
    },
    getLength: function() {
        return vec3.distance(this.origin, this.destination);
    },
    getDirection: function(out) {
        if (!out) out = vec3.create();
        this.getVector(out);
        vec3.normalize(out, out);
        return out;
    },
    getVector: function(out) {
        if (!out) out = vec3.create();
        vec3.subtract(out, this.destination, this.origin);
        return out;
    },
    transform: function(mat) {
        vec3.transformMat4(this.origin, this.origin, mat);
        vec3.transformMat4(this.destination, this.destination, mat);
    },
    transformWithLength: function(mat, length) {
        var rotscale = mat4.clone(mat);
        rotscale[12] = 0;
        rotscale[13] = 0;
        rotscale[14] = 0;
        var dir = this.getDirection();
        vec3.transformMat4(this.origin, this.origin, mat);
        vec3.transformMat4(dir, dir, rotscale);
        vec3.scale(dir, dir, length);
        vec3.add(this.destination, this.origin, dir);
    },
    getPointOnRay: function(t) {
        var p = vec3.create();
        var d = this.getVector();
        vec3.add(p, this.origin, vec3.scale(d, d, t));
        return p;
    },
    getClosestPointOnRay: function(point) {
        var dir = this.getDirection();
        var length = vec3.dot(dir, vec3.subtract(vec3.create(), point, this.origin));
        return vec3.add(vec3.create(), this.origin, vec3.scale(dir, dir, length));
    },
    distanceOfPoint: function(point) {
        if (vec3.dot(this.getDirection(), vec3.subtract(vec3.create(), point, this.origin)) <= 0) return vec3.distance(point, this.origin);
        return vec3.distance(vec3.cross(vec3.create(), this.getDirection(), vec3.subtract(vec3.create(), point, this.origin)));
    },
    intersectBoundingVolume: function(boundingVolume, result) {
        if (!(boundingVolume instanceof BoundingVolume) || !boundingVolume.center) return false;
        if (boundingVolume instanceof BoundingSphere) {
            return this.intersectSphere(boundingVolume.center, boundingVolume.radius, result);
        }
        if (boundingVolume instanceof BoundingBox) {
            return this.intersectAABB(boundingVolume.min, boundingVolume.max, result);
        }
        return false;
    },
    intersectPlane: function(plane, result) {
        if (plane.sameSide(this.origin, this.destination)) return false;
        var dir = this.getDirection();
        var t = -plane.getDistanceToPoint(this.origin) / vec3.dot(dir, plane.normal);
        if (result) result.add(vec3.add(vec3.create(), this.origin, vec3.scale(dir, dir, t)));
        return true;
    },
    intersectTriangle: function(p0, p1, p2, result) {
        var v0 = vec3.subtract(RayTestLocalCache[0], p2, p0);
        var v1 = vec3.subtract(RayTestLocalCache[1], p1, p0);
        var normal = vec3.cross(RayTestLocalCache[2], v1, v0);
        vec3.normalize(normal, normal);
        var d1 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.origin, p0), normal);
        var d2 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.destination, p0), normal);
        if (d1 * d2 >= 0) return false;
        var hit = this.getVector();
        hit = vec3.add(hit, this.origin, vec3.scale(hit, hit, -d1 / (d2 - d1)));
        var v2 = vec3.subtract(RayTestLocalCache[2], hit, p0);
        var dot00 = vec3.dot(v0, v0);
        var dot01 = vec3.dot(v0, v1);
        var dot02 = vec3.dot(v0, v2);
        var dot11 = vec3.dot(v1, v1);
        var dot12 = vec3.dot(v1, v2);
        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        if (u >= 0 && v >= 0 && u + v <= 1) {
            if (result) result.add(hit);
            return true;
        }
        return false;
    },
    intersectTriangleDistanceOnly: function(p0, p1, p2) {
        var v0 = vec3.subtract(RayTestLocalCache[0], p2, p0);
        var v1 = vec3.subtract(RayTestLocalCache[1], p1, p0);
        var normal = vec3.cross(RayTestLocalCache[2], v1, v0);
        vec3.normalize(normal, normal);
        var d1 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.origin, p0), normal);
        var d2 = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.destination, p0), normal);
        if (d1 * d2 >= 0) return false;
        var hit = this.getVector();
        var t = -d1 / (d2 - d1);
        hit = vec3.add(hit, this.origin, vec3.scale(hit, hit, t));
        var v2 = vec3.subtract(RayTestLocalCache[2], hit, p0);
        var dot00 = vec3.dot(v0, v0);
        var dot01 = vec3.dot(v0, v1);
        var dot02 = vec3.dot(v0, v2);
        var dot11 = vec3.dot(v1, v1);
        var dot12 = vec3.dot(v1, v2);
        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        if (u >= 0 && v >= 0 && u + v <= 1) return t;
        return false;
    },
    intersectSphere: function(center, radius, result) {
        var v = vec3.sub(RayTestLocalCache[0], this.origin, center);
        var direction = this.getDirection();
        var dv = vec3.dot(direction, v);
        var tmp = dv * dv - vec3.dot(v, v) + radius * radius;
        if (Math.abs(tmp) < EPSILON) {
            if (result) result.add(vec3.add(vec3.create(), this.origin, vec3.scale(direction, direction, -dv)));
            return true;
        }
        if (tmp > 0) {
            if (result) {
                result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[0], direction, -dv - Math.sqrt(tmp))));
                result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[0], direction, -dv + Math.sqrt(tmp))));
            }
            return true;
        }
        return false;
    },
    intersectAABB: function(min, max, result) {
        var dir = this.getDirection(RayTestLocalCache[0]);
        var tmin = RayTestLocalCache[1];
        var tmax = RayTestLocalCache[2];
        dir[0] = 1 / dir[0];
        dir[1] = 1 / dir[1];
        dir[2] = 1 / dir[2];
        tmin[0] = (min[0] - this.origin[0]) * dir[0];
        tmax[0] = (max[0] - this.origin[0]) * dir[0];
        tmin[1] = (min[1] - this.origin[1]) * dir[1];
        tmax[1] = (max[1] - this.origin[1]) * dir[1];
        tmin[2] = (min[2] - this.origin[2]) * dir[2];
        tmax[2] = (max[2] - this.origin[2]) * dir[2];
        var t0 = Math.max(Math.min(tmin[0], tmax[0]), Math.min(tmin[1], tmax[1]), Math.min(tmin[2], tmax[2]));
        var t1 = Math.min(Math.max(tmin[0], tmax[0]), Math.max(tmin[1], tmax[1]), Math.max(tmin[2], tmax[2]));
        if (t1 < 0 || t0 > t1) return false;
        if (this.infinite) {
            if (result) {
                this.getDirection(dir);
                result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t0)));
                result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t1)));
            }
            return true;
        }
        if (t0 * t0 > vec3.sqrDist(this.origin, this.destination)) {
            if ((this.origin[0] < min[0] || this.origin[1] < min[1] || this.origin[2] < min[2] || this.origin[0] > max[0] || this.origin[1] > max[1] || this.origin[2] > max[2]) && (this.destination[0] < min[0] || this.destination[1] < min[1] || this.destination[2] < min[2] || this.destination[0] > max[0] || this.destination[1] > max[1] || this.destination[2] > max[2])) return false;
        }
        if (result) {
            this.getDirection(dir);
            result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t0)));
            result.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], dir, t1)));
        }
        return true;
    },
    toString: function() {
        return "Ray(" + vec3.str(this.origin) + ", " + vec3.str(this.destination) + ", infinite = " + this.infinite + ")";
    }
});

var RayTestResult = FrakClass.extend({
    init: function(ray) {
        this.ray = ray.clone();
        this.hits = [];
        this.addCallback = false;
    },
    add: function(point) {
        var item = {
            point: point,
            collider: false,
            submesh: false,
            node: false
        };
        if (FRAK.isFunction(this.addCallback)) this.addCallback(item);
        this.hits.push(item);
    },
    empty: function() {
        return this.hits.length == 0;
    },
    sort: function() {
        var scope = this;
        this.hits.sort(function(a, b) {
            var da = vec3.sqrDist(scope.ray.origin, a.point);
            var db = vec3.sqrDist(scope.ray.origin, b.point);
            return da - db;
        });
    },
    nearest: function() {
        if (this.empty()) return false;
        var minDist = Infinity;
        var minIndex = 0;
        for (var i = 0; i < this.hits.length; i++) {
            var d = vec3.sqrDist(this.ray.origin, this.hits[i].point);
            if (d < minDist) {
                minDist = d;
                minIndex = i;
            }
        }
        return this.hits[minIndex];
    }
});

var RayTestLocalCache = [ vec3.create(), vec3.create(), vec3.create(), vec3.create() ];

var Submesh = FrakClass.extend({
    init: function() {
        this.materialIndex = -1;
        this.faces = [];
        this.positions = [];
        this.texCoords1D = [];
        this.texCoords2D = [];
        this.texCoords3D = [];
        this.texCoords4D = [];
        this.tangents = false;
        this.normals = false;
        this.bitangents = false;
        this.barycentric = false;
        this.boundingBox = new BoundingBox();
        this.boundingSphere = new BoundingSphere();
    },
    calculateTangents: function() {
        var tan1 = new Float32Array(this.positions.length);
        var tan2 = new Float32Array(this.positions.length);
        var uv = this.texCoords2D[0];
        var v1 = vec3.create();
        var v2 = vec3.create();
        var v3 = vec3.create();
        var w1 = vec2.create();
        var w2 = vec2.create();
        var w3 = vec2.create();
        var sdir = vec3.create();
        var tdir = vec3.create();
        for (var i = 0; i < this.faces.length; i += 3) {
            var i1 = this.faces[i];
            var i2 = this.faces[i + 1];
            var i3 = this.faces[i + 2];
            vec3.set(v1, this.positions[i1 * 3], this.positions[i1 * 3 + 1], this.positions[i1 * 3 + 2]);
            vec3.set(v2, this.positions[i2 * 3], this.positions[i2 * 3 + 1], this.positions[i2 * 3 + 2]);
            vec3.set(v3, this.positions[i3 * 3], this.positions[i3 * 3 + 1], this.positions[i3 * 3 + 2]);
            vec2.set(w1, uv[i1 * 2], uv[i1 * 2 + 1]);
            vec2.set(w2, uv[i2 * 2], uv[i2 * 2 + 1]);
            vec2.set(w3, uv[i3 * 2], uv[i3 * 2 + 1]);
            var x1 = v2[0] - v1[0];
            var x2 = v3[0] - v1[0];
            var y1 = v2[1] - v1[1];
            var y2 = v3[1] - v1[1];
            var z1 = v2[2] - v1[2];
            var z2 = v3[2] - v1[2];
            var s1 = w2[0] - w1[0];
            var s2 = w3[0] - w1[0];
            var t1 = w2[1] - w1[1];
            var t2 = w3[1] - w1[1];
            var r = 1 / (s1 * t2 - s2 * t1);
            vec3.set(sdir, (t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
            vec3.set(tdir, (s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);
            tan1[i1 * 3 + 0] += sdir[0];
            tan1[i1 * 3 + 1] += sdir[1];
            tan1[i1 * 3 + 2] += sdir[2];
            tan1[i2 * 3 + 0] += sdir[0];
            tan1[i2 * 3 + 1] += sdir[1];
            tan1[i2 * 3 + 2] += sdir[2];
            tan1[i3 * 3 + 0] += sdir[0];
            tan1[i3 * 3 + 1] += sdir[1];
            tan1[i3 * 3 + 2] += sdir[2];
            tan2[i1 * 3 + 0] += tdir[0];
            tan2[i1 * 3 + 1] += tdir[1];
            tan2[i1 * 3 + 2] += tdir[2];
            tan2[i2 * 3 + 0] += tdir[0];
            tan2[i2 * 3 + 1] += tdir[1];
            tan2[i2 * 3 + 2] += tdir[2];
            tan2[i3 * 3 + 0] += tdir[0];
            tan2[i3 * 3 + 1] += tdir[1];
            tan2[i3 * 3 + 2] += tdir[2];
        }
        this.tangents = new Float32Array(this.positions.length);
        this.bitangents = new Float32Array(this.positions.length);
        var n = vec3.create();
        var t = vec3.create();
        var tan = vec3.create();
        var tmp = vec3.create();
        for (var i = 0; i < this.normals.length; i += 3) {
            vec3.set(n, this.normals[i], this.normals[i + 1], this.normals[i + 2]);
            vec3.set(t, tan1[i], tan1[i + 1], tan1[i + 2]);
            vec3.scale(tan, n, vec3.dot(n, t));
            vec3.sub(tan, t, tan);
            vec3.normalize(tan, tan);
            this.tangents[i] = tan[0];
            this.tangents[i + 1] = tan[1];
            this.tangents[i + 2] = tan[2];
            vec3.set(tan, tan2[i], tan2[i + 1], tan2[i + 2]);
            vec3.cross(tmp, n, t);
            var w = vec3.dot(tmp, tan) < 0 ? -1 : 1;
            vec3.set(t, this.tangents[i], this.tangents[i + 1], this.tangents[i + 2]);
            vec3.cross(tan, n, t);
            vec3.scale(tan, tan, w);
            vec3.normalize(tan, tan);
            this.bitangents[i] = tan[0];
            this.bitangents[i + 1] = tan[1];
            this.bitangents[i + 2] = tan[2];
        }
        delete tan1;
        delete tan2;
    },
    calculateBarycentric: function() {
        this.barycentric = new Float32Array(this.positions.length);
        for (var i = 0; i < this.faces.length; i += 3) {
            var idx0 = this.faces[i];
            var idx1 = this.faces[i + 1];
            var idx2 = this.faces[i + 2];
            this.barycentric[idx0 * 3 + 0] = 1;
            this.barycentric[idx0 * 3 + 1] = 0;
            this.barycentric[idx0 * 3 + 2] = 0;
            this.barycentric[idx1 * 3 + 0] = 0;
            this.barycentric[idx1 * 3 + 1] = 1;
            this.barycentric[idx1 * 3 + 2] = 0;
            this.barycentric[idx2 * 3 + 0] = 0;
            this.barycentric[idx2 * 3 + 1] = 0;
            this.barycentric[idx2 * 3 + 2] = 1;
        }
    },
    recalculateBounds: function() {
        this.boundingBox = new BoundingBox();
        this.boundingSphere = new BoundingSphere();
        for (var i = 0, l = this.positions.length; i < l; i += 3) {
            this.boundingBox.encapsulatePoint(vec3.fromValues(this.positions[i + 0], this.positions[i + 1], this.positions[i + 2]));
            this.boundingSphere.encapsulatePoint(vec3.fromValues(this.positions[i + 0], this.positions[i + 1], this.positions[i + 2]));
        }
    },
    generateEdges: function() {
        var me = this;
        this.edges = {};
        function insert(a, b) {
            if (!me.edges[me.faces[a]]) me.edges[a] = {};
            me.edges[me.faces[a]][me.faces[b]] = true;
        }
        for (var i = 0, l = this.faces.length; i < l; i += 3) {
            insert(i, i + 1);
            insert(i + 1, i);
            insert(i + 1, i + 2);
            insert(i + 2, i + 1);
            insert(i + 2, i);
            insert(i, i + 2);
        }
    }
});

var Mesh = FrakClass.extend({
    init: function() {
        this.submeshes = [];
        this.materials = [];
        this.boundingBox = new BoundingBox();
        this.boundingSphere = new BoundingSphere();
    },
    addSubmesh: function(submesh, material) {
        this.boundingBox.encapsulateBox(submesh.boundingBox);
        this.boundingSphere.encapsulateSphere(submesh.boundingSphere);
        this.submeshes.push(submesh);
        if (material) {
            this.materials.push(material);
            submesh.materialIndex = this.materials.length - 1;
        }
    },
    getMaterial: function(index) {
        if (index >= 0 && index < this.materials.length) return this.materials[index];
        return false;
    },
    setMaterial: function(index, material) {
        if (index < 0 || index >= this.materials.length) throw "Material.setMaterial: index out of bounds.";
        this.materials[index] = material;
    },
    addMaterial: function(material) {
        this.materials.push(material);
        return this.materials.length - 1;
    },
    getPolycount: function() {
        var c = 0;
        for (var i in this.submeshes) c += this.submeshes[i].faces.length / 3;
        return c;
    },
    empty: function() {
        return this.submeshes.length === 0;
    }
});

var Primitives = {
    plane: function(width, height, material) {
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = [ -.5 * width, -.5 * height, 0, -.5 * width, .5 * height, 0, .5 * width, .5 * height, 0, .5 * width, -.5 * height, 0 ];
        submesh.normals = [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
        submesh.texCoords2D = [ [ 0, 0, 0, 1, 1, 1, 1, 0 ] ];
        submesh.faces = [ 0, 1, 2, 0, 2, 3 ];
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, material);
        var plane = new Node("Plane");
        plane.addComponent(new MeshComponent(mesh));
        plane.addComponent(new MeshRendererComponent());
        return plane;
    },
    box: function(center, extents, material) {
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = [];
        submesh.normals = [];
        submesh.texCoords2D = [ [] ];
        var normal = vec3.create();
        var v1 = vec3.create();
        var v2 = vec3.create();
        function createSide(a, b, c, d) {
            vec3.sub(v1, b, a);
            vec3.sub(v2, d, a);
            vec3.cross(normal, v1, v2);
            vec3.negate(normal, normal);
            vec3.normalize(normal, normal);
            var offset = submesh.positions.length / 3;
            submesh.positions.push(a[0], a[1], a[2]);
            submesh.normals.push(normal[0], normal[1], normal[2]);
            submesh.texCoords2D[0].push(0, 1);
            submesh.positions.push(b[0], b[1], b[2]);
            submesh.normals.push(normal[0], normal[1], normal[2]);
            submesh.texCoords2D[0].push(1, 1);
            submesh.positions.push(c[0], c[1], c[2]);
            submesh.normals.push(normal[0], normal[1], normal[2]);
            submesh.texCoords2D[0].push(1, 0);
            submesh.positions.push(d[0], d[1], d[2]);
            submesh.normals.push(normal[0], normal[1], normal[2]);
            submesh.texCoords2D[0].push(0, 0);
            submesh.faces.push(offset + 0, offset + 3, offset + 2);
            submesh.faces.push(offset + 2, offset + 1, offset + 0);
        }
        var points = [ vec3.fromValues(center[0] - extents[0], center[1] - extents[1], center[2] - extents[2]), vec3.fromValues(center[0] + extents[0], center[1] - extents[1], center[2] - extents[2]), vec3.fromValues(center[0] + extents[0], center[1] + extents[1], center[2] - extents[2]), vec3.fromValues(center[0] - extents[0], center[1] + extents[1], center[2] - extents[2]), vec3.fromValues(center[0] - extents[0], center[1] - extents[1], center[2] + extents[2]), vec3.fromValues(center[0] + extents[0], center[1] - extents[1], center[2] + extents[2]), vec3.fromValues(center[0] + extents[0], center[1] + extents[1], center[2] + extents[2]), vec3.fromValues(center[0] - extents[0], center[1] + extents[1], center[2] + extents[2]) ];
        createSide(points[0], points[1], points[2], points[3]);
        createSide(points[5], points[4], points[7], points[6]);
        createSide(points[4], points[0], points[3], points[7]);
        createSide(points[1], points[5], points[6], points[2]);
        createSide(points[4], points[5], points[1], points[0]);
        createSide(points[3], points[2], points[6], points[7]);
        submesh.calculateTangents();
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, material);
        var box = new Node("Box");
        box.addComponent(new MeshComponent(mesh));
        box.addComponent(new MeshRendererComponent());
        return box;
    },
    sphere: function(radius, slices, stacks, material) {
        if (radius <= 0) throw "Primitives.sphere: invalid sphere radius";
        if (slices < 2 || stacks < 2) throw "Primitives.sphere: invalid sphere slices/stacks parameters (slices<2 or stacks<2)";
        var dtheta = 360 / slices;
        var dphi = 180 / stacks;
        var vertexcount = 360 / dtheta * (180 / dphi) * 4;
        var facecount = vertexcount / 2;
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = new Float32Array(vertexcount * 3);
        submesh.normals = new Float32Array(vertexcount * 3);
        submesh.texCoords2D = [ new Float32Array(vertexcount * 2) ];
        var Deg2Rad = Math.PI / 180;
        var n = 0;
        var index = 0;
        var a = vec3.create();
        var b = vec3.create();
        var c = vec3.create();
        var d = vec3.create();
        for (var phi = 0; phi < 180; phi += dphi) {
            for (var theta = 0; theta < 360; theta += dtheta) {
                submesh.faces.push(n + 0, n + 1, n + 2);
                submesh.faces.push(n + 2, n + 3, n + 0);
                a[0] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.cos(Deg2Rad * (theta + dtheta));
                a[1] = radius * Math.cos((phi + dphi) * Deg2Rad);
                a[2] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.sin(Deg2Rad * (theta + dtheta));
                b[0] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.cos(theta * Deg2Rad);
                b[1] = radius * Math.cos((phi + dphi) * Deg2Rad);
                b[2] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.sin(theta * Deg2Rad);
                c[0] = radius * Math.sin(phi * Deg2Rad) * Math.cos(Deg2Rad * theta);
                c[1] = radius * Math.cos(phi * Deg2Rad);
                c[2] = radius * Math.sin(phi * Deg2Rad) * Math.sin(Deg2Rad * theta);
                d[0] = radius * Math.sin(phi * Deg2Rad) * Math.cos(Deg2Rad * (theta + dtheta));
                d[1] = radius * Math.cos(phi * Deg2Rad);
                d[2] = radius * Math.sin(phi * Deg2Rad) * Math.sin(Deg2Rad * (theta + dtheta));
                submesh.positions[3 * (n + 0) + 0] = a[0];
                submesh.positions[3 * (n + 0) + 1] = a[1];
                submesh.positions[3 * (n + 0) + 2] = a[2];
                submesh.positions[3 * (n + 1) + 0] = b[0];
                submesh.positions[3 * (n + 1) + 1] = b[1];
                submesh.positions[3 * (n + 1) + 2] = b[2];
                submesh.positions[3 * (n + 2) + 0] = c[0];
                submesh.positions[3 * (n + 2) + 1] = c[1];
                submesh.positions[3 * (n + 2) + 2] = c[2];
                submesh.positions[3 * (n + 3) + 0] = d[0];
                submesh.positions[3 * (n + 3) + 1] = d[1];
                submesh.positions[3 * (n + 3) + 2] = d[2];
                vec3.normalize(a, a);
                vec3.normalize(b, b);
                vec3.normalize(c, c);
                vec3.normalize(d, d);
                submesh.normals[3 * (n + 0) + 0] = a[0];
                submesh.normals[3 * (n + 0) + 1] = a[1];
                submesh.normals[3 * (n + 0) + 2] = a[2];
                submesh.normals[3 * (n + 1) + 0] = b[0];
                submesh.normals[3 * (n + 1) + 1] = b[1];
                submesh.normals[3 * (n + 1) + 2] = b[2];
                submesh.normals[3 * (n + 2) + 0] = c[0];
                submesh.normals[3 * (n + 2) + 1] = c[1];
                submesh.normals[3 * (n + 2) + 2] = c[2];
                submesh.normals[3 * (n + 3) + 0] = d[0];
                submesh.normals[3 * (n + 3) + 1] = d[1];
                submesh.normals[3 * (n + 3) + 2] = d[2];
                submesh.texCoords2D[0][2 * (n + 0) + 0] = Deg2Rad * (theta + dtheta) / (Math.PI * 2);
                submesh.texCoords2D[0][2 * (n + 0) + 1] = (phi + dphi) * Deg2Rad / Math.PI;
                submesh.texCoords2D[0][2 * (n + 1) + 0] = theta * Deg2Rad / (Math.PI * 2);
                submesh.texCoords2D[0][2 * (n + 1) + 1] = (phi + dphi) * Deg2Rad / Math.PI;
                submesh.texCoords2D[0][2 * (n + 2) + 0] = Deg2Rad * theta / (Math.PI * 2);
                submesh.texCoords2D[0][2 * (n + 2) + 1] = phi * Deg2Rad / Math.PI;
                submesh.texCoords2D[0][2 * (n + 3) + 0] = Deg2Rad * (theta + dtheta) / (Math.PI * 2);
                submesh.texCoords2D[0][2 * (n + 3) + 1] = phi * Deg2Rad / Math.PI;
                n += 4;
            }
        }
        submesh.calculateTangents();
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, material);
        var node = new Node("Sphere");
        node.addComponent(new MeshComponent(mesh));
        node.addComponent(new MeshRendererComponent());
        return node;
    },
    cone: function(radius, height, slices, material) {
        if (radius <= 0) throw "Primitives.cone: invalid cone radius";
        if (height == 0) throw "Primitives.cone: cannot create a cone with zero height";
        if (slices < 2) throw "Primitives.cone: invalid slices (slices<2)";
        var dtheta = 360 / slices;
        var upperCap = vec3.fromValues(0, height / 2, 0);
        var lowerCap = vec3.fromValues(0, -height / 2, 0);
        var vertexcount = 360 / dtheta * 6;
        var facecount = 360 / dtheta * 2;
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = new Float32Array(vertexcount * 3);
        submesh.normals = new Float32Array(vertexcount * 3);
        submesh.texCoords2D = [ new Float32Array(vertexcount * 2) ];
        var Deg2Rad = Math.PI / 180;
        var P = vec3.fromValues(lowerCap[0], .5 * height - (radius * radius + height * height) / height, lowerCap[2]);
        var vert = 0;
        var normal = vec3.create();
        for (var theta = 0; theta < 360; theta += dtheta) {
            submesh.faces.push(vert + 0, vert + 1, vert + 2);
            vec3.set(normal, 0, -1, 0);
            submesh.positions[3 * vert + 0] = radius * Math.sin(theta * Deg2Rad);
            submesh.positions[3 * vert + 1] = lowerCap[1];
            submesh.positions[3 * vert + 2] = radius * Math.cos(theta * Deg2Rad);
            submesh.normals[3 * vert + 0] = normal[0];
            submesh.normals[3 * vert + 1] = normal[1];
            submesh.normals[3 * vert + 2] = normal[2];
            submesh.texCoords2D[0][2 * vert + 0] = theta / 360;
            submesh.texCoords2D[0][2 * vert + 1] = 1;
            vert++;
            submesh.positions[3 * vert + 0] = radius * Math.sin((theta + dtheta) * Deg2Rad);
            submesh.positions[3 * vert + 1] = lowerCap[1];
            submesh.positions[3 * vert + 2] = radius * Math.cos((theta + dtheta) * Deg2Rad);
            submesh.normals[3 * vert + 0] = normal[0];
            submesh.normals[3 * vert + 1] = normal[1];
            submesh.normals[3 * vert + 2] = normal[2];
            submesh.texCoords2D[0][2 * vert + 0] = (theta + dtheta) / 360;
            submesh.texCoords2D[0][2 * vert + 1] = 1;
            vert++;
            submesh.positions[3 * vert + 0] = lowerCap[0];
            submesh.positions[3 * vert + 1] = lowerCap[1];
            submesh.positions[3 * vert + 2] = lowerCap[2];
            submesh.normals[3 * vert + 0] = normal[0];
            submesh.normals[3 * vert + 1] = normal[1];
            submesh.normals[3 * vert + 2] = normal[2];
            submesh.texCoords2D[0][2 * vert + 0] = theta / 360;
            submesh.texCoords2D[0][2 * vert + 1] = 0;
            vert++;
            submesh.faces.push(vert + 0, vert + 1, vert + 2);
            var a = vec3.fromValues(radius * Math.sin(theta * Deg2Rad), lowerCap[1], radius * Math.cos(theta * Deg2Rad));
            var b = vec3.fromValues(radius * Math.sin((theta + dtheta) * Deg2Rad), lowerCap[1], radius * Math.cos((theta + dtheta) * Deg2Rad));
            var c = vec3.fromValues(upperCap[0], upperCap[1], upperCap[2]);
            vec3.sub(normal, a, P);
            vec3.normalize(normal, normal);
            submesh.positions[3 * (vert + 0) + 0] = a[0];
            submesh.positions[3 * (vert + 0) + 1] = a[1];
            submesh.positions[3 * (vert + 0) + 2] = a[2];
            submesh.normals[3 * (vert + 0) + 0] = normal[0];
            submesh.normals[3 * (vert + 0) + 1] = normal[1];
            submesh.normals[3 * (vert + 0) + 2] = normal[2];
            submesh.texCoords2D[0][2 * (vert + 0) + 0] = theta / 360;
            submesh.texCoords2D[0][2 * (vert + 0) + 1] = 1;
            vec3.sub(normal, b, P);
            vec3.normalize(normal, normal);
            submesh.positions[3 * (vert + 1) + 0] = b[0];
            submesh.positions[3 * (vert + 1) + 1] = b[1];
            submesh.positions[3 * (vert + 1) + 2] = b[2];
            submesh.normals[3 * (vert + 1) + 0] = normal[0];
            submesh.normals[3 * (vert + 1) + 1] = normal[1];
            submesh.normals[3 * (vert + 1) + 2] = normal[2];
            submesh.texCoords2D[0][2 * (vert + 1) + 0] = (theta + dtheta) / 360;
            submesh.texCoords2D[0][2 * (vert + 1) + 1] = 1;
            vec3.set(normal, 0, 1, 0);
            submesh.positions[3 * (vert + 2) + 0] = c[0];
            submesh.positions[3 * (vert + 2) + 1] = c[1];
            submesh.positions[3 * (vert + 2) + 2] = c[2];
            submesh.normals[3 * (vert + 2) + 0] = normal[0];
            submesh.normals[3 * (vert + 2) + 1] = normal[1];
            submesh.normals[3 * (vert + 2) + 2] = normal[2];
            submesh.texCoords2D[0][2 * (vert + 2) + 0] = theta / 360;
            submesh.texCoords2D[0][2 * (vert + 2) + 1] = 0;
            vert += 3;
        }
        submesh.calculateTangents();
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, material);
        var node = new Node("Cone");
        node.addComponent(new MeshComponent(mesh));
        node.addComponent(new MeshRendererComponent());
        return node;
    },
    text: function(s, wrap) {
        var node = new Node("Text");
        node.addComponent(new TextComponent(s, wrap));
        node.addComponent(new TextRendererComponent());
        return node;
    },
    canvasBoard: function(width, height) {
        var node = new Node("Text");
        node.addComponent(new CanvasBoardComponent(width, height));
        node.addComponent(new CanvasBoardRendererComponent());
        return node;
    }
};

var CollisionOctreeNode = FrakClass.extend({
    init: function(center, size, parent) {
        this.parent = false;
        this.depth = 0;
        this.subnodes = false;
        this.bounds = false;
        if (parent) {
            this.parent = parent;
            this.root = parent.root;
            this.depth = parent.depth + 1;
        } else {
            this.maxDepth = 3;
            this.root = this;
            this.nodes = {};
            this.submeshes = {};
            this.cache = [ vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create() ];
        }
        this.faces = false;
        this.setSize(center, size);
    },
    clone: function(parent) {
        var copy = new CollisionOctreeNode(this.bounds.center, this.bounds.size[0], parent ? parent : false);
        copy.depth = this.depth;
        if (this.nodes) {
            copy.nodes = {};
            for (var nodeID in this.nodes) {
                copy.nodes[nodeID] = this.nodes[nodeID];
            }
        }
        if (this.submeshes) {
            copy.submeshes = {};
            for (var meshID in this.submeshes) {
                copy.submeshes[meshID] = this.submeshes[meshID];
            }
        }
        copy.faces = this.faces;
        if (this.subnodes) {
            copy.subnodes = [];
            for (var i = 0; i < this.subnodes.length; i++) {
                copy.subnodes.push(this.subnodes[i].clone(copy));
            }
        }
        return copy;
    },
    getNodeID: function() {
        var id = "/";
        var subnodeIndex = "root";
        if (this.parent) {
            id = this.parent.getNodeID();
            for (var subnode in this.parent.subnodes) {
                if (this.parent.subnodes[subnode] === this) {
                    subnodeIndex = subnode;
                    break;
                }
            }
        }
        return "{0}{1}/".format(id, subnodeIndex);
    },
    setSize: function(center, size) {
        this.bounds = new BoundingBox(center, [ size, size, size ]);
    },
    isLeaf: function() {
        return this.subnodes === false;
    },
    hasGeometry: function() {
        return this.faces !== false;
    },
    subdivide: function() {
        this.subnodes = [];
        var size = this.bounds.size[0] * .5;
        var extent = size * .5;
        var c = vec3.create();
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent, extent, extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ -extent, extent, extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent, -extent, extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ -extent, -extent, extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent, extent, -extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ -extent, extent, -extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent, -extent, -extent ]), size, this));
        this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ -extent, -extent, -extent ]), size, this));
    },
    optimize: function() {
        if (!this.isLeaf()) {
            for (var i in this.subnodes) this.subnodes[i].optimize();
            var empty = 0;
            for (var i = 0; i < this.subnodes.length; i++) {
                if (!this.subnodes[i].hasGeometry() && this.subnodes[i].isLeaf()) empty++;
            }
            if (empty == 8) {
                delete this.subnodes;
                this.subnodes = false;
            }
        }
    },
    rayIntersectBounds: function(ray) {
        var dir = ray.getDirection(this.root.cache[0]);
        var tmin = this.root.cache[1];
        var tmax = this.root.cache[2];
        dir[0] = 1 / dir[0];
        dir[1] = 1 / dir[1];
        dir[2] = 1 / dir[2];
        tmin[0] = (this.bounds.min[0] - ray.origin[0]) * dir[0];
        tmax[0] = (this.bounds.max[0] - ray.origin[0]) * dir[0];
        tmin[1] = (this.bounds.min[1] - ray.origin[1]) * dir[1];
        tmax[1] = (this.bounds.max[1] - ray.origin[1]) * dir[1];
        tmin[2] = (this.bounds.min[2] - ray.origin[2]) * dir[2];
        tmax[2] = (this.bounds.max[2] - ray.origin[2]) * dir[2];
        var t0 = Math.max(Math.min(tmin[0], tmax[0]), Math.min(tmin[1], tmax[1]), Math.min(tmin[2], tmax[2]));
        var t1 = Math.min(Math.max(tmin[0], tmax[0]), Math.max(tmin[1], tmax[1]), Math.max(tmin[2], tmax[2]));
        if (t1 < 0 || t0 > t1) return false;
        if (ray.infinite) return t0;
        if (t0 * t0 > vec3.sqrDist(ray.origin, ray.destination)) {
            if ((ray.origin[0] < this.bounds.min[0] || ray.origin[1] < this.bounds.min[1] || ray.origin[2] < this.bounds.min[2] || ray.origin[0] > this.bounds.max[0] || ray.origin[1] > this.bounds.max[1] || ray.origin[2] > this.bounds.max[2]) && (ray.destination[0] < this.bounds.min[0] || ray.destination[1] < this.bounds.min[1] || ray.destination[2] < this.bounds.min[2] || ray.destination[0] > this.bounds.max[0] || ray.destination[1] > this.bounds.max[1] || ray.destination[2] > this.bounds.max[2])) return false;
        }
        return t0;
    },
    rayIntersectGeometry: function(worldRay, collideInvisible) {
        if (!this.hasGeometry()) return false;
        var result = {
            submesh: false,
            node: false,
            t: Infinity,
            normal: vec3.create()
        };
        var a = this.root.cache[0];
        var b = this.root.cache[1];
        var c = this.root.cache[2];
        var inv = mat4.create();
        for (var nodeIndex in this.faces) {
            var localRay = worldRay.clone();
            if (!mat4.isIdentity(this.root.nodes[nodeIndex].transform.absolute)) {
                mat4.invert(inv, this.root.nodes[nodeIndex].transform.absolute);
                localRay.transform(inv);
            }
            var meshRendererComponent = this.root.nodes[nodeIndex].getComponent(MeshRendererComponent);
            for (var meshIndex in this.faces[nodeIndex]) {
                var visible;
                if (meshRendererComponent) {
                    for (var i in meshRendererComponent.meshRenderers) {
                        if (meshRendererComponent.meshRenderers[i].submesh == this.root.submeshes[meshIndex]) {
                            visible = meshRendererComponent.meshRenderers[i].visible;
                            break;
                        }
                    }
                }
                var faces = this.faces[nodeIndex][meshIndex];
                var positions = this.root.submeshes[meshIndex].positions;
                for (var i = 0; i < faces.length; i += 3) {
                    a[0] = positions[faces[i] * 3];
                    a[1] = positions[faces[i] * 3 + 1];
                    a[2] = positions[faces[i] * 3 + 2];
                    b[0] = positions[faces[i + 1] * 3];
                    b[1] = positions[faces[i + 1] * 3 + 1];
                    b[2] = positions[faces[i + 1] * 3 + 2];
                    c[0] = positions[faces[i + 2] * 3];
                    c[1] = positions[faces[i + 2] * 3 + 1];
                    c[2] = positions[faces[i + 2] * 3 + 2];
                    var t = localRay.intersectTriangleDistanceOnly(a, b, c);
                    if (t !== false) {
                        if (t < result.t) {
                            if (visible || collideInvisible) {
                                result.t = t;
                                result.submesh = this.root.submeshes[meshIndex];
                                result.node = this.root.nodes[nodeIndex];
                                vec3.cross(result.normal, vec3.subtract(this.root.cache[3], b, a), vec3.subtract(this.root.cache[4], c, a));
                                vec3.normalize(result.normal, result.normal);
                            }
                        }
                    }
                }
            }
        }
        return result;
    },
    getNodesWithGeometry: function(ray, list) {
        var t = this.rayIntersectBounds(ray);
        if (t !== false) {
            if (this.hasGeometry()) {
                var i = 0;
                for (;i < list.length; i++) {
                    if (list[i].t > t) break;
                }
                list.splice(i, 0, {
                    t: t,
                    octreeNode: this
                });
            }
            if (!this.isLeaf()) {
                for (var i = 0; i < this.subnodes.length; i++) this.subnodes[i].getNodesWithGeometry(ray, list);
            }
        }
    },
    getNearestRayCollision: function(localRay, worldRay, collideInvisible) {
        var nodes = [];
        this.getNodesWithGeometry(localRay, nodes);
        var result = {
            t: Infinity,
            octreeNode: false,
            submesh: false,
            node: false,
            normal: false
        };
        for (var i = 0; i < nodes.length; i++) {
            if (result.octreeNode !== false && nodes[i].depth == result.octreeNode.depth && nodes[i].t > result.t) {
                continue;
            }
            var collision = nodes[i].octreeNode.rayIntersectGeometry(worldRay, collideInvisible);
            if (collision.t < result.t) {
                result.t = collision.t;
                result.submesh = collision.submesh;
                result.octreeNode = nodes[i].octreeNode;
                result.node = collision.node;
                result.normal = collision.normal;
            }
        }
        return result;
    }
});

var Component = Serializable.extend({
    init: function() {
        this._super();
        this.updatePasses = 1;
        this.started = false;
        this.node = false;
        this.enable();
    },
    excluded: function() {
        return [ "started", "node" ];
    },
    getScene: function() {
        return this.node.scene;
    },
    enable: function() {
        if (!this.enabled) this.onEnable();
        this.enabled = true;
    },
    disable: function() {
        if (this.enabled) this.onDisable();
        this.enabled = false;
    },
    instantiate: function() {
        var instance = this.clone();
        return instance;
    },
    onAdd: function(node) {},
    onRemove: function(node) {},
    onAddScene: function(node) {},
    onRemoveScene: function(node) {},
    onEnable: function() {},
    onDisable: function() {},
    onStart: function(context, engine) {},
    onAfterStart: function(context, engine) {},
    start: function(context, engine) {
        this.onStart(context, engine);
    },
    onLoad: function(assetsManager, engine) {},
    onEnd: function(context, engine) {},
    onPreRender: function(context, camera) {},
    onPostRender: function(context, camera) {},
    onUpdateTransform: function(absolute) {},
    onUpdate: function(engine, pass) {}
});

var Transform = Component.extend({
    init: function(relative) {
        this._super();
        if (relative) {
            this.relative = relative;
        } else {
            this.relative = mat4.identity(mat4.create());
        }
        this.absolute = mat4.copy(mat4.create(), this.relative);
    },
    onAdd: function(node) {
        node.transform = this;
    },
    type: function() {
        return "Transform";
    },
    excluded: function() {
        return this._super().concat([ "absolute" ]);
    },
    calculateRelativeFromAbsolute: function(referenceMatrix) {
        if (!referenceMatrix) {
            mat4.copy(this.relative, this.absolute);
            return;
        }
        var referenceInverse = mat4.invert(mat4.create(), referenceMatrix);
        mat4.multiply(this.relative, this.absolute, referenceInverse);
    },
    getPosition: function(out) {
        if (!out) out = vec3.create();
        return mat4.translation(out, this.absolute);
    },
    getRelativePosition: function(out) {
        if (!out) out = vec3.create();
        return mat4.translation(out, this.relative);
    },
    setPosition: function(position) {
        mat4.fromRotationTranslation(this.relative, quat.fromMat4(quat.create(), this.relative), position);
    },
    getRotation: function(out) {
        if (!out) out = quat.create();
        return quat.fromMat4(out, this.absolute);
    },
    translate: function(offset) {
        this.relative = mat4.translate(this.relative, this.relative, offset);
    },
    rotate: function(angle, axis) {
        this.relative = mat4.rotate(this.relative, this.relative, angle, axis);
    },
    scale: function(scale) {
        this.relative = mat4.scale(this.relative, this.relative, scale);
    },
    clone: function() {
        var t = new Transform();
        t.relative = mat4.clone(this.relative);
        t.absolute = mat4.clone(this.absolute);
        return t;
    }
});

var CameraComponent = Component.extend({
    init: function(viewMatrix, projectionMatrix) {
        if (!viewMatrix || !projectionMatrix) {
            throw "CameraComponent can be initialized only with given viewMatrix and projectionMatrix. Normally one should create OrthoCamera or PerspectiveCamera instead";
        }
        this._super();
        this.camera = new Camera(viewMatrix, projectionMatrix, new ForwardRenderStage());
    },
    excluded: function() {
        return this._super().concat([ "camera" ]);
    },
    type: function() {
        return "CameraComponent";
    },
    onAddScene: function(node) {
        node.scene.cameras.push(this.camera);
        node.scene.cameras.sort(function(a, b) {
            return a.order - b.order;
        });
        this.useCameraViewMatrix();
    },
    onRemoveScene: function(node) {
        var cameras = node.scene.cameras;
        for (var i = 0; i < cameras.length; i++) {
            if (cameras[i] == this.camera) {
                cameras.splice(i, 1);
                i--;
            }
        }
    },
    onStart: function(context, engine) {
        this.initRenderStage(context, engine);
    },
    onUpdateTransform: function(absolute) {
        if (!this.node.transform) return;
        mat4.invert(this.camera.viewMatrix, this.node.transform.absolute);
    },
    lookAt: function(target, up) {
        if (!up) up = [ 0, 1, 0 ];
        mat4.lookAt(this.camera.viewMatrix, this.camera.getPosition(), target, up);
        this.useCameraViewMatrix();
    },
    setPosition: function(position) {
        this.camera.setPosition(position);
        this.useCameraViewMatrix();
    },
    center: function(point) {
        this.camera.center(point);
        this.useCameraViewMatrix();
    },
    fitToView: function(boundingVolume) {
        this.camera.fitToView(boundingVolume);
        this.useCameraViewMatrix();
    },
    fitNodeToView: function(node) {
        var bounds = new BoundingBox();
        node.onEachChild(function(subnode) {
            if (subnode.getComponent(MeshComponent)) {
                var meshComponent = subnode.getComponent(MeshComponent);
                bounds.encapsulateBox(meshComponent.mesh.boundingBox.transform(subnode.transform.absolute));
            }
        });
        this.fitToView(bounds);
    },
    screenPointToViewportPoint: function(point) {
        var p = vec2.create();
        var pos = vec2.create();
        if (this.camera.target instanceof TargetScreen) pos = this.camera.target.getPosition();
        var size = this.camera.target.getSize();
        if (Math.abs(size[0]) < EPSILON || Math.abs(size[1]) < EPSILON) return p;
        p[0] = (point[0] - pos[0]) / size[0];
        p[1] = (point[1] - pos[1]) / size[1];
        return p;
    },
    unprojectScreenPoint: function(point) {
        var size = this.node.scene.camera.target.getSize();
        var offset = vec2.create();
        var p = vec2.fromValues(point[0] - offset[0], size[1] - point[1] + offset[1]);
        if (Math.abs(size[0]) < EPSILON || Math.abs(size[1]) < EPSILON) return false;
        var pt = vec4.fromValues(2 * (p[0] / size[0]) - 1, 2 * (p[1] / size[1]) - 1, 2 * point[2] - 1, 1);
        var mat = mat4.mul(mat4.create(), this.camera.projectionMatrix, this.camera.viewMatrix);
        if (mat4.invert(mat, mat)) {
            vec4.transformMat4(pt, pt, mat);
            if (Math.abs(pt[3]) < EPSILON) return false;
            pt[3] = 1 / pt[3];
            return vec3.fromValues(pt[0] * pt[3], pt[1] * pt[3], pt[2] * pt[3]);
        }
        return false;
    },
    screenPointToRay: function(point) {
        var near = this.unprojectScreenPoint([ point[0], point[1], 0 ]);
        var far = this.unprojectScreenPoint([ point[0], point[1], 1 ]);
        if (near && far) return new Ray(near, far);
        return false;
    },
    worldToScreenPoint: function(point, out) {
        if (!out) out = vec2.create();
        var size = this.camera.target.getSize();
        var viewProj = mat4.mul(mat4.create(), this.camera.projectionMatrix, this.camera.viewMatrix);
        var projected = vec4.fromValues(point[0], point[1], point[2], 1);
        vec4.transformMat4(projected, projected, viewProj);
        projected[0] /= projected[3];
        projected[1] /= projected[3];
        projected[2] /= projected[3];
        out[0] = Math.round((projected[0] + 1) / 2 * size[0]);
        out[1] = Math.round((1 - projected[1]) / 2 * size[1]);
        return out;
    },
    useCameraViewMatrix: function() {
        if (!this.node.transform) return;
        this.node.transform.absolute = mat4.invert(mat4.create(), this.camera.viewMatrix);
        this.node.calculateRelativeFromAbsolute();
    },
    initRenderStage: function(context, engine) {
        if (this.camera.target instanceof TargetScreen) {
            var canvas = context.canvas;
            this.camera.target.setSize(canvas.width, canvas.height);
        }
        if (engine.options.renderer == "forward") {
            if (engine.options.transparencyMode == "blended" || engine.options.transparencyMode == "stochastic") {
                this.camera.renderStage.addStage(new OITPostProcess());
            }
            if (engine.options.ssao === true) {
                this.camera.renderStage.addStage(new SSAOPostProcess());
            }
        } else if (engine.options.renderer == "deferred") {
            delete this.camera.renderStage;
            this.camera.renderStage = new DeferredRenderStage();
            this.camera.renderStage.addStage(new OITPostProcess());
        }
        if (engine.options.antialias === true) {
            this.camera.renderStage.addStage(new AntiAliasPostProcess());
        }
        this.camera.renderStage.start(context, engine, this.camera);
    },
    onContextRestored: function(context) {
        this.camera.renderStage = new ForwardRenderStage();
        this.initRenderStage(context, context.engine);
    }
});

var PerspectiveCamera = CameraComponent.extend({
    init: function(fov, aspect, near, far) {
        if (!fov) fov = 45;
        if (!near) near = .3;
        if (!far) far = 1e3;
        if (!aspect) aspect = 4 / 3;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        var lookAt = mat4.create();
        mat4.lookAt(lookAt, [ 0, 0, -100 ], [ 0, 0, 0 ], [ 0, 1, 0 ]);
        this._super(lookAt, this.calculatePerspective());
        this.camera.near = this.near;
        this.camera.far = this.far;
    },
    type: function() {
        return "PerspectiveCamera";
    },
    onStart: function(context, engine) {
        if (!this.aspect) {
            this.setAspectRatio(context.canvas.width / context.canvas.height);
        }
        this._super(context, engine);
    },
    setClipPlanes: function(near, far) {
        this.near = near;
        this.far = far;
        this.camera.near = this.near;
        this.camera.far = this.far;
        this.camera.projectionMatrix = this.calculatePerspective();
    },
    setAspectRatio: function(aspect) {
        this.aspect = aspect;
        this.camera.projectionMatrix = this.calculatePerspective();
    },
    setVerticalFieldOfView: function(fov) {
        this.fov = fov;
        this.camera.projectionMatrix = this.calculatePerspective();
    },
    setHorizontalFieldOfView: function(fov) {
        fov = fov * (Math.PI * 2) / 360;
        var hpx = Math.tan(fov / 2);
        var vpx = hpx / this.aspect;
        this.fov = Math.atan(vpx) * 2 * 180 / Math.PI;
        this.camera.projectionMatrix = this.calculatePerspective();
    },
    getVerticalFieldOfView: function() {
        return this.camera.getFieldOfView() * 180 / Math.PI;
    },
    getHorizontalFieldOfView: function() {
        var vpx = Math.tan(this.camera.getFieldOfView() * .5);
        var hpx = this.aspect * vpx;
        var fovx = Math.atan(hpx) * 2;
        return fovx * 180 / Math.PI;
    },
    calculatePerspective: function() {
        var perspective = mat4.create();
        var aspect = this.aspect;
        if (!aspect) aspect = 1;
        mat4.perspective(perspective, this.fov * (Math.PI * 2) / 360, aspect, this.near, this.far);
        return perspective;
    }
});

var OrthoCamera = CameraComponent.extend({
    init: function(left, right, bottom, top, near, far) {
        if (!left) left = 0;
        if (!right) right = 512;
        if (!bottom) bottom = 512;
        if (!top) top = 0;
        if (!near) near = -100;
        if (!far) far = 100;
        var projection = mat4.ortho(mat4.create(), left, right, bottom, top, near, far);
        this._super(mat4.identity(mat4.create()), projection);
    },
    type: function() {
        return "OrthoCamera";
    }
});

var MeshComponent = Component.extend({
    init: function(mesh) {
        this.mesh = mesh;
        this._super();
    },
    type: function() {
        return "MeshComponent";
    },
    instantiate: function() {
        var c = this._super();
        c.mesh = this.mesh;
        return c;
    }
});

var RendererComponent = Component.extend({
    init: function() {
        this._super();
        this.castShadows = true;
        this.receiveShadows = true;
        this.lightContribution = 1;
        this.reflectivity = 0;
    },
    type: function() {
        return "RendererComponent";
    },
    instantiate: function() {
        var instance = this._super();
        instance.castShadows = this.castShadows;
        instance.receiveShadows = this.receiveShadows;
        instance.lightContribution = this.lightContribution;
        instance.reflectivity = this.reflectivity;
        return instance;
    },
    onContextRestored: function(context) {}
});

var MeshRendererComponent = RendererComponent.extend({
    init: function() {
        this.meshRenderers = [];
        this._super();
    },
    type: function() {
        return "MeshRendererComponent";
    },
    excluded: function() {
        return this._super().concat([ "meshRenderers" ]);
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
                for (var submeshIndex = 0; submeshIndex < component.mesh.submeshes.length; submeshIndex++) {
                    var submesh = component.mesh.submeshes[submeshIndex];
                    var material = component.mesh.getMaterial(submesh.materialIndex);
                    if (!material) {
                        console.warn("Failed to find submesh material: ", component.node.name, component.node);
                        continue;
                    }
                    if (submesh.positions.length == 0 || submesh.faces.length == 0) continue;
                    var submeshRenderer = scope.createRenderer(context, scope.node.transform.absolute, submesh, material);
                    scope.getScene().dynamicSpace.addRenderer(submeshRenderer);
                    scope.meshRenderers.push(submeshRenderer);
                    if (!scope.enabled) submeshRenderer.visible = false;
                }
            }
        });
    },
    removeRenderers: function() {
        for (var i = 0; i < this.meshRenderers.length; i++) {
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
    },
    onEnable: function() {
        for (var i = 0; i < this.meshRenderers.length; ++i) this.meshRenderers[i].visible = true;
    },
    onDisable: function() {
        for (var i = 0; i < this.meshRenderers.length; ++i) this.meshRenderers[i].visible = false;
    },
    getBoundingBox: function(excludeInvisible) {
        var bounds = new BoundingBox();
        for (var i = 0; i < this.meshRenderers.length; ++i) {
            if (excludeInvisible && !this.meshRenderers[i].visible) continue;
            bounds.encapsulateBox(this.meshRenderers[i].globalBoundingBox);
        }
        return bounds;
    },
    getBoundingSphere: function(excludeInvisible) {
        var bounds = new BoundingSphere();
        for (var i = 0; i < this.meshRenderers.length; ++i) {
            if (excludeInvisible && !this.meshRenderers[i].visible) continue;
            bounds.encapsulateSphere(this.meshRenderers[i].globalBoundingSphere);
        }
        return bounds;
    },
    setTransparency: function(value) {
        value = !!value;
        for (var i = 0; i < this.meshRenderers.length; ++i) {
            this.meshRenderers[i].transparent = value;
        }
    },
    getSubmeshRenderer: function(submesh) {
        for (var i = 0; i < this.meshRenderers.length; ++i) {
            if (this.meshRenderers[i].submesh === submesh) return this.meshRenderers[i];
        }
        return false;
    },
    onContextRestored: function(context) {
        this._super(context);
        for (var i = 0; i < this.meshRenderers.length; ++i) {
            this.meshRenderers[i].onContextRestored(context);
        }
    }
});

var SkyboxComponent = Component.extend({
    init: function() {
        this._super();
    },
    type: function() {
        return "SkyboxComponent";
    },
    setup: function(assetsManager, engine, images) {
        this.cubeTexture = assetsManager.texturesManager.addCube([ images[2].source, images[3].source, images[1].source, images[0].source, images[4].source, images[5].source ]);
        var extent = 1;
        if (engine.scene && engine.scene.camera && engine.scene.camera.far) {
            extent = Math.sqrt(engine.scene.camera.far * engine.scene.camera.far / 3);
        }
        this.meshNode = Primitives.box([ 0, 0, 0 ], [ extent, extent, extent ], new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("skybox")), {}, [ new Sampler("skybox0", this.cubeTexture) ]));
        this.node.addNode(this.meshNode);
        var meshRenderer = this.meshNode.getComponent(MeshRendererComponent);
        meshRenderer.castShadows = false;
        meshRenderer.disable();
        meshRenderer.addRenderers(engine.context, engine);
    }
});

var TextRendererComponent = MeshRendererComponent.extend({
    type: function() {
        return "TextRendererComponent";
    },
    onContextRestored: function(context) {
        this._super(context);
        var textComponent = this.node.getComponent(TextComponent);
        if (textComponent) textComponent.updateText();
    }
});

var CanvasBoardRendererComponent = MeshRendererComponent.extend({
    type: function() {
        return "CanvasBoardRendererComponent";
    }
});

var TextComponent = MeshComponent.extend({
    init: function(text, wrap) {
        this._super(new Mesh());
        this.context = false;
        this.material = false;
        this.texture = false;
        this.wrap = wrap > 0 ? wrap : 0;
        this.sampler = new Sampler("diffuse0", null);
        this.lines = [];
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.color = new Color(0, 0, 0, 1);
        this.fontSize = 56;
        this.style = "normal";
        this.variant = "normal";
        this.weight = "normal";
        this.family = "monospace";
        this.backgroundColor = new Color(0, 0, 0, 0);
        this.outline = true;
        this.outlineColor = new Color(1, 1, 1, 1);
        this.outlineWidth = 5;
        this.textLength = 0;
        this.textHeight = 0;
        this.setText(text);
    },
    excluded: function() {
        return this._super().concat([ "material", "texture", "sampler", "context" ]);
    },
    type: function() {
        return "TextComponent";
    },
    applyTextStyles: function(ctx2d) {
        if (this.outline) {
            ctx2d.strokeStyle = this.outlineColor.toString();
            ctx2d.lineWidth = this.outlineWidth;
        }
        ctx2d.fillStyle = this.color.toString();
        ctx2d.textBaseline = "middle";
        ctx2d.textAlign = "center";
        ctx2d.font = this.font;
    },
    updateFont: function() {
        this.font = "";
        if (this.style != "normal") this.font += this.style + " ";
        if (this.variant != "normal") this.font += this.variant + " ";
        if (this.weight != "normal") this.font += this.weight + " ";
        this.font += this.fontSize + "px " + this.family;
    },
    updateText: function() {
        if (this.text.length == 0) return;
        this.updateFont();
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        this.applyTextStyles(ctx);
        this.lines = [ this.text ];
        if (this.wrap) {
            this.lines = this.getLines(this.text, this.wrap);
        }
        for (var l in this.lines) {
            this.textLength = Math.max(this.textLength, ctx.measureText(this.lines[l]).width);
        }
        this.textHeight = 1.2 * this.fontSize * this.lines.length;
        canvas.width = this.canvasWidth = nextHighestPowerOfTwo(this.textLength);
        canvas.height = this.canvasHeight = nextHighestPowerOfTwo(this.textHeight);
        var top = (this.canvasHeight - this.textHeight) / 2;
        ctx.fillStyle = this.backgroundColor.toString();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.applyTextStyles(ctx);
        if (this.outline) {
            for (var l in this.lines) {
                ctx.strokeText(this.lines[l], canvas.width / 2, 1.2 * this.fontSize * l + top + this.fontSize * .6);
            }
        }
        for (var l in this.lines) {
            ctx.fillText(this.lines[l], canvas.width / 2, 1.2 * this.fontSize * l + top + this.fontSize * .6);
        }
        if (!this.context) return;
        var rendererComponent = this.node.getComponent(TextRendererComponent);
        if (!rendererComponent) return;
        this.texture.setImage(this.context, canvas);
        var height = 1;
        var width = canvas.width / canvas.height;
        var submesh = this.mesh.submeshes[0];
        submesh.positions[0] = -.5 * width;
        submesh.positions[1] = -.5 * height;
        submesh.positions[3] = -.5 * width;
        submesh.positions[4] = .5 * height;
        submesh.positions[6] = .5 * width;
        submesh.positions[7] = .5 * height;
        submesh.positions[9] = .5 * width;
        submesh.positions[10] = -.5 * height;
        submesh.recalculateBounds();
        if (rendererComponent.meshRenderers.length > 0) {
            var renderer = rendererComponent.meshRenderers[0];
            renderer.buffer.update("position", submesh.positions);
        }
    },
    onStart: function(context, engine) {
        this.context = context;
        this.material = new Material(engine.assetsManager.addShaderSource("transparent"), {
            diffuse: new UniformColor({
                r: 1,
                g: 1,
                b: 1,
                a: 1
            })
        }, [ this.sampler ]);
        this.material.shader.requirements.transparent = true;
        this.material.name = "TextComponentMaterial";
        this.texture = new Texture(context);
        this.texture.mipmapped = true;
        this.texture.clampToEdge = true;
        this.sampler.texture = this.texture;
        var submesh = new Submesh();
        submesh.positions = new Float32Array(12);
        submesh.normals = [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
        submesh.texCoords2D = [ [ 0, 0, 0, 1, 1, 1, 1, 0 ] ];
        submesh.faces = [ 0, 1, 2, 0, 2, 3 ];
        submesh.recalculateBounds();
        this.mesh.addSubmesh(submesh, this.material);
        this.updateText();
    },
    setText: function(text) {
        this.text = String(text);
        this.updateText();
    },
    getLines: function(text, linesCount) {
        var words = text.replace(/\&shy;/g, " &shy; ").split(" ");
        var textLength = text.replace("&shy;", "-").length;
        var lines = [];
        var currentLine = words[0];
        if (linesCount <= 0) return words;
        if (words.length <= linesCount) return words;
        for (var i = 1; i < words.length; i++) {
            if (words[i].toLowerCase() !== "&shy;") {
                if (currentLine.length > textLength / linesCount) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine += " " + words[i];
                }
            } else {
                if (currentLine.length + 1 > textLength / linesCount) {
                    lines.push(currentLine + "-");
                    currentLine = "";
                } else if (i + 1 < words.length) {
                    lines.push(currentLine + words[++i]);
                    currentLine = "";
                }
            }
        }
        if (currentLine !== "") lines.push(currentLine);
        return lines;
    },
    onContextRestored: function(context) {
        if (this.texture) delete this.texture;
        this.texture = new Texture(context);
        this.texture.mipmapped = true;
        this.texture.clampToEdge = true;
        this.sampler.texture = this.texture;
    }
});

var LineRendererComponent = RendererComponent.extend({
    init: function(color, width) {
        this._super();
        this.lightContribution = 0;
        this.receiveShadows = false;
        this.castShadows = false;
        if (color instanceof Color) {
            this.color = new UniformColor(color);
            this.defaultColor = color;
        } else {
            this.color = new UniformColor(new Color(.5, .5, .5, 1));
            this.defaultColor = new Color();
        }
        this.defaultWidth = width || 1;
        this.maxWidth = this.defaultWidth;
        this.roundCapPoints = Math.pow(2, Math.max(1, Math.round(Math.log2(this.defaultWidth)) - 2));
        this.renderer = null;
        this.damaged = true;
        this.material = new Material(null, {
            viewport: new UniformVec2()
        }, []);
        this.overlay = false;
        this.lines = [];
    },
    type: function() {
        return "LineRendererComponent";
    },
    excluded: function() {
        return this._super().concat([ "damaged", "renderer", "material" ]);
    },
    onStart: function(context, engine) {
        this.material.shader = engine.assetsManager.addShaderSource("lines");
        this.material.samplers = [];
        vec2.copy(this.material.uniforms.viewport.value, engine.scene.camera.target.size);
        if (!this.renderer) this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material);
        this.getScene().dynamicSpace.addRenderer(this.renderer);
        engine.assetsManager.load();
    },
    onEnd: function(context) {
        if (this.renderer) this.getScene().dynamicSpace.removeRenderer(this.renderer);
        delete this.renderer;
        this.renderer = null;
    },
    onUpdate: function(engine) {
        if (this.damaged) {
            this.rebuild(engine.context);
        }
    },
    onUpdateTransform: function(absolute) {
        if (this.renderer) {
            this.renderer.layer = this.node.layer;
            this.renderer.castShadows = this.castShadows;
            this.renderer.receiveShadows = this.receiveShadows;
            this.renderer.lightContribution = this.lightContribution;
            this.renderer.setMatrix(absolute);
        }
    },
    onEnable: function() {
        if (this.renderer) this.renderer.visible = true;
    },
    onDisable: function() {
        if (this.renderer) this.renderer.visible = false;
    },
    onPreRender: function(context, camera) {
        vec2.copy(this.material.uniforms.viewport.value, camera.target.size);
    },
    onPostRender: function(context, camera) {
        if (!this.overlay || !this.renderer || !this.enabled) return;
        context.projection.push();
        context.modelview.push();
        context.projection.load(camera.projectionMatrix);
        context.modelview.load(camera.viewMatrix);
        context.modelview.multiply(this.node.transform.absolute);
        this.material.bind();
        this.renderer.renderGeometry(context, this.material.shader);
        this.material.unbind();
        context.projection.pop();
        context.modelview.pop();
    },
    rebuild: function(context) {
        if (!this.renderer) {
            this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material);
        }
        var vertices = [];
        var faces = [];
        var pointsA = [];
        var pointsB = [];
        var widths = [];
        var colors = [];
        var rcp = this.roundCapPoints;
        var createLineGeometry = function() {
            var vertexOffset = vertices.length / 3;
            vertices.push(0, -.5, 0);
            vertices.push(0, .5, 0);
            vertices.push(0, .5, 1);
            vertices.push(0, -.5, 1);
            var count = 4;
            faces.push(vertexOffset, vertexOffset + 1, vertexOffset + 2, vertexOffset, vertexOffset + 2, vertexOffset + 3);
            vertices.push(0, 0, 0);
            vertices.push(0, 0, 1);
            count += 2;
            for (var z = 0; z < 2; z++) {
                var t = 3 * Math.PI / 2 - z * Math.PI;
                vertices.push(.5 * Math.cos(t), .5 * Math.sin(t), z);
                count++;
                var offset = count - 1;
                for (var i = 1; i < rcp + 1; i++) {
                    var theta0 = 3 * Math.PI / 2 - (i + rcp * z) / rcp * Math.PI;
                    vertices.push(.5 * Math.cos(theta0), .5 * Math.sin(theta0), z);
                    faces.push(vertexOffset + 4 + z, vertexOffset + offset + i - 1, vertexOffset + offset + i);
                    count++;
                }
            }
            return count;
        };
        if (!this.renderer.instanced) {
            for (var i = 0; i < this.lines.length; i++) {
                var count = createLineGeometry();
                for (var j = 0; j < count; j++) {
                    pointsA.push(this.lines[i].a[0], this.lines[i].a[1], this.lines[i].a[2]);
                    pointsB.push(this.lines[i].b[0], this.lines[i].b[1], this.lines[i].b[2]);
                    colors.push(this.lines[i].color.r, this.lines[i].color.g, this.lines[i].color.b, this.lines[i].color.a);
                    widths.push(this.lines[i].width);
                }
            }
        } else if (this.lines.length) {
            createLineGeometry();
            for (var i = 0; i < this.lines.length; i++) {
                pointsA.push(this.lines[i].a[0], this.lines[i].a[1], this.lines[i].a[2]);
                pointsB.push(this.lines[i].b[0], this.lines[i].b[1], this.lines[i].b[2]);
                colors.push(this.lines[i].color.r, this.lines[i].color.g, this.lines[i].color.b, this.lines[i].color.a);
                widths.push(this.lines[i].width);
            }
        }
        this.renderer.count = this.lines.length;
        this.renderer.buffer.updateFaces(faces);
        var _this = this;
        var addOrUpdateBuffer = function(name, items, itemSize, divisor) {
            if (_this.renderer.buffer.has(name)) {
                _this.renderer.buffer.update(name, items);
            } else {
                _this.renderer.buffer.add(name, items, itemSize, divisor);
            }
        };
        addOrUpdateBuffer("position", vertices, 3, 0);
        addOrUpdateBuffer("pointA", pointsA, 3, 1);
        addOrUpdateBuffer("pointB", pointsB, 3, 1);
        addOrUpdateBuffer("width", widths, 1, 1);
        addOrUpdateBuffer("color", colors, 4, 1);
        this.damaged = false;
    },
    clear: function(context) {
        this.lines = [];
        this.damaged = true;
    },
    addLine: function(a, b, color, width) {
        var lineID = this.lines.length;
        this.lines.push({
            a: a,
            b: b,
            color: color || this.defaultColor,
            width: width || this.defaultWidth
        });
        this.damaged = true;
        if (width && width > this.maxWidth) {
            this.maxWidth = width;
            this.roundCapPoints = Math.pow(2, Math.max(1, Math.round(Math.log2(width)) - 2));
        }
        return {
            vertexOffset: lineID
        };
    },
    addLines: function(lines) {
        var _this = this;
        return lines.map(function(line) {
            return _this.addLine(line.a, line.b, line.color, line.width);
        });
    },
    updateLine: function(line, a, b, color, width) {
        var line = this.lines[line.vertexOffset];
        line.a = a;
        line.b = b;
        line.color = color || line.color;
        line.width = width || line.width;
        this.damaged = true;
    },
    addTriangle: function(a, b, c) {
        this.addLine(a, b);
        this.addLine(b, c);
        this.addLine(c, a);
        this.damaged = true;
    },
    addBox: function(box) {
        if (!(box instanceof BoundingBox)) throw "LineRendererComponent.addBox expects box to be of type BoundingBox";
        this.addLine(box.min, [ box.min[0], box.min[1], box.max[2] ]);
        this.addLine(box.min, [ box.min[0], box.max[1], box.min[2] ]);
        this.addLine(box.min, [ box.max[0], box.min[1], box.min[2] ]);
        this.addLine(box.max, [ box.max[0], box.min[1], box.max[2] ]);
        this.addLine(box.max, [ box.max[0], box.max[1], box.min[2] ]);
        this.addLine(box.max, [ box.min[0], box.max[1], box.max[2] ]);
        this.addLine([ box.min[0], box.max[1], box.min[2] ], [ box.min[0], box.max[1], box.max[2] ]);
        this.addLine([ box.min[0], box.max[1], box.max[2] ], [ box.min[0], box.min[1], box.max[2] ]);
        this.addLine([ box.min[0], box.min[1], box.max[2] ], [ box.max[0], box.min[1], box.max[2] ]);
        this.addLine([ box.max[0], box.min[1], box.max[2] ], [ box.max[0], box.min[1], box.min[2] ]);
        this.addLine([ box.max[0], box.min[1], box.min[2] ], [ box.max[0], box.max[1], box.min[2] ]);
        this.addLine([ box.max[0], box.max[1], box.min[2] ], [ box.min[0], box.max[1], box.min[2] ]);
        this.damaged = true;
    },
    addGrid: function(center, count, scale) {
        var half = [ count[0] / 2, count[1] / 2 ];
        if (!scale) scale = [ 1, 1 ];
        for (var i = -half[0]; i <= half[0]; i++) {
            this.addLine([ i * scale[0] + center[0], center[1], -half[1] * scale[1] + center[2] ], [ i * scale[0] + center[0], center[1], half[1] * scale[1] + center[2] ]);
        }
        for (i = -half[1]; i <= half[1]; i++) {
            this.addLine([ -half[0] * scale[0] + center[0], center[1], i * scale[1] + center[2] ], [ half[0] * scale[0] + center[0], center[1], i * scale[1] + center[2] ]);
        }
        this.damaged = true;
    },
    onContextRestored: function(context) {
        this._super(context);
        if (this.renderer) {
            this.damaged = true;
            delete this.renderer.buffer;
            this.renderer.buffer = new LinesRenderBuffer(context);
            this.rebuild(context);
        }
    }
});

var CanvasBoardComponent = MeshComponent.extend({
    init: function(width, height) {
        this._super(new Mesh());
        this.width = width;
        this.height = height ? height : width;
        this.context = false;
        this.material = false;
        this.texture = false;
        this.canvasContext = false;
        this.canvas = false;
        this.sampler = new Sampler("diffuse0", null);
    },
    excluded: function() {
        return this._super().concat([ "material", "texture", "sampler", "context" ]);
    },
    type: function() {
        return "CanvasBoardComponent";
    },
    createContext: function() {
        if (!this.context) return;
        var rendererComponent = this.node.getComponent(CanvasBoardRendererComponent);
        if (!rendererComponent) return;
        this.canvas = document.createElement("canvas");
        this.canvasContext = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvasContext.fillStyle = "white";
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        var width = 1;
        var height = 1;
        var submesh = this.mesh.submeshes[0];
        submesh.positions[0] = -.5 * width;
        submesh.positions[1] = -.5 * height;
        submesh.positions[3] = -.5 * width;
        submesh.positions[4] = .5 * height;
        submesh.positions[6] = .5 * width;
        submesh.positions[7] = .5 * height;
        submesh.positions[9] = .5 * width;
        submesh.positions[10] = -.5 * height;
        submesh.recalculateBounds();
        this.texture.setImage(this.context, this.canvas);
        if (rendererComponent.meshRenderers.length > 0) {
            var renderer = rendererComponent.meshRenderers[0];
            renderer.buffer.update("position", submesh.positions);
        }
    },
    updateImage: function() {
        this.texture.setImage(this.context, this.canvas);
    },
    onStart: function(context, engine) {
        this.context = context;
        this.material = new Material(engine.assetsManager.addShaderSource("transparent"), {
            diffuse: new UniformColor({
                r: 1,
                g: 1,
                b: 1,
                a: 1
            })
        }, [ this.sampler ]);
        this.material.shader.requirements.transparent = true;
        this.material.name = "CanvasBoardMaterial";
        this.texture = new Texture(context);
        this.texture.mipmapped = true;
        this.texture.clampToEdge = true;
        this.sampler.texture = this.texture;
        var submesh = new Submesh();
        submesh.positions = new Float32Array(12);
        submesh.normals = [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
        submesh.texCoords2D = [ [ 0, 0, 0, 1, 1, 1, 1, 0 ] ];
        submesh.faces = [ 0, 1, 2, 0, 2, 3 ];
        submesh.recalculateBounds();
        this.mesh.addSubmesh(submesh, this.material);
        this.createContext();
    },
    getCanvasContext: function() {
        return this.canvasContext;
    }
});

var Controller = Component.extend({
    init: function() {
        this._super();
        this.delta = vec2.create();
        this.dragDelta = vec2.create();
        this.position = false;
        this.oldPosition = false;
        this.startDragPosition = false;
        this.buttons = [ false, false, false ];
    },
    excluded: function() {
        return this._super().concat([ "delta", "dragDelta", "position", "oldPosition", "startDragPosition", "buttons", "keyStates" ]);
    },
    type: function() {
        return "Controller";
    },
    onAddScene: function(node) {
        node.scene.engine.input.registerController(this);
    },
    onRemoveScene: function(node) {
        node.scene.engine.input.unregisterController(this);
    },
    bind: function(key, callback, obj) {
        if (this.node) {
            if (key && callback && obj) {
                this.node.scene.engine.input.bind(key, callback, obj);
            }
        }
    },
    getPriority: function(eventName) {
        return 0;
    },
    onStart: function(context, engine) {
        for (var i = 0; i < this.buttons.length; i++) this.buttons[i] = false;
    },
    onUpdate: function(engine) {},
    onKeyStateChange: function(key, state) {},
    onKeyDown: function(key) {},
    onKeyUp: function(key) {},
    onButtonDown: function(position, button, delta) {},
    onButtonUp: function(position, button, delta) {},
    onClick: function(position, button, delta) {},
    onMouseMove: function(position, buttons, delta) {},
    onMouseDown: function(position, button, delta) {
        this.buttons[button] = true;
    },
    onMouseUp: function(position, button, delta) {
        this.buttons[button] = false;
    }
});

var FlightController = Controller.extend({
    init: function() {
        this._super();
        this.rotation = vec3.create();
        this.velocity = vec3.fromValues(0, 0, 0);
        this.angularVelocity = vec3.fromValues(0, 0, 0);
        this.acceleration = .2;
        this.deceleration = .2;
        this.friction = .01;
        this.rotationAcceleration = .001;
        this.rotationFriction = .1;
        this.tmpRotation = quat.create();
        this.tmpImpulse = vec3.create();
    },
    type: function() {
        return "FlightController";
    },
    onAdd: function() {
        this._super();
        this.bind("W", "accelerate", this);
        this.bind("S", "decelerate", this);
        this.bind("A", "strafeLeft", this);
        this.bind("D", "strafeRight", this);
        this.bind("C", "moveDown", this);
        this.bind("space", "moveUp", this);
        this.bind("up_arrow", "accelerate", this);
        this.bind("down_arrow", "decelerate", this);
        this.bind("left_arrow", "strafeLeft", this);
        this.bind("right_arrow", "strafeRight", this);
    },
    accelerate: function(deltaTime) {
        this.addLocalImpulse([ 0, 0, -this.acceleration * deltaTime ]);
    },
    decelerate: function(deltaTime) {
        this.addLocalImpulse([ 0, 0, this.deceleration * deltaTime ]);
    },
    strafeLeft: function(deltaTime) {
        this.addLocalImpulse([ -this.deceleration * deltaTime, 0, 0 ]);
    },
    strafeRight: function(deltaTime) {
        this.addLocalImpulse([ this.deceleration * deltaTime, 0, 0 ]);
    },
    moveUp: function(deltaTime) {
        this.addWorldImpulse([ 0, this.acceleration * deltaTime, 0 ]);
    },
    moveDown: function(deltaTime) {
        this.addWorldImpulse([ 0, -this.acceleration * deltaTime, 0 ]);
    },
    addWorldImpulse: function(impulse) {
        vec3.add(this.velocity, this.velocity, impulse);
    },
    addLocalImpulse: function(impulse) {
        quat.fromMat4(this.tmpRotation, this.node.transform.absolute);
        vec3.transformQuat(this.tmpImpulse, impulse, this.tmpRotation);
        vec3.add(this.velocity, this.velocity, this.tmpImpulse);
    },
    onStep: function(oldPosition, newPosition, rotation) {
        return true;
    },
    onUpdate: function(engine, pass) {
        this._super(engine, pass);
        var td = engine.fps.getDelta();
        var ff = 1 + this.friction * td;
        vec3.scale(this.velocity, this.velocity, 1 / ff);
        var rf = 1 + this.rotationFriction * td;
        vec3.scale(this.angularVelocity, this.angularVelocity, 1 / rf);
        var temporaryVelocity = vec3.scale(vec3.create(), this.velocity, td);
        var temporaryAngularVelocity = vec3.scale(vec3.create(), this.angularVelocity, td);
        vec3.add(this.rotation, this.rotation, temporaryAngularVelocity);
        var rotation = quat.create();
        quat.rotateY(rotation, rotation, this.rotation[1]);
        quat.rotateX(rotation, rotation, this.rotation[0]);
        var oldPosition = mat4.translation(vec3.create(), this.node.transform.relative);
        var newPosition = vec3.add(vec3.create(), temporaryVelocity, oldPosition);
        if (this.onStep(oldPosition, newPosition, rotation)) mat4.fromRotationTranslation(this.node.transform.relative, rotation, newPosition);
    },
    onMouseMove: function(position, button, delta) {
        if (button !== 0) return;
        var impulse = vec3.create();
        var ra = this.rotationAcceleration;
        vec3.scale(impulse, [ -delta[1], -delta[0], 0 ], ra);
        vec3.add(this.angularVelocity, this.angularVelocity, impulse);
    }
});

var OrbitController = FlightController.extend({
    init: function() {
        this._super();
        this.target = new TypeReference("Transform");
        this.panButton = 2;
        this.rotateButton = 0;
        this.position = vec3.create();
        this.velocity = vec3.create();
        this.pan = vec3.create();
        this.minimumPan = [ -100, -100, -100 ];
        this.maximumPan = [ 100, 100, 100 ];
        this.panXAxis = [ 1, 0, 0 ];
        this.panYAxis = [ 0, 0, 1 ];
        this.panSpeed = .05;
        this.rotation = vec3.create();
        this.angularVelocity = vec3.create();
        this.minimumPitch = -Math.PI / 2.2;
        this.maximumPitch = 0;
        this.rotationAcceleration = .012;
        this.rotationFriction = .1;
        this.lastPinch = 0;
        this.zoomSpeed = 1;
        this.doZoomIn = false;
        this.doZoomOut = false;
        this.distance = 5;
        this.minimumDistance = 2.5;
        this.maximumDistance = 7.5;
        this.distanceSteps = 4;
        this.direction = vec3.create();
        this.cameraPosition = vec3.create();
        this.targetPosition = vec3.create();
        this.lookat = mat4.create();
        this.tmpRotation = quat.create();
        this.cbOnChange;
    },
    excluded: function() {
        return this._super().concat([ "velocity", "angularVelocity", "doZoomIn", "doZoomOut", "direction", "cameraPosition", "targetPosition", "lookat" ]);
    },
    type: function() {
        return "OrbitController";
    },
    onAdd: function() {
        this._super();
        this.bind("W", "zoomIn", this);
        this.bind("S", "zoomOut", this);
        this.bind("A", "rotateLeft", this);
        this.bind("D", "rotateRight", this);
        this.bind("E", "rotateUp", this);
        this.bind("Q", "rotateDown", this);
    },
    onChange: function(action, value) {
        if (this.cbOnChange && typeof this.cbOnChange === "function") {
            this.cbOnChange(action, value);
        }
    },
    getZoom: function() {
        var relativeDistance = this.distance - this.minimumDistance;
        var range = this.maximumDistance - this.minimumDistance;
        return relativeDistance / range;
    },
    setZoom: function(percentage) {
        percentage = Math.max(0, percentage);
        var range = this.maximumDistance - this.minimumDistance;
        this.distance = Math.min(this.minimumDistance + range * percentage, this.maximumDistance);
        this.onChange("distance", this.distance);
    },
    setDistance: function(_distance) {
        this.distance = Math.min(Math.max(_distance, this.minimumDistance), this.maximumDistance);
        this.onChange("distance", this.distance);
    },
    zoomIn: function(deltaTime) {
        if (!this.enabled) return;
        if (!deltaTime) deltaTime = 1;
        this.distance -= deltaTime * this.zoomSpeed * (this.maximumDistance - this.minimumDistance) / this.distanceSteps;
        if (this.distance < this.minimumDistance) this.distance = this.minimumDistance;
        this.onChange("distance", this.distance);
    },
    zoomOut: function(deltaTime) {
        if (!this.enabled) return;
        if (!deltaTime) deltaTime = 1;
        this.distance += deltaTime * this.zoomSpeed * (this.maximumDistance - this.minimumDistance) / this.distanceSteps;
        if (this.distance > this.maximumDistance) this.distance = this.maximumDistance;
        this.onChange("distance", this.distance, deltaTime * this.zoomSpeed * (this.maximumDistance - this.minimumDistance) / this.distanceSteps);
    },
    rotateLeft: function(deltaTime) {
        this.accelerate([ 0, -this.rotationAcceleration, 0 ], deltaTime);
    },
    rotateRight: function(deltaTime) {
        this.accelerate([ 0, this.rotationAcceleration, 0 ], deltaTime);
    },
    rotateUp: function(deltaTime) {
        this.accelerate([ this.rotationAcceleration, 0, 0 ], deltaTime);
    },
    rotateDown: function(deltaTime) {
        this.accelerate([ -this.rotationAcceleration, 0, 0 ], deltaTime);
    },
    accelerate: function(accelerationVector, deltaTime) {
        if (!this.enabled) return;
        vec3.scale(accelerationVector, accelerationVector, deltaTime);
        vec3.add(this.angularVelocity, this.angularVelocity, accelerationVector);
        this.onChange("accelerate", accelerationVector);
    },
    onUpdate: function(engine, pass) {
        this._super(engine, pass);
        if (this.target.isNull()) return;
        vec3.add(this.rotation, this.rotation, this.angularVelocity);
        quat.identity(this.tmpRotation);
        quat.rotateY(this.tmpRotation, this.tmpRotation, this.rotation[1]);
        quat.rotateX(this.tmpRotation, this.tmpRotation, this.rotation[0]);
        vec3.set(this.direction, 0, 0, 1);
        vec3.transformQuat(this.direction, this.direction, this.tmpRotation);
        vec3.scale(this.direction, this.direction, this.distance);
        mat4.translation(this.targetPosition, this.target.value.absolute);
        vec3.add(this.cameraPosition, this.targetPosition, this.direction);
        vec3.add(this.targetPosition, this.targetPosition, this.pan);
        vec3.add(this.cameraPosition, this.cameraPosition, this.pan);
        mat4.lookAt(this.lookat, this.cameraPosition, this.targetPosition, [ 0, 1, 0 ]);
        mat4.invert(this.node.transform.absolute, this.lookat);
        this.node.calculateRelativeFromAbsolute();
        if (this.doZoomIn) this.zoomIn();
        if (this.doZoomOut) this.zoomOut();
    },
    onMouseMove: function(position, button, delta, type) {
        if (this.rotateButton !== false && button == this.rotateButton) this.rotate(delta[1], delta[0]);
        if (this.panButton !== false && button == this.panButton) this.move(delta[0], delta[1]);
    },
    onPan: function(position, delta) {
        this.move(delta[0], delta[1]);
    },
    rotate: function(xDelta, yDelta) {
        var impulse = vec3.create();
        vec3.scale(impulse, [ -xDelta, -yDelta, 0 ], this.rotationAcceleration);
        vec3.add(this.rotation, this.rotation, impulse);
        this.rotation[0] = Math.max(this.minimumPitch, this.rotation[0]);
        this.rotation[0] = Math.min(this.maximumPitch, this.rotation[0]);
        this.onChange("rotate", xDelta, yDelta);
    },
    move: function(xDelta, yDelta) {
        var delta = vec3.create();
        vec3.scale(delta, this.panXAxis, -xDelta);
        vec3.add(delta, delta, vec3.scale(vec3.create(), this.panYAxis, -yDelta));
        delta = vec3.scale(delta, delta, this.distance / 900);
        var q = quat.fromMat4(quat.create(), this.node.transform.absolute);
        var dir = vec3.fromValues(0, 0, 1);
        vec3.transformQuat(dir, dir, q);
        var angle = Math.atan2(dir[2], dir[0]);
        angle -= Math.PI / 2;
        quat.identity(q);
        quat.rotateY(q, q, angle);
        quat.conjugate(q, q);
        quat.normalize(q, q);
        vec3.transformQuat(delta, delta, q);
        vec3.add(this.pan, this.pan, delta);
        this.pan[0] = Math.max(this.pan[0], this.minimumPan[0]);
        this.pan[1] = Math.max(this.pan[1], this.minimumPan[1]);
        this.pan[2] = Math.max(this.pan[2], this.minimumPan[2]);
        this.pan[0] = Math.min(this.pan[0], this.maximumPan[0]);
        this.pan[1] = Math.min(this.pan[1], this.maximumPan[1]);
        this.pan[2] = Math.min(this.pan[2], this.maximumPan[2]);
        this.onChange("move", xDelta, yDelta);
    },
    onPinch: function(position, scale) {
        scale = this.getZoom() + (1 - scale);
        this.setZoom(scale);
    },
    onRotate: function(position, rotation, type, event) {
        var rad = rotation * (Math.PI / 180);
        this.rotation[1] = this.rotation[1] + rad;
        this.onChange("rotate", rotation);
    },
    onMouseWheel: function(position, delta, direction, type, event) {
        if (direction < 0) {
            this.zoomIn();
        } else {
            this.zoomOut();
        }
    }
});

var SmoothOrbitController = OrbitController.extend({
    init: function() {
        this._super();
        this.speed = 5;
        this.currentRotation = vec2.create();
        this.currentDistance = this.distance;
        this.enableRotatingX = true;
        this.enableRotatingY = true;
    },
    excluded: function() {
        return this._super().concat([ "currentRotation", "currentDistance", "tmpRotation" ]);
    },
    type: function() {
        return "SmoothOrbitController";
    },
    onUpdate: function(engine, pass) {
        if (this.target.isNull()) return;
        var dt = engine.fps.getDelta() / 1e3 * this.speed;
        dt = Math.min(dt, 1);
        if (this.enableRotatingX) this.currentRotation[0] = lerp(this.currentRotation[0], this.rotation[0], dt);
        if (this.enableRotatingY) this.currentRotation[1] = lerp(this.currentRotation[1], this.rotation[1], dt);
        this.currentDistance = lerp(this.currentDistance, this.distance, dt);
        quat.identity(this.tmpRotation);
        quat.rotateY(this.tmpRotation, this.tmpRotation, this.currentRotation[1]);
        quat.rotateX(this.tmpRotation, this.tmpRotation, this.currentRotation[0]);
        vec3.set(this.direction, 0, 0, 1);
        vec3.transformQuat(this.direction, this.direction, this.tmpRotation);
        vec3.scale(this.direction, this.direction, this.currentDistance);
        mat4.translation(this.targetPosition, this.target.value.absolute);
        vec3.add(this.cameraPosition, this.targetPosition, this.direction);
        vec3.add(this.targetPosition, this.targetPosition, this.pan);
        vec3.add(this.cameraPosition, this.cameraPosition, this.pan);
        mat4.lookAt(this.lookat, this.cameraPosition, this.targetPosition, [ 0, 1, 0 ]);
        mat4.invert(this.node.transform.absolute, this.lookat);
        this.node.calculateRelativeFromAbsolute();
        if (this.doZoomIn) this.zoomIn();
        if (this.doZoomOut) this.zoomOut();
    }
});

var Billboard = Component.extend({
    init: function(cameraToLookAt, smoothRotation, rotationSpeed) {
        this._super();
        this.cameraToLookAt = cameraToLookAt;
        this.smoothRotation = smoothRotation === true;
        this.rotationSpeed = 4;
        if (rotationSpeed) this.rotationSpeed = rotationSpeed;
        this.cacheMat4 = [ mat4.create() ];
        this.cacheQuat = [ quat.create(), quat.create() ];
        this.cacheVec3 = [ vec3.create(), vec3.create() ];
    },
    type: function() {
        return "Billboard";
    },
    onUpdate: function(engine) {
        if (!this.enabled) return;
        if (!(this.cameraToLookAt instanceof Camera)) throw "Billboard.cameraToLookAt is not an instance of Camera";
        var delta = engine.fps.getDelta() / 1e3;
        var invViewMatrix = mat4.invert(this.cacheMat4[0], this.cameraToLookAt.viewMatrix);
        var rotation = quat.fromMat4(this.cacheQuat[0], invViewMatrix);
        if (this.smoothRotation) {
            var localRotation = quat.fromMat4(this.cacheQuat[1], this.node.transform.relative);
            quat.slerp(rotation, localRotation, rotation, this.rotationSpeed * delta);
        }
        quat.normalize(rotation, rotation);
        var localPosition = mat4.translation(this.cacheVec3[0], this.node.transform.relative);
        var localScale = mat4.getScale(this.cacheVec3[1], this.node.transform.relative);
        mat4.fromRotationTranslationScale(this.node.transform.relative, rotation, localPosition, localScale);
    }
});

var VerticalBillboard = Billboard.extend({
    init: function(cameraToLookAt, smoothRotation, rotationSpeed) {
        this._super(cameraToLookAt, smoothRotation, rotationSpeed);
    },
    type: function() {
        return "VerticalBillboard";
    },
    onUpdate: function(engine) {
        if (!(this.cameraToLookAt instanceof Camera)) throw "VerticalBillboard.cameraToLookAt is not an instance of Camera";
        var delta = engine.fps.getDelta() / 1e3;
        var invViewMatrix = mat4.invert(this.cacheMat4[0], this.cameraToLookAt.viewMatrix);
        var rotation = quat.fromMat4(this.cacheQuat[0], invViewMatrix);
        quat.multiply(rotation, rotation, quat.euler(this.cacheQuat[1], 0, 180, 0));
        if (this.smoothRotation) {
            rotation[0] = 0;
            rotation[2] = 0;
            quat.normalize(rotation, rotation);
            var localRotation = quat.fromMat4(this.cacheQuat[1], this.node.transform.relative);
            quat.slerp(rotation, localRotation, rotation, this.rotationSpeed * delta);
        }
        quat.normalize(rotation, rotation);
        var localPosition = mat4.translation(this.cacheVec3[0], this.node.transform.relative);
        var localScale = mat4.getScale(this.cacheVec3[1], this.node.transform.relative);
        mat4.fromRotationTranslationScale(this.node.transform.relative, rotation, localPosition, localScale);
    }
});

var Collider = Component.extend({
    init: function() {
        this._super();
    },
    type: function() {
        return "Collider";
    },
    onStart: function(context, engine) {
        this.getScene().dynamicSpace.addCollider(this);
    },
    onEnd: function(context, engine) {
        this.getScene().dynamicSpace.removeCollider(this);
    },
    rayTest: function(ray, result, collideInvisible) {
        return false;
    }
});

var MeshCollider = Collider.extend({
    init: function() {
        this._super();
    },
    type: function() {
        return "MeshCollider";
    },
    rayTest: function(ray, result, collideInvisible) {
        if (!this.enabled) return false;
        var meshRendererComponent = this.node.getComponent(MeshRendererComponent);
        if (!meshRendererComponent) return false;
        var renderers = meshRendererComponent.meshRenderers;
        var a = vec3.create();
        var b = vec3.create();
        var c = vec3.create();
        var hit = false;
        for (var i = 0; i < renderers.length; i++) {
            if (!collideInvisible && !renderers[i].visible) continue;
            if (ray.intersectBoundingVolume(renderers[i].globalBoundingBox)) {
                var localRay = ray.clone();
                var invMat = mat4.invert(mat4.create(), renderers[i].matrix);
                localRay.transform(invMat);
                var faces = renderers[i].submesh.faces;
                var positions = renderers[i].submesh.positions;
                if (result) {
                    var collider = this;
                    result.addCallback = function(item) {
                        vec3.transformMat4(item.point, item.point, renderers[i].matrix);
                        item.submesh = renderers[i].submesh;
                        item.collider = collider;
                        item.node = collider.node;
                    };
                }
                for (var v = 0; v < faces.length; v += 3) {
                    a[0] = positions[faces[v] * 3];
                    a[1] = positions[faces[v] * 3 + 1];
                    a[2] = positions[faces[v] * 3 + 2];
                    b[0] = positions[faces[v + 1] * 3];
                    b[1] = positions[faces[v + 1] * 3 + 1];
                    b[2] = positions[faces[v + 1] * 3 + 2];
                    c[0] = positions[faces[v + 2] * 3];
                    c[1] = positions[faces[v + 2] * 3 + 1];
                    c[2] = positions[faces[v + 2] * 3 + 2];
                    if (localRay.intersectTriangle(a, b, c, result)) {
                        if (!result) return true;
                        hit = true;
                        break;
                    }
                }
                if (result) result.addCallback = false; else if (hit) return true;
            }
        }
        return hit;
    }
});

var LargeMeshCollider = Collider.extend({
    init: function(mesh) {
        this._super();
        this.tree = false;
        this.meshes = [];
        this.damaged = false;
        this.invMat = mat4.create();
    },
    type: function() {
        return "LargeMeshCollider";
    },
    excluded: function() {
        return this._super().concat([ "tree", "meshes" ]);
    },
    isComplete: function() {
        return this.tree !== false && this.meshes.length == 0;
    },
    onAdd: function(node) {
        this._super();
        if (this.damaged) {
            var root = this.node;
            function findSubnodeWithCollisionID(id) {
                var needle = null;
                root.onEachChild(function(subnode) {
                    if (subnode.localCollisionID === id) {
                        needle = subnode;
                        return true;
                    }
                });
                return needle;
            }
            for (var i in this.tree.nodes) {
                var id = this.tree.nodes[i].localCollisionID;
                if (id < 0) continue;
                this.tree.nodes[i] = findSubnodeWithCollisionID(id);
            }
            this.damaged = false;
        }
    },
    clone: function() {
        var lmc = new LargeMeshCollider();
        if (this.tree) {
            lmc.tree = this.tree.clone();
            lmc.damaged = true;
        }
        return lmc;
    },
    rayTest: function(ray, result, collideInvisible) {
        if (!this.enabled || !this.isComplete()) return false;
        var localRay = ray.clone();
        mat4.invert(this.invMat, this.node.transform.absolute);
        localRay.transform(this.invMat);
        var collision = this.tree.getNearestRayCollision(localRay, ray, collideInvisible);
        if (collision.t == Infinity || collision.t == -Infinity) return false;
        if (result && collision) {
            var p = localRay.getPointOnRay(collision.t);
            vec3.transformMat4(p, p, this.node.transform.absolute);
            result.hits.push({
                point: p,
                collider: this,
                submesh: collision.submesh,
                node: collision.node,
                normal: collision.normal
            });
        }
        return collision !== false;
    }
});

var Resource = Component.extend({
    init: function() {
        this._super();
        this.descriptor = false;
    },
    excluded: function() {
        return this._super().concat([ "resource" ]);
    },
    type: function() {
        return "ResourceComponent";
    }
});

var TextureResource = Resource.extend({
    init: function() {
        this._super();
        this.descriptor = new TextureDescriptor();
        this.texture = false;
        this.engine = false;
    },
    excluded: function() {
        return this._super().concat([ "texture", "engine" ]);
    },
    type: function() {
        return "TextureResource";
    },
    load: function(callback) {
        var me = this;
        this.texture = this.engine.assetsManager.texturesManager.addDescriptor(this.descriptor);
        this.engine.assetsManager.load(function() {
            me.onLoaded();
            if (callback) callback(me.engine.context, me.engine);
        });
    },
    onStart: function(context, engine) {
        this.engine = engine;
        this.load();
    },
    onLoaded: function() {}
});

var ModelResource = Resource.extend({
    init: function() {
        this._super();
        this.descriptor = new ModelDescriptor();
        this.model = false;
    },
    type: function() {
        return "ModelResource";
    },
    excluded: function() {
        return this._super().concat([ "model", "engine" ]);
    },
    load: function(callback) {
        if (!this.descriptor.source) return;
        var me = this;
        this.model = this.engine.assetsManager.modelsManager.addDescriptor(this.descriptor);
        this.engine.assetsManager.load(function() {
            me.node.addNode(me.model);
            me.onLoaded();
            if (callback) callback(me.engine.context, me.engine);
        });
    },
    onStart: function(context, engine) {
        this.engine = engine;
        this.load();
    },
    onLoaded: function() {}
});

var MaterialResource = Resource.extend({
    init: function() {
        this._super();
        this.descriptor = new MaterialSourceDescriptor();
        this.material = false;
        this.engine = false;
    },
    excluded: function() {
        return this._super().concat([ "material", "engine" ]);
    },
    type: function() {
        return "MaterialResource";
    },
    load: function(callback) {
        var me = this;
        this.texture = this.engine.assetsManager.materialSourcesManager.addDescriptor(this.descriptor);
        this.engine.assetsManager.load(function() {
            me.onLoaded();
            if (callback) callback(me.engine.context, me.engine);
        });
    },
    onStart: function(context, engine) {
        this.engine = engine;
        this.load();
    },
    onLoaded: function() {}
});

var Light = Component.extend({
    init: function() {
        this._super();
        this.color = new Color(1, 1, 1, 1);
        this.intensity = 1;
        this.shadowCasting = false;
        this.shadowMask = 4294967295;
        this.damaged = true;
    },
    type: function() {
        return "Light";
    },
    onAddScene: function(node) {
        node.scene.lights.push(this);
    },
    onRemoveScene: function(node) {
        var lights = node.scene.lights;
        for (var i = 0; i < lights.length; i++) {
            if (lights[i] == this) {
                lights.splice(i, 1);
                i--;
            }
        }
    },
    getGeometryRenderers: function() {
        return [];
    },
    isPositional: function() {
        return false;
    },
    onContextRestored: function(context) {},
    damage: function() {
        this.damaged = true;
    },
    undamage: function() {
        this.damaged = false;
    }
});

var OmniLight = Light.extend({
    init: function(size, color) {
        this._super();
        this.size = size || 1;
        this.color = color || new Color(1, 1, 1, 1);
        this.intensity = 1;
        this.geometry = null;
        this.material = null;
    },
    type: function() {
        return "OmniLight";
    },
    onStart: function(context, engine) {
        this._super();
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("deferred_light_omni")), {
            lightColor: new UniformColor(this.color),
            lightPosition: new UniformVec3(vec3.create()),
            lightIntensity: new UniformFloat(this.intensity),
            lightRadius: new UniformFloat(this.size)
        }, []);
        this.geometry = Primitives.sphere(this.size, 16, 16, this.material);
        this.geometry.getComponent(MeshRendererComponent).disable();
        this.node.addNode(this.geometry);
        engine.assetsManager.load();
    },
    onPreRender: function() {
        vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
        this.node.transform.getPosition(this.material.uniforms.lightPosition.value);
        this.material.uniforms.lightIntensity.value = this.intensity;
        this.material.uniforms.lightRadius.value = this.size;
    },
    getGeometryRenderers: function() {
        return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
    },
    isPositional: function() {
        return true;
    }
});

var AmbientLight = Light.extend({
    init: function(color) {
        this._super();
        this.color = color || new Color(.2, .2, .2, 1);
        this.geometry = null;
        this.material = null;
    },
    type: function() {
        return "AmbientLight";
    },
    onStart: function(context, engine) {
        this._super();
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("deferred_light_ambient")), {
            lightColor: new UniformColor(this.color)
        }, []);
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = [ -1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0 ];
        submesh.normals = [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
        submesh.texCoords2D = [ [ 0, 0, 0, 1, 1, 1, 1, 0 ] ];
        submesh.faces = [ 0, 1, 2, 0, 2, 3 ];
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, this.material);
        this.geometry = new Node("AmbientLightGeometry");
        this.geometry.addComponent(new MeshComponent(mesh));
        this.geometry.addComponent(new MeshRendererComponent()).disable();
        this.node.addNode(this.geometry);
        engine.assetsManager.load();
    },
    onUpdate: function() {
        vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
    },
    getGeometryRenderers: function() {
        return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
    }
});

var DirectionalLight = Light.extend({
    init: function(direction, color) {
        this._super();
        this.intensity = 1;
        this.color = color || new Color(1, 1, 1, 1);
        this.direction = vec3.fromValues(1, 1, 1);
        if (direction) this.setLightDirection(direction);
        this.shadowResolution = vec2.fromValues(2048, 2048);
        this.shadowBias = .01;
        this.geometry = null;
        this.material = null;
        this.shadow = null;
        this.shadowSampler = null;
        this.lightView = mat4.create();
        this.lightProj = mat4.create();
    },
    type: function() {
        return "DirectionalLight";
    },
    setLightDirection: function(direction) {
        vec3.copy(this.direction, direction);
        vec3.normalize(this.direction, this.direction);
    },
    onStart: function(context, engine) {
        this._super();
        vec2.set(this.shadowResolution, engine.options.directionalShadowResolution, engine.options.directionalShadowResolution);
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("deferred_light_directional")), {
            lightColor: new UniformColor(this.color),
            lightIntensity: new UniformFloat(this.intensity),
            lightDirection: new UniformVec3(vec3.create()),
            lightView: new UniformMat4(mat4.create()),
            lightProjection: new UniformMat4(mat4.create()),
            useShadows: new UniformInt(0),
            shadowBias: new UniformFloat(.01)
        }, []);
        if (this.shadowCasting && !this.shadow) {
            if (context.isWebGL2()) {
                this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
            } else {
                var extHalfFloat = context.gl.getExtension("OES_texture_half_float");
                var extFloat = context.gl.getExtension("OES_texture_float");
                if (!extFloat && !extHalfFloat) {
                    this.shadow = new TargetTexture(this.shadowResolution, context, false);
                } else {
                    this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
                }
            }
            this.shadowSampler = new Sampler("shadow0", this.shadow.texture);
            this.material.samplers.push(this.shadowSampler);
        }
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = [ -1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0 ];
        submesh.normals = [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
        submesh.texCoords2D = [ [ 0, 0, 0, 1, 1, 1, 1, 0 ] ];
        submesh.faces = [ 0, 1, 2, 0, 2, 3 ];
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, this.material);
        this.geometry = new Node("DirectionalLightGeometry");
        this.geometry.addComponent(new MeshComponent(mesh));
        this.geometry.addComponent(new MeshRendererComponent()).disable();
        this.node.addNode(this.geometry);
        engine.assetsManager.load();
    },
    onUpdate: function(engine) {
        vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
        vec3.copy(this.material.uniforms.lightDirection.value, this.direction);
        this.material.uniforms.lightIntensity.value = this.intensity;
        this.material.uniforms.useShadows.value = this.shadowCasting ? 1 : 0;
        this.material.uniforms.shadowBias.value = this.shadowBias;
        this.updateSamplers(engine.context);
    },
    updateSamplers: function(context) {
        if (this.shadowCasting) {
            if (!this.shadow) {
                this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
                if (!this.shadowSampler) {
                    this.shadowSampler = new Sampler("shadow0", this.shadow.texture);
                    this.material.samplers.push(this.shadowSampler);
                } else {
                    this.shadowSampler.texture = this.shadow.texture;
                }
            }
            mat4.copy(this.material.uniforms.lightView.value, this.lightView);
            mat4.copy(this.material.uniforms.lightProjection.value, this.lightProj);
        }
    },
    getGeometryRenderers: function() {
        return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
    },
    onContextRestored: function(context) {
        delete this.shadow;
        this.shadow = null;
    }
});

function TerrainMesh() {
    var scope = this;
    this.generate = function(size, cellSize, numCones) {
        if (numCones < 1) throw "TerrainMesh: numCones must be at least 1";
        var positions = [];
        var uv = [];
        var normals = [];
        var faces = [];
        var barycentric = [];
        var offset = 0;
        var meshSize = size * Math.pow(2, numCones - 1);
        var halfSize = meshSize / 2;
        var LEFT = 1, RIGHT = 2, UP = 3, DOWN = 4;
        function mapuv(p) {
            return (p + halfSize) / meshSize;
        }
        function addOctoFan(position, cellSize, sideA, sideB) {
            positions.push(position[0], position[1], position[2]);
            uv.push(mapuv(position[0]), mapuv(position[2]));
            normals.push(0, 1, 0);
            barycentric.push(0, 0, 1);
            positions.push(position[0] - .5 * cellSize, position[1], position[2] - .5 * cellSize);
            uv.push(mapuv(position[0] - .5 * cellSize), mapuv(position[2] - .5 * cellSize));
            normals.push(0, 1, 0);
            barycentric.push(0, 1, 0);
            if (sideA !== LEFT && sideB !== LEFT) {
                positions.push(position[0] - .5 * cellSize, position[1], position[2]);
                uv.push(mapuv(position[0] - .5 * cellSize), mapuv(position[2]));
                normals.push(0, 1, 0);
                barycentric.push(0, 0, 0);
            }
            positions.push(position[0] - .5 * cellSize, position[1], position[2] + .5 * cellSize);
            uv.push(mapuv(position[0] - .5 * cellSize), mapuv(position[2] + .5 * cellSize));
            normals.push(0, 1, 0);
            barycentric.push(1, 0, 0);
            if (sideA !== UP && sideB !== UP) {
                positions.push(position[0], position[1], position[2] + .5 * cellSize);
                uv.push(mapuv(position[0]), mapuv(position[2] + .5 * cellSize));
                normals.push(0, 1, 0);
                barycentric.push(0, 0, 0);
            }
            positions.push(position[0] + .5 * cellSize, position[1], position[2] + .5 * cellSize);
            uv.push(mapuv(position[0] + .5 * cellSize), mapuv(position[2] + .5 * cellSize));
            normals.push(0, 1, 0);
            barycentric.push(1, 1, 0);
            if (sideA !== RIGHT && sideB !== RIGHT) {
                positions.push(position[0] + .5 * cellSize, position[1], position[2]);
                uv.push(mapuv(position[0] + .5 * cellSize), mapuv(position[2]));
                normals.push(0, 1, 0);
                barycentric.push(0, 0, 0);
            }
            positions.push(position[0] + .5 * cellSize, position[1], position[2] - .5 * cellSize);
            uv.push(mapuv(position[0] + .5 * cellSize), mapuv(position[2] - .5 * cellSize));
            normals.push(0, 1, 0);
            barycentric.push(0, 1, 1);
            if (sideA !== DOWN && sideB !== DOWN) {
                positions.push(position[0], position[1], position[2] - .5 * cellSize);
                uv.push(mapuv(position[0]), mapuv(position[2] - .5 * cellSize));
                normals.push(0, 1, 0);
                barycentric.push(0, 0, 0);
            }
            if (sideA && sideB) {
                faces.push(offset + 0, offset + 1, offset + 2, offset + 0, offset + 2, offset + 3, offset + 0, offset + 3, offset + 4, offset + 0, offset + 4, offset + 5, offset + 0, offset + 5, offset + 6, offset + 0, offset + 6, offset + 1);
                offset += 7;
            } else if (!sideA && !sideB) {
                faces.push(offset + 0, offset + 1, offset + 2, offset + 0, offset + 2, offset + 3, offset + 0, offset + 3, offset + 4, offset + 0, offset + 4, offset + 5, offset + 0, offset + 5, offset + 6, offset + 0, offset + 6, offset + 7, offset + 0, offset + 7, offset + 8, offset + 0, offset + 8, offset + 1);
                offset += 9;
            } else {
                faces.push(offset + 0, offset + 1, offset + 2, offset + 0, offset + 2, offset + 3, offset + 0, offset + 3, offset + 4, offset + 0, offset + 4, offset + 5, offset + 0, offset + 5, offset + 6, offset + 0, offset + 6, offset + 7, offset + 0, offset + 7, offset + 1);
                offset += 8;
            }
        }
        function genCone(size, cellSize, gridStep, prevBounds) {
            var origin = vec3.create();
            var count = size / cellSize;
            var x = -(size - cellSize) / 2;
            for (var i = 0; i < count; i++) {
                var y = -(size - cellSize) / 2;
                for (var j = 0; j < count; j++) {
                    if (prevBounds) {
                        if (x > prevBounds[0] && x < prevBounds[1] && y > prevBounds[0] && y < prevBounds[1]) {
                            y += cellSize;
                            continue;
                        }
                    }
                    origin[0] = x;
                    origin[2] = y;
                    origin[1] = gridStep;
                    if (i == 0 || i == count - 1 || j == 0 || j == count - 1) {
                        var a = null;
                        var b = null;
                        if (i == 0) a = LEFT; else if (i == count - 1) a = RIGHT;
                        if (j == 0) b = DOWN; else if (j == count - 1) b = UP;
                        addOctoFan(origin, cellSize, a, b);
                    } else {
                        addOctoFan(origin, cellSize);
                    }
                    y += cellSize;
                }
                x += cellSize;
            }
        }
        var step = .5;
        genCone(size, cellSize, step);
        var prevBounds = vec2.create();
        for (var i = 1; i < numCones; i++) {
            vec2.set(prevBounds, -(size - cellSize) / 2, (size - cellSize) / 2);
            size *= 2;
            cellSize *= 2;
            step *= 2;
            genCone(size, cellSize, step, prevBounds);
        }
        scope.positions = positions;
        scope.barycentric = barycentric;
        scope.normals = normals;
        scope.uv = uv;
        scope.faces = faces;
    };
}

var GPUTerrain = MeshRendererComponent.extend({
    init: function(heightImage, colorImage, options) {
        this._super();
        this.options = FRAK.extend({
            size: 1024,
            verticalScale: 64,
            numCones: 8,
            initialConeSize: 32
        }, options);
        this.uvSize = Math.pow(2, this.options.numCones - 1) * this.options.initialConeSize;
        this.heightSource = new TextureDescriptor(heightImage);
        this.colorSource = new TextureDescriptor(colorImage);
        this.cameraPosition = vec3.create();
    },
    type: function() {
        return "TerrainComponent";
    },
    onStart: function(context, engine) {
        this.height = engine.assetsManager.texturesManager.addDescriptor(this.heightSource);
        this.color = engine.assetsManager.texturesManager.addDescriptor(this.colorSource);
        this.material = new Material(engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle("terrain")), {
            diffuse: new UniformColor({
                r: 1,
                g: 1,
                b: 1,
                a: 1
            }),
            ambient: new UniformColor({
                r: .2,
                g: .2,
                b: .2
            }),
            uvOffset: new UniformVec2(vec2.fromValues(0, 0)),
            uvScale: new UniformVec2(vec2.fromValues(1, 1)),
            verticalScale: new UniformFloat(this.options.verticalScale)
        }, [ new Sampler("diffuse0", this.color), new Sampler("height", this.height) ]);
        var terrainMesh = new TerrainMesh();
        terrainMesh.generate(this.options.initialConeSize, 1, this.options.numCones);
        var mesh = new Mesh();
        var submesh = new Submesh();
        submesh.positions = terrainMesh.positions;
        submesh.barycentric = terrainMesh.barycentric;
        submesh.normals = terrainMesh.normals;
        submesh.texCoords2D = [ terrainMesh.uv ];
        submesh.faces = terrainMesh.faces;
        submesh.calculateTangents();
        submesh.recalculateBounds();
        mesh.addSubmesh(submesh, this.material);
        this.node.addComponent(new MeshComponent(mesh));
        this._super(context, engine);
        engine.assetsManager.load();
    },
    onPreRender: function(context, camera) {
        camera.getPosition(this.cameraPosition);
        this.cameraPosition[1] = 0;
        var u = (this.cameraPosition[0] + this.options.size / 2) / this.options.size;
        var v = (this.cameraPosition[2] + this.options.size / 2) / this.options.size;
        vec2.set(this.material.uniforms.uvScale.value, this.uvSize / this.options.size, this.uvSize / this.options.size);
        vec2.set(this.material.uniforms.uvOffset.value, u, v);
        this.material.uniforms.verticalScale.value = this.options.verticalScale;
        this.node.transform.setPosition(this.cameraPosition);
    }
});

var Descriptor = Serializable.extend({
    init: function() {
        this._super();
        this.source = "";
        this.parentDescriptor = false;
    },
    included: function() {
        return true;
    },
    excluded: function() {
        return this._super().concat([ "parentDescriptor" ]);
    },
    type: function() {
        return "Descriptor";
    },
    equals: function(other) {
        if (this.type() != other.type()) return false;
        if (this.getFullPath() != other.getFullPath()) return false;
        if (this.parentDescriptor && other.parentDescriptor) {
            if (!this.parentDescriptor.equals(other.parentDescriptor)) return false;
        } else if (this.parentDescriptor != other.parentDescriptor) return false;
        return true;
    },
    getCurrentRelativeDirectory: function() {
        if (this.source.length == 0) return "";
        return this.source.substring(0, this.source.lastIndexOf("/") + 1);
    },
    getCurrentDirectory: function() {
        var path = "";
        if (this.parentDescriptor) path = this.parentDescriptor.getCurrentDirectory();
        return path + this.getCurrentRelativeDirectory();
    },
    getParentDirectory: function() {
        if (this.parentDescriptor) return this.parentDescriptor.getCurrentDirectory();
        return "";
    },
    getFullPath: function() {
        var path = this.getParentDirectory() + this.source;
        return path;
    }
});

var TextDescriptor = Descriptor.extend({
    init: function(source) {
        this._super();
        this.source = source;
    },
    type: function() {
        return "TextDescriptor";
    },
    equals: function(other) {
        if (!this._super(other)) return false;
        return this.source == other.source;
    }
});

var ModelDescriptor = Descriptor.extend({
    init: function(source, format) {
        this._super();
        this.source = source;
        this.format = format || "auto";
    },
    type: function() {
        return "ModelDescriptor";
    },
    getFormat: function() {
        if (this.format == "auto") {
            if (this.source.endsWith(".data")) return "binary";
            if (this.source.endsWith(".json")) return "json";
            if (this.source.endsWith(".gltf")) return "gltf";
            if (this.source.endsWith(".glb")) return "glb";
            return "binary";
        }
        return this.format;
    }
});

var ShaderDescriptor = Descriptor.extend({
    init: function(vertexOrUnifiedSource, fragmentSource) {
        this._super();
        if (!fragmentSource) {
            this.vertexSource = vertexOrUnifiedSource + ".vert";
            this.fragmentSource = vertexOrUnifiedSource + ".frag";
        } else {
            this.vertexSource = vertexOrUnifiedSource;
            this.fragmentSource = fragmentSource;
        }
    },
    type: function() {
        return "ShaderDescriptor";
    },
    equals: function(other) {
        if (!this._super(other)) return false;
        return this.vertexSource == other.vertexSource && this.fragmentSource == other.fragmentSource;
    },
    getVertexShaderPath: function() {
        var path = this.getParentDirectory() + this.vertexSource;
        return path;
    },
    getFragmentShaderPath: function() {
        var path = this.getParentDirectory() + this.fragmentSource;
        return path;
    }
});

var MaterialDescriptor = Descriptor.extend({
    init: function(shaderDescriptor, uniforms, textureDescriptors) {
        this._super();
        if (!textureDescriptors) textureDescriptors = [];
        if (!uniforms) uniforms = {};
        this.shaderDescriptor = shaderDescriptor;
        this.uniforms = uniforms;
        this.textureDescriptors = textureDescriptors;
        this.materialResourceDescriptor = false;
        this.requirements = {};
    },
    type: function() {
        return "MaterialDescriptor";
    },
    equals: function(other) {
        return false;
    }
});

var MaterialSource = Descriptor.extend({
    init: function(sourceDescriptor) {
        this._super();
        this.material = false;
        this.sourceDescriptor = sourceDescriptor;
    },
    type: function() {
        return "MaterialSource";
    },
    equals: function(other) {
        return false;
    }
});

var MaterialSourceDescriptor = Descriptor.extend({
    init: function(source) {
        this._super();
        this.source = source;
    },
    type: function() {
        return "MaterialSourceDescriptor";
    },
    equals: function(other) {
        return this.source == other.source;
    }
});

var TextureDescriptor = Descriptor.extend({
    init: function(source, width, height, locked) {
        this._super();
        this.source = source;
        this._source = source;
        this.width = width;
        this.height = height;
        this.locked = locked;
    },
    type: function() {
        return "TextureDescriptor";
    },
    equals: function(other) {
        if (!this._super(other)) return false;
        return this.source == other.source && this.width == other.width && height == other.height;
    },
    getFullPath: function() {
        if (this.locked) {
            return this._source;
        } else {
            return this._super();
        }
    }
});

var CubeTextureDescriptor = Descriptor.extend({
    init: function(sources) {
        this._super();
        this.sources = sources || [];
    },
    type: function() {
        return "CubeTextureDescriptor";
    },
    equals: function(other) {
        if (!this._super(other)) return false;
        if (this.sources.length != other.sources.length) return false;
        for (var i = 0; i < this.sources.length; i++) if (this.sources[i] != other.sources[i]) return false;
        return true;
    },
    getFaceFullPath: function(index) {
        if (index < 0 || index > this.sources.length) throw "CubeTextureDescriptor.getFaceFullPath: index out of bounds";
        this.source = this.sources[index];
        var path = this.getFullPath();
        this.source = "";
        return path;
    }
});

var EmptyNode = Serializable.extend({
    init: function(name) {
        this._super();
        this.name = name ? name : "Empty Node";
        this.subnodes = [];
        this.components = [];
        this.scene = false;
        this.parent = false;
        this.layer = 1;
        this.tags = [];
        this._super();
    },
    excluded: function() {
        return [ "parent", "scene" ];
    },
    type: function() {
        return "EmptyNode";
    },
    addNode: function(node) {
        if (!(node instanceof EmptyNode)) throw "addNode: The given node is not a subclass of EmptyNode";
        this.subnodes.push(node);
        var me = this;
        node.parent = this;
        node.onEachChild(function(n) {
            n.scene = me.scene;
        });
        if (node.scene) {
            node.onEachChildComponent(function(c) {
                c.onAddScene(me);
                c.node.onAddComponent(c);
            });
        }
        node.onAdd(this);
        if (me.scene.engine) {
            node.onEachChildComponent(function(c) {
                if (!c.started) {
                    if (me.scene.starting || me.scene.started === false) {
                        me.scene.startingQueue.push(c);
                    } else {
                        c.onLoad(me.scene.engine.assetsManager, me.scene.engine);
                        c.start(me.scene.engine.context, me.scene.engine);
                        c.started = true;
                    }
                }
            });
        }
        return node;
    },
    removeNode: function(node) {
        var scope = this;
        if (this.scene.engine) {
            node.onEachChildComponent(function(c) {
                if (c.started) c.onEnd(scope.scene.engine.context, scope.scene.engine);
                c.started = false;
            });
        }
        node.onRemove(this);
        if (node.scene) {
            node.onEachChildComponent(function(c) {
                c.onRemoveScene(scope);
                c.node.onRemoveComponent(c);
            });
        }
        node.onEachChild(function(n) {
            n.scene = false;
        });
        node.parent = false;
        for (var i = 0; i < this.subnodes.length; i++) {
            if (this.subnodes[i] == node) {
                this.subnodes.splice(i, 1);
                break;
            }
        }
        return node;
    },
    removeSubnodes: function() {
        var nodes = this.subnodes.slice(0);
        for (var i = 0; i < nodes.length; i++) {
            this.removeNode(nodes[i]);
        }
    },
    addComponent: function(component) {
        if (!component.type()) throw "Unable to add a component that doesn't define it's type by returning it from type() method";
        this.components.push(component);
        component.node = this;
        component.onAdd(this);
        if (this.scene) {
            component.onAddScene(this);
            this.onAddComponent(component);
        }
        if (!component.started && this.scene && this.scene.engine && (this.scene.started || this.scene.starting)) {
            component.start(this.scene.engine.context, this.scene.engine);
            component.started = true;
        }
        return component;
    },
    removeComponent: function(component) {
        for (var c = 0; c < this.components.length; c++) {
            if (this.components[c] === component) {
                this.components.splice(c, 1);
                break;
            }
        }
        if (this.scene.engine && component.started) {
            component.onEnd(this.scene.engine.context, this.scene.engine);
            component.started = false;
        }
        if (this.scene) {
            component.onRemoveScene(this);
            this.onRemoveComponent(component);
        }
        component.onRemove(this);
        component.node = false;
        return component;
    },
    removeComponentsByType: function(componentType) {
        var removed = [];
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof componentType) {
                removed.push(this.components[i]);
                this.components.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < removed.length; i++) {
            if (this.scene.engine && removed[i].started) {
                removed[i].onEnd(this.scene.engine.context, this.scene.engine);
                removed[i].started = false;
            }
            if (this.scene) {
                removed[i].onRemoveScene(this);
                this.onRemoveComponent(removed[i]);
            }
            removed[i].onRemove(this);
            removed[i].node = false;
        }
        return removed;
    },
    getComponent: function(componentType) {
        for (var c = 0; c < this.components.length; c++) {
            if (this.components[c] instanceof componentType) return this.components[c];
        }
        return false;
    },
    getComponents: function(componentType) {
        var a = [];
        for (var c = 0; c < this.components.length; c++) {
            if (this.components[c] instanceof componentType) a.push(this.components[c]);
        }
        if (a.length == 0) return false;
        return a;
    },
    calculateRelativeFromAbsolute: function() {
        if (!this.parent.transform) return;
        this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
    },
    instantiate: function() {
        var instance = new EmptyNode(this.name);
        instance.isInstanced = true;
        instance.layer = this.layer;
        instance.tags = this.tags.slice(0);
        for (var i = 0; i < this.subnodes.length; i++) {
            instance.addNode(this.subnodes[i].instantiate());
        }
        for (var c = 0; c < this.components.length; c++) {
            instance.addComponent(this.components[c].instantiate());
        }
        return instance;
    },
    enable: function(onlyThisNode) {
        if (onlyThisNode) this.onEachComponent(function(c) {
            c.enable();
        }); else this.onEachChildComponent(function(c) {
            c.enable();
        });
    },
    disable: function(onlyThisNode) {
        if (onlyThisNode) this.onEachComponent(function(c) {
            c.disable();
        }); else this.onEachChildComponent(function(c) {
            c.disable();
        });
    },
    onAdd: function(parent) {},
    onRemove: function(parent) {},
    onAddComponent: function(component) {
        this.scene.components.push(component);
        if (component.onUpdate != Component.prototype.onUpdate) this.scene.updatedComponents.push(component);
        if (component.onPreRender != Component.prototype.onPreRender) this.scene.preRenderedComponents.push(component);
        if (component.onPostRender != Component.prototype.onPostRender) this.scene.postRenderedComponents.push(component);
    },
    onRemoveComponent: function(component) {
        function removeIfExists(list, component) {
            var index = list.indexOf(component);
            if (index != -1) {
                list.splice(index, 1);
                return;
            }
        }
        removeIfExists(this.scene.components, component);
        if (component.onUpdate != Component.prototype.onUpdate) removeIfExists(this.scene.updatedComponents, component);
        if (component.onPreRender != Component.prototype.onPreRender) removeIfExists(this.scene.preRenderedComponents, component);
        if (component.onPostRender != Component.prototype.onPostRender) removeIfExists(this.scene.postRenderedComponents, component);
    },
    onEachChild: function(callback) {
        if (callback(this) === true) return true;
        for (var i = 0; i < this.subnodes.length; i++) {
            if (this.subnodes[i].onEachChild(callback) === true) return true;
        }
    },
    onEachChildExclusive: function(callback) {
        for (var i = 0; i < this.subnodes.length; i++) {
            if (this.subnodes[i].onEachChild(callback) === true) return true;
        }
    },
    onEachDirectChild: function(callback) {
        for (var i = 0; i < this.subnodes.length; i++) {
            if (callback(this.subnodes[i]) === true) return true;
        }
    },
    onEachComponent: function(callback) {
        for (var c = 0; c < this.components.length; c++) {
            if (callback(this.components[c]) === true) return true;
        }
    },
    onEachChildComponent: function(callback) {
        this.onEachChild(function(child) {
            if (child.onEachComponent(callback) === true) return true;
        });
    },
    onEachChildComponentExclusive: function(callback) {
        this.onEachChildExclusive(function(child) {
            if (child.onEachComponent(callback) === true) return true;
        });
    },
    getChildComponentsOfType: function(type) {
        var result = [];
        this.onEachChildComponent(function(c) {
            if (c instanceof type) result.push(c);
        });
        return result;
    },
    find: function(path) {
        var parts = path.split("/");
        if (parts.length == 0) return false;
        var node = this;
        if (parts[0] === "") {
            if (!this.scene) return false;
            node = this.scene.root;
            parts.shift();
        }
        if (parts.length > 2) {
            var _parts = parts.slice(0, 1);
            var __parts = parts.slice(1, parts.length).join("/");
            parts = _parts;
            parts.push(__parts);
        }
        for (var i = 0; i < parts.length; i++) {
            node = node.findChildWithName(parts[i], path);
            if (node === false) return false;
        }
        return node;
    },
    findChildWithName: function(name, path) {
        for (var i = 0; i < this.subnodes.length; i++) {
            if (this.subnodes[i].name === name) return this.subnodes[i];
        }
        return false;
    },
    path: function() {
        var path = [];
        var node = this;
        while (node) {
            path.push(node.name);
            node = node.parent;
        }
        return "/" + path.reverse().join("/");
    }
});

var Node = EmptyNode.extend({
    init: function(name) {
        this._super(name);
        this.name = name ? name : "Node";
        this.transform = this.addComponent(new Transform());
        this.localCollisionID = -1;
    },
    excluded: function() {
        return this._super().concat([ "transform" ]);
    },
    type: function() {
        return "Node";
    },
    getBoundingBox: function(excludeInvisible) {
        var bb = new BoundingBox();
        this.onEachChildComponent(function(c) {
            if (c instanceof MeshRendererComponent) bb.encapsulateBox(c.getBoundingBox(excludeInvisible));
        });
        return bb;
    },
    getBoundingSphere: function(excludeInvisible) {
        var bb = new BoundingSphere();
        this.onEachChildComponent(function(c) {
            if (c instanceof MeshRendererComponent) bb.encapsulateSphere(c.getBoundingSphere(excludeInvisible));
        });
        return bb;
    },
    instantiate: function() {
        var instance = new Node(this.name);
        instance.isInstanced = true;
        instance.localCollisionID = this.localCollisionID;
        instance.removeComponentsByType(Transform);
        instance.layer = this.layer;
        instance.tags = this.tags.slice(0);
        for (var i = 0; i < this.subnodes.length; i++) {
            instance.addNode(this.subnodes[i].instantiate());
        }
        for (var c = 0; c < this.components.length; c++) {
            instance.addComponent(this.components[c].instantiate());
        }
        instance.transform = instance.getComponent(Transform);
        return instance;
    },
    updateChildTransforms: function() {
        var index, c, l1, l2, subnode;
        var absolute = this.transform.absolute;
        var subnodes = this.subnodes;
        for (index = 0, l1 = subnodes.length; index < l1; index++) {
            subnode = subnodes[index];
            if (!subnode.transform) continue;
            mat4.multiply(subnode.transform.absolute, absolute, subnode.transform.relative);
            subnode.updateChildTransforms();
        }
        for (c = 0, l2 = this.components.length; c < l2; c++) {
            this.components[c].onUpdateTransform(absolute);
        }
    },
    setAbsolutePosition: function(position) {
        if (!this.parent || !this.parent.transform) {
            this.transform.calculateRelativeFromAbsolute();
            return;
        }
        mat4.fromRotationTranslationScale(this.transform.absolute, quat.fromMat4(quat.create(), this.transform.absolute), position, mat4.getScale(vec3.create(), this.transform.absolute));
        this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
    }
});

var Scene = Serializable.extend({
    init: function() {
        this.root = new Node();
        this.root.scene = this;
        this.dynamicSpace = new DynamicSpace();
        this.cameras = [];
        this.lights = [];
        this.engine = false;
        this.starting = false;
        this.started = false;
        this.startingQueue = [];
        this.components = [];
        this.preRenderedComponents = [];
        this.postRenderedComponents = [];
        this.updatedComponents = [];
        var scope = this;
        this.processPreRenderList = function(context, camera) {
            for (var i = 0; i < scope.preRenderedComponents.length; ++i) {
                var component = scope.preRenderedComponents[i];
                if (component.node.layer & camera.layerMask) {
                    context.modelview.push();
                    context.modelview.multiply(component.node.transform.absolute);
                    component.onPreRender(context, camera);
                    context.modelview.pop();
                }
            }
        };
        this.processPostRenderList = function(context, camera) {
            for (var i = 0; i < scope.postRenderedComponents.length; ++i) {
                var component = scope.postRenderedComponents[i];
                if (component.node.layer & camera.layerMask) {
                    context.modelview.push();
                    context.modelview.multiply(component.node.transform.absolute);
                    component.onPostRender(context, camera);
                    context.modelview.pop();
                }
            }
        };
    },
    fields: function() {
        return [ "root" ];
    },
    start: function(context) {
        if (this.started || this.starting) return;
        this.starting = true;
        var me = this;
        this.root.onEachChildComponent(function(component) {
            if (!component.enabled) return;
            if (component.started) return;
            component.onLoad(me.engine.assetsManager, me.engine);
        });
        var internalStart = function() {
            me.root.updateChildTransforms();
            me.root.onEachChildComponent(function(component) {
                if (!component.enabled) return;
                if (component.started) return;
                me.startingQueue.push(component);
            });
            var timer = null;
            timer = function() {
                var delay = 50;
                var maximumTime = new Date().getTime() + delay;
                while (new Date().getTime() < maximumTime) {
                    if (me.startingQueue.length === 0) {
                        me.started = true;
                        me.starting = false;
                        if (typeof me.engine.sceneStarted === "function") {
                            me.engine.sceneStarted();
                        }
                        return;
                    }
                    var c = me.startingQueue.shift();
                    if (c.started) continue;
                    c.start(context, me.engine);
                    c.started = true;
                }
                setTimeout(timer, 10);
            };
            timer();
        };
        internalStart();
    },
    end: function(context, engine) {
        if (!this.started) return;
        this.root.updateChildTransforms();
        this.root.onEachChildComponent(function(component) {
            if (!component.enabled) return;
            if (!component.started) return;
            component.onEnd(context, engine);
            component.started = false;
        });
        this.started = false;
    },
    render: function(context) {
        if (!this.started) return;
        var camera = false;
        for (var cameraIndex = 0; cameraIndex < this.cameras.length; ++cameraIndex) {
            camera = this.cameras[cameraIndex];
            camera.render(context, this, this.processPreRenderList, this.processPostRenderLists);
        }
    },
    update: function(engine) {
        if (!this.started) return;
        var passes = 1;
        for (var pass = 0; pass < passes; ++pass) {
            for (var i = 0; i < this.updatedComponents.length; ++i) {
                var component = this.updatedComponents[i];
                if (!component.enabled) continue;
                if (pass < component.updatePasses && component.started) {
                    component.onUpdate(engine, pass);
                }
                if (passes < component.updatePasses) passes = component.updatePasses;
            }
        }
        this.root.updateChildTransforms();
    },
    getMaterials: function() {
        var result = [];
        this.root.onEachChildComponent(function(c) {
            if (c instanceof MeshComponent) {
                for (var i in c.mesh.materials) result.push(c.mesh.materials[i]);
            }
        });
        return result;
    },
    broadcast: function(componentType, method, data) {
        data = data || null;
        if (componentType.prototype instanceof Light) {
            var c;
            for (var i = 0; i < this.lights.length; i++) {
                c = this.lights[i];
                if (c instanceof componentType && method in c && typeof c[method] == "function") {
                    c[method](data);
                }
            }
            return;
        }
        this.root.onEachChildComponent(function(c) {
            if (c instanceof componentType && method in c && typeof c[method] == "function") {
                c[method](data);
            }
        });
    }
});

var DefaultScene = Scene.extend({
    init: function() {
        this._super();
        this.root.name = "Root";
        this.cameraNode = new Node("Camera");
        this.cameraComponent = this.cameraNode.addComponent(new PerspectiveCamera());
        this.cameraComponent.aspect = false;
        this.camera = this.cameraComponent.camera;
        this.root.addNode(this.cameraNode);
        this.lightNode = new Node("Light");
        this.light = new DirectionalLight();
        this.light.color = new Color(1, 1, 1, 1);
        this.light.intensity = 1;
        this.light.setLightDirection(vec3.fromValues(.9, 1, .9));
        this.lightNode.addComponent(this.light);
        this.root.addNode(this.lightNode);
    }
});

var FPS = FrakClass.extend({
    init: function() {
        this.frametime = 0;
        this.lastMeasurement = new Date().getTime();
        this.averageMultiplier = .95;
        this.delta = 0;
    },
    measure: function() {
        var current = FRAK.timestamp();
        if (current - this.lastMeasurement > 0) {
            this.frametime = this.frametime * this.averageMultiplier + this.delta * (1 - this.averageMultiplier);
            this.delta = current - this.lastMeasurement;
        }
        this.lastMeasurement = current;
    },
    getAverage: function() {
        if (this.frametime <= 0) return 0;
        return 1e3 / this.frametime;
    },
    getDelta: function() {
        return this.delta;
    }
});

var Engine = FrakClass.extend({
    init: function(canvas, options, scene) {
        if (!options) options = {};
        this.options = FRAK.extend({
            assetsPath: "",
            defaultRequestedFPS: 60,
            requestedFPS: 60,
            anisotropicFiltering: 4,
            useVAO: true,
            debug: false,
            antialias: false,
            ssao: false,
            transparencyMode: "default",
            renderer: "default",
            softShadows: false,
            runInBackground: false,
            context: false,
            contextErrorCallback: null,
            captureScreenshot: false,
            webGLVersion: "auto",
            builtinShaders: true,
            directionalShadowResolution: 2048,
            shadowManualUpdate: false
        }, options);
        this.validateOptions(canvas);
        this.context = this.options.context;
        this.context.engine = this;
        if (!scene) scene = new DefaultScene();
        this.scene = scene;
        this.scene.engine = this;
        this.fps = new FPS();
        this.running = false;
        this.input = false;
        this.screenshot = false;
        this.onScreenshotCaptured = false;
        this.debugCTX = false;
        this.debugWidth = 256;
        this.debugFPS = [];
        this.debugCount = 24;
        this.assetsManager = new AssetsManager(this.context, this.options.assetsPath);
        if (!this.options.builtinShaders) {
            this.assetsManager.shadersManager.builtin = {};
        }
        this.WhiteTexture = new Texture(this.context);
        this.WhiteTexture.name = "WhiteTexture";
        this.WhiteTexture.mipmapped = false;
        this.WhiteTexture.clearImage(this.context, [ 255, 255, 255, 255 ]);
        this.WhiteTextureSampler = new Sampler("tex0", this.WhiteTexture);
        this.DiffuseFallbackSampler = new Sampler("diffuse0", this.WhiteTexture);
        document.addEventListener("visibilitychange", FrakCallback(this, this.onVisibilityChange));
        this.context.canvas.addEventListener("webglcontextlost", FrakCallback(this, this.onContextLost), false);
        this.context.canvas.addEventListener("webglcontextrestored", FrakCallback(this, this.onContextRestored), false);
        if (FRAK.fullscreenEnabled) {
            this.useUpscaling = false;
            var fsHandler = FrakCallback(this, this.onFullscreenChange);
            document.addEventListener("fullscreenchange", fsHandler);
            document.addEventListener("webkitfullscreenchange", fsHandler);
            document.addEventListener("mozfullscreenchange", fsHandler);
            document.addEventListener("MSFullscreenChange", fsHandler);
        }
        this.setupInput();
    },
    onContextLost: function(event) {
        console.log("FRAK: Rendering context lost");
        event.preventDefault();
        this.pause();
    },
    onContextRestored: function(event) {
        console.log("FRAK: Rendering context restored");
        this.context.engine = this;
        this.context.restore();
        this.run();
    },
    onVisibilityChange: function() {
        if (!this.options.runInBackground) {
            if (document.hidden) {
                if (this.running === false) {
                    this._externallyPaused = true;
                    return;
                }
                this.pause();
            } else {
                if (this._externallyPaused) {
                    delete this._externallyPaused;
                    return;
                }
                this.run();
            }
        }
    },
    onFullscreenChange: function() {
        if (!(this.context instanceof RenderingContext)) return;
        var canvas;
        if (FRAK.isFullscreen()) {
            canvas = this.context.canvas;
            this._savedCanvasStyles = {
                position: canvas.style.position,
                left: canvas.style.left,
                right: canvas.style.right,
                top: canvas.style.top,
                bottom: canvas.style.bottom,
                width: canvas.style.width,
                height: canvas.style.height,
                canvasWidth: canvas.getAttribute("width"),
                canvasHeight: canvas.getAttribute("height"),
                aspectRatio: this.scene.cameraComponent.aspect
            };
            canvas.style.position = "absolute";
            canvas.style.left = 0;
            canvas.style.right = 0;
            canvas.style.top = 0;
            canvas.style.bottom = 0;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            var scope = this;
            setTimeout(function() {
                var bounds = canvas.getBoundingClientRect();
                scope.scene.cameraComponent.setAspectRatio(bounds.width / bounds.height);
                if (scope.useUpscaling) return;
                var gl = scope.context.gl;
                var width = gl.canvas.clientWidth;
                var height = Math.max(1, gl.canvas.clientHeight);
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
                scope.scene.camera.target.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
            }, 2e3 / this.options.requestedFPS);
        } else {
            if (this._savedCanvasStyles) {
                canvas = this.context.canvas;
                canvas.style.position = this._savedCanvasStyles.position;
                canvas.style.left = this._savedCanvasStyles.left;
                canvas.style.right = this._savedCanvasStyles.right;
                canvas.style.top = this._savedCanvasStyles.top;
                canvas.style.bottom = this._savedCanvasStyles.bottom;
                canvas.style.width = this._savedCanvasStyles.width;
                canvas.style.height = this._savedCanvasStyles.height;
                if (this._savedCanvasStyles.aspectRatio) this.scene.cameraComponent.setAspectRatio(this._savedCanvasStyles.aspectRatio);
                if (!this.useUpscaling) {
                    canvas.setAttribute("width", this._savedCanvasStyles.canvasWidth);
                    canvas.setAttribute("height", this._savedCanvasStyles.canvasHeight);
                    var gl = this.context.gl;
                    this.scene.camera.target.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
                }
                delete this._savedCanvasStyles;
            }
        }
    },
    setupInput: function() {
        this.input = new Input(this, this.context.canvas);
    },
    run: function() {
        if (this.running !== false) return;
        this.running = true;
        var now;
        var then = FRAK.timestamp();
        var interval = 1e3 / this.options.requestedFPS;
        var delta;
        var scope = this;
        function draw() {
            now = FRAK.timestamp();
            delta = now - then;
            if (delta > interval) {
                then = now - delta % interval;
                scope.frame();
            }
            if (scope.running) {
                scope._currentAnimationFrame = FRAK.requestAnimationFrame(draw);
            }
        }
        if (!this.scene.started) this.scene.start(this.context, this);
        this._currentAnimationFrame = FRAK.requestAnimationFrame(draw);
    },
    sceneStarted: function() {},
    stop: function() {
        this.pause();
        if (this.scene.started) this.scene.end(this.context);
    },
    pause: function() {
        this.running = false;
        if (this._currentAnimationFrame) FRAK.cancelAnimationFrame(this._currentAnimationFrame);
    },
    togglePause: function() {
        if (this.running === false) this.run(); else this.pause();
    },
    requestFullscreen: function(useUpscaling) {
        if (!FRAK.fullscreenEnabled) {
            console.warn("FRAK: Fullscreen API is disabled in this browser.");
            return;
        }
        this.useUpscaling = useUpscaling;
        FRAK.requestFullscreen(this.context.canvas);
    },
    exitFullscreen: function() {
        if (!FRAK.fullscreenEnabled) {
            console.warn("FRAK: Fullscreen API is disabled in this browser.");
            return;
        }
        FRAK.exitFullscreen();
    },
    startIdle: function(fps) {
        if (!fps) fps = 1;
        this.options.requestedFPS = fps;
        this.pause();
        this.run();
    },
    stopIdle: function() {
        this.options.requestedFPS = this.options.defaultRequestedFPS;
        this.pause();
        this.run();
    },
    frame: function() {
        this.context.engine = this;
        this.input.update(this);
        this.scene.update(this);
        this.scene.render(this.context);
        this.fps.measure();
        if (this.options.captureScreenshot) {
            this._captureScreenshot();
        }
        if (this.options.showDebug) {
            this.renderDebugInfo();
        }
    },
    validateOptions: function(canvas) {
        if (!this.options.context) this.options.context = new RenderingContext(canvas, null, this.options.contextErrorCallback, this.options.webGLVersion);
        var gl = this.options.context.gl;
        switch (this.options.transparencyMode) {
          case "sorted":
          case "blended":
          case "stochastic":
            break;

          default:
            this.options.transparencyMode = "blended";
            break;
        }
        if (this.options.transparencyMode != "sorted" && !this.options.context.isWebGL2()) {
            var extFloat = gl.getExtension("OES_texture_float");
            var extHalfFloat = gl.getExtension("OES_texture_half_float");
            if (!extFloat && !extHalfFloat) {
                this.options.transparencyMode = "sorted";
            }
        }
        switch (this.options.renderer) {
          case "auto":
            if (this.options.context.isWebGL2() || gl.getExtension("WEBGL_draw_buffers") && gl.getExtension("OES_texture_float") && gl.getExtension("OES_standard_derivatives")) this.options.renderer = "deferred"; else this.options.renderer = "forward";
            break;

          case "deferred":
          case "forward":
            break;

          default:
            this.options.renderer = "forward";
            break;
        }
    },
    resize: function() {
        if (this.context instanceof RenderingContext) {
            var gl = this.context.gl;
            this.scene.cameraComponent.setAspectRatio(gl.drawingBufferWidth / gl.drawingBufferHeight);
            this.scene.camera.target.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
    },
    stats: function() {
        if (!this.scene) return;
        var organizer = this.scene.camera.renderStage.generator.organizer;
        console.log("=============== Statistics =====================");
        console.log("  Visible faces (opaque/transparent): {0}/{1}".format(organizer.visibleSolidFaces, organizer.visibleTransparentFaces));
        console.log("  Visible renderers (opaque/transparent): {0}/{1}".format(organizer.visibleSolidRenderers, organizer.visibleTransparentRenderers));
        console.log("  Visible batches (opaque/transparent): {0}/{1}".format(organizer.visibleSolidBatches, organizer.visibleTransparentBatches));
        console.log("================================================");
    },
    renderDebugInfo: function() {
        var organizer = this.scene.camera.renderStage.generator.organizer;
        if (!this.debugCTX) {
            var canvas = document.createElement("canvas");
            canvas.width = this.debugWidth;
            canvas.height = this.debugWidth / 2;
            canvas.style.position = "absolute";
            canvas.style.top = 0;
            canvas.style.zIndex = 100;
            canvas.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            var parent = this.context.canvas.parentNode;
            parent.insertBefore(canvas, parent.firstChild);
            this.debugCTX = canvas.getContext("2d");
        }
        if (this.debugCTX && this.debugCount < 1) {
            var ctx = this.debugCTX;
            ctx.clearRect(0, 0, this.debugWidth, this.debugWidth / 2);
            ctx.font = "Normal 20px Arial";
            ctx.fillStyle = "rgba(240,240,240,0.75)";
            ctx.fillText("FPS: " + this.fps.getAverage().toFixed(2), 10, 20);
            ctx.font = "Normal 12px Arial";
            ctx.fillText("Faces: " + organizer.visibleSolidFaces + " / " + organizer.visibleTransparentFaces, 10, 45);
            ctx.fillText("Renderers: " + organizer.visibleSolidRenderers + " / " + organizer.visibleTransparentRenderers, 10, 60);
            ctx.fillText("Batches: " + organizer.visibleSolidBatches + " / " + organizer.visibleTransparentBatches, 10, 75);
            ctx.fillText("RequestedFPS: " + this.options.requestedFPS, this.debugWidth / 2, 45);
            ctx.fillText("WebGL: " + this.context.version, this.debugWidth / 2, 60);
            var gl = this.context.gl;
            var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (debugInfo) {
                var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                ctx.fillText(vendor, 10, 90);
                ctx.fillText(renderer, 10, 105);
            }
            this.debugFPS.push(this.fps.getAverage().toFixed(2));
            if (this.debugFPS.length > 60) {
                this.debugFPS.shift();
            }
            var x = this.debugWidth / 2;
            var y = 25;
            for (var i = 0; i < this.debugFPS.length; i++) {
                if (this.debugFPS[i] < 20) ctx.fillStyle = "#FF0000"; else if (this.debugFPS[i] < 30) ctx.fillStyle = "#f6921e"; else ctx.fillStyle = "#00FF00";
                ctx.fillRect(x + i * 2, y - this.debugFPS[i] / 60 * 20, 2, 2);
            }
            this.debugCount = Math.max(3, Math.floor(this.fps.getAverage() / 2));
        }
        this.debugCount--;
    },
    _captureScreenshot: function() {
        var shot = this.context.gl.canvas.toDataURL();
        if (shot && this.onScreenshotCaptured) {
            this.options.captureScreenshot = false;
            this.onScreenshotCaptured(shot);
        }
    },
    captureScreenshot: function(callback) {
        if (typeof callback === "function") {
            this.options.captureScreenshot = true;
            this.onScreenshotCaptured = callback;
        }
    }
});

var Input = FrakClass.extend({
    init: function(engine, canvas) {
        this.controllers = [];
        this.engine = engine;
        this.canvas = canvas;
        this.lastPinch = 0;
        this.lastRotation = 0;
        this.buttons = [ false, false, false ];
        this.button = -1;
        this.position = vec2.create();
        this.delta = vec2.create();
        this.lastDelta = vec2.create();
        this.deltaChange = vec2.create();
        this.scrollDelta = 0;
        if (typeof HammerWF) {
            this.hammertime = HammerWF(this.canvas);
            this.hammertime.get("pinch").set({
                enable: true
            });
            this.hammertime.get("rotate").set({
                enable: true
            });
            this.hammertime.get("pan").set({
                threshold: 0,
                pointers: 0
            });
            this.singlepan = new HammerWF.Pan({
                event: "pan",
                direction: HammerWF.DIRECTION_ALL,
                threshold: 5,
                pointers: 1
            });
            this.hammertime.add(this.singlepan);
        }
        this.bindings = {};
        this.keyStates = {};
        this.wfPanEnabled = false;
        this.keymap = {
            enter: 13,
            escape: 27,
            backspace: 8,
            tab: 9,
            shift: 16,
            ctrl: 17,
            alt: 18,
            pause: 19,
            caps_lock: 20,
            space: 32,
            page_up: 33,
            page_down: 34,
            end: 35,
            home: 36,
            left_arrow: 37,
            up_arrow: 38,
            right_arrow: 39,
            down_arrow: 40,
            insert: 45,
            delete: 46,
            left_window_key: 91,
            right_window_key: 92,
            select_key: 93,
            numpad_0: 96,
            numpad_1: 97,
            numpad_2: 98,
            numpad_3: 99,
            numpad_4: 100,
            numpad_5: 101,
            numpad_6: 102,
            numpad_7: 103,
            numpad_8: 104,
            numpad_9: 105,
            multiply: 106,
            add: 107,
            subtract: 109,
            decimal_point: 110,
            divide: 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            num_lock: 144,
            scroll_lock: 145,
            semi_colon: 186,
            equal_sign: 187,
            comma: 188,
            dash: 189,
            period: 190,
            forward_slash: 191,
            grave_accent: 192,
            open_bracket: 219,
            back_slash: 220,
            close_braket: 221,
            single_quote: 222,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90
        };
        this.setup();
    },
    setup: function() {
        this.registerKeyboardEvents();
        this.registerPointerEvents();
    },
    registerController: function(controller) {
        this.controllers.push(controller);
        return true;
    },
    registerPointerEvents: function() {
        if (this.hammertime) {
            this.hammertime.on("pinch", FrakCallback(this, this.onPinch));
            this.hammertime.on("pinchend", FrakCallback(this, this.onPinchEnd));
            this.hammertime.on("tap", FrakCallback(this, this.onTap));
            this.hammertime.on("transformstart", FrakCallback(this, this.onTransformStart));
            this.hammertime.on("panstart", FrakCallback(this, this.onPanStart));
            this.hammertime.on("panend", FrakCallback(this, this.onPanEnd));
            this.hammertime.on("rotate", FrakCallback(this, this.onRotate));
            this.hammertime.on("rotateend", FrakCallback(this, this.onRotateEnd));
            this.hammertime.on("touch", FrakCallback(this, this.onTouch));
            this.hammertime.on("panleft panright panup pandown", FrakCallback(this, this.onPan));
        }
        this.canvas.addEventListener("mousewheel", FrakCallback(this, this.onMouseWheel));
        this.canvas.addEventListener("DOMMouseScroll", FrakCallback(this, this.onMouseWheelMOZ));
        this.canvas.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        }, false);
    },
    registerKeyboardEvents: function() {
        if (this.canvas) {
            this.canvas.addEventListener("keydown", FrakCallback(this, this.onKeyDown));
            this.canvas.addEventListener("keyup", FrakCallback(this, this.onKeyUp));
            if (this.canvas.focus) this.canvas.focus();
        }
    },
    unregisterController: function(controller) {
        var index = this.controllers.indexOf(controller);
        if (index > -1) {
            this.controllers.splice(index, 1);
            return true;
        }
        return false;
    },
    bind: function(key, callback, obj) {
        if (key && callback && obj) {
            if (key in this.keymap) this.bindings[this.keymap[key]] = [ obj, callback ]; else this.bindings[key.charCodeAt(0)] = [ obj, callback ];
        }
    },
    sendEvent: function(funcName) {
        if (!this.engine.running) return;
        var args = Array.prototype.slice.call(arguments, 0);
        args = args.slice(1, args.length);
        var activated = [];
        for (var i = 0; i < this.controllers.length; i++) {
            if (this.controllers[i][funcName]) activated.push(this.controllers[i]);
        }
        activated.sort(function(a, b) {
            return b.getPriority(funcName) - a.getPriority(funcName);
        });
        for (var i = 0; i < activated.length; i++) {
            if (activated[i][funcName].apply(activated[i], args) === true) break;
        }
    },
    translateCoordinates: function(out, x, y) {
        var rect = this.canvas.getBoundingClientRect();
        var relX = x - rect.left;
        var relY = y - rect.top;
        return vec2.set(out, relX, relY);
    },
    onTap: function(event) {
        if (event) {
            var newPos = this.translateCoordinates(this.position, event.center.x, event.center.y);
            this.setMouseButtons(event.frakButtons);
            var button;
            for (button = 0; button < this.buttons.length; button++) if (this.buttons[button]) break;
            if (button == this.buttons.length) button = 0;
            this.sendEvent("onClick", this.position, button, event.pointerType, event);
            this.resetMouseButtons();
        }
    },
    onPan: function(event) {
        if (event) {
            event.preventDefault();
            vec2.set(this.deltaChange, event.deltaX, event.deltaY);
            vec2.sub(this.deltaChange, this.deltaChange, this.lastDelta);
            vec2.set(this.lastDelta, event.deltaX, event.deltaY);
            this.setMouseButtons(event.frakButtons);
            this.translateCoordinates(this.position, event.center.x, event.center.y);
            if (Math.max(vec2.len(this.deltaChange)) < 100) {
                if (event.pointerType == "touch") {
                    this.sendEvent("onPan", this.position, this.deltaChange, event.pointerType, event);
                } else {
                    this.sendEvent("onMouseMove", this.position, this.button, this.deltaChange, event.pointerType, event);
                }
            }
        }
    },
    onPanStart: function(event) {
        if (event) {
            this.setMouseButtons(event.frakButtons);
            this.translateCoordinates(this.position, event.center.x, event.center.y);
            this.sendEvent("onButtonDown", this.position, this.button, 0, event.pointerType, event);
        }
    },
    onPanEnd: function(event) {
        vec2.set(this.lastDelta, 0, 0);
        if (event) {
            this.setMouseButtons(event.frakButtons);
            this.translateCoordinates(this.position, event.center.x, event.center.y);
            this.sendEvent("onButtonUp", this.position, this.button, 0, event.pointerType, event);
            this.resetMouseButtons();
        }
    },
    onTouch: function() {
        console.info("onTouch in frak");
    },
    onTransformStart: function(event) {
        event.gesture.preventDefault();
        if (event.gesture) {
            this.lastRotation = event.gesture.rotation;
        }
    },
    onPinch: function(event) {
        event.preventDefault();
        if (event) {
            this.translateCoordinates(this.position, event.clientX, event.clientY);
            var scale = event.scale - this.lastPinch;
            this.lastPinch = event.scale - 1;
            this.sendEvent("onPinch", this.position, scale, "touch", event);
        }
    },
    onPinchEnd: function() {
        this.lastPinch = 0;
    },
    onRotate: function(event) {
        if (event) {
            this.translateCoordinates(this.position, event.clientX, event.clientY);
            var rotation = event.rotation - this.lastRotation;
            this.lastRotation = event.rotation;
            if (Math.max(rotation) < 10) {
                this.sendEvent("onRotate", this.position, rotation, "touch", event);
            }
        }
    },
    onRotateEnd: function(event) {
        this.lastRotation = 0;
    },
    onMultiDrag: function(event) {
        console.log("Multi drag in frak");
    },
    onMouseWheel: function(event) {
        if (!event) return;
        event.preventDefault();
        var direction = 0;
        if ("wheelDelta" in event) {
            direction = event.wheelDelta < 0 ? 1 : event.wheelDelta > 0 ? -1 : 0;
        } else {
            direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
        }
        this.scrollDelta += event.deltaY;
        this.translateCoordinates(this.position, event.clientX, event.clientY);
        this.sendEvent("onMouseWheel", this.position, this.scrollDelta, direction, "mouse", event);
    },
    onMouseWheelMOZ: function(event) {
        if (!event) return;
        event.preventDefault();
        var direction = event.detail > 0 ? 1 : event.detail < 0 ? -1 : 0;
        this.scrollDelta += event.detail;
        this.translateCoordinates(this.position, event.clientX, event.clientY);
        this.sendEvent("onMouseWheel", this.position, this.scrollDelta, direction, "mouse", event);
    },
    onKeyDown: function(event) {
        if (event) {
            this.sendEvent("onKeyDown", event.which, "keyboard", event);
            this.sendEvent("onKeyStateChange", event.which, true, "keyboard", event);
            this.keyStates[event.which] = true;
        }
    },
    onKeyUp: function(event) {
        if (event) {
            this.sendEvent("onKeyUp", event.which, "keyboard", event);
            this.sendEvent("onKeyStateChange", event.which, false, "keyboard", event);
            delete this.keyStates[event.which];
        }
    },
    update: function() {
        this.processKeyEvents();
    },
    processKeyEvents: function() {
        for (var key in this.keyStates) {
            if (this.bindings[key]) {
                var method = this.bindings[key];
                if (method && typeof method[0] == "object" && typeof method[1] === "string") {
                    method[0][method[1]](this.engine.fps.getDelta() / 1e3, key);
                }
            }
        }
    },
    setMouseButtons: function(buttons) {
        if (!buttons || buttons.length < 3) return;
        this.button = -1;
        for (var i = 0; i < 3; i++) {
            this.buttons[i] = buttons[i];
            if (buttons[i] === true) this.button = i;
        }
    },
    resetMouseButtons: function() {
        this.button = -1;
        this.buttons[0] = false;
        this.buttons[1] = false;
        this.buttons[2] = false;
    }
});

if (typeof HammerWF !== "undefined") {
    HammerWF.MouseInput.prototype.handler = function(ev) {
        if (ev.type == "mousedown") {
            this.pressed = true;
        }
        if (!this.pressed || !this.allow) return;
        if (ev.type == "mouseup") {
            this.pressed = false;
        }
        var buttons = [ false, false, false ];
        if ("buttons" in ev) {
            buttons[0] = !!(ev.buttons & 1);
            buttons[1] = !!(ev.buttons & 4);
            buttons[2] = !!(ev.buttons & 2);
        } else if ("button" in ev) {
            buttons[ev.button] = true;
        }
        var MOUSE_INPUT_MAP = {
            mousedown: 1,
            mousemove: 2,
            mouseup: 4
        };
        this.callback(this.manager, MOUSE_INPUT_MAP[ev.type], {
            pointers: [ ev ],
            changedPointers: [ ev ],
            pointerType: "mouse",
            srcEvent: ev,
            frakButtons: buttons
        });
    };
    HammerWF.PointerEventInput.prototype.handler = function(ev) {
        var store = this.store;
        var removePointer = false;
        var INPUT_TYPE_TOUCH = "touch";
        var INPUT_TYPE_PEN = "pen";
        var INPUT_TYPE_MOUSE = "mouse";
        var INPUT_TYPE_KINECT = "kinect";
        var INPUT_START = 1;
        var INPUT_MOVE = 2;
        var INPUT_END = 4;
        var INPUT_CANCEL = 8;
        var POINTER_INPUT_MAP = {
            pointerdown: INPUT_START,
            pointermove: INPUT_MOVE,
            pointerup: INPUT_END,
            pointercancel: INPUT_CANCEL,
            pointerout: INPUT_CANCEL
        };
        var IE10_POINTER_TYPE_ENUM = {
            2: INPUT_TYPE_TOUCH,
            3: INPUT_TYPE_PEN,
            4: INPUT_TYPE_MOUSE,
            5: INPUT_TYPE_KINECT
        };
        function inArray(src, find, findByKey) {
            if (src.indexOf && !findByKey) {
                return src.indexOf(find);
            } else {
                var i = 0;
                while (i < src.length) {
                    if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                        return i;
                    }
                    i++;
                }
                return -1;
            }
        }
        var eventTypeNormalized = ev.type.toLowerCase().replace("ms", "");
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
        var isTouch = pointerType == INPUT_TYPE_TOUCH;
        var storeIndex = inArray(store, ev.pointerId, "pointerId");
        if (eventType & INPUT_START) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }
        if (storeIndex < 0) {
            return;
        }
        store[storeIndex] = ev;
        var buttons = [ !!(ev.buttons & 1), !!(ev.buttons & 4), !!(ev.buttons & 2) ];
        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ ev ],
            pointerType: pointerType,
            srcEvent: ev,
            frakButtons: buttons
        });
        if (removePointer) {
            store.splice(storeIndex, 1);
        }
    };
}

var BuiltInShaders = {
    default: {
        "shaders/default/attributes.frag": "// Attributes shader\nprecision mediump float; \n\nuniform float texCoord2d0Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float texCoord2d1Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float texCoord2d2Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float texCoord2d3Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float positionMultiplier;\t\t\t\t// Position output multiplier between 0 and 1\nuniform float tangentMultiplier;\t\t\t\t// Tangent output multiplier between 0 and 1\nuniform float bitangentMultiplier;\t\t\t// BiTangent output multiplier between 0 and 1\nuniform float normalMultiplier;\t\t\t\t\t// Normal output multiplier between 0 and 1\nuniform float barycentricMultiplier;\t\t// Barycentric output multiplier between 0 and 1\n\nvarying vec2 fragTexcoord2d0;\nvarying vec2 fragTexcoord2d1;\nvarying vec2 fragTexcoord2d2;\nvarying vec2 fragTexcoord2d3;\nvarying vec4 fragPosition;\nvarying vec4 fragTangent;\nvarying vec4 fragBitangent;\nvarying vec4 fragNormal;\nvarying vec3 fragBarycentric;\n\nvoid main(void) {\n\tgl_FragColor = \n\t\tvec4(fragTexcoord2d0, 0.0, 1.0)*texCoord2d0Multiplier+\n\t\tvec4(fragTexcoord2d1, 0.0, 1.0)*texCoord2d1Multiplier+\n\t\tvec4(fragTexcoord2d2, 0.0, 1.0)*texCoord2d2Multiplier+\n\t\tvec4(fragTexcoord2d3, 0.0, 1.0)*texCoord2d3Multiplier+\n\t\tvec4(fragPosition.rgb, 1.0)*positionMultiplier+\n\t\tvec4(fragTangent.rgb, 1.0)*tangentMultiplier+\n\t\tvec4(fragBitangent.rgb, 1.0)*bitangentMultiplier+\n\t\tvec4(fragNormal.rgb, 1.0)*normalMultiplier+\n\t\tvec4(fragBarycentric, 1.0)*barycentricMultiplier;\n}",
        "shaders/default/attributes.vert": "// Attributes shader\nattribute vec3 position; \nattribute vec3 tangent; \nattribute vec3 bitangent; \nattribute vec3 normal; \nattribute vec3 barycentric; \nattribute vec2 texcoord2d0; \nattribute vec2 texcoord2d1;\nattribute vec2 texcoord2d2; \nattribute vec2 texcoord2d3; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec2 fragTexcoord2d0;\nvarying vec2 fragTexcoord2d1;\nvarying vec2 fragTexcoord2d2;\nvarying vec2 fragTexcoord2d3;\nvarying vec4 fragPosition;\nvarying vec4 fragTangent;\nvarying vec4 fragBitangent;\nvarying vec4 fragNormal;\nvarying vec3 fragBarycentric;\n\nvoid main() {\n\tfragNormal=projection*modelview*vec4(normal, 1.0); \n\tfragPosition=projection*modelview*vec4(position, 1.0); \n\tfragTangent=projection*modelview*vec4(tangent, 1.0); \n\tfragBitangent=projection*modelview*vec4(bitangent, 1.0); \n  fragTexcoord2d0=texcoord2d0;\n  fragTexcoord2d1=texcoord2d1;\n  fragTexcoord2d2=texcoord2d2;\n  fragTexcoord2d3=texcoord2d3;\n  fragBarycentric=barycentric;\n\tgl_Position=fragPosition;\n}\n",
        "shaders/default/debug.frag": "// Fallback shader\nprecision mediump float; \n\nuniform vec4 color;\n\nvoid main(void) { \n\tgl_FragColor = color;\n}",
        "shaders/default/debug.vert": "// Debug shader\nattribute vec3 position; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 fragPosition;\n\nvoid main() {\n\tfragPosition=projection*modelview*vec4(position, 1.0); \n\tgl_Position=fragPosition;\n}\n",
        "shaders/default/DebugPackedDepthTexture.frag": "// DebugPackedDepthTexture\nprecision highp float;\n\n#define USE_VSM\n\nuniform mat4 modelview;\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec2 uv0;\n\nfloat unpack(vec4 c) {\n\tconst vec4 bitShifts = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);\n\treturn dot(c, bitShifts);\n}\n\nfloat unpackHalf(vec2 c) {\n\treturn c.x + (c.y / 255.0);\n}\n\nvoid main(void) {\n\tvec4 texel = texture2D(diffuse0, uv0);\n\n#ifdef USE_VSM\n\tgl_FragColor = vec4(0.0, unpackHalf(texel.xy), unpackHalf(texel.zw), 1.0);\n#else\n\tfloat depth = unpack(texel);\n\tgl_FragColor = vec4(depth, depth, depth, 1.0);\n#endif\n}\n",
        "shaders/default/DebugPackedDepthTexture.vert": "// DebugPackedDepthTexture\nattribute vec3 position; \nattribute vec3 normal; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec2 uv0;\n\nvoid main() {\n\tuv0=texcoord2d0;\n\tviewPosition = modelview * vec4(position, 1.0);\n\tviewNormal = normalize(mat3(modelview)*normal);\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/default/deferred_background.frag": "precision highp float;\n\nuniform vec4 color;\n\nvarying vec2 uv;\n\nvoid main () {\n\tgl_FragColor = color;\n}\n",
        "shaders/default/deferred_background.vert": "attribute vec3 position;\nattribute vec2 uv0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/deferred_gbuffer.frag": "#extension GL_EXT_draw_buffers : require\n\nprecision highp float;\n\nuniform mat4 view;\nuniform mat4 viewInverse;\n\nuniform vec4 diffuse;\nuniform float specularStrength;\nuniform int specularPower;\nuniform float lightContribution;\nuniform int useNormalmap;\nuniform int useReflection;\nuniform int receiveShadows;\n\nuniform float materialBlend;\n\nuniform sampler2D diffuse0;\nuniform sampler2D normal0;\nuniform samplerCube env0;\nuniform sampler2D mask;\n\nvarying float depth;\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\n\nvarying mat3 tbn;\n\nvec3 reflection() {\n\tvec3 eyeDirection = normalize(-viewPosition.xyz);\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\n\tvec4 color = textureCube(env0, lookup);\n\treturn color.rgb;\n}\n\nvoid main() {\n\tvec4 textureColor = texture2D(diffuse0, uv0);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tvec3 N = viewNormal;\n\tif (useNormalmap == 1) {\n\t\tvec4 encodedNormal = texture2D(normal0, uv0);\n\t\tvec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);\n\t\tN = normalize(tbn * localCoords);\n\t\tN = normalize(mat3(view) * N);\n\t}\n\n\tif (useReflection == 1) {\n\t\tvec3 refl = reflection();\n\t\tfloat maskValue = texture2D(mask, uv0).r;\n\t\tcolor.rgb = mix(refl, color.rgb, maskValue * materialBlend);\n\t}\n\n\tgl_FragData[0] = vec4(color.rgb, specularStrength);\n\tgl_FragData[1] = vec4(N, depth);\n\tgl_FragData[2] = vec4(worldPosition.xyz, float(specularPower)/255.0);\n\tgl_FragData[3] = vec4(lightContribution, receiveShadows, depth, 1.0);\n}\n",
        "shaders/default/deferred_gbuffer.vert": "attribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\nattribute vec3 tangent;\nattribute vec3 bitangent;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform float zNear;\nuniform float zFar;\n\nvarying float depth;\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\n\nvarying mat3 tbn;\n\nvoid main() {\n\tuv0 = texcoord2d0;\n\tworldPosition = model * vec4(position, 1.0);\n\tworldNormal = normalize(mat3(model) * normal);\n\tviewPosition = view * worldPosition;\n\tviewNormal = mat3(modelview) * normal;\n\tdepth = (-viewPosition.z - zNear) / (zFar - zNear);\n\n\ttbn[0] = normalize(vec3(model * vec4(tangent, 0.0)));\n\ttbn[1] = normalize(vec3(model * vec4(bitangent, 0.0)));\n\ttbn[2] = worldNormal;\n\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/default/deferred_light_ambient.frag": "precision highp float;\n\nuniform sampler2D gb0;\nuniform sampler2D gb1;\nuniform sampler2D gb2;\nuniform sampler2D gb3;\nuniform sampler2D shadow0;\n\nuniform vec4 lightColor;\n\nvarying vec2 uv;\n\nvoid main () {\n\tvec4 data0 = texture2D(gb0, uv);\n\tvec3 color = data0.rgb * lightColor.rgb;\n\tgl_FragColor = vec4(color, 1.0);\n}\n\n",
        "shaders/default/deferred_light_ambient.vert": "attribute vec3 position;\nattribute vec2 texcoord2d0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = texcoord2d0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/deferred_light_directional.frag": "precision highp float;\n\nuniform sampler2D gb0;\nuniform sampler2D gb1;\nuniform sampler2D gb2;\nuniform sampler2D gb3;\nuniform sampler2D shadow0;\n\nuniform vec3 cameraPosition;\nuniform vec3 lightDirection;\nuniform vec4 lightColor;\nuniform float lightIntensity;\n\nuniform mat4 view;\nuniform mat4 lightView;\nuniform mat4 lightProjection;\nuniform float shadowBias;\n\nuniform int useShadows;\nuniform int useSoftShadows;\nuniform int shadowOnly;\n\nvarying vec2 uv;\n\nfloat linstep(float low, float high, float v) {\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\n}\n\nfloat VSM(vec2 moments, float compare) {\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\n\tfloat d = compare - moments.x;\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\n\treturn clamp(max(p, p_max), 0.0, 1.0);\n}\n\nfloat shadowmap(vec4 worldPosition) {\n\tvec4 shadowPosition = lightProjection * lightView * worldPosition;\n\tvec2 shadowUV = shadowPosition.xy / shadowPosition.w;\n\tshadowUV = shadowUV * 0.5 + 0.5;\n\tvec4 shadowTexel = texture2D(shadow0, shadowUV);\n\n\treturn VSM(shadowTexel.xy, shadowPosition.z);\n\t// return step(shadowPosition.z - shadowBias, shadowTexel.r);\n}\n\nvoid main () {\n\tvec4 data2 = texture2D(gb2, uv); // position, specularPower/255\n\tvec4 data3 = texture2D(gb3, uv); // material parameters: (lightContribution, receiveShadows, unused, unused)\n\tvec4 P = vec4(data2.xyz, 1.0);\n\n\tfloat shadow = 1.0;\n\n\tif (useShadows == 1 && data3.g > 0.0) {\n\t\tif (useSoftShadows == 1)\n\t\t\tshadow = texture2D(shadow0, uv).r;\n\t\telse\n\t\t\tshadow = shadowmap(P);\n\t}\n\n\tif (shadowOnly == 1) {\n\t\tgl_FragColor = vec4(shadow, shadow, shadow, 1.0);\n\t\treturn;\n\t}\n\n\tvec4 data0 = texture2D(gb0, uv); // color, specularIntensity\n\n\tvec4 data1 = texture2D(gb1, uv); // normal, depth\n\n\tvec3 C = data0.xyz;\n\tvec3 N = data1.xyz;\n\tfloat specularIntensity = data0.w;\n\tfloat specularPower = 255.0*data2.w;\n\n\tvec4 viewPosition = view * P;\n\tvec3 L = normalize(mat3(view) * lightDirection);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0);\n\tfloat specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));\n\tvec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;\n\tvec3 specularColor = lightColor.rgb * specularLight * specularIntensity;\n\n\tvec3 lighting = diffuseColor + specularColor;\n\n\tvec3 final = shadow * mix(C, lighting, data3.r);\n\tgl_FragColor = vec4(final, 1.0);\n}\n",
        "shaders/default/deferred_light_directional.vert": "attribute vec3 position;\nattribute vec2 texcoord2d0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = texcoord2d0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/deferred_light_omni.frag": "precision highp float;\n\nuniform sampler2D gb0;\nuniform sampler2D gb1;\nuniform sampler2D gb2;\nuniform sampler2D gb3;\n\nuniform vec4 lightColor;\nuniform vec3 lightPosition;\nuniform float lightIntensity;\nuniform float lightRadius;\n\nuniform mat4 view;\nuniform vec3 cameraPosition;\n\nvarying vec4 screenPosition;\n\nvoid main() {\n\tvec2 uv = screenPosition.xy;\n\tuv /= screenPosition.w;\n\tuv = 0.5 * (vec2(uv.x, uv.y) + 1.0);\n\n\tvec4 data0 = texture2D(gb0, uv); // color.rgb, specularIntensity\n\tvec4 data1 = texture2D(gb1, uv); // normal.xyz, depth\n\tvec4 data2 = texture2D(gb2, uv); // position.xyz, specularPower/255\n\t// vec4 data3 = texture2D(gb3, uv); // unused\n\n\tvec3 C = data0.xyz;\n\tvec3 N = data1.xyz;\n\tvec3 P = data2.xyz;\n\tfloat specularIntensity = data0.w;\n\tfloat specularPower = 255.0*data2.w;\n\n\tvec3 lightVector = lightPosition - P;\n\tfloat attenuation = clamp(1.0 - length(lightVector)/lightRadius, 0.0, 1.0);\n\tlightVector = normalize(lightVector);\n\n\tvec4 viewPosition = view * vec4(P, 1.0);\n\tvec3 L = normalize(mat3(view) * lightVector);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0);\n\tfloat specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));\n\tvec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;\n\tvec3 specularColor = lightColor.rgb * specularLight * specularIntensity;\n\n\tvec3 final = attenuation * (diffuseColor + specularColor);\n\n\tgl_FragColor = vec4(final, 1.0);\n}\n",
        "shaders/default/deferred_light_omni.vert": "attribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 screenPosition;\n\nvoid main() {\n\tscreenPosition = projection * view * model * vec4(position, 1.0);\n\tgl_Position = screenPosition;\n}\n",
        "shaders/default/deferred_shadow_directional.frag": "/** Directional light shadow-map */\n#extension GL_OES_standard_derivatives : require\n\nprecision highp float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nvarying float depth;\nvarying vec2 uv;\n\nvoid main() {\n\tvec4 textureColor = texture2D(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfloat dx = dFdx(depth);\n\tfloat dy = dFdy(depth);\n\tgl_FragColor = vec4(depth, pow(depth, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0);\n}\n",
        "shaders/default/deferred_shadow_directional.vert": "/** Directional light shadow-map */\nattribute vec3 position;\nattribute vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying float depth;\nvarying vec2 uv;\n\nvoid main() {\n\tvec4 viewPosition = modelview * vec4(position, 1.0);\n\tvec4 clipPosition = projection * viewPosition;\n\tdepth = clipPosition.z;\n\tuv = texcoord2d0;\n\tgl_Position = clipPosition;\n}\n",
        "shaders/default/depth.frag": "// Shader for rendering linear depth values into a floating point texture\nprecision mediump float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nvarying float depth;\nvarying vec2 uv;\n\nvoid main() {\n\tvec4 textureColor = texture2D(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tgl_FragColor = vec4(depth, depth, depth, depth);\n}\n",
        "shaders/default/depth.vert": "// Shader for rendering linear depth values into a floating point texture\nattribute vec3 position;\nattribute vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform float zNear;\nuniform float zFar;\n\nvarying float depth;\nvarying vec2 uv;\n\nvoid main() {\n\tvec4 viewPosition = modelview * vec4(position, 1.0);\n\tdepth = (-viewPosition.z - zNear) / (zFar - zNear);\n\tuv = texcoord2d0;\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/default/DepthRGBA.frag": "// Shader for rendering linear depth values into RGBA texture\nprecision highp float;\n\nuniform mat4 modelview;\n// uniform float linearDepthConstant;\n\n/** Packing Type:\n\t1 - packs depth value into RGBA\n\t2 - packs depth into RG and depth*depth into BA\n**/\nuniform int packingType;\n\nvarying vec4 viewPosition;\n\nvec4 pack(float depth) {\n\tconst vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);\n\tconst vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\n\tvec4 comp = fract(depth * bitShift);\n\tcomp -= comp.xxyz * bitMask;\n\treturn comp;\n}\n\nvec2 packHalf(float depth) {\n\tconst vec2 bias = vec2(1.0 / 255.0, 0.0);\n\tvec2 c = vec2(depth, fract(depth * 255.0));\n\treturn c - (c.yy * bias);\n}\n\nvoid main () {\n\tif (packingType==2) {\n\t\tgl_FragColor = vec4(packHalf(gl_FragCoord.z), packHalf(gl_FragCoord.z*gl_FragCoord.z));\n\t}\n\telse {\n\t\tgl_FragColor = pack(gl_FragCoord.z); // less precision, but works on most systems\n\t\t// float linearDepth = length(viewPosition) * linearDepthConstant;\n\t\t// gl_FragColor = pack(linearDepth);\n\t}\n}\n",
        "shaders/default/DepthRGBA.vert": "// Shader for rendering linear depth values into RGBA texture\nattribute vec3 position;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 viewPosition;\n\nvoid main() {\n\tviewPosition=modelview*vec4(position, 1.0);\n\tgl_Position=projection*viewPosition;\n}\n",
        "shaders/default/diffuse.frag": "// Diffuse shader\nprecision highp float;\n\nuniform mat4 modelview;\nuniform mat4 view;\n\nuniform vec4 ambient;\nuniform vec4 diffuse;\nuniform float specularStrength;\nuniform int specularPower;\n\nuniform vec3 lightDirection;\nuniform vec4 lightColor;\nuniform float lightIntensity;\nuniform float shadowBias;\n\nuniform sampler2D diffuse0;\nuniform sampler2D shadow0;\n\nuniform int hasFloat;\nuniform int useVSM;\nuniform int useShadows;\nuniform int receiveShadows;\n\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec4 shadowPosition;\n\nfloat unpack(vec4 c) {\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\n\treturn dot(c, bitShifts);\n}\n\n/** Computes color and directional lighting */\nvec4 lighting(float shadow) {\n\tvec4 textureColor = texture2D(diffuse0, uv0);\n\tvec3 N = normalize(viewNormal);\n\tvec3 L = normalize(mat3(view)*lightDirection);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\n\tspecularLight = pow(specularLight, float(specularPower));\n\n\tvec4 ambientColor = ambient * textureColor;\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\n\n\treturn ambientColor + (diffuseColor + specularColor) * shadow;\n}\n\nfloat linstep(float low, float high, float v) {\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\n}\n\nfloat VSM(vec2 moments, float compare) {\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\n\tfloat d = compare - moments.x;\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\n\treturn clamp(max(p, p_max), 0.0, 1.0);\n}\n\nfloat shadowmap() {\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\n\tuv = uv * 0.5 + 0.5;\n\tvec4 shadowTexel = texture2D(shadow0, uv);\n\n\tfloat depth;\n\tif (hasFloat == 1)\n\t\tdepth = shadowTexel.r;\n\telse\n\t\tdepth = unpack(shadowTexel);\n\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\n\n\tif (useVSM == 1)\n\t\treturn VSM(shadowTexel.xy, lightDepth);\n\n\treturn step(lightDepth - shadowBias, depth);\n}\n\nvoid main(void) {\n\tfloat shadow = 1.0;\n\tif (useShadows > 0 && receiveShadows > 0) {\n\t\tshadow = shadowmap();\n\t}\n\n\tvec4 color = lighting(shadow);\n\tgl_FragColor = clamp(color, 0.0, 1.0);\n}\n",
        "shaders/default/diffuse.vert": "// Diffuse shader\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform mat4 lightProjection;\nuniform mat4 lightView;\n\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec4 shadowPosition;\n\nvoid main() {\n\n\tuv0 = texcoord2d0; // TODO: In the future this will probably need to use texture offset and scale uniforms\n\tworldPosition = model * vec4(position, 1.0);\n\tworldNormal = normalize(mat3(model) * normal);\n\tviewPosition = view * worldPosition;\n\tviewNormal = mat3(modelview) * normal;\n\n\tshadowPosition = lightProjection * lightView * worldPosition;\n\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/default/fallback.frag": "// Fallback shader\nprecision mediump float; \n\nvoid main(void) { \n\tgl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}",
        "shaders/default/fallback.vert": "// Fallback shader\nattribute vec3 position; \nattribute vec3 normal; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n  fragNormal=modelview*vec4(normal, 1.0);\n\tfragPosition=projection*modelview*vec4(position, 1.0); \n  fragTexcoord2d0=texcoord2d0;\n\tgl_Position=fragPosition;\n}\n",
        "shaders/default/font.frag": "// Diffuse shader\nprecision mediump float; \n\nuniform vec4 ambient;\nuniform vec4 diffuse;\nuniform int page;\t\t\t\t\t\t// The font page texture\n\nuniform sampler2D page0;\t\t\nuniform sampler2D page1;\nuniform sampler2D page2;\nuniform sampler2D page3;\nuniform sampler2D page4;\nuniform sampler2D page5;\nuniform sampler2D page6;\nuniform sampler2D page7;\n\nvarying vec2 fragTexcoord2d0;\n\nvoid main(void) {\n\tvec4 c;\n\tif(page==0) c = texture2D(page0, fragTexcoord2d0);\n\tif(page==1) c = texture2D(page1, fragTexcoord2d0);\n\tif(page==2) c = texture2D(page2, fragTexcoord2d0);\n\tif(page==3) c = texture2D(page3, fragTexcoord2d0);\n\tif(page==4) c = texture2D(page4, fragTexcoord2d0);\n\tif(page==5) c = texture2D(page5, fragTexcoord2d0);\n\tif(page==6) c = texture2D(page6, fragTexcoord2d0);\n\tif(page==7) c = texture2D(page7, fragTexcoord2d0);\n\tgl_FragColor=vec4(diffuse.r*c.r, diffuse.g*c.g, diffuse.b*c.b, c.a);\n}",
        "shaders/default/font.vert": "// Font shader\nattribute vec3 position; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n\tfragPosition=projection*modelview*vec4(position, 1.0); \n\tfragTexcoord2d0=texcoord2d0;\n\tgl_Position=fragPosition;\n}\n",
        "shaders/default/forward_shadow.frag": "/** Directional light shadow-map */\nprecision highp float;\n\nuniform int hasFloat;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nvarying float depth;\nvarying vec2 uv;\n\nvec4 pack(float depth) {\n\tconst vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);\n\tconst vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\n\tvec4 comp = fract(depth * bitShift);\n\tcomp -= comp.xxyz * bitMask;\n\treturn comp;\n}\n\nvoid main() {\n\tvec4 textureColor = texture2D(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfloat d = (depth + 1.0) * 0.5;\n\n\tif (hasFloat == 1) {\n\t\tgl_FragColor = vec4(d, d, d, 1.0);\n\t}\n\telse {\n\t\tgl_FragColor = pack(d);\n\t}\n\n}\n",
        "shaders/default/forward_shadow.vert": "/** Directional light shadow-map */\nattribute vec3 position;\nattribute vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying float depth;\nvarying vec2 uv;\n\nvoid main() {\n\tvec4 viewPosition = modelview * vec4(position, 1.0);\n\tvec4 clipPosition = projection * viewPosition;\n\tdepth = clipPosition.z;\n\tuv = texcoord2d0;\n\tgl_Position = clipPosition;\n}\n",
        "shaders/default/forward_shadow_vsm.frag": "/** Directional light shadow-map */\n#extension GL_OES_standard_derivatives : require\n\nprecision highp float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nvarying float depth;\nvarying vec2 uv;\n\nvoid main() {\n\tvec4 textureColor = texture2D(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfloat d = (depth + 1.0) * 0.5;\n\tfloat dx = dFdx(d);\n\tfloat dy = dFdy(d);\n\n\tgl_FragColor = vec4(d, pow(d, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0);\n}\n",
        "shaders/default/GaussianBlur.frag": "// Shader for rendering gaussian blurred image (horizontal)\nprecision highp float;\n\n#define MAX_BLUR_KERNEL_SIZE 10\n\nuniform float screenWidth;\nuniform float screenHeight;\nuniform int orientation; // 0 - horizontal, 1 - vertical\nuniform int kernelSize; // Recommended values: 3, 5, 7, 10 (10 is currently the maximum)\nuniform sampler2D tex0;\n\nvarying vec2 uv0;\n\nvoid main () {\n\tfloat halfSize = float(kernelSize)*0.5;\n\tvec2 texelSize = vec2(1.0/screenWidth, 1.0/screenHeight);\n\tvec4 color = vec4(0.0);\n\n\tif (orientation==1) {\n\t\t// vertical pass\n\t\tfor (int i=0; i<MAX_BLUR_KERNEL_SIZE; ++i) {\n\t\t\tif (i>=kernelSize)\n\t\t\t\tbreak;\n\t\t\tfloat offset = float(i)-halfSize;\n\t\t\tcolor += texture2D(tex0, uv0 + vec2(0.0, offset * texelSize.y));\n\t\t}\n\t}\n\telse {\n\t\t// horizontal pass\n\t\tfor (int i=0; i<MAX_BLUR_KERNEL_SIZE; ++i) {\n\t\t\tif (i>=kernelSize)\n\t\t\t\tbreak;\n\t\t\tfloat offset = float(i)-halfSize;\n\t\t\tcolor += texture2D(tex0, uv0 + vec2(offset * texelSize.x, 0.0));\n\t\t}\n\t}\n\tgl_FragColor = color / float(kernelSize);\n\t// gl_FragColor = texture2D(tex0, uv0);\n}\n",
        "shaders/default/GaussianBlur.vert": "// Shader for rendering gaussian blurred image (horizontal)\nattribute vec3 position;\nattribute vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform float screenWidth;\nuniform float screenHeight;\n\nvarying vec2 uv0;\n\nvoid main() {\n\tuv0 = texcoord2d0;\n\t\n\t// Resizes the rendered unit-quad to screen size\n\tvec4 viewPosition=modelview*vec4(position.x*screenWidth, position.y*screenHeight, position.z, 1.0);\n\tgl_Position=projection*viewPosition;\n}\n",
        "shaders/default/lines.frag": "precision mediump float;\n\nvarying vec4 fragColor;\nvarying vec4 fragPosition;\n\nvoid main(void) {\n\tgl_FragColor = fragColor;\n}\n",
        "shaders/default/lines.vert": "attribute vec3 position;\nattribute vec3 pointA;\nattribute vec3 pointB;\nattribute float width;\nattribute vec4 color;\n\nuniform vec2 viewport;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 fragColor;\nvarying vec4 fragPosition;\n\nvoid main() {\n\tvec4 pA = projection * modelview * vec4(pointA, 1.0);\n\tvec4 pB = projection * modelview * vec4(pointB, 1.0);\n\n\tvec2 screenA = viewport * (0.5 * pA.xy / pA.w + 0.5);\n\tvec2 screenB = viewport * (0.5 * pB.xy / pB.w + 0.5);\n\n\tvec2 xBasis = normalize(screenB - screenA);\n\tvec2 yBasis = vec2(-xBasis.y, xBasis.x);\n\n\tvec2 offsetA = screenA.xy + width * (position.x * xBasis + position.y * yBasis);\n\tvec2 offsetB = screenB.xy + width * (position.x * xBasis + position.y * yBasis);\n\n\tvec2 pt = mix(offsetA, offsetB, position.z);\n\tvec4 clip = mix(pA, pB, position.z);\n\n\tfragColor = color;\n\tfragPosition=modelview*vec4(position, 1.0);\n\tgl_Position=vec4(clip.w * ((2.0 * pt) / viewport - 1.0), clip.z, clip.w);\n}\n",
        "shaders/default/normalmapped.frag": "// Normal mapped diffuse shader\nprecision highp float;\n\nuniform mat4 modelview;\nuniform mat4 view;\n\nuniform vec4 ambient;\nuniform vec4 diffuse;\nuniform float specularStrength;\nuniform int specularPower;\n\nuniform vec3 lightDirection;\nuniform vec4 lightColor;\nuniform float lightIntensity;\nuniform float shadowBias;\n\nuniform sampler2D diffuse0;\nuniform sampler2D normal0;\nuniform sampler2D shadow0;\n\nuniform int hasFloat;\nuniform int useVSM;\nuniform int useShadows;\nuniform int receiveShadows;\n\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec4 shadowPosition;\n\nvarying mat3 tbn;\n\nfloat unpack(vec4 c) {\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\n\treturn dot(c, bitShifts);\n}\n\n/** Computes color and directional lighting */\nvec4 lighting(float shadow) {\n\tvec4 encodedNormal = texture2D(normal0, uv0);\n\t// vec3 localCoords = 2.0 * encodedNormal.rgb - vec3(1.0);\n\tvec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);\n\tvec3 normalDirection = normalize(tbn * localCoords);\n\tvec3 N = normalize(mat3(view) * normalDirection);\n\n\tvec4 textureColor = texture2D(diffuse0, uv0);\n\tvec3 L = normalize(mat3(view)*lightDirection);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\n\tspecularLight = pow(specularLight, float(specularPower));\n\n\tvec4 ambientColor = ambient * textureColor;\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\n\n\treturn ambientColor + (diffuseColor + specularColor) * shadow;\n}\n\nfloat linstep(float low, float high, float v) {\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\n}\n\nfloat VSM(vec2 moments, float compare) {\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\n\tfloat d = compare - moments.x;\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\n\treturn clamp(max(p, p_max), 0.0, 1.0);\n}\n\nfloat shadowmap() {\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\n\tuv = uv * 0.5 + 0.5;\n\tvec4 shadowTexel = texture2D(shadow0, uv);\n\n\tfloat depth;\n\tif (hasFloat == 1)\n\t\tdepth = shadowTexel.r;\n\telse\n\t\tdepth = unpack(shadowTexel);\n\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\n\n\tif (useVSM == 1)\n\t\treturn VSM(shadowTexel.xy, lightDepth);\n\n\treturn step(lightDepth - shadowBias, depth);\n}\n\nvoid main(void) {\n\tfloat shadow = 1.0;\n\tif (useShadows > 0 && receiveShadows > 0) {\n\t\tshadow = shadowmap();\n\t}\n\n\tvec4 color = lighting(shadow);\n\tgl_FragColor = clamp(color, 0.0, 1.0);\n}\n",
        "shaders/default/normalmapped.vert": "// Normal mapped diffuse shader\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\nattribute vec3 tangent;\nattribute vec3 bitangent;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform mat4 lightProjection;\nuniform mat4 lightView;\nuniform vec3 lightDirection;\n\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec4 shadowPosition;\n\nvarying mat3 tbn;\n\nhighp mat3 transpose(in highp mat3 m) {\n\thighp vec3 i0 = m[0];\n\thighp vec3 i1 = m[1];\n\thighp vec3 i2 = m[2];\n\thighp mat3 outMatrix = mat3(\n\t\tvec3(i0.x, i1.x, i2.x),\n\t\tvec3(i0.y, i1.y, i2.y),\n\t\tvec3(i0.z, i1.z, i2.z)\n\t);\n\treturn outMatrix;\n}\n\nvoid main() {\n\tuv0 = texcoord2d0; // TODO: In the future this will probably need to use texture offset and scale uniforms\n\tworldPosition = model * vec4(position, 1.0);\n\tworldNormal = normalize(mat3(model) * normal);\n\tviewPosition = view * worldPosition;\n\tviewNormal = normalize(mat3(modelview) * normal);\n\n\tshadowPosition = lightProjection * lightView * worldPosition;\n\n\ttbn[0] = normalize(vec3(model * vec4(tangent, 0.0)));\n\ttbn[1] = normalize(vec3(model * vec4(bitangent, 0.0)));\n\ttbn[2] = worldNormal;\n\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/default/OITAccum.frag": "/**\n * Based on the following ideas:\n *\n *   - Weighted Blended Order-Independent Transparency\n *     http://jcgt.org/published/0002/02/09/\n *\n *   - Stochastic Transparency\n *     http://www.nvidia.com/object/nvidia_research_pub_016.html\n *\n *   - Simplex noise (C) Ashima Arts\n *     https://github.com/ashima/webgl-noise\n */\n\nprecision highp float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nuniform int render_mode;\n\nuniform float zNear;\nuniform float zFar;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvec4 mod289(vec4 x) {\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n\treturn mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n\treturn mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n\tconst vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n\tvec4 p,s;\n\tp.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n\tp.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n\ts = vec4(lessThan(p, vec4(0.0)));\n\tp.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\treturn p;\n}\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise(vec4 v) {\n\tconst vec4 C = vec4(\n\t\t0.138196601125011, // (5 - sqrt(5))/20 G4\n\t\t0.276393202250021, // 2 * G4\n\t\t0.414589803375032, // 3 * G4\n\t\t-0.447213595499958); // -1 + 4 * G4\n\n\t// First corner\n\tvec4 i = floor(v + dot(v, vec4(F4)) );\n\tvec4 x0 = v - i + dot(i, C.xxxx);\n\n\t// Other corners\n\t// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n\tvec4 i0;\n\tvec3 isX = step( x0.yzw, x0.xxx );\n\tvec3 isYZ = step( x0.zww, x0.yyz );\n\t// i0.x = dot( isX, vec3( 1.0 ) );\n\ti0.x = isX.x + isX.y + isX.z;\n\ti0.yzw = 1.0 - isX;\n\t// i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n\ti0.y += isYZ.x + isYZ.y;\n\ti0.zw += 1.0 - isYZ.xy;\n\ti0.z += isYZ.z;\n\ti0.w += 1.0 - isYZ.z;\n\n\t// i0 now contains the unique values 0,1,2,3 in each channel\n\tvec4 i3 = clamp( i0, 0.0, 1.0 );\n\tvec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n\tvec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\t// x0 = x0 - 0.0 + 0.0 * C.xxxx\n\t// x1 = x0 - i1 + 1.0 * C.xxxx\n\t// x2 = x0 - i2 + 2.0 * C.xxxx\n\t// x3 = x0 - i3 + 3.0 * C.xxxx\n\t// x4 = x0 - 1.0 + 4.0 * C.xxxx\n\tvec4 x1 = x0 - i1 + C.xxxx;\n\tvec4 x2 = x0 - i2 + C.yyyy;\n\tvec4 x3 = x0 - i3 + C.zzzz;\n\tvec4 x4 = x0 + C.wwww;\n\n\t// Permutations\n\ti = mod289(i);\n\tfloat j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n\tvec4 j1 = permute( permute( permute( permute (\n\ti.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n\t+ i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n\t+ i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n\t+ i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n\t// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n\t// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n\tvec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\tvec4 p0 = grad4(j0, ip);\n\tvec4 p1 = grad4(j1.x, ip);\n\tvec4 p2 = grad4(j1.y, ip);\n\tvec4 p3 = grad4(j1.z, ip);\n\tvec4 p4 = grad4(j1.w, ip);\n\n\t// Normalise gradients\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\tp4 *= taylorInvSqrt(dot(p4,p4));\n\n\t// Mix contributions from the five corners\n\tvec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n\tvec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4) ), 0.0);\n\tm0 = m0 * m0;\n\tm1 = m1 * m1;\n\treturn 49.0 *\n\t\t( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n\t\t+ dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n}\n\nfloat oit_weight(float z, vec4 color) {\n\treturn max(min(1.0, max(max(color.r, color.g), color.b) * color.a), color.a) * clamp(0.03 / (1e-5 + pow(z / 200.0, 4.0)), 1e-2, 3e3);\n}\n\nvec4 lighting() {\n\t/* TODO: proper lighting for transparent surfaces */\n\tvec4 textureColor = texture2D(diffuse0, fragTexcoord2d0);\n\tvec4 color = diffuse * textureColor;\n\treturn color;\n}\n\nvoid main(void) {\n\tvec4 color = lighting();\n\n\t// Weighted Blended Order-Independent Transparency color pass\n\tif (render_mode == 0) {\n\t\tfloat linDepth = 2.0 * zNear * zFar / (zFar + zNear - (2.0 * -fragPosition.z - 1.0) * (zFar - zNear));\n\t\tfloat weight = oit_weight(linDepth, color);\n\t\tgl_FragColor = vec4(color.rgb * color.a, color.a) * weight;\n\t}\n\n\t// Alpha reveal amount pass\n\telse if (render_mode == 1) {\n\t\tgl_FragColor = vec4(color.a); // total amount revealed (blending: 0; 1-src.a)\n\t}\n\n\t// Alpha mapping pass\n\telse if (render_mode == 2) {\n\t\tif (color.a < 0.99)\n\t\t\tdiscard;\n\t\tgl_FragColor = color;\n\t}\n\n\t// Stochastic transparency pass\n\telse if (render_mode == 3) {\n\t\tfloat random = snoise(fragPosition*150.0);\n\t\tif (random > color.a)\n\t\t\tdiscard;\n\t\tgl_FragColor = vec4(color.rgb * color.a, 1.0);\n\t}\n}\n",
        "shaders/default/OITAccum.vert": "/** Order independent transparency - vertex program */\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n\tfragNormal = mat3(modelview) * normal;\n\tfragPosition = modelview * vec4(position, 1.0);\n\tfragTexcoord2d0 = texcoord2d0;\n\tgl_Position = projection * fragPosition;\n}\n",
        "shaders/default/OITRender.frag": "/**\n * Weighted Blended Order-Independent Transparency - Compositing program\n * Based on http://jcgt.org/published/0002/02/09/\n */\n\nprecision highp float;\n\nvarying vec2 uv;\n\nuniform vec2 ViewportSize;\nuniform int render_mode;\n\nuniform sampler2D src;\nuniform sampler2D oitAccum;\nuniform sampler2D oitWeight;\n\nvoid addRelevantSample(vec2 coords, float weight, inout vec4 accum) {\n\tvec4 sample = texture2D(oitAccum, coords);\n\tif (sample.a < 1.0)\n\t\treturn;\n\tfloat a = texture2D(oitWeight, coords).a;\n\tif (a>0.99)\n\t\treturn;\n\taccum += sample * weight * a;\n}\n\nvec4 avgColor(sampler2D s, vec2 coords) {\n\tvec2 step = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n\n\tvec2 kernel[8];\n\tkernel[0] = vec2(-step.x, step.y);\n\tkernel[1] = vec2(0.0, step.y);\n\tkernel[2] = vec2(step.x, step.y);\n\tkernel[3] = vec2(step.x, 0.0);\n\tkernel[4] = vec2(-step.x, 0.0);\n\tkernel[5] = vec2(-step.x, -step.y);\n\tkernel[6] = vec2(0.0, -step.y);\n\tkernel[7] = vec2(step.x, -step.y);\n\n\tvec4 sum = vec4(0.0);\n\tfloat weight = 1.0 / (2.0 + 1.0);\n\tfloat kernelSize = 1.0;\n\n\taddRelevantSample(coords, weight, sum);\n\n\tfor (int i=0; i<8; i++) {\n\t\taddRelevantSample(coords + kernel[i] * kernelSize, weight, sum);\n\t}\n\n\tkernelSize = 2.0;\n\tfor (int i=0; i<8; i++) {\n\t\taddRelevantSample(coords + kernel[i] * kernelSize, weight, sum);\n\t}\n\n\treturn sum;\n}\n\nvoid main(void) {\n\t// Blending: ONE_MINUS_SRC_ALPHA, SRC_ALPHA\n\n\tvec4 solidColor = texture2D(src, uv);\n\tfloat reveal = texture2D(oitWeight, uv).a;\n\tvec4 transparentColor;\n\n\t// Blended order transparency\n\tif (render_mode == 0) {\n\t\ttransparentColor = texture2D(oitAccum, uv);\n\n\t\tvec4 composite = vec4(transparentColor.rgb / max(transparentColor.a, 1e-5), reveal);\n\t\tgl_FragColor = (1.0-composite.a) * composite +  composite.a * solidColor;\n\t}\n\n\t// Stochastic transparency\n\telse if (render_mode == 1) {\n\t\ttransparentColor = avgColor(oitAccum, uv);\n\t\tgl_FragColor = (1.0 - reveal) * transparentColor + reveal * solidColor;\n\t}\n}\n",
        "shaders/default/OITRender.vert": "/** Order independent transparency - vertex program */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/positionbuffer.frag": "//Normal buffer\nprecision highp float;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform mat4 modelview;\n\nvarying vec4 worldPosition;\nvarying vec4 viewPosition;\nvarying vec3 worldNormal;\nvarying vec3 viewNormal;\n\nvec4 pack(float depth) {\n\tconst vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);\n\tconst vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\n\tvec4 comp = fract(depth * bitShift);\n\tcomp -= comp.xxyz * bitMask;\n\treturn comp;\n}\n\nvoid main() {\n    float linDepth = (-viewPosition.z - zNear) / (zFar - zNear);\n    gl_FragColor = pack(linDepth);\n}",
        "shaders/default/positionbuffer.vert": "//Normal buffer\nattribute vec3 position;\nattribute vec3 normal;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 worldPosition;\nvarying vec4 viewPosition;\nvarying vec3 worldNormal;\nvarying vec3 viewNormal;\n\nvoid main() {\n    worldPosition = model * vec4(position, 1.0);\n    viewPosition = view * worldPosition;\n    worldNormal = normalize(mat3(model)*normal);\n    viewNormal = mat3(modelview) * normal;\n    \n    gl_Position = projection * viewPosition;\n}",
        "shaders/default/postprocess_blur.frag": "/**\n * Blur post-process\n * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu\n */\n\nprecision highp float;\n\nuniform sampler2D src;\n\nvarying highp vec2 blurCoords[5];\n\nvoid main () {\n\tlowp vec4 sum = vec4(0.0);\n\tsum += texture2D(src, blurCoords[0]) * 0.204164;\n\tsum += texture2D(src, blurCoords[1]) * 0.304005;\n\tsum += texture2D(src, blurCoords[2]) * 0.304005;\n\tsum += texture2D(src, blurCoords[3]) * 0.093913;\n\tsum += texture2D(src, blurCoords[4]) * 0.093913;\n\tgl_FragColor = sum;\n}\n",
        "shaders/default/postprocess_blur.vert": "/**\n * Blur post-process\n * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu\n */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nuniform vec2 ViewportSize;\nuniform vec2 BlurSize;\n\nvarying vec2 blurCoords[5];\n\nvoid main() {\n\tvec2 offset = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y) * BlurSize;\n\n\tblurCoords[0] = uv0;\n\tblurCoords[1] = uv0 + offset * 1.407333;\n\tblurCoords[2] = uv0 - offset * 1.407333;\n\tblurCoords[3] = uv0 + offset * 3.294215;\n\tblurCoords[4] = uv0 - offset * 3.294215;\n\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/postprocess_fxaa.frag": '/**\n * FXAA post-process\n *\n * Based on webgl-meincraft FXAA implementation.\n * https://github.com/mitsuhiko/webgl-meincraft/blob/master/assets/shaders/fxaa.glsl\n */\n\n/*\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n/**\n * Basic FXAA implementation based on the code on geeks3d.com with the\n * modification that the texture2DLod stuff was removed since it\'s\n * unsupported by WebGL.\n */\n\nprecision highp float;\n\nuniform sampler2D src;\n\nuniform vec2 ViewportSize;\nuniform float reduce_min;\nuniform float reduce_mul;\nuniform float span_max;\n\nvarying vec2 uv;\n\nvec4 fxaa(sampler2D tex, vec2 texCoord) {\n\tvec4 color;\n\tvec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n\tvec3 rgbNW = texture2D(tex, texCoord + vec2(-1.0, -1.0) * inverseVP).xyz;\n\tvec3 rgbNE = texture2D(tex, texCoord + vec2(1.0, -1.0) * inverseVP).xyz;\n\tvec3 rgbSW = texture2D(tex, texCoord + vec2(-1.0, 1.0) * inverseVP).xyz;\n\tvec3 rgbSE = texture2D(tex, texCoord + vec2(1.0, 1.0) * inverseVP).xyz;\n\tvec3 rgbM = texture2D(tex, texCoord).xyz;\n\tvec3 luma = vec3(0.299, 0.587, 0.114);\n\n\tfloat lumaNW = dot(rgbNW, luma);\n\tfloat lumaNE = dot(rgbNE, luma);\n\tfloat lumaSW = dot(rgbSW, luma);\n\tfloat lumaSE = dot(rgbSE, luma);\n\tfloat lumaM = dot(rgbM, luma);\n\tfloat lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n\tfloat lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n\tvec2 dir;\n\tdir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n\tdir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n\tfloat dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * reduce_mul), reduce_min);\n\n\tfloat rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n\tdir = min(vec2(span_max, span_max), max(vec2(-span_max, -span_max), dir * rcpDirMin)) * inverseVP;\n\n\tvec3 rgbA = 0.5 * (\n\t\ttexture2D(tex, texCoord + dir * (1.0 / 3.0 - 0.5)).xyz +\n\t\ttexture2D(tex, texCoord + dir * (2.0 / 3.0 - 0.5)).xyz);\n\tvec3 rgbB = rgbA * 0.5 + 0.25 * (\n\t\ttexture2D(tex, texCoord + dir * -0.5).xyz +\n\t\ttexture2D(tex, texCoord + dir * 0.5).xyz);\n\n\tfloat lumaB = dot(rgbB, luma);\n\tif ((lumaB < lumaMin) || (lumaB > lumaMax))\n\t\tcolor = vec4(rgbA, 1.0);\n\telse\n\t\tcolor = vec4(rgbB, 1.0);\n\treturn color;\n}\n\nvoid main () {\n\tgl_FragColor = fxaa(src, uv);\n}\n',
        "shaders/default/postprocess_fxaa.vert": "/** FXAA post-process effect vertex shader */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/postprocess_ssao.frag": "/*\n * Screen space ambient occlusion post process\n *\n * SSAO GLSL shader v1.2\n * assembled by Martins Upitis (martinsh) (devlog-martinsh.blogspot.com)\n * original technique is made by Arkano22 (www.gamedev.net/topic/550699-ssao-no-halo-artifacts/)\n *\n * Changelog:\n * 1.2 - added fog calculation to mask AO. Minor fixes.\n * 1.1 - added spiral sampling method from here:\n * (http://www.cgafaq.info/wiki/Evenly_distributed_points_on_sphere)\n */\n\nprecision highp float;\n\n#define PI 3.14159265\n\nuniform sampler2D depth0;\nuniform sampler2D oitWeight;\nuniform sampler2D src;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform int ssaoOnly;\nuniform float gdisplace; // Gauss bell center, default: 0.3\nuniform float radius; // AO radius, default: 2.0\nuniform float brightness; // AO brightness, default: 1.0\nuniform float luminanceInfluence; // how much luminance affects occlusion, default: 0.7\n\nconst int samples = 16;\n// const int samples = 8;\n\nfloat aoclamp = 0.25; // depth clamp - reduces haloing at screen edges\nbool noise = true; // use noise instead of pattern for sample dithering\nfloat noiseamount = 0.0002; // dithering amount\nfloat diffarea = 0.4; // self-shadowing reduction\n\nvec2 rand(vec2 coord) {\n\tfloat noiseX = ((fract(1.0-coord.s*(ViewportSize.x/2.0))*0.25)+(fract(coord.t*(ViewportSize.y/2.0))*0.75))*2.0-1.0;\n\tfloat noiseY = ((fract(1.0-coord.s*(ViewportSize.x/2.0))*0.75)+(fract(coord.t*(ViewportSize.y/2.0))*0.25))*2.0-1.0;\n\tif (noise) {\n\t\tnoiseX = clamp(fract(sin(dot(coord, vec2(12.9898,78.233))) * 43758.5453),0.0,1.0)*2.0-1.0;\n\t\tnoiseY = clamp(fract(sin(dot(coord, vec2(12.9898,78.233)*2.0)) * 43758.5453),0.0,1.0)*2.0-1.0;\n\t}\n\treturn vec2(noiseX, noiseY) * noiseamount;\n}\n\nfloat readDepth(in vec2 coord) {\n\treturn texture2D(depth0, coord).r;\n}\n\nfloat compareDepths(in float depth1, in float depth2, inout int far) {\n\tfloat garea = 2.0; // gauss bell width\n\tfloat diff = (depth1 - depth2)*100.0; // depth difference (0-100)\n\t// reduce left bell width to avoid self-shadowing\n\tif (diff<gdisplace) {\n\t\tgarea = diffarea;\n\t}\n\telse {\n\t\tfar = 1;\n\t}\n\n\tfloat gauss = pow(2.7182,-2.0*(diff-gdisplace)*(diff-gdisplace)/(garea*garea));\n\treturn gauss;\n}\n\nfloat calAO(vec2 uv, float depth, float dw, float dh) {\n\tfloat dd = (1.0-depth) * radius;\n\n\tfloat temp = 0.0;\n\tfloat temp2 = 0.0;\n\tfloat coordw = uv.x + dw*dd;\n\tfloat coordh = uv.y + dh*dd;\n\tfloat coordw2 = uv.x - dw*dd;\n\tfloat coordh2 = uv.y - dh*dd;\n\n\tvec2 coord = vec2(coordw , coordh);\n\tvec2 coord2 = vec2(coordw2, coordh2);\n\n\tint far = 0;\n\ttemp = compareDepths(depth, readDepth(coord), far);\n\t//DEPTH EXTRAPOLATION:\n\tif (far > 0) {\n\t\ttemp2 = compareDepths(readDepth(coord2), depth, far);\n\t\ttemp += (1.0-temp)*temp2;\n\t}\n\n\treturn temp;\n}\n\nvoid main() {\n\tvec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n\tvec2 texCoord = gl_FragCoord.xy * inverseVP;\n\n\tvec2 noise = rand(texCoord);\n\tfloat depth = readDepth(texCoord);\n\tfloat reveal = texture2D(oitWeight, texCoord).a;\n\n\tfloat w = inverseVP.x/clamp(depth, aoclamp,1.0)+(noise.x*(1.0-noise.x));\n\tfloat h = inverseVP.y/clamp(depth, aoclamp,1.0)+(noise.y*(1.0-noise.y));\n\n\tfloat pw;\n\tfloat ph;\n\n\tfloat ao;\n\n\tfloat dl = PI*(3.0-sqrt(5.0));\n\tfloat dz = 1.0/float(samples);\n\tfloat l = 0.0;\n\tfloat z = 1.0 - dz/2.0;\n\n\tfor (int i = 0; i <= samples; i++) {\n\t\tfloat r = sqrt(1.0-z);\n\t\tpw = cos(l)*r;\n\t\tph = sin(l)*r;\n\t\tao += calAO(texCoord, depth, pw*w, ph*h);\n\t\tz = z - dz;\n\t\tl = l + dl;\n\t}\n\n\tao /= float(samples) * brightness;\n\tao = 1.0 - ao * reveal;\n\n\tvec3 color = texture2D(src, texCoord).rgb;\n\tvec3 lumcoeff = vec3(0.299, 0.587, 0.114);\n\tfloat lum = dot(color.rgb, lumcoeff);\n\tvec3 luminance = vec3(lum, lum, lum);\n\tvec3 final = vec3(color*mix(vec3(ao),vec3(1.0), luminance * luminanceInfluence));\n\n\tif (ssaoOnly == 1) {\n\t\tfinal = vec3(mix(vec3(ao),vec3(1.0),luminance * luminanceInfluence));\n\t}\n\n\tgl_FragColor = vec4(final, 1.0);\n}\n",
        "shaders/default/postprocess_ssao.vert": "/*\n * Screen space ambient occlusion post process\n */\nattribute vec3 position;\n\nvoid main() {\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        "shaders/default/reflective.frag": "precision highp float;\r\n\r\nuniform mat4 modelview;\r\nuniform mat4 view;\r\nuniform mat4 viewInverse;\r\n\r\nuniform vec4 ambient;\r\nuniform vec4 diffuse;\r\nuniform float specularStrength;\r\nuniform int specularPower;\r\n\r\nuniform vec3 lightDirection;\r\nuniform vec4 lightColor;\r\nuniform float lightIntensity;\r\nuniform float shadowBias;\r\n\r\nuniform sampler2D diffuse0;\r\nuniform sampler2D shadow0;\r\nuniform samplerCube env0;\r\n\r\nuniform float materialBlend;\r\n\r\nuniform int hasFloat;\r\nuniform int useVSM;\r\nuniform int useShadows;\r\nuniform int receiveShadows;\r\nuniform int useLighting;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nfloat unpack(vec4 c) {\r\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\r\n\treturn dot(c, bitShifts);\r\n}\r\n\r\nvec4 reflection() {\r\n\tvec3 eyeDirection = normalize(-viewPosition.xyz);\r\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\r\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\r\n\tvec4 color = textureCube(env0, lookup);\r\n\treturn color;\r\n}\r\n\r\n/** Computes color and directional lighting */\r\nvec4 lighting(float shadow) {\r\n\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\tvec3 N = normalize(viewNormal);\r\n\tvec3 L = normalize(mat3(view)*lightDirection);\r\n\tvec3 V = normalize(-viewPosition.xyz);\r\n\tvec3 H = normalize(L + V);\r\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\r\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\r\n\tspecularLight = pow(specularLight, float(specularPower));\r\n\r\n\tvec4 ambientColor = ambient * textureColor;\r\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\r\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\r\n\tvec4 color = ambientColor + (diffuseColor + specularColor) * shadow;\r\n\treturn color;\r\n}\r\n\r\nfloat linstep(float low, float high, float v) {\r\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\r\n}\r\n\r\nfloat VSM(vec2 moments, float compare) {\r\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\r\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\r\n\tfloat d = compare - moments.x;\r\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\r\n\treturn clamp(max(p, p_max), 0.0, 1.0);\r\n}\r\n\r\nfloat shadowmap() {\r\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\r\n\tuv = uv * 0.5 + 0.5;\r\n\tvec4 shadowTexel = texture2D(shadow0, uv);\r\n\r\n\tfloat depth;\r\n\tif (hasFloat == 1)\r\n\t\tdepth = shadowTexel.r;\r\n\telse\r\n\t\tdepth = unpack(shadowTexel);\r\n\r\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\r\n\r\n\tif (useVSM == 1)\r\n\t\treturn VSM(shadowTexel.xy, lightDepth);\r\n\r\n\treturn step(lightDepth - shadowBias, depth);\r\n}\r\n\r\nvoid main(void) {\r\n\tfloat shadow = 1.0;\r\n\tif (useShadows > 0 && receiveShadows > 0) {\r\n\t\tshadow = shadowmap();\r\n\t}\r\n\r\n\tvec4 color = reflection();\r\n\r\n\tif (useLighting == 1) {\r\n\t\tcolor = mix(color, lighting(shadow), materialBlend);\r\n\t}\r\n\telse {\r\n\t\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\t\tcolor = mix(color, diffuse * textureColor, materialBlend);\r\n\t}\r\n\tgl_FragColor = clamp(color, 0.0, 1.0);\r\n}\r\n",
        "shaders/default/reflective.vert": "// Diffuse shader\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 texcoord2d0;\r\n\r\nuniform mat4 model;\r\nuniform mat4 view;\r\nuniform mat4 modelview;\r\nuniform mat4 projection;\r\nuniform mat4 lightProjection;\r\nuniform mat4 lightView;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvoid main() {\r\n\tuv0 = texcoord2d0;\r\n\tworldPosition = model * vec4(position, 1.0);\r\n\tworldNormal = normalize(mat3(model) * normal);\r\n\tviewPosition = view * worldPosition;\r\n\tviewNormal = mat3(modelview) * normal;\r\n\tshadowPosition = lightProjection * lightView * worldPosition;\r\n\r\n\tgl_Position = projection * viewPosition;\r\n}\r\n",
        "shaders/default/reflective_masked.frag": "precision highp float;\r\n\r\nuniform mat4 modelview;\r\nuniform mat4 view;\r\nuniform mat4 viewInverse;\r\n\r\nuniform vec4 ambient;\r\nuniform vec4 diffuse;\r\nuniform float specularStrength;\r\nuniform int specularPower;\r\n\r\nuniform vec3 lightDirection;\r\nuniform vec4 lightColor;\r\nuniform float lightIntensity;\r\nuniform float shadowBias;\r\n\r\nuniform sampler2D diffuse0;\r\nuniform sampler2D shadow0;\r\nuniform samplerCube env0;\r\nuniform sampler2D mask;\r\n\r\nuniform float materialBlend;\r\n\r\nuniform int hasFloat;\r\nuniform int useVSM;\r\nuniform int useShadows;\r\nuniform int receiveShadows;\r\nuniform int useLighting;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nfloat unpack(vec4 c) {\r\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\r\n\treturn dot(c, bitShifts);\r\n}\r\n\r\nvec4 reflection() {\r\n\tvec3 eyeDirection = normalize(-viewPosition.xyz);\r\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\r\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\r\n\tvec4 color = textureCube(env0, lookup);\r\n\treturn color;\r\n}\r\n\r\n/** Computes color and directional lighting */\r\nvec4 lighting(float shadow) {\r\n\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\tvec3 N = normalize(viewNormal);\r\n\tvec3 L = normalize(mat3(view)*lightDirection);\r\n\tvec3 V = normalize(-viewPosition.xyz);\r\n\tvec3 H = normalize(L + V);\r\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\r\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\r\n\tspecularLight = pow(specularLight, float(specularPower));\r\n\r\n\tvec4 ambientColor = ambient * textureColor;\r\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\r\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\r\n\tvec4 color = ambientColor + (diffuseColor + specularColor) * shadow;\r\n\treturn color;\r\n}\r\n\r\nfloat linstep(float low, float high, float v) {\r\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\r\n}\r\n\r\nfloat VSM(vec2 moments, float compare) {\r\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\r\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\r\n\tfloat d = compare - moments.x;\r\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\r\n\treturn clamp(max(p, p_max), 0.0, 1.0);\r\n}\r\n\r\nfloat shadowmap() {\r\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\r\n\tuv = uv * 0.5 + 0.5;\r\n\tvec4 shadowTexel = texture2D(shadow0, uv);\r\n\r\n\tfloat depth;\r\n\tif (hasFloat == 1)\r\n\t\tdepth = shadowTexel.r;\r\n\telse\r\n\t\tdepth = unpack(shadowTexel);\r\n\r\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\r\n\r\n\tif (useVSM == 1)\r\n\t\treturn VSM(shadowTexel.xy, lightDepth);\r\n\r\n\treturn step(lightDepth - shadowBias, depth);\r\n}\r\n\r\nvoid main(void) {\r\n\tfloat shadow = 1.0;\r\n\tif (useShadows > 0 && receiveShadows > 0) {\r\n\t\tshadow = shadowmap();\r\n\t}\r\n\r\n\tfloat maskValue = texture2D(mask, uv0).r;\r\n\tvec4 color = reflection();\r\n\r\n\tif (useLighting == 1) {\r\n\t\tcolor = mix(color, lighting(shadow), maskValue * materialBlend);\r\n\t}\r\n\telse {\r\n\t\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\t\tcolor = mix(color, diffuse * textureColor, maskValue * materialBlend);\r\n\t}\r\n\tgl_FragColor = clamp(color, 0.0, 1.0);\r\n}\r\n",
        "shaders/default/reflective_masked.vert": "// Diffuse shader\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 texcoord2d0;\r\n\r\nuniform mat4 model;\r\nuniform mat4 view;\r\nuniform mat4 modelview;\r\nuniform mat4 projection;\r\nuniform mat4 lightProjection;\r\nuniform mat4 lightView;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvoid main() {\r\n\tuv0 = texcoord2d0;\r\n\tworldPosition = model * vec4(position, 1.0);\r\n\tworldNormal = normalize(mat3(model) * normal);\r\n\tviewPosition = view * worldPosition;\r\n\tviewNormal = mat3(modelview) * normal;\r\n\tshadowPosition = lightProjection * lightView * worldPosition;\r\n\r\n\tgl_Position = projection * viewPosition;\r\n}\r\n",
        "shaders/default/ScreenQuad.frag": "// Shader for rendering a screen aligned quad for image space effects\n\nprecision highp float;\n\nvarying vec2 uv;\nuniform sampler2D tex0;\n\nvoid main () {\n\tgl_FragColor = texture2D(tex0, uv);\n}\n",
        "shaders/default/ScreenQuad.vert": "// Shader for rendering a screen aligned quad for image space effects\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/shadow_blur.frag": "/**\n * Shadow blur\n */\n\nprecision highp float;\n\nuniform sampler2D src;\n\nvarying vec2 uv;\nvarying highp vec2 blurCoords[14];\n\nvoid main () {\n\tlowp vec4 sum = vec4(0.0);\n\tsum += texture2D(src, blurCoords[ 0])*0.0044299121055113265;\n\tsum += texture2D(src, blurCoords[ 1])*0.00895781211794;\n\tsum += texture2D(src, blurCoords[ 2])*0.0215963866053;\n\tsum += texture2D(src, blurCoords[ 3])*0.0443683338718;\n\tsum += texture2D(src, blurCoords[ 4])*0.0776744219933;\n\tsum += texture2D(src, blurCoords[ 5])*0.115876621105;\n\tsum += texture2D(src, blurCoords[ 6])*0.147308056121;\n\tsum += texture2D(src, uv            )*0.159576912161;\n\tsum += texture2D(src, blurCoords[ 7])*0.147308056121;\n\tsum += texture2D(src, blurCoords[ 8])*0.115876621105;\n\tsum += texture2D(src, blurCoords[ 9])*0.0776744219933;\n\tsum += texture2D(src, blurCoords[10])*0.0443683338718;\n\tsum += texture2D(src, blurCoords[11])*0.0215963866053;\n\tsum += texture2D(src, blurCoords[12])*0.00895781211794;\n\tsum += texture2D(src, blurCoords[13])*0.0044299121055113265;\n\tgl_FragColor = sum;\n}\n",
        "shaders/default/shadow_blurh.vert": "/**\n * Shadow blur - horizontal\n */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nuniform sampler2D src;\n\nvarying vec2 uv;\nvarying vec2 blurCoords[14];\n\nvoid main() {\n\tfloat blurSize = 0.2;\n\tblurCoords[ 0] = uv0 + vec2(-0.028, 0.0) * blurSize;\n\tblurCoords[ 1] = uv0 + vec2(-0.024, 0.0) * blurSize;\n\tblurCoords[ 2] = uv0 + vec2(-0.020, 0.0) * blurSize;\n\tblurCoords[ 3] = uv0 + vec2(-0.016, 0.0) * blurSize;\n\tblurCoords[ 4] = uv0 + vec2(-0.012, 0.0) * blurSize;\n\tblurCoords[ 5] = uv0 + vec2(-0.008, 0.0) * blurSize;\n\tblurCoords[ 6] = uv0 + vec2(-0.004, 0.0) * blurSize;\n\tblurCoords[ 7] = uv0 + vec2( 0.004, 0.0) * blurSize;\n\tblurCoords[ 8] = uv0 + vec2( 0.008, 0.0) * blurSize;\n\tblurCoords[ 9] = uv0 + vec2( 0.012, 0.0) * blurSize;\n\tblurCoords[10] = uv0 + vec2( 0.016, 0.0) * blurSize;\n\tblurCoords[11] = uv0 + vec2( 0.020, 0.0) * blurSize;\n\tblurCoords[12] = uv0 + vec2( 0.024, 0.0) * blurSize;\n\tblurCoords[13] = uv0 + vec2( 0.028, 0.0) * blurSize;\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/shadow_blurv.vert": "/**\n * Shadow blur - vertical\n */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nuniform sampler2D src;\n\nvarying vec2 uv;\nvarying vec2 blurCoords[14];\n\nvoid main() {\n\tfloat blurSize = 0.2;\n\tblurCoords[ 0] = uv0 + vec2(0.0, -0.028) * blurSize;\n\tblurCoords[ 1] = uv0 + vec2(0.0, -0.024) * blurSize;\n\tblurCoords[ 2] = uv0 + vec2(0.0, -0.020) * blurSize;\n\tblurCoords[ 3] = uv0 + vec2(0.0, -0.016) * blurSize;\n\tblurCoords[ 4] = uv0 + vec2(0.0, -0.012) * blurSize;\n\tblurCoords[ 5] = uv0 + vec2(0.0, -0.008) * blurSize;\n\tblurCoords[ 6] = uv0 + vec2(0.0, -0.004) * blurSize;\n\tblurCoords[ 7] = uv0 + vec2(0.0,  0.004) * blurSize;\n\tblurCoords[ 8] = uv0 + vec2(0.0,  0.008) * blurSize;\n\tblurCoords[ 9] = uv0 + vec2(0.0,  0.012) * blurSize;\n\tblurCoords[10] = uv0 + vec2(0.0,  0.016) * blurSize;\n\tblurCoords[11] = uv0 + vec2(0.0,  0.020) * blurSize;\n\tblurCoords[12] = uv0 + vec2(0.0,  0.024) * blurSize;\n\tblurCoords[13] = uv0 + vec2(0.0,  0.028) * blurSize;\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/default/skybox.frag": "precision mediump float;\n\nuniform samplerCube skybox0;\n\nvarying vec3 uv0;\n\nvoid main(void) {\n\tgl_FragColor = textureCube(skybox0, uv0);\n}\n",
        "shaders/default/skybox.vert": "attribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform mat4 lightProjection;\nuniform mat4 lightView;\n\nvarying vec3 uv0;\n\nvoid main(void) {\n\tuv0 = vec3(position.x, -position.yz);\n\tgl_Position = projection * view * model * vec4(position, 1.0);\n}\n",
        "shaders/default/ssao.frag": "precision highp float;\n\nuniform sampler2D position0;\n\nuniform mat4 projection;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform float ssaoGDisplace;\nuniform float ssaoRadius;\nuniform float ssaoDivider;\n\n#define DL 2.399963229728653\n#define EULER 2.718281828459045\n\nfloat unpack(vec4 c) {\n    const vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\n    return dot(c, bitShifts);\n}\n\nfloat getDepth(vec2 coord) {\n    float d = unpack(texture2D(position0, coord.xy));\n    if (d == 0.0)\n        d = 1.0;\n    return d;\n}\n\nfloat doAmbientOcclusion(vec2 coord, vec2 coord2, float d) {\n    float diff = getDepth(coord + coord2) - d;\n    float gDisplace = -0.0002 - (0.00002 * max(min(ssaoGDisplace, 10.0), 0.0));\n    //float gDisplace = -0.00032;\n    return (diff < gDisplace) ? pow(EULER, -2.0 * (diff - gDisplace) * (diff - gDisplace) * 10000.0 / 0.16) : 0.0;\n}\n\nvoid main() {\n    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n    \n    vec2 c = gl_FragCoord.xy * inverseVP;\n    \n    float ao = 0.0;\n\n    float dz = 1.0 / 8.0;\n    float z = 1.0 - dz / 2.0;\n    float l = 0.0;\n\n    float depth = getDepth(c);\n\n    for (int i = 0; i <= 8; i++) {\n        float r = sqrt(1.0 - z);\n\n        vec2 p = vec2(cos(l) * r, sin(l) * r);\n        ao += doAmbientOcclusion(c, p * ssaoRadius * inverseVP.x * (1.0 - depth), depth);\n        z = z - dz;\n        l = l + DL;\n    }\n\n    ao /= 8.0 + max(min(ssaoDivider, 1.0), -1.0);\n    //ao /= 8.5;\n    \n    ao = max(0.0, ao * 2.0 - 1.0);\n    ao = 1.0 - ao;\n    gl_FragColor = vec4(ao, ao, ao, 1.0);\n    //gl_FragColor = vec4(depth, depth, depth, 1.0);\n    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}",
        "shaders/default/ssao.vert": "attribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        "shaders/default/ssaoblur.frag": "precision highp float;\n\nuniform sampler2D ao0;\nuniform sampler2D src;\n\nuniform mat4 projection;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform int ssaoBlurSize;\nuniform int ssaoOnly;\n\nfloat random(vec2 co) {\n    //co = mod(co, 128.0);\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n    \n    const int MAXIMUM_BLUR = 32;\n    float result = 0.0;\n    vec2 hlim = vec2(float(-ssaoBlurSize) * 0.5 + 0.5);\n    for (int i = 0; i < MAXIMUM_BLUR; i++) {\n        if (i >= ssaoBlurSize)\n            break;\n        for (int j = 0; j < MAXIMUM_BLUR; j++) {\n            if (j >= ssaoBlurSize)\n                break;\n            vec2 offset = (hlim + vec2(float(i), float(j))) * inverseVP;\n            result += texture2D(ao0, gl_FragCoord.xy * inverseVP + offset).r;\n        }\n    }\n    result = result / float(ssaoBlurSize * ssaoBlurSize);\n\n    if (ssaoOnly == 1) {\n        gl_FragColor = vec4(vec3(result), 1.0);\n    }\n    else {\n        gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * result, 1.0);\n    }\n    //gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * texture2D(ao0, gl_FragCoord.xy * inverseVP/* / 2.0 + 0.5*/).xyz, 1.0);\n}",
        "shaders/default/ssaoblur.vert": "attribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        "shaders/default/terrain.frag": "// Terrain shader for the forward renderer\r\n\r\nprecision highp float;\r\n\r\nuniform mat4 modelview;\r\nuniform mat4 view;\r\n\r\nuniform vec4 ambient;\r\nuniform vec4 diffuse;\r\nuniform float specularStrength;\r\nuniform int specularPower;\r\n\r\nuniform vec3 lightDirection;\r\nuniform vec4 lightColor;\r\nuniform float lightIntensity;\r\nuniform float shadowBias;\r\n\r\nuniform sampler2D diffuse0;\r\nuniform sampler2D shadow0;\r\n\r\nuniform int hasFloat;\r\nuniform int useVSM;\r\nuniform int useShadows;\r\nuniform int receiveShadows;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvarying vec3 bc;\r\n\r\nfloat unpack(vec4 c) {\r\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\r\n\treturn dot(c, bitShifts);\r\n}\r\n\r\n/** Computes color and directional lighting */\r\nvec4 lighting(float shadow) {\r\n\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\tvec3 N = normalize(viewNormal);\r\n\tvec3 L = normalize(mat3(view)*lightDirection);\r\n\tvec3 V = normalize(-viewPosition.xyz);\r\n\tvec3 H = normalize(L + V);\r\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\r\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\r\n\tspecularLight = pow(specularLight, float(specularPower));\r\n\r\n\tvec4 ambientColor = ambient * textureColor;\r\n\tvec4 diffuseColor = diffuse * diffuse * textureColor * lightColor * diffuseLight;\r\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\r\n\r\n\treturn ambientColor + (diffuseColor + specularColor) * shadow;\r\n}\r\n\r\nfloat linstep(float low, float high, float v) {\r\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\r\n}\r\n\r\nfloat VSM(vec2 moments, float compare) {\r\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\r\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\r\n\tfloat d = compare - moments.x;\r\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\r\n\treturn clamp(max(p, p_max), 0.0, 1.0);\r\n}\r\n\r\nfloat shadowmap() {\r\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\r\n\tuv = uv * 0.5 + 0.5;\r\n\tvec4 shadowTexel = texture2D(shadow0, uv);\r\n\r\n\tfloat depth;\r\n\tif (hasFloat == 1)\r\n\t\tdepth = shadowTexel.r;\r\n\telse\r\n\t\tdepth = unpack(shadowTexel);\r\n\r\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\r\n\r\n\tif (useVSM == 1)\r\n\t\treturn VSM(shadowTexel.xy, lightDepth);\r\n\r\n\treturn step(lightDepth - shadowBias, depth);\r\n}\r\n\r\nvoid main(void) {\r\n\tfloat shadow = 1.0;\r\n\tif (useShadows > 0 && receiveShadows > 0) {\r\n\t\tshadow = shadowmap();\r\n\t}\r\n\tvec4 color = lighting(shadow);\r\n\tgl_FragColor = clamp(color, 0.0, 1.0);\r\n\r\n\t// gl_FragColor = vec4(bc, 1.0); // for debug\r\n}\r\n",
        "shaders/default/terrain.vert": "// Terrain shader for the forward renderer\r\n\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 texcoord2d0;\r\nattribute vec3 barycentric;\r\n\r\nuniform mat4 model;\r\nuniform mat4 view;\r\nuniform mat4 modelview;\r\nuniform mat4 projection;\r\nuniform mat4 lightProjection;\r\nuniform mat4 lightView;\r\n\r\nuniform sampler2D height;\r\n\r\nuniform float verticalScale;\r\nuniform vec2 uvOffset;\r\nuniform vec2 uvScale;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvarying vec3 bc;\r\n\r\nfloat snap(float f, float step) {\r\n\treturn step * floor(f / step);\r\n}\r\n\r\nvoid main() {\r\n\tbc = barycentric;\r\n\tuv0 = texcoord2d0 * uvScale + uvOffset;\r\n\tworldPosition = model * vec4(position, 1.0);\r\n\r\n\t// worldPosition.x = snap(worldPosition.x, worldPosition.y);\r\n\t// worldPosition.z = snap(worldPosition.z, worldPosition.y);\r\n\r\n\tfloat height = texture2D(height, uv0).r;\r\n\tworldPosition.y = height * verticalScale;\r\n\t// worldPosition.y = 0.0;\r\n\r\n\tworldNormal = normalize(mat3(model) * normal);\r\n\tviewPosition = view * worldPosition;\r\n\tviewNormal = mat3(modelview) * normal;\r\n\r\n\tshadowPosition = lightProjection * lightView * worldPosition;\r\n\r\n\tgl_Position = projection * viewPosition;\r\n}\r\n",
        "shaders/default/test.frag": "// Test fragment shader drawing in blue \n\nprecision mediump float; \n\nvoid main(void) { \n\tgl_FragColor = vec4(0.1, 0.5, 0.8, 1.0); \n}",
        "shaders/default/test.vert": "// Test pass-through shader that doesn't transform vertex\nattribute vec3 position; \nattribute vec3 normal; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\n\nvoid main(void) { \n\tfragNormal=mat3(modelview)*normal;\n\tfragPosition=projection*modelview*vec4(position, 1.0);\n\tgl_Position = fragPosition; \n}\n",
        "shaders/default/transparent.frag": "// Unlit transparency shader\nprecision mediump float; \n\nuniform vec4 diffuse;\n\nuniform sampler2D diffuse0;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main(void) {\n\tgl_FragColor = diffuse*texture2D(diffuse0, fragTexcoord2d0);\n}",
        "shaders/default/transparent.vert": "// Unlit transparency shader\nattribute vec3 position; \nattribute vec3 normal; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n\tfragNormal=mat3(modelview)*normal;\n\tfragPosition=modelview*vec4(position, 1.0);\n\tfragTexcoord2d0=texcoord2d0;\n\tgl_Position=projection*fragPosition;\n}\n",
        "shaders/default/wireframe.frag": "// Test fragment shader drawing in blue \nprecision mediump float; \n\nvarying vec3 fragBarycentric;\n\nvoid main(void) { \n\t\tgl_FragColor = vec4(0.0, 0.0, 0.0, \n\t\t\tpow(1.0-fragBarycentric.r, 32.0)+pow(1.0-fragBarycentric.g, 32.0)+pow(1.0-fragBarycentric.b, 32.0));\n}",
        "shaders/default/wireframe.vert": "// Diffuse shader\nattribute vec3 position; \nattribute vec3 barycentric; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragBarycentric;\n\nvoid main(void) { \n\tgl_Position=projection*modelview*vec4(position, 1.0); \n\tfragBarycentric = barycentric;\n}"
    },
    webgl2: {
        "shaders/webgl2/attributes.frag": "#version 300 es\n\n// Attributes shader\nprecision mediump float;\n\nuniform float texCoord2d0Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float texCoord2d1Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float texCoord2d2Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float texCoord2d3Multiplier;\t\t// Texture coordinates output multiplier between 0 and 1\nuniform float positionMultiplier;\t\t\t\t// Position output multiplier between 0 and 1\nuniform float tangentMultiplier;\t\t\t\t// Tangent output multiplier between 0 and 1\nuniform float bitangentMultiplier;\t\t\t// BiTangent output multiplier between 0 and 1\nuniform float normalMultiplier;\t\t\t\t\t// Normal output multiplier between 0 and 1\nuniform float barycentricMultiplier;\t\t// Barycentric output multiplier between 0 and 1\n\nin vec2 fragTexcoord2d0;\nin vec2 fragTexcoord2d1;\nin vec2 fragTexcoord2d2;\nin vec2 fragTexcoord2d3;\nin vec4 fragPosition;\nin vec4 fragTangent;\nin vec4 fragBitangent;\nin vec4 fragNormal;\nin vec3 fragBarycentric;\n\nout vec4 fragColor;\n\nvoid main(void) {\n\tfragColor =\n\t\tvec4(fragTexcoord2d0, 0.0, 1.0) * texCoord2d0Multiplier +\n\t\tvec4(fragTexcoord2d1, 0.0, 1.0) * texCoord2d1Multiplier +\n\t\tvec4(fragTexcoord2d2, 0.0, 1.0) * texCoord2d2Multiplier +\n\t\tvec4(fragTexcoord2d3, 0.0, 1.0) * texCoord2d3Multiplier +\n\t\tvec4(fragPosition.rgb, 1.0) * positionMultiplier +\n\t\tvec4(fragTangent.rgb, 1.0) * tangentMultiplier +\n\t\tvec4(fragBitangent.rgb, 1.0) * bitangentMultiplier +\n\t\tvec4(fragNormal.rgb, 1.0) * normalMultiplier +\n\t\tvec4(fragBarycentric, 1.0) * barycentricMultiplier;\n}\n",
        "shaders/webgl2/attributes.vert": "#version 300 es\n\n// Attributes shader\nin vec3 position;\nin vec3 tangent;\nin vec3 bitangent;\nin vec3 normal;\nin vec3 barycentric;\nin vec2 texcoord2d0;\nin vec2 texcoord2d1;\nin vec2 texcoord2d2;\nin vec2 texcoord2d3;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec2 fragTexcoord2d0;\nout vec2 fragTexcoord2d1;\nout vec2 fragTexcoord2d2;\nout vec2 fragTexcoord2d3;\nout vec4 fragPosition;\nout vec4 fragTangent;\nout vec4 fragBitangent;\nout vec4 fragNormal;\nout vec3 fragBarycentric;\n\nvoid main() {\n\tfragNormal = projection * modelview * vec4(normal, 1.0);\n\tfragPosition = projection * modelview * vec4(position, 1.0);\n\tfragTangent = projection * modelview * vec4(tangent, 1.0);\n\tfragBitangent = projection * modelview * vec4(bitangent, 1.0);\n\tfragTexcoord2d0 = texcoord2d0;\n\tfragTexcoord2d1 = texcoord2d1;\n\tfragTexcoord2d2 = texcoord2d2;\n\tfragTexcoord2d3 = texcoord2d3;\n\tfragBarycentric = barycentric;\n\tgl_Position = fragPosition;\n}\n",
        "shaders/webgl2/debug.frag": "#version 300 es\n\n// Fallback shader\nprecision mediump float;\n\nuniform vec4 color;\n\nout vec4 fragColor;\n\nvoid main(void) {\n\tfragColor = color;\n}\n",
        "shaders/webgl2/debug.vert": "#version 300 es\n\n// Debug shader\nin vec3 position;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec4 fragPosition;\n\nvoid main() {\n\tfragPosition = projection * modelview * vec4(position, 1.0);\n\tgl_Position = fragPosition;\n}\n",
        "shaders/webgl2/DebugPackedDepthTexture.frag": "#version 300 es\n\nprecision highp float;\n\n#define USE_VSM\n\nuniform mat4 modelview;\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nin vec4 viewPosition;\nin vec3 viewNormal;\nin vec2 uv0;\n\nout vec4 fragColor;\n\nfloat unpack(vec4 c) {\n\tconst vec4 bitShifts = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);\n\treturn dot(c, bitShifts);\n}\n\nfloat unpackHalf(vec2 c) {\n\treturn c.x + (c.y / 255.0);\n}\n\nvoid main(void) {\n\tvec4 texel = texture(diffuse0, uv0);\n\n#ifdef USE_VSM\n\tfragColor = vec4(0.0, unpackHalf(texel.xy), unpackHalf(texel.zw), 1.0);\n#else\n\tfloat depth = unpack(texel);\n\tfragColor = vec4(depth, depth, depth, 1.0);\n#endif\n}\n",
        "shaders/webgl2/DebugPackedDepthTexture.vert": "#version 300 es\n\nin vec3 position;\nin vec3 normal;\nin vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec4 viewPosition;\nout vec3 viewNormal;\nout vec2 uv0;\n\nvoid main() {\n\tuv0 = texcoord2d0;\n\tviewPosition = modelview * vec4(position, 1.0);\n\tviewNormal = normalize(mat3(modelview)*normal);\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/webgl2/deferred_background.frag": "#version 300 es\n\nprecision highp float;\n\nuniform vec4 color;\n\nin vec2 uv;\nout vec4 fragColor;\n\nvoid main () {\n\tfragColor = color;\n}\n",
        "shaders/webgl2/deferred_background.vert": "#version 300 es\n\nin vec3 position;\nin vec2 uv0;\n\nout vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/deferred_gbuffer.frag": "#version 300 es\n\nprecision highp float;\n\nuniform mat4 view;\nuniform mat4 viewInverse;\n\nuniform vec4 diffuse;\nuniform float specularStrength;\nuniform int specularPower;\nuniform float lightContribution;\nuniform float reflectivity;\nuniform int useNormalmap;\nuniform int useReflection;\nuniform int receiveShadows;\n\nuniform float materialBlend;\n\nuniform sampler2D diffuse0;\nuniform sampler2D normal0;\nuniform samplerCube env0;\nuniform sampler2D mask;\n\nin float depth;\nin vec2 uv0;\nin vec4 worldPosition;\nin vec3 worldNormal;\nin vec4 viewPosition;\nin vec3 viewNormal;\n\nin mat3 tbn;\n\nlayout(location = 0) out vec4 gbuf_color;\nlayout(location = 1) out vec4 gbuf_normal;\nlayout(location = 2) out vec4 gbuf_position;\nlayout(location = 3) out vec4 gbuf_params;\n\nvec3 reflection() {\n\tvec3 eyeDirection = normalize(-viewPosition.xyz);\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\n\tvec4 color = texture(env0, lookup);\n\treturn color.rgb;\n}\n\nvoid main() {\n\tvec4 textureColor = texture(diffuse0, uv0);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tvec3 N = viewNormal;\n\tif (useNormalmap == 1) {\n\t\tvec4 encodedNormal = texture(normal0, uv0);\n\t\tvec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);\n\t\tN = normalize(tbn * localCoords);\n\t\tN = normalize(mat3(view) * N);\n\t}\n\n\tif (useReflection == 1) {\n\t\tvec3 refl = reflection();\n\t\tfloat maskValue = texture(mask, uv0).r;\n\t\tcolor.rgb = mix(refl, color.rgb, maskValue * materialBlend);\n\t}\n\n\tgbuf_color = vec4(color.rgb, specularStrength);\n\tgbuf_normal = vec4(N, depth);\n\tgbuf_position = vec4(worldPosition.xyz, float(specularPower)/255.0);\n\tgbuf_params = vec4(lightContribution, receiveShadows, reflectivity, 1.0);\n}\n",
        "shaders/webgl2/deferred_gbuffer.vert": "#version 300 es\n\nin vec3 position;\nin vec3 normal;\nin vec2 texcoord2d0;\nin vec3 tangent;\nin vec3 bitangent;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform float zNear;\nuniform float zFar;\n\nout float depth;\nout vec2 uv0;\nout vec4 worldPosition;\nout vec3 worldNormal;\nout vec4 viewPosition;\nout vec3 viewNormal;\n\nout mat3 tbn;\n\nvoid main() {\n\tuv0 = texcoord2d0;\n\tworldPosition = model * vec4(position, 1.0);\n\tworldNormal = normalize(mat3(model) * normal);\n\tviewPosition = view * worldPosition;\n\tviewNormal = mat3(modelview) * normal;\n\tdepth = (-viewPosition.z - zNear) / (zFar - zNear);\n\n\ttbn[0] = normalize(vec3(model * vec4(tangent, 0.0)));\n\ttbn[1] = normalize(vec3(model * vec4(bitangent, 0.0)));\n\ttbn[2] = worldNormal;\n\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/webgl2/deferred_light_ambient.frag": "#version 300 es\n\nprecision highp float;\n\nuniform sampler2D gb0;\nuniform sampler2D gb1;\nuniform sampler2D gb2;\nuniform sampler2D gb3;\nuniform sampler2D shadow0;\n\nuniform vec4 lightColor;\n\nin vec2 uv;\nout vec4 fragColor;\n\nvoid main () {\n\tvec4 data0 = texture(gb0, uv);\n\tvec3 color = data0.rgb * lightColor.rgb;\n\tfragColor = vec4(color, 1.0);\n}\n",
        "shaders/webgl2/deferred_light_ambient.vert": "#version 300 es\n\nin vec3 position;\nin vec2 texcoord2d0;\n\nout vec2 uv;\n\nvoid main() {\n\tuv = texcoord2d0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/deferred_light_directional.frag": "#version 300 es\n\nprecision highp float;\n\nuniform sampler2D gb0;\nuniform sampler2D gb1;\nuniform sampler2D gb2;\nuniform sampler2D gb3;\nuniform sampler2D shadow0;\n\nuniform vec3 cameraPosition;\nuniform vec3 lightDirection;\nuniform vec4 lightColor;\nuniform float lightIntensity;\n\nuniform mat4 view;\nuniform mat4 lightView;\nuniform mat4 lightProjection;\nuniform float shadowBias;\n\nuniform int useShadows;\nuniform int useSoftShadows;\nuniform int shadowOnly;\n\nin vec2 uv;\nout vec4 fragColor;\n\nfloat linstep(float low, float high, float v) {\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\n}\n\nfloat VSM(vec2 moments, float compare) {\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\n\tfloat d = compare - moments.x;\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\n\treturn clamp(max(p, p_max), 0.0, 1.0);\n}\n\nfloat shadowmap(vec4 worldPosition) {\n\tvec4 shadowPosition = lightProjection * lightView * worldPosition;\n\tvec2 shadowUV = shadowPosition.xy / shadowPosition.w;\n\tshadowUV = shadowUV * 0.5 + 0.5;\n\tvec4 shadowTexel = texture(shadow0, shadowUV);\n\n\treturn VSM(shadowTexel.xy, shadowPosition.z);\n\t// return step(shadowPosition.z - shadowBias, shadowTexel.r);\n}\n\nvoid main () {\n\tvec4 data2 = texture(gb2, uv); // position, specularPower/255\n\tvec4 data3 = texture(gb3, uv); // material parameters: (lightContribution, receiveShadows, reflectivity, unused)\n\tvec4 P = vec4(data2.xyz, 1.0);\n\n\tfloat shadow = 1.0;\n\n\tif (useShadows == 1 && data3.g > 0.0) {\n\t\tif (useSoftShadows == 1)\n\t\t\tshadow = texture(shadow0, uv).r;\n\t\telse\n\t\t\tshadow = shadowmap(P);\n\t}\n\n\tif (shadowOnly == 1) {\n\t\tfragColor = vec4(shadow, shadow, shadow, 1.0);\n\t\treturn;\n\t}\n\n\tvec4 data0 = texture(gb0, uv); // color, specularIntensity\n\n\tvec4 data1 = texture(gb1, uv); // normal, depth\n\n\tvec3 C = data0.xyz;\n\tvec3 N = data1.xyz;\n\tfloat specularIntensity = data0.w;\n\tfloat specularPower = 255.0*data2.w;\n\n\tvec4 viewPosition = view * P;\n\tvec3 L = normalize(mat3(view) * lightDirection);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0);\n\tfloat specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));\n\tvec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;\n\tvec3 specularColor = lightColor.rgb * specularLight * specularIntensity;\n\n\tvec3 lighting = diffuseColor + specularColor;\n\n\tvec3 final = shadow * mix(C, lighting, data3.r);\n\n\tfragColor = vec4(final, 1.0);\n}\n",
        "shaders/webgl2/deferred_light_directional.vert": "#version 300 es\n\nin vec3 position;\nin vec2 texcoord2d0;\n\nout vec2 uv;\n\nvoid main() {\n\tuv = texcoord2d0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/deferred_light_omni.frag": "#version 300 es\n\nprecision highp float;\n\nuniform sampler2D gb0;\nuniform sampler2D gb1;\nuniform sampler2D gb2;\nuniform sampler2D gb3;\n\nuniform vec4 lightColor;\nuniform vec3 lightPosition;\nuniform float lightIntensity;\nuniform float lightRadius;\n\nuniform mat4 view;\nuniform vec3 cameraPosition;\n\nin vec4 screenPosition;\nout vec4 fragColor;\n\nvoid main() {\n\tvec2 uv = screenPosition.xy;\n\tuv /= screenPosition.w;\n\tuv = 0.5 * (vec2(uv.x, uv.y) + 1.0);\n\n\tvec4 data0 = texture(gb0, uv); // color.rgb, specularIntensity\n\tvec4 data1 = texture(gb1, uv); // normal.xyz, depth\n\tvec4 data2 = texture(gb2, uv); // position.xyz, specularPower/255\n\t// vec4 data3 = texture(gb3, uv); // unused\n\n\tvec3 C = data0.xyz;\n\tvec3 N = data1.xyz;\n\tvec3 P = data2.xyz;\n\tfloat specularIntensity = data0.w;\n\tfloat specularPower = 255.0*data2.w;\n\n\tvec3 lightVector = lightPosition - P;\n\tfloat attenuation = clamp(1.0 - length(lightVector)/lightRadius, 0.0, 1.0);\n\tlightVector = normalize(lightVector);\n\n\tvec4 viewPosition = view * vec4(P, 1.0);\n\tvec3 L = normalize(mat3(view) * lightVector);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0);\n\tfloat specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));\n\tvec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;\n\tvec3 specularColor = lightColor.rgb * specularLight * specularIntensity;\n\n\tvec3 final = attenuation * (diffuseColor + specularColor);\n\n\tfragColor = vec4(final, 1.0);\n}\n",
        "shaders/webgl2/deferred_light_omni.vert": "#version 300 es\n\nin vec3 position;\nin vec3 normal;\nin vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec4 screenPosition;\n\nvoid main() {\n\tscreenPosition = projection * view * model * vec4(position, 1.0);\n\tgl_Position = screenPosition;\n}\n",
        "shaders/webgl2/deferred_shadow_directional.frag": "#version 300 es\n/** Directional light shadow-map */\nprecision highp float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nin float depth;\nin vec2 uv;\n\nout vec4 fragColor;\n\nvoid main() {\n\tvec4 textureColor = texture(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfloat dx = dFdx(depth);\n\tfloat dy = dFdy(depth);\n\tfragColor = vec4(depth, pow(depth, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0);\n}\n",
        "shaders/webgl2/deferred_shadow_directional.vert": "#version 300 es\n/** Directional light shadow-map */\nin vec3 position;\nin vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout float depth;\nout vec2 uv;\n\nvoid main() {\n\tvec4 viewPosition = modelview * vec4(position, 1.0);\n\tvec4 clipPosition = projection * viewPosition;\n\tdepth = clipPosition.z;\n\tuv = texcoord2d0;\n\tgl_Position = clipPosition;\n}\n",
        "shaders/webgl2/depth.frag": "#version 300 es\n\n// Shader for rendering linear depth values into a floating point texture\nprecision mediump float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nin float depth;\nin vec2 uv;\nout vec4 fragColor;\n\nvoid main() {\n\tvec4 textureColor = texture(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfragColor = vec4(depth, depth, depth, depth);\n}\n",
        "shaders/webgl2/depth.vert": "#version 300 es\n\n// Shader for rendering linear depth values into a floating point texture\nin vec3 position;\nin vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform float zNear;\nuniform float zFar;\n\nout float depth;\nout vec2 uv;\n\nvoid main() {\n\tvec4 viewPosition = modelview * vec4(position, 1.0);\n\tdepth = (-viewPosition.z - zNear) / (zFar - zNear);\n\tuv = texcoord2d0;\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/webgl2/DepthRGBA.frag": "#version 300 es\n\n// Shader for rendering linear depth values into RGBA texture\nprecision highp float;\n\nuniform mat4 modelview;\n// uniform float linearDepthConstant;\n\n/** Packing Type:\n\t1 - packs depth value into RGBA\n\t2 - packs depth into RG and depth*depth into BA\n**/\nuniform int packingType;\n\nin vec4 viewPosition;\nout vec4 fragColor;\n\nvec4 pack(float depth) {\n\tconst vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);\n\tconst vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\n\tvec4 comp = fract(depth * bitShift);\n\tcomp -= comp.xxyz * bitMask;\n\treturn comp;\n}\n\nvec2 packHalf(float depth) {\n\tconst vec2 bias = vec2(1.0 / 255.0, 0.0);\n\tvec2 c = vec2(depth, fract(depth * 255.0));\n\treturn c - (c.yy * bias);\n}\n\nvoid main () {\n\tif (packingType==2) {\n\t\tfragColor = vec4(packHalf(gl_FragCoord.z), packHalf(gl_FragCoord.z*gl_FragCoord.z));\n\t}\n\telse {\n\t\tfragColor = pack(gl_FragCoord.z); // less precision, but works on most systems\n\t\t// float linearDepth = length(viewPosition) * linearDepthConstant;\n\t\t// fragColor = pack(linearDepth);\n\t}\n}\n",
        "shaders/webgl2/DepthRGBA.vert": "#version 300 es\n\n// Shader for rendering linear depth values into RGBA texture\nin vec3 position;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec4 viewPosition;\n\nvoid main() {\n\tviewPosition = modelview * vec4(position, 1.0);\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/webgl2/diffuse.frag": "#version 300 es\n\nprecision highp float;\n\nuniform mat4 modelview;\nuniform mat4 view;\n\nuniform vec4 ambient;\nuniform vec4 diffuse;\nuniform float specularStrength;\nuniform int specularPower;\n\nuniform vec3 lightDirection;\nuniform vec4 lightColor;\nuniform float lightIntensity;\nuniform float shadowBias;\n\nuniform sampler2D diffuse0;\nuniform sampler2D shadow0;\n\nuniform int hasFloat;\nuniform int useVSM;\nuniform int useShadows;\nuniform int receiveShadows;\n\nin vec2 uv0;\nin vec4 worldPosition;\nin vec3 worldNormal;\nin vec4 viewPosition;\nin vec3 viewNormal;\nin vec4 shadowPosition;\nout vec4 fragColor;\n\nfloat unpack(vec4 c) {\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\n\treturn dot(c, bitShifts);\n}\n\n/** Computes color and directional lighting */\nvec4 lighting(float shadow) {\n\tvec4 textureColor = texture(diffuse0, uv0);\n\tvec3 N = normalize(viewNormal);\n\tvec3 L = normalize(mat3(view)*lightDirection);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\n\tspecularLight = pow(specularLight, float(specularPower));\n\n\tvec4 ambientColor = ambient * textureColor;\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\n\n\treturn ambientColor + (diffuseColor + specularColor) * shadow;\n}\n\nfloat linstep(float low, float high, float v) {\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\n}\n\nfloat VSM(vec2 moments, float compare) {\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\n\tfloat d = compare - moments.x;\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\n\treturn clamp(max(p, p_max), 0.0, 1.0);\n}\n\nfloat shadowmap() {\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\n\tuv = uv * 0.5 + 0.5;\n\tvec4 shadowTexel = texture(shadow0, uv);\n\n\tfloat depth;\n\tif (hasFloat == 1)\n\t\tdepth = shadowTexel.r;\n\telse\n\t\tdepth = unpack(shadowTexel);\n\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\n\n\tif (useVSM == 1)\n\t\treturn VSM(shadowTexel.xy, lightDepth);\n\n\treturn step(lightDepth - shadowBias, depth);\n}\n\nvoid main(void) {\n\tfloat shadow = 1.0;\n\tif (useShadows > 0 && receiveShadows > 0) {\n\t\tshadow = shadowmap();\n\t}\n\n\tvec4 color = lighting(shadow);\n\tfragColor = clamp(color, 0.0, 1.0);\n}\n",
        "shaders/webgl2/diffuse.vert": "#version 300 es\n\nin vec3 position;\nin vec3 normal;\nin vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform mat4 lightProjection;\nuniform mat4 lightView;\n\nout vec2 uv0;\nout vec4 worldPosition;\nout vec3 worldNormal;\nout vec4 viewPosition;\nout vec3 viewNormal;\nout vec4 shadowPosition;\n\nvoid main() {\n\tuv0 = texcoord2d0;\n\tworldPosition = model * vec4(position, 1.0);\n\tworldNormal = normalize(mat3(model) * normal);\n\tviewPosition = view * worldPosition;\n\tviewNormal = mat3(modelview) * normal;\n\n\tshadowPosition = lightProjection * lightView * worldPosition;\n\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/webgl2/fallback.frag": "// Fallback shader\nprecision mediump float; \n\nvoid main(void) { \n\tgl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}",
        "shaders/webgl2/fallback.vert": "// Fallback shader\nattribute vec3 position; \nattribute vec3 normal; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n  fragNormal=modelview*vec4(normal, 1.0);\n\tfragPosition=projection*modelview*vec4(position, 1.0); \n  fragTexcoord2d0=texcoord2d0;\n\tgl_Position=fragPosition;\n}\n",
        "shaders/webgl2/font.frag": "// Diffuse shader\nprecision mediump float; \n\nuniform vec4 ambient;\nuniform vec4 diffuse;\nuniform int page;\t\t\t\t\t\t// The font page texture\n\nuniform sampler2D page0;\t\t\nuniform sampler2D page1;\nuniform sampler2D page2;\nuniform sampler2D page3;\nuniform sampler2D page4;\nuniform sampler2D page5;\nuniform sampler2D page6;\nuniform sampler2D page7;\n\nvarying vec2 fragTexcoord2d0;\n\nvoid main(void) {\n\tvec4 c;\n\tif(page==0) c = texture2D(page0, fragTexcoord2d0);\n\tif(page==1) c = texture2D(page1, fragTexcoord2d0);\n\tif(page==2) c = texture2D(page2, fragTexcoord2d0);\n\tif(page==3) c = texture2D(page3, fragTexcoord2d0);\n\tif(page==4) c = texture2D(page4, fragTexcoord2d0);\n\tif(page==5) c = texture2D(page5, fragTexcoord2d0);\n\tif(page==6) c = texture2D(page6, fragTexcoord2d0);\n\tif(page==7) c = texture2D(page7, fragTexcoord2d0);\n\tgl_FragColor=vec4(diffuse.r*c.r, diffuse.g*c.g, diffuse.b*c.b, c.a);\n}",
        "shaders/webgl2/font.vert": "// Font shader\nattribute vec3 position; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n\tfragPosition=projection*modelview*vec4(position, 1.0); \n\tfragTexcoord2d0=texcoord2d0;\n\tgl_Position=fragPosition;\n}\n",
        "shaders/webgl2/forward_shadow.frag": "#version 300 es\n\n/** Directional light shadow-map */\nprecision highp float;\n\nuniform int hasFloat;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nin float depth;\nin vec2 uv;\nout vec4 fragColor;\n\nvec4 pack(float depth) {\n\tconst vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);\n\tconst vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\n\tvec4 comp = fract(depth * bitShift);\n\tcomp -= comp.xxyz * bitMask;\n\treturn comp;\n}\n\nvoid main() {\n\tvec4 textureColor = texture(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfloat d = (depth + 1.0) * 0.5;\n\n\tif (hasFloat == 1) {\n\t\tfragColor = vec4(d, d, d, 1.0);\n\t}\n\telse {\n\t\tfragColor = pack(d);\n\t}\n\n}\n",
        "shaders/webgl2/forward_shadow.vert": "#version 300 es\n\n/** Directional light shadow-map */\nin vec3 position;\nin vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout float depth;\nout vec2 uv;\n\nvoid main() {\n\tvec4 viewPosition = modelview * vec4(position, 1.0);\n\tvec4 clipPosition = projection * viewPosition;\n\tdepth = clipPosition.z;\n\tuv = texcoord2d0;\n\tgl_Position = clipPosition;\n}\n",
        "shaders/webgl2/forward_shadow_vsm.frag": "#version 300 es\n\n/** Directional light shadow-map */\nprecision highp float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nin float depth;\nin vec2 uv;\nout vec4 fragColor;\n\nvoid main() {\n\tvec4 textureColor = texture(diffuse0, uv);\n\tvec4 color = diffuse * textureColor;\n\tif (color.a < 0.99)\n\t\tdiscard;\n\n\tfloat d = (depth + 1.0) * 0.5;\n\tfloat dx = dFdx(d);\n\tfloat dy = dFdy(d);\n\n\tfragColor = vec4(d, pow(d, 2.0) + 0.25*(dx * dx + dy * dy), 0.0, 1.0);\n}\n",
        "shaders/webgl2/GaussianBlur.frag": "// Shader for rendering gaussian blurred image (horizontal)\nprecision highp float;\n\n#define MAX_BLUR_KERNEL_SIZE 10\n\nuniform float screenWidth;\nuniform float screenHeight;\nuniform int orientation; // 0 - horizontal, 1 - vertical\nuniform int kernelSize; // Recommended values: 3, 5, 7, 10 (10 is currently the maximum)\nuniform sampler2D tex0;\n\nvarying vec2 uv0;\n\nvoid main () {\n\tfloat halfSize = float(kernelSize)*0.5;\n\tvec2 texelSize = vec2(1.0/screenWidth, 1.0/screenHeight);\n\tvec4 color = vec4(0.0);\n\n\tif (orientation==1) {\n\t\t// vertical pass\n\t\tfor (int i=0; i<MAX_BLUR_KERNEL_SIZE; ++i) {\n\t\t\tif (i>=kernelSize)\n\t\t\t\tbreak;\n\t\t\tfloat offset = float(i)-halfSize;\n\t\t\tcolor += texture2D(tex0, uv0 + vec2(0.0, offset * texelSize.y));\n\t\t}\n\t}\n\telse {\n\t\t// horizontal pass\n\t\tfor (int i=0; i<MAX_BLUR_KERNEL_SIZE; ++i) {\n\t\t\tif (i>=kernelSize)\n\t\t\t\tbreak;\n\t\t\tfloat offset = float(i)-halfSize;\n\t\t\tcolor += texture2D(tex0, uv0 + vec2(offset * texelSize.x, 0.0));\n\t\t}\n\t}\n\tgl_FragColor = color / float(kernelSize);\n\t// gl_FragColor = texture2D(tex0, uv0);\n}\n",
        "shaders/webgl2/GaussianBlur.vert": "// Shader for rendering gaussian blurred image (horizontal)\nattribute vec3 position;\nattribute vec2 texcoord2d0;\n\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform float screenWidth;\nuniform float screenHeight;\n\nvarying vec2 uv0;\n\nvoid main() {\n\tuv0 = texcoord2d0;\n\t\n\t// Resizes the rendered unit-quad to screen size\n\tvec4 viewPosition=modelview*vec4(position.x*screenWidth, position.y*screenHeight, position.z, 1.0);\n\tgl_Position=projection*viewPosition;\n}\n",
        "shaders/webgl2/lines.frag": "#version 300 es\n\nprecision mediump float;\n\nin vec4 fragColor;\nin vec4 fragPosition;\n\nout vec4 outColor;\n\nvoid main(void) {\n\toutColor = fragColor;\n}",
        "shaders/webgl2/lines.vert": "#version 300 es\n\nin vec3 position;\nin vec3 pointA;\nin vec3 pointB;\nin float width;\nin vec4 color;\n\nuniform vec2 viewport;\n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec4 fragColor;\nout vec4 fragPosition;\n\nvoid main() {\n\tvec4 pA = projection * modelview * vec4(pointA, 1.0);\n\tvec4 pB = projection * modelview * vec4(pointB, 1.0);\n\n\tvec2 screenA = viewport * (0.5 * pA.xy / pA.w + 0.5);\n\tvec2 screenB = viewport * (0.5 * pB.xy / pB.w + 0.5);\n\n\tvec2 xBasis = normalize(screenB - screenA);\n\tvec2 yBasis = vec2(-xBasis.y, xBasis.x);\n\n\tvec2 offsetA = screenA.xy + width * (position.x * xBasis + position.y * yBasis);\n\tvec2 offsetB = screenB.xy + width * (position.x * xBasis + position.y * yBasis);\n\n\tvec2 pt = mix(offsetA, offsetB, position.z);\n\tvec4 clip = mix(pA, pB, position.z);\n\n\tfragColor = color;\n\tfragPosition=modelview*vec4(position, 1.0);\n\tgl_Position=vec4(clip.w * ((2.0 * pt) / viewport - 1.0), clip.z, clip.w);\n}\n",
        "shaders/webgl2/normalmapped.frag": "// Normal mapped diffuse shader\nprecision highp float;\n\nuniform mat4 modelview;\nuniform mat4 view;\n\nuniform vec4 ambient;\nuniform vec4 diffuse;\nuniform float specularStrength;\nuniform int specularPower;\n\nuniform vec3 lightDirection;\nuniform vec4 lightColor;\nuniform float lightIntensity;\nuniform float shadowBias;\n\nuniform sampler2D diffuse0;\nuniform sampler2D normal0;\nuniform sampler2D shadow0;\n\nuniform int hasFloat;\nuniform int useVSM;\nuniform int useShadows;\nuniform int receiveShadows;\n\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec4 shadowPosition;\n\nvarying mat3 tbn;\n\nfloat unpack(vec4 c) {\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\n\treturn dot(c, bitShifts);\n}\n\n/** Computes color and directional lighting */\nvec4 lighting(float shadow) {\n\tvec4 encodedNormal = texture2D(normal0, uv0);\n\t// vec3 localCoords = 2.0 * encodedNormal.rgb - vec3(1.0);\n\tvec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);\n\tvec3 normalDirection = normalize(tbn * localCoords);\n\tvec3 N = normalize(mat3(view) * normalDirection);\n\n\tvec4 textureColor = texture2D(diffuse0, uv0);\n\tvec3 L = normalize(mat3(view)*lightDirection);\n\tvec3 V = normalize(-viewPosition.xyz);\n\tvec3 H = normalize(L + V);\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\n\tspecularLight = pow(specularLight, float(specularPower));\n\n\tvec4 ambientColor = ambient * textureColor;\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\n\n\treturn ambientColor + (diffuseColor + specularColor) * shadow;\n}\n\nfloat linstep(float low, float high, float v) {\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\n}\n\nfloat VSM(vec2 moments, float compare) {\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\n\tfloat d = compare - moments.x;\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\n\treturn clamp(max(p, p_max), 0.0, 1.0);\n}\n\nfloat shadowmap() {\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\n\tuv = uv * 0.5 + 0.5;\n\tvec4 shadowTexel = texture2D(shadow0, uv);\n\n\tfloat depth;\n\tif (hasFloat == 1)\n\t\tdepth = shadowTexel.r;\n\telse\n\t\tdepth = unpack(shadowTexel);\n\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\n\n\tif (useVSM == 1)\n\t\treturn VSM(shadowTexel.xy, lightDepth);\n\n\treturn step(lightDepth - shadowBias, depth);\n}\n\nvoid main(void) {\n\tfloat shadow = 1.0;\n\tif (useShadows > 0 && receiveShadows > 0) {\n\t\tshadow = shadowmap();\n\t}\n\n\tvec4 color = lighting(shadow);\n\tgl_FragColor = clamp(color, 0.0, 1.0);\n}\n",
        "shaders/webgl2/normalmapped.vert": "// Normal mapped diffuse shader\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texcoord2d0;\nattribute vec3 tangent;\nattribute vec3 bitangent;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform mat4 lightProjection;\nuniform mat4 lightView;\nuniform vec3 lightDirection;\n\nvarying vec2 uv0;\nvarying vec4 worldPosition;\nvarying vec3 worldNormal;\nvarying vec4 viewPosition;\nvarying vec3 viewNormal;\nvarying vec4 shadowPosition;\n\nvarying mat3 tbn;\n\nhighp mat3 transpose(in highp mat3 m) {\n\thighp vec3 i0 = m[0];\n\thighp vec3 i1 = m[1];\n\thighp vec3 i2 = m[2];\n\thighp mat3 outMatrix = mat3(\n\t\tvec3(i0.x, i1.x, i2.x),\n\t\tvec3(i0.y, i1.y, i2.y),\n\t\tvec3(i0.z, i1.z, i2.z)\n\t);\n\treturn outMatrix;\n}\n\nvoid main() {\n\tuv0 = texcoord2d0; // TODO: In the future this will probably need to use texture offset and scale uniforms\n\tworldPosition = model * vec4(position, 1.0);\n\tworldNormal = normalize(mat3(model) * normal);\n\tviewPosition = view * worldPosition;\n\tviewNormal = normalize(mat3(modelview) * normal);\n\n\tshadowPosition = lightProjection * lightView * worldPosition;\n\n\ttbn[0] = normalize(vec3(model * vec4(tangent, 0.0)));\n\ttbn[1] = normalize(vec3(model * vec4(bitangent, 0.0)));\n\ttbn[2] = worldNormal;\n\n\tgl_Position = projection * viewPosition;\n}\n",
        "shaders/webgl2/OITAccum.frag": "#version 300 es\n\n/**\n * Based on the following ideas:\n *\n *   - Weighted Blended Order-Independent Transparency\n *     http://jcgt.org/published/0002/02/09/\n *\n *   - Stochastic Transparency\n *     http://www.nvidia.com/object/nvidia_research_pub_016.html\n *\n *   - Simplex noise (C) Ashima Arts\n *     https://github.com/ashima/webgl-noise\n */\n\nprecision highp float;\n\nuniform vec4 diffuse;\nuniform sampler2D diffuse0;\n\nuniform int render_mode;\n\nuniform mat4 viewInverse;\nuniform float zNear;\nuniform float zFar;\nuniform int useReflection;\nuniform float reflectivity;\n\nuniform samplerCube env0;\n\nin vec3 fragNormal;\nin vec4 fragPosition;\nin vec2 fragTexcoord2d0;\nin vec3 worldNormal;\nout vec4 fragColor;\n\nvec4 mod289(vec4 x) {\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n\treturn mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n\treturn mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n\tconst vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n\tvec4 p,s;\n\tp.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n\tp.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n\ts = vec4(lessThan(p, vec4(0.0)));\n\tp.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\treturn p;\n}\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise(vec4 v) {\n\tconst vec4 C = vec4(\n\t\t0.138196601125011, // (5 - sqrt(5))/20 G4\n\t\t0.276393202250021, // 2 * G4\n\t\t0.414589803375032, // 3 * G4\n\t\t-0.447213595499958); // -1 + 4 * G4\n\n\t// First corner\n\tvec4 i = floor(v + dot(v, vec4(F4)) );\n\tvec4 x0 = v - i + dot(i, C.xxxx);\n\n\t// Other corners\n\t// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n\tvec4 i0;\n\tvec3 isX = step( x0.yzw, x0.xxx );\n\tvec3 isYZ = step( x0.zww, x0.yyz );\n\t// i0.x = dot( isX, vec3( 1.0 ) );\n\ti0.x = isX.x + isX.y + isX.z;\n\ti0.yzw = 1.0 - isX;\n\t// i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n\ti0.y += isYZ.x + isYZ.y;\n\ti0.zw += 1.0 - isYZ.xy;\n\ti0.z += isYZ.z;\n\ti0.w += 1.0 - isYZ.z;\n\n\t// i0 now contains the unique values 0,1,2,3 in each channel\n\tvec4 i3 = clamp( i0, 0.0, 1.0 );\n\tvec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n\tvec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\t// x0 = x0 - 0.0 + 0.0 * C.xxxx\n\t// x1 = x0 - i1 + 1.0 * C.xxxx\n\t// x2 = x0 - i2 + 2.0 * C.xxxx\n\t// x3 = x0 - i3 + 3.0 * C.xxxx\n\t// x4 = x0 - 1.0 + 4.0 * C.xxxx\n\tvec4 x1 = x0 - i1 + C.xxxx;\n\tvec4 x2 = x0 - i2 + C.yyyy;\n\tvec4 x3 = x0 - i3 + C.zzzz;\n\tvec4 x4 = x0 + C.wwww;\n\n\t// Permutations\n\ti = mod289(i);\n\tfloat j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n\tvec4 j1 = permute( permute( permute( permute (\n\ti.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n\t+ i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n\t+ i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n\t+ i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n\t// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n\t// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n\tvec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\tvec4 p0 = grad4(j0, ip);\n\tvec4 p1 = grad4(j1.x, ip);\n\tvec4 p2 = grad4(j1.y, ip);\n\tvec4 p3 = grad4(j1.z, ip);\n\tvec4 p4 = grad4(j1.w, ip);\n\n\t// Normalise gradients\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\tp4 *= taylorInvSqrt(dot(p4,p4));\n\n\t// Mix contributions from the five corners\n\tvec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n\tvec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4) ), 0.0);\n\tm0 = m0 * m0;\n\tm1 = m1 * m1;\n\treturn 49.0 *\n\t\t( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n\t\t+ dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n}\n\nfloat oit_weight(float z, vec4 color) {\n\treturn max(min(1.0, max(max(color.r, color.g), color.b) * color.a), color.a) * clamp(0.03 / (1e-5 + pow(z / 200.0, 4.0)), 1e-2, 3e3);\n}\n\nvec3 reflection() {\n\tvec3 eyeDirection = normalize(-fragPosition.xyz);\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\n\tvec4 color = texture(env0, lookup);\n\treturn color.rgb;\n}\n\nvec4 lighting() {\n\t/* TODO: proper lighting for transparent surfaces */\n\tvec4 textureColor = texture(diffuse0, fragTexcoord2d0);\n\tvec4 color = diffuse * textureColor;\n\treturn color;\n}\n\nvoid main(void) {\n\tvec4 color = lighting();\n\n\tif (useReflection == 1) {\n\t\tvec3 refl = reflection();\n\t\tcolor.rgb = mix(refl, color.rgb, clamp(1.0 - reflectivity, 0.0, 1.0));\n\t}\n\n\t// Weighted Blended Order-Independent Transparency color pass\n\tif (render_mode == 0) {\n\t\tfloat linDepth = 2.0 * zNear * zFar / (zFar + zNear - (2.0 * -fragPosition.z - 1.0) * (zFar - zNear));\n\t\tfloat weight = oit_weight(linDepth, color);\n\t\tfragColor = vec4(color.rgb * color.a, color.a) * weight;\n\t}\n\n\t// Alpha reveal amount pass\n\telse if (render_mode == 1) {\n\t\tfragColor = vec4(color.a); // total amount revealed (blending: 0; 1-src.a)\n\t}\n\n\t// Alpha mapping pass\n\telse if (render_mode == 2) {\n\t\tif (color.a < 0.99)\n\t\t\tdiscard;\n\t\tfragColor = color;\n\t}\n\n\t// Stochastic transparency pass\n\telse if (render_mode == 3) {\n\t\tfloat random = snoise(fragPosition*150.0);\n\t\tif (random > color.a)\n\t\t\tdiscard;\n\t\tfragColor = vec4(color.rgb * color.a, 1.0);\n\t}\n}\n",
        "shaders/webgl2/OITAccum.vert": "#version 300 es\n\n/** Order independent transparency - vertex program */\n\nin vec3 position;\nin vec3 normal;\nin vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 modelview;\nuniform mat4 projection;\n\nout vec3 fragNormal;\nout vec4 fragPosition;\nout vec2 fragTexcoord2d0;\nout vec3 worldNormal;\n\nvoid main() {\n\tfragNormal = mat3(modelview) * normal;\n\tfragPosition = modelview * vec4(position, 1.0);\n\tfragTexcoord2d0 = texcoord2d0;\n\tworldNormal = normalize(mat3(model) * normal);\n\tgl_Position = projection * fragPosition;\n}\n",
        "shaders/webgl2/OITRender.frag": "#version 300 es\n\n/**\n * Weighted Blended Order-Independent Transparency - Compositing program\n * Based on http://jcgt.org/published/0002/02/09/\n */\n\nprecision highp float;\n\nin vec2 uv;\n\nuniform vec2 ViewportSize;\nuniform int render_mode;\n\nuniform sampler2D src;\nuniform sampler2D oitAccum;\nuniform sampler2D oitWeight;\n\nout vec4 fragColor;\n\n\nvoid addRelevantSample(vec2 coords, float weight, inout vec4 accum) {\n\tvec4 texel = texture(oitAccum, coords);\n\tif (texel.a < 1.0)\n\t\treturn;\n\tfloat a = texture(oitWeight, coords).a;\n\tif (a>0.99)\n\t\treturn;\n\taccum += texel * weight * a;\n}\n\nvec4 avgColor(sampler2D s, vec2 coords) {\n\tvec2 step = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n\n\tvec2 kernel[8];\n\tkernel[0] = vec2(-step.x, step.y);\n\tkernel[1] = vec2(0.0, step.y);\n\tkernel[2] = vec2(step.x, step.y);\n\tkernel[3] = vec2(step.x, 0.0);\n\tkernel[4] = vec2(-step.x, 0.0);\n\tkernel[5] = vec2(-step.x, -step.y);\n\tkernel[6] = vec2(0.0, -step.y);\n\tkernel[7] = vec2(step.x, -step.y);\n\n\tvec4 sum = vec4(0.0);\n\tfloat weight = 1.0 / (2.0 + 1.0);\n\tfloat kernelSize = 1.0;\n\n\taddRelevantSample(coords, weight, sum);\n\n\tfor (int i=0; i<8; i++) {\n\t\taddRelevantSample(coords + kernel[i] * kernelSize, weight, sum);\n\t}\n\n\tkernelSize = 2.0;\n\tfor (int i=0; i<8; i++) {\n\t\taddRelevantSample(coords + kernel[i] * kernelSize, weight, sum);\n\t}\n\n\treturn sum;\n}\n\nvoid main(void) {\n\t// Blending: ONE_MINUS_SRC_ALPHA, SRC_ALPHA\n\n\tvec4 solidColor = texture(src, uv);\n\tfloat reveal = texture(oitWeight, uv).a;\n\tvec4 transparentColor;\n\n\t// Blended order transparency\n\tif (render_mode == 0) {\n\t\ttransparentColor = texture(oitAccum, uv);\n\n\t\tvec4 composite = vec4(transparentColor.rgb / max(transparentColor.a, 1e-5), reveal);\n\t\tfragColor = (1.0-composite.a) * composite +  composite.a * solidColor;\n\t}\n\n\t// Stochastic transparency\n\telse if (render_mode == 1) {\n\t\ttransparentColor = avgColor(oitAccum, uv);\n\t\tfragColor = (1.0 - reveal) * transparentColor + reveal * solidColor;\n\t}\n}\n",
        "shaders/webgl2/OITRender.vert": "#version 300 es\n\n/** Order independent transparency - vertex program */\n\nin vec3 position;\nin vec2 uv0;\n\nout vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/positionbuffer.frag": "//Normal buffer\nprecision highp float;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform mat4 modelview;\n\nvarying vec4 worldPosition;\nvarying vec4 viewPosition;\nvarying vec3 worldNormal;\nvarying vec3 viewNormal;\n\nvec4 pack(float depth) {\n\tconst vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);\n\tconst vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\n\tvec4 comp = fract(depth * bitShift);\n\tcomp -= comp.xxyz * bitMask;\n\treturn comp;\n}\n\nvoid main() {\n\tfloat linDepth = (-viewPosition.z - zNear) / (zFar - zNear);\n\tgl_FragColor = pack(linDepth);\n}\n",
        "shaders/webgl2/positionbuffer.vert": "//Normal buffer\nattribute vec3 position;\nattribute vec3 normal;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec4 worldPosition;\nvarying vec4 viewPosition;\nvarying vec3 worldNormal;\nvarying vec3 viewNormal;\n\nvoid main() {\n    worldPosition = model * vec4(position, 1.0);\n    viewPosition = view * worldPosition;\n    worldNormal = normalize(mat3(model)*normal);\n    viewNormal = mat3(modelview) * normal;\n    \n    gl_Position = projection * viewPosition;\n}",
        "shaders/webgl2/postprocess_blur.frag": "#version 300 es\n\n/**\n * Blur post-process\n * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu\n */\n\nprecision highp float;\n\nuniform sampler2D src;\n\nin highp vec2 blurCoords[5];\nout vec4 fragColor;\n\nvoid main () {\n\tlowp vec4 sum = vec4(0.0);\n\tsum += texture(src, blurCoords[0]) * 0.204164;\n\tsum += texture(src, blurCoords[1]) * 0.304005;\n\tsum += texture(src, blurCoords[2]) * 0.304005;\n\tsum += texture(src, blurCoords[3]) * 0.093913;\n\tsum += texture(src, blurCoords[4]) * 0.093913;\n\tfragColor = sum;\n}\n",
        "shaders/webgl2/postprocess_blur.vert": "#version 300 es\n\n/**\n * Blur post-process\n * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu\n */\n\nin vec3 position;\nin vec2 uv0;\n\nuniform vec2 ViewportSize;\nuniform vec2 BlurSize;\n\nout vec2 blurCoords[5];\n\nvoid main() {\n\tvec2 offset = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y) * BlurSize;\n\n\tblurCoords[0] = uv0;\n\tblurCoords[1] = uv0 + offset * 1.407333;\n\tblurCoords[2] = uv0 - offset * 1.407333;\n\tblurCoords[3] = uv0 + offset * 3.294215;\n\tblurCoords[4] = uv0 - offset * 3.294215;\n\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/postprocess_fxaa.frag": '#version 300 es\n\n/**\n * FXAA post-process\n *\n * Based on webgl-meincraft FXAA implementation.\n * https://github.com/mitsuhiko/webgl-meincraft/blob/master/assets/shaders/fxaa.glsl\n */\n\n/*\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n/**\n * Basic FXAA implementation based on the code on geeks3d.com with the\n * modification that the texture2DLod stuff was removed since it\'s\n * unsupported by WebGL.\n */\n\nprecision highp float;\n\nuniform sampler2D src;\n\nuniform vec2 ViewportSize;\nuniform float reduce_min;\nuniform float reduce_mul;\nuniform float span_max;\n\nin vec2 uv;\nout vec4 fragColor;\n\nvec4 fxaa(sampler2D tex, vec2 texCoord) {\n\tvec4 color;\n\tvec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n\tvec3 rgbNW = texture(tex, texCoord + vec2(-1.0, -1.0) * inverseVP).xyz;\n\tvec3 rgbNE = texture(tex, texCoord + vec2(1.0, -1.0) * inverseVP).xyz;\n\tvec3 rgbSW = texture(tex, texCoord + vec2(-1.0, 1.0) * inverseVP).xyz;\n\tvec3 rgbSE = texture(tex, texCoord + vec2(1.0, 1.0) * inverseVP).xyz;\n\tvec3 rgbM = texture(tex, texCoord).xyz;\n\tvec3 luma = vec3(0.299, 0.587, 0.114);\n\n\tfloat lumaNW = dot(rgbNW, luma);\n\tfloat lumaNE = dot(rgbNE, luma);\n\tfloat lumaSW = dot(rgbSW, luma);\n\tfloat lumaSE = dot(rgbSE, luma);\n\tfloat lumaM = dot(rgbM, luma);\n\tfloat lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n\tfloat lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n\tvec2 dir;\n\tdir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n\tdir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n\tfloat dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * reduce_mul), reduce_min);\n\n\tfloat rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n\tdir = min(vec2(span_max, span_max), max(vec2(-span_max, -span_max), dir * rcpDirMin)) * inverseVP;\n\n\tvec3 rgbA = 0.5 * (\n\t\ttexture(tex, texCoord + dir * (1.0 / 3.0 - 0.5)).xyz +\n\t\ttexture(tex, texCoord + dir * (2.0 / 3.0 - 0.5)).xyz);\n\tvec3 rgbB = rgbA * 0.5 + 0.25 * (\n\t\ttexture(tex, texCoord + dir * -0.5).xyz +\n\t\ttexture(tex, texCoord + dir * 0.5).xyz);\n\n\tfloat lumaB = dot(rgbB, luma);\n\tif ((lumaB < lumaMin) || (lumaB > lumaMax))\n\t\tcolor = vec4(rgbA, 1.0);\n\telse\n\t\tcolor = vec4(rgbB, 1.0);\n\treturn color;\n}\n\nvoid main () {\n\tfragColor = fxaa(src, uv);\n}\n',
        "shaders/webgl2/postprocess_fxaa.vert": "#version 300 es\n\n/** FXAA post-process effect vertex shader */\n\nin vec3 position;\nin vec2 uv0;\n\nout vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/postprocess_ssao.frag": "#version 300 es\n\n/*\n * Screen space ambient occlusion post process\n *\n * SSAO GLSL shader v1.2\n * assembled by Martins Upitis (martinsh) (devlog-martinsh.blogspot.com)\n * original technique is made by Arkano22 (www.gamedev.net/topic/550699-ssao-no-halo-artifacts/)\n *\n * Changelog:\n * 1.2 - added fog calculation to mask AO. Minor fixes.\n * 1.1 - added spiral sampling method from here:\n * (http://www.cgafaq.info/wiki/Evenly_distributed_points_on_sphere)\n */\n\nprecision highp float;\n\n#define PI 3.14159265\n\nuniform sampler2D depth0;\nuniform sampler2D oitWeight;\nuniform sampler2D src;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform int ssaoOnly;\nuniform float gdisplace; // Gauss bell center, default: 0.3\nuniform float radius; // AO radius, default: 2.0\nuniform float brightness; // AO brightness, default: 1.0\nuniform float luminanceInfluence; // how much luminance affects occlusion, default: 0.7\n\nout vec4 fragColor;\n\nconst int samples = 16;\n// const int samples = 8;\n\nfloat aoclamp = 0.25; // depth clamp - reduces haloing at screen edges\nbool noise = true; // use noise instead of pattern for sample dithering\nfloat noiseamount = 0.0002; // dithering amount\nfloat diffarea = 0.4; // self-shadowing reduction\n\nvec2 rand(vec2 coord) {\n\tfloat noiseX = ((fract(1.0-coord.s*(ViewportSize.x/2.0))*0.25)+(fract(coord.t*(ViewportSize.y/2.0))*0.75))*2.0-1.0;\n\tfloat noiseY = ((fract(1.0-coord.s*(ViewportSize.x/2.0))*0.75)+(fract(coord.t*(ViewportSize.y/2.0))*0.25))*2.0-1.0;\n\tif (noise) {\n\t\tnoiseX = clamp(fract(sin(dot(coord, vec2(12.9898,78.233))) * 43758.5453),0.0,1.0)*2.0-1.0;\n\t\tnoiseY = clamp(fract(sin(dot(coord, vec2(12.9898,78.233)*2.0)) * 43758.5453),0.0,1.0)*2.0-1.0;\n\t}\n\treturn vec2(noiseX, noiseY) * noiseamount;\n}\n\nfloat readDepth(in vec2 coord) {\n\treturn texture(depth0, coord).r;\n}\n\nfloat compareDepths(in float depth1, in float depth2, inout int far) {\n\tfloat garea = 2.0; // gauss bell width\n\tfloat diff = (depth1 - depth2)*100.0; // depth difference (0-100)\n\t// reduce left bell width to avoid self-shadowing\n\tif (diff<gdisplace) {\n\t\tgarea = diffarea;\n\t}\n\telse {\n\t\tfar = 1;\n\t}\n\n\tfloat gauss = pow(2.7182,-2.0*(diff-gdisplace)*(diff-gdisplace)/(garea*garea));\n\treturn gauss;\n}\n\nfloat calAO(vec2 uv, float depth, float dw, float dh) {\n\tfloat dd = (1.0-depth) * radius;\n\n\tfloat temp = 0.0;\n\tfloat temp2 = 0.0;\n\tfloat coordw = uv.x + dw*dd;\n\tfloat coordh = uv.y + dh*dd;\n\tfloat coordw2 = uv.x - dw*dd;\n\tfloat coordh2 = uv.y - dh*dd;\n\n\tvec2 coord = vec2(coordw , coordh);\n\tvec2 coord2 = vec2(coordw2, coordh2);\n\n\tint far = 0;\n\ttemp = compareDepths(depth, readDepth(coord), far);\n\t//DEPTH EXTRAPOLATION:\n\tif (far > 0) {\n\t\ttemp2 = compareDepths(readDepth(coord2), depth, far);\n\t\ttemp += (1.0-temp)*temp2;\n\t}\n\n\treturn temp;\n}\n\nvoid main() {\n\tvec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n\tvec2 texCoord = gl_FragCoord.xy * inverseVP;\n\n\tvec2 noise = rand(texCoord);\n\tfloat depth = readDepth(texCoord);\n\tfloat reveal = texture(oitWeight, texCoord).a;\n\n\tfloat w = inverseVP.x/clamp(depth, aoclamp,1.0)+(noise.x*(1.0-noise.x));\n\tfloat h = inverseVP.y/clamp(depth, aoclamp,1.0)+(noise.y*(1.0-noise.y));\n\n\tfloat pw;\n\tfloat ph;\n\n\tfloat ao;\n\n\tfloat dl = PI*(3.0-sqrt(5.0));\n\tfloat dz = 1.0/float(samples);\n\tfloat l = 0.0;\n\tfloat z = 1.0 - dz/2.0;\n\n\tfor (int i = 0; i <= samples; i++) {\n\t\tfloat r = sqrt(1.0-z);\n\t\tpw = cos(l)*r;\n\t\tph = sin(l)*r;\n\t\tao += calAO(texCoord, depth, pw*w, ph*h);\n\t\tz = z - dz;\n\t\tl = l + dl;\n\t}\n\n\tao /= float(samples) * brightness;\n\tao = 1.0 - ao * reveal;\n\n\tvec3 color = texture(src, texCoord).rgb;\n\tvec3 lumcoeff = vec3(0.299, 0.587, 0.114);\n\tfloat lum = dot(color.rgb, lumcoeff);\n\tvec3 luminance = vec3(lum, lum, lum);\n\tvec3 final = vec3(color*mix(vec3(ao),vec3(1.0), luminance * luminanceInfluence));\n\n\tif (ssaoOnly == 1) {\n\t\tfinal = vec3(mix(vec3(ao),vec3(1.0),luminance * luminanceInfluence));\n\t}\n\n\tfragColor = vec4(final, 1.0);\n}\n",
        "shaders/webgl2/postprocess_ssao.vert": "#version 300 es\n\n/*\n * Screen space ambient occlusion post process\n */\nin vec3 position;\n\nvoid main() {\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/reflective.frag": "precision highp float;\r\n\r\nuniform mat4 modelview;\r\nuniform mat4 view;\r\nuniform mat4 viewInverse;\r\n\r\nuniform vec4 ambient;\r\nuniform vec4 diffuse;\r\nuniform float specularStrength;\r\nuniform int specularPower;\r\n\r\nuniform vec3 lightDirection;\r\nuniform vec4 lightColor;\r\nuniform float lightIntensity;\r\nuniform float shadowBias;\r\n\r\nuniform sampler2D diffuse0;\r\nuniform sampler2D shadow0;\r\nuniform samplerCube env0;\r\n\r\nuniform float materialBlend;\r\n\r\nuniform int hasFloat;\r\nuniform int useVSM;\r\nuniform int useShadows;\r\nuniform int receiveShadows;\r\nuniform int useLighting;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nfloat unpack(vec4 c) {\r\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\r\n\treturn dot(c, bitShifts);\r\n}\r\n\r\nvec4 reflection() {\r\n\tvec3 eyeDirection = normalize(-viewPosition.xyz);\r\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\r\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\r\n\tvec4 color = textureCube(env0, lookup);\r\n\treturn color;\r\n}\r\n\r\n/** Computes color and directional lighting */\r\nvec4 lighting(float shadow) {\r\n\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\tvec3 N = normalize(viewNormal);\r\n\tvec3 L = normalize(mat3(view)*lightDirection);\r\n\tvec3 V = normalize(-viewPosition.xyz);\r\n\tvec3 H = normalize(L + V);\r\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\r\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\r\n\tspecularLight = pow(specularLight, float(specularPower));\r\n\r\n\tvec4 ambientColor = ambient * textureColor;\r\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\r\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\r\n\tvec4 color = ambientColor + (diffuseColor + specularColor) * shadow;\r\n\treturn color;\r\n}\r\n\r\nfloat linstep(float low, float high, float v) {\r\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\r\n}\r\n\r\nfloat VSM(vec2 moments, float compare) {\r\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\r\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\r\n\tfloat d = compare - moments.x;\r\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\r\n\treturn clamp(max(p, p_max), 0.0, 1.0);\r\n}\r\n\r\nfloat shadowmap() {\r\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\r\n\tuv = uv * 0.5 + 0.5;\r\n\tvec4 shadowTexel = texture2D(shadow0, uv);\r\n\r\n\tfloat depth;\r\n\tif (hasFloat == 1)\r\n\t\tdepth = shadowTexel.r;\r\n\telse\r\n\t\tdepth = unpack(shadowTexel);\r\n\r\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\r\n\r\n\tif (useVSM == 1)\r\n\t\treturn VSM(shadowTexel.xy, lightDepth);\r\n\r\n\treturn step(lightDepth - shadowBias, depth);\r\n}\r\n\r\nvoid main(void) {\r\n\tfloat shadow = 1.0;\r\n\tif (useShadows > 0 && receiveShadows > 0) {\r\n\t\tshadow = shadowmap();\r\n\t}\r\n\r\n\tvec4 color = reflection();\r\n\r\n\tif (useLighting == 1) {\r\n\t\tcolor = mix(color, lighting(shadow), materialBlend);\r\n\t}\r\n\telse {\r\n\t\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\t\tcolor = mix(color, diffuse * textureColor, materialBlend);\r\n\t}\r\n\tgl_FragColor = clamp(color, 0.0, 1.0);\r\n}\r\n",
        "shaders/webgl2/reflective.vert": "// Diffuse shader\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 texcoord2d0;\r\n\r\nuniform mat4 model;\r\nuniform mat4 view;\r\nuniform mat4 modelview;\r\nuniform mat4 projection;\r\nuniform mat4 lightProjection;\r\nuniform mat4 lightView;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvoid main() {\r\n\tuv0 = texcoord2d0;\r\n\tworldPosition = model * vec4(position, 1.0);\r\n\tworldNormal = normalize(mat3(model) * normal);\r\n\tviewPosition = view * worldPosition;\r\n\tviewNormal = mat3(modelview) * normal;\r\n\tshadowPosition = lightProjection * lightView * worldPosition;\r\n\r\n\tgl_Position = projection * viewPosition;\r\n}\r\n",
        "shaders/webgl2/reflective_masked.frag": "precision highp float;\r\n\r\nuniform mat4 modelview;\r\nuniform mat4 view;\r\nuniform mat4 viewInverse;\r\n\r\nuniform vec4 ambient;\r\nuniform vec4 diffuse;\r\nuniform float specularStrength;\r\nuniform int specularPower;\r\n\r\nuniform vec3 lightDirection;\r\nuniform vec4 lightColor;\r\nuniform float lightIntensity;\r\nuniform float shadowBias;\r\n\r\nuniform sampler2D diffuse0;\r\nuniform sampler2D shadow0;\r\nuniform samplerCube env0;\r\nuniform sampler2D mask;\r\n\r\nuniform float materialBlend;\r\n\r\nuniform int hasFloat;\r\nuniform int useVSM;\r\nuniform int useShadows;\r\nuniform int receiveShadows;\r\nuniform int useLighting;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nfloat unpack(vec4 c) {\r\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\r\n\treturn dot(c, bitShifts);\r\n}\r\n\r\nvec4 reflection() {\r\n\tvec3 eyeDirection = normalize(-viewPosition.xyz);\r\n\tvec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);\r\n\tvec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);\r\n\tvec4 color = textureCube(env0, lookup);\r\n\treturn color;\r\n}\r\n\r\n/** Computes color and directional lighting */\r\nvec4 lighting(float shadow) {\r\n\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\tvec3 N = normalize(viewNormal);\r\n\tvec3 L = normalize(mat3(view)*lightDirection);\r\n\tvec3 V = normalize(-viewPosition.xyz);\r\n\tvec3 H = normalize(L + V);\r\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\r\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\r\n\tspecularLight = pow(specularLight, float(specularPower));\r\n\r\n\tvec4 ambientColor = ambient * textureColor;\r\n\tvec4 diffuseColor = diffuse * textureColor * lightColor * diffuseLight;\r\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\r\n\tvec4 color = ambientColor + (diffuseColor + specularColor) * shadow;\r\n\treturn color;\r\n}\r\n\r\nfloat linstep(float low, float high, float v) {\r\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\r\n}\r\n\r\nfloat VSM(vec2 moments, float compare) {\r\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\r\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\r\n\tfloat d = compare - moments.x;\r\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\r\n\treturn clamp(max(p, p_max), 0.0, 1.0);\r\n}\r\n\r\nfloat shadowmap() {\r\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\r\n\tuv = uv * 0.5 + 0.5;\r\n\tvec4 shadowTexel = texture2D(shadow0, uv);\r\n\r\n\tfloat depth;\r\n\tif (hasFloat == 1)\r\n\t\tdepth = shadowTexel.r;\r\n\telse\r\n\t\tdepth = unpack(shadowTexel);\r\n\r\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\r\n\r\n\tif (useVSM == 1)\r\n\t\treturn VSM(shadowTexel.xy, lightDepth);\r\n\r\n\treturn step(lightDepth - shadowBias, depth);\r\n}\r\n\r\nvoid main(void) {\r\n\tfloat shadow = 1.0;\r\n\tif (useShadows > 0 && receiveShadows > 0) {\r\n\t\tshadow = shadowmap();\r\n\t}\r\n\r\n\tfloat maskValue = texture2D(mask, uv0).r;\r\n\tvec4 color = reflection();\r\n\r\n\tif (useLighting == 1) {\r\n\t\tcolor = mix(color, lighting(shadow), maskValue * materialBlend);\r\n\t}\r\n\telse {\r\n\t\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\t\tcolor = mix(color, diffuse * textureColor, maskValue * materialBlend);\r\n\t}\r\n\tgl_FragColor = clamp(color, 0.0, 1.0);\r\n}\r\n",
        "shaders/webgl2/reflective_masked.vert": "// Diffuse shader\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 texcoord2d0;\r\n\r\nuniform mat4 model;\r\nuniform mat4 view;\r\nuniform mat4 modelview;\r\nuniform mat4 projection;\r\nuniform mat4 lightProjection;\r\nuniform mat4 lightView;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvoid main() {\r\n\tuv0 = texcoord2d0;\r\n\tworldPosition = model * vec4(position, 1.0);\r\n\tworldNormal = normalize(mat3(model) * normal);\r\n\tviewPosition = view * worldPosition;\r\n\tviewNormal = mat3(modelview) * normal;\r\n\tshadowPosition = lightProjection * lightView * worldPosition;\r\n\r\n\tgl_Position = projection * viewPosition;\r\n}\r\n",
        "shaders/webgl2/ScreenQuad.frag": "// Shader for rendering a screen aligned quad for image space effects\n\nprecision highp float;\n\nvarying vec2 uv;\nuniform sampler2D tex0;\n\nvoid main () {\n\tgl_FragColor = texture2D(tex0, uv);\n}\n",
        "shaders/webgl2/ScreenQuad.vert": "// Shader for rendering a screen aligned quad for image space effects\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nvarying vec2 uv;\n\nvoid main() {\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/shadow_blur.frag": "/**\n * Shadow blur\n */\n\nprecision highp float;\n\nuniform sampler2D src;\n\nvarying vec2 uv;\nvarying highp vec2 blurCoords[14];\n\nvoid main () {\n\tlowp vec4 sum = vec4(0.0);\n\tsum += texture2D(src, blurCoords[ 0])*0.0044299121055113265;\n\tsum += texture2D(src, blurCoords[ 1])*0.00895781211794;\n\tsum += texture2D(src, blurCoords[ 2])*0.0215963866053;\n\tsum += texture2D(src, blurCoords[ 3])*0.0443683338718;\n\tsum += texture2D(src, blurCoords[ 4])*0.0776744219933;\n\tsum += texture2D(src, blurCoords[ 5])*0.115876621105;\n\tsum += texture2D(src, blurCoords[ 6])*0.147308056121;\n\tsum += texture2D(src, uv            )*0.159576912161;\n\tsum += texture2D(src, blurCoords[ 7])*0.147308056121;\n\tsum += texture2D(src, blurCoords[ 8])*0.115876621105;\n\tsum += texture2D(src, blurCoords[ 9])*0.0776744219933;\n\tsum += texture2D(src, blurCoords[10])*0.0443683338718;\n\tsum += texture2D(src, blurCoords[11])*0.0215963866053;\n\tsum += texture2D(src, blurCoords[12])*0.00895781211794;\n\tsum += texture2D(src, blurCoords[13])*0.0044299121055113265;\n\tgl_FragColor = sum;\n}\n",
        "shaders/webgl2/shadow_blurh.vert": "/**\n * Shadow blur - horizontal\n */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nuniform sampler2D src;\n\nvarying vec2 uv;\nvarying vec2 blurCoords[14];\n\nvoid main() {\n\tfloat blurSize = 0.2;\n\tblurCoords[ 0] = uv0 + vec2(-0.028, 0.0) * blurSize;\n\tblurCoords[ 1] = uv0 + vec2(-0.024, 0.0) * blurSize;\n\tblurCoords[ 2] = uv0 + vec2(-0.020, 0.0) * blurSize;\n\tblurCoords[ 3] = uv0 + vec2(-0.016, 0.0) * blurSize;\n\tblurCoords[ 4] = uv0 + vec2(-0.012, 0.0) * blurSize;\n\tblurCoords[ 5] = uv0 + vec2(-0.008, 0.0) * blurSize;\n\tblurCoords[ 6] = uv0 + vec2(-0.004, 0.0) * blurSize;\n\tblurCoords[ 7] = uv0 + vec2( 0.004, 0.0) * blurSize;\n\tblurCoords[ 8] = uv0 + vec2( 0.008, 0.0) * blurSize;\n\tblurCoords[ 9] = uv0 + vec2( 0.012, 0.0) * blurSize;\n\tblurCoords[10] = uv0 + vec2( 0.016, 0.0) * blurSize;\n\tblurCoords[11] = uv0 + vec2( 0.020, 0.0) * blurSize;\n\tblurCoords[12] = uv0 + vec2( 0.024, 0.0) * blurSize;\n\tblurCoords[13] = uv0 + vec2( 0.028, 0.0) * blurSize;\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/shadow_blurv.vert": "/**\n * Shadow blur - vertical\n */\n\nattribute vec3 position;\nattribute vec2 uv0;\n\nuniform sampler2D src;\n\nvarying vec2 uv;\nvarying vec2 blurCoords[14];\n\nvoid main() {\n\tfloat blurSize = 0.2;\n\tblurCoords[ 0] = uv0 + vec2(0.0, -0.028) * blurSize;\n\tblurCoords[ 1] = uv0 + vec2(0.0, -0.024) * blurSize;\n\tblurCoords[ 2] = uv0 + vec2(0.0, -0.020) * blurSize;\n\tblurCoords[ 3] = uv0 + vec2(0.0, -0.016) * blurSize;\n\tblurCoords[ 4] = uv0 + vec2(0.0, -0.012) * blurSize;\n\tblurCoords[ 5] = uv0 + vec2(0.0, -0.008) * blurSize;\n\tblurCoords[ 6] = uv0 + vec2(0.0, -0.004) * blurSize;\n\tblurCoords[ 7] = uv0 + vec2(0.0,  0.004) * blurSize;\n\tblurCoords[ 8] = uv0 + vec2(0.0,  0.008) * blurSize;\n\tblurCoords[ 9] = uv0 + vec2(0.0,  0.012) * blurSize;\n\tblurCoords[10] = uv0 + vec2(0.0,  0.016) * blurSize;\n\tblurCoords[11] = uv0 + vec2(0.0,  0.020) * blurSize;\n\tblurCoords[12] = uv0 + vec2(0.0,  0.024) * blurSize;\n\tblurCoords[13] = uv0 + vec2(0.0,  0.028) * blurSize;\n\tuv = uv0;\n\tgl_Position = vec4(position.xy, 0.0, 1.0);\n}\n",
        "shaders/webgl2/skybox.frag": "#version 300 es\n\nprecision highp float;\n\nuniform samplerCube skybox0;\n\nin vec3 uv0;\nout vec4 fragColor;\n\nvoid main(void) {\n\tfragColor = texture(skybox0, uv0);\n}\n",
        "shaders/webgl2/skybox.vert": "#version 300 es\n\nin vec3 position;\nin vec3 normal;\nin vec2 texcoord2d0;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 modelview;\nuniform mat4 projection;\nuniform mat4 lightProjection;\nuniform mat4 lightView;\n\nout vec3 uv0;\n\nvoid main(void) {\n\tuv0 = vec3(position.x, -position.yz);\n\tgl_Position = projection * view * model * vec4(position, 1.0);\n}\n",
        "shaders/webgl2/ssao.frag": "precision highp float;\n\nuniform sampler2D position0;\n\nuniform mat4 projection;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform float ssaoGDisplace;\nuniform float ssaoRadius;\nuniform float ssaoDivider;\n\n#define DL 2.399963229728653\n#define EULER 2.718281828459045\n\nfloat unpack(vec4 c) {\n    const vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\n    return dot(c, bitShifts);\n}\n\nfloat getDepth(vec2 coord) {\n    float d = unpack(texture2D(position0, coord.xy));\n    if (d == 0.0)\n        d = 1.0;\n    return d;\n}\n\nfloat doAmbientOcclusion(vec2 coord, vec2 coord2, float d) {\n    float diff = getDepth(coord + coord2) - d;\n    float gDisplace = -0.0002 - (0.00002 * max(min(ssaoGDisplace, 10.0), 0.0));\n    //float gDisplace = -0.00032;\n    return (diff < gDisplace) ? pow(EULER, -2.0 * (diff - gDisplace) * (diff - gDisplace) * 10000.0 / 0.16) : 0.0;\n}\n\nvoid main() {\n    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n    \n    vec2 c = gl_FragCoord.xy * inverseVP;\n    \n    float ao = 0.0;\n\n    float dz = 1.0 / 8.0;\n    float z = 1.0 - dz / 2.0;\n    float l = 0.0;\n\n    float depth = getDepth(c);\n\n    for (int i = 0; i <= 8; i++) {\n        float r = sqrt(1.0 - z);\n\n        vec2 p = vec2(cos(l) * r, sin(l) * r);\n        ao += doAmbientOcclusion(c, p * ssaoRadius * inverseVP.x * (1.0 - depth), depth);\n        z = z - dz;\n        l = l + DL;\n    }\n\n    ao /= 8.0 + max(min(ssaoDivider, 1.0), -1.0);\n    //ao /= 8.5;\n    \n    ao = max(0.0, ao * 2.0 - 1.0);\n    ao = 1.0 - ao;\n    gl_FragColor = vec4(ao, ao, ao, 1.0);\n    //gl_FragColor = vec4(depth, depth, depth, 1.0);\n    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}",
        "shaders/webgl2/ssao.vert": "attribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        "shaders/webgl2/ssaoblur.frag": "precision highp float;\n\nuniform sampler2D ao0;\nuniform sampler2D src;\n\nuniform mat4 projection;\n\nuniform float zNear;\nuniform float zFar;\nuniform vec2 ViewportSize;\n\nuniform int ssaoBlurSize;\nuniform int ssaoOnly;\n\nfloat random(vec2 co) {\n    //co = mod(co, 128.0);\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);\n    \n    const int MAXIMUM_BLUR = 32;\n    float result = 0.0;\n    vec2 hlim = vec2(float(-ssaoBlurSize) * 0.5 + 0.5);\n    for (int i = 0; i < MAXIMUM_BLUR; i++) {\n        if (i >= ssaoBlurSize)\n            break;\n        for (int j = 0; j < MAXIMUM_BLUR; j++) {\n            if (j >= ssaoBlurSize)\n                break;\n            vec2 offset = (hlim + vec2(float(i), float(j))) * inverseVP;\n            result += texture2D(ao0, gl_FragCoord.xy * inverseVP + offset).r;\n        }\n    }\n    result = result / float(ssaoBlurSize * ssaoBlurSize);\n\n    if (ssaoOnly == 1) {\n        gl_FragColor = vec4(vec3(result), 1.0);\n    }\n    else {\n        gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * result, 1.0);\n    }\n    //gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * texture2D(ao0, gl_FragCoord.xy * inverseVP/* / 2.0 + 0.5*/).xyz, 1.0);\n}",
        "shaders/webgl2/ssaoblur.vert": "attribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        "shaders/webgl2/terrain.frag": "// Terrain shader for the forward renderer\r\n\r\nprecision highp float;\r\n\r\nuniform mat4 modelview;\r\nuniform mat4 view;\r\n\r\nuniform vec4 ambient;\r\nuniform vec4 diffuse;\r\nuniform float specularStrength;\r\nuniform int specularPower;\r\n\r\nuniform vec3 lightDirection;\r\nuniform vec4 lightColor;\r\nuniform float lightIntensity;\r\nuniform float shadowBias;\r\n\r\nuniform sampler2D diffuse0;\r\nuniform sampler2D shadow0;\r\n\r\nuniform int hasFloat;\r\nuniform int useVSM;\r\nuniform int useShadows;\r\nuniform int receiveShadows;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvarying vec3 bc;\r\n\r\nfloat unpack(vec4 c) {\r\n\tconst vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);\r\n\treturn dot(c, bitShifts);\r\n}\r\n\r\n/** Computes color and directional lighting */\r\nvec4 lighting(float shadow) {\r\n\tvec4 textureColor = texture2D(diffuse0, uv0);\r\n\tvec3 N = normalize(viewNormal);\r\n\tvec3 L = normalize(mat3(view)*lightDirection);\r\n\tvec3 V = normalize(-viewPosition.xyz);\r\n\tvec3 H = normalize(L + V);\r\n\tfloat diffuseLight = max(dot(N, L), 0.0) * lightIntensity;\r\n\tfloat specularLight = min(max(dot(N, H), 0.0), 1.0);\r\n\tspecularLight = pow(specularLight, float(specularPower));\r\n\r\n\tvec4 ambientColor = ambient * textureColor;\r\n\tvec4 diffuseColor = diffuse * diffuse * textureColor * lightColor * diffuseLight;\r\n\tvec4 specularColor = lightColor * specularLight * specularStrength;\r\n\r\n\treturn ambientColor + (diffuseColor + specularColor) * shadow;\r\n}\r\n\r\nfloat linstep(float low, float high, float v) {\r\n\treturn clamp((v-low)/(high-low), 0.0, 1.0);\r\n}\r\n\r\nfloat VSM(vec2 moments, float compare) {\r\n\tfloat p = smoothstep(compare - shadowBias, compare, moments.x);\r\n\tfloat variance = max(moments.y - moments.x*moments.x, -0.001);\r\n\tfloat d = compare - moments.x;\r\n\tfloat p_max = linstep(0.2, 1.0, variance / (variance + d*d));\r\n\treturn clamp(max(p, p_max), 0.0, 1.0);\r\n}\r\n\r\nfloat shadowmap() {\r\n\tvec2 uv = shadowPosition.xy / shadowPosition.w;\r\n\tuv = uv * 0.5 + 0.5;\r\n\tvec4 shadowTexel = texture2D(shadow0, uv);\r\n\r\n\tfloat depth;\r\n\tif (hasFloat == 1)\r\n\t\tdepth = shadowTexel.r;\r\n\telse\r\n\t\tdepth = unpack(shadowTexel);\r\n\r\n\tfloat lightDepth = (shadowPosition.z + 1.0) * 0.5;\r\n\r\n\tif (useVSM == 1)\r\n\t\treturn VSM(shadowTexel.xy, lightDepth);\r\n\r\n\treturn step(lightDepth - shadowBias, depth);\r\n}\r\n\r\nvoid main(void) {\r\n\tfloat shadow = 1.0;\r\n\tif (useShadows > 0 && receiveShadows > 0) {\r\n\t\tshadow = shadowmap();\r\n\t}\r\n\tvec4 color = lighting(shadow);\r\n\tgl_FragColor = clamp(color, 0.0, 1.0);\r\n\r\n\t// gl_FragColor = vec4(bc, 1.0); // for debug\r\n}\r\n",
        "shaders/webgl2/terrain.vert": "// Terrain shader for the forward renderer\r\n\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 texcoord2d0;\r\nattribute vec3 barycentric;\r\n\r\nuniform mat4 model;\r\nuniform mat4 view;\r\nuniform mat4 modelview;\r\nuniform mat4 projection;\r\nuniform mat4 lightProjection;\r\nuniform mat4 lightView;\r\n\r\nuniform sampler2D height;\r\n\r\nuniform float verticalScale;\r\nuniform vec2 uvOffset;\r\nuniform vec2 uvScale;\r\n\r\nvarying vec2 uv0;\r\nvarying vec4 worldPosition;\r\nvarying vec3 worldNormal;\r\nvarying vec4 viewPosition;\r\nvarying vec3 viewNormal;\r\nvarying vec4 shadowPosition;\r\n\r\nvarying vec3 bc;\r\n\r\nfloat snap(float f, float step) {\r\n\treturn step * floor(f / step);\r\n}\r\n\r\nvoid main() {\r\n\tbc = barycentric;\r\n\tuv0 = texcoord2d0 * uvScale + uvOffset;\r\n\tworldPosition = model * vec4(position, 1.0);\r\n\r\n\t// worldPosition.x = snap(worldPosition.x, worldPosition.y);\r\n\t// worldPosition.z = snap(worldPosition.z, worldPosition.y);\r\n\r\n\tfloat height = texture2D(height, uv0).r;\r\n\tworldPosition.y = height * verticalScale;\r\n\t// worldPosition.y = 0.0;\r\n\r\n\tworldNormal = normalize(mat3(model) * normal);\r\n\tviewPosition = view * worldPosition;\r\n\tviewNormal = mat3(modelview) * normal;\r\n\r\n\tshadowPosition = lightProjection * lightView * worldPosition;\r\n\r\n\tgl_Position = projection * viewPosition;\r\n}\r\n",
        "shaders/webgl2/test.frag": "// Test fragment shader drawing in blue \n\nprecision mediump float; \n\nvoid main(void) { \n\tgl_FragColor = vec4(0.1, 0.5, 0.8, 1.0); \n}",
        "shaders/webgl2/test.vert": "// Test pass-through shader that doesn't transform vertex\nattribute vec3 position; \nattribute vec3 normal; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\n\nvoid main(void) { \n\tfragNormal=mat3(modelview)*normal;\n\tfragPosition=projection*modelview*vec4(position, 1.0);\n\tgl_Position = fragPosition; \n}\n",
        "shaders/webgl2/transparent.frag": "// Unlit transparency shader\nprecision mediump float; \n\nuniform vec4 diffuse;\n\nuniform sampler2D diffuse0;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main(void) {\n\tgl_FragColor = diffuse*texture2D(diffuse0, fragTexcoord2d0);\n}",
        "shaders/webgl2/transparent.vert": "// Unlit transparency shader\nattribute vec3 position; \nattribute vec3 normal; \nattribute vec2 texcoord2d0; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragNormal;\nvarying vec4 fragPosition;\nvarying vec2 fragTexcoord2d0;\n\nvoid main() {\n\tfragNormal=mat3(modelview)*normal;\n\tfragPosition=modelview*vec4(position, 1.0);\n\tfragTexcoord2d0=texcoord2d0;\n\tgl_Position=projection*fragPosition;\n}\n",
        "shaders/webgl2/wireframe.frag": "// Test fragment shader drawing in blue \nprecision mediump float; \n\nvarying vec3 fragBarycentric;\n\nvoid main(void) { \n\t\tgl_FragColor = vec4(0.0, 0.0, 0.0, \n\t\t\tpow(1.0-fragBarycentric.r, 32.0)+pow(1.0-fragBarycentric.g, 32.0)+pow(1.0-fragBarycentric.b, 32.0));\n}",
        "shaders/webgl2/wireframe.vert": "// Diffuse shader\nattribute vec3 position; \nattribute vec3 barycentric; \n\nuniform mat4 modelview;\nuniform mat4 projection;\n\nvarying vec3 fragBarycentric;\n\nvoid main(void) { \n\tgl_Position=projection*modelview*vec4(position, 1.0); \n\tfragBarycentric = barycentric;\n}"
    }
};