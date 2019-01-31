! function() {
	"use strict";
	var e = {};
	"undefined" == typeof exports ? "function" == typeof define && "object" == typeof define.amd && define.amd ? (e.exports = {}, define(function() {
			return e.exports
		})) : e.exports = window : e.exports = exports,
		function(e) {
			var h, t = {};
			if (!P) var P = 1e-6;
			t.create = function() {
				return new Float32Array(2)
			}, t.clone = function(e) {
				var t = new Float32Array(2);
				return t[0] = e[0], t[1] = e[1], t
			}, t.fromValues = function(e, t) {
				var i = new Float32Array(2);
				return i[0] = e, i[1] = t, i
			}, t.copy = function(e, t) {
				return e[0] = t[0], e[1] = t[1], e
			}, t.set = function(e, t, i) {
				return e[0] = t, e[1] = i, e
			}, t.add = function(e, t, i) {
				return e[0] = t[0] + i[0], e[1] = t[1] + i[1], e
			}, t.sub = t.subtract = function(e, t, i) {
				return e[0] = t[0] - i[0], e[1] = t[1] - i[1], e
			}, t.mul = t.multiply = function(e, t, i) {
				return e[0] = t[0] * i[0], e[1] = t[1] * i[1], e
			}, t.div = t.divide = function(e, t, i) {
				return e[0] = t[0] / i[0], e[1] = t[1] / i[1], e
			}, t.min = function(e, t, i) {
				return e[0] = Math.min(t[0], i[0]), e[1] = Math.min(t[1], i[1]), e
			}, t.max = function(e, t, i) {
				return e[0] = Math.max(t[0], i[0]), e[1] = Math.max(t[1], i[1]), e
			}, t.scale = function(e, t, i) {
				return e[0] = t[0] * i, e[1] = t[1] * i, e
			}, t.dist = t.distance = function(e, t) {
				var i = t[0] - e[0],
					n = t[1] - e[1];
				return Math.sqrt(i * i + n * n)
			}, t.sqrDist = t.squaredDistance = function(e, t) {
				var i = t[0] - e[0],
					n = t[1] - e[1];
				return i * i + n * n
			}, t.len = t.length = function(e) {
				var t = e[0],
					i = e[1];
				return Math.sqrt(t * t + i * i)
			}, t.sqrLen = t.squaredLength = function(e) {
				var t = e[0],
					i = e[1];
				return t * t + i * i
			}, t.negate = function(e, t) {
				return e[0] = -t[0], e[1] = -t[1], e
			}, t.normalize = function(e, t) {
				var i = t[0],
					n = t[1],
					r = i * i + n * n;
				return 0 < r && (r = 1 / Math.sqrt(r), e[0] = t[0] * r, e[1] = t[1] * r), e
			}, t.dot = function(e, t) {
				return e[0] * t[0] + e[1] * t[1]
			}, t.cross = function(e, t, i) {
				var n = t[0] * i[1] - t[1] * i[0];
				return e[0] = e[1] = 0, e[2] = n, e
			}, t.lerp = function(e, t, i, n) {
				var r = t[0],
					s = t[1];
				return e[0] = r + n * (i[0] - r), e[1] = s + n * (i[1] - s), e
			}, t.transformMat2 = function(e, t, i) {
				var n = t[0],
					r = t[1];
				return e[0] = n * i[0] + r * i[1], e[1] = n * i[2] + r * i[3], e
			}, t.forEach = (h = new Float32Array(2), function(e, t, i, n, r, s) {
				var a, o;
				for (t || (t = 2), i || (i = 0), o = n ? Math.min(n * t + i, e.length) : e.length, a = i; a < o; a += t) h[0] = e[a], h[1] = e[a + 1], r(h, h, s), e[a] = h[0], e[a + 1] = h[1];
				return e
			}), t.str = function(e) {
				return "vec2(" + e[0] + ", " + e[1] + ")"
			}, void 0 !== e && (e.vec2 = t);
			var u, i = {};
			if (!P) P = 1e-6;
			i.create = function() {
				return new Float32Array(3)
			}, i.clone = function(e) {
				var t = new Float32Array(3);
				return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
			}, i.fromValues = function(e, t, i) {
				var n = new Float32Array(3);
				return n[0] = e, n[1] = t, n[2] = i, n
			}, i.copy = function(e, t) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
			}, i.set = function(e, t, i, n) {
				return e[0] = t, e[1] = i, e[2] = n, e
			}, i.add = function(e, t, i) {
				return e[0] = t[0] + i[0], e[1] = t[1] + i[1], e[2] = t[2] + i[2], e
			}, i.sub = i.subtract = function(e, t, i) {
				return e[0] = t[0] - i[0], e[1] = t[1] - i[1], e[2] = t[2] - i[2], e
			}, i.mul = i.multiply = function(e, t, i) {
				return e[0] = t[0] * i[0], e[1] = t[1] * i[1], e[2] = t[2] * i[2], e
			}, i.div = i.divide = function(e, t, i) {
				return e[0] = t[0] / i[0], e[1] = t[1] / i[1], e[2] = t[2] / i[2], e
			}, i.min = function(e, t, i) {
				return e[0] = Math.min(t[0], i[0]), e[1] = Math.min(t[1], i[1]), e[2] = Math.min(t[2], i[2]), e
			}, i.max = function(e, t, i) {
				return e[0] = Math.max(t[0], i[0]), e[1] = Math.max(t[1], i[1]), e[2] = Math.max(t[2], i[2]), e
			}, i.scale = function(e, t, i) {
				return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e
			}, i.dist = i.distance = function(e, t) {
				var i = t[0] - e[0],
					n = t[1] - e[1],
					r = t[2] - e[2];
				return Math.sqrt(i * i + n * n + r * r)
			}, i.sqrDist = i.squaredDistance = function(e, t) {
				var i = t[0] - e[0],
					n = t[1] - e[1],
					r = t[2] - e[2];
				return i * i + n * n + r * r
			}, i.len = i.length = function(e) {
				var t = e[0],
					i = e[1],
					n = e[2];
				return Math.sqrt(t * t + i * i + n * n)
			}, i.sqrLen = i.squaredLength = function(e) {
				var t = e[0],
					i = e[1],
					n = e[2];
				return t * t + i * i + n * n
			}, i.negate = function(e, t) {
				return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e
			}, i.normalize = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = i * i + n * n + r * r;
				return 0 < s && (s = 1 / Math.sqrt(s), e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s), e
			}, i.dot = function(e, t) {
				return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
			}, i.cross = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = i[0],
					o = i[1],
					h = i[2];
				return e[0] = r * h - s * o, e[1] = s * a - n * h, e[2] = n * o - r * a, e
			}, i.lerp = function(e, t, i, n) {
				var r = t[0],
					s = t[1],
					a = t[2];
				return e[0] = r + n * (i[0] - r), e[1] = s + n * (i[1] - s), e[2] = a + n * (i[2] - a), e
			}, i.transformMat4 = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2];
				return e[0] = i[0] * n + i[4] * r + i[8] * s + i[12], e[1] = i[1] * n + i[5] * r + i[9] * s + i[
					13], e[2] = i[2] * n + i[6] * r + i[10] * s + i[14], e
			}, i.transformQuat = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = i[0],
					o = i[1],
					h = i[2],
					u = i[3],
					c = u * n + o * s - h * r,
					l = u * r + h * n - a * s,
					d = u * s + a * r - o * n,
					f = -a * n - o * r - h * s;
				return e[0] = c * u + f * -a + l * -h - d * -o, e[1] = l * u + f * -o + d * -a - c * -h, e[2] = d * u + f * -h + c * -o - l * -a, e
			}, i.forEach = (u = new Float32Array(3), function(e, t, i, n, r, s) {
				var a, o;
				for (t || (t = 3), i || (i = 0), o = n ? Math.min(n * t + i, e.length) : e.length, a = i; a < o; a += t) u[0] = e[a], u[1] = e[a + 1], u[2] = e[a + 2], r(u, u, s), e[a] = u[0], e[a + 1] = u[1], e[a + 2] = u[2];
				return e
			}), i.str = function(e) {
				return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
			}, void 0 !== e && (e.vec3 = i);
			var c, n = {};
			if (!P) P = 1e-6;
			n.create = function() {
				return new Float32Array(4)
			}, n.clone = function(e) {
				var t = new Float32Array(4);
				return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
			}, n.fromValues = function(e, t, i, n) {
				var r = new Float32Array(4);
				return r[0] = e, r[1] = t, r[2] = i, r[3] = n, r
			}, n.copy = function(e, t) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
			}, n.set = function(e, t, i, n, r) {
				return e[0] = t, e[1] = i, e[2] = n, e[3] = r, e
			}, n.add = function(e, t, i) {
				return e[0] = t[0] + i[0], e[1] = t[1] + i[1], e[2] = t[2] + i[2], e[3] = t[3] + i[3], e
			}, n.sub = n.subtract = function(e, t, i) {
				return e[0] = t[0] - i[0], e[1] = t[1] - i[1], e[2] = t[2] - i[2], e[3] = t[3] - i[3], e
			}, n.mul = n.multiply = function(e, t, i) {
				return e[0] = t[0] * i[0], e[1] = t[1] * i[1], e[2] = t[2] * i[2], e[3] = t[3] * i[3], e
			}, n.div = n.divide = function(e, t, i) {
				return e[0] = t[0] / i[0], e[1] = t[1] / i[1], e[2] = t[2] / i[2], e[3] = t[3] / i[3], e
			}, n.min = function(e, t, i) {
				return e[0] = Math.min(t[0], i[0]), e[1] = Math.min(t[1], i[1]), e[2] = Math.min(t[2], i[2]), e[3] = Math.min(t[3], i[3]), e
			}, n.max = function(e, t, i) {
				return e[0] = Math.max(t[0], i[0]), e[1] = Math.max(t[1], i[1]), e[2] = Math.max(t[2], i[2]), e[3] = Math.max(t[3], i[3]), e
			}, n.scale = function(e, t, i) {
				return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i, e
			}, n.dist = n.distance = function(e, t) {
				var i = t[0] - e[0],
					n = t[1] - e[1],
					r = t[2] - e[2],
					s = t[3] - e[3];
				return Math.sqrt(i * i + n * n + r * r + s * s)
			}, n.sqrDist = n.squaredDistance = function(e, t) {
				var i = t[0] - e[0],
					n = t[1] - e[1],
					r = t[2] - e[2],
					s = t[3] - e[3];
				return i * i + n * n + r * r + s * s
			}, n.len = n.length = function(e) {
				var t = e[0],
					i = e[1],
					n = e[2],
					r = e[3];
				return Math.sqrt(t * t + i * i + n * n + r * r)
			}, n.sqrLen = n.squaredLength = function(e) {
				var t = e[0],
					i = e[1],
					n = e[2],
					r = e[3];
				return t * t + i * i + n * n + r * r
			}, n.negate = function(e, t) {
				return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e
			}, n.normalize = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = i * i + n * n + r * r + s * s;
				return 0 < a && (a = 1 / Math.sqrt(a), e[0] = t[0] * a, e[1] = t[1] * a, e[2] = t[2] * a, e[3] = t[3] * a), e
			}, n.dot = function(e, t) {
				return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
			}, n.lerp = function(e, t, i, n) {
				var r = t[0],
					s = t[1],
					a = t[2],
					o = t[3];
				return e[0] = r + n * (i[0] - r), e[1] = s + n * (i[1] - s), e[2] = a + n * (i[2] - a), e[3] = o + n * (i[3] - o), e
			}, n.transformMat4 = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3];
				return e[0] = i[0] * n + i[4] * r + i[8] * s + i[12] * a, e[1] = i[1] * n + i[5] * r + i[9] * s + i[13] * a, e[2] = i[2] * n + i[6] * r + i[10] * s + i[14] * a, e[3] = i[3] * n + i[7] * r + i[11] * s + i[15] * a, e
			}, n.transformQuat = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = i[0],
					o = i[1],
					h = i[2],
					u = i[3],
					c = u * n + o * s - h * r,
					l = u * r + h * n - a * s,
					d = u * s + a * r - o * n,
					f = -a * n - o * r - h * s;
				return e[0] = c * u + f * -a + l * -h - d * -o, e[1] = l * u + f * -o + d * -a - c * -h, e[2] = d * u + f * -h + c * -o - l * -a, e
			}, n.forEach = (c = new Float32Array(4), function(e, t, i, n, r, s) {
				var a, o;
				for (t || (t = 4), i || (i = 0), o = n ? Math.min(n * t + i, e.length) : e.length, a = i; a < o; a += t) c[0] = e[a], c[1] = e[a + 1], c[2] = e[a + 2], c[3] = e[a + 3], r(c, c, s), e[a] = c[0], e[a + 1] = c[1], e[a + 2] = c[2], e[a + 3] = c[3];
				return e
			}), n.str = function(e) {
				return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
			}, void 0 !== e && (e.vec4 = n);
			var r = {},
				s = new Float32Array([1, 0, 0, 1]);
			if (!P) P = 1e-6;
			r.create = function() {
				return new Float32Array(s)
			}, r.clone = function(e) {
				var t = new Float32Array(4);
				return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
			}, r.copy = function(e, t) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
			}, r.identity = function(e) {
				return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
			}, r.transpose = function(e, t) {
				if (e === t) {
					var i = t[1];
					e[1] = t[2], e[2] = i
				} else e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
				return e
			}, r.invert = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = i * s - r * n;
				return a ? (a = 1 / a, e[0] = s * a, e[1] = -n * a, e[2] = -r * a, e[3] = i * a, e) : null
			}, r.adjoint = function(e, t) {
				var i = t[0];
				return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = i, e
			}, r.determinant = function(e) {
				return e[0] * e[3] - e[2] * e[1]
			}, r.mul = r.
			multiply = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = i[0],
					h = i[1],
					u = i[2],
					c = i[3];
				return e[0] = n * o + r * u, e[1] = n * h + r * c, e[2] = s * o + a * u, e[3] = s * h + a * c, e
			}, r.rotate = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = Math.sin(i),
					h = Math.cos(i);
				return e[0] = n * h + r * o, e[1] = n * -o + r * h, e[2] = s * h + a * o, e[3] = s * -o + a * h, e
			}, r.scale = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = i[0],
					h = i[1];
				return e[0] = n * o, e[1] = r * h, e[2] = s * o, e[3] = a * h, e
			}, r.str = function(e) {
				return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
			}, void 0 !== e && (e.mat2 = r);
			var a = {},
				o = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
			if (!P) P = 1e-6;
			a.create = function() {
				return new Float32Array(o)
			}, a.clone = function(e) {
				var t = new Float32Array(9);
				return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
			}, a.copy = function(e, t) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
			}, a.identity = function(e) {
				return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
			}, a.transpose = function(e, t) {
				if (e === t) {
					var i = t[1],
						n = t[2],
						r = t[5];
					e[1] = t[3], e[2] = t[6], e[3] = i, e[5] = t[7], e[6] = n, e[7] = r
				} else e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
				return e
			}, a.invert = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = t[4],
					o = t[5],
					h = t[6],
					u = t[7],
					c = t[8],
					l = c * a - o * u,
					d = -c * s + o * h,
					f = u * s - a * h,
					m = i * l + n * d + r * f;
				return m ? (m = 1 / m, e[0] = l * m, e[1] = (-c * n + r * u) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (c * i - r * h) * m, e[5] = (-o * i + r * s) * m, e[6] = f * m, e[7] = (-u * i + n * h) * m, e[8] = (a * i - n * s) * m, e) : null
			}, a.adjoint = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = t[4],
					o = t[5],
					h = t[6],
					u = t[7],
					c = t[8];
				return e[0] = a * c - o * u, e[1] = r * u - n * c, e[2] = n * o - r * a, e[3] = o * h - s * c, e[4] = i * c - r * h, e[5] = r * s - i * o, e[6] = s * u - a * h, e[7] = n * h - i * u, e[8] = i * a - n * s, e
			}, a.determinant = function(e) {
				var t = e[0],
					i = e[1],
					n = e[2],
					r = e[3],
					s = e[4],
					a = e[5],
					o = e[6],
					h = e[7],
					u = e[8];
				return t * (u * s - a * h) + i * (-u * r + a * o) + n * (h * r - s * o)
			}, a.mul = a.multiply = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = t[4],
					h = t[5],
					u = t[6],
					c = t[7],
					l = t[8],
					d = i[0],
					f = i[1],
					m = i[2],
					p = i[3],
					g = i[4],
					v = i[5],
					b = i[6],
					x = i[7],
					T = i[8];
				return e[0] = d * n + f * a + m * u, e[1] = d * r + f * o + m * c, e[2] = d * s + f * h + m * l, e[3] = p * n + g * a + v * u, e[4] = p * r + g * o + v * c, e[5] = p * s + g * h + v * l, e[6] = b * n + x * a + T * u, e[7] = b * r + x * o + T * c, e[8] = b * s + x * h + T * l, e
			}, a.str = function(e) {
				return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")"
			}, void 0 !== e && (e.mat3 = a);
			var S = {},
				l = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
			if (!P) P = 1e-6;
			S.create = function() {
				return new Float32Array(l)
			}, S.clone = function(e) {
				var t = new Float32Array(16);
				return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
			}, S.copy = function(e, t) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
			}, S.identity = function(e) {
				return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
			}, S.transpose = function(e, t) {
				if (e === t) {
					var i = t[1],
						n = t[2],
						r = t[3],
						s = t[6],
						a = t[7],
						o = t[11];
					e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = i, e[6] = t[9], e[7] = t[13], e[8] = n, e[9] = s, e[11] = t[14], e[12] = r, e[13] = a, e[14] = o
				} else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
				return e
			}, S.invert = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = t[4],
					o = t[5],
					h = t[6],
					u = t[7],
					c = t[8],
					l = t[9],
					d = t[10],
					f = t[11],
					m = t[12],
					p = t[13],
					g = t[14],
					v = t[15],
					b = i * o - n * a,
					x = i * h - r * a,
					T = i * u - s * a,
					E = n * h - r * o,
					w = n * u - s * o,
					S = r * u - s * h,
					R = c * p - l * m,
					y = c * g - d * m,
					C = c * v - f * m,
					_ = l * g - d * p,
					M = l * v - f * p,
					D = d * v - f * g,
					F = b * D - x * M + T * _ + E * C - w * y + S * R;
				return F ? (F = 1 / F, e[0] = (o * D - h * M + u * _) * F, e[1] = (r * M - n * D - s * _) * F, e[2] = (p * S - g * w + v * E) * F, e[3] = (d * w - l * S - f * E) * F, e[4] = (h * C - a * D - u * y) * F, e[5] = (i * D - r * C + s * y) * F, e[6] = (g * T - m * S - v * x) * F, e[7] = (c * S - d * T + f * x) * F, e[8] = (a * M - o * C + u * R) * F, e[9] = (n * C - i * M - s * R) * F, e[10] = (m * w - p * T + v * b) * F, e[11] = (l * T - c * w - f * b) * F, e[12] = (o * y - a * _ - h * R) * F, e[13] = (i * _ - n * y + r * R) * F, e[14] = (p * x - m * E - g * b) * F, e[15] = (c * E - l * x + d * b) * F, e) : null
			}, S.adjoint = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = t[4],
					o = t[5],
					h = t[6],
					u = t[7],
					c = t[8],
					l = t[9],
					d = t[10],
					f = t[11],
					m = t[12],
					p = t[13],
					g = t[14],
					v = t[15];
				return e[0] = o * (d * v - f * g) - l * (h * v - u * g) + p * (h * f - u * d), e[1] = -(n * (d * v - f * g) - l * (r * v - s * g) + p * (r * f - s * d)), e[2] = n * (h * v - u * g) - o * (r * v - s * g) + p * (r * u - s * h), e[3] = -(n * (h * f - u * d) - o * (r * f - s * d) + l * (r * u - s * h)), e[4] = -(a * (d * v - f * g) - c * (h * v - u * g) + m * (h * f - u * d)), e[5] = i * (d * v - f * g) - c * (r * v - s * g) + m * (r * f - s * d), e[6] = -(i * (h * v - u * g) - a * (r * v - s * g) + m * (r * u - s * h)), e[7] = i * (h * f - u * d) - a * (r * f - s * d) + c * (r * u - s * h), e[8] = a * (l * v - f * p) - c * (o * v - u * p) + m * (o * f - u * l), e[9] = -(i * (l * v - f * p) - c * (n * v - s * p) + m * (n * f - s * l)), e[10] = i * (o * v - u * p) - a * (n * v - s * p) + m * (n * u - s * o), e[11] = -(i * (o * f - u * l) - a * (n * f - s * l) + c * (n * u - s * o)), e[12] = -(a * (l * g - d * p) - c * (o * g - h * p) + m * (o * d - h * l)), e[13] = i * (l * g - d * p) - c * (n * g - r * p) + m * (n * d - r * l), e[14] = -(i * (o * g - h * p) - a * (n * g - r * p) + m * (n * h - r * o)), e[15] = i * (o * d - h * l) - a * (n * d - r * l) + c * (n * h - r * o), e
			}, S.determinant = function(e) {
				var t = e[0],
					i = e[1],
					n = e[2],
					r = e[3],
					s = e[4],
					a = e[5],
					o = e[6],
					h = e[7],
					u = e[8],
					c = e[9],
					l = e[10],
					d = e[11],
					f = e[12],
					m = e[13],
					p = e[14],
					g = e[15];
				return (t * a - i * s) * (l * g - d * p) - (t * o - n * s) * (c * g - d * m) + (t * h - r * s) * (c * p - l * m) + (i * o - n * a) * (u * g - d * f) - (i * h - r * a) * (u * p - l * f) + (n * h - r * o) * (u * m - c * f)
			}, S.mul = S.multiply = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = t[4],
					h = t[5],
					u = t[6],
					c = t[7],
					l = t[8],
					d = t[9],
					f = t[10],
					m = t[11],
					p = t[12],
					g = t[13],
					v = t[14],
					b = t[15],
					x = i[0],
					T = i[1],
					E = i[2],
					w = i[3];
				return e[0] = x * n + T * o + E * l + w * p, e[1] = x * r + T * h + E * d + w * g, e[2] = x * s + T * u + E * f + w * v, e[3] = x * a + T * c + E * m + w * b, x = i[4], T = i[5], E = i[6], w = i[7], e[4] = x * n + T * o + E * l + w * p, e[5] = x * r + T * h + E * d + w * g, e[6] = x * s + T * u + E * f + w * v, e[7] = x * a + T * c + E * m + w * b, x = i[8], T = i[9], E = i[10], w = i[11], e[8] = x * n + T * o + E * l + w * p, e[9] = x * r + T * h + E * d + w * g, e[10] = x * s + T * u + E * f + w * v, e[11] = x * a + T * c + E * m + w * b, x = i[12], T = i[13], E = i[14], w = i[15], e[12] = x * n + T * o + E * l + w * p, e[13] = x * r + T * h + E * d + w * g, e[14] = x * s + T * u + E * f + w * v, e[15] = x * a + T * c + E * m + w * b, e
			}, S.translate = function(e, t, i) {
				var n, r, s, a, o, h, u, c, l, d, f, m, p = i[0],
					g = i[1],
					v = i[2];
				return e[15] = t === e ? (e[12] = t[0] * p + t[4] * g + t[8] * v + t[12], e[13] = t[1] * p + t[5] * g + t[9] * v + t[13], e[14] = t[2] * p + t[6] * g + t[10] * v + t[14], t[3] * p + t[7] * g + t[11] * v + t[15]) : (n = t[0], r = t[1], s = t[2], a = t[3], o = t[4], h = t[5], u = t[6], c = t[7], l = t[8], d = t[9], f = t[10], m = t[11], e[0] = n, e[1] = r, e[2] = s, e[3] = a, e[4] = o, e[5] = h, e[6] = u, e[7] = c, e[8] = l, e[9] = d, e[10] = f, e[11] = m, e[12] = n * p + o * g + l * v + t[12], e[13] = r * p + h * g + d * v + t[13], e[14] = s * p + u * g + f * v + t[14], a * p + c * g + m * v + t[15]), e
			}, S.scale = function(e, t, i) {
				var n = i[0],
					r = i[1],
					s = i[2];
				return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * s, e[9] = t[9] * s, e[10] = t[10] * s, e[11] = t[11] * s, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
			}, S.rotate = function(e, t, i, n) {
				var r, s, a, o, h, u, c, l, d, f, m, p, g, v, b, x, T, E, w, S, R, y, C, _, M = n[0],
					D = n[1],
					F = n[2],
					A = Math.sqrt(M * M + D * D + F * F);
				return Math.abs(A) < P ? null : (M *= A = 1 / A, D *= A, F *= A, r = Math.sin(i), a = 1 - (s = Math.cos(i)), o = t[0], h = t[1], u = t[2], c = t[3], l = t[4], d = t[5], f = t[6], m = t[7], p = t[8], g = t[9], v = t[10], b = t[11], x = M * M * a + s, T = D * M * a + F * r, E = F * M * a - D * r, w = M * D * a - F * r, S = D * D * a + s, R = F * D * a + M * r, y = M * F * a + D * r, C = D * F * a - M * r, _ = F * F * a + s, e[0] = o * x + l * T + p * E, e[1] = h * x + d * T + g * E, e[2] = u * x + f * T + v * E, e[3] = c * x + m * T + b * E, e[4] = o * w + l * S + p * R, e[5] = h * w + d * S + g * R, e[6] = u * w + f * S + v * R, e[7] = c * w + m * S + b * R, e[8] = o * y + l * C + p * _, e[9] = h * y + d * C + g * _, e[10] = u * y + f * C + v * _, e[11] = c * y + m * C + b * _, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e)
			}, S.rotateX = function(e, t, i) {
				var n = Math.sin(i),
					r = Math.cos(i),
					s = t[4],
					a = t[5],
					o = t[6],
					h = t[7],
					u = t[8],
					c = t[9],
					l = t[10],
					d = t[11];
				return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = s * r + u * n, e[5] = a * r + c * n, e[6] = o * r + l * n, e[7] = h * r + d * n, e[8] = u * r - s * n, e[9] = c * r - a * n, e[10] = l * r - o * n, e[11] = d * r - h * n, e
			}, S.rotateY = function(e, t, i) {
				var n = Math.sin(i),
					r = Math.cos(i),
					s = t[0],
					a = t[1],
					o = t[2],
					h = t[3],
					u = t[8],
					c = t[9],
					l = t[10],
					d = t[11];
				return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = s * r - u * n, e[1] = a * r - c * n, e[2] = o * r - l * n, e[3] = h * r - d * n, e[8] = s * n + u * r, e[9] = a * n + c * r, e[10] = o * n + l * r, e[11] = h * n + d * r, e
			}, S.rotateZ = function(e, t, i) {
				var n = Math.sin(i),
					r = Math.cos(i),
					s = t[0],
					a = t[1],
					o = t[2],
					h = t[3],
					u = t[4],
					c = t[5],
					l = t[6],
					d = t[7];
				return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = s * r + u * n, e[1] = a * r + c * n, e[2] = o * r + l * n, e[3] = h * r + d * n, e[4] = u * r - s * n, e[5] = c * r - a * n, e[6] = l * r - o * n, e[7] = d * r -
					h * n, e
			}, S.fromRotationTranslation = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = n + n,
					h = r + r,
					u = s + s,
					c = n * o,
					l = n * h,
					d = n * u,
					f = r * h,
					m = r * u,
					p = s * u,
					g = a * o,
					v = a * h,
					b = a * u;
				return e[0] = 1 - (f + p), e[1] = l + b, e[2] = d - v, e[3] = 0, e[4] = l - b, e[5] = 1 - (c + p), e[6] = m + g, e[7] = 0, e[8] = d + v, e[9] = m - g, e[10] = 1 - (c + f), e[11] = 0, e[12] = i[0], e[13] = i[1], e[14] = i[2], e[15] = 1, e
			}, S.frustum = function(e, t, i, n, r, s, a) {
				var o = 1 / (i - t),
					h = 1 / (r - n),
					u = 1 / (s - a);
				return e[0] = 2 * s * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 2 * s * h, e[6] = 0, e[7] = 0, e[8] = (i + t) * o, e[9] = (r + n) * h, e[10] = (a + s) * u, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = a * s * 2 * u, e[15] = 0, e
			}, S.perspective = function(e, t, i, n, r) {
				var s = 1 / Math.tan(t / 2),
					a = 1 / (n - r);
				return e[0] = s / i, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = (r + n) * a, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = 2 * r * n * a, e[15] = 0, e
			}, S.ortho = function(e, t, i, n, r, s, a) {
				var o = 1 / (t - i),
					h = 1 / (n - r),
					u = 1 / (s - a);
				return e[0] = -2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * h, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * u, e[11] = 0, e[12] = (t + i) * o, e[13] = (r + n) * h, e[14] = (a + s) * u, e[15] = 1, e
			}, S.lookAt = function(e, t, i, n) {
				var r, s, a, o, h, u, c, l, d, f, m = t[0],
					p = t[1],
					g = t[2],
					v = n[0],
					b = n[1],
					x = n[2],
					T = i[0],
					E = i[1],
					w = i[2];
				return Math.abs(m - T) < P && Math.abs(p - E) < P && Math.abs(g - w) < P ? S.identity(e) : (c = m - T, l = p - E, d = g - w, r = b * (d *= f = 1 / Math.sqrt(c * c + l * l + d * d)) - x * (l *= f), s = x * (c *= f) - v * d, a = v * l - b * c, (f = Math.sqrt(r * r + s * s + a * a)) ? (r *= f = 1 / f, s *= f, a *= f) : a = s = r = 0, o = l * a - d * s, h = d * r - c * a, u = c * s - l * r, (f = Math.sqrt(o * o + h * h + u * u)) ? (o *= f = 1 / f, h *= f, u *= f) : u = h = o = 0, e[0] = r, e[1] = o, e[2] = c, e[3] = 0, e[4] = s, e[5] = h, e[6] = l, e[7] = 0, e[8] = a, e[9] = u, e[10] = d, e[11] = 0, e[12] = -(r * m + s * p + a * g), e[13] = -(o * m + h * p + u * g), e[14] = -(c * m + l * p + d * g), e[15] = 1, e)
			}, S.str = function(e) {
				return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
			}, void 0 !== e && (e.mat4 = S);
			var d = {},
				f = new Float32Array([0, 0, 0, 1]);
			if (!P) P = 1e-6;
			d.create = function() {
				return new Float32Array(f)
			}, d.clone = n.clone, d.fromValues = n.fromValues, d.copy = n.copy, d.set = n.set, d.identity = function(e) {
				return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
			}, d.setAxisAngle = function(e, t, i) {
				i *= .5;
				var n = Math.sin(i);
				return e[0] = n * t[0], e[1] = n * t[1], e[2] = n * t[2], e[3] = Math.cos(i), e
			}, d.add = n.add, d.mul = d.multiply = function(e, t, i) {
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = i[0],
					h = i[1],
					u = i[2],
					c = i[3];
				return e[0] = n * c + a * o + r * u - s * h, e[1] = r * c + a * h + s * o - n * u, e[2] = s * c + a * u + n * h - r * o, e[3] = a * c - n * o - r * h - s * u, e
			}, d.scale = n.scale, d.rotateX = function(e, t, i) {
				i *= .5;
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = Math.sin(i),
					h = Math.cos(i);
				return e[0] = n * h + a * o, e[1] = r * h + s * o, e[2] = s * h - r * o, e[3] = a * h - n * o, e
			}, d.rotateY = function(e, t, i) {
				i *= .5;
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = Math.sin(i),
					h = Math.cos(i);
				return e[0] = n * h - s * o, e[1] = r * h + a * o, e[2] = s * h + n * o, e[3] = a * h - r * o, e
			}, d.rotateZ = function(e, t, i) {
				i *= .5;
				var n = t[0],
					r = t[1],
					s = t[2],
					a = t[3],
					o = Math.sin(i),
					h = Math.cos(i);
				return e[0] = n * h + r * o, e[1] = r * h - n * o, e[2] = s * h + a * o, e[3] = a * h - s * o, e
			}, d.calculateW = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2];
				return e[0] = i, e[1] = n, e[2] = r, e[3] = -Math.sqrt(Math.abs(1 - i * i - n * n - r * r)), e
			}, d.dot = n.dot, d.lerp = n.lerp, d.slerp = function(e, t, i, n) {
				var r, s, a, o, h = t[0],
					u = t[1],
					c = t[2],
					l = t[3],
					d = i[0],
					f = i[1],
					m = i[2],
					p = t[3],
					g = h * d + u * f + c * m + l * p;
				return 1 <= Math.abs(g) ? (e !== t && (e[0] = h, e[1] = u, e[2] = c, e[3] = l), e) : (r = Math.acos(g), s = Math.sqrt(1 - g * g), Math.abs(s) < .001 ? (e[0] = .5 * h + .5 * d, e[1] = .5 * u + .5 * f, e[2] = .5 * c + .5 * m, e[3] = .5 * l + .5 * p) : (a = Math.sin((1 - n) * r) / s, o = Math.sin(n * r) / s, e[0] = h * a + d * o, e[1] = u * a + f * o, e[2] = c * a + m * o, e[3] = l * a + p * o), e)
			}, d.invert = function(e, t) {
				var i = t[0],
					n = t[1],
					r = t[2],
					s = t[3],
					a = i * i + n * n + r * r + s * s,
					o = a ? 1 / a : 0;
				return e[0] = -i * o, e[1] = -n * o, e[2] = -r * o, e[3] = s * o, e
			}, d.conjugate = function(e, t) {
				return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e
			}, d.len = d.length = n.length, d.sqrLen = d.squaredLength = n.squaredLength, d.normalize = n.normalize, d.str = function(e) {
				return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
			}, void 0 !== e && (e.quat = d)
		}(e.exports)
}();
var EPSILON = 1e-6;

function lerp(e, t, i) {
	return e + (t - e) * i
}

function clampAngle(e, t, i) {
	return e < -2 * Math.PI && (e += 2 * Math.PI), e > 2 * Math.PI && (e -= 2 * Math.PI), e = Math.max(t, e), e = Math.min(i, e)
}

function nextLowestPowerOfTwo(e) {
	return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(e) / Math.log(2))), 2048), 1)
}

function nextHighestPowerOfTwo(e) {
	return Math.max(Math.min(Math.pow(2, Math.ceil(Math.log(e) / Math.log(2))), 2048), 1)
}

function FrakCallback(e, t) {
	return function() {
		return t.apply(e, arguments)
	}
}
mat3.normalize = function(e, t) {
		var i;
		return i = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]), e[0] = t[0] / i, e[1] = t[1] / i, e[2] = t[2] / i, i = Math.sqrt(t[3] * t[3] + t[4] * t[4] + t[5] * t[5]), e[3] = t[3] / i, e[4] = t[4] / i, e[5] = t[5] / i, i = Math.sqrt(t[6] * t[6] + t[7] * t[7] + t[8] * t[8]), e[6] = t[6] / i, e[7] = t[7] / i, e[8] = t[8] / i, e
	}, mat4.submat3 = function(e, t, i) {
		return e[0] = t[0 + i[0] + 4 * i[1]], e[1] = t[1 + i[0] + 4 * i[1]], e[2] = t[2 + i[0] + 4 * i[1]], e[3] = t[4 + i[0] + 4 * i[1]], e[4] = t[5 + i[0] + 4 * i[1]], e[5] = t[6 + i[0] + 4 * i[1]], e[6] = t[8 + i[0] + 4 * i[1]], e[7] = t[9 + i[0] + 4 * i[1]], e[8] = t[10 + i[0] + 4 * i[1]], e
	}, mat4.setsubmat3 = function(e, t, i) {
		return e[0 + i[0] + 4 * i[1]] = t[0], e[1 + i[0] + 4 * i[1]] = t[1], e[2 + i[0] + 4 * i[1]] = t[2], e[4 + i[0] + 4 * i[1]] = t[3], e[5 + i[0] + 4 * i[1]] = t[4], e[6 + i[0] + 4 * i[1]] = t[5], e[8 + i[0] + 4 * i[1]] = t[6], e[9 + i[0] + 4 * i[1]] = t[7], e[10 + i[0] + 4 * i[1]] = t[8], e
	}, mat4.rotation = function(e, t) {
		return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = 0, e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = 0, e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
	}, mat4.translation = function(e, t) {
		return e[0] = t[12], e[1] = t[13], e[2] = t[14], e
	}, mat4.getScale = function(e, t) {
		return e[0] = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]), e[1] = Math.sqrt(t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7]), e[2] = Math.sqrt(t[8] * t[8] + t[9] * t[9] + t[10] * t[10] + t[11] * t[11]), e
	}, mat4.normalize = function(e, t) {
		var i;
		return i = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]), e[0] = t[0] / i, e[1] = t[1] / i, e[2] = t[2] / i, e[3] = t[3] / i, i = Math.sqrt(t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7]), e[4] = t[4] / i, e[5] = t[5] / i, e[6] = t[6] / i, e[7] = t[7] / i, i = Math.sqrt(t[8] * t[8] + t[9] * t[9] + t[10] * t[10] + t[11] * t[11]), e[8] = t[8] / i, e[9] = t[9] / i, e[10] = t[10] / i, e[11] = t[11] / i, i = Math.sqrt(t[12] * t[12] + t[13] * t[13] + t[14] * t[14] + t[15] * t[15]), e[12] = t[12] / i, e[13] = t[13] / i, e[14] = t[14] / i, e[15] = t[15] / i, e
	}, mat4.fromRotationTranslationScale = function(e, t, i, n) {
		return mat4.fromRotationTranslation(e, t, i), mat4.scale(e, e, n), e
	}, mat4.fromTranslation = function(e, t) {
		return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e
	}, mat4.decompose = function(e, t, i, n) {
		mat4.translation(e, n), quat.fromMat4(t, n), mat4.getScale(i, n)
	}, mat4.isIdentity = function(e) {
		return !(Math.abs(e[0] - 1) > EPSILON) && (!(Math.abs(e[5] - 1) > EPSILON) && (!(Math.abs(e[10] - 1) > EPSILON) && (!(Math.abs(e[15] - 1) > EPSILON) && (!(Math.abs(e[1]) > EPSILON) && (!(Math.abs(e[2]) > EPSILON) && (!(Math.abs(e[3]) > EPSILON) && (!(Math.abs(e[4]) > EPSILON) && (!(Math.abs(e[6]) > EPSILON) && (!(Math.abs(e[7]) > EPSILON) && (!(Math.abs(e[8]) > EPSILON) && (!(Math.abs(e[9]) > EPSILON) && (!(Math.abs(e[11]) > EPSILON) && (!(Math.abs(e[12]) > EPSILON) && (!(Math.abs(e[13]) > EPSILON) && !(Math.abs(e[14]) > EPSILON)))))))))))))))
	}, quat.euler = function(e, t, i, n) {
		var r = 2 * Math.PI / 360,
			s = quat.create(),
			a = vec3.fromValues(0, 0, 1);
		return quat.setAxisAngle(e, a, r * n), vec3.set(a, 0, 1, 0), quat.setAxisAngle(s, a, r * i), quat.mul(e, e, s), vec3.set(a, 1, 0, 0), quat.setAxisAngle(s, a, r * t), quat.mul(e, e, s), e
	}, quat.getEuler = function(i, e) {
		var n = 360 / (2 * Math.PI),
			r = mat4.fromRotationTranslation(mat4.create(), e, [0, 0, 0]),
			t = function(e, t) {
				return Math.abs(e - t) <= EPSILON
			};
		if (t(Math.abs(r[2]), 1)) t(r[2], -1) ? (i[0] = 0, i[1] = 90, i[2] = -n * Math.atan2(r[4], r[8])) : (i[0] = 0, i[1] = -90, i[2] = n * Math.atan2(-r[4], -r[8]));
		else {
			var s = function(e) {
					var t = Math.cos(e);
					i[0] = Math.atan2(r[6] / t, r[10] / t) * n, i[1] = e * n, i[2] = Math.atan2(r[1] / t, r[0] / t) * n
				},
				a = -Math.asin(r[2]);
			s(a),
				function(e, t) {
					var i = quat.euler(quat.create(), t[0], t[1], t[2]);
					quat.normalize(i, i);
					var n = quat.rotationDifference(quat.create(), e, i);
					return Math.abs(1 - n[3]) < EPSILON
				}(e, i) || s(a = Math.PI - a)
		}
		return i
	}, quat.fromMat3 = function(e, t) {
		var i = t[0] + t[4] + t[8];
		if (EPSILON < i) {
			var n = 2 * Math.sqrt(1 + i);
			e[3] = .25 * n, e[0] = (t[5] - t[7]) / n, e[1] = (t[6] - t[2]) / n, e[2] = (t[1] - t[3]) / n
		} else if (t[0] > t[4] && t[0] > t[8]) {
			n = 2 * Math.sqrt(1 + t[0] - t[4] - t[8]);
			e[3] = (t[5] - t[7]) / n, e[0] = .25 * n, e[1] = (t[1] + t[3]) / n, e[2] = (t[6] + t[2]) / n
		} else if (t[4] > t[8]) {
			n = 2 * Math.sqrt(1 + t[4] - t[0] - t[8]);
			e[3] = (t[6] - t[2]) / n, e[0] = (t[1] + t[3]) / n, e[1] = .25 * n, e[2] = (t[5] + t[7]) / n
		} else {
			n = 2 * Math.sqrt(1 + t[8] - t[0] - t[4]);
			e[3] = (t[1] - t[3]) / n, e[0] = (t[6] + t[2]) / n, e[1] = (t[5] + t[7]) / n, e[2] = .25 * n
		}
		return e
	}, quat.fromMat4 = function(e, t) {
		var i = mat4.submat3(mat3.create(), t, [0, 0]);
		return mat3.normalize(i, i), quat.fromMat3(e, i), quat.normalize(e, e), e
	}, quat.rotationDifference = function(e, t, i) {
		return quat.multiply(e, i, quat.conjugate(quat.create(), t)), e
	}, quat.angle = function(e, t) {
		var i = e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
		return Math.abs(1 - i) < EPSILON && (i = 1), Math.abs(1 + i) < EPSILON && (i = -1), 2 * Math.acos(i)
	}, quat.slerp = function(e, t, i, n) {
		var r, s, a = t[0] * i[0] + t[1] * i[1] + t[2] * i[2] + t[3] * i[3];
		if (Math.abs(1 - a) < EPSILON && (a = 1), Math.abs(1 + a) < EPSILON && (a = -1), 1 - Math.abs(a) > EPSILON) {
			var o = Math.acos(Math.abs(a)),
				h = Math.sin(o);
			r = Math.sin((1 - n) * o / h), s = Math.sin(n * o / h)
		} else r = 1 - n, s = n;
		a < 0 && (s = -s);
		var u = quat.scale(quat.create(), t, r),
			c = quat.scale(quat.create(), i, s);
		return quat.add(e, u, c), e
	}, quat.getTwist = function(e, t) {
		var i = vec3.create(),
			n = vec3.transformQuat(vec3.create(), t, quat.euler(quat.create(), 90, 0, 0)),
			r = vec3.dot(t, n);
		.6 < Math.abs(r) && (n = vec3.transformQuat(t, quat.euler(quat.create(), 0, 90, 0))), vec3.normalize(n, n), vec3.cross(i, t, n), vec3.normalize(i, i);
		var s = vec3.transformQuat(vec3.create(), i, e),
			a = vec3.sub(vec3.create(), s, vec3.scale(vec3.create(), t, vec3.dot(s, t)));
		return vec3.normalize(a, a), Math.acos(vec3.dot(i, a))
	}, vec3.transformVertexArrayMat4 = function(e, t, i) {
		for (var n = 0, r = 0, s = 0, a = i; a < e.length; a += 3) n = e[a], r = e[a + 1], s = e[a + 2], e[a] = t[0] * n + t[4] * r + t[8] * s + t[12], e[a + 1] = t[1] * n + t[5] * r + t[9] * s + t[13], e[a + 2] = t[2] * n + t[6] * r + t[10] * s + t[14];
		return e
	}, vec3.transformVertexArrayQuat = function(e, t, i) {
		for (var n = 0, r = 0, s = 0, a = t[0], o = t[1], h = t[2], u = t[3], c = 0, l = 0, d = 0, f = 0, m = i; m < e.length; m += 3) n = e[m], r = e[m + 1], c = u * n + o * (s = e[m + 2]) - h * r, l = u * r + h * n - a * s, d = u * s + a * r - o * n, f = -a * n - o * r - h * s, e[m] = c * u + f * -a + l * -h - d * -o, e[m + 1] = l * u + f * -o + d * -a - c * -h, e[m + 2] = d * u + f * -h + c * -o - l * -a;
		return e
	}, vec3.scaleAndAdd = function(e, t, i, n) {
		return e[0] = t[0] + i[0] * n, e[1] = t[1] + i[1] * n, e[2] = t[2] + i[2] * n, e
	},
	function(a) {
		var o = {
				ArrayBuffer: "undefined" != typeof ArrayBuffer,
				DataView: "undefined" != typeof DataView && ("getFloat64" in DataView.prototype || "getFloat64" in new DataView(new ArrayBuffer(1))),
				NodeBuffer: "undefined" != typeof Buffer && "readInt16LE" in Buffer.prototype
			},
			h = {
				Int8: 1,
				Int16: 2,
				Int32: 4,
				Uint8: 1,
				Uint16: 2,
				Uint32: 4,
				Float32: 4,
				Float64: 8
			},
			u = {
				Int8: "Int8",
				Int16: "Int16",
				Int32: "Int32",
				Uint8: "UInt8",
				Uint16: "UInt16",
				Uint32: "UInt32",
				Float32: "Float",
				Float64: "Double"
			},
			c = function(e, t, i, n) {
				if (!(this instanceof c)) throw new Error("jDataView constructor may not be called as a function");
				if (this.buffer = e, !(o.NodeBuffer && e instanceof Buffer || o.ArrayBuffer && e instanceof ArrayBuffer || "string" == typeof e)) throw new TypeError("jDataView buffer has an incompatible type");
				this._isArrayBuffer = o.ArrayBuffer && e instanceof ArrayBuffer, this._isDataView = o.DataView && this._isArrayBuffer, this._isNodeBuffer = o.NodeBuffer && e instanceof Buffer, this._littleEndian = void 0 !== n && n;
				var r = this._isArrayBuffer ? e.byteLength : e.length;
				if (void 0 === t && (t = 0), this.byteOffset = t, void 0 === i && (i = r - t), this.byteLength = i, !this._isDataView) {
					if ("number" != typeof t) throw new TypeError("jDataView byteOffset is not a number");
					if ("number" != typeof i) throw new TypeError("jDataView byteLength is not a number");
					if (t < 0) throw new Error("jDataView byteOffset is negative");
					if (i < 0) throw new Error("jDataView byteLength is negative")
				}
				if (this._isDataView && (this._view = new DataView(e, t, i), this._start = 0), r < (this._start = t) + i) throw new Error("jDataView (byteOffset + byteLength) value is out of bounds");
				if (this._offset = 0, this._isDataView)
					for (var s in h) h.hasOwnProperty(s) && function(i, n) {
						var r = h[i];
						n["get" + i] = function(e, t) {
							return void 0 === t && (t = n._littleEndian), void 0 === e && (e = n._offset), n._offset = e + r, n._view["get" + i](e, t)
						}
					}(s, this);
				else if (this._isNodeBuffer && o.NodeBuffer)
					for (var s in h) {
						if (h.hasOwnProperty(s))(function(e, i, n) {
							var r = h[e];
							i["get" + e] = function(e, t) {
								return void 0 === t && (t = i._littleEndian), void 0 === e && (e = i._offset), i._offset = e + r, i.buffer[n](i._start + e)
							}
						})(s, this, "Int8" === s || "Uint8" === s ? "read" + u[s] : n ? "read" + u[s] + "LE" : "read" + u[s] + "BE")
					} else
						for (var s in h) h.hasOwnProperty(s) && function(i, n) {
							var r = h[i];
							n["get" + i] = function(e, t) {
								if (void 0 === t && (t = n._littleEndian), void 0 === e && (e = n._offset), n._offset = e + r, n._ isArrayBuffer && (n._start + e) % r == 0 && (1 === r || t)) return new a[i + "Array"](n.buffer, n._start + e, 1)[0];
								if ("number" != typeof e) throw new TypeError("jDataView byteOffset is not a number");
								if (e + r > n.byteLength) throw new Error("jDataView (byteOffset + size) value is out of bounds");
								return n["_get" + i](n._start + e, t)
							}
						}(s, this)
			};
		if (c.createBuffer = o.NodeBuffer ? function() {
				for (var e = new Buffer(arguments.length), t = 0; t < arguments.length; ++t) e[t] = arguments[t];
				return e
			} : o.ArrayBuffer ? function() {
				for (var e = new ArrayBuffer(arguments.length), t = new Int8Array(e), i = 0; i < arguments.length; ++i) t[i] = arguments[i];
				return e
			} : function() {
				return String.fromCharCode.apply(null, arguments)
			}, c.prototype = {
				compatibility: o,
				getString: function(e, t) {
					var i;
					if (void 0 === t && (t = this._offset), "number" != typeof t) throw new TypeError("jDataView byteOffset is not a number");
					if (e < 0 || t + e > this.byteLength) throw new Error("jDataView length or (byteOffset+length) value is out of bounds");
					if (this._isNodeBuffer) i = this.buffer.toString("ascii", this._start + t, this._start + t + e);
					else {
						i = "";
						for (var n = 0; n < e; ++n) {
							var r = this.getUint8(t + n);
							i += String.fromCharCode(127 < r ? 65533 : r)
						}
					}
					return this._offset = t + e, i
				},
				getChar: function(e) {
					return this.getString(1, e)
				},
				tell: function() {
					return this._offset
				},
				seek: function(e) {
					if ("number" != typeof e) throw new TypeError("jDataView byteOffset is not a number");
					if (e < 0 || e > this.byteLength) throw new Error("jDataView byteOffset value is out of bounds");
					return this._offset = e
				},
				_endianness: function(e, t, i, n) {
					return e + (n ? i - t - 1 : t)
				},
				_getFloat64: function(e, t) {
					var i = this._getUint8(this._endianness(e, 0, 8, t)),
						n = this._getUint8(this._endianness(e, 1, 8, t)),
						r = this._getUint8(this._endianness(e, 2, 8, t)),
						s = this._getUint8(this._endianness(e, 3, 8, t)),
						a = this._getUint8(this._endianness(e, 4, 8, t)),
						o = this._getUint8(this._endianness(e, 5, 8, t)),
						h = this._getUint8(this._endianness(e, 6, 8, t)),
						u = this._getUint8(this._endianness(e, 7, 8, t)),
						c = 1 - 2 * (i >> 7),
						l = ((i << 1 & 255) << 3 | n >> 4) - (Math.pow(2, 10) - 1),
						d = (15 & n) * Math.pow(2, 48) + r * Math.pow(2, 40) + s * Math.pow(2, 32) + a * Math.pow(2, 24) + o * Math.pow(2, 16) + h * Math.pow(2, 8) + u;
					return 1024 === l ? 0 !== d ? NaN : c * (1 / 0) : -1023 === l ? c * d * Math.pow(2, -1074) : c * (1 + d * Math.pow(2, -52)) * Math.pow(2, l)
				},
				_getFloat32: function(e, t) {
					var i = this._getUint8(this._endianness(e, 0, 4, t)),
						n = this._getUint8(this._endianness(e, 1, 4, t)),
						r = 1 - 2 * (i >> 7),
						s = (i << 1 & 255 | n >> 7) - 127,
						a = (127 & n) << 16 | this._getUint8(this._endianness(e, 2, 4, t)) << 8 | this._getUint8(this._endianness(e, 3, 4, t));
					return 128 === s ? 0 !== a ? NaN : r * (1 / 0) : -127 === s ? r * a * Math.pow(2, -149) : r * (1 + a * Math.pow(2, -23)) * Math.pow(2, s)
				},
				_getInt32: function(e, t) {
					var i = this._getUint32(e, t);
					return i > Math.pow(2, 31) - 1 ? i - Math.pow(2, 32) : i
				},
				_getUint32: function(e, t) {
					var i = this._getUint8(this._endianness(e, 0, 4, t)),
						n = this._getUint8(this._endianness(e, 1, 4, t)),
						r = this._getUint8(this._endianness(e, 2, 4, t)),
						s = this._getUint8(this._endianness(e, 3, 4, t));
					return i * Math.pow(2, 24) + (n << 16) + (r << 8) + s
				},
				_getInt16: function(e, t) {
					var i = this._getUint16(e, t);
					return i > Math.pow(2, 15) - 1 ? i - Math.pow(2, 16) : i
				},
				_getUint16: function(e, t) {
					return (this._getUint8(this._endianness(e, 0, 2, t)) << 8) + this._getUint8(this._endianness(e, 1, 2, t))
				},
				_getInt8: function(e) {
					var t = this._getUint8(e);
					return t > Math.pow(2, 7) - 1 ? t - Math.pow(2, 8) : t
				},
				_getUint8: function(e) {
					return this._isArrayBuffer ? new Uint8Array(this.buffer, e, 1)[0] : this._isNodeBuffer ? this.buffer[e] : 255 & this.buffer.charCodeAt(e)
				}
			}, "undefined" != typeof jQuery && "1.6.2" <= jQuery.fn.jquery) {
			jQuery.ajaxSetup({
				converters: {
					"* dataview": function(e) {
						return new c(e)
					}
				},
				accepts: {
					dataview: "text/plain; charset=x-user-defined"
				},
				responseHandler: {
					dataview: function(e, t, i) {
						"mozResponseArrayBuffer" in i ? e.text = i.mozResponseArrayBuffer : "responseType" in i && "arraybuffer" === i.responseType && i.response ? e.text = i.response : e.text = "responseBody" in i ? function(t) {
							var i;
							try {
								i = IEBinaryToArray_ByteStr(t)
							} catch (e) {
								window.execScript("Function IEBinaryToArray_ByteStr(Binary)\r\n\tIEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n\tDim lastIndex\r\n\tlastIndex = LenB(Binary)\r\n\tif lastIndex mod 2 Then\r\n\t\tIEBinaryToArray_ByteStr_Last = AscB( MidB( Binary, lastIndex, 1 ) )\r\n\tElse\r\n\t\
tIEBinaryToArray_ByteStr_Last = -1\r\n\tEnd If\r\nEnd Function\r\n", "vbscript"), i = IEBinaryToArray_ByteStr(t)
							}
							for (var e, n = IEBinaryToArray_ByteStr_Last(t), r = "", s = 0, a = i.length % 8; s < a;) e = i.charCodeAt(s++), r += String.fromCharCode(255 & e, e >> 8);
							for (a = i.length; s < a;) r += String.fromCharCode(255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8, 255 & (e = i.charCodeAt(s++)), e >> 8);
							return -1 < n && (r += String.fromCharCode(n)), r
						}(i.responseBody) : i.responseText
					}
				}
			}), jQuery.ajaxPrefilter("dataview", function(e, t, i) {
				jQuery.support.ajaxResponseType && (e.hasOwnProperty("xhrFields") || (e.xhrFields = {}), e.xhrFields.responseType = "arraybuffer"), e.mimeType = "text/plain; charset=x-user-defined"
			})
		}
		a.jDataView = (a.module || {}).exports = c, "undefined" != typeof module && (module.exports = c)
	}(this),
	function() {
		var i = !1,
			n = /\b_super\b/;
		this.FrakClass = function() {}, FrakClass.extend = function(o) {
			var r = this.prototype;
			i = !0;
			var h = new this;
			for (var e in i = !1, o) h[e] = "function" == typeof o[e] && "function" == typeof r[e] && n.test(o[e]) ? function(i, n) {
				return function() {
					var e = this._super;
					this._super = r[i];
					var t = n.apply(this, arguments);
					return this._super = e, t
				}
			}(e, o[e]) : o[e];

			function t() {
				!i && this.init && this.init.apply(this, arguments)
			}
			return h._getset = function(t, e) {
				var i, n, r, s = function() {
						return t
					},
					a = function(e) {
						t = e
					};
				h[i = "get" + e] = i in o ? (n = o[i], function() {
					var e = this._super;
					this._super = s;
					var t = n.apply(this, arguments);
					return this._super = e, t
				}) : s, h[i = "set" + e] = i in o ? (r = o[i], function() {
					var e = this._super;
					this._super = a;
					var t = r.apply(this, arguments);
					return this._super = e, t
				}) : a
			}, ((t.prototype = h).constructor = t).extend = arguments.callee, t
		}
	}(), window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
		window.setTimeout(e, 16)
	}, window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
		clearTimeout(e)
	}), "function" != typeof String.prototype.format && (String.prototype.format = function() {
		var i = arguments;
		return this.replace(/{(\d+)}/g, function(e, t) {
			return void 0 !== i[t] ? i[t] : e
		})
	}), "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(e) {
		return -1 !== this.indexOf(e, this.length - e.length)
	});
var Logistics = function() {
	var t = !1;
	"undefined" != typeof window && (t = "localStorage" in window && null !== window.localStorage);
	var a = [],
		r = [],
		s = 0,
		i = null,
		n = null,
		e = null,
		o = {
			loadFromLocalStorage: !1,
			storeToLocalStorage: !1,
			loadFromFile: !1,
			enableCORS: !0,
			useCookies: !1,
			fallbackFromStorage: !1
		},
		h = {
			text: {
				load: function(e) {
					b(e)
				},
				parse: function(e, t) {
					e.data = t.responseText
				},
				store: function(e) {
					return e.data
				},
				restore: function(e, t) {
					return t
				}
			},
			json: {
				load: function(e) {
					b(e)
				},
				parse: function(t, e) {
					try {
						t.data = JSON.parse(e.responseText)
					} catch (e) {
						"undefined" != typeof console && console.error && console.error("JSON parsing failed for " + t.url, e)
					}
				},
				store: function(e) {
					return JSON.stringify(e.data)
				},
				restore: function(e, t) {
					return t ? JSON.parse(t) : {}
				}
			},
			xml: {
				load: function(e) {
					b(e)
				},
				parse: function(e, t) {
					t.responseXML ? e.data = t.responseXML : e.data = x(t.responseText)
				},
				store: function(e) {
					return XMLSerializer ? (new XMLSerializer).serializeToString(e.data) : ""
				},
				restore: function(e, t) {
					return x(t)
				}
			},
			image: {
				load: function(e) {
					e && (e.data = new Image, e.useCORS && (e.data.crossOrigin = "Anonymous"), e.data.onload = function() {
						e.ready()
					}, e.data.onerror = function() {
						e.failed()
					}, e.data.src = e.url)
				},
				parse: function(e) {},
				store: function(e) {
					var t = document.createElement("canvas");
					t.width = e.data.width, t.height = e.data.height, t.getContext("2d").drawImage(e.data, 0, 0);
					var i = t.toDataURL("image/png");
					return t = null, i
				},
				restore: function(e, t) {
					var i = new Image;
					return i.src = t, i
				}
			},
			binary: {
				load: function(e) {
					b(e)
				},
				parse: function(e, t) {
					e.data = t.response
				},
				store: function(e) {
					for (var t = "", i = new Uint8Array(e.data), n = i.byteLength, r = 0; r < n; r++) t += String.fromCharCode(i[r]);
					return window.btoa(t)
				},
				restore: function(e, t) {
					for (var i = new ArrayBuffer(2 * t.length), n = new Uint16Array(i), r = 0, s = t.length; r < s; r++) n[r] = t.charCodeAt(r);
					return i
				}
			}
		},
		u = function(e, t, i, n, r) {
			this.url = e, this.params = t, this.success = i, this.
			dataType = n, this.loaded = !1, this.data = !1, this.requestType = r, this.useCORS = !1, this.options = {}, this.successCallback = i, this.errorCallback = !1, this.alwaysCallback = !1, this.progressCallback = !1, this.setOption = function(e, t) {
				this.options[e] = t
			}, this.getOption = function(e) {
				return this.options[e]
			}, this.ready = function() {
				this.loaded = !0, s++, S(this), y()
			}, this.failed = function() {
				s++, y(), R(this)
			}, this.done = function(e) {
				this.successCallback = e
			}, this.fail = function(e) {
				this.errorCallback = e
			}, this.error = function(e) {
				this.errorCallback = e
			}, this.always = function(e) {
				this.alwaysCallback = e
			}, this.progress = function(e) {
				this.progressCallback = e
			}, this.toString = function() {
				return this.data
			}
		},
		c = function(e, t) {
			this.urls = e, this.results = {}, this.loadedCount = 0, this.count = 0, this.successCallback = t, this.load = function() {
				var e = null,
					t = null;
				for (var i in this.urls) this.urls.hasOwnProperty(i) && this.count++;
				for (var n in this.urls)(t = this.urls[n]) && t.url && t.type && ((e = l(t.url, void 0, M(this, this.ready, n), t.type)).setOption("logistics.multi.key", n), e.fail(M(this, this.fail)))
			}, this.ready = function(e, t, i) {
				var n = i.getOption("logistics.multi.key");
				this.results[n] = e, this.loadedCount++, this.checkIfAllReady()
			}, this.fail = function(e) {
				this.loadedCount++, this.checkIfAllReady()
			}, this.getKeyForURL = function(e) {}, this.checkIfAllReady = function() {
				this.loadedCount >= this.count && "function" == typeof this.successCallback && this.successCallback(this.results)
			}
		},
		l = function(e, t, i, n) {
			var r = "GET";
			"function" == typeof t ? (i = t, t = void 0) : t && "object" == typeof t && (r = "POST");
			var s = new u(e, t, i, n, r);
			return o.enableCORS && (s.useCORS = d(e)), s && (a.push(s), f(s)), s
		},
		d = function(e) {
			if ("undefined" == typeof document) return !1;
			var t = e.match(/(https?:)?\/\/([^\/]+)\/(.*)/);
			return !!t && t[1] !== document.location.origin
		},
		f = function(e) {
			return m(e), !0
		},
		m = function(e) {
			o.loadFromLocalStorage && p(e) ? g(e) : v(e.dataType, "load")(e)
		},
		p = function(e) {
			return !(!t || null === localStorage.getItem(e.url))
		},
		g = function(e) {
			e.data = v(e.dataType, "restore")(e, w(e)), e.ready()
		},
		v = function(e, t) {
			return h && h[e] && h[e][t] ? h[e][t] : h && h[e] ? h[e] : function() {
				"undefined" != typeof console && console.warn && console.warn("Method " + t + " for " + e + " not found")
			}
		},
		b = function(e) {
			var t = T(e);
			if (!t || !e) throw "http failed";
			var i = e.url;
			t.open(e.requestType, i, !0), t.overrideMimeType && t.overrideMimeType("text/xml"), "binary" == e.dataType && (t.responseType = "arraybuffer", e.useCORS && t.setRequestHeader("Content-Type", "application/x-3dtechdata")), e.useCORS && o.useCookies && (t.withCredentials = !0), t.onreadystatechange = function() {
				4 == t.readyState ? 200 == t.status ? (e.loaded = !0, s++, v(e.dataType, "parse")(e, t), S(e)) : (s++, R(e)) : "function" == typeof e.progressCallback && e.progressCallback(t)
			}, t.ontimeout = function() {
				s++, R(e)
			}, y(), t.send(null)
		},
		x = function(e) {
			var t = null;
			if (!e || "string" != typeof e) return t;
			window.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : ((t = new ActiveXObject("Microsoft.XMLDOM")).async = !1, t.loadXML(e));
			if (!t || t.getElementsByTagName("parsererror").length) throw "XML parsing failed";
			return t
		},
		T = function(e) {
			var t = !1;
			if (e.useCORS && window.XDomainRequest) try {
				t = new XDomainRequest
			} catch (e) {
				t = !1
			} else if (XMLHttpRequest) try {
				t = new XMLHttpRequest
			} catch (e) {
				t = !1
			} else if ("undefined" != typeof ActiveXObject) try {
				t = new ActiveXObject("Msxml2.XMLHTTP"), alert(2)
			} catch (e) {
				try {
					t = new ActiveXObject("Microsoft.XMLHTTP"), alert(3)
				} catch (e) {
					t = !1
				}
			}
			return t
		},
		E = function(e) {
			if (t) try {
				localStorage[e.url] = v(e.dataType, "store")(e)
			} catch (e) {
				console.warn("localStorage limit exceeded")
			} else console.warn("localStorage isn't supported")
		},
		w = function(e) {
			return localStorage[e.url]
		},
		S = function(e) {
			e && "function" == typeof e.successCallback && (e.successCallback(e.data, "success", e), C()), e && o.storeToLocalStorage && E(e)
		},
		R = function(e) {
			e && o.fallbackFromStorage && p(e) ? g(e) : (e && "function" == typeof e.errorCallback && e.errorCallback(e, "error", ""), C())
		},
		y = function() {
			n && "function" == typeof n && a.length && s && n(s / a.length)
		},
		C = function() {
			null === e && (e = setTimeout(_, 5))
		},
		_ = function() {
			e = null, a.length == s && i && "function" == typeof i && i()
		},
		M = function(e, t) {
			return function() {
				return t.apply(e, arguments)
			}
		};
	return {
		count: function() {
			return a.length
		},
		loadedCount: function() {
			return s
		},
		clear: function() {
			a = [],
				s = 0, !(r = [])
		},
		get: function(e, t, i, n, r) {
			return l(e, t, i, toLowerCase(n))
		},
		getJSON: function(e, t, i, n) {
			return l(e, t, i, "json", n)
		},
		getImage: function(e, t, i, n) {
			return l(e, t, i, "image", n)
		},
		getBinary: function(e, t, i, n) {
			return l(e, t, i, "binary", n)
		},
		getXML: function(e, t, i, n) {
			return l(e, t, i, "xml", n)
		},
		getText: function(e, t, i, n) {
			return l(e, t, i, "text", n)
		},
		getMultiple: function(e, t, i) {
			var n;
			n = new c(e, t), r.push(n), n.load()
		},
		store: function() {
			! function() {
				if (t)
					for (var e in a) E(a[e]);
				else console.warn("localStorage isn't supported")
			}()
		},
		clearStorage: function() {
			localStorage.clear()
		},
		types: function() {
			return h
		},
		onFinishedLoading: function(e) {
			i = e
		},
		onProgress: function(e) {
			n = e
		},
		getQueue: function() {
			return a
		},
		getTypeFunction: function(e, t) {
			return v(e, t)
		},
		setTypeFunction: function(e, t) {
			return n = t, void((i = e) && n && (h[i] = n));
			var i, n
		},
		getOption: function(e) {
			return o[e]
		},
		setOption: function(e, t) {
			var i;
			i = t, o[e] = i
		}
	}
}();

function FRAK(e) {
	"function" == typeof e && e()
}! function(i, o, e, T) {
	"use strict";

	function h(e, t, i) {
		return setTimeout(u(e, i), t)
	}

	function n(e, t, i) {
		return !!Array.isArray(e) && (r(e, i[t], i), !0)
	}

	function r(e, t, i) {
		var n;
		if (e)
			if (e.forEach) e.forEach(t, i);
			else if (e.length !== T)
			for (n = 0; n < e.length;) t.call(i, e[n], n, e), n++;
		else
			for (n in e) e.hasOwnProperty(n) && t.call(i, e[n], n, e)
	}

	function s(e, t, i) {
		for (var n = Object.keys(t), r = 0; r < n.length;)(!i || i && e[n[r]] === T) && (e[n[r]] = t[n[r]]), r++;
		return e
	}

	function a(e, t) {
		return s(e, t, !0)
	}

	function t(e, t, i) {
		var n, r = t.prototype;
		(n = e.prototype = Object.create(r)).constructor = e, n._super = r, i && s(n, i)
	}

	function u(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}

	function c(e, t) {
		return typeof e == J ? e.apply(t && t[0] || T, t) : e
	}

	function l(e, t) {
		return e === T ? t : e
	}

	function d(t, e, i) {
		r(p(e), function(e) {
			t.addEventListener(e, i, !1)
		})
	}

	function f(t, e, i) {
		r(p(e), function(e) {
			t.removeEventListener(e, i, !1)
		})
	}

	function E(e, t) {
		for (; e;) {
			if (e == t) return !0;
			e = e.parentNode
		}
		return !1
	}

	function m(e, t) {
		return -1 < e.indexOf(t)
	}

	function p(e) {
		return e.trim().split(/\s+/g)
	}

	function g(e, t, i) {
		if (e.indexOf && !i) return e.indexOf(t);
		for (var n = 0; n < e.length;) {
			if (i && e[n][i] == t || !i && e[n] === t) return n;
			n++
		}
		return -1
	}

	function v(e) {
		return Array.prototype.slice.call(e, 0)
	}

	function b(e, i, t) {
		for (var n = [], r = [], s = 0; s < e.length;) {
			var a = i ? e[s][i] : e[s];
			g(r, a) < 0 && n.push(e[s]), r[s] = a, s++
		}
		return t && (n = i ? n.sort(function(e, t) {
			return e[i] > t[i]
		}) : n.sort()), n
	}

	function x(e, t) {
		for (var i, n, r = t[0].toUpperCase() + t.slice(1), s = 0; s < K.length;) {
			if ((n = (i = K[s]) ? i + r : t) in e) return n;
			s++
		}
		return T
	}

	function w(e) {
		var t = e.ownerDocument || e;
		return t.defaultView || t.parentWindow || i
	}

	function S(t, e) {
		var i = this;
		this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
			c(t.options.enable, [t]) && i.handler(e)
		}, this.init()
	}

	function R(e, t, i) {
		var n = i.pointers.length,
			r = i.changedPointers.length,
			s = t & he && n - r == 0,
			a = t & (ue | ce) && n - r == 0;
		i.isFirst = !!s, i.isFinal = !!a, s && (e.session = {}), i.eventType = t,
			function(e, t) {
				var i = e.session,
					n = t.pointers,
					r = n.length;
				i.firstInput || (i.firstInput = y(t)), 1 < r && !i.firstMultiple ? i.firstMultiple = y(t) : 1 === r && (i.firstMultiple = !1);
				var s = i.firstInput,
					a = i.firstMultiple,
					o = a ? a.center : s.center,
					h = t.center = C(n);
				t.timeStamp = ee(), t.deltaTime = t.timeStamp - s.timeStamp, t.angle = D(o, h), t.distance = M(o, h), f = i, m = t, p = m.center, g = f.offsetDelta || {}, v = f.prevDelta || {}, b = f.prevInput || {}, (m.eventType === he || b.eventType === ue) && (v = f.prevDelta = {
						x: b.deltaX || 0,
						y: b.deltaY || 0
					}, g = f.offsetDelta = {
						x: p.x,
						y: p.y
					}), m.deltaX = v.x + (p.x - g.x), m.deltaY = v.y + (p.y - g.y), t.offsetDirection = _(t.deltaX, t.deltaY), t.scale = a ? (l = a.pointers, d = n, M(d[0], d[1], Te) / M(l[0], l[1], Te)) : 1, t.rotation = a ? (u = a.pointers, c = n, D(c[1], c[0], Te) - D(u[1], u[0], Te)) : 0,
					function(e, t) {
						var i, n, r, s, a = e.lastInterval || t,
							o = t.timeStamp - a.timeStamp;
						if (t.eventType != ce && (oe < o || a.velocity === T)) {
							var h = a.deltaX - t.deltaX,
								u = a.deltaY - t.deltaY,
								c = {
									x: h / (l = o) || 0,
									y: u / l || 0
								};
							n = c.x, r = c.y, i = $(c.x) > $(c.y) ? c.x : c.y, s = _(h, u), e.lastInterval = t
						} else i = a.velocity, n = a.velocityX, r = a.velocityY, s = a.direction;
						var l;
						t.velocity = i, t.velocityX = n, t.velocityY = r, t.direction = s
					}(i, t);
				var u, c;
				var l, d;
				var f, m, p, g, v, b;
				var x = e.element;
				E(t.srcEvent.target, x) && (x = t.srcEvent.target), t.target = x
			}(e, i), e.emit("hammer.input", i), e.recognize(
				i), e.session.prevInput = i
	}

	function y(e) {
		for (var t = [], i = 0; i < e.pointers.length;) t[i] = {
			clientX: Z(e.pointers[i].clientX),
			clientY: Z(e.pointers[i].clientY)
		}, i++;
		return {
			timeStamp: ee(),
			pointers: t,
			center: C(t),
			deltaX: e.deltaX,
			deltaY: e.deltaY
		}
	}

	function C(e) {
		var t = e.length;
		if (1 === t) return {
			x: Z(e[0].clientX),
			y: Z(e[0].clientY)
		};
		for (var i = 0, n = 0, r = 0; r < t;) i += e[r].clientX, n += e[r].clientY, r++;
		return {
			x: Z(i / t),
			y: Z(n / t)
		}
	}

	function _(e, t) {
		return e === t ? le : $(e) >= $(t) ? 0 < e ? de : fe : 0 < t ? me : pe
	}

	function M(e, t, i) {
		i || (i = xe);
		var n = t[i[0]] - e[i[0]],
			r = t[i[1]] - e[i[1]];
		return Math.sqrt(n * n + r * r)
	}

	function D(e, t, i) {
		i || (i = xe);
		var n = t[i[0]] - e[i[0]],
			r = t[i[1]] - e[i[1]];
		return 180 * Math.atan2(r, n) / Math.PI
	}

	function F() {
		this.evEl = we, this.evWin = Se, this.allow = !0, this.pressed = !1, S.apply(this, arguments)
	}

	function A() {
		this.evEl = Ce, this.evWin = _e, S.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
	}

	function P() {
		this.evTarget = "touchstart", this.evWin = "touchstart touchmove touchend touchcancel", this.started = !1, S.apply(this, arguments)
	}

	function U() {
		this.evTarget = Fe, this.targetIds = {}, S.apply(this, arguments)
	}

	function B() {
		S.apply(this, arguments);
		var e = u(this.handler, this);
		this.touch = new U(this.manager, e), this.mouse = new F(this.manager, e)
	}

	function N(e, t) {
		this.manager = e, this.set(t)
	}

	function I(e) {
		this.id = te++, this.manager = null, this.options = a(e || {}, this.defaults), this.options.enable = l(this.options.enable, !0), this.state = Oe, this.simultaneous = {}, this.requireFail = []
	}

	function L(e) {
		return e == pe ? "down" : e == me ? "up" : e == de ? "left" : e == fe ? "right" : ""
	}

	function O(e, t) {
		var i = t.manager;
		return i ? i.get(e) : e
	}

	function z() {
		I.apply(this, arguments)
	}

	function k() {
		z.apply(this, arguments), this.pX = null, this.pY = null
	}

	function V() {
		z.apply(this, arguments)
	}

	function q() {
		I.apply(this, arguments), this._timer = null, this._input = null
	}

	function X() {
		z.apply(this, arguments)
	}

	function G() {
		z.apply(this, arguments)
	}

	function H() {
		I.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
	}

	function W(e, t) {
		return (t = t || {}).recognizers = l(t.recognizers, W.defaults.preset), new j(e, t)
	}

	function j(e, t) {
		var i;
		t = t || {}, this.options = a(t, W.defaults), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = e, this.input = new((i = this).options.inputClass || (ne ? A : re ? U : ie ? B : F))(i, R), this.touchAction = new N(this, this.options.touchAction), Y(this, !0), r(t.recognizers, function(e) {
			var t = this.add(new e[0](e[1]));
			e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
		}, this)
	}

	function Y(e, i) {
		var n = e.element;
		n.style && r(e.options.cssProps, function(e, t) {
			n.style[x(n.style, t)] = i ? e : ""
		})
	}
	var K = ["", "webkit", "moz", "MS", "ms", "o"],
		Q = o.createElement("div"),
		J = "function",
		Z = Math.round,
		$ = Math.abs,
		ee = Date.now,
		te = 1,
		ie = "ontouchstart" in i,
		ne = x(i, "PointerEvent") !== T,
		re = ie && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
		se = "touch",
		ae = "mouse",
		oe = 25,
		he = 1,
		ue = 4,
		ce = 8,
		le = 1,
		de = 2,
		fe = 4,
		me = 8,
		pe = 16,
		ge = de | fe,
		ve = me | pe,
		be = ge | ve,
		xe = ["x", "y"],
		Te = ["clientX", "clientY"];
	S.prototype = {
		handler: function() {},
		init: function() {
			this.evEl && d(this.element, this.evEl, this.domHandler), this.evTarget && d(this.target, this.evTarget, this.domHandler), this.evWin && d(w(this.element), this.evWin, this.domHandler)
		},
		destroy: function() {
			this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(w(this.element), this.evWin, this.domHandler)
		}
	};
	var Ee = {
			mousedown: he,
			mousemove: 2,
			mouseup: ue
		},
		we = "mousedown",
		Se = "mousemove mouseup";
	t(F, S, {
		handler: function(e) {
			var t = Ee[e.type];
			t & he && 0 === e.button && (this.pressed = !0), 2 & t && 1 !== e.which && (t = ue), this.pressed && this.allow && (t & ue && (this.pressed = !1), this.callback(this.manager, t, {
				pointers: [e],
				changedPointers: [e],
				pointerType: ae,
				srcEvent: e
			}))
		}
	});
	var Re = {
			pointerdown: he,
			pointermove: 2,
			pointerup: ue,
			pointercancel: ce,
			pointerout: ce
		},
		ye = {
			2: se,
			3: "pen",
			4: ae,
			5: "kinect"
		},
		Ce = "pointerdown",
		_e = "pointermove pointerup pointercancel";
	i.MSPointerEvent && (Ce = "MSPointerDown", _e = "MSPointerMove MSPointerUp MSPointerCancel"), t(A, S, {
		handler: function(e) {
			var t = this.store,
				i = !1,
				n = e.type.toLowerCase().replace("ms", ""),
				r = Re[n],
				s = ye[e.pointerType] || e.
			pointerType, a = s == se, o = g(t, e.pointerId, "pointerId");
			r & he && (0 === e.button || a) ? o < 0 && (t.push(e), o = t.length - 1) : r & (ue | ce) && (i = !0), o < 0 || (t[o] = e, this.callback(this.manager, r, {
				pointers: t,
				changedPointers: [e],
				pointerType: s,
				srcEvent: e
			}), i && t.splice(o, 1))
		}
	});
	var Me = {
		touchstart: he,
		touchmove: 2,
		touchend: ue,
		touchcancel: ce
	};
	t(P, S, {
		handler: function(e) {
			var t = Me[e.type];
			if (t === he && (this.started = !0), this.started) {
				var i = function(e, t) {
					var i = v(e.touches),
						n = v(e.changedTouches);
					return t & (ue | ce) && (i = b(i.concat(n), "identifier", !0)), [i, n]
				}.call(this, e, t);
				t & (ue | ce) && i[0].length - i[1].length == 0 && (this.started = !1), this.callback(this.manager, t, {
					pointers: i[0],
					changedPointers: i[1],
					pointerType: se,
					srcEvent: e
				})
			}
		}
	});
	var De = {
			touchstart: he,
			touchmove: 2,
			touchend: ue,
			touchcancel: ce
		},
		Fe = "touchstart touchmove touchend touchcancel";
	t(U, S, {
		handler: function(e) {
			var t = De[e.type],
				i = function(e, t) {
					var i = v(e.touches),
						n = this.targetIds;
					if (t & (2 | he) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
					var r, s, a = v(e.changedTouches),
						o = [],
						h = this.target;
					if (s = i.filter(function(e) {
							return E(e.target, h)
						}), t === he)
						for (r = 0; r < s.length;) n[s[r].identifier] = !0, r++;
					for (r = 0; r < a.length;) n[a[r].identifier] && o.push(a[r]), t & (ue | ce) && delete n[a[r].identifier], r++;
					return o.length ? [b(s.concat(o), "identifier", !0), o] : void 0
				}.call(this, e, t);
			i && this.callback(this.manager, t, {
				pointers: i[0],
				changedPointers: i[1],
				pointerType: se,
				srcEvent: e
			})
		}
	}), t(B, S, {
		handler: function(e, t, i) {
			var n = i.pointerType == se,
				r = i.pointerType == ae;
			if (n) this.mouse.allow = !1;
			else if (r && !this.mouse.allow) return;
			t & (ue | ce) && (this.mouse.allow = !0), this.callback(e, t, i)
		},
		destroy: function() {
			this.touch.destroy(), this.mouse.destroy()
		}
	});
	var Ae = x(Q.style, "touchAction"),
		Pe = Ae !== T,
		Ue = "compute",
		Be = "manipulation",
		Ne = "none",
		Ie = "pan-x",
		Le = "pan-y";
	N.prototype = {
		set: function(e) {
			e == Ue && (e = this.compute()), Pe && this.manager.element.style && (this.manager.element.style[Ae] = e), this.actions = e.toLowerCase().trim()
		},
		update: function() {
			this.set(this.manager.options.touchAction)
		},
		compute: function() {
			var t = [];
			return r(this.manager.recognizers, function(e) {
					c(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
				}),
				function(e) {
					if (m(e, Ne)) return Ne;
					var t = m(e, Ie),
						i = m(e, Le);
					return t && i ? Ie + " " + Le : t || i ? t ? Ie : Le : m(e, Be) ? Be : "auto"
				}(t.join(" "))
		},
		preventDefaults: function(e) {
			if (!Pe) {
				var t = e.srcEvent,
					i = e.offsetDirection;
				if (this.manager.session.prevented) return void t.preventDefault();
				var n = this.actions,
					r = m(n, Ne),
					s = m(n, Le),
					a = m(n, Ie);
				return r || s && i & ge || a && i & ve ? this.preventSrc(t) : void 0
			}
		},
		preventSrc: function(e) {
			this.manager.session.prevented = !0, e.preventDefault()
		}
	};
	var Oe = 1,
		ze = 2,
		ke = 4,
		Ve = 8,
		qe = Ve,
		Xe = 16;
	I.prototype = {
			defaults: {},
			set: function(e) {
				return s(this.options, e), this.manager && this.manager.touchAction.update(), this
			},
			recognizeWith: function(e) {
				if (n(e, "recognizeWith", this)) return this;
				var t = this.simultaneous;
				return t[(e = O(e, this)).id] || (t[e.id] = e).recognizeWith(this), this
			},
			dropRecognizeWith: function(e) {
				return n(e, "dropRecognizeWith", this) || (e = O(e, this), delete this.simultaneous[e.id]), this
			},
			requireFailure: function(e) {
				if (n(e, "requireFailure", this)) return this;
				var t = this.requireFail;
				return -1 === g(t, e = O(e, this)) && (t.push(e), e.requireFailure(this)), this
			},
			dropRequireFailure: function(e) {
				if (n(e, "dropRequireFailure", this)) return this;
				e = O(e, this);
				var t = g(this.requireFail, e);
				return -1 < t && this.requireFail.splice(t, 1), this
			},
			hasRequireFailures: function() {
				return 0 < this.requireFail.length
			},
			canRecognizeWith: function(e) {
				return !!this.simultaneous[e.id]
			},
			emit: function(i) {
				function e(e) {
					var t;
					n.manager.emit(n.options.event + (e ? (t = r) & Xe ? "cancel" : t & Ve ? "end" : t & ke ? "move" : t & ze ? "start" : "" : ""), i)
				}
				var n = this,
					r = this.state;
				r < Ve && e(!0), e(), Ve <= r && e(!0)
			},
			tryEmit: function(e) {
				return this.canEmit() ? this.emit(e) : void(this.state = 32)
			},
			canEmit: function() {
				for (var e = 0; e < this.requireFail.length;) {
					if (!(this.requireFail[e].state & (32 | Oe))) return !1;
					e++
				}
				return !0
			},
			recognize: function(e) {
				var t = s({}, e);
				return c(this.options.enable, [this, t]) ? (this.state & (qe | Xe | 32) && (this.state = Oe), this.state = this.process(t), void(this.state & (ze | ke | Ve | Xe) && this.tryEmit(t))) : (this.reset(), void(this.state = 32))
			},
			process: function() {},
			getTouchAction: function() {},
			reset: function() {}
		},
		t(z, I, {
			defaults: {
				pointers: 1
			},
			attrTest: function(e) {
				var t = this.options.pointers;
				return 0 === t || e.pointers.length === t
			},
			process: function(e) {
				var t = this.state,
					i = e.eventType,
					n = t & (ze | ke),
					r = this.attrTest(e);
				return n && (i & ce || !r) ? t | Xe : n || r ? i & ue ? t | Ve : t & ze ? t | ke : ze : 32
			}
		}), t(k, z, {
			defaults: {
				event: "pan",
				threshold: 10,
				pointers: 1,
				direction: be
			},
			getTouchAction: function() {
				var e = this.options.direction,
					t = [];
				return e & ge && t.push(Le), e & ve && t.push(Ie), t
			},
			directionTest: function(e) {
				var t = this.options,
					i = !0,
					n = e.distance,
					r = e.direction,
					s = e.deltaX,
					a = e.deltaY;
				return r & t.direction || (n = t.direction & ge ? (r = 0 === s ? le : s < 0 ? de : fe, i = s != this.pX, Math.abs(e.deltaX)) : (r = 0 === a ? le : a < 0 ? me : pe, i = a != this.pY, Math.abs(e.deltaY))), e.direction = r, i && n > t.threshold && r & t.direction
			},
			attrTest: function(e) {
				return z.prototype.attrTest.call(this, e) && (this.state & ze || !(this.state & ze) && this.directionTest(e))
			},
			emit: function(e) {
				this.pX = e.deltaX, this.pY = e.deltaY;
				var t = L(e.direction);
				t && this.manager.emit(this.options.event + t, e), this._super.emit.call(this, e)
			}
		}), t(V, z, {
			defaults: {
				event: "pinch",
				threshold: 0,
				pointers: 2
			},
			getTouchAction: function() {
				return [Ne]
			},
			attrTest: function(e) {
				return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & ze)
			},
			emit: function(e) {
				if (this._super.emit.call(this, e), 1 !== e.scale) {
					var t = e.scale < 1 ? "in" : "out";
					this.manager.emit(this.options.event + t, e)
				}
			}
		}), t(q, I, {
			defaults: {
				event: "press",
				pointers: 1,
				time: 500,
				threshold: 5
			},
			getTouchAction: function() {
				return ["auto"]
			},
			process: function(e) {
				var t = this.options,
					i = e.pointers.length === t.pointers,
					n = e.distance < t.threshold,
					r = e.deltaTime > t.time;
				if (this._input = e, !n || !i || e.eventType & (ue | ce) && !r) this.reset();
				else if (e.eventType & he) this.reset(), this._timer = h(function() {
					this.state = qe, this.tryEmit()
				}, t.time, this);
				else if (e.eventType & ue) return qe;
				return 32
			},
			reset: function() {
				clearTimeout(this._timer)
			},
			emit: function(e) {
				this.state === qe && (e && e.eventType & ue ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = ee(), this.manager.emit(this.options.event, this._input)))
			}
		}), t(X, z, {
			defaults: {
				event: "rotate",
				threshold: 0,
				pointers: 2
			},
			getTouchAction: function() {
				return [Ne]
			},
			attrTest: function(e) {
				return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & ze)
			}
		}), t(G, z, {
			defaults: {
				event: "swipe",
				threshold: 10,
				velocity: .65,
				direction: ge | ve,
				pointers: 1
			},
			getTouchAction: function() {
				return k.prototype.getTouchAction.call(this)
			},
			attrTest: function(e) {
				var t, i = this.options.direction;
				return i & (ge | ve) ? t = e.velocity : i & ge ? t = e.velocityX : i & ve && (t = e.velocityY), this._super.attrTest.call(this, e) && i & e.direction && e.distance > this.options.threshold && $(t) > this.options.velocity && e.eventType & ue
			},
			emit: function(e) {
				var t = L(e.direction);
				t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
			}
		}), t(H, I, {
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
				return [Be]
			},
			process: function(e) {
				var t = this.options,
					i = e.pointers.length === t.pointers,
					n = e.distance < t.threshold,
					r = e.deltaTime < t.time;
				if (this.reset(), e.eventType & he && 0 === this.count) return this.failTimeout();
				if (n && r && i) {
					if (e.eventType != ue) return this.failTimeout();
					var s = !this.pTime || e.timeStamp - this.pTime < t.interval,
						a = !this.pCenter || M(this.pCenter, e.center) < t.posThreshold;
					if (this.pTime = e.timeStamp, this.pCenter = e.center, a && s ? this.count += 1 : this.count = 1, this._input = e, 0 === this.count % t.taps) return this.hasRequireFailures() ? (this._timer = h(function() {
						this.state = qe, this.tryEmit()
					}, t.interval, this), ze) : qe
				}
				return 32
			},
			failTimeout: function() {
				return this._timer = h(function() {
					this.state = 32
				}, this.options.interval, this), 32
			},
			reset: function() {
				clearTimeout(this._timer)
			},
			emit: function() {
				this.state == qe && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
			}
		}), W.VERSION = "2.0.4", W.defaults = {
			domEvents: !1,
			touchAction: Ue,
			enable: !0,
			inputTarget: null,
			inputClass: null,
			preset: [
				[X, {
					enable: !1
				}],
				[V, {
						enable: !1
					},
					["rotate"]
				],
				[G, {
					direction: ge
				}],
				[k, {
						direction: ge
					},
					["swipe"]
				],
				[H],
				[H, {
						event: "doubletap",
						taps: 2
					},
					["tap"]
				],
				[q]
			],
			cssProps: {
				userSelect: "none",
				touchSelect: "none",
				touchCallout: "none",
				contentZooming: "
				none ",userDrag:"
				none ",tapHighlightColor:"
				rgba(0, 0, 0, 0)
				"}};j.prototype={set:function(e){return s(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?2:1},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var i,n=this.recognizers,r=t.curRecognizer;(!r||r&&r.state&qe)&&(r=t.curRecognizer=null);for(var s=0;s<n.length;)i=n[s],2===t.stopped||r&&i!=r&&!i.canRecognizeWith(r)?i.reset():i.recognize(e),!r&&i.state&(ze|ke|Ve)&&(r=t.curRecognizer=i),s++}},get:function(e){if(e instanceof I)return e;for(var t=this.recognizers,i=0;i<t.length;i++)if(t[i].options.event==e)return t[i];return null},add:function(e){if(n(e,"
				add ",this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),(e.manager=this).touchAction.update(),e},remove:function(e){if(n(e,"
				remove ",this))return this;var t=this.recognizers;return e=this.get(e),t.splice(g(t,e),1),this.touchAction.update(),this},on:function(e,t){var i=this.handlers;return r(p(e),function(e){i[e]=i[e]||[],i[e].push(t)}),this},off:function(e,t){var i=this.handlers;return r(p(e),function(e){t?i[e].splice(g(i[e],t),1):delete i[e]}),this},emit:function(e,t){var i,n,r;this.options.domEvents&&(i=e,n=t,(r=o.createEvent("
				Event ")).initEvent(i,!0,!0),(r.gesture=n).target.dispatchEvent(r));var s=this.handlers[e]&&this.handlers[e].slice();if(s&&s.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var a=0;a<s.length;)s[a](t),a++}},destroy:function(){this.element&&Y(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},s(W,{INPUT_START:he,INPUT_MOVE:2,INPUT_END:ue,INPUT_CANCEL:ce,STATE_POSSIBLE:Oe,STATE_BEGAN:ze,STATE_CHANGED:ke,STATE_ENDED:Ve,STATE_RECOGNIZED:qe,STATE_CANCELLED:Xe,STATE_FAILED:32,DIRECTION_NONE:le,DIRECTION_LEFT:de,DIRECTION_RIGHT:fe,DIRECTION_UP:me,DIRECTION_DOWN:pe,DIRECTION_HORIZONTAL:ge,DIRECTION_VERTICAL:ve,DIRECTION_ALL:be,Manager:j,Input:S,TouchAction:N,TouchInput:U,MouseInput:F,PointerEventInput:A,TouchMouseInput:B,SingleTouchInput:P,Recognizer:I,AttrRecognizer:z,Tap:H,Pan:k,Swipe:G,Pinch:V,Rotate:X,Press:q,on:d,off:f,each:r,merge:a,extend:s,inherit:t,bindFn:u,prefixed:x}),typeof define==J&&define.amd?define(function(){return W}):"
				undefined "!=typeof module&&module.exports?module.exports=W:i.HammerWF=W}(window,document),frakVersion="
				1.4 .0 ",FRAK.extend=function(){for(var e=1;e<arguments.length;e++)for(var t in arguments[e])arguments[e].hasOwnProperty(t)&&(arguments[0][t]=arguments[e][t]);return arguments[0]},FRAK.isFunction=function(e){return"

				function "==typeof e},FRAK.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},FRAK.parseJSON=function(e){if(window.JSON&&window.JSON.parse)return window.JSON.parse(e);if(window.jQuery&&window.jQuery.parseJSON)return window.jQuery.parseJSON(e);throw"
				FRAK.parseJSON: No JSON parser available.
				"},FRAK.timestamp=window.performance&&window.performance.now?function(){return window.performance.now.apply(window.performance)}:Date.now,FRAK.requestAnimationFrame=function(){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;return e?function(){return e.apply(window,arguments)}:function(e){return window.setTimeout(e,1e3/60)}}(),FRAK.cancelAnimationFrame=function(){var e=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame;return e?function(){return e.apply(window,arguments)}:clearTimeout}(),FRAK.fullscreenEnabled=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled,FRAK.requestFullscreen=function(e){(e.requestFullscreen||e.requestFullScreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullscreen||e.mozRequestFullScreen||e.
				msRequestFullscreen || e.msRequestFullScreen || function() {}).call(e)
		}, FRAK.exitFullscreen = function() {
			(document.exitFullscreen || document.exitFullScreen || document.webkitExitFullscreen || document.webkitExitFullScreen || document.mozExitFullscreen || document.mozExitFullScreen || document.msExitFullscreen || document.msExitFullScreen || function() {}).call(document)
		}, FRAK.isFullscreen = function() {
			return document.isFullScreen || document.isFullscreen || document.webkitIsFullscreen || document.webkitIsFullScreen || document.mozIsFullscreen || document.mozIsFullScreen || document.msIsFullscreen || document.msIsFullScreen
		};
	var Cloneable = FrakClass.extend({
			type: function() {
				return !1
			},
			clone: function() {
				return "function" == typeof window[this.type()] ? new(window[this.type()]) : {}
			}
		}),
		nextSerializableID = 1,
		Serializable = Cloneable.extend({
			init: function() {
				this.serializable = !0, this.id = nextSerializableID++
			},
			included: function() {
				return !0
			},
			excluded: function() {
				return []
			},
			getSerializableFields: function(e) {
				var t = this.included();
				if (excluded = this.excluded(), !0 === t && !0 === excluded) throw "Quantum classes not allowed. A subclass of Serializable tries to both include and exclude all fields.";
				if (!1 === t && !1 === excluded) throw "Quantum classes not allowed. A subclass of Serializable tries both not to include and not to exclude all fields.";
				if (!1 === t || !0 === excluded) return {};
				var i = {};
				if (!0 === t) {
					for (var n in this) {
						var r = {};
						this[n] && "[object Function]" == r.toString.call(this[n]) || "serializable" == n || "_super" == n || (i[n] = this[n])
					}
					if (excluded instanceof Array) {
						excluded = excluded.concat(e);
						for (var s = 0; s < excluded.length; s++) i[excluded[s]] && delete i[excluded[s]]
					}
				}
				if (!0 === excluded) {
					i = [];
					for (var a = 0; a < t.length; a++) {
						r = {};
						this[n = t[a]] && "[object Function]" == r.toString.call(this[n]) || "serializable" == n || "_super" == n || (i[n] = this[n])
					}
				}
				return i
			},
			serialize: function(e) {
				try {
					return (new Serializer).serialize(this, e, 32)
				} catch (e) {
					throw console.warn("Caught serialization exception: ", e), e
				}
			},
			unserialize: function(e) {
				FRAK.parseJSON(e);
				return !1
			},
			serializeCyclic: function(e) {
				try {
					return (new CyclicSerializer).serialize(this, e, 32)
				} catch (e) {
					throw console.warn("Caught serialization exception: ", e), e
				}
			},
			unserializeCyclic: function(e) {
				try {
					return (new CyclicSerializer).unserialize(e)
				} catch (e) {
					throw console.warn("Caught serialization exception: ", e), e
				}
			},
			onBeforeSerialize: function() {},
			onAfterSerialize: function() {},
			onBeforeUnserialize: function() {},
			onAfterUnserialize: function() {}
		}),
		Serializer = FrakClass.extend({
			init: function() {
				this.serializables = {}
			},
			serializableCopy: function(e, t, i, n, r) {
				var s = {},
					a = t.getSerializableFields(i);
				if (r <= n) {
					var o = [];
					for (var h in e) o.push(e[h].type());
					throw "Reached maximum depth for serialization: " + n + " at " + t.type()
				}
				for (var u in (e = e.slice(0)).splice(0, 0, t), a) {
					var c = a[u];
					if (c instanceof Serializable) s[u] = this.serializableCopy(e, c, i, n + 1, r);
					else if (c instanceof Array || c instanceof Float32Array) {
						var l = [];
						for (var d in c) c[d] instanceof Serializable ? l.push(this.serializableCopy(e, c[d], i, n + 1, r)) : l.push(c[d]);
						s[u] = l
					} else s[u] = a[u]
				}
				return {
					_type_: t.type(),
					_properties_: s
				}
			},
			serialize: function(e, t, i) {
				this.serializables = {};
				var n = this.serializableCopy([], e, t, 0, i);
				return JSON.stringify({
					_root_: n,
					_serializables_: this.serializables
				}, void 0, 2)
			},
			unserializeSerializables: function(e) {
				for (var t in e) this.serializables[t] = this.unserializeCopy(e[t])
			},
			unserializeCopy: function(e) {
				if (e instanceof Array) {
					for (var t in e) e[t] = this.unserializeCopy(e[t]);
					return e
				}
				if (e instanceof Object) {
					if (e._reference_) return e;
					if (e._type_) {
						var i = new window[e._type_];
						for (var t in i.onBeforeUnserialize(), e._properties_) i[t] = this.unserializeCopy(e._properties_[t]);
						return i.onAfterUnserialize(), i
					}
					return e
				}
				return i
			},
			resolveReferences: function(e, t) {
				if (e[t] instanceof Array)
					for (var i in e[t]) e[t][i] = this.resolveReferences(e[t], i);
				else if (e[t] instanceof Object)
					if (e[t]._reference_) e[t] = this.serializables[e[t]._id_];
					else
						for (var i in e[t]) e[t][i] = this.resolveReferences(e[t], i)
			},
			unserialize: function(e) {
				var t = FRAK.parseJSON(e);
				this.serializables = {}, this.unserializeSerializables(t._serializables_);
				var i = this.unserializeCopy(t._root_);
				for (var n in this.serializables) this.resolveReferences(
					this.serializables, n);
				return this.resolveReferences(t, "_serializables_"), i
			}
		}),
		CyclicSerializer = FrakClass.extend({
			init: function() {
				this.serializables = {}, this.visited = []
			},
			serializableCopy: function(t, i, e, n, r) {
				if (r <= n) return {};
				(t = t.slice(0)).push(i);
				try {
					if ("object" != typeof i) return i;
					if (!i) return null;
					if (i instanceof Serializable) {
						if (!this.serializables[i.id]) {
							this.serializables[i.id] = !0, i.onBeforeSerialize();
							var s = i.getSerializableFields(i, e);
							for (var a in s) s[a] = this.serializableCopy(t, s[a], e, n + 1, r);
							i.onAfterSerialize(), this.serializables[i.id] = {
								_type_: i.type(),
								_properties_: s
							}
						}
						return {
							_reference_: !0,
							_id_: i.id
						}
					}
					if (i instanceof Array || i instanceof Float32Array) {
						var o = [];
						for (var a in i) o.push(this.serializableCopy(t, i[a], e, n + 1, r));
						return o
					}
					if (i._visited_) return void console.warn("Already visited object: ", i);
					i._visited_ = !0;
					s = {};
					for (var a in i) s[a] = this.serializableCopy(t, i[a], e, n + 1, r);
					return s
				} catch (e) {
					throw console.warn("Caught: ", i, e), console.warn("Stack: "), console.warn(t), e
				}
			},
			serialize: function(e, t, i) {
				this.serializables = {};
				var n = this.serializableCopy([], e, t, 0, i);
				return JSON.stringify({
					_root_: n,
					_serializables_: this.serializables
				}, void 0, 2)
			},
			unserializeSerializables: function(e) {
				for (var t in e) this.serializables[t] = this.unserializeCopy(e[t])
			},
			unserializeCopy: function(e) {
				if (e instanceof Array) {
					for (var t in e) e[t] = this.unserializeCopy(e[t]);
					return e
				}
				if (e instanceof Object) {
					if (e._reference_) return e;
					if (e._type_) {
						var i = new window[e._type_];
						for (var t in i.onBeforeUnserialize(), e._properties_) i[t] = this.unserializeCopy(e._properties_[t]);
						return i
					}
					return e
				}
				return e
			},
			resolveReferences: function(e, t, i) {
				if (!(32 < i))
					if (e[t] instanceof Array)
						for (var n in e[t]) this.resolveReferences(e[t], n, i + 1);
					else if (e[t] instanceof Object && !("_visited_" in e[t]))
					if (e[t]._reference_) e[t] = this.serializables[e[t]._id_];
					else if (e[t] instanceof Serializable)
					for (var r in e[t]._visited_ = !0, this.visited.push(e[t]), e[t]) this.resolveReferences(e[t], r, i + 1)
			},
			unserialize: function(e) {
				var t = FRAK.parseJSON(e);
				this.serializables = {}, this.unserializeSerializables(t._serializables_);
				var i = {
					_root_: this.unserializeCopy(t._root_)
				};
				for (var n in this.resolveReferences(i, "_root_", 0), this.serializables) this.resolveReferences(this.serializables, n, 0);
				for (var n in this.visited) this.visited[n] instanceof Serializable && this.visited[n].onAfterUnserialize();
				for (var n in this.visited) delete this.visited[n]._visited_;
				return i._root_
			}
		}),
		TypeReference = Serializable.extend({
			init: function(e, t) {
				this._super(), this.valueType = e, this.value = t
			},
			type: function() {
				return "TypeReference"
			},
			isNull: function() {
				return !this.value
			}
		});

	function CollectionReference(e) {
		this.list = e
	}

	function CollectionView(e, t, i) {
		this.listReference = e, this.view = [], this.keepExact = !!i, this.fnFilter = t, this.length = 0;
		var n = this;
		this.update = function() {
			(n.keepExact || n.view.length < n.listReference.list.length) && (n.view.length = n.listReference.list.length)
		}, this.filter = function() {
			n.update();
			for (var e, t = 0, i = 0; i < n.listReference.list.length && (e = n.listReference.list[i]); ++i) n.fnFilter(e) && (n.view[t++] = e);
			for (i = n.length = t; i < n.listReference.list.length; ++i) n.view[t++] = null
		}, this.forEach = function(e) {
			for (var t = 0; t < n.length; ++t) e(n.view[t], t)
		}, this.get = function(e) {
			if (0 <= e && e < n.length) return n.view[e];
			throw Error("Accessing element out of bounds")
		}
	}
	var Color = function(e, t, i, n) {
			this.r = 1, this.g = 1, this.b = 1, this.a = 1, this.clone = function() {
				return new Color(this.r, this.g, this.b, this.a)
			}, this.fromHex = function(e) {
				var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(e);
				return t && (this.r = parseInt(t[1], 16) / 255, this.g = parseInt(t[2], 16) / 255, this.b = parseInt(t[3], 16) / 255, t[4] && (this.a = parseInt(t[4], 16) / 255)), this
			}, this.toHex = function() {
				return "#" + ("0" + Math.round(255 * this.r).toString(16)).slice(-2) + ("0" + Math.round(255 * this.g).toString(16)).slice(-2) + ("0" + Math.round(255 * this.b).toString(16)).slice(-2) + ("0" + Math.round(255 * this.a).toString(16)).slice(-2)
			}, this.toString = function() {
				return "rgba(" + Math.floor(255 * this.r) + ", " + Math.floor(255 * this.g) + ", " + Math.floor(255 * this.b) + ", " + this.a + ")"
			}, this.toVector = function(e) {
				return e || (e = vec4.create()), vec4.set(e, this.r, this.g, this.b,
					this.a), e
			}, this.set = function(e, t, i, n) {
				return "number" == typeof e && (this.r = e), "number" == typeof t && (this.g = t), "number" == typeof i && (this.b = i), "number" == typeof n && (this.a = n), this
			}, this.set(e, t, i, n)
		},
		MatrixStack = FrakClass.extend({
			init: function() {
				this.stack = [mat4.identity(mat4.create())], this.allocated = [];
				for (var e = 0; e < 64; e++) this.allocated.push(mat4.create())
			},
			top: function() {
				return this.stack[this.stack.length - 1]
			},
			push: function() {
				0 == this.allocated.length && this.allocated.push(mat4.create()), this.stack.push(mat4.copy(this.allocated.pop(), this.stack[this.stack.length - 1]))
			},
			pop: function() {
				this.allocated.push(this.stack.pop())
			},
			multiply: function(e) {
				mat4.multiply(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], e)
			},
			load: function(e) {
				mat4.copy(this.stack[this.stack.length - 1], e)
			},
			size: function() {
				return this.stack.length
			}
		}),
		RenderingContext = FrakClass.extend({
			init: function(e, t, i, n) {
				if (this.version = n, "auto" === this.version)
					if ("WebGL2RenderingContext" in window) this.version = "webgl2";
					else if (this.version = "webgl", !("WebGLRenderingContext" in window)) throw "Unable to create rendering context, because browser doesn't support WebGL";
				if ("string" == typeof e && (e = document.getElementById(e)), window.jQuery && e instanceof jQuery && (e = e[0]), !e) throw "RenderingContext requires a canvas element";
				if (this.canvas = e, "undefined" != typeof WebGLDebugUtils && (this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(e), this.canvas.setRestoreTimeout(2e3)), t = t || {
						alpha: !1
					}, "webgl2" === this.version && (this.gl = this.canvas.getContext("webgl2", t), this.gl || "auto" !== n || (this.version = "webgl")), "webgl" === this.version && (this.gl = this.canvas.getContext("webgl", t), this.gl || (this.gl = this.canvas.getContext("experimental-webgl", t)), this.gl || (this.gl = this.canvas.getContext("moz-webgl", t)), this.gl || (this.gl = this.canvas.getContext("webkit-3d", t))), !this.gl) {
					var r = !1;
					if (FRAK.isFunction(i) && (r = i()), !r) {
						var s = document.createElement("div");
						s.style.position = "relative", s.style.zIndex = 100, s.style.backgroundColor = "red", s.style.padding = "8px", s.textContent = "WebGL seems to be unavailable in this browser.";
						var a = e.parentNode;
						a.insertBefore(s, a.firstChild)
					}
					throw "Failed to acquire GL context from canvas"
				}
				if ("undefined" != typeof WebGLDebugUtils) {
					this.gl = WebGLDebugUtils.makeDebugContext(this.gl, function(e, t, i) {
						throw WebGLDebugUtils.glEnumToString(e) + " was caused by call to: " + t + JSON.stringify(i)
					}), console.warn("Using WebGLDebugUtils")
				}
				this.modelview = new MatrixStack, this.projection = new MatrixStack, this.light = !1, this.shadow = !1, this.camera = !1, this.engine = !1
			},
			error: function() {
				if (this.isContextLost()) throw Error("Context lost");
				var e = this.gl.getError();
				throw Error("GL_ERROR: " + WebGLDebugUtils.glEnumToString(e))
			},
			isContextLost: function() {
				return !this.gl || this.gl.isContextLost()
			},
			restore: function() {
				if (!this.engine) return !1;
				this.gl.getError();
				var t = this,
					e = this.engine,
					i = e.assetsManager.texturesManager;
				for (var n in i.cache) {
					i.cache[n].onContextRestored(t)
				}
				e.scene.root.onEachChildComponent(function(e) {
					(e instanceof RendererComponent || e instanceof TextComponent) && e.onContextRestored(t)
				});
				for (n = 0; n < e.scene.lights.length; ++n) e.scene.lights[n].onContextRestored(t);
				e.WhiteTexture.glTexture = null, e.WhiteTexture.loaded = !1, e.WhiteTexture.clearImage(t, [255, 255, 255, 255]), fallbackTexture && fallbackTexture.onContextRestored(t), fallbackCubeTexture && fallbackCubeTexture.onContextRestored(t), e.scene && e.scene.cameraComponent && e.scene.cameraComponent.onContextRestored(t);
				var r = e.assetsManager.shadersManager;
				for (var n in r.cache) {
					r.cache[n].onContextRestored(t)
				}
				return !0
			}
		});

	function SamplerAccumulator() {
		this.samplers = new Array, this.length = 0;
		var t = this;
		this.add = function(e) {
			t.samplers[t.length++] = e
		}, this.clear = function() {
			for (var e = 0; e < t.samplers.length; ++e) t.samplers[e] = null;
			t.length = 0
		}
	}
	var ExplicitAttributeLocations = {
			position: 0,
			normal: 1,
			texcoord2d0: 2,
			uv0: 2,
			tangent: 3,
			bitangent: 4
		},
		Subshader = FrakClass.extend({
			init: function(e, t, i) {
				this.shader = e, this.context = e.context, this.code = t, this.type = i, this.VERTEX_SHADER = 0, this.FRAGMENT_SHADER = 1, this.compiledShader = !1, this.failedCompilation = !1
			},
			attach: function() {
				this.context.gl.attachShader(
					this.shader.program, this.compiledShader)
			},
			getFilename: function() {
				return "Unknown"
			},
			compile: function() {
				if (!this.failedCompilation) {
					if (!this.compiledShader) throw "WebGL shader has not been created. FragmentShader or VertexShader class instances should be used, not Shader.";
					if (this.context.gl.shaderSource(this.compiledShader, this.code), this.context.gl.compileShader(this.compiledShader), !this.context.gl.getShaderParameter(this.compiledShader, this.context.gl.COMPILE_STATUS) && !this.failedCompilation) throw this.failedCompilation = !0, "Shader '" + this.getFilename() + "' failed to compile: " + this.context.gl.getShaderInfoLog(this.compiledShader)
				}
			},
			onContextRestored: function(e) {
				this.failedCompilation = !1, this.context = e, this.attach()
			}
		}),
		VertexShader = Subshader.extend({
			init: function(e, t) {
				this._super(e, t, this.VERTEX_SHADER), this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER)
			},
			getFilename: function() {
				return this.shader.descriptor.vertexSource
			},
			onContextRestored: function(e) {
				this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER), this._super(e)
			}
		}),
		FragmentShader = Subshader.extend({
			init: function(e, t) {
				this._super(e, t, this.FRAGMENT_SHADER), this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER)
			},
			getFilename: function() {
				return this.shader.descriptor.fragmentSource
			},
			onContextRestored: function(e) {
				this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER), this._super(e)
			}
		}),
		ShaderRequirements = FrakClass.extend({
			init: function() {
				this.barycentric = !1, this.bitangents = !1, this.tangents = !1, this.transparent = !1, this.texCoords2D = !0
			},
			apply: function(e) {
				this.barycentric && !e.buffers.barycentric && e.generateBarycentric(), this.texCoords2D && !e.buffers.texcoord2d0 && e.generateTexCoords()
			}
		}),
		Shader = Serializable.extend({
			init: function(e, t) {
				if (!e) throw "Shader: RenderingContext required";
				this._super(), this.descriptor = t, this.context = e, this.program = e.gl.createProgram(), this.shaders = [], this.requirements = new ShaderRequirements, this.linked = !1, this.failed = !1, this.uniformLocations = {}
			},
			excluded: function() {
				return !0
			},
			included: function() {
				return ["descriptor"]
			},
			addVertexShader: function(e) {
				var t = new VertexShader(this, e);
				this.addShader(t)
			},
			addFragmentShader: function(e) {
				var t = new FragmentShader(this, e);
				this.addShader(t)
			},
			addShader: function(e) {
				this.shaders.push(e), e.attach()
			},
			link: function() {
				if (!this.failed) {
					for (var e = 0; e < this.shaders.length; e++) this.shaders[e].compile(this.context);
					for (var t in ExplicitAttributeLocations) this.context.gl.bindAttribLocation(this.program, ExplicitAttributeLocations[t], t);
					this.uniformLocations = {}, this.linked = !0, this.context.gl.linkProgram(this.program), this.context.gl.getProgramParameter(this.program, this.context.gl.LINK_STATUS) || (console.error("Shader linking failed: ", this.context.gl.getProgramInfoLog(this.program)), this.linked = !1, this.failed = !0)
				}
			},
			use: function(e) {
				this.failed || this.shaders.length < 2 || (this.linked || this.link(), this.linked && (this.context.gl.useProgram(this.program), this.bindUniforms(e)))
			},
			getAttribLocation: function(e) {
				return e in ExplicitAttributeLocations ? ExplicitAttributeLocations[e] : this.context.gl.getAttribLocation(this.program, e)
			},
			getUniformLocation: function(e) {
				return e in this.uniformLocations || (this.uniformLocations[e] = this.context.gl.getUniformLocation(this.program, e)), this.uniformLocations[e]
			},
			bindUniforms: function(e) {
				if (e && this.linked)
					for (var t in e) {
						var i = this.getUniformLocation(t);
						if (i && -1 != i) {
							var n = e[t];
							if (!n) throw "Uniform '" + t + "' is undefined.";
							n.bind(this.context, i)
						}
					}
			},
			bindSamplers: function(e) {
				if (e && 0 != e.length && this.linked) {
					for (var t = this.context.gl, i = 0, n = 0; n < e.length; ++n) {
						var r = e[n];
						if (!r) break;
						var s = this.getUniformLocation(r.name); - 1 != s && (r.bind(this.context, s, i), i++)
					}
					t.activeTexture(t.TEXTURE0)
				}
			},
			unbindSamplers: function(e) {
				if (e && 0 != e.length && this.linked) {
					for (var t = this.context.gl, i = 0, n = 0; n < e.length; ++n) {
						var r = e[n];
						if (!r) break;
						var s = this.getUniformLocation(r.name); - 1 != s && (r.unbind(this.context, s, i), i++)
					}
					t.activeTexture(t.TEXTURE0)
				}
			},
			onContextRestored: function(e) {
				this.context = e, this.program = e.gl.createProgram(), this.uniformLocations = {},
					this.failed = !1, this.linked = !1;
				for (var t = 0; t < this.shaders.length; ++t) this.shaders[t].onContextRestored(e);
				this.link()
			}
		}),
		Uniform = Cloneable.extend({
			init: function(e) {
				this.value = e
			},
			bind: function(e, t) {},
			clone: function() {
				var e = this._super();
				return e.value = this.value, e
			}
		}),
		UniformInt = Uniform.extend({
			bind: function(e, t) {
				e.gl.uniform1i(t, this.value)
			},
			type: function() {
				return "UniformInt"
			}
		}),
		UniformFloat = Uniform.extend({
			bind: function(e, t) {
				e.gl.uniform1f(t, this.value)
			},
			type: function() {
				return "UniformFloat"
			}
		}),
		UniformVec2 = Uniform.extend({
			init: function(e) {
				e || (e = vec2.create()), e instanceof Float32Array ? this._super(e) : this._super(new Float32Array(e))
			},
			type: function() {
				return "UniformVec2"
			},
			bind: function(e, t) {
				e.gl.uniform2fv(t, this.value)
			},
			clone: function() {
				var e = this._super();
				return e.value = vec2.clone(this.value), e
			}
		}),
		UniformVec3 = Uniform.extend({
			init: function(e) {
				e || (e = vec3.create()), e instanceof Float32Array ? this._super(e) : this._super(new Float32Array(e))
			},
			type: function() {
				return "UniformVec3"
			},
			bind: function(e, t) {
				e.gl.uniform3fv(t, this.value)
			},
			clone: function() {
				var e = this._super();
				return e.value = vec3.clone(this.value), e
			}
		}),
		UniformVec4 = Uniform.extend({
			init: function(e) {
				e || (e = vec4.create()), e instanceof Float32Array ? this._super(e) : this._super(new Float32Array(e))
			},
			type: function() {
				return "UniformVec4"
			},
			bind: function(e, t) {
				e.gl.uniform4fv(t, this.value)
			},
			clone: function() {
				var e = this._super();
				return e.value = vec4.clone(this.value), e
			}
		}),
		UniformColor = UniformVec4.extend({
			init: function(e) {
				e ? e instanceof Color ? this._super(e.toVector()) : "r" in e && "g" in e && "b" in e && "a" in e ? this._super(vec4.fromValues(e.r, e.g, e.b, e.a)) : this._super(vec4.fromValues(1, 1, 1, 1)) : this._super(vec4.fromValues(1, 1, 1, 1))
			},
			type: function() {
				return "UniformColor"
			}
		}),
		UniformMat2 = Uniform.extend({
			type: function() {
				return "UniformMat2"
			},
			bind: function(e, t) {
				e.gl.uniformMatrix2fv(t, 0, this.value)
			},
			clone: function() {
				var e = this._super();
				return e.value = mat2.clone(this.value), e
			}
		}),
		UniformMat3 = Uniform.extend({
			bind: function(e, t) {
				e.gl.uniformMatrix3fv(t, !1, this.value)
			},
			type: function() {
				return "UniformMat3"
			},
			clone: function() {
				var e = this._super();
				return e.value = mat3.clone(this.value), e
			}
		}),
		UniformMat4 = Uniform.extend({
			bind: function(e, t) {
				e.gl.uniformMatrix4fv(t, !1, this.value)
			},
			type: function() {
				return "UniformMat4"
			},
			clone: function() {
				var e = this._super();
				return e.value = mat4.clone(this.value), e
			}
		}),
		fallbackTexture = !1,
		fallbackCubeTexture = !1,
		Sampler = Serializable.extend({
			init: function(e, t) {
				this.name = e, this.texture = t
			},
			type: function() {
				return "Sampler"
			},
			createFallbackTexture: function(e) {
				fallbackTexture = new Texture(e);
				var t = document.createElement("canvas");
				t.width = 2, t.height = 2;
				var i = t.getContext("2d");
				i.fillStyle = "rgb(255,255,255)", i.fillRect(0, 0, 2, 2), fallbackTexture.setImage(e, t)
			},
			createFallbackCubeTexture: function(e) {
				fallbackCubeTexture = new CubeTexture(e);
				var t = document.createElement("canvas");
				t.width = 2, t.height = 2;
				var i = t.getContext("2d");
				i.fillStyle = "rgb(255,255,255)", i.fillRect(0, 0, 2, 2), fallbackCubeTexture.setFace(e, CubeTexture.FRONT, t, !0), fallbackCubeTexture.setFace(e, CubeTexture.BACK, t, !0), fallbackCubeTexture.setFace(e, CubeTexture.LEFT, t, !0), fallbackCubeTexture.setFace(e, CubeTexture.RIGHT, t, !0), fallbackCubeTexture.setFace(e, CubeTexture.TOP, t, !0), fallbackCubeTexture.setFace(e, CubeTexture.BOTTOM, t, !0)
			},
			bind: function(e, t, i) {
				if (e.gl.activeTexture(i + e.gl.TEXTURE0), e.gl.uniform1i(t, i), !this.texture || !this.texture.loaded) return fallbackTexture || this.createFallbackTexture(e), void fallbackTexture.bind(e);
				this.texture.bind(e)
			},
			unbind: function(e, t, i) {
				e.gl.activeTexture(i + e.gl.TEXTURE0), this.texture && this.texture.loaded ? this.texture.unbind(e) : fallbackTexture.unbind(e)
			},
			clone: function() {
				var e = this._super();
				return e.name = this.name, e.texture = this.texture, e
			}
		}),
		Camera = Serializable.extend({
			init: function(e, t, i) {
				this.viewMatrix = e, this.projectionMatrix = t, this.viewInverseMatrix = mat4.create(), mat4.invert(this.viewInverseMatrix, this.viewMatrix), this.renderStage = i, this.target = new TargetScreen, this.backgroundColor = new Color(0, 0, 0, 0), this.clearMask = !1, this.order = 0, this.layerMask = 4294967295;
				var n = this.frustum = !1;
				this.stereo = function(e) {
					return e && (n = !0), !1 === e && (
						n = !1), n
				};
				var r = 2;
				this.stereoEyeDistance = function(e) {
					return e && (r = e), r
				}, this._viewportSize = vec2.create(), this._viewportPosition = vec2.create(), this._originalViewMatrix = mat4.create(), this._eyeSeparation = mat4.create(), this._cacheQuat = quat.create(), this._strafe = vec3.create(), this._translation = vec3.create()
			},
			type: function() {
				return "Camera"
			},
			excluded: function() {
				return ["renderStage", "target"]
			},
			clearBuffers: function(e) {
				e.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a), e.gl.clearDepth(1), e.gl.depthMask(!0), !1 === this.clearMask ? e.gl.clear(e.gl.COLOR_BUFFER_BIT | e.gl.DEPTH_BUFFER_BIT) : e.gl.clear(this.clearMask)
			},
			startRender: function(e) {
				e.projection.push(), e.projection.multiply(this.projectionMatrix), e.modelview.push(), e.modelview.multiply(this.viewMatrix)
			},
			renderScene: function(e, t, i, n) {
				i && i(e, this), this.renderStage.render(e, t, this), n && n(e, this)
			},
			endRender: function(e) {
				e.modelview.pop(), e.projection.pop()
			},
			render: function(e, t, i, n) {
				if (this.target.resetViewport(), this.clearBuffers(e), (e.camera = this).stereo()) {
					mat4.invert(this.viewInverseMatrix, this.viewMatrix), vec2.copy(this._viewportPosition, this.target.viewport.position), vec2.copy(this._viewportSize, this.target.viewport.size);
					var r = this._viewportSize[0] / 2;
					this.target.viewport.size[0] = r;
					var s = this.stereoEyeDistance() / 2;
					this.getStrafeVector(this._strafe), mat4.copy(this._originalViewMatrix, this.viewMatrix), vec3.scale(this._translation, this._strafe, -s), mat4.fromRotationTranslation(this._eyeSeparation, quat.create(), this._translation), mat4.mul(this.viewMatrix, this.viewMatrix, this._eyeSeparation), mat4.invert(this.viewInverseMatrix, this.viewMatrix), this.target.viewport.position[0] = 0, this.startRender(e), this.renderScene(e, t, i, n), this.endRender(e), mat4.copy(this.viewMatrix, this._originalViewMatrix), vec3.scale(this._translation, this._strafe, s), mat4.fromRotationTranslation(this._eyeSeparation, quat.create(), this._translation), mat4.mul(this.viewMatrix, this.viewMatrix, this._eyeSeparation), mat4.invert(this.viewInverseMatrix, this.viewMatrix), this.target.viewport.position[0] = r, this.startRender(e), this.renderScene(e, t, i, n), this.endRender(e), vec2.copy(this.target.viewport.position, this._viewportPosition), vec2.copy(this.target.viewport.size, this._viewportSize), mat4.copy(this.viewMatrix, this._originalViewMatrix)
				} else mat4.invert(this.viewInverseMatrix, this.viewMatrix), this.startRender(e), this.renderScene(e, t, i, n), this.endRender(e);
				e.camera = !1
			},
			getFieldOfView: function() {
				return 2 * Math.atan(1 / this.projectionMatrix[5])
			},
			getDirection: function(e) {
				return e || (e = vec3.create()), e[0] = -this.viewMatrix[8], e[1] = -this.viewMatrix[9], e[2] = -this.viewMatrix[10], e
			},
			getUpVector: function(e) {
				return e || (e = vec3.create()), e[0] = this.viewMatrix[4], e[1] = this.viewMatrix[5], e[2] = this.viewMatrix[6], e
			},
			getStrafeVector: function(e) {
				return e || (e = vec3.create()), e[0] = this.viewMatrix[0], e[1] = this.viewMatrix[1], e[2] = this.viewMatrix[2], e
			},
			getPosition: function(e) {
				return e || (e = vec3.create()), mat4.translation(e, this.viewInverseMatrix), e
			},
			setPosition: function(e) {
				var t = this.getPosition();
				vec3.sub(t, t, e);
				var i = mat4.fromTranslation(mat4.create(), t);
				mat4.mul(this.viewMatrix, this.viewMatrix, i)
			},
			center: function(e) {
				var t = this.getDirection(),
					i = this.getPosition(),
					n = new Plane;
				n.setByNormalAndPoint(t, i);
				var r = n.projectToPlane(e);
				this.setPosition(r)
			},
			fitToView: function(e) {
				if (e instanceof BoundingVolume && e.center && (this.center(e.center), !e.isPoint())) {
					var t = 0;
					e instanceof BoundingSphere ? t = 2 * e.radius : e instanceof BoundingBox && (t = 2 * e.getOuterSphereRadius());
					var i = t / Math.sin(this.getFieldOfView() / 2) - t,
						n = this.getDirection(),
						r = vec3.create();
					vec3.scale(n, n, -i), vec3.add(r, e.center, n), this.setPosition(r)
				}
			}
		});

	function TransparencySort(e, t) {
		if (!e && !t) return 0;
		if (e && !t) return -1;
		if (!e && t) return 1;
		var i = vec3.squaredDistance(TransparencySort.cmpValue, e.globalBoundingSphere.center),
			n = vec3.squaredDistance(TransparencySort.cmpValue, t.globalBoundingSphere.center);
		return n < i ? -1 : i < n ? 1 : 0
	}

	function Batch(i) {
		this.indices = new Array, this.length = 0;
		var n = this;
		this.clear = function() {
			for (var e = 0, t = n.indices.length; e < t; ++e) n.indices[e] = -1;
			n.length = 0
		}, this.add = function(e) {
			(function(e, t) {
				for (var i = 0, n = e.length; i < n; i++)
					if (e[i] === t) return !0;
				return !1
			})(n.indices, e) || (n.indices[n.length++] = e)
		}, this.get = function(e) {
			if (0 <= e && e < n.indices.length) {
				var t = n.indices[e];
				if (0 <= t && t < i.length) return i[t]
			}
		}
	}
	TransparencySort.cmpValue = vec3.create();
	var RendererOrganizer = FrakClass.extend({
		init: function() {
			this.enableDynamicBatching = !0, this.solidRenderers = [], this.transparentRenderers = [], this.opaqueBatchList = [], this.transparentBatchList = [], this.batchIndex = {}, this.renderers = new CollectionReference([]), this.viewSolidRenderers = new CollectionView(this.renderers, function(e) {
				return !e.transparent
			}), this.viewTransparentRenderers = new CollectionView(this.renderers, function(e) {
				return e.transparent
			}), this.visibleRenderers = 0, this.visibleSolidRenderers = 0, this.visibleSolidBatches = 0, this.visibleSolidFaces = 0, this.visibleTransparentRenderers = 0, this.visibleTransparentFaces = 0, this.visibleTransparentBatches = 0
		},
		updateStats: function() {
			this.visibleSolidRenderers = this.viewSolidRenderers.length, this.visibleTransparentRenderers = this.viewTransparentRenderers.length, this.visibleRenderers = this.visibleSolidRenderers + this.visibleTransparentRenderers
		},
		batch: function(e, t) {
			for (var i, n, r = 0; r < e.length; ++r) e[r].clear();
			for (r = 0; r < t.length && (n = t[r]); ++r) n.material.id in this.batchIndex ? i = e[this.batchIndex[n.material.id]] : (i = new Batch(t), e.push(i), this.batchIndex[n.material.id] = e.length - 1), i ? i.add(r) : (i = new Batch(t), e.push(i), this.batchIndex[n.material.id] = e.length - 1)
		},
		sort: function(e, t, i) {
			this.renderers.list = t, this.viewSolidRenderers.filter(), this.viewTransparentRenderers.filter(), this.solidRenderers = this.viewSolidRenderers.view, this.transparentRenderers = this.viewTransparentRenderers.view, this.enableDynamicBatching && ("sorted" != e.options.transparencyMode && this.batch(this.transparentBatchList, this.transparentRenderers), this.batch(this.opaqueBatchList, this.solidRenderers)), "sorted" == e.options.transparencyMode && i && (vec3.copy(TransparencySort.cmpValue, i), this.transparentRenderers.sort(TransparencySort)), this.updateStats()
		}
	});

	function ScreenQuad(t, e, i, n, r) {
		e = e || -1, i = i || -1, n = n || 2, r = r || 2;
		var s = [0, 1, 2, 0, 2, 3];
		if (t.engine && !0 === t.engine.options.useVAO) try {
			this.quad = new TrianglesRenderBufferVAO(t, s)
		} catch (e) {
			this.quad = new TrianglesRenderBuffer(t, s)
		} else this.quad = new TrianglesRenderBuffer(t, s);
		this.vertices = new Float32Array(12), this.vertices[0] = e, this.vertices[1] = i, this.vertices[3] = e, this.vertices[4] = i + r, this.vertices[6] = e + n, this.vertices[7] = i + r, this.vertices[9] = e + n, this.vertices[10] = i, this.quad.add("position", this.vertices, 3), this.quad.add("uv0", [0, 0, 0, 1, 1, 1, 1, 0], 2)
	}
	ScreenQuad.prototype.update = function(e, t, i, n) {
		this.vertices[0] = e, this.vertices[1] = t, this.vertices[3] = e, this.vertices[4] = t + n, this.vertices[6] = e + i, this.vertices[7] = t + n, this.vertices[9] = e + i, this.vertices[10] = t, this.quad.update("position", this.vertices)
	}, ScreenQuad.prototype.render = function(e, t, i) {
		var n;
		e.gl;
		i && (n = i instanceof Sampler ? [i] : i), t.bind({}, n), this.quad.render(t.shader), t.unbind(n)
	};
	var RenderStage = FrakClass.extend({
			init: function() {
				this.parent = !1, this.substages = [], this.started = !1, this.enabled = !0
			},
			addStage: function(e) {
				return (e.parent = this).substages.push(e), e
			},
			removeStage: function(e) {
				for (var t = 0; t < this.substages.length; t++)
					if (this.substages[t] === e) return e.parent = !1, this.substages.splice(t, 1), !0;
				return !1
			},
			removeStagesByType: function(e) {
				for (var t = [], i = 0; i < this.substages.length; i++) this.substages[i] instanceof e && (t.push(this.substages[i]), this.substages.splice(i, 1), i--);
				for (i = 0; i < t.length; i++) t[i].parent = !1;
				return t
			},
			clearStages: function() {
				for (var e = 0; e < this.substages.length; e++) this.substages[e].parent = !1;
				this.substages = []
			},
			getStageByType: function(e) {
				for (var t = 0; t < this.substages.length; t++)
					if (this.substages[t] instanceof e) return this.substages[t];
				return !1
			},
			start: function(e, t, i) {
				this.started = !0, this.onStart(e, t, i);
				for (var n = 0; n < this.substages.length; n++) this.substages[n].start(e, t, i)
			},
			render: function(e, t, i) {
				if (this.enabled) {
					this.onPreRender(e, t, i);
					for (var n = 0; n < this.substages.length; n++) this.substages[n].started || this.substages[n].start(e, t.engine, i), this.
					substages[n].render(e, t, i);
					this.onPostRender(e, t, i)
				}
			},
			enable: function() {
				return this.enabled = !0, this.onEnable(), this
			},
			disable: function() {
				return this.enabled = !1, this.onDisable(), this
			},
			onStart: function(e, t, i) {},
			onPreRender: function(e, t, i) {},
			onPostRender: function(e, t, i) {},
			onEnable: function() {},
			onDisable: function() {}
		}),
		MaterialRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.organizer = new RendererOrganizer, this.solidRenderers = [], this.solidRendererBatches = {}, this.transparentRenderers = [], this.transparentRendererBatches = {}, this.shadowFallback = null, this.diffuseFallback = null, this.bindCameraTarget = {
					started: !0,
					start: function() {},
					render: function(e, t, i) {
						i.target.bind(e)
					}
				}, this.unbindCameraTarget = {
					started: !0,
					start: function() {},
					render: function(e, t, i) {
						i.target.unbind(e)
					}
				}, this.shadowMapStage = this.addStage(new ShadowMapRenderStage), this.depthStage = this.addStage(new DepthRenderStage).disable(), this.oitStage = this.addStage(new OITRenderStage).disable(), this.addStage(this.bindCameraTarget), this.skyboxStage = this.addStage(new SkyboxRenderStage), this.opaqueStage = this.addStage(new OpaqueGeometryRenderStage), this.transparentStage = this.addStage(new TransparentGeometryRenderStage), this.addStage(this.unbindCameraTarget), this.eyePosition = vec3.create(), this.invModelview = mat4.create(), this.sharedUniforms = {
					view: new UniformMat4(mat4.create()),
					viewInverse: new UniformMat4(mat4.create()),
					projection: new UniformMat4(mat4.create())
				}, this.rendererUniforms = {
					model: new UniformMat4(null),
					modelview: new UniformMat4(null),
					receiveShadows: new UniformInt(1)
				}, this.shadowUniforms = {
					lightView: new UniformMat4(mat4.create()),
					lightProjection: new UniformMat4(mat4.create()),
					shadowBias: new UniformFloat(.001),
					hasFloat: new UniformInt(1),
					useVSM: new UniformInt(1)
				}, this.cachedUniforms = null, this.samplerAccum = new SamplerAccumulator
			},
			onStart: function(e, t, i) {
				this.diffuseFallback = new Sampler("diffuse0", t.WhiteTexture), this.shadowFallback = new Sampler("shadow0", t.WhiteTexture), !0 === t.options.ssao && this.depthStage.enable(), "sorted" != t.options.transparencyMode && this.oitStage.enable()
			},
			prepareShadowContext: function(e, t) {
				this._shadowContext || (this._shadowContext = {
					shadow0: this.shadowFallback,
					lightProjection: this.shadowUniforms.lightProjection,
					lightView: this.shadowUniforms.lightView
				}), e.shadow = this._shadowContext, e.shadow.shadow0 = this.shadowFallback;
				var i = this.shadowMapStage.getFirstShadowCastingLight(t);
				i && (mat4.copy(this.shadowUniforms.lightView.value, i.lightView), mat4.copy(this.shadowUniforms.lightProjection.value, i.lightProj), this.shadowUniforms.shadowBias.value = i.shadowBias, this.shadowUniforms.hasFloat.value = i.shadow instanceof TargetTextureFloat ? 1 : 0, 1 == this.shadowUniforms.hasFloat.value && this.shadowMapStage.extStandardDerivatives ? this.shadowUniforms.useVSM.value = 1 : this.shadowUniforms.useVSM.value = 0, e.shadow.shadow0 = i.shadowSampler)
			},
			prepareLightContext: function(e, t) {
				for (var i = 0; i < t.lights.length; i++) {
					var n = t.lights[i];
					n instanceof DirectionalLight && (n.enabled && (n.uniforms ? (vec3.copy(n.uniforms.lightDirection.value, n.direction), n.uniforms.lightIntensity.value = n.intensity, n.uniforms.lightColor.value[0] = n.color.r, n.uniforms.lightColor.value[1] = n.color.g, n.uniforms.lightColor.value[2] = n.color.b, n.uniforms.lightColor.value[3] = n.color.a, n.uniforms.useShadows.value = n.shadowCasting ? 1 : 0) : n.uniforms = {
						lightDirection: new UniformVec3(n.direction),
						lightColor: new UniformColor(n.color),
						lightIntensity: new UniformFloat(n.intensity),
						useShadows: new UniformInt(n.shadowCasting ? 1 : 0)
					}))
				}
			},
			prepareShared: function(e) {
				mat4.invert(this.invModelview, e.modelview.top()), mat4.translation(this.eyePosition, this.invModelview), mat4.copy(this.sharedUniforms.projection.value, e.projection.top()), mat4.copy(this.sharedUniforms.view.value, e.camera.viewMatrix), mat4.copy(this.sharedUniforms.viewInverse.value, e.camera.viewInverseMatrix)
			},
			onPreRender: function(e, t, i) {
				this.prepareShared(e);
				var n = t.dynamicSpace.frustumCast(i.frustum, i.layerMask);
				this.organizer.sort(t.engine, n, this.eyePosition), this.solidRenderers = this.organizer.solidRenderers, this.transparentRenderers = this.organizer.transparentRenderers, this.
				solidRendererBatches = this.organizer.solidRendererBatches, this.transparentRendererBatches = this.organizer.transparentRendererBatches, this.prepareLightContext(e, t), this.prepareShadowContext(e, t)
			},
			onPostRender: function(e, t, i) {
				e.shadow = !1, e.light = !1
			},
			renderBatched: function(e, t) {
				for (var i = !1, n = 0, r = t.length; n < r; ++n) {
					var s = t[n];
					if (s.get(0)) {
						var a, o = s.get(0).material,
							h = o.shader;
						h != i && (h.use(), i = h, e.shadow && h.bindUniforms(this.shadowUniforms), h.bindUniforms(this.sharedUniforms), e.light && e.light.uniforms && h.bindUniforms(e.light.uniforms)), this.samplerAccum.add(e.shadow.shadow0);
						for (var u = 0, c = o.samplers.length; u < c; ++u) this.samplerAccum.add(o.samplers[u]);
						0 == this.samplerAccum.length && this.samplerAccum.add(this.diffuseFallback), h.bindSamplers(this.samplerAccum.samplers), h.bindUniforms(o.uniforms);
						u = 0;
						for (var l = s.length; u < l; ++u) a = s.get(u), e.modelview.push(), e.modelview.multiply(a.matrix), this.rendererUniforms.model.value = a.matrix, this.rendererUniforms.modelview.value = e.modelview.top(), this.rendererUniforms.receiveShadows.value = a.receiveShadows, h.bindUniforms(this.rendererUniforms), a.render(e), e.modelview.pop();
						h.unbindSamplers(this.samplerAccum.samplers), this.samplerAccum.clear()
					}
				}
			},
			renderBruteForce: function(e, t) {
				for (var i = 0; i < t.length; ++i) {
					var n = t[i];
					if (!n) break;
					e.modelview.push(), e.modelview.multiply(n.matrix), this.cachedUniforms = n.getDefaultUniforms(e, null), n.material.bind(this.cachedUniforms, e.shadow.shadow0), n.render(e), n.material.unbind(), e.modelview.pop()
				}
			}
		}),
		ShaderRenderStage = RenderStage.extend({
			init: function(e, t) {
				this._super(t), this.shader = e, this.uniforms = {}
			},
			onPostRender: function(e, t, i) {
				this.shader.use(this.uniforms), this.shader.requirements.transparent && (e.gl.blendFunc(e.gl.SRC_ALPHA, e.gl.ONE), e.gl.enable(e.gl.BLEND));
				for (var n = t.dynamicSpace.frustumCast(i.frustum, i.layerMask), r = 0; r < n.length; r++) n[r].renderGeometry(e, this.shader);
				this.shader.requirements.transparent && e.gl.disable(e.gl.BLEND)
			}
		}),
		DepthRenderStage = RenderStage.extend({
			init: function(e) {
				this._super(), this.target = null, this.sampler = new Sampler("depth0", null), this.size = vec2.fromValues(1024, 1024), e && vec2.copy(this.size, e), this.clearColor = new Color(0, 0, 0, 0)
			},
			onStart: function(e, t) {
				try {
					this.target = new TargetTextureFloat(this.size, e, !1), this.sampler.texture = this.target.texture
				} catch (e) {
					return console.warn("DepthRenderStage: ", e), void this.disable()
				}
				this.material = new Material(t.assetsManager.addShaderSource("shaders/default/depth"), {
					zNear: new UniformFloat(.1),
					zFar: new UniformFloat(1e3)
				}, [])
			},
			onPreRender: function(e, t, i) {
				if (this.target.resetViewport(), i.target.size[0] != this.size[0] || i.target.size[1] != this.size[1]) {
					var n = i.target.size;
					vec2.copy(this.size, n), this.target.setSize(n[0], n[1])
				}
			},
			onPostRender: function(e, t, i) {
				this.material.uniforms.zNear.value = i.near, this.material.uniforms.zFar.value = i.far, e.projection.push(), e.projection.load(i.projectionMatrix), e.modelview.push(), e.modelview.load(i.viewMatrix), this.target.bind(e, !1, this.clearColor);
				var n = e.gl;
				n.enable(n.DEPTH_TEST), n.depthFunc(n.LESS), n.depthMask(!0), this.material.bind();
				for (var r = this.parent.organizer.solidRenderers, s = 0; s < r.length && r[s]; ++s) e.modelview.push(), e.modelview.multiply(r[s].matrix), this.material.shader.bindUniforms(r[s].material.uniforms), r[s].renderGeometry(e, this.material.shader), e.modelview.pop();
				this.material.unbind(), this.renderAlphaMapped(e, t, i), n.disable(n.DEPTH_TEST), this.target.unbind(e), e.modelview.pop(), e.projection.pop()
			},
			renderAlphaMapped: function(e, t, i) {
				var n = this.parent.organizer.transparentBatchList,
					r = this.material.shader;
				r.use(), r.bindUniforms(this.material.uniforms), r.bindUniforms(this.parent.sharedUniforms), e.light && e.light.uniforms && r.bindUniforms(e.light.uniforms);
				for (var s = 0; s < n.length; s++) {
					var a = n[s];
					if (0 != a.length) {
						var o, h, u = a.get(0).material;
						o = 0 < this.material.samplers.length ? this.material.samplers.concat(u.samplers) : u.samplers, r.bindUniforms(u.uniforms), r.bindSamplers(o);
						for (var c = 0; c < a.length; ++c) h = a.get(c), e.modelview.push(), e.modelview.multiply(h.matrix), this.parent.rendererUniforms.model.value = h.matrix, this.parent.rendererUniforms.modelview.value = e.modelview.top(), r.
						bindUniforms(this.parent.rendererUniforms), h.renderGeometry(e, r), e.modelview.pop();
						r.unbindSamplers(o)
					}
				}
			}
		}),
		ShadowMapRenderStage = RenderStage.extend({
			init: function(e) {
				this._super(), this.material = null, this.clearColor = new Color(0, 0, 0, 1), this.lightPosition = vec3.create(), this.lightLookTarget = vec3.create(), this.lightUpVector = vec3.fromValues(0, 1, 0), this.aabbVertices = [vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create()], this.sceneAABB = new BoundingBox, this.lightFrustum = new BoundingBox
			},
			onStart: function(e, t) {
				var i = "forward_shadow";
				this.extStandardDerivatives = e.gl.getExtension("OES_standard_derivatives"), this.extStandardDerivatives && (i = "forward_shadow_vsm"), this.material = new Material(t.assetsManager.addShader("shaders/default/forward_shadow.vert", "shaders/default/{0}.frag".format(i)), {
					hasFloat: new UniformInt(1)
				}, []), t.assetsManager.load()
			},
			onPostRender: function(e, t, i) {
				var n = this.getFirstShadowCastingLight(t);
				if (n) {
					this.computeSceneBounds(), vec3.copy(this.lightPosition, this.sceneAABB.center), vec3.sub(this.lightLookTarget, this.lightPosition, n.direction), mat4.lookAt(n.lightView, this.lightPosition, this.lightLookTarget, this.lightUpVector), this.sceneAABB.getVertices(this.aabbVertices);
					for (var r = 0; r < 8; r++) vec3.transformMat4(this.aabbVertices[r], this.aabbVertices[r], n.lightView);
					this.lightFrustum.set(this.aabbVertices[0], [0, 0, 0]);
					for (r = 1; r < 8; r++) this.lightFrustum.encapsulatePoint(this.aabbVertices[r]);
					mat4.ortho(n.lightProj, this.lightFrustum.min[0], this.lightFrustum.max[0], this.lightFrustum.min[1], this.lightFrustum.max[1], this.lightFrustum.min[2], this.lightFrustum.max[2]), n.shadow instanceof TargetTextureFloat ? this.material.uniforms.hasFloat.value = 1 : this.material.uniforms.hasFloat.value = 0, e.projection.push(), e.projection.load(n.lightProj), e.modelview.push(), e.modelview.load(n.lightView), n.shadow.bind(e, !1, this.clearColor);
					var s = e.gl;
					s.enable(s.DEPTH_TEST), s.depthFunc(s.LESS), s.depthMask(!0), s.colorMask(!0, !0, !0, !0), this.material.bind();
					var a = this.parent.organizer.solidRenderers;
					for (r = 0; r < a.length && a[r]; ++r) a[r].layer & n.shadowMask && a[r].castShadows && (e.modelview.push(), e.modelview.multiply(a[r].matrix), this.material.shader.bindUniforms(a[r].material.uniforms), a[r].renderGeometry(e, this.material.shader), e.modelview.pop());
					this.material.unbind(), this.renderAlphaMapped(e, n), s.disable(s.DEPTH_TEST), n.shadow.unbind(e), n.updateSamplers(), this.parent.prepareShadowContext(e, t), e.modelview.pop(), e.projection.pop()
				}
			},
			renderAlphaMapped: function(e, t) {
				var i, n = this.parent.organizer.transparentBatchList,
					r = this.material.shader,
					s = [this.parent.diffuseFallback];
				r.use(), r.bindUniforms(this.material.uniforms), r.bindUniforms(this.parent.sharedUniforms);
				for (var a = 0; a < n.length; a++) {
					var o = n[a];
					if (0 != o.length) {
						var h, u = o.get(0).material;
						i = 0 < u.samplers.length ? u.samplers : s, r.bindUniforms(u.uniforms), r.bindSamplers(i);
						for (var c = 0; c < o.length; ++c)(h = o.get(c)).layer & t.shadowMask && h.castShadows && (e.modelview.push(), e.modelview.multiply(h.matrix), this.parent.rendererUniforms.model.value = h.matrix, this.parent.rendererUniforms.modelview.value = e.modelview.top(), r.bindUniforms(this.parent.rendererUniforms), h.renderGeometry(e, r), e.modelview.pop());
						r.unbindSamplers(i)
					}
				}
			},
			computeSceneBounds: function() {
				!1 === this.sceneAABB.center && (this.sceneAABB.center = vec3.create()), vec3.set(this.sceneAABB.center, 0, 0, 0), vec3.set(this.sceneAABB.extents, 0, 0, 0), this.sceneAABB.recalculate();
				for (var e = this.parent.organizer.solidRenderers, t = this.parent.organizer.transparentRenderers, i = 0; i < e.length && e[i]; i++) e[i].castShadows && this.sceneAABB.encapsulateBox(e[i].globalBoundingBox);
				for (i = 0; i < t.length && t[i]; i++) t[i].castShadows && this.sceneAABB.encapsulateBox(t[i].globalBoundingBox);
				return this.sceneAABB
			},
			getFirstShadowCastingLight: function(e) {
				for (var t = 0; t < e.lights.length; t++)
					if (e.lights[t] instanceof DirectionalLight && e.lights[t].enabled && !0 === e.lights[t].shadowCasting) return e.lights[t];
				return !1
			}
		}),
		PositionBufferRenderStage = RenderStage.extend({
			init: function(e) {
				this._super(), this.size = 2048, e && (this.size = e), this.target = !1
			},
			onStart: function(e, t) {
				this.
				target = new TargetTextureFloat([this.size, this.size], e, !1), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/positionbuffer"), {
					ViewportSize: new UniformVec2(vec2.clone(t.scene.camera.target.size))
				}, []);
				this.quad = new TrianglesRenderBuffer(e, [0, 1, 2, 0, 2, 3]), this.quad.add("position", [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0], 3), this.quad.add("texcoord2d0", [0, 1, 0, 0, 1, 0, 1, 1], 2), t.assetsManager.load(function() {})
			},
			onPreRender: function(e, t, i) {
				vec2.set(this.material.uniforms.ViewportSize.value, i.target.size[0], i.target.size[1])
			},
			onPostRender: function(e, t, i) {
				if (this.parent && this.parent instanceof MaterialRenderStage && this.target && this.material) {
					this.target.bind(e);
					var n = e.gl;
					n.depthMask(!0), n.clearDepth(1), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT), n.enable(n.DEPTH_TEST), n.depthFunc(n.LESS), this.material.bind();
					for (var r = 0; r < this.parent.solidRenderers.length && this.parent.solidRenderers[r]; ++r) this.parent.solidRenderers[r].layer && this.parent.solidRenderers[r].visible && (e.modelview.push(), e.modelview.multiply(this.parent.solidRenderers[r].matrix), this.parent.solidRenderers[r].renderGeometry(e, this.material.shader), e.modelview.pop());
					this.material.unbind(), n.depthMask(!0), n.disable(n.DEPTH_TEST), this.target.unbind(e)
				}
			}
		}),
		SSAOBufferRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.size = !1, this.quad = !1, this.target = !1
			},
			setSize: function(e, t) {
				!1 === this.size && (this.size = vec2.create()), this.size[0] = e, this.size[1] = t
			},
			onStart: function(e, t) {
				this.size || (this.size = vec2.clone(t.scene.camera.target.size)), this.target = new TargetTextureFloat([t.scene.camera.target.size[0], t.scene.camera.target.size[1]], e, !1), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/ssao"), {
					ViewportSize: new UniformVec2(vec2.clone(t.scene.camera.target.size)),
					ssaoGDisplace: new UniformFloat(t.options.ssaoGDisplace ? t.options.ssaoGDisplace : 6),
					ssaoRadius: new UniformFloat(t.options.ssaoRadius ? t.options.ssaoRadius : 8),
					ssaoDivider: new UniformFloat(t.options.ssaoDivider ? t.options.ssaoDivider : .5)
				}, [new Sampler("position0", this.parent.positionBufferStage.target.texture)]), this.material.name = "SSAO";
				this.quad = new TrianglesRenderBuffer(e, [0, 1, 2, 0, 2, 3]), this.quad.add("position", [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0], 3), this.quad.add("texcoord2d0", [0, 1, 0, 0, 1, 0, 1, 1], 2), t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				var n = i.target;
				n.size[0] == this.target.size[0] && n.size[1] == this.target.size[1] || (vec2.set(this.material.uniforms.ViewportSize.value, i.target.size[0], i.target.size[1]), this.setSize(n.size[0], n.size[1]), this.target.setSize(n.size[0], n.size[1]))
			},
			onPostRender: function(e, t, i) {
				if (this.parent && this.parent instanceof MaterialRenderStage && this.target && this.material) {
					this.target.bind(e);
					var n = e.gl;
					if (n.disable(n.DEPTH_TEST), n.disable(n.CULL_FACE), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), this.material.bind(), this.material.shader.linked) {
						var r = [];
						for (var s in this.quad.buffers) {
							n.bindBuffer(n.ARRAY_BUFFER, this.quad.buffers[s]);
							var a = n.getAttribLocation(this.material.shader.program, s); - 1 != a && (n.enableVertexAttribArray(a), r.push(a), n.vertexAttribPointer(a, this.quad.buffers[s].itemSize, n.FLOAT, !1, 0, 0))
						}
						for (var o in this.quad.drawElements(), r) n.disableVertexAttribArray(r[o])
					}
					this.material.unbind(), this.target.unbind(e)
				}
			}
		}),
		SkyboxRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.uniforms = {
					model: new UniformMat4(mat4.create()),
					modelview: new UniformMat4(mat4.create()),
					projection: new UniformMat4(mat4.create()),
					view: new UniformMat4(mat4.create()),
					viewInverse: new UniformMat4(mat4.create()),
					zNear: new UniformFloat(0),
					zFar: new UniformFloat(0),
					lightDirection: new UniformVec3(vec3.create()),
					lightColor: new UniformColor(new Color),
					lightIntensity: new UniformFloat(1)
				}, this.shadowFallback = null
			},
			onStart: function(e, t, i) {
				this.shadowFallback = new Sampler("shadow0", t.WhiteTexture)
			},
			onPostRender: function(e, t, i) {
				var n = t.cameraNode.getComponent(SkyboxComponent);
				if (n)
					for (var r = [this.shadowFallback], s = n.meshNode.getComponent(MeshRendererComponent).meshRenderers, a = 0; a < s.length; a++) {
						var o = s[a],
							h = o.getDefaultUniforms(e, this.uniforms);
						mat4.identity(h.model.value), mat4.translate(h.model.value, h.model.value, i.getPosition()), o.material.bind(h, r), o.render(e), o.material.unbind(r)
					}
			}
		}),
		OpaqueGeometryRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.activeLights = []
			},
			getDirectionalLights: function(e) {
				this.activeLights.length < e.lights.length && (this.activeLights.length = e.lights.length);
				for (var t, i = 0, n = 0; n < e.lights.length; ++n)(t = e.lights[n]) instanceof DirectionalLight && t.enabled && (this.activeLights[i++] = t);
				for (n = i; n < e.lights.length; ++n) this.activeLights[n] = null;
				return this.activeLights
			},
			onPostRender: function(e, t, i) {
				var n = this.getDirectionalLights(t),
					r = e.gl;
				if (r.enable(r.DEPTH_TEST), r.depthFunc(r.LESS), r.depthMask(!0), 0 < n.length && n[0] && (e.light = n[0]), this.parent.organizer.enableDynamicBatching ? this.parent.renderBatched(e, this.parent.organizer.opaqueBatchList) : this.parent.renderBruteForce(e, this.parent.organizer.solidRenderers), 1 < n.length && n[1]) {
					r.depthMask(!1), r.depthFunc(r.LEQUAL), r.blendFunc(r.ONE, r.ONE), r.enable(r.BLEND);
					for (var s = 1; s < n.length && n[s]; s++) e.light = n[s], this.parent.organizer.enableDynamicBatching ? this.parent.renderBatched(e, this.parent.organizer.opaqueBatchList) : this.parent.renderBruteForce(e, this.parent.organizer.solidRenderers);
					r.disable(r.BLEND), r.depthMask(!0), r.depthFunc(r.LESS)
				}
				r.disable(r.DEPTH_TEST), e.light = !1
			}
		}),
		TransparentGeometryRenderStage = RenderStage.extend({
			renderSorted: function(e, t, i) {
				var n = e.gl;
				n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA), n.enable(n.BLEND), n.depthMask(!1), n.depthFunc(n.LESS), n.enable(n.DEPTH_TEST), this.parent.renderBruteForce(e, this.parent.organizer.transparentRenderers), n.disable(n.BLEND), n.disable(n.DEPTH_TEST), n.depthMask(!0)
			},
			onPostRender: function(e, t, i) {
				"sorted" == t.engine.options.transparencyMode ? this.renderSorted(e, t, i) : this.parent.oitStage.renderAlphaMapped(e, t, i)
			}
		}),
		OITRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.diffuseFallback = null, this.oitClearColor = new Color(0, 0, 0, 0), this.transparencyTarget = !1, this.transparencySampler = !1, this.transparencyWeight = !1, this.transparencyWeightSampler = !1, this.transparencyAccum = !1
			},
			onStart: function(e, t, i) {
				try {
					var n = i.target.size;
					this.transparencyTarget = new TargetTextureFloat(n, e, !1), this.transparencyWeight = new TargetTextureFloat(n, e, !1)
				} catch (e) {
					return console.warn("OITRenderStage: ", e), void this.disable()
				}
				this.transparencySampler = new Sampler("oitAccum", this.transparencyTarget.texture), this.transparencyWeightSampler = new Sampler("oitWeight", this.transparencyWeight.texture), this.diffuseFallback = new Sampler("diffuse0", t.WhiteTexture);
				var r = e.gl;
				this.transparencyWeight.bind(e, !0), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.RENDERBUFFER, this.transparencyTarget.depth), this.transparencyWeight.unbind(e), this.transparencyWeight.depth = this.transparencyTarget.depth, this.transparencyAccum = new Material(t.assetsManager.addShaderSource("shaders/default/OITAccum"), {
					render_mode: new UniformInt(0)
				}, []), this.opaqueDepthMaterial = new Material(t.assetsManager.addShaderSource("diffuse"), {
					useShadows: new UniformInt(0),
					ambient: new UniformColor,
					diffuse: new UniformColor
				}, [this.diffuseFallback, new Sampler("shadow0", t.WhiteTexture)]), t.assetsManager.load()
			},
			onPostRender: function(e, t, i) {
				if (this.transparencyTarget.resetViewport(), this.transparencyWeight.resetViewport(), i.target.size[0] != this.transparencyTarget.size[0] || i.target.size[1] != this.transparencyTarget.size[1]) {
					this.transparencyTarget.setSize(i.target.size[0], i.target.size[1]), this.transparencyWeight.setSize(i.target.size[0], i.target.size[1]);
					var n = e.gl;
					this.transparencyWeight.bind(e, !0), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.RENDERBUFFER, this.transparencyTarget.depth), this.transparencyWeight.unbind(e), this.transparencyWeight.depth = this.transparencyTarget.depth
				}
				e.projection.push(), e.projection.load(i.projectionMatrix), e.modelview.push(), e.modelview.load(i.viewMatrix), this.oitClearColor.set(0, 0, 0, 0), this.transparencyTarget.bind(e, !1, this.oitClearColor), e.gl.depthMask(!0), e.gl.colorMask(!1, !1, !1, !1), this.renderOpaque(e, t, i), this.renderAlphaMapped(e, t, i), e.gl.
				colorMask(!0, !0, !0, !0), this.renderPass(e, t, i, !0), this.transparencyTarget.unbind(e), this.oitClearColor.set(1, 1, 1, 1), this.transparencyWeight.bind(e, !1, this.oitClearColor, e.gl.COLOR_BUFFER_BIT), this.renderPass(e, t, i, !1), this.transparencyWeight.unbind(e), e.modelview.pop(), e.projection.pop()
			},
			renderTransparentBatches: function(e, t, i, n) {
				var r = n.shader;
				r.use(), r.bindUniforms(n.uniforms), e.light && e.light.uniforms && r.bindUniforms(e.light.uniforms);
				for (var s = this.parent.organizer.transparentBatchList, a = 0; a < s.length; a++) {
					var o = s[a];
					if (0 != o.length) {
						var h, u, c = o.get(0).material;
						h = 0 < n.samplers.length ? n.samplers.concat(c.samplers) : c.samplers, 0 == c.samplers.length && h.push(this.diffuseFallback), r.bindUniforms(c.uniforms), r.bindSamplers(h);
						for (var l = 0; l < o.length; ++l) u = o.get(l), e.modelview.push(), e.modelview.multiply(u.matrix), u.renderGeometry(e, r), e.modelview.pop();
						r.unbindSamplers(h)
					}
				}
			},
			renderAlphaMapped: function(e, t, i) {
				var n = e.gl;
				n.depthMask(!0), n.depthFunc(n.LESS), n.enable(n.DEPTH_TEST), this.transparencyAccum.uniforms.render_mode.value = 2, this.renderTransparentBatches(e, t, i, this.transparencyAccum), n.disable(n.DEPTH_TEST)
			},
			renderOpaque: function(e, t, i) {
				var n = e.gl;
				n.enable(n.DEPTH_TEST), n.depthFunc(n.LESS);
				var r = this.opaqueDepthMaterial.shader;
				r.use(), r.bindUniforms(this.opaqueDepthMaterial.uniforms), r.bindSamplers(this.opaqueDepthMaterial.samplers);
				for (var s = this.parent.organizer.solidRenderers, a = 0; a < s.length && s[a]; ++a) e.modelview.push(), e.modelview.multiply(s[a].matrix), s[a].renderGeometry(e, r), e.modelview.pop();
				r.unbindSamplers(this.opaqueDepthMaterial.samplers), n.disable(n.DEPTH_TEST)
			},
			renderPass: function(e, t, i, n) {
				var r = e.gl;
				r.colorMask(!0, !0, !0, !0), r.depthFunc(r.LESS), r.enable(r.DEPTH_TEST), "blended" == t.engine.options.transparencyMode && (this.transparencyAccum.uniforms.render_mode.value = n ? (r.depthMask(!1), r.blendEquation(r.FUNC_ADD), r.blendFunc(r.ONE, r.ONE), r.enable(r.BLEND), 0) : (r.depthMask(!1), r.blendEquation(r.FUNC_ADD), r.blendFunc(r.ZERO, r.ONE_MINUS_SRC_ALPHA), r.enable(r.BLEND), 1)), "stochastic" == t.engine.options.transparencyMode && (this.transparencyAccum.uniforms.render_mode.value = n ? (r.depthMask(!0), 3) : (r.depthMask(!1), r.blendEquation(r.FUNC_ADD), r.blendFunc(r.ZERO, r.ONE_MINUS_SRC_ALPHA), r.enable(r.BLEND), 1)), this.renderTransparentBatches(e, t, i, this.transparencyAccum), r.disable(r.BLEND), r.disable(r.DEPTH_TEST), r.depthMask(!0)
			}
		}),
		PostProcessRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.size = !1, this.src = !1, this.dst = !1, this.srcSampler = !1, this.dstSampler = !1, this.textureQuad = !1, this.screenQuad = !1, this.material = !1, this.generator = this.getGeneratorStage(), this.generator.parent = this
			},
			setSize: function(e, t) {
				!1 === this.size && (this.size = vec2.create()), this.size[0] = e, this.size[1] = t
			},
			getGeneratorStage: function() {
				return new MaterialRenderStage
			},
			onStart: function(e, t, i) {
				this.size || (this.size = vec2.clone(i.target.size)), this.src = new TargetTexture(this.size, e, !1, !0), this.srcSampler = new Sampler("src", this.src.texture), this.dst = new TargetTexture(this.size, e, !1, !0), this.dstSampler = new Sampler("src", this.dst.texture), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/ScreenQuad"), {}, []), this.material.name = "To Screen", this.textureQuad = new ScreenQuad(e), this.screenQuad = new ScreenQuad(e), t.assetsManager.load(), this.generator.start(e, t, i)
			},
			onPreRender: function(e, t, i) {
				var n = i.target;
				this.src.resetViewport(), this.dst.resetViewport(), n.size[0] == this.src.size[0] && n.size[1] == this.src.size[1] || (this.setSize(n.size[0], n.size[1]), this.src.setSize(n.size[0], n.size[1]), this.dst.setSize(n.size[0], n.size[1])), 0 < this.substages.length && (i.target = this.src), this.generator.render(e, t, i), i.target = n
			},
			onPostRender: function(e, t, i) {
				0 != this.substages.length && (i.target instanceof TargetTexture ? (i.target.bind(e), this.renderEffect(e, this.material, this.srcSampler)) : (i.target.bind(e), this.renderEffect(e, this.material, this.srcSampler, !0)), i.target.unbind(e), this.swapBuffers())
			},
			swapBuffers: function() {
				var e = this.src,
					t = this.srcSampler;
				this.src = this.dst, this.srcSampler = this.dstSampler, this.dst = e, this.dstSampler = t
			},
			renderEffect: function(e, t, i, n) {
				var
					r = e.gl;
				r.disable(r.DEPTH_TEST), r.disable(r.CULL_FACE), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), !0 === n ? this.screenQuad.render(e, t, i) : this.textureQuad.render(e, t, i)
			}
		}),
		ForwardRenderStage = PostProcessRenderStage.extend({
			init: function() {
				this._super(), this.debugActive = !1, this.debugger = null
			},
			onPostRender: function(e, t, i) {
				if (this._super(e, t, i), this.debugActive) {
					this.debugger || this.initDebugger(e, t);
					var n = e.gl;
					n.disable(n.DEPTH_TEST), n.disable(n.CULL_FACE), e.modelview.push();
					for (var r = 0; r < this.debugger.quads.length; r++) this.debugger.sampler.texture = this.debugger.quads[r].texture, this.material.bind({}, [this.debugger.sampler]), this.debugger.quads[r].quad.render(this.material.shader), this.material.unbind([this.debugger.sampler]);
					this.debugger.sampler.texture = this.debugger.vsyncTextures[0], this.material.bind({}, [this.debugger.sampler]), this.debugger.vsyncQuad.render(this.material.shader), this.material.unbind([this.debugger.sampler]), this.debugger.vsyncTextures.reverse(), e.modelview.pop()
				}
			},
			debug: function(e) {
				this.debugActive = !(!1 === e)
			},
			initDebugger: function(a, e) {
				var t = new Texture(a);
				t.name = "Red", t.mipmapped = !1, t.clearImage(a, [255, 0, 0, 255]);
				var i = new Texture(a);

				function n(e, t, i, n) {
					var r = [e, t, 0, e, t + n, 0, e + i, t + n, 0, e + i, t, 0],
						s = new TrianglesRenderBuffer(a, [0, 1, 2, 0, 2, 3]);
					return s.add("position", r, 3), s.add("uv0", [0, 0, 0, 1, 1, 1, 1, 0], 2), s
				}
				i.name = "Red", i.mipmapped = !1, i.clearImage(a, [0, 255, 255, 255]), this.debugger = {
					quads: [],
					sampler: new Sampler("tex0", null),
					vsyncQuad: n(.85, .85, .1, .1),
					vsyncTextures: [t, i]
				};
				for (var r = -1, s = 1 - (h = .5), o = 0; o < e.lights.length; o++) e.lights[o].enabled && e.lights[o].shadowCasting && e.lights[o].shadow && e.lights[o] instanceof DirectionalLight && (this.debugger.quads.push({
					quad: n(r, s, h, h),
					texture: e.lights[o].shadow.texture
				}), r += h);
				var h = .5;
				r = -1, s = -1;
				this.generator.oitStage.enabled && (this.debugger.quads.push({
					quad: n(r, s, h, h),
					texture: this.generator.oitStage.transparencyTarget.texture
				}), this.debugger.quads.push({
					quad: n(r += h, s, h, h),
					texture: this.generator.oitStage.transparencyWeight.texture
				})), this.generator.depthStage.enabled && this.debugger.quads.push({
					quad: n(r += h, s, h, h),
					texture: this.generator.depthStage.target.texture
				})
			}
		}),
		DeferredRenderStage = PostProcessRenderStage.extend({
			init: function() {
				this._super(), this.debugActive = !1, this.debugger = null
			},
			onStart: function(e, t, i) {
				if (!e.gl.getExtension("WEBGL_draw_buffers")) throw "DeferredRenderStage: WEBGL_draw_buffers not available.";
				if (!e.gl.getExtension("OES_texture_float")) throw "DeferredRenderStage: OES_texture_float not available.";
				if (!e.gl.getExtension("OES_standard_derivatives")) throw "DeferredRenderStage: OES_standard_derivatives not available.";
				this._super(e, t, i)
			},
			getGeneratorStage: function() {
				return new DeferredShadingRenderStage
			},
			onPreRender: function(e, t, i) {
				var n = i.target;
				if (this.src.resetViewport(), this.dst.resetViewport(), this.generator.gbufferStage.damaged) {
					var r = vec2.scale(vec2.create(), this.generator.gbufferStage.size, this.generator.gbufferStage.quality);
					this.src.setSize(r[0], r[1]), this.dst.setSize(r[0], r[1])
				}
				this.setSize(n.size[0], n.size[1]), 0 < this.substages.length && (i.target = this.src), this.generator.render(e, t, i), i.target = n
			},
			onPostRender: function(e, t, i) {
				if (this._super(e, t, i), this.debugActive) {
					this.debugger || this.initDebugger(e, t);
					var n = e.gl;
					n.disable(n.DEPTH_TEST), n.disable(n.CULL_FACE), e.modelview.push();
					for (var r = 0; r < this.debugger.quads.length; r++) this.debugger.sampler.texture = this.debugger.quads[r].texture, this.material.bind({}, [this.debugger.sampler]), this.debugger.quads[r].quad.render(this.material.shader), this.material.unbind([this.debugger.sampler]);
					e.modelview.pop()
				}
			},
			debug: function(e) {
				this.debugActive = !(!1 === e)
			},
			initDebugger: function(a, e) {
				function t(e, t, i, n) {
					var r = [e, t, 0, e, t + n, 0, e + i, t + n, 0, e + i, t, 0],
						s = new TrianglesRenderBuffer(a, [0, 1, 2, 0, 2, 3]);
					return s.add("position", r, 3), s.add("uv0", [0, 0, 0, 1, 1, 1, 1, 0], 2), s
				}
				this.debugger = {
					quads: [],
					sampler: new Sampler("tex0", null)
				};
				var i = this.generator.gbufferStage.buffer,
					n = 2 / 7,
					r = -1,
					s = -1;
				this.debugger.quads.push({
					quad: t(r, s, n, n),
					texture: i.targets[0]
				}), this.debugger.quads.push({
					quad: t(r += n, s, n, n),
					texture: i.targets[1]
				}), this.debugger.quads.push({
					quad: t(r += n, s, n, n),
					texture: i.targets[2]
				}), this.debugger.quads.push({
					quad: t(r += n, s, n, n),
					texture: i.targets[3]
				}), this.debugger.quads.push({
					quad: t(r += n, s, n, n),
					texture: this.generator.softShadowsStage.target.texture
				}), this.debugger.quads.push({
					quad: t(r += n, s, n, n),
					texture: this.generator.oitStage.transparencyTarget.texture
				}), this.debugger.quads.push({
					quad: t(r += n, s, n, n),
					texture: this.generator.oitStage.transparencyWeight.texture
				}), r = -1, s = 1 - (n = .5);
				for (var o = 0; o < e.lights.length; o++) e.lights[o].enabled && e.lights[o].shadowCasting && e.lights[o].shadow && e.lights[o] instanceof DirectionalLight && (this.debugger.quads.push({
					quad: t(r, s, n, n),
					texture: e.lights[o].shadow.texture
				}), r += n)
			}
		}),
		DeferredShadingRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.organizer = new RendererOrganizer, this.diffuseFallback = null, this.size = vec2.create(), this.bindCameraTarget = {
					started: !0,
					start: function() {},
					render: function(e, t, i) {
						i.target.bind(e, !0)
					}
				}, this.unbindCameraTarget = {
					started: !0,
					start: function() {},
					render: function(e, t, i) {
						i.target.unbind(e)
					}
				}, this.shadowStage = this.addStage(new DeferredShadowRenderStage), this.oitStage = this.addStage(new OITRenderStage), this.gbufferStage = this.addStage(new GBufferRenderStage), this.softShadowsStage = this.addStage(new SoftShadowsRenderStage).disable(), this.addStage(this.bindCameraTarget), this.lightsStage = this.addStage(new LightsRenderStage), this.addStage(this.unbindCameraTarget), this.sharedUniforms = {
					view: new UniformMat4(mat4.create()),
					viewInverse: new UniformMat4(mat4.create()),
					projection: new UniformMat4(mat4.create())
				}, this.rendererUniforms = {
					model: new UniformMat4(null),
					modelview: new UniformMat4(null),
					receiveShadows: new UniformInt(1)
				}
			},
			onStart: function(e, t, i) {
				this.diffuseFallback = new Sampler("diffuse0", t.WhiteTexture), vec2.copy(this.size, this.parent.size), t.options.softShadows && this.softShadowsStage.enable()
			},
			prepareShared: function(e) {
				mat4.copy(this.sharedUniforms.projection.value, e.projection.top()), mat4.copy(this.sharedUniforms.view.value, e.camera.viewMatrix), mat4.copy(this.sharedUniforms.viewInverse.value, e.camera.viewInverseMatrix), vec2.copy(this.size, this.parent.size)
			},
			onPreRender: function(e, t, i) {
				this.prepareShared(e);
				var n = t.dynamicSpace.frustumCast(i.frustum, i.layerMask);
				this.organizer.sort(t.engine, n)
			},
			onPostRender: function(e, t, i) {}
		}),
		DeferredShadowRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.material = null, this.directional = [], this.clearColor = new Color(0, 0, 0, 0), this.lightPosition = vec3.create(), this.lightLookTarget = vec3.create(), this.lightUpVector = vec3.fromValues(0, 1, 0), this.aabbVertices = [vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create()], this.sceneAABB = new BoundingBox, this.lightFrustum = new BoundingBox
			},
			onStart: function(e, t, i) {
				this.extStandardDerivatives = e.gl.getExtension("OES_standard_derivatives"), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/deferred_shadow_directional"), {}, []), t.assetsManager.load()
			},
			collectLights: function(e) {
				for (var t = this.directional.length = 0; t < e.lights.length; t++) e.lights[t].enabled && e.lights[t].shadowCasting && e.lights[t].shadow && e.lights[t] instanceof DirectionalLight && this.directional.push(e.lights[t])
			},
			computeSceneBounds: function() {
				!1 === this.sceneAABB.center && (this.sceneAABB.center = vec3.create()), vec3.set(this.sceneAABB.center, 0, 0, 0), vec3.set(this.sceneAABB.extents, 0, 0, 0), this.sceneAABB.recalculate();
				for (var e = this.parent.organizer.solidRenderers, t = this.parent.organizer.transparentRenderers, i = 0; i < e.length && e[i]; i++) e[i].castShadows && this.sceneAABB.encapsulateBox(e[i].globalBoundingBox);
				for (i = 0; i < t.length && t[i]; i++) t[i].castShadows && this.sceneAABB.encapsulateBox(t[i].globalBoundingBox);
				return this.sceneAABB
			},
			renderDirectionalLightDepth: function(e, t) {
				vec3.copy(this.lightPosition, this.sceneAABB.center), vec3.sub(this.lightLookTarget, this.lightPosition, t.direction), mat4.lookAt(t.lightView, this.lightPosition, this.lightLookTarget, this.lightUpVector), this.sceneAABB.getVertices(this.aabbVertices);
				for (var i = 0; i < 8; i++) vec3.transformMat4(this.aabbVertices[i], this.aabbVertices[i], t.lightView);
				this.lightFrustum.set(this.aabbVertices[0], [0, 0, 0]);
				for (i = 1; i < 8; i++) this.lightFrustum.encapsulatePoint(this.aabbVertices[i]);
				mat4.ortho(t.lightProj, this.lightFrustum.min[0], this.lightFrustum.max[0], this.lightFrustum.min[1], this.lightFrustum.max[1], this.lightFrustum.min[2], this.lightFrustum.max[2]), e.projection.push(), e.projection.load(t.lightProj), e.modelview.push(), e.modelview.load(t.lightView), t.shadow.bind(e, !1, this.clearColor);
				var n = e.gl;
				n.enable(n.DEPTH_TEST), n.depthFunc(n.LESS), n.depthMask(!0), this.material.bind();
				var r = this.parent.organizer.solidRenderers;
				for (i = 0; i < r.length && r[i]; ++i)
					if (r[i].layer & t.shadowMask && r[i].castShadows) {
						var s = this.material.shader;
						e.modelview.push(), e.modelview.multiply(r[i].matrix), s.bindUniforms(r[i].material.uniforms), r[i].renderGeometry(e, s), e.modelview.pop()
					} this.material.unbind(), this.renderAlphaMapped(e, t), n.disable(n.DEPTH_TEST), t.shadow.unbind(e), t.updateSamplers(e), e.modelview.pop(), e.projection.pop()
			},
			renderAlphaMapped: function(e, t) {
				var i, n = this.parent.organizer.transparentBatchList,
					r = this.material.shader,
					s = [this.parent.diffuseFallback];
				r.use(), r.bindUniforms(this.material.uniforms);
				for (var a = 0; a < n.length; a++) {
					var o = n[a];
					if (0 != o.length) {
						var h = o.get(0).material;
						i = 0 < h.samplers.length ? h.samplers : s, r.bindUniforms(h.uniforms), r.bindSamplers(i);
						for (var u = 0; u < o.length; ++u) {
							var c;
							(c = o.get(u)).layer & t.shadowMask && (c.castShadows && (e.modelview.push(), e.modelview.multiply(c.matrix), c.renderGeometry(e, r), e.modelview.pop()))
						}
						r.unbindSamplers(i)
					}
				}
			},
			onPreRender: function(e, t, i) {
				this.collectLights(t), this.computeSceneBounds();
				for (var n = 0; n < this.directional.length; n++) this.renderDirectionalLightDepth(e, this.directional[n])
			},
			onPostRender: function(e, t, i) {}
		}),
		GBufferRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.buffer = null, this.clearColor = new Color(0, 0, 0, 0), this.size = vec2.create(), this.quality = 1, this.damaged = !0, this.perBatchUniforms = {
					useNormalmap: new UniformInt(0),
					useReflection: new UniformInt(0)
				}
			},
			setQuality: function(e) {
				0 < (e = parseFloat(e)) && (this.quality = e, this.damaged = !0)
			},
			onStart: function(e, t, i) {
				vec2.copy(this.size, this.parent.size);
				var n = vec2.scale(vec2.create(), this.size, this.quality);
				this.buffer = new TargetTextureMulti(e, n, {
					numTargets: 4,
					stencil: !0
				}), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/deferred_gbuffer"), {
					zNear: new UniformFloat(.1),
					zFar: new UniformFloat(1e3)
				}, []), this.normalmapFallback = new Sampler("normal0"), this.maskFallback = new Sampler("mask"), this.envFallback = new Sampler("env0"), this.envFallback.createFallbackCubeTexture(e), this.envFallback.texture = fallbackCubeTexture, t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				if (this.material.uniforms.zNear.value = i.near, this.material.uniforms.zFar.value = i.far, this.damaged) {
					var n = vec2.scale(vec2.create(), this.size, this.quality);
					this.buffer.setSize(n[0], n[1]), this.damaged = !1
				}
			},
			onPostRender: function(e, t, i) {
				var n = e.gl;
				this.buffer.bind(e, !1, this.clearColor), n.depthMask(!0), n.colorMask(!0, !0, !0, !0), n.depthFunc(n.LESS), n.enable(n.DEPTH_TEST), n.enable(n.STENCIL_TEST), n.stencilMask(255), n.stencilFunc(n.ALWAYS, 1, 255), n.stencilOp(n.KEEP, n.KEEP, n.REPLACE), this.renderBatches(e, t, i, this.parent.organizer.opaqueBatchList, this.material), this.renderBatches(e, t, i, this.parent.organizer.transparentBatchList, this.material), n.stencilMask(255), n.disable(n.STENCIL_TEST), n.disable(n.DEPTH_TEST), this.buffer.unbind(e)
			},
			renderBatches: function(e, t, i, n, r) {
				var s = r.shader;
				s.use(), s.bindUniforms(r.uniforms);
				for (var a = 0; a < n.length; a++) {
					var o = n[a];
					if (0 != o.length) {
						var h = o.get(0).material;
						this.perBatchUniforms.useNormalmap.value = 0;
						for (var u, c, l = !1, d = this.perBatchUniforms.useReflection.value = 0; d < h.samplers.length; d++) "normal0" != h.samplers[d].name ? "env0" != h.samplers[d].name ? "mask" != h.samplers[d].name || (l = !0) : this.perBatchUniforms.useReflection.value = 1 : this.perBatchUniforms.useNormalmap.value = 1;
						u = 0 < r.samplers.length ? r.samplers.concat(h.samplers) : h.samplers.slice(), 0 == h.samplers.length && u.push(this.parent.diffuseFallback), 0 == this.perBatchUniforms.useNormalmap.value && u.push(this.normalmapFallback), 0 == this.perBatchUniforms.
						useReflection.value ? (u.push(this.envFallback), u.push(this.maskFallback)) : 1 != this.perBatchUniforms.useReflection.value || l || u.push(this.maskFallback), s.bindUniforms(this.perBatchUniforms), s.bindUniforms(h.uniforms), s.bindSamplers(u);
						for (var f = 0; f < o.length; ++f) c = o.get(f), e.modelview.push(), e.modelview.multiply(c.matrix), c.renderGeometry(e, s), e.modelview.pop();
						s.unbindSamplers(u)
					}
				}
			}
		}),
		SoftShadowsRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.quality = 1, this.damaged = !1, this.sharedUniforms = {
					cameraPosition: new UniformVec3(vec3.create()),
					shadowOnly: new UniformInt(1),
					useSoftShadows: new UniformInt(0)
				}, this.sharedSamplers = [], this.clearColor = new Color(0, 0, 0, 0), this.target = null
			},
			setQuality: function(e) {
				0 < (e = parseFloat(e)) && (this.quality = e, this.damaged = !0)
			},
			getShadowCastingLights: function(e) {
				for (var t = [], i = 0; i < e.lights.length; i++) {
					var n = e.lights[i];
					n.enabled && (n.shadowCasting && n.geometry && n instanceof DirectionalLight && t.push(n))
				}
				return t
			},
			onStart: function(e, t, i) {
				var n = this.parent.gbufferStage.buffer;
				this.sharedSamplers.push(new Sampler("gb0", n.targets[0])), this.sharedSamplers.push(new Sampler("gb1", n.targets[1])), this.sharedSamplers.push(new Sampler("gb2", n.targets[2])), this.sharedSamplers.push(new Sampler("gb3", n.targets[3])), this.target = new TargetTexture(this.parent.size, e, !1), this.blurTarget = new TargetTexture(this.parent.size, e, !1), this.blurSampler = new Sampler("src", this.target.texture), this.blurHorizontal = new Material(t.assetsManager.addShader("shaders/default/shadow_blurh.vert", "shaders/default/shadow_blur.frag"), {}, []), this.blurVertical = new Material(t.assetsManager.addShader("shaders/default/shadow_blurv.vert", "shaders/default/shadow_blur.frag"), {}, []), t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				if (this.damaged) {
					var n = vec2.scale(vec2.create(), this.parent.size, this.quality);
					this.target.setSize(n[0], n[1]), this.blurTarget.setSize(n[0], n[1]), this.damaged = !1
				}
			},
			onPostRender: function(e, t, i) {
				var n = this.getShadowCastingLights(t);
				if (0 != n.length) {
					i.getPosition(this.sharedUniforms.cameraPosition.value);
					var r = e.gl;
					r.disable(r.DEPTH_TEST), r.depthMask(!1), r.blendEquation(r.FUNC_ADD), r.blendFunc(r.ONE, r.ONE), r.enable(r.BLEND), r.enable(r.CULL_FACE), r.cullFace(r.FRONT), this.target.bind(e, !1, this.clearColor);
					for (var s = 0; s < n.length; s++) this.renderLight(e, n[s]);
					this.target.unbind(e), r.disable(r.BLEND), this.blurSampler.texture = this.target.texture, this.blurTarget.bind(e, !1, this.clearColor), this.parent.parent.renderEffect(e, this.blurHorizontal, this.blurSampler), this.blurTarget.unbind(e), this.blurSampler.texture = this.blurTarget.texture, this.target.bind(e, !1, this.clearColor), this.parent.parent.renderEffect(e, this.blurVertical, this.blurSampler), this.target.unbind(e)
				}
			},
			renderLight: function(e, t) {
				var i, n = t.material,
					r = n.shader;
				r.use(), r.bindUniforms(this.sharedUniforms), r.bindUniforms(n.uniforms), i = 0 < n.samplers.length ? n.samplers.concat(this.sharedSamplers) : this.sharedSamplers, r.bindSamplers(i);
				for (var s = t.getGeometryRenderers(), a = 0; a < s.length; a++) e.modelview.push(), t.isPositional() && e.modelview.multiply(s[a].matrix), s[a].renderGeometry(e, r), e.modelview.pop();
				r.unbindSamplers(i)
			}
		}),
		LightsRenderStage = RenderStage.extend({
			init: function() {
				this._super(), this.sharedUniforms = {
					cameraPosition: new UniformVec3(vec3.create()),
					shadowOnly: new UniformInt(0),
					useSoftShadows: new UniformInt(1)
				}, this.sharedSamplers = [], this.skyboxRenderStage = new SkyboxRenderStage
			},
			getLightsWithGeometry: function(e) {
				for (var t = [], i = [], n = [], r = 0; r < e.lights.length; r++) {
					var s = e.lights[r];
					s.enabled && (s.geometry && (s instanceof AmbientLight ? t.push(s) : s instanceof DirectionalLight ? i.push(s) : n.push(s)))
				}
				return t.concat(i).concat(n)
			},
			onStart: function(e, t, i) {
				var n = this.parent.gbufferStage.buffer;
				this.sharedSamplers.push(new Sampler("gb0", n.targets[0])), this.sharedSamplers.push(new Sampler("gb1", n.targets[1])), this.sharedSamplers.push(new Sampler("gb2", n.targets[2])), this.sharedSamplers.push(new Sampler("gb3", n.targets[3])), this.backgroundMaterial = new Material(t.assetsManager.addShaderSource("shaders/default/deferred_background"), {
					color: new UniformColor(new Color(1, 1, 1, 1))
				}, []), t.
				assetsManager.load(), this.skyboxRenderStage.start(e, t, i)
			},
			onPreRender: function(e, t, i) {
				this.sharedUniforms.useSoftShadows.value = this.parent.softShadowsStage.enabled ? 1 : 0, i.getPosition(this.sharedUniforms.cameraPosition.value)
			},
			onPostRender: function(e, t, i) {
				var n = this.getLightsWithGeometry(t),
					r = e.gl;
				r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, this.parent.gbufferStage.buffer.depth), r.disable(r.DEPTH_TEST), r.depthMask(!1), r.enable(r.STENCIL_TEST), r.stencilMask(0), r.stencilFunc(r.NOTEQUAL, 1, 255), i.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value), this.parent.parent.renderEffect(e, this.backgroundMaterial, this.sharedSamplers[1]), this.skyboxRenderStage.render(e, t, i), r.stencilFunc(r.EQUAL, 1, 255), r.blendEquation(r.FUNC_ADD), r.blendFunc(r.ONE, r.ONE), r.enable(r.BLEND), r.enable(r.CULL_FACE), r.cullFace(r.FRONT);
				for (var s = 0; s < n.length; s++) this.renderLight(e, n[s]);
				r.disable(r.BLEND), r.stencilMask(255), r.disable(r.STENCIL_TEST)
			},
			renderLight: function(e, t) {
				var i;
				t.shadowCasting && t instanceof DirectionalLight && 1 == this.sharedUniforms.useSoftShadows.value && (i = t.shadowSampler.texture, t.shadowSampler.texture = this.parent.softShadowsStage.target.texture);
				var n, r = t.material.shader;
				r.use(), r.bindUniforms(this.sharedUniforms), r.bindUniforms(t.material.uniforms), n = 0 < t.material.samplers.length ? t.material.samplers.concat(this.sharedSamplers) : this.sharedSamplers, r.bindSamplers(n);
				for (var s = t.getGeometryRenderers(), a = 0; a < s.length; a++) e.modelview.push(), t.isPositional() && e.modelview.multiply(s[a].matrix), s[a].renderGeometry(e, r), e.modelview.pop();
				r.unbindSamplers(n), t.shadowCasting && t instanceof DirectionalLight && 1 == this.sharedUniforms.useSoftShadows.value && (t.shadowSampler.texture = i)
			}
		}),
		PostProcess = RenderStage.extend({
			init: function() {
				this._super(), this.material = !1
			},
			onPostRender: function(e, t, i) {
				if (!(this.parent instanceof PostProcessRenderStage)) throw "PostProcess can only be the sub-stage of a PostProcessRenderStage";
				if (!this.material) throw "PostProcess must have a material defined";
				this.parent.dst.bind(e), this.parent.renderEffect(e, this.material, this.parent.srcSampler), this.parent.dst.unbind(e), this.parent.swapBuffers()
			}
		}),
		AntiAliasPostProcess = PostProcess.extend({
			init: function() {
				this._super()
			},
			onStart: function(e, t) {
				this.material = new Material(t.assetsManager.addShaderSource("shaders/default/postprocess_fxaa"), {
					ViewportSize: new UniformVec2(vec2.clone(this.parent.src.size)),
					reduce_min: new UniformFloat(1 / 16),
					reduce_mul: new UniformFloat(1 / 8),
					span_max: new UniformFloat(8)
				}, []), this.material.name = "AntiAlias", t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				this._super(e, t, i), vec2.copy(this.material.uniforms.ViewportSize.value, this.parent.src.size)
			}
		}),
		BlurPostProcess = PostProcess.extend({
			init: function(e) {
				this._super(), this.blurSize = vec2.fromValues(1, 1), e && vec2.copy(this.blurSize, e)
			},
			onStart: function(e, t) {
				this.material = new Material(t.assetsManager.addShaderSource("shaders/default/postprocess_blur"), {
					ViewportSize: new UniformVec2(vec2.clone(this.parent.size)),
					BlurSize: new UniformVec2(this.blurSize)
				}, []), this.material.name = "Blur", t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				this._super(e, t, i), vec2.set(this.material.uniforms.ViewportSize.value, this.parent.size[0], this.parent.size[1])
			}
		}),
		OITPostProcess = PostProcess.extend({
			init: function() {
				this._super()
			},
			onStart: function(e, t) {
				this.material = new Material(t.assetsManager.addShaderSource("shaders/default/OITRender"), {
					ViewportSize: new UniformVec2(vec2.clone(this.parent.src.size)),
					render_mode: new UniformInt(0)
				}, [this.parent.generator.oitStage.transparencySampler, this.parent.generator.oitStage.transparencyWeightSampler]), this.material.name = "OIT", t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				switch (this._super(e, t, i), vec2.copy(this.material.uniforms.ViewportSize.value, this.parent.src.size), t.engine.options.transparencyMode) {
					case "blended":
						this.material.uniforms.render_mode.value = 0;
						break;
					case "stochastic":
						this.material.uniforms.render_mode.value = 1
				}
			}
		}),
		SSAOPostProcess = PostProcess.extend({
			init: function(e) {
				this._super(), this.ssaoOnly = !1
			},
			onStart: function(e, t) {
				this.
				material = new Material(t.assetsManager.addShaderSource("shaders/default/postprocess_ssao"), {
					ViewportSize: new UniformVec2(vec2.clone(this.parent.src.size)),
					ssaoOnly: new UniformInt(!0 === this.ssaoOnly ? 1 : 0),
					gdisplace: new UniformFloat(t.options.ssaoGDisplace ? t.options.ssaoGDisplace : .3),
					radius: new UniformFloat(t.options.ssaoRadius ? t.options.ssaoRadius : 2),
					luminanceInfluence: new UniformFloat(t.options.ssaoLuminanceInfluence ? t.options.ssaoLuminanceInfluence : .7),
					brightness: new UniformFloat(t.options.ssaoBrightness ? t.options.ssaoBrightness : 1)
				}, [this.parent.generator.depthStage.sampler]), this.material.name = "SSAO", "sorted" == t.options.transparencyMode ? this.material.samplers.push(new Sampler("oitWeight", t.WhiteTexture)) : this.material.samplers.push(this.parent.generator.oitStage.transparencyWeightSampler), t.assetsManager.load()
			},
			onPreRender: function(e, t, i) {
				this._super(e, t, i), vec2.set(this.material.uniforms.ViewportSize.value, this.parent.src.size[0], this.parent.src.size[1]), this.material.uniforms.ssaoOnly.value = !0 === this.ssaoOnly ? 1 : 0
			}
		}),
		RenderTarget = FrakClass.extend({
			init: function(e) {
				this.viewport = {
					position: vec2.create(),
					size: vec2.create()
				}, this.size = vec2.create(), e && (vec2.copy(this.size, e), vec2.copy(this.viewport.size, e))
			},
			type: function() {
				return "RenderTarget"
			},
			bind: function(e) {
				e.gl.viewport(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]), e.gl.scissor(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]), e.gl.enable(e.gl.SCISSOR_TEST)
			},
			unbind: function(e) {
				e.gl.disable(e.gl.SCISSOR_TEST)
			},
			setSize: function(e, t) {
				this.size[0] = e, this.size[1] = t
			},
			getSize: function() {
				return this.size
			},
			setViewport: function(e, t, i, n) {
				vec2.set(this.viewport.position, e, t), vec2.set(this.viewport.size, i, n)
			},
			inheritViewport: function(e) {
				vec2.copy(this.viewport.position, e.viewport.position), vec2.copy(this.viewport.size, e.viewport.size)
			},
			resetViewport: function() {
				this.setViewport(0, 0, this.size[0], this.size[1])
			}
		}),
		TargetScreen = RenderTarget.extend({
			init: function(e) {
				this._super(e), this.position = vec2.create()
			},
			type: function() {
				return "TargetScreen"
			},
			setPosition: function(e, t) {
				this.position[0] = e, this.position[1] = t
			},
			getPosition: function() {
				return this.position
			},
			resetViewport: function() {
				this.setViewport(this.position[0], this.position[1], this.size[0], this.size[1])
			}
		}),
		TargetTexture = RenderTarget.extend({
			init: function(e, t, i, n) {
				var r = e;
				if ((e instanceof Texture && (r = e.size, this.texture = e), this.useDepthTexture = !0 === i, this.useStencilBuffer = !0 === n, this.rebuild = !1, this._super(r), this.useDepthTexture) && !(t.gl.getExtension("WEBGL_depth_texture") || t.gl.getExtension("WEBKIT_WEBGL_depth_texture"))) throw "TargetTexture: Depth texture reqeusted, but not available.";
				this.build(t)
			},
			type: function() {
				return "TargetTexture"
			},
			setSize: function(e, t) {
				this._super(e, t), this.rebuild = !0
			},
			getDataType: function(e) {
				return e.gl.UNSIGNED_BYTE
			},
			getTextureFilter: function(e) {
				return e.gl.NEAREST
			},
			build: function(e) {
				var t = e.gl;
				this.frameBuffer = t.createFramebuffer(), this.texture || (this.texture = new Texture(e), t.bindTexture(t.TEXTURE_2D, this.texture.glTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, this.getTextureFilter(e)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, this.getTextureFilter(e)), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.size[0], this.size[1], 0, t.RGBA, this.getDataType(e), null), t.bindTexture(t.TEXTURE_2D, null)), this.useDepthTexture ? (this.depth = new Texture(e), t.bindTexture(t.TEXTURE_2D, this.depth.glTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texImage2D(t.TEXTURE_2D, 0, t.DEPTH_COMPONENT, this.size[0], this.size[1], 0, t.DEPTH_COMPONENT, t.UNSIGNED_SHORT, null), t.bindTexture(t.TEXTURE_2D, null)) : (this.depth = t.createRenderbuffer(), this.useStencilBuffer ? (t.bindRenderbuffer(t.RENDERBUFFER, this.depth), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.size[0], this.size[1])) : (t.bindRenderbuffer(t.RENDERBUFFER, this.depth), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, this.size[0], this.size[1])), t.bindRenderbuffer(t.RENDERBUFFER, null)), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture.glTexture, 0), this.useDepthTexture ? t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, this.depth.glTexture, 0) : this.useStencilBuffer ? t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.depth) : t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.depth), this.checkStatus(e), t.bindFramebuffer(t.FRAMEBUFFER, null), this.texture.loaded = !0
			},
			checkStatus: function(e) {
				var t = e.gl,
					i = t.checkFramebufferStatus(t.FRAMEBUFFER);
				switch (i) {
					case t.FRAMEBUFFER_COMPLETE:
						return !0;
					case t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
						throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
					case t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
						throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
					case t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
						throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
					case t.FRAMEBUFFER_UNSUPPORTED:
						throw "Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED";
					default:
						throw "Incomplete framebuffer: " + i
				}
			},
			bind: function(e, t, i, n) {
				var r = e.gl;
				if (this.rebuild && (r.bindTexture(r.TEXTURE_2D, this.texture.glTexture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, this.getTextureFilter(e)), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, this.getTextureFilter(e)), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, this.size[0], this.size[1], 0, r.RGBA, this.getDataType(e), null), r.bindTexture(r.TEXTURE_2D, null), this.useDepthTexture ? (r.bindTexture(r.TEXTURE_2D, this.depth.glTexture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.texImage2D(r.TEXTURE_2D, 0, r.DEPTH_COMPONENT, this.size[0], this.size[1], 0, r.DEPTH_COMPONENT, r.UNSIGNED_SHORT, null), r.bindTexture(r.TEXTURE_2D, null)) : (r.bindRenderbuffer(r.RENDERBUFFER, this.depth), this.useStencilBuffer ? r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, this.size[0], this.size[1]) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_COMPONENT16, this.size[0], this.size[1]), r.bindRenderbuffer(r.RENDERBUFFER, null)), this.rebuild = !1), t = !0 === t, (i = i instanceof Color && i) || (e.camera ? i = e.camera.backgroundColor : t = !0), r.bindFramebuffer(r.FRAMEBUFFER, this.frameBuffer), this._super(e), !t) {
					r.clearColor(i.r, i.g, i.b, i.a), r.clearDepth(1);
					var s = r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT;
					this.useStencilBuffer && (r.clearStencil(0), s |= r.STENCIL_BUFFER_BIT), n && (s = n), r.clear(s)
				}
			},
			unbind: function(e) {
				this._super(e), e.gl.bindFramebuffer(e.gl.FRAMEBUFFER, null)
			}
		}),
		TargetTextureFloat = TargetTexture.extend({
			init: function(e, t, i, n) {
				if (this.extHalfFloat = t.gl.getExtension("OES_texture_half_float"), this.extFloat = t.gl.getExtension("OES_texture_float"), !this.extFloat && !this.extHalfFloat) throw "TargetTextureFloat: Floating point textures are not supported on this system.";
				this.linearFloat = null, this.linearHalf = null, n || (this.linearFloat = t.gl.getExtension("OES_texture_float_linear"), this.linearHalf = t.gl.getExtension("OES_texture_half_float_linear")), this._super(e, t, i)
			},
			type: function() {
				return "TargetTextureFloat"
			},
			getDataType: function(e) {
				if (this.extHalfFloat) {
					if (!this.extFloat) return this.extHalfFloat.HALF_FLOAT_OES;
					if (navigator) switch (navigator.platform) {
						case "iPad":
						case "iPod":
						case "iPhone":
							return this.extHalfFloat.HALF_FLOAT_OES
					}
				}
				return e.gl.FLOAT
			},
			getTextureFilter: function(e) {
				return this.linearFloat && this.linearHalf ? e.gl.LINEAR : e.gl.NEAREST
			},
			build: function(e) {
				var t = e.gl;
				this.frameBuffer = t.createFramebuffer(), this.texture || (this.texture = new Texture(e), t.bindTexture(t.TEXTURE_2D, this.texture.glTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, this.getTextureFilter(e)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, this.getTextureFilter(e)), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.size[0], this.size[1], 0, t.RGBA, this.getDataType(e), null), t.bindTexture(t.TEXTURE_2D, null)), this.useDepthTexture ? (this.depth = new Texture(e), t.bindTexture(t.TEXTURE_2D, this.depth.glTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texImage2D(t.TEXTURE_2D, 0, t.DEPTH_COMPONENT, this.size[0], this.size[1], 0, t.DEPTH_COMPONENT, t.UNSIGNED_SHORT, null), t.bindTexture(t.TEXTURE_2D, null)) : (this.depth = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.depth), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, this.size[0], this.size[1]), t.bindRenderbuffer(t.RENDERBUFFER, null)), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture.glTexture, 0), this.useDepthTexture ? t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, this.depth.glTexture, 0) : t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.depth), this.checkStatus(e), t.bindFramebuffer(t.FRAMEBUFFER, null), this.texture.loaded = !0
			}
		}),
		TargetTextureMulti = RenderTarget.extend({
			init: function(e, t, i) {
				if (this.options = FRAK.extend({
						dataType: "float",
						filtering: "linear",
						depth: !1,
						stencil: !1,
						numTargets: 2
					}, i), this.extDrawBuffers = null, this.extTextureFloat = null, this.extTextureHalfFloat = null, this.extTextureFloatLinear = null, this.extTextureHalfFloatLinear = null, this.options.numTargets < 1) throw "TargetTextureMulti: Must have at least one color target.";
				if (this.extDrawBuffers = e.gl.getExtension("WEBGL_draw_buffers"), !this.extDrawBuffers) throw "TargetTextureMulti: WEBGL_draw_buffers not available.";
				if (this.options.depth) {
					var n = e.gl.getExtension("WEBGL_depth_texture");
					if (n || (n = e.gl.getExtension("WEBKIT_WEBGL_depth_texture")), !n) throw "TargetTextureMulti: Depth texture reqeusted, but not available."
				}
				if (this.maxColorAttachments = e.gl.getParameter(this.extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL), this.maxDrawBuffers = e.gl.getParameter(this.extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL), this.options.numTargets > this.maxDrawBuffers) throw "TargetTextureMulti: Too many targets requested. System only supports {0} draw buffers.".format(this.maxDrawBuffers);
				if ("float" == this.options.dataType) {
					if (this.extTextureFloat = e.gl.getExtension("OES_texture_float"), this.extTextureHalfFloat = e.gl.getExtension("OES_texture_half_float"), !this.extTextureFloat && !this.extTextureHalfFloat) throw "TargetTextureMulti: Floating point textures are not supported on this system.";
					if ("linear" == this.options.filtering && (this.extTextureFloatLinear = e.gl.getExtension("OES_texture_float_linear"), this.extTextureHalfFloatLinear = e.gl.getExtension("OES_texture_half_float_linear"), !this.extTextureFloatLinear && !this.extTextureHalfFloatLinear)) throw "TargetTextureMulti: Linear filtering requested, but not available."
				}
				this._super(t), this.targets = [], this.depth = null, this.frameBuffer = null, this.build(e)
			},
			type: function() {
				return "TargetTextureMulti"
			},
			setSize: function(e, t) {
				this._super(e, t), this.rebuild = !0
			},
			getDataType: function(e) {
				if ("unsigned" == this.options.dataType) return e.gl.UNSIGNED_BYTE;
				if (this.extTextureHalfFloat) {
					if (!this.extTextureFloat) return this.extTextureHalfFloat.HALF_FLOAT_OES;
					if (navigator && navigator.platform) switch (navigator.platform) {
						case "iPad":
						case "iPod":
						case "iPhone":
							return this.extTextureHalfFloat.HALF_FLOAT_OES;
						default:
							return e.gl.FLOAT
					}
				}
				return e.gl.FLOAT
			},
			getTextureFilter: function(e) {
				return "float" == this.options.dataType && (this.extTextureFloatLinear || this.extTextureHalfFloatLinear) ? e.gl.LINEAR : e.gl.NEAREST
			},
			createBuffer: function(e, t, i, n) {
				var r = e.gl,
					s = new Texture(e);
				return t || (t = this.getTextureFilter(e)), i || (
					i = this.getDataType(e)), n || (n = r.RGBA), r.bindTexture(r.TEXTURE_2D, s.glTexture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, t), r.texImage2D(r.TEXTURE_2D, 0, n, this.size[0], this.size[1], 0, n, i, null), r.bindTexture(r.TEXTURE_2D, null), s.loaded = !0, s
			},
			build: function(e) {
				var t = e.gl;
				this.frameBuffer = t.createFramebuffer(), this.options.depth ? this.depth = this.createBuffer(e, t.NEAREST, t.UNSIGNED_SHORT, t.DEPTH_COMPONENT) : (this.depth = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.depth), this.options.stencil ? t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.size[0], this.size[1]) : t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, this.size[0], this.size[1]), t.bindRenderbuffer(t.RENDERBUFFER, null));
				for (var i = [], n = 0; n < this.options.numTargets; n++) {
					var r = this.createBuffer(e);
					this.targets.push(r), i.push(this.extDrawBuffers.COLOR_ATTACHMENT0_WEBGL + n)
				}
				t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), this.options.depth ? t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, this.depth.glTexture, 0) : this.options.stencil ? t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.depth) : t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.depth);
				for (n = 0; n < this.targets.length; n++) t.framebufferTexture2D(t.FRAMEBUFFER, this.extDrawBuffers.COLOR_ATTACHMENT0_WEBGL + n, t.TEXTURE_2D, this.targets[n].glTexture, 0);
				this.checkStatus(e), this.extDrawBuffers.drawBuffersWEBGL(i), t.bindFramebuffer(t.FRAMEBUFFER, null)
			},
			checkStatus: function(e) {
				var t = e.gl,
					i = t.checkFramebufferStatus(t.FRAMEBUFFER);
				switch (i) {
					case t.FRAMEBUFFER_COMPLETE:
						return !0;
					case t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
						throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
					case t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
						throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
					case t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
						throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
					case t.FRAMEBUFFER_UNSUPPORTED:
						throw "Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED";
					default:
						throw "Incomplete framebuffer: " + i
				}
			},
			bind: function(e, t, i, n) {
				var r = e.gl;
				if (this.rebuild) {
					this.rebuild = !1;
					for (var s = 0; s < this.targets.length; s++) {
						var a = this.targets[s];
						r.bindTexture(r.TEXTURE_2D, a.glTexture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, this.getTextureFilter(e)), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, this.getTextureFilter(e)), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, this.size[0], this.size[1], 0, r.RGBA, this.getDataType(e), null), r.bindTexture(r.TEXTURE_2D, null)
					}
					this.options.depth ? (r.bindTexture(r.TEXTURE_2D, this.depth.glTexture), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.texImage2D(r.TEXTURE_2D, 0, r.DEPTH_COMPONENT, this.size[0], this.size[1], 0, r.DEPTH_COMPONENT, r.UNSIGNED_SHORT, null), r.bindTexture(r.TEXTURE_2D, null)) : (r.bindRenderbuffer(r.RENDERBUFFER, this.depth), this.options.stencil ? r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, this.size[0], this.size[1]) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_COMPONENT16, this.size[0], this.size[1]), r.bindRenderbuffer(r.RENDERBUFFER, null))
				}
				if (t = !0 === t, (i = i instanceof Color && i) || (e.camera ? i = e.camera.backgroundColor : t = !0), r.bindFramebuffer(r.FRAMEBUFFER, this.frameBuffer), this._super(e), !t) {
					r.clearColor(i.r, i.g, i.b, i.a), r.clearDepth(1);
					var o = r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT;
					this.options.stencil && (r.clearStencil(0), o |= r.STENCIL_BUFFER_BIT), n && (o = n), r.clear(o)
				}
			},
			unbind: function(e) {
				this._super(e), e.gl.bindFramebuffer(e.gl.FRAMEBUFFER, null)
			}
		}),
		RenderBuffer = FrakClass.extend({
			init: function(e, t, i) {
				i || (i = e.gl.STATIC_DRAW), this.type = i, this.context = e, this.debug = !1,
					this.buffers = {};
				for (var n = this.maxFaceIndex = 0; n < t.length; n++) this.maxFaceIndex = t[n] > this.maxFaceIndex ? t[n] : this.maxFaceIndex;
				this.createFacesBuffer(t)
			},
			has: function(e) {
				return e in this.buffers
			},
			add: function(e, t, i) {
				if (t.length / i <= this.maxFaceIndex) throw "RenderBuffer: Buffer '{0}' too small ({1} vertices, {2} max index).".format(e, t.length / i, this.maxFaceIndex);
				var n = this.context.gl;
				t instanceof Float32Array || (t = new Float32Array(t)), this.buffers[e] = n.createBuffer(), n.bindBuffer(n.ARRAY_BUFFER, this.buffers[e]), n.bufferData(n.ARRAY_BUFFER, t, this.type), this.buffers[e].itemSize = i, this.buffers[e].numItems = t.length / this.buffers[e].itemSize, n.bindBuffer(n.ARRAY_BUFFER, null)
			},
			update: function(e, t) {
				if (!(e in this.buffers)) throw "RenderBuffer: Unknown buffer: '{0}'".format(e);
				var i = this.buffers[e];
				if (t.length / i.itemSize <= this.maxFaceIndex) throw "RenderBuffer: Buffer '{0}' too small.".format(e);
				t instanceof Float32Array || (t = new Float32Array(t));
				var n = this.context.gl;
				n.bindBuffer(n.ARRAY_BUFFER, i), n.bufferData(n.ARRAY_BUFFER, t, this.type), i.numItems = t.length / i.itemSize, n.bindBuffer(n.ARRAY_BUFFER, null)
			},
			updateFaces: function(e) {
				var t = this.context.gl;
				t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.facesBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array(e), this.type), this.facesBuffer.itemSize = 1, this.facesBuffer.numItems = e.length, t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
				for (var i = this.maxFaceIndex = 0; i < e.length; i++) this.maxFaceIndex = e[i] > this.maxFaceIndex ? e[i] : this.maxFaceIndex
			},
			render: function(e) {
				if (e.linked) {
					var t = this.context.gl,
						i = [];
					for (var n in this.buffers) {
						t.bindBuffer(t.ARRAY_BUFFER, this.buffers[n]);
						var r = e.getAttribLocation(n); - 1 != r && (t.enableVertexAttribArray(r), i.push(r), t.vertexAttribPointer(r, this.buffers[n].itemSize, t.FLOAT, !1, 0, 0))
					}
					this.drawElements();
					for (var s = 0, a = i.length; s < a; s++) t.disableVertexAttribArray(i[s])
				}
			},
			generateBarycentric: function() {
				for (var e = new Float32Array(3 * this.buffers.position.numItems), t = 0; t < e.length; t += 9) e[t + 0] = 1, e[t + 1] = 0, e[t + 2] = 0, e[t + 3] = 0, e[t + 4] = 1, e[t + 5] = 0, e[t + 6] = 0, e[t + 7] = 0, e[t + 8] = 1;
				this.add("barycentric", e, 3)
			},
			generateTexCoords: function() {
				for (var e = new Float32Array(2 * this.buffers.position.numItems), t = 0; t < e.length; t++) e[t] = 0;
				this.add("texcoord2d0", e, 2)
			},
			drawElements: function() {},
			createFacesBuffer: function(e) {
				var t = this.context.gl;
				this.facesBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.facesBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array(e), this.type), this.facesBuffer.itemSize = 1, this.facesBuffer.numItems = e.length, t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
			}
		}),
		LinesRenderBuffer = RenderBuffer.extend({
			init: function(e) {
				this._super(e, [], e.gl.DYNAMIC_DRAW)
			},
			drawElements: function() {
				var e = this.context.gl;
				e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.facesBuffer), e.drawElements(e.LINES, this.facesBuffer.numItems, e.UNSIGNED_SHORT, 0)
			}
		}),
		TrianglesRenderBuffer = RenderBuffer.extend({
			init: function(e, t, i) {
				this._super(e, t, i)
			},
			drawElements: function() {
				var e = this.context.gl;
				e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.facesBuffer), e.drawElements(e.TRIANGLES, this.facesBuffer.numItems, e.UNSIGNED_SHORT, 0)
			}
		}),
		RenderBufferVAO = RenderBuffer.extend({
			init: function(e, t, i) {
				if ("webgl2" === e.version) this.createVAO = e.gl.createVertexArray, this.bindVAO = e.gl.bindVertexArray;
				else {
					var n = e.gl.getExtension("OES_vertex_array_object");
					if (!n) throw "RenderBufferVAO: Vertex array objects not supported on this device.";
					this.createVAO = n.createVertexArrayOES, this.bindVAO = n.bindVertexArrayOES
				}
				if (this.vao = this.createVAO(), !this.vao) throw "RenderBufferVAO: Unable to create vertex array object.";
				this.damaged = !0, this._super(e, t, i)
			},
			add: function(e, t, i) {
				if (t.length / i <= this.maxFaceIndex) throw "RenderBuffer: Buffer '{0}' too small.".format(e);
				this.bindVAO(this.vao), this._super(e, t, i), this.bindVAO(null), this.damaged = !0
			},
			createFacesBuffer: function(e) {
				this.bindVAO(this.vao), this._super(e), gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer), this.bindVAO(null), this.damaged = !0
			},
			bindLocations: function(e) {
				var t, i = this.context.gl;
				for (var n in this.bindVAO(this.vao), this.buffers) t = -1, n in ExplicitAttributeLocations ? t = ExplicitAttributeLocations[n] : e && (t = e.getAttribLocation(n)), -1 != t && (i.bindBuffer(i.ARRAY_BUFFER, this.buffers[n]), i.enableVertexAttribArray(t), i.vertexAttribPointer(t, this.buffers[n].itemSize, i.FLOAT, !1, 0, 0));
				i.bindBuffer(i.ARRAY_BUFFER, null), this.bindVAO(null), this.damaged = !1
			},
			render: function(e) {
				e.linked && (this.damaged && this.bindLocations(), this.bindVAO(this.vao), this.drawElements(), this.bindVAO(null))
			}
		}),
		TrianglesRenderBufferVAO = RenderBufferVAO.extend({
			init: function(e, t, i) {
				this._super(e, t, i)
			},
			drawElements: function() {
				var e = this.context.gl;
				e.drawElements(e.TRIANGLES, this.facesBuffer.numItems, e.UNSIGNED_SHORT, 0)
			}
		}),
		QuadsRenderBuffer = TrianglesRenderBuffer.extend({
			init: function(e, t, i) {
				for (var n = [], r = 0; r < t.length - 3; r++) n.push(t[r]), n.push(t[r + 1]), n.push(t[r + 2]), n.push(t[r]), n.push(t[r + 2]), n.push(t[r + 3]);
				this._super(e, n, i)
			}
		}),
		BaseTexture = Serializable.extend({
			init: function(e) {
				this._super(), this.size = vec2.create(), this.loaded = !1
			},
			type: function() {
				return "BaseTexture"
			},
			excluded: function() {
				return this._super().concat(["loaded", "size"])
			},
			bind: function(e) {},
			unbind: function(e) {},
			resizeToPowerOfTwo: function(e) {
				function t(e) {
					return 0 == (e & e - 1)
				}

				function i(e) {
					return Math.max(Math.min(Math.pow(2, Math.floor(Math.log(e) / Math.log(2))), 2048), 1)
				}
				if (!t(e.width) || !t(e.height)) {
					var n = document.createElement("canvas");
					n.width = i(e.width), n.height = i(e.height), n.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, n.width, n.height), e = n
				}
				return e
			},
			anisotropy: function(e) {
				if (e.engine && (e.engine.options.anisotropicFiltering ? this.anisotropyFilter = e.engine.options.anisotropicFiltering : this.anisotropic = !1), this.anisotropic)
					if (this.extTextureFilterAnisotropic = e.gl.getExtension("EXT_texture_filter_anisotropic"), this.extTextureFilterAnisotropic) {
						var t = e.gl.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
						this.anisotropyFilter = Math.min(this.anisotropyFilter, t)
					} else this.anisotropic = !1
			}
		}),
		Texture = BaseTexture.extend({
			init: function(e) {
				this._super(e), this.glTexture = null, this.name = !1, this.mipmapped = !0, this.clampToEdge = !1, this.anisotropic = !0, this.anisotropyFilter = 4, this.image = null, e && this.create(e)
			},
			type: function() {
				return "Texture"
			},
			excluded: function() {
				return this._super().concat(["glTexture"])
			},
			bind: function(e) {
				this.loaded ? e.gl.bindTexture(e.gl.TEXTURE_2D, this.glTexture) : e.gl.bindTexture(e.gl.TEXTURE_2D, null)
			},
			unbind: function(e) {
				e.gl.bindTexture(e.gl.TEXTURE_2D, null)
			},
			create: function(e) {
				this.anisotropy(e), this.glTexture = e.gl.createTexture()
			},
			clearImage: function(e, t, i) {
				null === this.glTexture && this.create(e), i = i || 1;
				var n = e.gl;
				n.bindTexture(e.gl.TEXTURE_2D, this.glTexture);
				for (var r = new Uint8Array(i * i * 4), s = 0; s < i * i * 4; s += 4) r[s + 0] = t[0], r[s + 1] = t[1], r[s + 2] = t[2], r[s + 3] = t[3];
				n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, i, i, 0, n.RGBA, n.UNSIGNED_BYTE, r), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.bindTexture(e.gl.TEXTURE_2D, null), vec2.set(this.size, i, i), this.loaded = !0
			},
			pasteImage: function(e, t, i) {
				if (this.loaded) {
					this.bind(e);
					var n = e.gl;
					n.texSubImage2D(n.TEXTURE_2D, 0, t[0] * this.size[0], t[1] * this.size[1], n.RGBA, n.UNSIGNED_BYTE, i), this.mipmapped && n.generateMipmap(n.TEXTURE_2D), this.unbind(e), this.loaded = !0
				}
			},
			setImage: function(e, t, i) {
				if (this.glTexture || this.create(e), !this.glTexture) throw "Unable to update texture. glTexture not available.";
				var n = t;
				i || (n = this.resizeToPowerOfTwo(t)), vec2.set(this.size, n.width, n.height);
				var r = e.gl;
				r.bindTexture(r.TEXTURE_2D, this.glTexture), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, n), this.clampToEdge && (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE)), this.mipmapped ? (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_NEAREST), r.generateMipmap(r.TEXTURE_2D), this.anisotropic && r.texParameteri(r.TEXTURE_2D, this.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropyFilter)) : (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST)), r.bindTexture(r.TEXTURE_2D, null), this.image = n, this.loaded = !0, 0 == (this.size[0] & this.size[0] - 1) && 0 == (this.size[1] & this.size[1] - 1) || console.warn("Created a not power of 2 texture: {0} ({1}x{2})".format(this.name, this.size[0], this.size[1]))
			},
			getImage: function(e) {
				if (!this.glTexture) throw "Unable to get image. glTexture not available.";
				var t = e.gl,
					i = new TargetTexture(this, e, !1);
				i.bind(e);
				var n = new Uint8Array(this.size[0] * this.size[1] * 4);
				return e.gl.readPixels(0, 0, this.size[0], this.size[1], t.RGBA, t.UNSIGNED_BYTE, n), i.unbind(e), n
			},
			onContextRestored: function(e) {
				this.glTexture = null, this.loaded = !1, this.image && this.setImage(e, this.image)
			}
		}),
		CubeTexture = BaseTexture.extend({
			init: function(e) {
				this._super(e), this.glTexture = null, this.name = !1, this.mipmapped = !1, this.clampToEdge = !0, this.anisotropic = !0, this.anisotropyFilter = 4, this.images = {}, e && this.create(e)
			},
			type: function() {
				return "CubeTexture"
			},
			excluded: function() {
				return this._super().concat(["glTexture"])
			},
			bind: function(e) {
				this.loaded ? e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP, this.glTexture) : e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP, null)
			},
			unbind: function(e) {
				e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP, null)
			},
			getGLCubeFace: function(e, t) {
				var i = e.gl;
				switch (t) {
					case CubeTexture.FRONT:
						return i.TEXTURE_CUBE_MAP_NEGATIVE_X;
					case CubeTexture.BACK:
						return i.TEXTURE_CUBE_MAP_POSITIVE_X;
					case CubeTexture.LEFT:
						return i.TEXTURE_CUBE_MAP_NEGATIVE_Z;
					case CubeTexture.RIGHT:
						return i.TEXTURE_CUBE_MAP_POSITIVE_Z;
					case CubeTexture.TOP:
						return i.TEXTURE_CUBE_MAP_NEGATIVE_Y;
					case CubeTexture.BOTTOM:
						return i.TEXTURE_CUBE_MAP_POSITIVE_Y
				}
				return null
			},
			create: function(e) {
				this.anisotropy(e), this.glTexture = e.gl.createTexture();
				var t = e.gl;
				t.bindTexture(t.TEXTURE_CUBE_MAP, this.glTexture), this.clampToEdge && (t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)), this.mipmapped ? (t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_NEAREST), t.generateMipmap(t.TEXTURE_CUBE_MAP), this.anisotropic && t.texParameteri(t.TEXTURE_CUBE_MAP, this.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropyFilter)) : (t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.NEAREST)), t.bindTexture(t.TEXTURE_CUBE_MAP, null)
			},
			setFace: function(e, t, i, n) {
				if (!1 === this.glTexture && this.create(e), !this.glTexture) throw "Unable to update cube texture. glTexture not available.";
				var r = i;
				if (t in this.images && delete this.images[t].image, this.images[t] = {
						image: r,
						noResize: !!n
					}, !(t = this.getGLCubeFace(e, t))) throw "Not a valid CubeTexture face.";
				n || (r = this.resizeToPowerOfTwo(i)), vec2.set(this.size, r.width, r.height);
				var s = e.gl;
				s.bindTexture(s.TEXTURE_CUBE_MAP, this.glTexture), s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, !0), s.texImage2D(t, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, r), s.bindTexture(s.TEXTURE_CUBE_MAP, null), this.loaded = !0, 0 == (this.size[0] & this.size[0] - 1) && 0 == (this.size[1] & this.size[1] - 1) || console.warn("Created a not power of 2 texture: {0} ({1}x{2})".format(this.name, this.size[0], this.size[1]))
			},
			onContextRestored: function(e) {
				for (var t in this.glTexture = null, this.create(e), this.loaded = !1, this.images) {
					var i = this.images[t];
					this.setFace(e, parseInt(t), i.image, i.noResize)
				}
			}
		});
	CubeTexture.FRONT = 0, CubeTexture.BACK = 1, CubeTexture.LEFT = 2, CubeTexture.RIGHT = 3, CubeTexture.BOTTOM = 4, CubeTexture.TOP = 5;
	var Material = Serializable.extend({
			init: function(e, t, i, n) {
				this._super(), this.name = "Unnamed", this.shader = e, this.uniforms = t, this.samplers = i, this.descriptor = n, this.boundSamplers = new SamplerAccumulator
			},
			type: function() {
				return "Material"
			},
			bind: function(e) {
				if (this.shader) {
					this.shader.use(this.uniforms), e && this.shader.bindUniforms(e);
					for (var t = 1; t < arguments.length; ++t) {
						var i = arguments[t];
						if (i instanceof Sampler) this.boundSamplers.add(i);
						else if (i instanceof Array)
							for (var n = 0; n < i.length; ++n) this.boundSamplers.add(i[n])
					}
					for (t = 0; t < this.samplers.length; ++t) this.boundSamplers.add(this.samplers[t]);
					0 == this.boundSamplers.length && this.shader.context.engine && this.
					boundSamplers.add(this.shader.context.engine.DiffuseFallbackSampler), this.shader.bindSamplers(this.boundSamplers.samplers)
				}
			},
			unbind: function() {
				this.shader && (this.shader.unbindSamplers(this.boundSamplers.samplers), this.boundSamplers.clear())
			},
			instantiate: function() {
				var e = {};
				for (var t in this.uniforms) e[t] = this.uniforms[t].clone();
				var i = [];
				for (var t in this.samplers) "object" == typeof this.samplers[t] && i.push(this.samplers[t].clone());
				var n = new Material(this.shader, e, i, this.descriptor);
				return n.name = this.name + " (instance)", n
			}
		}),
		Space = FrakClass.extend({
			init: function() {},
			frustumCast: function(e, t) {},
			rayCast: function(e) {},
			lineCast: function(e) {}
		}),
		DynamicSpace = Space.extend({
			init: function() {
				this.renderers = [], this.colliders = [], this.filteredRenderers = []
			},
			addRenderer: function(e) {
				this.renderers.push(e), this.filteredRenderers.push(null)
			},
			removeRenderer: function(e) {
				for (var t = 0; t < this.renderers.length; t++)
					if (this.renderers[t] === e) return this.renderers.splice(t, 1), this.filteredRenderers.pop(), !0;
				return !1
			},
			addCollider: function(e) {
				this.colliders.push(e)
			},
			removeCollider: function(e) {
				for (var t = 0; t < this.colliders.length; t++)
					if (this.colliders[t] === e) return this.colliders.splice(t, 1), !0;
				return !1
			},
			frustumCast: function(e, t) {
				for (var i, n = 0, r = 0; r < this.renderers.length; ++r)(i = this.renderers[r]).visible && i.layer & t && (this.filteredRenderers[n++] = i);
				for (r = n; r < this.filteredRenderers.length; ++r) this.filteredRenderers[r] = null;
				return this.filteredRenderers
			},
			rayCast: function(e, t, i) {
				var n = new RayTestResult(e);
				if (!t) return n;
				for (var r = 0; r < this.colliders.length; r++) this.colliders[r].enabled && this.colliders[r].node.layer & t && this.colliders[r].rayTest(e, n, i);
				return n
			}
		}),
		Renderer = FrakClass.extend({
			init: function(e) {
				this.matrix = e, this.layer = 1, this.visible = !0, this.castShadows = !0, this.receiveShadows = !0, this.lightContribution = 1, this.transparent = !1, this.localBoundingBox = new BoundingBox, this.localBoundingSphere = new BoundingSphere, this.globalBoundingBox = new BoundingBox, this.globalBoundingSphere = new BoundingSphere, this.cacheMatrix = mat4.create()
			},
			render: function(e, t) {
				this.onRender(e, t)
			},
			renderGeometry: function(e, t) {
				this.onRenderGeometry(e, t)
			},
			getDefaultUniforms: function(e, t) {
				return t || (t = {}), "model" in t ? mat4.copy(t.model.value, this.matrix) : t.model = new UniformMat4(this.matrix), "modelview" in t ? mat4.copy(t.modelview.value, e.modelview.top()) : t.modelview = new UniformMat4(e.modelview.top()), "projection" in t ? mat4.copy(t.projection.value, e.projection.top()) : t.projection = new UniformMat4(e.projection.top()), "receiveShadows" in t ? t.receiveShadows.value = this.receiveShadows ? 1 : 0 : t.receiveShadows = new UniformInt(this.receiveShadows ? 1 : 0), "lightContribution" in t ? t.lightContribution.value = this.lightContribution : t.lightContribution = new UniformFloat(this.lightContribution), e.camera && ("view" in t ? mat4.copy(t.view.value, e.camera.viewMatrix) : t.view = new UniformMat4(e.camera.viewMatrix), "viewInverse" in t ? mat4.copy(t.viewInverse.value, e.camera.viewInverseMatrix) : t.viewInverse = new UniformMat4(e.camera.viewInverseMatrix), e.camera.near && ("zNear" in t ? t.zNear.value = e.camera.near : t.zNear = new UniformFloat(e.camera.near)), e.camera.far && ("zFar" in t ? t.zFar.value = e.camera.far : t.zFar = new UniformFloat(e.camera.far))), e.light && e.light.uniforms && (t.lightDirection = e.light.uniforms.lightDirection, t.lightColor = e.light.uniforms.lightColor, t.lightIntensity = e.light.uniforms.lightIntensity, t.useShadows = e.light.uniforms.useShadows), e.shadow && (t.lightView = e.shadow.lightView, t.lightProjection = e.shadow.lightProjection), t
			},
			getGlobalSamplers: function(e) {
				var t = [];
				return e.shadow && t.push(e.shadow.shadow0), t
			},
			setMatrix: function(e) {
				this.matrix = e, this.updateGlobalBoundingVolumes()
			},
			updateGlobalBoundingVolumes: function() {
				this.localBoundingBox.transform(this.matrix, this.globalBoundingBox), this.localBoundingSphere.transform(this.matrix, this.globalBoundingSphere)
			},
			onRender: function(e, t) {},
			onRenderGeometry: function(e, t) {}
		}),
		PrimitiveRenderer = Renderer.extend({
			init: function(e, t) {
				this._super(e), this.material = t
			}
		}),
		MeshRenderer = Renderer.extend({
			init: function(e, t, i) {
				for (var n in this._super(t), this.mesh = i, this.buffers = [], this._cache = null, this.mesh.
					submeshes) {
					var r = this.mesh.submeshes[n],
						s = new TrianglesRenderBuffer(e, r.faces);
					for (var a in s.add("position", r.positions, 3), r.texCoords1D) s.add("texcoord1d" + a, r.texCoords1D[a], 1);
					for (var o in r.texCoords2D) s.add("texcoord2d" + o, r.texCoords2D[o], 2);
					for (var h in r.texCoords3D) s.add("texcoord3d" + h, r.texCoords3D[h], 3);
					r.normals && s.add("normal", r.normals, 3), r.tangents && s.add("tangent", r.tangents, 3), r.bitangents && s.add("bitangent", r.bitangents, 3), this.buffers.push(s)
				}
			},
			onRender: function(e) {
				for (var t in this._cache = this.getDefaultUniforms(e, this._cache), this.mesh.submeshes) {
					var i = this.mesh.submeshes[t],
						n = this.mesh.getMaterial(i.materialIndex);
					n && (n.bind(this._cache), this.buffers[t].render(n.shader), n.unbind())
				}
			},
			onRenderGeometry: function(e, t) {
				for (var i in this._cache = this.getDefaultUniforms(e, this._cache), t.bindUniforms(this._cache), this.buffers) this.buffers[i].render(t)
			}
		}),
		LineRenderer = Renderer.extend({
			init: function(e, t, i) {
				this._super(t), this.material = i, this.buffer = new LinesRenderBuffer(e)
			},
			onRender: function(e) {
				this.buffer.render(this.material.shader)
			},
			onRenderGeometry: function(e, t) {
				this._cache = this.getDefaultUniforms(e, this._cache), t.bindUniforms(this._cache), this.buffer.render(t)
			}
		}),
		SubmeshRenderer = Renderer.extend({
			init: function(e, t, i, n) {
				this._super(t), this.submesh = i, this.material = n, this.buffer = [], this.failed = !1, this.transparent = !1, this.localBoundingBox = this.submesh.boundingBox, this.localBoundingSphere = this.submesh.boundingSphere, this.updateGlobalBoundingVolumes(), this.build(e), this._cache = null
			},
			allocBuffer: function(t) {
				if (!this.submesh) throw Error("SubmeshRenderer.allocBuffer: No submesh set");
				if (!t.engine || !0 !== t.engine.options.useVAO && "webgl2" !== t.version) this.buffer = new TrianglesRenderBuffer(t, this.submesh.faces);
				else try {
					this.buffer = new TrianglesRenderBufferVAO(t, this.submesh.faces)
				} catch (e) {
					this.buffer = new TrianglesRenderBuffer(t, this.submesh.faces)
				}
			},
			build: function(e) {
				this.buffer && delete this.buffer, this.allocBuffer(e);
				var t = this.submesh;
				this.buffer.add("position", t.positions, 3);
				var i = t.positions.length / 3;
				if (t.texCoords1D)
					for (var n = 0; n < t.texCoords1D.length; n++) t.texCoords1D[n].length == i ? this.buffer.add("texcoord1d" + n, t.texCoords1D[n], 1) : console.warn("Wrong number of 1D texture coordinates ({0}). Must be the same as positions ({1}).".format(t.texCoords1D[n].length, i));
				if (t.texCoords2D)
					for (n = 0; n < t.texCoords2D.length; n++) t.texCoords2D[n].length / 2 == i ? this.buffer.add("texcoord2d" + n, t.texCoords2D[n], 2) : console.warn("Wrong number of 2D texture coordinates ({0}). Must be the same as positions ({1}).".format(t.texCoords2D[n].length / 2, i));
				if (t.texCoords3D)
					for (n = 0; n < t.texCoords3D.length; n++) t.texCoords3D[n].length / 3 == i ? this.buffer.add("texcoord3d" + n, t.texCoords3D[n], 3) : console.warn("Wrong number of 3D texture coordinates ({0}). Must be the same as positions ({1}).".format(t.texCoords3D[n].length / 3, i));
				if (t.texCoords4D)
					for (n = 0; n < t.texCoords4D.length; n++) t.texCoords4D[n].length / 4 == i ? this.buffer.add("texcoord3d" + n, t.texCoords4D[n], 4) : console.warn("Wrong number of 4D texture coordinates ({0}). Must be the same as positions ({1}).".format(t.texCoords4D[n].length / 4, i));
				t.normals && (t.positions.length != t.normals.length ? console.warn("Wrong number of normals. Must be the same as positions.") : this.buffer.add("normal", t.normals, 3)), t.tangents && (t.positions.length != t.tangents.length ? console.warn("Wrong number of tangents. Must be the same as positions.") : this.buffer.add("tangent", t.tangents, 3)), t.bitangents && (t.positions.length != t.bitangents.length ? console.warn("Wrong number of bitangents. Must be the same as positions.") : this.buffer.add("bitangent", t.bitangents, 3)), t.barycentric && (t.positions.length != t.barycentric.length ? console.warn("Wrong number of barycentric coordinates. Must be the same as positions.") : this.buffer.add("barycentric", t.barycentric, 3));
				var r = this.material;
				r.uniforms.diffuse || (r.uniforms.diffuse = new UniformColor(new Color(1, 1, 1, 1))), r.uniforms.ambient || (r.uniforms.ambient = new UniformColor(new Color(.2, .2, .2, 1))), r.uniforms.specularStrength || (r.uniforms.specularStrength = new UniformFloat(0)), r.uniforms.specularPower || (r.uniforms.specularPower = new UniformInt(8)), this.transparent = r.shader.requirements.transparent || r.uniforms.diffuse && r.uniforms.diffuse.value[3] < 1 || r.uniforms.ambient && r.uniforms.ambient.value[3] < 1, this.failed = !1
			},
			onRender: function(e) {
				this.buffer.render(this.material.shader)
			},
			onRenderGeometry: function(e, t) {
				this._cache = this.getDefaultUniforms(e, this._cache), t.bindUniforms(this._cache), this.buffer.render(t)
			},
			onContextRestored: function(e) {
				this.build(e)
			}
		}),
		CubeRenderer = PrimitiveRenderer.extend({
			init: function(e, t, i, n) {
				this._super(t, n), this.size = i;
				var r = this.size / 2,
					s = [-r, -r, r, r, -r, r, r, -r, -r, -r, -r, -r, -r, r, r, r, r, r, r, r, -r, -r, r, -r];
				this.renderBuffer = new QuadsRenderBuffer(e, [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 5, 4, 1, 2, 6, 5, 2, 3, 7, 6, 3, 0, 0, 7]), this.renderBuffer.add("position", s, 3)
			},
			onRender: function(e) {
				this.material.bind({
					modelview: new UniformMat4(e.modelview.top()),
					projection: new UniformMat4(e.projection.top())
				}), this.renderBuffer.render(this.material.shader), this.material.unbind()
			}
		});

	function DownloadBinary(e, t) {
		var i = new XMLHttpRequest;
		i.open("GET", e, !0), i.responseType = "arraybuffer", i.onload = function() {
			200 == this.status ? t(this.response) : t(!1)
		}, i.send()
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
			getName: function(e) {
				for (var t in DataParserTypes)
					if (DataParserTypes[t] === e) return t;
				return !1
			}
		},
		DataParserNode = function(e, t, i) {
			this.id = e, this.length = t, this.position = i, this.HEADER_LENGTH = 8, this.end = function() {
				return this.position + this.HEADER_LENGTH + this.length
			}
		},
		DataParserResult = FrakClass.extend({
			init: function() {
				this.data = {
					meshes: [],
					materials: [],
					hierarchy: !1,
					collision: !1,
					hierarchyNodesByID: {}
				}
			},
			getData: function() {
				return this.data
			},
			linkReferences: function() {
				for (var e in this.data.meshes) - 1 != this.data.meshes[e].material && this.data.meshes[e].material in this.data.materials && (this.data.meshes[e].material = this.data.materials[this.data.meshes[e].material]);
				if (!1 !== this.data.hierarchy) {
					var n = this,
						r = function(e) {
							for (var t in e.meshes) 0 <= e.meshes[t] && e.meshes[t] in n.data.meshes && (e.meshes[t] = n.data.meshes[e.meshes[t]]);
							for (var i in e.children) r(e.children[i])
						};
					r(this.data.hierarchy)
				}
			},
			createGroup: function() {
				return {
					name: "",
					id: !1,
					parent: !1,
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
					transform: !1
				}
			},
			mapGroupID: function(e) {
				this.data.hierarchyNodesByID[e.id] = e
			},
			setRoot: function(e) {
				this.data.hierarchy = e
			},
			createMaterialTexture: function() {
				return {
					path: !1,
					scale: {
						u: 1,
						v: 1,
						w: 1
					}
				}
			},
			createMaterial: function() {
				return {
					name: "",
					color: {
						ambient: !1,
						diffuse: !1,
						specular: !1,
						emissive: !1
					},
					twosided: !1,
					shininess: 0,
					shininess_strength: 0,
					shader: !1,
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
				}
			},
			addMaterial: function(e) {
				this.data.materials.push(e)
			},
			getMaterial: function(e) {
				return 0 <= e && e < this.data.materials.length && this.data.materials[e]
			},
			createMesh: function(e) {
				for (var t = {
						index: -1,
						material: -1,
						indices: [],
						vertices: []
					}, i = 0; i < e; i++) t.vertices.push(this.createVertex());
				return t
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
				}
			},
			addMesh: function(e) {
				this.data.meshes.push(e), e.index = this.data.meshes.length - 1
			},
			createCollisionTreeNode: function() {
				return {
					parent: !1,
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
					faces: !1
				}
			},
			addFaceList: function(e, t, i, n) {
				return !(t < 0 || i < 0 || 0 == n.length) && (!1 === e.faces && (e.faces = {}), t in e.faces || (e.faces[t] = {}), i in e.faces[t] || (e.faces[t][i] = []), e.faces[t][i] = e.faces[t][i].concat(n), !0)
			},
			setCollisionTreeRoot: function(e) {
				this.data.collision = e
			}
		}),
		DataParser = FrakClass.extend({
			init: function(e, t, i, n, r) {
				this.VERSION = 1, this.view = new jDataView(e), this.onComplete = t, this.onProgress = n, this.onError = i, this.userdata = r, this.result = new DataParserResult, this.errors = [], this.stack = [], this.linkReferences = !0, this.flipX = !1, this.warnOnUnknownChunks = !0, this.isFunction = function(e) {
					return "function" == typeof e
				}
			},
			parse: function() {
				for (this.push(!1, this.parseHeader); !this.completed();)
					if (!this.step()) return this.isFunction(this.onError) && this.onError(this.errors, this.userdata), !1;
				return this.linkReferences && this.result.linkReferences(), this.isFunction(this.onComplete) && this.onComplete(this.result.getData(), this.userdata), !0
			},
			error: function(e) {
				return this.errors.push(e), !1
			},
			errorExpect: function(e, t) {
				return this.error("Expected at least " + e + " byte" + (1 < e ? "s" : "") + ' for "' + t + '"')
			},
			completed: function() {
				return this.view.tell() == this.view.byteLength
			},
			step: function() {
				var e = this.getCurrentCall();
				if (e) {
					var t = e(this.getCurrentNode());
					return this.isFunction(this.onProgress) && this.onProgress(this.view.tell() / this.view.byteLength * 100, this.userdata), t
				}
				return !1
			},
			push: function(e, t) {
				this.stack.push({
					node: e,
					call: FrakCallback(this, t)
				})
			},
			pop: function() {
				this.stack.pop()
			},
			getCurrentNode: function() {
				return 0 < this.stack.length && this.stack[this.stack.length - 1].node
			},
			getCurrentCall: function() {
				return 0 < this.stack.length && this.stack[this.stack.length - 1].call
			},
			hasDataFor: function(e) {
				return !(this.view.byteLength < this.view.tell() + e)
			},
			hasDataForNode: function(e) {
				return !(this.view.byteLength < e.position + e.length + 8)
			},
			getUint32: function() {
				return this.view.getUint32(this.view.tell(), !0)
			},
			getFloat32: function() {
				return this.view.getFloat32(this.view.tell(), !0)
			},
			getMatrix4x4: function() {
				for (var e = [], t = 0; t < 4; t++) e.push([this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32()]);
				return e
			},
			getColor: function() {
				return {
					r: this.view.getFloat32(this.view.tell(), !0),
					g: this.view.getFloat32(this.view.tell(), !0),
					b: this.view.getFloat32(this.view.tell(), !0),
					a: this.view.getFloat32(this.view.tell(), !0)
				}
			},
			parseHeader: function() {
				if (!this.view) return this.error("No data to parse");
				if (!this.parseSignature()) return !1;
				var e = this.parseNodeHeader();
				return !1 !== e && (e.id !== DataParserTypes.NODE_ROOT ? this.error("Root node type is incorrect") : (this.push(e, this.parseRoot), !0))
			},
			parseSignature: function() {
				return this.hasDataFor(12) ? "3DTECHDATA" != this.view.getString(10) ? this.error("The data is not in 3DTech DATA format") : this.view.getInt16(this.view.tell(), !0) != this.VERSION ? this.error("Incompatible version") : !!this.hasDataFor(8) || this.error("Could not find root node") : this.error("Not enough data for 3DTech DATA format header")
			},
			parseNodeHeader: function() {
				if (!this.hasDataFor(8)) return this.error("Not enough data for parsing node header");
				var e = this.view.tell(),
					t = this.getUint32(),
					i = this.getUint32();
				return new DataParserNode(t, i, e)
			},
			skipNode: function(e) {
				this.warnOnUnknownChunks && console.warn("DataParser: skipping node ", DataParserTypes.getName(e.id)), this.view.seek(this.view.tell() + e.length)
			},
			parseMaterial: function(e) {
				for (var t = this.result.createMaterial(); this.view.tell() < e.end();) {
					var i = this.parseNodeHeader();
					switch (i.id) {
						case DataParserTypes.NODE_STRING:
							t.name = this.view.getString(i.length);
							break;
						case DataParserTypes.NODE_SHADER_NAME:
							t.shader = this.view.getString(i.length);
							break;
						case DataParserTypes.NODE_COLOR_AMBIENT:
							if (16 != i.length) return this.error("Ambient color 
								corrupted ");t.color.ambient=this.getColor();break;case DataParserTypes.NODE_COLOR_DIFFUSE:if(16!=i.length)return this.error("
								Diffuse color corrupted ");t.color.diffuse=this.getColor();break;case DataParserTypes.NODE_COLOR_SPECULAR:if(16!=i.length)return this.error("
								Specular color corrupted ");t.color.specular=this.getColor();break;case DataParserTypes.NODE_COLOR_EMISSIVE:if(16!=i.length)return this.error("
								Emissive color corrupted ");t.color.emissive=this.getColor();break;case DataParserTypes.NODE_TWOSIDED:if(i.length<1)return this.errorExpect(1,"
								material.twosided ");var n=this.view.getChar();t.twosided=255==n;break;case DataParserTypes.NODE_SHININESS:if(i.length<4)return this.errorExpect(4,"
								material.shininess ");t.shininess=this.getFloat32();break;case DataParserTypes.NODE_SHININESS_STRENGTH:if(i.length<4)return this.errorExpect(4,"
								material.shininess_strength ");t.shininess_strength=this.getFloat32();break;case DataParserTypes.NODE_TEXTURES_AMBIENT:this.parseMaterialTextures(i,t.textures.ambient);break;case DataParserTypes.NODE_TEXTURES_DIFFUSE:this.parseMaterialTextures(i,t.textures.diffuse);break;case DataParserTypes.NODE_TEXTURES_SPECULAR:this.parseMaterialTextures(i,t.textures.specular);break;case DataParserTypes.NODE_TEXTURES_EMISSIVE:this.parseMaterialTextures(i,t.textures.emissive);break;case DataParserTypes.NODE_TEXTURES_NORMALS:this.parseMaterialTextures(i,t.textures.normal);break;case DataParserTypes.NODE_TEXTURES_HEIGHT:this.parseMaterialTextures(i,t.textures.height);break;case DataParserTypes.NODE_TEXTURES_SHININESS:this.parseMaterialTextures(i,t.textures.shininess);break;case DataParserTypes.NODE_TEXTURES_OPACITY:this.parseMaterialTextures(i,t.textures.opacity);break;case DataParserTypes.NODE_TEXTURES_DISPLACEMENT:this.parseMaterialTextures(i,t.textures.displacement);break;case DataParserTypes.NODE_TEXTURES_LIGHTMAP:this.parseMaterialTextures(i,t.textures.lightmap);break;case DataParserTypes.NODE_TEXTURES_REFLECTION:this.parseMaterialTextures(i,t.textures.reflection);break;default:this.skipNode(i)}}return this.result.addMaterial(t),!0},parseMaterialTextures:function(e,t){for(;this.view.tell()<e.end();){var i=this.parseNodeHeader();if(i.id==DataParserTypes.NODE_TEXTURE){for(var n=this.result.createMaterialTexture();this.view.tell()<i.end();){var r=this.parseNodeHeader();switch(r.id){case DataParserTypes.NODE_STRING:n.path=this.view.getString(r.length);break;case DataParserTypes.NODE_TEXTURE_SCALE:if(12!=r.length)return this.error("
								Texture scale is corrupted ");n.scale.u=this.getFloat32(),n.scale.v=this.getFloat32(),n.scale.w=this.getFloat32();break;default:this.skipNode(r)}}!1!==n.path&&t.push(n)}else this.skipNode(i)}return!0},parseMaterials:function(e){if(!this.hasDataForNode(e))return this.error("
								Not enough data
								for node '"+DataParserTypes.getName(e.id)+"'
								");for(;this.view.tell()<e.end();){var t=this.parseNodeHeader();t.id==DataParserTypes.NODE_MATERIAL?this.parseMaterial(t):this.skipNode(t)}return this.pop(),!0},parseGeometry:function(e){if(!this.hasDataForNode(e))return this.error("
								Not enough data
								for node '"+DataParserTypes.getName(e.id)+"'
								");if(this.view.tell()>=e.end())return this.pop(),!0;var t=this.parseNodeHeader();if(t.id==DataParserTypes.NODE_MESH){if(!this.hasDataForNode(t))return this.error("
								Not enough data
								for node '"+DataParserTypes.getName(t.id)+"'
								");this.push(t,this.parseMesh)}else this.skipNode(t);return!0},parseMesh:function(e){var t=this.getUint32(),i=this.result.createMesh(t),n=0,r=[1,1,1],s=[1,1,1];for(this.flipX&&(s[0]=-1);this.view.tell()<e.end();){var a=this.parseNodeHeader();if(!this.hasDataForNode(a))return this.error("
								Not enough data
								for node '"+DataParserTypes.getName(a.id)+"'
								");switch(a.id){case DataParserTypes.NODE_MATERIAL_REFERENCE:if(a.length<4)return this.errorExpect(4,"
								mesh.material_reference ");i.material=this.getUint32();break;case DataParserTypes.NODE_VERTICES:if(!this.parseVertices(a,t,i.vertices,"
								position ",s))return!1;break;case DataParserTypes.NODE_NORMALS:if(!this.parseVertices(a,t,i.vertices,"
								normal ",r))return!1;break;case DataParserTypes.NODE_TANGENTS:if(!this.
								parseVertices(a, t, i.vertices, "tangent", r)) return !1;
							break;
						case DataParserTypes.NODE_BITANGENTS:
							if (!this.parseVertices(a, t, i.vertices, "bitangent", r)) return !1;
							break;
						case DataParserTypes.NODE_TEXTURE_COORDINATES:
							if (a.length < 4) return this.errorExpect(4, "mesh texture coordinates component count");
							var o = this.getUint32();
							if (0 == o || 3 < o) return this.error("Unsupported number of texture coordinate components: " + o);
							if (a.length - 4 != o * t * 4) return this.error("Texture coordinate set " + n + " is corrupted");
							for (var h = ["x", "y", "z"], u = 0; u < t; u++) {
								for (var c = {}, l = 0; l < o; l++) c[h[l]] = this.getFloat32();
								i.vertices[u].texCoord.push(c)
							}
							n++;
							break;
						case DataParserTypes.NODE_FACES:
							if (!this.parseFaces(a, i.indices)) return !1;
							break;
						default:
							this.skipNode(a)
					}
				}
				return this.result.addMesh(i), this.pop(), !0
			},
			parseVertices: function(e, t, i, n, r) {
				if (e.length != 12 * t) return this.error("Node " + DataParserTypes.getName(e.id) + " is corrupted");
				for (var s = 0; s < t; s++) i[s][n].x = r[0] * this.getFloat32(), i[s][n].y = r[1] * this.getFloat32(), i[s][n].z = r[2] * this.getFloat32();
				return !0
			},
			parseFaces: function(e, t) {
				if (e.length < 4) return this.errorExpect(4, "faces.num_triangles");
				var i = this.getUint32();
				if (e.length - 4 != 12 * i) return this.error("Faces list is corrupted");
				for (var n = 0; n < i; n++) t.push(this.getUint32()), t.push(this.getUint32()), t.push(this.getUint32());
				return !0
			},
			parseScene: function(e) {
				if (!this.hasDataForNode(e)) return this.error("Not enough data for node '" + DataParserTypes.getName(e.id) + "'");
				for (; this.view.tell() < e.end();) {
					var t = this.parseNodeHeader();
					if (t.id == DataParserTypes.NODE_GROUP) {
						if (!this.parseGroup(t, !1)) return !1
					} else this.skipNode(t)
				}
				return this.pop(), !0
			},
			parseGroup: function(e, t) {
				if (!this.hasDataForNode(e)) return this.error("Not enough data for node '" + DataParserTypes.getName(e.id) + "'");
				var i = this.result.createGroup();
				for (!1 === t ? this.result.setRoot(i) : (t.children.push(i), i.parent = t); this.view.tell() < e.end();) {
					var n = this.parseNodeHeader();
					if (!this.hasDataForNode(n)) return this.error("Not enough data for node '" + DataParserTypes.getName(n.id) + "'");
					switch (n.id) {
						case DataParserTypes.NODE_GROUP_ID:
							if (n.length < 4) return this.error("Group ID is corrupted");
							i.id = this.getUint32(), this.result.mapGroupID(i);
							break;
						case DataParserTypes.NODE_STRING:
							i.name = this.view.getString(n.length);
							break;
						case DataParserTypes.NODE_TRANSFORM_POSITION:
							if (12 != n.length) return this.error("Group position is corrupted");
							i.position.x = this.getFloat32(), i.position.y = this.getFloat32(), i.position.z = this.getFloat32();
							break;
						case DataParserTypes.NODE_TRANSFORM_ROTATION:
							if (16 != n.length) return this.error("Group rotation is corrupted");
							i.rotation.x = this.getFloat32(), i.rotation.y = this.getFloat32(), i.rotation.z = this.getFloat32(), i.rotation.w = this.getFloat32();
							break;
						case DataParserTypes.NODE_TRANSFORM_SCALE:
							if (12 != n.length) return this.error("Group scale is corrupted");
							i.scale.x = this.getFloat32(), i.scale.y = this.getFloat32(), i.scale.z = this.getFloat32();
							break;
						case DataParserTypes.NODE_MATRIX4X4:
							if (64 != n.length) return this.error("Group transformation matrix is corrupted");
							i.transform = this.getMatrix4x4();
							break;
						case DataParserTypes.NODE_MESH_REFERENCE:
							if (n.length < 4) return this.error("Group mesh reference is corrupted");
							i.meshes.push(this.getUint32());
							break;
						case DataParserTypes.NODE_GROUP:
							this.parseGroup(n, i);
							break;
						default:
							this.skipNode(n)
					}
				}
				return !0
			},
			parseCollision: function(e) {
				if (!this.hasDataForNode(e)) return this.error("Not enough data for node '" + DataParserTypes.getName(e.id) + "'");
				for (; this.view.tell() < e.end();) {
					var t = this.parseNodeHeader();
					if (t.id == DataParserTypes.NODE_COLLISION_NODE) {
						if (!this.parseCollisionNode(t, !1)) return !1
					} else this.skipNode(t)
				}
				return this.pop(), !0
			},
			parseCollisionNode: function(e, t) {
				if (!this.hasDataForNode(e)) return this.error("Not enough data for node '" + DataParserTypes.getName(e.id) + "'");
				var i = this.result.createCollisionTreeNode();
				for (!1 === t ? this.result.setCollisionTreeRoot(i) : (t.children.push(i), i.parent = t); this.view.tell() < e.end();) {
					var n = this.parseNodeHeader();
					if (!this.hasDataForNode(n)) return this.error("Not enough data for node '" + DataParserTypes.getName(n.id) + "'");
					switch (n.id) {
						case DataParserTypes.NODE_COLLISION_
						AABB_CENTER:
							if (12 != n.length) return this.error("Collision node center is corrupted");
							i.center.x = this.getFloat32(), i.center.y = this.getFloat32(), i.center.z = this.getFloat32();
							break;
						case DataParserTypes.NODE_COLLISION_AABB_EXTENTS:
							if (12 != n.length) return this.error("Collision node extents are corrupted");
							i.extents.x = this.getFloat32(), i.extents.y = this.getFloat32(), i.extents.z = this.getFloat32();
							break;
						case DataParserTypes.NODE_COLLISION_NODE:
							this.parseCollisionNode(n, i);
							break;
						case DataParserTypes.NODE_COLLISION_FACE_LIST:
							this.parseCollisionFaceList(n, i);
							break;
						default:
							this.skipNode(n)
					}
				}
				return !0
			},
			parseCollisionFaceList: function(e, t) {
				if (!this.hasDataForNode(e)) return this.error("Not enough data for node '" + DataParserTypes.getName(e.id) + "'");
				for (var i = -1, n = -1, r = []; this.view.tell() < e.end();) {
					var s = this.parseNodeHeader();
					if (!this.hasDataForNode(s)) return this.error("Not enough data for node '" + DataParserTypes.getName(s.id) + "'");
					switch (s.id) {
						case DataParserTypes.NODE_FACE_LIST_NODE_ID:
							if (4 != s.length) return this.error("Face list node ID is corrupted");
							i = this.getUint32();
							break;
						case DataParserTypes.NODE_FACE_LIST_MESH_REFERENCE:
							if (4 != s.length) return this.error("Face list mesh ID is corrupted");
							n = this.getUint32();
							break;
						case DataParserTypes.NODE_FACE_LIST_INDICES:
							for (; this.view.tell() < s.end();) r.push(this.getUint32());
							break;
						default:
							this.skipNode(s)
					}
				}
				return this.result.addFaceList(t, i, n, r)
			},
			parseRoot: function(e) {
				if (!this.hasDataForNode(e)) return this.error("Not enough data for node '" + DataParserTypes.getName(e.id) + "'");
				if (this.view.tell() >= e.end()) return !0;
				var t = this.parseNodeHeader();
				switch (t.id) {
					case DataParserTypes.NODE_MATERIALS:
						this.push(t, this.parseMaterials);
						break;
					case DataParserTypes.NODE_GEOMETRY:
						this.push(t, this.parseGeometry);
						break;
					case DataParserTypes.NODE_SCENE:
						this.push(t, this.parseScene);
						break;
					case DataParserTypes.NODE_COLLISION:
						this.push(t, this.parseCollision);
						break;
					default:
						this.skipNode(t)
				}
				return !0
			}
		}),
		ThreadedDataParser = DataParser.extend({
			init: function(e, t, i, n, r) {
				this._super(e, t, i, n, r), this.timer = !1, this.inverval = 10
			},
			parse: function() {
				return this.push(!1, this.parseHeader), this.timer = setTimeout(FrakCallback(this, this.threadStep), this.inverval), !0
			},
			threadStep: function() {
				if (this.completed()) return this.linkReferences && this.result.linkReferences(), void(this.isFunction(this.onComplete) && this.onComplete(this.result.getData(), this.userdata));
				this.step() ? this.timer = setTimeout(FrakCallback(this, this.threadStep), this.inverval) : this.onError && "function" == typeof this.onError && this.onError(this.errors, this.userdata)
			}
		}),
		ModelLoader = FrakClass.extend({
			init: function(e, t, i, n) {
				this.descriptor = t, this.shadersManager = i, this.texturesManager = n, this.defaultTexture = !1, this.defaultSampler = !1, this.nodesByID = {}, this.submeshesByID = {}, this.submeshes = []
			},
			createDefaultTextureSampler: function(e) {
				this.defaultTexture || e.engine && (this.defaultTexture = e.engine.WhiteTexture, this.defaultSampler = new Sampler("diffuse0", this.defaultTexture))
			},
			load: function(e, t) {
				e.name = t.hierarchy.name, this.loadMaterials(t.materials), this.loadSubmeshes(t.meshes), this.loadNode(e, t.hierarchy), this.loadCollision(e, t)
			},
			loadMaterials: function(e) {
				for (var t = 0; t < e.length; t++) {
					var i = e[t];
					i.instance = new Material, this.loadMaterial(i.instance, i)
				}
			},
			loadSubmeshes: function(e) {
				for (var t = 0; t < e.length; t++) {
					var i = new Submesh;
					this.loadSubmesh(i, e[t]), this.submeshesByID[e[t].index] = {
						submesh: i,
						material: e[t].material.instance
					}
				}
			},
			loadNode: function(e, t) {
				for (var i in e.localCollisionID = t.id, this.nodesByID[e.localCollisionID] = e, this.loadTransform(e.transform, t.transform), this.loadMesh(e, t.meshes), t.children) {
					var n = new Node(t.children[i].name);
					this.loadNode(n, t.children[i]), e.addNode(n)
				}
			},
			loadMesh: function(e, t) {
				if (t && 0 != t.length) {
					var i = new Mesh;
					for (var n in t)
						if (t[n].index in this.submeshesByID) {
							var r = this.submeshesByID[t[n].index];
							i.addSubmesh(r.submesh, r.material)
						} e.addComponent(new MeshComponent(i)), e.addComponent(new MeshRendererComponent)
				}
			},
			loadSubmesh: function(e, t) {
				if (e.faces = t.indices, 0 != t.vertices.length) {
					var i = t.vertices[0];
					if (e.positions = this.loadSubmeshBuffer("position", t.vertices, ["x", "y", "z"]), i.normal &
						&
						(e.normals = this.loadSubmeshBuffer("normal", t.vertices, ["x", "y", "z"])), i.tangent && (e.tangents = this.loadSubmeshBuffer("tangent", t.vertices, ["x", "y", "z"])), i.bitangent && (e.bitangents = this.loadSubmeshBuffer("bitangent", t.vertices, ["x", "y", "z"])), i.texCoord)
						for (var n in i.texCoord) e.texCoords2D.push(this.loadSubmeshIndexedBuffer("texCoord", t.vertices, ["x", "y"], n));
					e.recalculateBounds()
				}
			},
			loadSubmeshBuffer: function(e, t, i) {
				for (var n in buffer = [], t)
					for (var n in vertex = t[n], i) {
						var r = i[n];
						buffer.push(vertex[e][r])
					}
				return buffer
			},
			loadSubmeshIndexedBuffer: function(e, t, i, n) {
				for (var r in buffer = [], t)
					for (var r in vertex = t[r], i) {
						var s = i[r];
						buffer.push(vertex[e][n][s])
					}
				return buffer
			},
			loadMaterial: function(e, t) {
				for (var i in e.name = t.name, e.shader = this.shadersManager.addSource(t.shader), e.uniforms = {}, this.loadUniforms(e.uniforms, t), t.textures)
					for (var n = t.textures[i], r = 0; r < n.length; r++) {
						var s = new TextureDescriptor(n[r].path);
						s.parentDescriptor = this.descriptor;
						var a = this.texturesManager.addDescriptor(s);
						e.samplers || (e.samplers = []), e.samplers.push(new Sampler(i + r, a)), "normal" == i && (e.shader = this.shadersManager.addSource("normalmapped"))
					}
				e.samplers || "diffuse" != t.shader.toLowerCase() || (e.samplers = [], this.createDefaultTextureSampler(this.texturesManager.context), e.samplers.push(this.defaultSampler))
			},
			loadUniforms: function(e, t) {
				t.color.ambient ? e.ambient = new UniformColor(t.color.ambient) : e.ambient = new UniformColor(new Color(.2, .2, .2, 1)), t.color.diffuse ? e.diffuse = new UniformColor(t.color.diffuse) : e.diffuse = new UniformColor(new Color(1, 1, 1, 1)), t.color.emissive && (e.emissive = new UniformColor(t.color.emissive)), t.color.specular && (e.specular = new UniformColor(t.color.specular)), e.twosided = new UniformInt(t.twosided + 0)
			},
			loadTransform: function(e, t) {
				e.relative[0] = t[0][0], e.relative[4] = t[0][1], e.relative[8] = t[0][2], e.relative[12] = t[0][3], e.relative[1] = t[1][0], e.relative[5] = t[1][1], e.relative[9] = t[1][2], e.relative[13] = t[1][3], e.relative[2] = t[2][0], e.relative[6] = t[2][1], e.relative[10] = t[2][2], e.relative[14] = t[2][3], e.relative[3] = t[3][0], e.relative[7] = t[3][1], e.relative[11] = t[3][2], e.relative[15] = t[3][3]
			},
			loadCollisionNodeParameters: function(e, t) {
				var i = new CollisionOctreeNode([e.center.x, e.center.y, e.center.z], 2 * e.extents.x, t);
				return e.faces && (i.faces = e.faces), i
			},
			loadCollisionNodeSubnodes: function(e, t, i) {
				if (0 != t.children.length) {
					e.subnodes = [];
					for (var n = 0; n < 8; n++) {
						var r = this.loadCollisionNodeParameters(t.children[n], e);
						e.subnodes.push(r), this.loadCollisionNodeSubnodes(r, t.children[n], i)
					}
				}
			},
			loadCollision: function(e, t) {
				if (!1 !== t.collision) {
					var i = e.addComponent(new LargeMeshCollider);
					for (var n in i.tree = this.loadCollisionNodeParameters(t.collision, !1), i.tree.nodes = this.nodesByID, i.tree.submeshes = {}, this.submeshesByID) i.tree.submeshes[n] = this.submeshesByID[n].submesh;
					this.loadCollisionNodeSubnodes(i.tree, t.collision, t)
				}
			}
		}),
		JSONModelLoader = FrakClass.extend({
			init: function(e, t, i, n) {
				this.descriptor = t, this.shadersManager = i, this.texturesManager = n, this.defaultTexture = !1, this.defaultSampler = !1, this.nodesByID = {}, this.submeshesByID = {}, this.submeshes = [], this.textureUniformMap = {
					texturesDiffuse: "diffuse",
					texturesNormals: "normal"
				}
			},
			createDefaultTextureSampler: function(e) {
				this.defaultTexture || e.engine && (this.defaultTexture = e.engine.WhiteTexture, this.defaultSampler = new Sampler("diffuse0", this.defaultTexture))
			},
			load: function(e, t) {
				FRAK.isEmptyObject(t) || (e.name = t.scene.name, this.linkReferences(t), this.loadMaterials(t.materials), this.loadSubmeshes(t.meshes), this.loadNode(e, t.scene), this.loadCollision(e, t))
			},
			linkReferences: function(e) {
				for (var t = 0; t < e.meshes.length; t++) 0 <= e.meshes[t].materialIndex && e.meshes[t].materialIndex < e.materials.length && (e.meshes[t].material = e.materials[e.meshes[t].materialIndex])
			},
			loadMaterials: function(e) {
				for (var t = 0; t < e.length; t++) {
					var i = e[t];
					i.instance = new Material, this.loadMaterial(i.instance, i)
				}
			},
			loadMaterial: function(e, t) {
				var i = t.shader || "diffuse";
				for (var n in e.name = t.name, e.shader = this.shadersManager.addSource(i), "transparent" == i.toLowerCase() && (e.shader.requirements.transparent = !0), e.uniforms = {}, this.loadUniforms(e.uniforms, t), t.textures)
					for (var r = t.
						textures[n], s = 0; s < r.length; s++) {
						var a = new TextureDescriptor(r[s]);
						a.parentDescriptor = this.descriptor;
						var o = this.texturesManager.addDescriptor(a),
							h = "diffuse";
						n in this.textureUniformMap && (h = this.textureUniformMap[n]), e.samplers || (e.samplers = []), e.samplers.push(new Sampler(h + s, o)), "texturesNormals" == n && (e.shader = this.shadersManager.addSource("normalmapped"))
					}
				e.samplers || "diffuse" != i.toLowerCase() || (e.samplers = [], this.createDefaultTextureSampler(this.texturesManager.context), e.samplers.push(this.defaultSampler))
			},
			loadUniforms: function(e, t) {
				t.color.ambient ? e.ambient = new UniformColor(t.color.ambient) : e.ambient = new UniformColor(new Color(.2, .2, .2, 1)), t.color.diffuse ? e.diffuse = new UniformColor(t.color.diffuse) : e.diffuse = new UniformColor(new Color(1, 1, 1, 1)), t.color.emissive && (e.emissive = new UniformColor(t.color.emissive)), t.color.specular && (e.specular = new UniformColor(t.color.specular)), e.twosided = new UniformInt(t.twosided + 0)
			},
			loadSubmeshes: function(e) {
				for (var t = 0; t < e.length; t++) {
					var i = new Submesh;
					this.loadSubmesh(i, e[t]), this.submeshesByID[t] = {
						submesh: i,
						material: e[t].material.instance
					}
				}
			},
			loadSubmesh: function(e, t) {
				if (t.faces && 0 != t.faces.length && t.vertices && 0 != t.vertices.length) {
					e.faces = t.faces, e.positions = t.vertices;
					var i = t.vertices.length / 3;
					if (t.normals && t.normals.length / 3 == i && (e.normals = t.normals), t.tangents && t.tangents.length / 3 == i && (e.tangents = t.tangents), t.bitangents && t.bitangents.length / 3 == i && (e.bitangents = t.bitangents), t.texCoords1D)
						for (var n = 0; n < t.texCoords1D.length; n++) t.texCoords1D[n].length == i && e.texCoords1D.push(t.texCoords1D[n]);
					if (t.texCoords2D)
						for (n = 0; n < t.texCoords2D.length; n++) t.texCoords2D[n].length / 2 == i && e.texCoords2D.push(t.texCoords2D[n]);
					else if (t.texCoords3D)
						for (n = 0; n < t.texCoords3D.length; n++)
							if (t.texCoords3D[n].length / 3 == i) {
								for (var r = [], s = 0; s < t.texCoords3D[n].length; s += 3) r.push(t.texCoords3D[n][s]), r.push(t.texCoords3D[n][s + 1]);
								e.texCoords2D.push(r), e.yesIGeneratedThese = !0
							} if (t.texCoords3D)
						for (n = 0; n < t.texCoords3D.length; n++) t.texCoords3D[n].length / 3 == i && e.texCoords3D.push(t.texCoords3D[n]);
					if (t.texCoords4D)
						for (n = 0; n < t.texCoords4D.length; n++) t.texCoords4D[n].length / 4 == i && e.texCoords4D.push(t.texCoords4D[n]);
					e.recalculateBounds()
				}
			},
			loadNode: function(e, t) {
				e.localCollisionID = t.id, (this.nodesByID[e.localCollisionID] = e).transform.relative = t.relative, this.loadMesh(e, t.meshes);
				for (var i = 0; i < t.subnodes.length; i++) {
					var n = new Node(t.subnodes[i].name);
					this.loadNode(n, t.subnodes[i]), e.addNode(n)
				}
			},
			loadMesh: function(e, t) {
				if (t && 0 != t.length) {
					for (var i = new Mesh, n = 0; n < t.length; n++) {
						var r = t[n];
						if (r in this.submeshesByID) {
							var s = this.submeshesByID[r];
							i.addSubmesh(s.submesh, s.material)
						}
					}
					e.addComponent(new MeshComponent(i)), e.addComponent(new MeshRendererComponent)
				}
			},
			loadCollisionNodeParameters: function(e, t) {
				var i = new CollisionOctreeNode(new Float32Array(e.center), 2 * e.extents[0], t);
				return e.faces && (i.faces = e.faces), i
			},
			loadCollisionNodeSubnodes: function(e, t, i) {
				if (t.subnodes && 8 == t.subnodes.length) {
					e.subnodes = [];
					for (var n = 0; n < 8; n++) {
						var r = this.loadCollisionNodeParameters(t.subnodes[n], e);
						e.subnodes.push(r), this.loadCollisionNodeSubnodes(r, t.subnodes[n], i)
					}
				}
			},
			loadCollision: function(e, t) {
				if (t.collision) {
					var i = e.addComponent(new LargeMeshCollider);
					for (var n in i.tree = this.loadCollisionNodeParameters(t.collision, !1), i.tree.nodes = this.nodesByID, i.tree.submeshes = {}, this.submeshesByID) i.tree.submeshes[n] = this.submeshesByID[n].submesh;
					this.loadCollisionNodeSubnodes(i.tree, t.collision, t)
				}
			}
		}),
		Manager = FrakClass.extend({
			init: function(e) {
				var t = this;
				this.path = "", e && (this.path = e), 0 < this.path.length && "/" != this.path.slice(-1) && (this.path += "/"), this.queue = [], this.loading = [], this.cache = {}, this.cacheSize = 0, this.callbacks = [], this.progressCallbacks = [], this.sourceCallback = function(e) {
					return t.path + e
				}, this.descriptorCallback = function(e) {
					return e
				}, this.onAddToQueue = function(e) {}, this.onLoaded = function(e) {}
			},
			getTotalItems: function() {
				return this.queue.length + this.loading.length + this.cacheSize
			},
			getWaitingItems: function() {
				return this.queue.length + this.loading.length
			},
			getProgress: function() {
				return 0 == this.getTotalItems() ? 1 : 1 - this.getWaitingItems() / this.
				getTotalItems()
			},
			addDescriptor: function(e) {
				var t = this.cache[e.serialize(["id"])];
				return t || ((t = this.getLoadingResource(e)) || (this.onAddToQueue(e), t = this.createResource(e), this.queue.push([e, e.serialize(["id"]), t])), t)
			},
			getLoadingResource: function(e) {
				var t = e.serialize(["id"]);
				for (var i in this.loading)
					if (this.loading[i][1] == t) return this.loading[i][2];
				for (var n in this.queue)
					if (this.queue[n][1] == t) return this.queue[n][2];
				return null
			},
			removeFromCache: function(e) {
				delete this.cache[e], this.cacheSize--
			},
			cleanCache: function() {
				this.cache = {}, this.cacheSize = 0
			},
			load: function(e, t) {
				t && this.progressCallbacks.push(t), e && (this.callbacks.push(e), 1 < this.callbacks.length) ? 0 == this.queue.length && this.callDoneCallbacks() : this.keepLoading()
			},
			keepLoading: function() {
				for (var e = 0; e < this.progressCallbacks.length; e++) this.progressCallbacks[e](this.getProgress());
				if (0 != this.queue.length) {
					var i = this,
						t = this.queue.shift();
					this.loading.push(t), this.loadResource(t[0], t[2], function(e, t) {
						i.cache[e.serialize(["id"])] = t, i.cacheSize++, i.removeLoadedResource(e), i.onLoaded(e), i.keepLoading()
					}, function(e) {
						console.warn("Failed to load resource with descriptor: ", e.serialize(["id"])), i.removeLoadedResource(e), i.onLoaded(e), e.getFullPath && console.warn("Full path: ", e.getFullPath()), i.keepLoading()
					})
				} else this.callDoneCallbacks()
			},
			removeLoadedResource: function(e) {
				for (var t in this.loading)
					if (this.loading[t][0] === e) {
						this.loading.splice(t, 1);
						break
					}
			},
			callDoneCallbacks: function() {
				var e = this.callbacks;
				this.callbacks = [];
				for (var t = 0; t < e.length; t++) e[t]()
			},
			createResource: function() {
				throw "createResource not implemented by this instance of Manager"
			},
			loadResource: function(e, t, i, n) {
				throw "loadResource not implemented by this instance of Manager"
			}
		}),
		TextManager = Manager.extend({
			init: function(e) {
				this._super(e)
			},
			add: function(e) {
				return e = this.sourceCallback(e), this.addDescriptor(new TextDescriptor(e))
			},
			createResource: function(e) {
				return {
					data: !1,
					descriptor: e
				}
			},
			loadResource: function(e, t, i, n) {
				var r = this.descriptorCallback(e);
				Logistics.getText(r.getFullPath(), function(e) {
					t.data = e, i(r, t)
				}).error(function() {
					n(r)
				})
			}
		}),
		ShadersManager = Manager.extend({
			init: function(e, t) {
				this._super(t), this.context = e, this.aliases = {
					diffuse: "shaders/default/diffuse",
					normalmapped: "shaders/default/normalmapped",
					transparent: "shaders/default/transparent",
					reflective: "shaders/default/reflective",
					reflective_masked: "shaders/default/reflective_masked",
					test: "shaders/default/test",
					fallback: "shaders/default/fallback",
					depthrgba: "shaders/default/DepthRGBA",
					gaussianblur: "shaders/default/GaussianBlur"
				}, this.textManager = new TextManager
			},
			add: function(e, t) {
				return e = this.sourceCallback(e), t = this.sourceCallback(t), this.addDescriptor(new ShaderDescriptor(e, t))
			},
			addSource: function(e) {
				var t = e.toLowerCase();
				return t in this.aliases && (e = this.aliases[t]), e = this.sourceCallback(e), this.addDescriptor(new ShaderDescriptor(e + ".vert", e + ".frag"))
			},
			createResource: function(e) {
				return new Shader(this.context, e)
			},
			loadResource: function(e, t, i, n) {
				var r = this.descriptorCallback(e),
					s = this.textManager.add(r.getVertexShaderPath()),
					a = this.textManager.add(r.getFragmentShaderPath());
				this.textManager.load(function() {
					s.data && a.data ? (t.addVertexShader(s.data), t.addFragmentShader(a.data), i(r, t)) : n(r)
				})
			}
		}),
		TexturesManager = Manager.extend({
			init: function(e, t) {
				this._super(t), this.context = e
			},
			add: function(e) {
				e = this.sourceCallback(e);
				var t = new TextureDescriptor(e);
				return this.addDescriptor(t)
			},
			addCube: function(e) {
				if (6 != e.length) throw "TexturesManager.addCube: Cube textures require 6 image URIs";
				for (var t = new CubeTextureDescriptor, i = 0; i < e.length; i++) t.sources.push(this.sourceCallback(e[i]));
				return this.addDescriptor(t)
			},
			createResource: function(e) {
				var t;
				return e instanceof CubeTextureDescriptor ? (t = new CubeTexture(this.context)).name = "Cubemap" : (t = new Texture(this.context)).name = e.source, t
			},
			loadResource: function(e, n, r, s) {
				var a = this.descriptorCallback(e),
					o = this;
				if (e instanceof CubeTextureDescriptor) {
					var h = [CubeTexture.FRONT, CubeTexture.BACK, CubeTexture.LEFT, CubeTexture.RIGHT, CubeTexture.BOTTOM, CubeTexture.TOP];
					! function t() {
						if (0 != h.length) {
							var i = h.shift();
							Logistics.getImage(a.getFaceFullPath(i), function(e) {
								n.setFace(o.context, i, e), delete e, t()
							}).error(function() {
								s(a)
							})
						} else r(a, n)
					}()
				} else Logistics.getImage(a.getFullPath(), function(e) {
					n.setImage(o.context, e), delete e, r(a, n)
				}).error(function() {
					s(a)
				})
			}
		}),
		MaterialsManager = Manager.extend({
			init: function(e, t, i, n) {
				if (this._super(t), i && !(i instanceof ShadersManager)) throw "shadersManager is not instance of ShadersManager";
				if (n && !(n instanceof TexturesManager)) throw "texturesManager is not instance of TexturesManager";
				i || (i = new ShadersManager(e)), this.shadersManager = i, n || (n = new TexturesManager(e)), this.texturesManager = n, this.context = e
			},
			add: function(e) {
				return e = this.sourceCallback(e), this.addDescriptor(new MaterialDescriptor(e))
			},
			createResource: function(e) {
				var t = new Material;
				return t.descriptor = e, t
			},
			loadResource: function(e, i, n, t) {
				var r, s = this.descriptorCallback(e),
					a = this;
				s.shaderDescriptor && (r = this.shadersManager.addDescriptor(s.shaderDescriptor)), this.shadersManager.load(function() {
					var t = {};
					for (var e in s.textureDescriptors) t[e] = a.texturesManager.addDescriptor(s.textureDescriptors[e]);
					a.texturesManager.load(function() {
						for (var e in i.samplers || (i.samplers = []), t) i.samplers.push(new Sampler(e, t[e]));
						i.shader = r, i.uniforms = s.uniforms, s.requirements && i.shader && (i.shader.requirements.transparent = s.requirements.transparent), n(s, i)
					})
				})
			}
		}),
		MaterialSourcesManager = Manager.extend({
			init: function(e, t, i, n) {
				if (this._super(t), i && !(i instanceof MaterialsManager)) throw "materialsManager is not instance of MaterialsManager";
				if (n && !(n instanceof TextManager)) throw "textManager is not instance of TextManager";
				i || (i = new MaterialsManager(e)), this.materialsManager = i, n || (n = new TextManager), this.textManager = n, this.context = e
			},
			add: function(e) {
				return e = this.sourceCallback(e), this.addDescriptor(new MaterialSourceDescriptor(e))
			},
			createResource: function(e) {
				return new MaterialSource(e)
			},
			loadResource: function(e, a, o, t) {
				var h = this.descriptorCallback(e),
					u = this.textManager.add(h.getFullPath()),
					c = this;
				this.textManager.load(function() {
					var e = FRAK.parseJSON(u.data),
						t = new MaterialDescriptor;
					if (t.parentDescriptor = h, e.uniforms)
						for (var i in e.uniforms) {
							var n = e.uniforms[i];
							n instanceof Array ? (1 == n.length && (t.uniforms[i] = new UniformFloat(n)), 2 == n.length && (n[0] instanceof Array ? t.uniforms[i] = new UniformMat2(n[0].concat(n[1])) : t.uniforms[i] = new UniformVec2(n)), 3 == n.length && (n[0] instanceof Array ? t.uniforms[i] = new UniformMat3(n[0].concat(n[1]).concat(n[2])) : t.uniforms[i] = new UniformVec3(n)), 4 == n.length && (n[0] instanceof Array ? t.uniforms[i] = new UniformMat4(n[0].concat(n[1]).concat(n[2]).concat(n[3])) : t.uniforms[i] = new UniformVec4(n))) : n instanceof Object ? (!1 in n && (n.a = 0), t.uniforms[i] = new UniformColor(n)) : "number" == typeof n && parseFloat(n) == parseInt(n) ? t.uniforms[i] = new UniformInt(n) : t.uniforms[i] = new UniformFloat(n)
						}
					if (e.textures)
						for (var r in e.textures) {
							var s = new TextureDescriptor(e.textures[r]);
							(t.textureDescriptors[r] = s).parentDescriptor = t
						}
					e.shader && (e.shader instanceof Array ? t.shaderDescriptor = new ShaderDescriptor(e.shader[0], e.shader[1]) : t.shaderDescriptor = new ShaderDescriptor(e.shader), t.shaderDescriptor.parentDescriptor = t), e.requirements && (t.requirements = e.requirements), a.material = c.materialsManager.addDescriptor(t), c.materialsManager.load(function() {
						o(h, a)
					})
				})
			}
		}),
		ModelsManager = Manager.extend({
			init: function(e, t, i, n) {
				this._super(t), i || (i = new ShadersManager(e)), this.shadersManager = i, n || (n = new TexturesManager(e)), this.texturesManager = n
			},
			getProgress: function() {
				var e = this._super();
				return 1 == e ? e : e + (this.texturesManager.getProgress() + this.shadersManager.getProgress()) / 2 / this.getTotalItems()
			},
			add: function(e, t) {
				return e = this.sourceCallback(e), this.addDescriptor(new ModelDescriptor(e, t))
			},
			createResource: function() {
				return new Node
			},
			loadResource: function(e, i, n, r) {
				var s = this.descriptorCallback(e),
					a = this;
				"json" == e.getFormat() ? Logistics.getJSON(s.getFullPath(), function(e) {
					new JSONModelLoader(a.context, s, a.shadersManager, a.texturesManager).load(i, e), n(s, i), a.shadersManager.load(function() {}), a.texturesManager.load(function() {})
				}) : Logistics.getBinary(s.getFullPath(), function(e) {
					e && 0 != e.byteLength ? a.createParser(e,
						function(e, t) {
							new ModelLoader(a.context, s, a.shadersManager, a.texturesManager).load(i, e), n(s, i), a.shadersManager.load(function() {}), a.texturesManager.load(function() {})
						},
						function(e, t) {
							r(s)
						},
						function(e, t) {}).parse() : r(s)
				})
			},
			createParser: function(e, t, i, n, r) {
				return new ThreadedDataParser(e, t, i, n, r)
			}
		}),
		AssetsManager = FrakClass.extend({
			init: function(e, t) {
				this.managers = [], this.assetsPath = t;
				var n = this;
				this.loadingCount = 0, this.loadedCallbacks = [];
				var i = function(e) {
					e.onAddToQueue = function(e) {
						n.loadingCount++
					}, e.onLoaded = function(e) {
						if (n.loadingCount--, n.loadingCount <= 0) {
							var t = n.loadedCallbacks.slice(0);
							n.loadedCallbacks = [];
							for (var i = 0; i < t.length; i++) {
								(0, t[i])()
							}
						}
					}, n.managers.push(e)
				};
				i(this.shadersManager = new ShadersManager(e, this.assetsPath)), i(this.texturesManager = new TexturesManager(e, this.assetsPath)), i(this.modelsManager = new ModelsManager(e, this.assetsPath, this.shadersManager, this.texturesManager)), i(this.textManager = new TextManager(this.assetsPath)), i(this.materialsManager = new MaterialsManager(e, this.assetsPath, this.shadersManager, this.texturesManager)), i(this.materialSourcesManager = new MaterialSourcesManager(e, this.assetsPath, this.materialsManager, this.textManager))
			},
			addTexture: function(e) {
				return this.texturesManager.add(e)
			},
			addModel: function(e, t) {
				return this.modelsManager.add(e, t)
			},
			addShaderSource: function(e) {
				return this.shadersManager.addSource(e)
			},
			addShader: function(e, t) {
				return this.shadersManager.add(e, t)
			},
			addText: function(e) {
				return this.textManager.add(e)
			},
			addMaterial: function(e) {
				return this.materialSourcesManager.add(e)
			},
			hasItemsInQueue: function() {
				for (var e in this.managers)
					if (0 < this.managers[e].getWaitingItems()) return !0;
				return !1
			},
			load: function(e, i) {
				var n = this;
				if (e && this.loadedCallbacks.push(e), this.hasItemsInQueue())
					for (var t = 0; t < this.managers.length; t++) this.managers[t].load(function() {}, a);
				else {
					var r = this.loadedCallbacks.slice(0);
					this.loadedCallbacks = [];
					for (var s = 0; s < r.length; s++) r[s]()
				}

				function a() {
					if (i) {
						for (var e = 0, t = 0; t < n.managers.length; t++) n.managers[t] ? e += n.managers[t].getProgress() : e += 1;
						i(e / n.managers.length)
					}
				}
			}
		}),
		BoundingVolume = Serializable.extend({
			init: function(e) {
				this.center = !1, e && (this.center = vec3.clone(e))
			},
			type: function() {
				return "BoundingVolume"
			},
			isPoint: function() {
				return !0
			},
			toString: function() {
				return "BoundingVolume[center=(" + this.center[0] + "," + this.center[1] + "," + this.center[2] + ")]"
			}
		}),
		BoundingVolumeVectorCache = [vec3.create(), vec3.create(), vec3.create()],
		BoundingBox = BoundingVolume.extend({
			init: function(e, t) {
				this._super(e), this.size = vec3.create(), t && vec3.copy(this.size, t), this.extents = vec3.scale(vec3.create(), this.size, .5), this.min = vec3.create(), this.max = vec3.create(), this.recalculate()
			},
			type: function() {
				return "BoundingBox"
			},
			recalculate: function() {
				vec3.scale(this.size, this.extents, 2), this.center && (vec3.subtract(this.min, this.center, this.extents), vec3.add(this.max, this.center, this.extents))
			},
			set: function(e, t) {
				e && (this.center || (this.center = vec3.create()), vec3.copy(this.center, e)), t && vec3.copy(this.size, t), vec3.scale(this.extents, this.size, .5), this.recalculate()
			},
			transform: function(e, t) {
				if (t || (t = new BoundingBox), !this.center) return t;
				var i = 0,
					n = 0;
				mat4.translation(t.min, e), mat4.translation(t.max, e);
				for (var r = 0; r < 3; r++)
					for (var s = 0; s < 3; s++)(i = e[4 * s + r] * this.min[s]) < (n = e[4 * s + r] * this.max[s]) ? (t.min[r] += i, t.max[r] += n) : (t.min[r] += n, t.max[r] += i);
				return vec3.subtract(t.size, t.max, t.min), vec3.scale(t.extents, t.size, .5), t.center || (t.center = vec3.create()), vec3.add(t.center, t.min, t.extents), t
			},
			isPoint: function() {
				return 0 == this.size[0] && 0 == this.size[1] && 0 == this.size[2]
			},
			getOuterSphereRadius: function() {
				return vec3.len(this.extents)
			},
			containsPoint: function(e) {
				return !!this.center && (e[0] >= this.min[0] && e[1] >= this.min[1] && e[2] >= this.min[2] && e[0] <= this.max[0] && e[1] <= this.max[1] && e[2] <= this.max[2])
			},
			containsBox: function(e) {
				return !!this.center && (this.containsPoint(e.min) && this.containsPoint(e.max))
			},
			intersectsBox: function(e) {
				return !!this.center && (this.max[0] > e.min[0] && this.min[0] < e.max[0] && this.max[1] > e.min[1] && this.min[1] < e.max[1] && this.max[2] > e.min[2] && this.min[2] < e.max[2])
			},
			intersectsPlane: function(e) {
				if (!this.center) return !1;
				var
					t = BoundingVolumeVectorCache[0],
					i = BoundingVolumeVectorCache[1],
					n = BoundingVolumeVectorCache[2];
				vec3.copy(t, this.max), vec3.copy(i, this.min);
				var r = 1 / 0,
					s = -1 / 0,
					a = e.getDistanceToPoint(this.min);
				return a < r && (vec3.copy(t, this.min), r = a), s < a && (vec3.copy(i, this.min), s = a), (a = e.getDistanceToPoint(this.max)) < r && (vec3.copy(t, this.max), r = a), s < a && (vec3.copy(i, this.max), s = a), vec3.set(n, this.min[0], this.min[1], this.max[2]), (a = e.getDistanceToPoint(n)) < r && (vec3.copy(t, n), r = a), s < a && (vec3.copy(i, n), s = a), vec3.set(n, this.min[0], this.max[1], this.min[2]), (a = e.getDistanceToPoint(n)) < r && (vec3.copy(t, n), r = a), s < a && (vec3.copy(i, n), s = a), vec3.set(n, this.min[0], this.max[1], this.max[2]), (a = e.getDistanceToPoint(n)) < r && (vec3.copy(t, n), r = a), s < a && (vec3.copy(i, n), s = a), vec3.set(n, this.max[0], this.min[1], this.min[2]), (a = e.getDistanceToPoint(n)) < r && (vec3.copy(t, n), r = a), s < a && (vec3.copy(i, n), s = a), vec3.set(n, this.max[0], this.min[1], this.max[2]), (a = e.getDistanceToPoint(n)) < r && (vec3.copy(t, n), r = a), s < a && (vec3.copy(i, n), s = a), vec3.set(n, this.max[0], this.max[1], this.min[2]), (a = e.getDistanceToPoint(n)) < r && (vec3.copy(t, n), r = a), s < a && (vec3.copy(i, n), s = a), !e.sameSide(t, i) || !(!e.pointOnPlane(t) && !e.pointOnPlane(i))
			},
			intersectsTriangle: function(e, t, i) {
				if (!this.center) return !1;
				if (AABBPlaneCache.setByPoints(e, t, i), !this.intersectsPlane(AABBPlaneCache)) return !1;
				if (this.containsPoint(e) || this.containsPoint(t) || this.containsPoint(i)) return !0;
				var n = BoundingVolumeVectorCache[0],
					r = BoundingVolumeVectorCache[1];
				vec3.copy(n, e), vec3.copy(r, e);
				for (var s = 0; s < 3; s++) t[s] < n[s] && (n[s] = t[s]), i[s] < n[s] && (n[s] = i[s]), t[s] > r[s] && (r[s] = t[s]), i[s] > r[s] && (r[s] = i[s]);
				if (!(this.max[0] >= n[0] && this.min[0] <= r[0] && this.max[1] >= n[1] && this.min[0] <= r[1] && this.max[2] >= n[2] && this.min[2] <= r[2])) return !1;
				var a = vec2.fromValues(e[0], e[1]),
					o = vec2.fromValues(t[0], t[1]),
					h = vec2.fromValues(i[0], i[1]),
					u = vec2.fromValues(this.min[0], this.min[1]),
					c = vec2.fromValues(this.max[0], this.max[1]);
				return !!(LineRectIntersection2D(a, o, u, c) || LineRectIntersection2D(o, h, u, c) || LineRectIntersection2D(h, a, u, c) || PointInTriangle2D(a, o, h, u)) && (vec2.set(a, e[2], e[1]), vec2.set(o, t[2], t[1]), vec2.set(h, i[2], i[1]), vec2.set(u, this.min[2], this.min[1]), vec2.set(c, this.max[2], this.max[1]), !!(LineRectIntersection2D(a, o, u, c) || LineRectIntersection2D(o, h, u, c) || LineRectIntersection2D(h, a, u, c) || PointInTriangle2D(a, o, h, u)) && (vec2.set(a, e[0], e[2]), vec2.set(o, t[0], t[2]), vec2.set(h, i[0], i[2]), vec2.set(u, this.min[0], this.min[2]), vec2.set(c, this.max[0], this.max[2]), !!(LineRectIntersection2D(a, o, u, c) || LineRectIntersection2D(o, h, u, c) || LineRectIntersection2D(h, a, u, c) || PointInTriangle2D(a, o, h, u))))
			},
			encapsulatePoint: function(e) {
				if (!this.center) return this.center = vec3.clone(e), this.extents[0] = 0, this.extents[1] = 0, this.extents[2] = 0, void this.recalculate();
				if (!this.containsPoint(e)) {
					for (var t = vec3.subtract(BoundingVolumeVectorCache[0], e, this.center), i = 0; i < 3; i++) Math.abs(t[i]) > this.extents[i] && (this.extents[i] += (Math.abs(t[i]) - this.extents[i]) / 2, this.center[i] = e[i] + (e[i] > this.center[i] ? -1 : 1) * this.extents[i]);
					this.recalculate()
				}
			},
			encapsulateBox: function(e) {
				if (e.center) return this.center ? void(this.containsBox(e) || (this.encapsulatePoint(e.min), this.encapsulatePoint(e.max))) : (this.center = vec3.clone(e.center), this.extents = vec3.clone(e.extents), void this.recalculate())
			},
			getVertices: function(e) {
				return e || (e = [vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create()]), vec3.add(e[0], this.center, [this.extents[0], this.extents[1], this.extents[2]]), vec3.add(e[1], this.center, [-this.extents[0], this.extents[1], this.extents[2]]), vec3.add(e[2], this.center, [this.extents[0], -this.extents[1], this.extents[2]]), vec3.add(e[3], this.center, [-this.extents[0], -this.extents[1], this.extents[2]]), vec3.add(e[4], this.center, [this.extents[0], this.extents[1], -this.extents[2]]), vec3.add(e[5], this.center, [-this.extents[0], this.extents[1], -this.extents[2]]), vec3.add(e[6], this.center, [this.extents[0], -this.extents[1], -this.extents[2]]), vec3.add(e[7], this.center, [-this.extents[0], -this.extents[1], -this.extents[2]]), e
			},
			toString: function() {
				return "BoundingBox[\n\
tcenter=(" + this.center[0] + ", " + this.center[1] + ", " + this.center[2] + ")\n\tmin=(" + this.min[0] + ", " + this.min[1] + ", " + this.min[2] + ")\n\tmax=(" + this.max[0] + ", " + this.max[1] + ", " + this.max[2] + ")\n\textents=(" + this.extents[0] + ", " + this.extents[1] + ", " + this.extents[2] + ")\n\tsize=(" + this.size[0] + ", " + this.size[1] + ", " + this.size[2] + ")\n]\n"
			}
		});

	function LineLineIntersection2D(e, t, i, n, r) {
		var s = (t[0] - e[0]) * (n[1] - i[1]) - (t[1] - e[1]) * (n[0] - i[0]);
		if (0 == s) return !1;
		var a = ((e[1] - i[1]) * (n[0] - i[0]) - (e[0] - i[0]) * (n[1] - i[1])) / s,
			o = ((e[1] - i[1]) * (t[0] - e[0]) - (e[0] - i[0]) * (t[1] - e[1])) / s;
		return !(a < 0 || 1 < a || o < 0 || 1 < o) && (r && (r[0] = e[0] + a * (t[0] - e[0]), r[1] = e[1] + a * (t[1] - e[1])), !0)
	}

	function LineRectIntersection2D(e, t, i, n) {
		return !!(LineLineIntersection2D(e, t, i, [i[0], n[1]]) || LineLineIntersection2D(e, t, [i[0], n[1]], n) || LineLineIntersection2D(e, t, n, [n[0], i[1]]) || LineLineIntersection2D(e, t, i, [n[0], i[1]]))
	}

	function PointInTriangle2D(e, t, i, n) {
		var r = (t[1] - i[1]) * (e[0] - i[0]) + (i[0] - t[0]) * (e[1] - i[1]);
		if (0 == r) return !1;
		var s = ((t[1] - i[1]) * (n[0] - i[0]) + (i[0] - t[0]) * (n[1] - i[1])) / r,
			a = ((i[1] - e[1]) * (n[0] - i[0]) + (e[0] - i[0]) * (n[1] - i[1])) / r;
		return 0 <= s && 0 <= a && s + a <= 1
	}
	var BoundingSphere = BoundingVolume.extend({
			init: function(e, t) {
				this._super(e), this.radius = 0, t && (this.radius = t)
			},
			type: function() {
				return "BoundingSphere"
			},
			isPoint: function() {
				return 0 == this.radius
			},
			containsPoint: function(e) {
				return !!this.center && vec3.distance(e, this.center) <= this.radius
			},
			containsSphere: function(e) {
				return !!this.center && vec3.distance(e.center, this.center) <= this.radius - e.radius
			},
			intersectsSphere: function(e) {
				if (!this.center) return !1;
				var t = vec3.squaredLength(vec3.subtract(BoundingVolumeVectorCache[0], this.center, e.center)),
					i = this.radius + e.radius;
				return t <= i * i
			},
			encapsulatePoint: function(e) {
				if (!this.center) return this.center = vec3.clone(e), void(this.radius = 0);
				if (!this.containsPoint(e)) {
					var t = vec3.subtract(BoundingVolumeVectorCache[0], this.center, e),
						i = vec3.length(t) + this.radius;
					vec3.normalize(t, t), this.radius = i / 2;
					var n = vec3.scale(BoundingVolumeVectorCache[1], t, this.radius);
					vec3.add(this.center, e, n)
				}
			},
			encapsulateSphere: function(e) {
				if (e.center) {
					if (!this.center) return this.center = vec3.clone(e.center), void(this.radius = e.radius);
					if (!this.containsSphere(e)) {
						var t = vec3.subtract(BoundingVolumeVectorCache[0], e.center, this.center),
							i = vec3.length(t) + e.radius;
						vec3.normalize(t, t), vec3.scale(t, t, i);
						var n = vec3.add(BoundingVolumeVectorCache[2], this.center, t);
						this.encapsulatePoint(n)
					}
				}
			},
			transform: function(e, t) {
				if (t || (t = new BoundingSphere), !this.center) return t;
				var i = mat4.getScale(BoundingVolumeVectorCache[0], e),
					n = vec3.transformMat4(BoundingVolumeVectorCache[1], this.center, e);
				return t.center || (t.center = vec3.create()), vec3.copy(t.center, n), t.radius = this.radius * Math.max(i[0], i[1], i[2]), t
			},
			toString: function() {
				return "BoundingSphere[center=(" + this.center[0] + ", " + this.center[1] + ", " + this.center[2] + ") radius=" + this.radius + "]"
			}
		}),
		Plane = FrakClass.extend({
			init: function() {
				this.normal = vec3.create(), this.distance = 0
			},
			setByPoints: function(e, t, i) {
				return this.normal = vec3.cross(vec3.create(), vec3.subtract(vec3.create(), t, e), vec3.subtract(vec3.create(), i, e)), vec3.normalize(this.normal, this.normal), this.distance = -vec3.dot(this.normal, t), this
			},
			setByNormalAndPoint: function(e, t) {
				return this.normal = vec3.clone(e), vec3.normalize(this.normal, this.normal), this.distance = -vec3.dot(this.normal, t), this
			},
			getDistanceToPoint: function(e) {
				return vec3.dot(this.normal, e) + this.distance
			},
			getDistanceOnLine: function(e, t) {
				var i = vec3.scale(vec3.create(), this.normal, -this.distance),
					n = vec3.dot(t, this.normal);
				return Math.abs(n) < EPSILON ? 1 / 0 : vec3.dot(vec3.sub(i, i, e), this.normal) / n
			},
			getLineIntersection: function(e, t, i) {
				i || (i = vec3.create());
				var n = this.getDistanceOnLine(e, t);
				return vec3.scaleAndAdd(i, e, t, n), i
			},
			projectToPlane: function(e, t) {
				return t || (t = vec3.create()), vec3.scale(t, this.normal, this.getDistanceToPoint(e)), vec3.sub(t, e, t), t
			},
			pointInFront: function(e) {
				return 0 < vec3.dot(this.normal, e) + this.distance
			},
			pointInBack: function(e) {
				return vec3.dot(this.normal, e) + this.distance < 0
			},
			pointOnPlane: function(e) {
				return Math.abs(vec3.dot(this.normal, e) + this.distance) < EPSILON
			},
			sameSide: function(e, t) {
				return !((
					vec3.dot(this.normal, e) + this.distance) * (vec3.dot(this.normal, t) + this.distance) < 0)
			},
			toString: function() {
				return "Plane[" + this.normal[0] + ", " + this.normal[1] + ", " + this.normal[2] + ", " + this.distance + "]"
			}
		}),
		AABBPlaneCache = new Plane,
		Ray = FrakClass.extend({
			init: function(e, t) {
				this.infinite = !1, this.origin = vec3.create(), this.destination = vec3.create(), e && vec3.copy(this.origin, e), t && vec3.copy(this.destination, t)
			},
			clone: function() {
				var e = new Ray(this.origin, this.destination);
				return e.infinite = this.infinite, e
			},
			getLength: function() {
				return vec3.distance(this.origin, this.destination)
			},
			getDirection: function(e) {
				return e || (e = vec3.create()), this.getVector(e), vec3.normalize(e, e), e
			},
			getVector: function(e) {
				return e || (e = vec3.create()), vec3.subtract(e, this.destination, this.origin), e
			},
			transform: function(e) {
				vec3.transformMat4(this.origin, this.origin, e), vec3.transformMat4(this.destination, this.destination, e)
			},
			transformWithLength: function(e, t) {
				var i = mat4.clone(e);
				i[12] = 0, i[13] = 0, i[14] = 0;
				var n = this.getDirection();
				vec3.transformMat4(this.origin, this.origin, e), vec3.transformMat4(n, n, i), vec3.scale(n, n, t), vec3.add(this.destination, this.origin, n)
			},
			getPointOnRay: function(e) {
				var t = vec3.create(),
					i = this.getVector();
				return vec3.add(t, this.origin, vec3.scale(i, i, e)), t
			},
			getClosestPointOnRay: function(e) {
				var t = this.getDirection(),
					i = vec3.dot(t, vec3.subtract(vec3.create(), e, this.origin));
				return vec3.add(vec3.create(), this.origin, vec3.scale(t, t, i))
			},
			distanceOfPoint: function(e) {
				return vec3.dot(this.getDirection(), vec3.subtract(vec3.create(), e, this.origin)) <= 0 ? vec3.distance(e, this.origin) : vec3.distance(vec3.cross(vec3.create(), this.getDirection(), vec3.subtract(vec3.create(), e, this.origin)))
			},
			intersectBoundingVolume: function(e, t) {
				return !!(e instanceof BoundingVolume && e.center) && (e instanceof BoundingSphere ? this.intersectSphere(e.center, e.radius, t) : e instanceof BoundingBox && this.intersectAABB(e.min, e.max, t))
			},
			intersectPlane: function(e, t) {
				if (e.sameSide(this.origin, this.destination)) return !1;
				var i = this.getDirection(),
					n = -e.getDistanceToPoint(this.origin) / vec3.dot(i, e.normal);
				return t && t.add(vec3.add(vec3.create(), this.origin, vec3.scale(i, i, n))), !0
			},
			intersectTriangle: function(e, t, i, n) {
				var r = vec3.subtract(RayTestLocalCache[0], i, e),
					s = vec3.subtract(RayTestLocalCache[1], t, e),
					a = vec3.cross(RayTestLocalCache[2], s, r);
				vec3.normalize(a, a);
				var o = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.origin, e), a),
					h = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.destination, e), a);
				if (0 <= o * h) return !1;
				var u = this.getVector();
				u = vec3.add(u, this.origin, vec3.scale(u, u, -o / (h - o)));
				var c = vec3.subtract(RayTestLocalCache[2], u, e),
					l = vec3.dot(r, r),
					d = vec3.dot(r, s),
					f = vec3.dot(r, c),
					m = vec3.dot(s, s),
					p = vec3.dot(s, c),
					g = 1 / (l * m - d * d),
					v = (m * f - d * p) * g,
					b = (l * p - d * f) * g;
				return 0 <= v && 0 <= b && v + b <= 1 && (n && n.add(u), !0)
			},
			intersectTriangleDistanceOnly: function(e, t, i) {
				var n = vec3.subtract(RayTestLocalCache[0], i, e),
					r = vec3.subtract(RayTestLocalCache[1], t, e),
					s = vec3.cross(RayTestLocalCache[2], r, n);
				vec3.normalize(s, s);
				var a = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.origin, e), s),
					o = vec3.dot(vec3.subtract(RayTestLocalCache[3], this.destination, e), s);
				if (0 <= a * o) return !1;
				var h = this.getVector(),
					u = -a / (o - a);
				h = vec3.add(h, this.origin, vec3.scale(h, h, u));
				var c = vec3.subtract(RayTestLocalCache[2], h, e),
					l = vec3.dot(n, n),
					d = vec3.dot(n, r),
					f = vec3.dot(n, c),
					m = vec3.dot(r, r),
					p = vec3.dot(r, c),
					g = 1 / (l * m - d * d),
					v = (m * f - d * p) * g,
					b = (l * p - d * f) * g;
				return 0 <= v && 0 <= b && v + b <= 1 && u
			},
			intersectSphere: function(e, t, i) {
				var n = vec3.sub(RayTestLocalCache[0], this.origin, e),
					r = this.getDirection(),
					s = vec3.dot(r, n),
					a = s * s - vec3.dot(n, n) + t * t;
				return Math.abs(a) < EPSILON ? (i && i.add(vec3.add(vec3.create(), this.origin, vec3.scale(r, r, -s))), !0) : 0 < a && (i && (i.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[0], r, -s - Math.sqrt(a)))), i.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[0], r, -s + Math.sqrt(a))))), !0)
			},
			intersectAABB: function(e, t, i) {
				var n = this.getDirection(RayTestLocalCache[0]),
					r = RayTestLocalCache[1],
					s = RayTestLocalCache[2];
				n[0] = 1 / n[0], n[1] = 1 / n[1], n[2] = 1 / n[2], r[0] = (e[0] - this.origin[0]) * n[0], s[0] = (t[0] - this.origin[0]) * n[0], r[1] = (e[1] - this.origin[1]) * n[1], s[1] = (t[1] - this.origin[1]) * n[1], r[2] = (e[2] - this.origin[2]) * n[2], s[2] = (t[2] - this.origin[2]) * n[2];
				var a = Math.max(Math.min(r[0], s[0]), Math.min(r[1], s[1]), Math.min(r[2], s[2])),
					o = Math.min(Math.max(r[0], s[0]), Math.max(r[1], s[1]), Math.max(r[2], s[2]));
				return !(o < 0 || o < a) && (this.infinite ? (i && (this.getDirection(n), i.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], n, a))), i.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], n, o)))), !0) : !(a * a > vec3.sqrDist(this.origin, this.destination) && (this.origin[0] < e[0] || this.origin[1] < e[1] || this.origin[2] < e[2] || this.origin[0] > t[0] || this.origin[1] > t[1] || this.origin[2] > t[2]) && (this.destination[0] < e[0] || this.destination[1] < e[1] || this.destination[2] < e[2] || this.destination[0] > t[0] || this.destination[1] > t[1] || this.destination[2] > t[2])) && (i && (this.getDirection(n), i.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], n, a))), i.add(vec3.add(vec3.create(), this.origin, vec3.scale(RayTestLocalCache[1], n, o)))), !0))
			},
			toString: function() {
				return "Ray(" + vec3.str(this.origin) + ", " + vec3.str(this.destination) + ", infinite = " + this.infinite + ")"
			}
		}),
		RayTestResult = FrakClass.extend({
			init: function(e) {
				this.ray = e.clone(), this.hits = [], this.addCallback = !1
			},
			add: function(e) {
				var t = {
					point: e,
					collider: !1,
					submesh: !1,
					node: !1
				};
				FRAK.isFunction(this.addCallback) && this.addCallback(t), this.hits.push(t)
			},
			empty: function() {
				return 0 == this.hits.length
			},
			sort: function() {
				var i = this;
				this.hits.sort(function(e, t) {
					return vec3.sqrDist(i.ray.origin, e.point) - vec3.sqrDist(i.ray.origin, t.point)
				})
			},
			nearest: function() {
				if (this.empty()) return !1;
				for (var e = 1 / 0, t = 0, i = 0; i < this.hits.length; i++) {
					var n = vec3.sqrDist(this.ray.origin, this.hits[i].point);
					n < e && (e = n, t = i)
				}
				return this.hits[t]
			}
		}),
		RayTestLocalCache = [vec3.create(), vec3.create(), vec3.create(), vec3.create()],
		Submesh = FrakClass.extend({
			init: function() {
				this.materialIndex = -1, this.faces = [], this.positions = [], this.texCoords1D = [], this.texCoords2D = [], this.texCoords3D = [], this.texCoords4D = [], this.tangents = !1, this.normals = !1, this.bitangents = !1, this.barycentric = !1, this.boundingBox = new BoundingBox, this.boundingSphere = new BoundingSphere
			},
			calculateTangents: function() {
				for (var e = new Float32Array(this.positions.length), t = new Float32Array(this.positions.length), i = this.texCoords2D[0], n = vec3.create(), r = vec3.create(), s = vec3.create(), a = vec2.create(), o = vec2.create(), h = vec2.create(), u = vec3.create(), c = vec3.create(), l = 0; l < this.faces.length; l += 3) {
					var d = this.faces[l],
						f = this.faces[l + 1],
						m = this.faces[l + 2];
					vec3.set(n, this.positions[3 * d], this.positions[3 * d + 1], this.positions[3 * d + 2]), vec3.set(r, this.positions[3 * f], this.positions[3 * f + 1], this.positions[3 * f + 2]), vec3.set(s, this.positions[3 * m], this.positions[3 * m + 1], this.positions[3 * m + 2]), vec2.set(a, i[2 * d], i[2 * d + 1]), vec2.set(o, i[2 * f], i[2 * f + 1]), vec2.set(h, i[2 * m], i[2 * m + 1]);
					var p = r[0] - n[0],
						g = s[0] - n[0],
						v = r[1] - n[1],
						b = s[1] - n[1],
						x = r[2] - n[2],
						T = s[2] - n[2],
						E = o[0] - a[0],
						w = h[0] - a[0],
						S = o[1] - a[1],
						R = h[1] - a[1],
						y = 1 / (E * R - w * S);
					vec3.set(u, (R * p - S * g) * y, (R * v - S * b) * y, (R * x - S * T) * y), vec3.set(c, (E * g - w * p) * y, (E * b - w * v) * y, (E * T - w * x) * y), e[3 * d + 0] += u[0], e[3 * d + 1] += u[1], e[3 * d + 2] += u[2], e[3 * f + 0] += u[0], e[3 * f + 1] += u[1], e[3 * f + 2] += u[2], e[3 * m + 0] += u[0], e[3 * m + 1] += u[1], e[3 * m + 2] += u[2], t[3 * d + 0] += c[0], t[3 * d + 1] += c[1], t[3 * d + 2] += c[2], t[3 * f + 0] += c[0], t[3 * f + 1] += c[1], t[3 * f + 2] += c[2], t[3 * m + 0] += c[0], t[3 * m + 1] += c[1], t[3 * m + 2] += c[2]
				}
				this.tangents = new Float32Array(this.positions.length), this.bitangents = new Float32Array(this.positions.length);
				var C = vec3.create(),
					_ = vec3.create(),
					M = vec3.create(),
					D = vec3.create();
				for (l = 0; l < this.normals.length; l += 3) {
					vec3.set(C, this.normals[l], this.normals[l + 1], this.normals[l + 2]), vec3.set(_, e[l], e[l + 1], e[l + 2]), vec3.scale(M, C, vec3.dot(C, _)), vec3.sub(M, _, M), vec3.normalize(M, M), this.tangents[l] = M[0], this.tangents[l + 1] = M[1], this.tangents[l + 2] = M[2], vec3.set(M, t[l], t[l + 1], t[l + 2]), vec3.cross(D, C, _);
					var F = vec3.dot(D, M) < 0 ? -1 : 1;
					vec3.set(_, this.tangents[l], this.tangents[l + 1], this.tangents[l + 2]), vec3.cross(M, C, _), vec3.scale(M, M, F), vec3.normalize(M, M), this.bitangents[l] = M[0], this.bitangents[l + 1] = M[1], this.bitangents[l + 2] = M[2]
				}
				delete e, delete t
			},
			calculateBarycentric: function() {
				this.barycentric = new Float32Array(this.positions.length);
				for (var e = 0; e < this.faces.length; e += 3) {
					var t = this.faces[e],
						i = this.faces[e + 1],
						n = this.faces[e + 2];
					this.barycentric[3 * t + 0] = 1, this.barycentric[3 * t + 1] = 0, this.barycentric[3 * t + 2] = 0, this.barycentric[3 * i + 0] = 0, this.barycentric[3 * i + 1] = 1, this.barycentric[3 * i + 2] = 0, this.barycentric[3 * n + 0] = 0, this.barycentric[3 * n + 1] = 0, this.barycentric[3 * n + 2] = 1
				}
			},
			recalculateBounds: function() {
				this.boundingBox = new BoundingBox, this.boundingSphere = new BoundingSphere;
				for (var e = 0, t = this.positions.length; e < t; e += 3) this.boundingBox.encapsulatePoint(vec3.fromValues(this.positions[e + 0], this.positions[e + 1], this.positions[e + 2])), this.boundingSphere.encapsulatePoint(vec3.fromValues(this.positions[e + 0], this.positions[e + 1], this.positions[e + 2]))
			},
			generateEdges: function() {
				var i = this;

				function e(e, t) {
					i.edges[i.faces[e]] || (i.edges[e] = {}), i.edges[i.faces[e]][i.faces[t]] = !0
				}
				this.edges = {};
				for (var t = 0, n = this.faces.length; t < n; t += 3) e(t, t + 1), e(t + 1, t), e(t + 1, t + 2), e(t + 2, t + 1), e(t + 2, t), e(t, t + 2)
			}
		}),
		Mesh = FrakClass.extend({
			init: function() {
				this.submeshes = [], this.materials = [], this.boundingBox = new BoundingBox, this.boundingSphere = new BoundingSphere
			},
			addSubmesh: function(e, t) {
				this.boundingBox.encapsulateBox(e.boundingBox), this.boundingSphere.encapsulateSphere(e.boundingSphere), this.submeshes.push(e), t && (this.materials.push(t), e.materialIndex = this.materials.length - 1)
			},
			getMaterial: function(e) {
				return 0 <= e && e < this.materials.length && this.materials[e]
			},
			setMaterial: function(e, t) {
				if (e < 0 || e >= this.materials.length) throw "Material.setMaterial: index out of bounds.";
				this.materials[e] = t
			},
			addMaterial: function(e) {
				return this.materials.push(e), this.materials.length - 1
			},
			getPolycount: function() {
				var e = 0;
				for (var t in this.submeshes) e += this.submeshes[t].faces.length / 3;
				return e
			},
			empty: function() {
				return 0 === this.submeshes.length
			}
		}),
		Primitives = {
			plane: function(e, t, i) {
				var n = new Mesh,
					r = new Submesh;
				r.positions = [-.5 * e, -.5 * t, 0, -.5 * e, .5 * t, 0, .5 * e, .5 * t, 0, .5 * e, -.5 * t, 0], r.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], r.texCoords2D = [
					[0, 0, 0, 1, 1, 1, 1, 0]
				], r.faces = [0, 1, 2, 0, 2, 3], r.recalculateBounds(), n.addSubmesh(r, i);
				var s = new Node("Plane");
				return s.addComponent(new MeshComponent(n)), s.addComponent(new MeshRendererComponent), s
			},
			box: function(e, t, i) {
				var n = new Mesh,
					s = new Submesh;
				s.positions = [], s.normals = [], s.texCoords2D = [
					[]
				];
				var a = vec3.create(),
					o = vec3.create(),
					h = vec3.create();

				function r(e, t, i, n) {
					vec3.sub(o, t, e), vec3.sub(h, n, e), vec3.cross(a, o, h), vec3.negate(a, a), vec3.normalize(a, a);
					var r = s.positions.length / 3;
					s.positions.push(e[0], e[1], e[2]), s.normals.push(a[0], a[1], a[2]), s.texCoords2D[0].push(0, 1), s.positions.push(t[0], t[1], t[2]), s.normals.push(a[0], a[1], a[2]), s.texCoords2D[0].push(1, 1), s.positions.push(i[0], i[1], i[2]), s.normals.push(a[0], a[1], a[2]), s.texCoords2D[0].push(1, 0), s.positions.push(n[0], n[1], n[2]), s.normals.push(a[0], a[1], a[2]), s.texCoords2D[0].push(0, 0), s.faces.push(r + 0, r + 3, r + 2), s.faces.push(r + 2, r + 1, r + 0)
				}
				var u = [vec3.fromValues(e[0] - t[0], e[1] - t[1], e[2] - t[2]), vec3.fromValues(e[0] + t[0], e[1] - t[1], e[2] - t[2]), vec3.fromValues(e[0] + t[0], e[1] + t[1], e[2] - t[2]), vec3.fromValues(e[0] - t[0], e[1] + t[1], e[2] - t[2]), vec3.fromValues(e[0] - t[0], e[1] - t[1], e[2] + t[2]), vec3.fromValues(e[0] + t[0], e[1] - t[1], e[2] + t[2]), vec3.fromValues(e[0] + t[0], e[1] + t[1], e[2] + t[2]), vec3.fromValues(e[0] - t[0], e[1] + t[1], e[2] + t[2])];
				r(u[0], u[1], u[2], u[3]), r(u[5], u[4], u[7], u[6]), r(u[4], u[0], u[3], u[7]), r(u[1], u[5], u[6], u[2]), r(u[4], u[5], u[1], u[0]), r(u[3], u[2], u[6], u[7]), s.calculateTangents(), s.recalculateBounds(), n.addSubmesh(s, i);
				var c = new Node("Box");
				return c.addComponent(new MeshComponent(n)), c.addComponent(new MeshRendererComponent), c
			},
			sphere: function(e, t, i, n) {
				if (e <= 0) throw "Primitives.sphere: invalid sphere radius";
				if (t < 2 || i < 2) throw "Primitives.sphere: invalid sphere slices/stacks parameters (slices<2 or stacks<2)";
				var r = 360 / t,
					s = 180 / i,
					a = 360 / r * (180 / s) * 4,
					o = new Mesh,
					h = new Submesh;
				h.positions = new Float32Array(3 * a), h.normals = new Float32Array(3 * a), h.texCoords2D = [new Float32Array(2 * a)];
				for (var u = Math.PI / 180, c = 0, l = vec3.create(), d = vec3.create(), f = vec3.create(), m = vec3.create(), p = 0; p < 180; p += s)
					for (var g = 0; g < 360; g += r) h.faces.push(c + 0, c + 1, c + 2), h.faces.push(c + 2, c + 3, c + 0), l[0] = e * Math.sin((p + s) *
						u) * Math.cos(u * (g + r)), l[1] = e * Math.cos((p + s) * u), l[2] = e * Math.sin((p + s) * u) * Math.sin(u * (g + r)), d[0] = e * Math.sin((p + s) * u) * Math.cos(g * u), d[1] = e * Math.cos((p + s) * u), d[2] = e * Math.sin((p + s) * u) * Math.sin(g * u), f[0] = e * Math.sin(p * u) * Math.cos(u * g), f[1] = e * Math.cos(p * u), f[2] = e * Math.sin(p * u) * Math.sin(u * g), m[0] = e * Math.sin(p * u) * Math.cos(u * (g + r)), m[1] = e * Math.cos(p * u), m[2] = e * Math.sin(p * u) * Math.sin(u * (g + r)), h.positions[3 * (c + 0) + 0] = l[0], h.positions[3 * (c + 0) + 1] = l[1], h.positions[3 * (c + 0) + 2] = l[2], h.positions[3 * (c + 1) + 0] = d[0], h.positions[3 * (c + 1) + 1] = d[1], h.positions[3 * (c + 1) + 2] = d[2], h.positions[3 * (c + 2) + 0] = f[0], h.positions[3 * (c + 2) + 1] = f[1], h.positions[3 * (c + 2) + 2] = f[2], h.positions[3 * (c + 3) + 0] = m[0], h.positions[3 * (c + 3) + 1] = m[1], h.positions[3 * (c + 3) + 2] = m[2], vec3.normalize(l, l), vec3.normalize(d, d), vec3.normalize(f, f), vec3.normalize(m, m), h.normals[3 * (c + 0) + 0] = l[0], h.normals[3 * (c + 0) + 1] = l[1], h.normals[3 * (c + 0) + 2] = l[2], h.normals[3 * (c + 1) + 0] = d[0], h.normals[3 * (c + 1) + 1] = d[1], h.normals[3 * (c + 1) + 2] = d[2], h.normals[3 * (c + 2) + 0] = f[0], h.normals[3 * (c + 2) + 1] = f[1], h.normals[3 * (c + 2) + 2] = f[2], h.normals[3 * (c + 3) + 0] = m[0], h.normals[3 * (c + 3) + 1] = m[1], h.normals[3 * (c + 3) + 2] = m[2], h.texCoords2D[0][2 * (c + 0) + 0] = u * (g + r) / (2 * Math.PI), h.texCoords2D[0][2 * (c + 0) + 1] = (p + s) * u / Math.PI, h.texCoords2D[0][2 * (c + 1) + 0] = g * u / (2 * Math.PI), h.texCoords2D[0][2 * (c + 1) + 1] = (p + s) * u / Math.PI, h.texCoords2D[0][2 * (c + 2) + 0] = u * g / (2 * Math.PI), h.texCoords2D[0][2 * (c + 2) + 1] = p * u / Math.PI, h.texCoords2D[0][2 * (c + 3) + 0] = u * (g + r) / (2 * Math.PI), h.texCoords2D[0][2 * (c + 3) + 1] = p * u / Math.PI, c += 4;
				h.calculateTangents(), h.recalculateBounds(), o.addSubmesh(h, n);
				var v = new Node("Sphere");
				return v.addComponent(new MeshComponent(o)), v.addComponent(new MeshRendererComponent), v
			},
			cone: function(e, t, i, n) {
				if (e <= 0) throw "Primitives.cone: invalid cone radius";
				if (0 == t) throw "Primitives.cone: cannot create a cone with zero height";
				if (i < 2) throw "Primitives.cone: invalid slices (slices<2)";
				var r = 360 / i,
					s = vec3.fromValues(0, t / 2, 0),
					a = vec3.fromValues(0, -t / 2, 0),
					o = 360 / r * 6,
					h = new Mesh,
					u = new Submesh;
				u.positions = new Float32Array(3 * o), u.normals = new Float32Array(3 * o), u.texCoords2D = [new Float32Array(2 * o)];
				for (var c = Math.PI / 180, l = vec3.fromValues(a[0], .5 * t - (e * e + t * t) / t, a[2]), d = 0, f = vec3.create(), m = 0; m < 360; m += r) {
					u.faces.push(d + 0, d + 1, d + 2), vec3.set(f, 0, -1, 0), u.positions[3 * d + 0] = e * Math.sin(m * c), u.positions[3 * d + 1] = a[1], u.positions[3 * d + 2] = e * Math.cos(m * c), u.normals[3 * d + 0] = f[0], u.normals[3 * d + 1] = f[1], u.normals[3 * d + 2] = f[2], u.texCoords2D[0][2 * d + 0] = m / 360, u.texCoords2D[0][2 * d + 1] = 1, d++, u.positions[3 * d + 0] = e * Math.sin((m + r) * c), u.positions[3 * d + 1] = a[1], u.positions[3 * d + 2] = e * Math.cos((m + r) * c), u.normals[3 * d + 0] = f[0], u.normals[3 * d + 1] = f[1], u.normals[3 * d + 2] = f[2], u.texCoords2D[0][2 * d + 0] = (m + r) / 360, u.texCoords2D[0][2 * d + 1] = 1, d++, u.positions[3 * d + 0] = a[0], u.positions[3 * d + 1] = a[1], u.positions[3 * d + 2] = a[2], u.normals[3 * d + 0] = f[0], u.normals[3 * d + 1] = f[1], u.normals[3 * d + 2] = f[2], u.texCoords2D[0][2 * d + 0] = m / 360, u.texCoords2D[0][2 * d + 1] = 0, d++, u.faces.push(d + 0, d + 1, d + 2);
					var p = vec3.fromValues(e * Math.sin(m * c), a[1], e * Math.cos(m * c)),
						g = vec3.fromValues(e * Math.sin((m + r) * c), a[1], e * Math.cos((m + r) * c)),
						v = vec3.fromValues(s[0], s[1], s[2]);
					vec3.sub(f, p, l), vec3.normalize(f, f), u.positions[3 * (d + 0) + 0] = p[0], u.positions[3 * (d + 0) + 1] = p[1], u.positions[3 * (d + 0) + 2] = p[2], u.normals[3 * (d + 0) + 0] = f[0], u.normals[3 * (d + 0) + 1] = f[1], u.normals[3 * (d + 0) + 2] = f[2], u.texCoords2D[0][2 * (d + 0) + 0] = m / 360, u.texCoords2D[0][2 * (d + 0) + 1] = 1, vec3.sub(f, g, l), vec3.normalize(f, f), u.positions[3 * (d + 1) + 0] = g[0], u.positions[3 * (d + 1) + 1] = g[1], u.positions[3 * (d + 1) + 2] = g[2], u.normals[3 * (d + 1) + 0] = f[0], u.normals[3 * (d + 1) + 1] = f[1], u.normals[3 * (d + 1) + 2] = f[2], u.texCoords2D[0][2 * (d + 1) + 0] = (m + r) / 360, u.texCoords2D[0][2 * (d + 1) + 1] = 1, vec3.set(f, 0, 1, 0), u.positions[3 * (d + 2) + 0] = v[0], u.positions[3 * (d + 2) + 1] = v[1], u.positions[3 * (d + 2) + 2] = v[2], u.normals[3 * (d + 2) + 0] = f[0], u.normals[3 * (d + 2) + 1] = f[1], u.normals[3 * (d + 2) + 2] = f[2], u.texCoords2D[0][2 * (d + 2) + 0] = m / 360, u.texCoords2D[0][2 * (d + 2) + 1] = 0, d += 3
				}
				u.calculateTangents(), u.recalculateBounds(), h.addSubmesh(u, n);
				var b = new Node("Cone");
				return b.addComponent(new MeshComponent(h)), b.addComponent(new MeshRendererComponent), b
			},
			text: function(e, t) {
				var i = new Node("Text");
				return i.addComponent(new TextComponent(e, t)), i.addComponent(new TextRendererComponent), i
			},
			canvasBoard: function(e, t) {
				var i = new Node("Text");
				return i.addComponent(new CanvasBoardComponent(e, t)), i.addComponent(new CanvasBoardRendererComponent), i
			}
		},
		CollisionOctreeNode = FrakClass.extend({
			init: function(e, t, i) {
				this.parent = !1, this.depth = 0, this.subnodes = !1, this.bounds = !1, i ? (this.parent = i, this.root = i.root, this.depth = i.depth + 1) : (this.maxDepth = 3, (this.root = this).nodes = {}, this.submeshes = {}, this.cache = [vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create()]), this.faces = !1, this.setSize(e, t)
			},
			clone: function(e) {
				var t = new CollisionOctreeNode(this.bounds.center, this.bounds.size[0], e || !1);
				if (t.depth = this.depth, this.nodes)
					for (var i in t.nodes = {}, this.nodes) t.nodes[i] = this.nodes[i];
				if (this.submeshes)
					for (var n in t.submeshes = {}, this.submeshes) t.submeshes[n] = this.submeshes[n];
				if (t.faces = this.faces, this.subnodes) {
					t.subnodes = [];
					for (var r = 0; r < this.subnodes.length; r++) t.subnodes.push(this.subnodes[r].clone(t))
				}
				return t
			},
			getNodeID: function() {
				var e = "/",
					t = "root";
				if (this.parent)
					for (var i in e = this.parent.getNodeID(), this.parent.subnodes)
						if (this.parent.subnodes[i] === this) {
							t = i;
							break
						} return "{0}{1}/".format(e, t)
			},
			setSize: function(e, t) {
				this.bounds = new BoundingBox(e, [t, t, t])
			},
			isLeaf: function() {
				return !1 === this.subnodes
			},
			hasGeometry: function() {
				return !1 !== this.faces
			},
			subdivide: function() {
				this.subnodes = [];
				var e = .5 * this.bounds.size[0],
					t = .5 * e,
					i = vec3.create();
				this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [t, t, t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [-t, t, t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [t, -t, t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [-t, -t, t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [t, t, -t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [-t, t, -t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [t, -t, -t]), e, this)), this.subnodes.push(new CollisionOctreeNode(vec3.add(i, this.bounds.center, [-t, -t, -t]), e, this))
			},
			optimize: function() {
				if (!this.isLeaf()) {
					for (var e in this.subnodes) this.subnodes[e].optimize();
					var t = 0;
					for (e = 0; e < this.subnodes.length; e++) !this.subnodes[e].hasGeometry() && this.subnodes[e].isLeaf() && t++;
					8 == t && (delete this.subnodes, this.subnodes = !1)
				}
			},
			rayIntersectBounds: function(e) {
				var t = e.getDirection(this.root.cache[0]),
					i = this.root.cache[1],
					n = this.root.cache[2];
				t[0] = 1 / t[0], t[1] = 1 / t[1], t[2] = 1 / t[2], i[0] = (this.bounds.min[0] - e.origin[0]) * t[0], n[0] = (this.bounds.max[0] - e.origin[0]) * t[0], i[1] = (this.bounds.min[1] - e.origin[1]) * t[1], n[1] = (this.bounds.max[1] - e.origin[1]) * t[1], i[2] = (this.bounds.min[2] - e.origin[2]) * t[2], n[2] = (this.bounds.max[2] - e.origin[2]) * t[2];
				var r = Math.max(Math.min(i[0], n[0]), Math.min(i[1], n[1]), Math.min(i[2], n[2])),
					s = Math.min(Math.max(i[0], n[0]), Math.max(i[1], n[1]), Math.max(i[2], n[2]));
				return !(s < 0 || s < r) && (e.infinite ? r : !(r * r > vec3.sqrDist(e.origin, e.destination) && (e.origin[0] < this.bounds.min[0] || e.origin[1] < this.bounds.min[1] || e.origin[2] < this.bounds.min[2] || e.origin[0] > this.bounds.max[0] || e.origin[1] > this.bounds.max[1] || e.origin[2] > this.bounds.max[2]) && (e.destination[0] < this.bounds.min[0] || e.destination[1] < this.bounds.min[1] || e.destination[2] < this.bounds.min[2] || e.destination[0] > this.bounds.max[0] || e.destination[1] > this.bounds.max[1] || e.destination[2] > this.bounds.max[2])) && r)
			},
			rayIntersectGeometry: function(e) {
				if (!this.hasGeometry()) return !1;
				var t = {
						submesh: !1,
						node: !1,
						t: 1 / 0,
						normal: vec3.create()
					},
					i = this.root.cache[0],
					n = this.root.cache[1],
					r = this.root.cache[2],
					s = mat4.create();
				for (var a in this.faces) {
					var o = e.clone();
					for (var h in mat4.isIdentity(this.root.nodes[a].transform.absolute) || (mat4.invert(s, this.root.nodes[a].transform.absolute), o.transform(s)), this.faces[a])
						for (var u = this.faces[a][h], c = this.root.submeshes[h].positions, l = 0; l < u.length; l += 3) {
							i[0] = c[3 * u[l]], i[1] = c[3 * u[l] + 1], i[2] = c[3 * u[l] + 2], n[0] = c[3 * u[l + 1]], n[1] = c[3 * u[l + 1] + 1], n[2] = c[3 * u[l + 1] + 2], r[0] = c[3 * u[l + 2]], r[1] = c[3 * u[l + 2] + 1], r[2] = c[3 * u[l + 2] + 2];
							var d = o.
							intersectTriangleDistanceOnly(i, n, r);
							!1 !== d && d < t.t && (t.t = d, t.submesh = this.root.submeshes[h], t.node = this.root.nodes[a], vec3.cross(t.normal, vec3.subtract(this.root.cache[3], n, i), vec3.subtract(this.root.cache[4], r, i)), vec3.normalize(t.normal, t.normal))
						}
				}
				return t
			},
			getNodesWithGeometry: function(e, t) {
				var i = this.rayIntersectBounds(e);
				if (!1 !== i) {
					if (this.hasGeometry()) {
						for (var n = 0; n < t.length && !(t[n].t > i); n++);
						t.splice(n, 0, {
							t: i,
							octreeNode: this
						})
					}
					if (!this.isLeaf())
						for (n = 0; n < this.subnodes.length; n++) this.subnodes[n].getNodesWithGeometry(e, t)
				}
			},
			getNearestRayCollision: function(e, t) {
				var i = [];
				this.getNodesWithGeometry(e, i);
				for (var n = {
						t: 1 / 0,
						octreeNode: !1,
						submesh: !1,
						node: !1,
						normal: !1
					}, r = 0; r < i.length; r++)
					if (!(!1 !== n.octreeNode && i[r].depth == n.octreeNode.depth && i[r].t > n.t)) {
						var s = i[r].octreeNode.rayIntersectGeometry(t);
						s.t < n.t && (n.t = s.t, n.submesh = s.submesh, n.octreeNode = i[r].octreeNode, n.node = s.node, n.normal = s.normal)
					} return n
			}
		}),
		Component = Serializable.extend({
			init: function() {
				this._super(), this.updatePasses = 1, this.started = !1, this.node = !1, this.enable()
			},
			excluded: function() {
				return ["started", "node"]
			},
			getScene: function() {
				return this.node.scene
			},
			enable: function() {
				this.enabled || this.onEnable(), this.enabled = !0
			},
			disable: function() {
				this.enabled && this.onDisable(), this.enabled = !1
			},
			instantiate: function() {
				return this.clone()
			},
			onAdd: function(e) {},
			onRemove: function(e) {},
			onAddScene: function(e) {},
			onRemoveScene: function(e) {},
			onEnable: function() {},
			onDisable: function() {},
			onStart: function(e, t) {},
			start: function(e, t) {
				this.onStart(e, t)
			},
			onLoad: function(e, t) {},
			onEnd: function(e, t) {},
			onPreRender: function(e, t) {},
			onPostRender: function(e, t) {},
			onUpdateTransform: function(e) {},
			onUpdate: function(e, t) {}
		}),
		Transform = Component.extend({
			init: function(e) {
				this._super(), this.relative = e || mat4.identity(mat4.create()), this.absolute = mat4.copy(mat4.create(), this.relative)
			},
			onAdd: function(e) {
				e.transform = this
			},
			type: function() {
				return "Transform"
			},
			excluded: function() {
				return this._super().concat(["absolute"])
			},
			calculateRelativeFromAbsolute: function(e) {
				if (e) {
					var t = mat4.invert(mat4.create(), e);
					mat4.multiply(this.relative, this.absolute, t)
				} else mat4.copy(this.relative, this.absolute)
			},
			getPosition: function(e) {
				return e || (e = vec3.create()), mat4.translation(e, this.absolute)
			},
			getRelativePosition: function(e) {
				return e || (e = vec3.create()), mat4.translation(e, this.relative)
			},
			setPosition: function(e) {
				mat4.fromRotationTranslation(this.relative, quat.fromMat4(quat.create(), this.relative), e)
			},
			getRotation: function(e) {
				return e || (e = quat.create()), quat.fromMat4(e, this.absolute)
			},
			translate: function(e) {
				this.relative = mat4.translate(this.relative, this.relative, e)
			},
			rotate: function(e, t) {
				this.relative = mat4.rotate(this.relative, this.relative, e, t)
			},
			scale: function(e) {
				this.relative = mat4.scale(this.relative, this.relative, e)
			},
			clone: function() {
				var e = new Transform;
				return e.relative = mat4.clone(this.relative), e.absolute = mat4.clone(this.absolute), e
			}
		}),
		CameraComponent = Component.extend({
			init: function(e, t) {
				if (!e || !t) throw "CameraComponent can be initialized only with given viewMatrix and projectionMatrix. Normally one should create OrthoCamera or PerspectiveCamera instead";
				this._super(), this.camera = new Camera(e, t, new ForwardRenderStage)
			},
			excluded: function() {
				return this._super().concat(["camera"])
			},
			type: function() {
				return "CameraComponent"
			},
			onAddScene: function(e) {
				e.scene.cameras.push(this.camera), e.scene.cameras.sort(function(e, t) {
					return e.order - t.order
				}), this.useCameraViewMatrix()
			},
			onRemoveScene: function(e) {
				for (var t = e.scene.cameras, i = 0; i < t.length; i++) t[i] == this.camera && (t.splice(i, 1), i--)
			},
			onStart: function(e, t) {
				this.initRenderStage(e, t)
			},
			onUpdateTransform: function(e) {
				this.node.transform && mat4.invert(this.camera.viewMatrix, this.node.transform.absolute)
			},
			lookAt: function(e, t) {
				t || (t = [0, 1, 0]), mat4.lookAt(this.camera.viewMatrix, this.camera.getPosition(), e, t), this.useCameraViewMatrix()
			},
			setPosition: function(e) {
				this.camera.setPosition(e), this.useCameraViewMatrix()
			},
			center: function(e) {
				this.camera.center(e), this.useCameraViewMatrix()
			},
			fitToView: function(e) {
				this.camera.fitToView(e), this.useCameraViewMatrix()
			},
			fitNodeToView: function(e) {
				var i = new
				BoundingBox;
				e.onEachChild(function(e) {
					if (e.getComponent(MeshComponent)) {
						var t = e.getComponent(MeshComponent);
						i.encapsulateBox(t.mesh.boundingBox.transform(e.transform.absolute))
					}
				}), this.fitToView(i)
			},
			screenPointToViewportPoint: function(e) {
				var t = vec2.create(),
					i = vec2.create();
				this.camera.target instanceof TargetScreen && (i = this.camera.target.getPosition());
				var n = this.camera.target.getSize();
				return Math.abs(n[0]) < EPSILON || Math.abs(n[1]) < EPSILON || (t[0] = (e[0] - i[0]) / n[0], t[1] = (e[1] - i[1]) / n[1]), t
			},
			unprojectScreenPoint: function(e) {
				var t = this.node.scene.camera.target.getSize(),
					i = vec2.create(),
					n = vec2.fromValues(e[0] - i[0], t[1] - e[1] + i[1]);
				if (Math.abs(t[0]) < EPSILON || Math.abs(t[1]) < EPSILON) return !1;
				var r = vec4.fromValues(n[0] / t[0] * 2 - 1, n[1] / t[1] * 2 - 1, 2 * e[2] - 1, 1),
					s = mat4.mul(mat4.create(), this.camera.projectionMatrix, this.camera.viewMatrix);
				return !!mat4.invert(s, s) && (vec4.transformMat4(r, r, s), !(Math.abs(r[3]) < EPSILON) && (r[3] = 1 / r[3], vec3.fromValues(r[0] * r[3], r[1] * r[3], r[2] * r[3])))
			},
			screenPointToRay: function(e) {
				var t = this.unprojectScreenPoint([e[0], e[1], 0]),
					i = this.unprojectScreenPoint([e[0], e[1], 1]);
				return !(!t || !i) && new Ray(t, i)
			},
			worldToScreenPoint: function(e, t) {
				t || (t = vec2.create());
				var i = this.camera.target.getSize(),
					n = mat4.mul(mat4.create(), this.camera.projectionMatrix, this.camera.viewMatrix),
					r = vec4.fromValues(e[0], e[1], e[2], 1);
				return vec4.transformMat4(r, r, n), r[0] /= r[3], r[1] /= r[3], r[2] /= r[3], t[0] = Math.round((r[0] + 1) / 2 * i[0]), t[1] = Math.round((1 - r[1]) / 2 * i[1]), t
			},
			useCameraViewMatrix: function() {
				this.node.transform && (this.node.transform.absolute = mat4.invert(mat4.create(), this.camera.viewMatrix), this.node.calculateRelativeFromAbsolute())
			},
			initRenderStage: function(e, t) {
				if (this.camera.target instanceof TargetScreen) {
					var i = e.canvas;
					this.camera.target.setSize(i.width, i.height)
				}
				"forward" == t.options.renderer ? ("blended" != t.options.transparencyMode && "stochastic" != t.options.transparencyMode || this.camera.renderStage.addStage(new OITPostProcess), !0 === t.options.ssao && this.camera.renderStage.addStage(new SSAOPostProcess)) : "deferred" == t.options.renderer && (delete this.camera.renderStage, this.camera.renderStage = new DeferredRenderStage, this.camera.renderStage.addStage(new OITPostProcess)), !0 === t.options.antialias && this.camera.renderStage.addStage(new AntiAliasPostProcess), this.camera.renderStage.start(e, t, this.camera)
			},
			onContextRestored: function(e) {
				this.camera.renderStage = new ForwardRenderStage, this.initRenderStage(e, e.engine)
			}
		}),
		PerspectiveCamera = CameraComponent.extend({
			init: function(e, t, i, n) {
				e || (e = 45), i || (i = .3), n || (n = 1e3), t || (t = 4 / 3), this.fov = e, this.aspect = t, this.near = i, this.far = n;
				var r = mat4.create();
				mat4.lookAt(r, [0, 0, -100], [0, 0, 0], [0, 1, 0]), this._super(r, this.calculatePerspective()), this.camera.near = this.near, this.camera.far = this.far
			},
			type: function() {
				return "PerspectiveCamera"
			},
			onStart: function(e, t) {
				this.aspect || this.setAspectRatio(e.canvas.width / e.canvas.height), this._super(e, t)
			},
			setClipPlanes: function(e, t) {
				this.near = e, this.far = t, this.camera.near = this.near, this.camera.far = this.far, this.camera.projectionMatrix = this.calculatePerspective()
			},
			setAspectRatio: function(e) {
				this.aspect = e, this.camera.projectionMatrix = this.calculatePerspective()
			},
			setVerticalFieldOfView: function(e) {
				this.fov = e, this.camera.projectionMatrix = this.calculatePerspective()
			},
			setHorizontalFieldOfView: function(e) {
				e = e * (2 * Math.PI) / 360;
				var t = Math.tan(e / 2) / this.aspect;
				this.fov = 2 * Math.atan(t) * 180 / Math.PI, this.camera.projectionMatrix = this.calculatePerspective()
			},
			getVerticalFieldOfView: function() {
				return 180 * this.camera.getFieldOfView() / Math.PI
			},
			getHorizontalFieldOfView: function() {
				var e = Math.tan(.5 * this.camera.getFieldOfView()),
					t = this.aspect * e;
				return 180 * (2 * Math.atan(t)) / Math.PI
			},
			calculatePerspective: function() {
				var e = mat4.create(),
					t = this.aspect;
				return t || (t = 1), mat4.perspective(e, this.fov * (2 * Math.PI) / 360, t, this.near, this.far), e
			}
		}),
		OrthoCamera = CameraComponent.extend({
			init: function(e, t, i, n, r, s) {
				e || (e = 0), t || (t = 512), i || (i = 512), n || (n = 0), r || (r = -100), s || (s = 100);
				var a = mat4.ortho(mat4.create(), e, t, i, n, r, s);
				this._super(mat4.identity(mat4.create()), a)
			},
			type: function() {
				return "OrthoCamera"
			}
		}),
		MeshComponent = Component.extend({
			init: function(e) {
				this.mesh = e, this._super()
			},
			type: function() {
				return "MeshComponent"
			},
			instantiate: function() {
				var e = this._super();
				return e.mesh = this.mesh, e
			}
		}),
		RendererComponent = Component.extend({
			init: function() {
				this._super(), this.castShadows = !0, this.receiveShadows = !0, this.lightContribution = 1
			},
			type: function() {
				return "RendererComponent"
			},
			instantiate: function() {
				var e = this._super();
				return e.castShadows = this.castShadows, e.receiveShadows = this.receiveShadows, e.lightContribution = this.lightContribution, e
			},
			onContextRestored: function(e) {}
		}),
		MeshRendererComponent = RendererComponent.extend({
			init: function() {
				this.meshRenderers = [], this._super()
			},
			type: function() {
				return "MeshRendererComponent"
			},
			excluded: function() {
				return this._super().concat(["meshRenderers"])
			},
			createRenderer: function(e, t, i, n) {
				return new SubmeshRenderer(e, t, i, n)
			},
			onStart: function(e, t) {
				this.updateRenderers(e, t)
			},
			addRenderers: function(s, e) {
				var a = this;
				this.node.onEachComponent(function(e) {
					if (e instanceof MeshComponent)
						for (var t = 0; t < e.mesh.submeshes.length; t++) {
							var i = e.mesh.submeshes[t],
								n = e.mesh.getMaterial(i.materialIndex);
							if (n) {
								if (0 != i.positions.length && 0 != i.faces.length) {
									var r = a.createRenderer(s, a.node.transform.absolute, i, n);
									a.getScene().dynamicSpace.addRenderer(r), a.meshRenderers.push(r), a.enabled || (r.visible = !1)
								}
							} else console.warn("Failed to find submesh material: ", e.node.name, e.node)
						}
				})
			},
			removeRenderers: function() {
				for (var e = 0; e < this.meshRenderers.length; e++) this.getScene().dynamicSpace.removeRenderer(this.meshRenderers[e])
			},
			updateRenderers: function(e, t) {
				this.removeRenderers(), this.addRenderers(e, t)
			},
			onEnd: function(e) {
				this.removeRenderers()
			},
			onUpdateTransform: function(e) {
				for (var t = 0, i = this.meshRenderers.length; t < i; t++) this.meshRenderers[t].layer = this.node.layer, this.meshRenderers[t].castShadows = this.castShadows, this.meshRenderers[t].receiveShadows = this.receiveShadows, this.meshRenderers[t].lightContribution = this.lightContribution, this.meshRenderers[t].setMatrix(e)
			},
			onEnable: function() {
				for (var e = 0; e < this.meshRenderers.length; e++) this.meshRenderers[e].visible = !0
			},
			onDisable: function() {
				for (var e = 0; e < this.meshRenderers.length; e++) this.meshRenderers[e].visible = !1
			},
			getBoundingBox: function(e) {
				for (var t = new BoundingBox, i = 0; i < this.meshRenderers.length; i++) e && !this.meshRenderers[i].visible || t.encapsulateBox(this.meshRenderers[i].globalBoundingBox);
				return t
			},
			getBoundingSphere: function(e) {
				for (var t = new BoundingSphere, i = 0; i < this.meshRenderers.length; i++) e && !this.meshRenderers[i].visible || t.encapsulateSphere(this.meshRenderers[i].globalBoundingSphere);
				return t
			},
			setTransparency: function(e) {
				e = !!e;
				for (var t = 0; t < this.meshRenderers.length; t++) this.meshRenderers[t].transparent = e
			},
			getSubmeshRenderer: function(e) {
				for (var t = 0; t < this.meshRenderers.length; t++)
					if (this.meshRenderers[t].submesh === e) return this.meshRenderers[t];
				return !1
			},
			onContextRestored: function(e) {
				this._super(e);
				for (var t = 0; t < this.meshRenderers.length; ++t) this.meshRenderers[t].onContextRestored(e)
			}
		}),
		SkyboxComponent = Component.extend({
			init: function() {
				this._super()
			},
			type: function() {
				return "SkyboxComponent"
			},
			setup: function(e, t, i) {
				this.meshNode = new Node("Skybox");
				var n = [0, 0, 0],
					r = 1;
				t.scene && t.scene.camera && t.scene.camera.far && (r = Math.sqrt(t.scene.camera.far * t.scene.camera.far / 3));
				var s = [r, r, r],
					o = new Mesh,
					h = vec3.create(),
					u = vec3.create(),
					c = vec3.create();

				function a(e, t, i, n, r) {
					var s = new Submesh;
					s.positions = [], s.normals = [], s.texCoords2D = [
						[]
					], vec3.sub(u, t, e), vec3.sub(c, n, e), vec3.cross(h, u, c), vec3.negate(h, h), vec3.normalize(h, h);
					var a = s.positions.length / 3;
					s.positions.push(e[0], e[1], e[2]), s.normals.push(h[0], h[1], h[2]), s.texCoords2D[0].push(0, 1), s.positions.push(t[0], t[1], t[2]), s.normals.push(h[0], h[1], h[2]), s.texCoords2D[0].push(1, 1), s.positions.push(i[0], i[1], i[2]), s.normals.push(h[0], h[1], h[2]), s.texCoords2D[0].push(1, 0), s.positions.push(n[0], n[1], n[2]), s.normals.push(h[0], h[1], h[2]), s.texCoords2D[0].push(0, 0), s.faces.push(a + 0, a + 3, a + 2), s.faces.push(a + 2, a + 1, a + 0), s.recalculateBounds(), o.addSubmesh(s, r)
				}
				for (var l = [vec3.fromValues(n[0] - s[0], n[1] - s[1], n[2] - s[2]), vec3.fromValues(n[0] + s[0], n[1] - s[1], n[2] - s[2]), vec3.fromValues(n[0] + s[0], n[1] + s[1], n[2] - s[2]), vec3.fromValues(n[0] - s[0], n[1] + s[1], n[2] - s[2]), vec3.fromValues(n[0] - s[0], n[1] - s[1], n[2] + s[2]), vec3.fromValues(n[0] + s[0], n[1] - s[1], n[2] + s[2]), vec3.fromValues(n[0] + s[0], n[1] + s[1], n[2] + s[2]), vec3.fromValues(n[0] - s[0], n[1] + s[1], n[2] + s[2])], d = {
						ambient: new UniformColor(new Color),
						diffuse: new UniformColor(new Color)
					}, f = [e.texturesManager.addDescriptor(i[0]), e.texturesManager.addDescriptor(i[1]), e.texturesManager.addDescriptor(i[2]), e.texturesManager.addDescriptor(i[3]), e.texturesManager.addDescriptor(i[4]), e.texturesManager.addDescriptor(i[5])], m = 0; m < f.length; m++) f[m].clampToEdge = !0;
				a(l[3], l[2], l[1], l[0], new Material(e.addShaderSource("diffuse"), d, [new Sampler("diffuse0", f[0])])), a(l[6], l[7], l[4], l[5], new Material(e.addShaderSource("diffuse"), d, [new Sampler("diffuse0", f[1])])), a(l[7], l[3], l[0], l[4], new Material(e.addShaderSource("diffuse"), d, [new Sampler("diffuse0", f[2])])), a(l[2], l[6], l[5], l[1], new Material(e.addShaderSource("diffuse"), d, [new Sampler("diffuse0", f[3])])), a(l[0], l[1], l[5], l[4], new Material(e.addShaderSource("diffuse"), d, [new Sampler("diffuse0", f[4])])), a(l[7], l[6], l[2], l[3], new Material(e.addShaderSource("diffuse"), d, [new Sampler("diffuse0", f[5])])), this.meshNode.addComponent(new MeshComponent(o));
				var p = this.meshNode.addComponent(new MeshRendererComponent);
				this.node.addNode(this.meshNode), p.castShadows = !1, p.disable(), p.addRenderers(t.context, t)
			}
		}),
		TextRendererComponent = MeshRendererComponent.extend({
			type: function() {
				return "TextRendererComponent"
			},
			onContextRestored: function(e) {
				this._super(e);
				var t = this.node.getComponent(TextComponent);
				t && t.updateText()
			}
		}),
		CanvasBoardRendererComponent = MeshRendererComponent.extend({
			type: function() {
				return "CanvasBoardRendererComponent"
			}
		}),
		TextComponent = MeshComponent.extend({
			init: function(e, t) {
				this._super(new Mesh), this.context = !1, this.material = !1, this.texture = !1, this.wrap = t ? 0 : t, this.sampler = new Sampler("diffuse0", null), this.lines = [], this.color = new Color(0, 0, 0, 1), this.fontSize = 56, this.style = "normal", this.variant = "normal", this.weight = "normal", this.family = "monospace", this.backgroundColor = new Color(0, 0, 0, 0), this.outline = !0, this.outlineColor = new Color(1, 1, 1, 1), this.outlineWidth = 5, this.textLength = 0, this.setText(e)
			},
			excluded: function() {
				return this._super().concat(["material", "texture", "sampler", "context"])
			},
			type: function() {
				return "TextComponent"
			},
			applyTextStyles: function(e) {
				this.outline && (e.strokeStyle = this.outlineColor.toString(), e.lineWidth = this.outlineWidth), e.fillStyle = this.color.toString(), e.textBaseline = "middle", e.textAlign = "center", e.font = this.font
			},
			updateFont: function() {
				this.font = "", "normal" != this.style && (this.font += this.style + " "), "normal" != this.variant && (this.font += this.variant + " "), "normal" != this.weight && (this.font += this.weight + " "), this.font += this.fontSize + "px " + this.family
			},
			updateText: function() {
				if (this.context && 0 != this.text.length) {
					var e = this.node.getComponent(TextRendererComponent);
					if (e) {
						this.updateFont();
						var t = document.createElement("canvas"),
							i = t.getContext("2d");
						this.applyTextStyles(i), this.wrap ? this.lines = this.getLines(this.text) : this.textLength = i.measureText(this.text).width, t.width = nextHighestPowerOfTwo(i.measureText(this.text).width), t.height = nextHighestPowerOfTwo(2 * this.fontSize), i.fillStyle = this.backgroundColor.toString(), i.fillRect(0, 0, t.width, t.height), this.applyTextStyles(i), this.outline && i.strokeText(this.text, t.width / 2, t.height / 2), i.fillText(this.text, t.width / 2, t.height / 2), this.texture.setImage(this.context, t);
						var n = t.width / t.height,
							r = this.mesh.submeshes[0];
						if (r.positions[0] = -.5 * n, r.positions[1] = -.5, r.positions[3] = -.5 * n, r.positions[4] = .5, r.positions[6] = .5 * n, r.positions[7] = .5, r.positions[9] = .5 * n, r.positions[10] = -.5, r.recalculateBounds(), 0 < e.meshRenderers.length) e.meshRenderers[0].buffer.update("position", r.positions)
					}
				}
			},
			onStart: function(e, t) {
				this.context = e, this.material = new Material(t.assetsManager.addShaderSource("transparent"), {
						diffuse: new UniformColor({
							r: 1,
							g: 1,
							b: 1,
							a: 1
						})
					}, [this.sampler]), this.material.shader.requirements.transparent = !0, this.material.name = "TextComponentMaterial", this.texture = new Texture(e), this.texture.mipmapped = !0, this.texture.clampToEdge = !0,
					this.sampler.texture = this.texture;
				var i = new Submesh;
				i.positions = new Float32Array(12), i.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], i.texCoords2D = [
					[0, 0, 0, 1, 1, 1, 1, 0]
				], i.faces = [0, 1, 2, 0, 2, 3], i.recalculateBounds(), this.mesh.addSubmesh(i, this.material), this.updateText()
			},
			setText: function(e) {
				this.text = String(e), this.updateText()
			},
			getLines: function(e, t) {
				var i = e.split(" "),
					n = [],
					r = i[0];
				if (t <= 0) return i;
				if (i.length <= t) return i;
				for (var s = 1; s < i.length; s++) r.length > e.length / t ? (n.push(r), r = "") : r += " " + i[s];
				return n.push(r), n
			},
			onContextRestored: function(e) {
				this.texture && delete this.texture, this.texture = new Texture(e), this.texture.mipmapped = !0, this.texture.clampToEdge = !0, this.sampler.texture = this.texture
			}
		}),
		LineRendererComponent = RendererComponent.extend({
			init: function(e) {
				this._super(), this.lightContribution = 0, this.receiveShadows = !1, this.castShadows = !1, this.color = new UniformColor(e instanceof Color ? e : new Color(.5, .5, .5, 1)), this.renderer = null, this.damaged = !0, this.material = new Material(null, {
					diffuse: this.color
				}, []), this.overlay = !1, this.faces = [], this.vertices = []
			},
			type: function() {
				return "LineRendererComponent"
			},
			excluded: function() {
				return this._super().concat(["damaged", "renderer", "material"])
			},
			onStart: function(e, t) {
				this.material.shader = t.assetsManager.addShaderSource("transparent"), this.material.samplers = [new Sampler("diffuse0", t.WhiteTexture)], this.renderer || (this.renderer = new LineRenderer(e, this.node.transform.absolute, this.material)), this.getScene().dynamicSpace.addRenderer(this.renderer)
			},
			onEnd: function(e) {
				this.renderer && this.getScene().dynamicSpace.removeRenderer(this.renderer), delete this.renderer, this.renderer = null
			},
			onUpdate: function(e, t) {
				this.damaged && this.rebuild(e)
			},
			onUpdateTransform: function(e) {
				this.renderer && (this.renderer.layer = this.node.layer, this.renderer.castShadows = this.castShadows, this.renderer.receiveShadows = this.receiveShadows, this.renderer.lightContribution = this.lightContribution, this.renderer.setMatrix(e))
			},
			onEnable: function() {
				this.renderer && (this.renderer.visible = !0)
			},
			onDisable: function() {
				this.renderer && (this.renderer.visible = !1)
			},
			onPostRender: function(e, t) {
				this.overlay && this.renderer && this.enabled && (e.projection.push(), e.modelview.push(), e.projection.load(t.projectionMatrix), e.modelview.load(t.viewMatrix), e.modelview.multiply(this.node.transform.absolute), this.material.bind(), this.renderer.renderGeometry(e, this.material.shader), this.material.unbind(), e.projection.pop(), e.modelview.pop())
			},
			rebuild: function(e) {
				0 != this.vertices.length && 0 != this.faces.length && (this.renderer || (this.renderer = new LineRenderer(e, this.node.transform.absolute, this.material)), this.renderer.buffer.updateFaces(this.faces), this.renderer.buffer.has("position") ? this.renderer.buffer.update("position", this.vertices) : this.renderer.buffer.add("position", this.vertices, 3), this.damaged = !1)
			},
			clear: function(e) {
				this.faces = [], this.vertices = [], this.damaged = !0
			},
			addLine: function(e, t) {
				var i = this.vertices.length / 3,
					n = {
						vertexOffset: i
					};
				return this.vertices.push(e[0], e[1], e[2], t[0], t[1], t[2]), this.faces.push(i, i + 1), this.damaged = !0, n
			},
			updateLine: function(e, t, i) {
				var n = function(e, t, i) {
					e[3 * t + 0] = i[0], e[3 * t + 1] = i[1], e[3 * t + 2] = i[2]
				};
				n(this.vertices, e.vertexOffset + 0, t), n(this.vertices, e.vertexOffset + 1, i), this.damaged = !0
			},
			addTriangle: function(e, t, i) {
				this.addLine(e, t), this.addLine(t, i), this.addLine(i, e), this.damaged = !0
			},
			addBox: function(e) {
				if (!(e instanceof BoundingBox)) throw "LineRendererComponent.addBox expects box to be of type BoundingBox";
				this.addLine(e.min, [e.min[0], e.min[1], e.max[2]]), this.addLine(e.min, [e.min[0], e.max[1], e.min[2]]), this.addLine(e.min, [e.max[0], e.min[1], e.min[2]]), this.addLine(e.max, [e.max[0], e.min[1], e.max[2]]), this.addLine(e.max, [e.max[0], e.max[1], e.min[2]]), this.addLine(e.max, [e.min[0], e.max[1], e.max[2]]), this.addLine([e.min[0], e.max[1], e.min[2]], [e.min[0], e.max[1], e.max[2]]), this.addLine([e.min[0], e.max[1], e.max[2]], [e.min[0], e.min[1], e.max[2]]), this.addLine([e.min[0], e.min[1], e.max[2]], [e.max[0], e.min[1], e.max[2]]), this.addLine([e.max[0], e.min[1], e.max[2]], [e.max[0], e.min[1], e.min[2]]), this.addLine([e.max[0], e.min[1], e.min[2]], [e.max[0], e.max[1], e.min[2]]), this.
				addLine([e.max[0], e.max[1], e.min[2]], [e.min[0], e.max[1], e.min[2]]), this.damaged = !0
			},
			addGrid: function(e, t, i) {
				var n = [t[0] / 2, t[1] / 2];
				i || (i = [1, 1]);
				for (var r = -n[0]; r <= n[0]; r++) this.addLine([r * i[0] + e[0], e[1], -n[1] * i[1] + e[2]], [r * i[0] + e[0], e[1], n[1] * i[1] + e[2]]);
				for (r = -n[1]; r <= n[1]; r++) this.addLine([-n[0] * i[0] + e[0], e[1], r * i[1] + e[2]], [n[0] * i[0] + e[0], e[1], r * i[1] + e[2]]);
				this.damaged = !0
			},
			onContextRestored: function(e) {
				this._super(e), this.renderer && (this.damaged = !0, delete this.renderer.buffer, this.renderer.buffer = new LinesRenderBuffer(e), this.rebuild(e))
			}
		}),
		CanvasBoardComponent = MeshComponent.extend({
			init: function(e, t) {
				this._super(new Mesh), this.width = e, this.height = t || e, this.context = !1, this.material = !1, this.texture = !1, this.canvasContext = !1, this.canvas = !1, this.sampler = new Sampler("diffuse0", null)
			},
			excluded: function() {
				return this._super().concat(["material", "texture", "sampler", "context"])
			},
			type: function() {
				return "CanvasBoardComponent"
			},
			createContext: function() {
				if (this.context) {
					var e = this.node.getComponent(CanvasBoardRendererComponent);
					if (e) {
						this.canvas = document.createElement("canvas"), this.canvasContext = this.canvas.getContext("2d"), this.canvas.width = this.width, this.canvas.height = this.height, this.canvasContext.fillStyle = "white", this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
						var t = this.mesh.submeshes[0];
						if (t.positions[0] = -.5, t.positions[1] = -.5, t.positions[3] = -.5, t.positions[4] = .5, t.positions[6] = .5, t.positions[7] = .5, t.positions[9] = .5, t.positions[10] = -.5, t.recalculateBounds(), this.texture.setImage(this.context, this.canvas), 0 < e.meshRenderers.length) e.meshRenderers[0].buffer.update("position", t.positions)
					}
				}
			},
			updateImage: function() {
				this.texture.setImage(this.context, this.canvas)
			},
			onStart: function(e, t) {
				this.context = e, this.material = new Material(t.assetsManager.addShaderSource("transparent"), {
					diffuse: new UniformColor({
						r: 1,
						g: 1,
						b: 1,
						a: 1
					})
				}, [this.sampler]), this.material.shader.requirements.transparent = !0, this.material.name = "CanvasBoardMaterial", this.texture = new Texture(e), this.texture.mipmapped = !0, this.texture.clampToEdge = !0, this.sampler.texture = this.texture;
				var i = new Submesh;
				i.positions = new Float32Array(12), i.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], i.texCoords2D = [
					[0, 0, 0, 1, 1, 1, 1, 0]
				], i.faces = [0, 1, 2, 0, 2, 3], i.recalculateBounds(), this.mesh.addSubmesh(i, this.material), this.createContext()
			},
			getCanvasContext: function() {
				return this.canvasContext
			}
		}),
		Controller = Component.extend({
			init: function() {
				this._super(), this.delta = vec2.create(), this.dragDelta = vec2.create(), this.position = !1, this.oldPosition = !1, this.startDragPosition = !1, this.buttons = [!1, !1, !1]
			},
			excluded: function() {
				return this._super().concat(["delta", "dragDelta", "position", "oldPosition", "startDragPosition", "buttons", "keyStates"])
			},
			type: function() {
				return "Controller"
			},
			onAddScene: function(e) {
				e.scene.engine.input.registerController(this)
			},
			onRemoveScene: function(e) {
				e.scene.engine.input.unregisterController(this)
			},
			bind: function(e, t, i) {
				this.node && e && t && i && this.node.scene.engine.input.bind(e, t, i)
			},
			getPriority: function(e) {
				return 0
			},
			onStart: function(e, t) {
				for (var i = 0; i < this.buttons.length; i++) this.buttons[i] = !1
			},
			onUpdate: function(e) {},
			onKeyStateChange: function(e, t) {},
			onKeyDown: function(e) {},
			onKeyUp: function(e) {},
			onButtonDown: function(e, t, i) {},
			onButtonUp: function(e, t, i) {},
			onClick: function(e, t, i) {},
			onMouseMove: function(e, t, i) {},
			onMouseDown: function(e, t, i) {
				this.buttons[t] = !0
			},
			onMouseUp: function(e, t, i) {
				this.buttons[t] = !1
			}
		}),
		FlightController = Controller.extend({
				init: function() {
					this._super(), this.rotation = vec3.create(), this.velocity = vec3.fromValues(0, 0, 0), this.angularVelocity = vec3.fromValues(0, 0, 0), this.acceleration = .2, this.deceleration = .2, this.friction = .01, this.rotationAcceleration = .001, this.rotationFriction = .1, this.tmpRotation = quat.create(), this.tmpImpulse = vec3.create()
				},
				type: function() {
					return "FlightController"
				},
				onAdd: function() {
					this._super(), this.bind("W", "accelerate", this), this.bind("S", "decelerate", this), this.bind("A", "strafeLeft", this), this.bind("D", "strafeRight", this), this.bind("C", "moveDown", this), this.bind("space", "moveUp", this), this.bind("up_arrow", "accelerate", this), this.bind("down_arrow", "
						decelerate ",this),this.bind("
						left_arrow ","
						strafeLeft ",this),this.bind("
						right_arrow ","
						strafeRight ",this)},accelerate:function(e){this.addLocalImpulse([0,0,-this.acceleration*e])},decelerate:function(e){this.addLocalImpulse([0,0,this.deceleration*e])},strafeLeft:function(e){this.addLocalImpulse([-this.deceleration*e,0,0])},strafeRight:function(e){this.addLocalImpulse([this.deceleration*e,0,0])},moveUp:function(e){this.addWorldImpulse([0,this.acceleration*e,0])},moveDown:function(e){this.addWorldImpulse([0,-this.acceleration*e,0])},addWorldImpulse:function(e){vec3.add(this.velocity,this.velocity,e)},addLocalImpulse:function(e){quat.fromMat4(this.tmpRotation,this.node.transform.absolute),vec3.transformQuat(this.tmpImpulse,e,this.tmpRotation),vec3.add(this.velocity,this.velocity,this.tmpImpulse)},onStep:function(e,t,i){return!0},onUpdate:function(e,t){this._super(e,t);var i=e.fps.getDelta(),n=1+this.friction*i;vec3.scale(this.velocity,this.velocity,1/n);var r=1+this.rotationFriction*i;vec3.scale(this.angularVelocity,this.angularVelocity,1/r);var s=vec3.scale(vec3.create(),this.velocity,i),a=vec3.scale(vec3.create(),this.angularVelocity,i);vec3.add(this.rotation,this.rotation,a);var o=quat.create();quat.rotateY(o,o,this.rotation[1]),quat.rotateX(o,o,this.rotation[0]);var h=mat4.translation(vec3.create(),this.node.transform.relative),u=vec3.add(vec3.create(),s,h);this.onStep(h,u,o)&&mat4.fromRotationTranslation(this.node.transform.relative,o,u)},onMouseMove:function(e,t,i){if(0===t){var n=vec3.create(),r=this.rotationAcceleration;vec3.scale(n,[-i[1],-i[0],0],r),vec3.add(this.angularVelocity,this.angularVelocity,n)}}}),OrbitController=FlightController.extend({init:function(){this._super(),this.target=new TypeReference("
						Transform "),this.panButton=2,this.rotateButton=0,this.position=vec3.create(),this.velocity=vec3.create(),this.pan=vec3.create(),this.minimumPan=[-100,-100,-100],this.maximumPan=[100,100,100],this.panXAxis=[1,0,0],this.panYAxis=[0,0,1],this.panSpeed=.05,this.rotation=vec3.create(),this.angularVelocity=vec3.create(),this.minimumPitch=-Math.PI/2.2,this.maximumPitch=0,this.rotationAcceleration=.012,this.rotationFriction=.1,this.lastPinch=0,this.zoomSpeed=1,this.doZoomIn=!1,this.doZoomOut=!1,this.distance=5,this.minimumDistance=2.5,this.maximumDistance=7.5,this.distanceSteps=4,this.direction=vec3.create(),this.cameraPosition=vec3.create(),this.targetPosition=vec3.create(),this.lookat=mat4.create(),this.tmpRotation=quat.create(),this.cbOnChange},excluded:function(){return this._super().concat(["
						velocity ","
						angularVelocity ","
						doZoomIn ","
						doZoomOut ","
						direction ","
						cameraPosition ","
						targetPosition ","
						lookat "])},type:function(){return"
						OrbitController "},onAdd:function(){this._super(),this.bind("
						W ","
						zoomIn ",this),this.bind("
						S ","
						zoomOut ",this),this.bind("
						A ","
						rotateLeft ",this),this.bind("
						D ","
						rotateRight ",this),this.bind("
						E ","
						rotateUp ",this),this.bind("
						Q ","
						rotateDown ",this)},onChange:function(e,t){this.cbOnChange&&"
						function "==typeof this.cbOnChange&&this.cbOnChange(e,t)},getZoom:function(){return(this.distance-this.minimumDistance)/(this.maximumDistance-this.minimumDistance)},setZoom:function(e){e=Math.max(0,e);var t=this.maximumDistance-this.minimumDistance;this.distance=Math.min(this.minimumDistance+t*e,this.maximumDistance),this.onChange("
						distance ",this.distance)},setDistance:function(e){this.distance=Math.min(Math.max(e,this.minimumDistance),this.maximumDistance),this.onChange("
						distance ",this.distance)},zoomIn:function(e){this.enabled&&(e||(e=1),this.distance-=e*this.zoomSpeed*(this.maximumDistance-this.minimumDistance)/this.distanceSteps,this.distance<this.minimumDistance&&(this.distance=this.minimumDistance),this.onChange("
						distance ",this.distance))},zoomOut:function(e){this.enabled&&(e||(e=1),this.distance+=e*this.zoomSpeed*(this.maximumDistance-this.minimumDistance)/this.distanceSteps,this.distance>this.maximumDistance&&(this.distance=this.maximumDistance),this.onChange("
						distance ",this.distance,e*this.zoomSpeed*(this.maximumDistance-this.minimumDistance)/this.distanceSteps))},rotateLeft:function(e){this.accelerate([0,-this.
						rotationAcceleration, 0], e)
			}, rotateRight: function(e) {
				this.accelerate([0, this.rotationAcceleration, 0], e)
			}, rotateUp: function(e) {
				this.accelerate([this.rotationAcceleration, 0, 0], e)
			}, rotateDown: function(e) {
				this.accelerate([-this.rotationAcceleration, 0, 0], e)
			}, accelerate: function(e, t) {
				this.enabled && (vec3.scale(e, e, t), vec3.add(this.angularVelocity, this.angularVelocity, e), this.onChange("accelerate", e))
			}, onUpdate: function(e, t) {
				this._super(e, t), this.target.isNull() || (vec3.add(this.rotation, this.rotation, this.angularVelocity), quat.identity(this.tmpRotation), quat.rotateY(this.tmpRotation, this.tmpRotation, this.rotation[1]), quat.rotateX(this.tmpRotation, this.tmpRotation, this.rotation[0]), vec3.set(this.direction, 0, 0, 1), vec3.transformQuat(this.direction, this.direction, this.tmpRotation), vec3.scale(this.direction, this.direction, this.distance), mat4.translation(this.targetPosition, this.target.value.absolute), vec3.add(this.cameraPosition, this.targetPosition, this.direction), vec3.add(this.targetPosition, this.targetPosition, this.pan), vec3.add(this.cameraPosition, this.cameraPosition, this.pan), mat4.lookAt(this.lookat, this.cameraPosition, this.targetPosition, [0, 1, 0]), mat4.invert(this.node.transform.absolute, this.lookat), this.node.calculateRelativeFromAbsolute(), this.doZoomIn && this.zoomIn(), this.doZoomOut && this.zoomOut())
			}, onMouseMove: function(e, t, i, n) {
				!1 !== this.rotateButton && t == this.rotateButton && this.rotate(i[1], i[0]), !1 !== this.panButton && t == this.panButton && this.move(i[0], i[1])
			}, onPan: function(e, t) {
				this.move(t[0], t[1])
			}, rotate: function(e, t) {
				var i = vec3.create();
				vec3.scale(i, [-e, -t, 0], this.rotationAcceleration), vec3.add(this.rotation, this.rotation, i), this.rotation[0] = Math.max(this.minimumPitch, this.rotation[0]), this.rotation[0] = Math.min(this.maximumPitch, this.rotation[0]), this.onChange("rotate", e, t)
			}, move: function(e, t) {
				var i = vec3.create();
				vec3.scale(i, this.panXAxis, -e), vec3.add(i, i, vec3.scale(vec3.create(), this.panYAxis, -t)), i = vec3.scale(i, i, this.distance / 900);
				var n = quat.fromMat4(quat.create(), this.node.transform.absolute),
					r = vec3.fromValues(0, 0, 1);
				vec3.transformQuat(r, r, n);
				var s = Math.atan2(r[2], r[0]);
				s -= Math.PI / 2, quat.identity(n), quat.rotateY(n, n, s), quat.conjugate(n, n), quat.normalize(n, n), vec3.transformQuat(i, i, n), vec3.add(this.pan, this.pan, i), this.pan[0] = Math.max(this.pan[0], this.minimumPan[0]), this.pan[1] = Math.max(this.pan[1], this.minimumPan[1]), this.pan[2] = Math.max(this.pan[2], this.minimumPan[2]), this.pan[0] = Math.min(this.pan[0], this.maximumPan[0]), this.pan[1] = Math.min(this.pan[1], this.maximumPan[1]), this.pan[2] = Math.min(this.pan[2], this.maximumPan[2]), this.onChange("move", e, t)
			}, onPinch: function(e, t) {
				t = this.getZoom() + (1 - t), this.setZoom(t)
			}, onRotate: function(e, t, i, n) {
				var r = t * (Math.PI / 180);
				this.rotation[1] = this.rotation[1] + r, this.onChange("rotate", t)
			}, onMouseWheel: function(e, t, i, n, r) {
				i < 0 ? this.zoomIn() : this.zoomOut()
			}
		}), SmoothOrbitController = OrbitController.extend({
	init: function() {
		this._super(), this.speed = 5, this.currentRotation = vec2.create(), this.currentDistance = this.distance, this.enableRotatingX = !0, this.enableRotatingY = !0
	},
	excluded: function() {
		return this._super().concat(["currentRotation", "currentDistance", "tmpRotation"])
	},
	type: function() {
		return "SmoothOrbitController"
	},
	onUpdate: function(e, t) {
		if (!this.target.isNull()) {
			var i = e.fps.getDelta() / 1e3 * this.speed;
			i = Math.min(i, 1), this.enableRotatingX && (this.currentRotation[0] = lerp(this.currentRotation[0], this.rotation[0], i)), this.enableRotatingY && (this.currentRotation[1] = lerp(this.currentRotation[1], this.rotation[1], i)), this.currentDistance = lerp(this.currentDistance, this.distance, i), quat.identity(this.tmpRotation), quat.rotateY(this.tmpRotation, this.tmpRotation, this.currentRotation[1]), quat.rotateX(this.tmpRotation, this.tmpRotation, this.currentRotation[0]), vec3.set(this.direction, 0, 0, 1), vec3.transformQuat(this.direction, this.direction, this.tmpRotation), vec3.scale(this.direction, this.direction, this.currentDistance), mat4.translation(this.targetPosition, this.target.value.absolute), vec3.add(this.cameraPosition, this.targetPosition, this.direction), vec3.add(this.targetPosition, this.targetPosition, this.pan), vec3.add(
				this.cameraPosition, this.cameraPosition, this.pan), mat4.lookAt(this.lookat, this.cameraPosition, this.targetPosition, [0, 1, 0]), mat4.invert(this.node.transform.absolute, this.lookat), this.node.calculateRelativeFromAbsolute(), this.doZoomIn && this.zoomIn(), this.doZoomOut && this.zoomOut()
		}
	}
}), Billboard = Component.extend({
	init: function(e, t, i) {
		this._super(), this.cameraToLookAt = e, this.smoothRotation = !0 === t, this.rotationSpeed = 4, i && (this.rotationSpeed = i), this.cacheMat4 = [mat4.create()], this.cacheQuat = [quat.create(), quat.create()], this.cacheVec3 = [vec3.create(), vec3.create()]
	},
	type: function() {
		return "Billboard"
	},
	onUpdate: function(e) {
		if (this.enabled) {
			if (!(this.cameraToLookAt instanceof Camera)) throw "Billboard.cameraToLookAt is not an instance of Camera";
			var t = e.fps.getDelta() / 1e3,
				i = mat4.invert(this.cacheMat4[0], this.cameraToLookAt.viewMatrix),
				n = quat.fromMat4(this.cacheQuat[0], i);
			if (this.smoothRotation) {
				var r = quat.fromMat4(this.cacheQuat[1], this.node.transform.relative);
				quat.slerp(n, r, n, this.rotationSpeed * t)
			}
			quat.normalize(n, n);
			var s = mat4.translation(this.cacheVec3[0], this.node.transform.relative),
				a = mat4.getScale(this.cacheVec3[1], this.node.transform.relative);
			mat4.fromRotationTranslationScale(this.node.transform.relative, n, s, a)
		}
	}
}), VerticalBillboard = Billboard.extend({
	init: function(e, t, i) {
		this._super(e, t, i)
	},
	type: function() {
		return "VerticalBillboard"
	},
	onUpdate: function(e) {
		if (!(this.cameraToLookAt instanceof Camera)) throw "VerticalBillboard.cameraToLookAt is not an instance of Camera";
		var t = e.fps.getDelta() / 1e3,
			i = mat4.invert(this.cacheMat4[0], this.cameraToLookAt.viewMatrix),
			n = quat.fromMat4(this.cacheQuat[0], i);
		if (quat.multiply(n, n, quat.euler(this.cacheQuat[1], 0, 180, 0)), this.smoothRotation) {
			n[0] = 0, n[2] = 0, quat.normalize(n, n);
			var r = quat.fromMat4(this.cacheQuat[1], this.node.transform.relative);
			quat.slerp(n, r, n, this.rotationSpeed * t)
		}
		quat.normalize(n, n);
		var s = mat4.translation(this.cacheVec3[0], this.node.transform.relative),
			a = mat4.getScale(this.cacheVec3[1], this.node.transform.relative);
		mat4.fromRotationTranslationScale(this.node.transform.relative, n, s, a)
	}
}), Collider = Component.extend({
	init: function() {
		this._super()
	},
	type: function() {
		return "Collider"
	},
	onStart: function(e, t) {
		this.getScene().dynamicSpace.addCollider(this)
	},
	onEnd: function(e, t) {
		this.getScene().dynamicSpace.removeCollider(this)
	},
	rayTest: function(e, t, i) {
		return !1
	}
}), MeshCollider = Collider.extend({
	init: function() {
		this._super()
	},
	type: function() {
		return "MeshCollider"
	},
	rayTest: function(e, t, i) {
		if (!this.enabled) return !1;
		var n = this.node.getComponent(MeshRendererComponent);
		if (!n) return !1;
		for (var r = n.meshRenderers, s = vec3.create(), a = vec3.create(), o = vec3.create(), h = !1, u = 0; u < r.length; u++)
			if ((i || r[u].visible) && e.intersectBoundingVolume(r[u].globalBoundingBox)) {
				var c = e.clone(),
					l = mat4.invert(mat4.create(), r[u].matrix);
				c.transform(l);
				var d = r[u].submesh.faces,
					f = r[u].submesh.positions;
				if (t) {
					var m = this;
					t.addCallback = function(e) {
						vec3.transformMat4(e.point, e.point, r[u].matrix), e.submesh = r[u].submesh, e.collider = m, e.node = m.node
					}
				}
				for (var p = 0; p < d.length; p += 3)
					if (s[0] = f[3 * d[p]], s[1] = f[3 * d[p] + 1], s[2] = f[3 * d[p] + 2], a[0] = f[3 * d[p + 1]], a[1] = f[3 * d[p + 1] + 1], a[2] = f[3 * d[p + 1] + 2], o[0] = f[3 * d[p + 2]], o[1] = f[3 * d[p + 2] + 1], o[2] = f[3 * d[p + 2] + 2], c.intersectTriangle(s, a, o, t)) {
						if (!t) return !0;
						h = !0;
						break
					} if (t) t.addCallback = !1;
				else if (h) return !0
			} return h
	}
}), LargeMeshCollider = Collider.extend({
	init: function(e) {
		this._super(), this.tree = !1, this.meshes = [], this.damaged = !1, this.invMat = mat4.create()
	},
	type: function() {
		return "LargeMeshCollider"
	},
	excluded: function() {
		return this._super().concat(["tree", "meshes"])
	},
	isComplete: function() {
		return !1 !== this.tree && 0 == this.meshes.length
	},
	onAdd: function(e) {
		if (this._super(), this.damaged) {
			var n = this.node;

			function t(t) {
				var i = null;
				return n.onEachChild(function(e) {
					if (e.localCollisionID === t) return i = e, !0
				}), i
			}
			for (var i in this.tree.nodes) {
				var r = this.tree.nodes[i].localCollisionID;
				r < 0 || (this.tree.nodes[i] = t(r))
			}
			this.damaged = !1
		}
	},
	clone: function() {
		var e = new LargeMeshCollider;
		return this.tree && (e.tree = this.tree.clone(), e.damaged = !0), e
	},
	rayTest: function(e, t, i) {
		if (!this.enabled || !this.isComplete()) return !1;
		var n = e.clone();
		mat4.invert(this.invMat, this.node.transform.absolute), n.transform(this.invMat);
		var r = this.tree.getNearestRayCollision(n, e);
		if (r.t == 1 / 0 || r.t == -1 / 0) return !1;
		if (t && r) {
			var s = n.getPointOnRay(r.t);
			vec3.transformMat4(s, s, this.node.transform.absolute), t.hits.push({
				point: s,
				collider: this,
				submesh: r.submesh,
				node: r.node,
				normal: r.normal
			})
		}
		return !1 !== r
	}
}), Resource = Component.extend({
	init: function() {
		this._super(), this.descriptor = !1
	},
	excluded: function() {
		return this._super().concat(["resource"])
	},
	type: function() {
		return "ResourceComponent"
	}
}), TextureResource = Resource.extend({
	init: function() {
		this._super(), this.descriptor = new TextureDescriptor, this.texture = !1, this.engine = !1
	},
	excluded: function() {
		return this._super().concat(["texture", "engine"])
	},
	type: function() {
		return "TextureResource"
	},
	load: function(e) {
		var t = this;
		this.texture = this.engine.assetsManager.texturesManager.addDescriptor(this.descriptor), this.engine.assetsManager.load(function() {
			t.onLoaded(), e && e(t.engine.context, t.engine)
		})
	},
	onStart: function(e, t) {
		this.engine = t, this.load()
	},
	onLoaded: function() {}
}), ModelResource = Resource.extend({
	init: function() {
		this._super(), this.descriptor = new ModelDescriptor, this.model = !1
	},
	type: function() {
		return "ModelResource"
	},
	excluded: function() {
		return this._super().concat(["model", "engine"])
	},
	load: function(e) {
		if (this.descriptor.source) {
			var t = this;
			this.model = this.engine.assetsManager.modelsManager.addDescriptor(this.descriptor), this.engine.assetsManager.load(function() {
				t.node.addNode(t.model), t.onLoaded(), e && e(t.engine.context, t.engine)
			})
		}
	},
	onStart: function(e, t) {
		this.engine = t, this.load()
	},
	onLoaded: function() {}
}), MaterialResource = Resource.extend({
	init: function() {
		this._super(), this.descriptor = new MaterialSourceDescriptor, this.material = !1, this.engine = !1
	},
	excluded: function() {
		return this._super().concat(["material", "engine"])
	},
	type: function() {
		return "MaterialResource"
	},
	load: function(e) {
		var t = this;
		this.texture = this.engine.assetsManager.materialSourcesManager.addDescriptor(this.descriptor), this.engine.assetsManager.load(function() {
			t.onLoaded(), e && e(t.engine.context, t.engine)
		})
	},
	onStart: function(e, t) {
		this.engine = t, this.load()
	},
	onLoaded: function() {}
}), Light = Component.extend({
	init: function() {
		this._super(), this.color = new Color(1, 1, 1, 1), this.intensity = 1, this.shadowCasting = !1, this.shadowMask = 4294967295
	},
	type: function() {
		return "Light"
	},
	onAddScene: function(e) {
		e.scene.lights.push(this)
	},
	onRemoveScene: function(e) {
		for (var t = e.scene.lights, i = 0; i < t.length; i++) t[i] == this && (t.splice(i, 1), i--)
	},
	getGeometryRenderers: function() {
		return []
	},
	isPositional: function() {
		return !1
	},
	onContextRestored: function(e) {}
}), OmniLight = Light.extend({
	init: function(e, t) {
		this._super(), this.size = e || 1, this.color = t || new Color(1, 1, 1, 1), this.intensity = 1, this.geometry = null, this.material = null
	},
	type: function() {
		return "OmniLight"
	},
	onStart: function(e, t) {
		this._super(), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/deferred_light_omni"), {
			lightColor: new UniformColor(this.color),
			lightPosition: new UniformVec3(vec3.create()),
			lightIntensity: new UniformFloat(this.intensity),
			lightRadius: new UniformFloat(this.size)
		}, []), this.geometry = Primitives.sphere(this.size, 16, 16, this.material), this.geometry.getComponent(MeshRendererComponent).disable(), this.node.addNode(this.geometry), t.assetsManager.load()
	},
	onPreRender: function() {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a), this.node.transform.getPosition(this.material.uniforms.lightPosition.value), this.material.uniforms.lightIntensity.value = this.intensity, this.material.uniforms.lightRadius.value = this.size
	},
	getGeometryRenderers: function() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers
	},
	isPositional: function() {
		return !0
	}
}), AmbientLight = Light.extend({
	init: function(e) {
		this._super(), this.color = e || new Color(.2, .2, .2, 1), this.geometry = null, this.material = null
	},
	type: function() {
		return "AmbientLight"
	},
	onStart: function(e, t) {
		this._super(), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/deferred_light_ambient"), {
			lightColor: new UniformColor(this.color)
		}, []);
		var i = new Mesh,
			n = new Submesh;
		n.
		positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0], n.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], n.texCoords2D = [
			[0, 0, 0, 1, 1, 1, 1, 0]
		], n.faces = [0, 1, 2, 0, 2, 3], n.recalculateBounds(), i.addSubmesh(n, this.material), this.geometry = new Node("AmbientLightGeometry"), this.geometry.addComponent(new MeshComponent(i)), this.geometry.addComponent(new MeshRendererComponent).disable(), this.node.addNode(this.geometry), t.assetsManager.load()
	},
	onUpdate: function() {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a)
	},
	getGeometryRenderers: function() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers
	}
}), DirectionalLight = Light.extend({
	init: function(e, t) {
		this._super(), this.intensity = 1, this.color = t || new Color(1, 1, 1, 1), this.direction = vec3.fromValues(1, 1, 1), e && this.setLightDirection(e), this.shadowResolution = vec2.fromValues(2048, 2048), this.shadowBias = .001, this.geometry = null, this.material = null, this.shadow = null, this.shadowSampler = null, this.lightView = mat4.create(), this.lightProj = mat4.create()
	},
	type: function() {
		return "DirectionalLight"
	},
	setLightDirection: function(e) {
		vec3.copy(this.direction, e), vec3.normalize(this.direction, this.direction)
	},
	onStart: function(e, t) {
		if (this._super(), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/deferred_light_directional"), {
				lightColor: new UniformColor(this.color),
				lightIntensity: new UniformFloat(this.intensity),
				lightDirection: new UniformVec3(vec3.create()),
				lightView: new UniformMat4(mat4.create()),
				lightProjection: new UniformMat4(mat4.create()),
				useShadows: new UniformInt(0),
				shadowBias: new UniformFloat(.001)
			}, []), this.shadowCasting && !this.shadow) {
			var i = e.gl.getExtension("OES_texture_half_float"),
				n = e.gl.getExtension("OES_texture_float");
			this.shadow = n || i ? new TargetTextureFloat(this.shadowResolution, e, !1) : new TargetTexture(this.shadowResolution, e, !1), this.shadowSampler = new Sampler("shadow0", this.shadow.texture), this.material.samplers.push(this.shadowSampler)
		}
		var r = new Mesh,
			s = new Submesh;
		s.positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0], s.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], s.texCoords2D = [
			[0, 0, 0, 1, 1, 1, 1, 0]
		], s.faces = [0, 1, 2, 0, 2, 3], s.recalculateBounds(), r.addSubmesh(s, this.material), this.geometry = new Node("DirectionalLightGeometry"), this.geometry.addComponent(new MeshComponent(r)), this.geometry.addComponent(new MeshRendererComponent).disable(), this.node.addNode(this.geometry), t.assetsManager.load()
	},
	onUpdate: function(e) {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a), vec3.copy(this.material.uniforms.lightDirection.value, this.direction), this.material.uniforms.lightIntensity.value = this.intensity, this.material.uniforms.useShadows.value = this.shadowCasting ? 1 : 0, this.material.uniforms.shadowBias.value = this.shadowBias, this.updateSamplers(e.context)
	},
	updateSamplers: function(e) {
		this.shadowCasting && (this.shadow || (this.shadow = new TargetTextureFloat(this.shadowResolution, e, !1), this.shadowSampler ? this.shadowSampler.texture = this.shadow.texture : (this.shadowSampler = new Sampler("shadow0", this.shadow.texture), this.material.samplers.push(this.shadowSampler))), mat4.copy(this.material.uniforms.lightView.value, this.lightView), mat4.copy(this.material.uniforms.lightProjection.value, this.lightProj))
	},
	getGeometryRenderers: function() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers
	},
	onContextRestored: function(e) {
		delete this.shadow, this.shadow = null
	}
});

function TerrainMesh() {
	var E = this;
	this.generate = function(e, t, i) {
		if (i < 1) throw "TerrainMesh: numCones must be at least 1";
		var r = [],
			s = [],
			a = [],
			o = [],
			h = [],
			u = 0,
			n = e * Math.pow(2, i - 1),
			c = n / 2,
			d = 1,
			f = 2,
			m = 3,
			p = 4;

		function l(e) {
			return (e + c) / n
		}

		function g(e, t, i, n) {
			r.push(e[0], e[1], e[2]), s.push(l(e[0]), l(e[2])), a.push(0, 1, 0), h.push(0, 0, 1), r.push(e[0] - .5 * t, e[1], e[2] - .5 * t), s.push(l(e[0] - .5 * t), l(e[2] - .5 * t)), a.push(0, 1, 0), h.push(0, 1, 0), i !== d && n !== d && (r.push(e[0] - .5 * t, e[1], e[2]), s.push(l(e[0] - .5 * t), l(e[2])), a.push(0, 1, 0), h.push(0, 0, 0)), r.push(e[0] - .5 * t, e[1], e[2] + .5 * t), s.push(l(e[0] - .5 * t), l(e[2] + .5 * t)), a.push(0, 1, 0), h.push(1, 0, 0), i !== m && n !== m && (r.push(e[0], e[1], e[2] + .5 * t), s.push(l(e[0]), l(e[2] + .5 * t)), a.push(0, 1,
				0), h.push(0, 0, 0)), r.push(e[0] + .5 * t, e[1], e[2] + .5 * t), s.push(l(e[0] + .5 * t), l(e[2] + .5 * t)), a.push(0, 1, 0), h.push(1, 1, 0), i !== f && n !== f && (r.push(e[0] + .5 * t, e[1], e[2]), s.push(l(e[0] + .5 * t), l(e[2])), a.push(0, 1, 0), h.push(0, 0, 0)), r.push(e[0] + .5 * t, e[1], e[2] - .5 * t), s.push(l(e[0] + .5 * t), l(e[2] - .5 * t)), a.push(0, 1, 0), h.push(0, 1, 1), i !== p && n !== p && (r.push(e[0], e[1], e[2] - .5 * t), s.push(l(e[0]), l(e[2] - .5 * t)), a.push(0, 1, 0), h.push(0, 0, 0)), i && n ? (o.push(u + 0, u + 1, u + 2, u + 0, u + 2, u + 3, u + 0, u + 3, u + 4, u + 0, u + 4, u + 5, u + 0, u + 5, u + 6, u + 0, u + 6, u + 1), u += 7) : i || n ? (o.push(u + 0, u + 1, u + 2, u + 0, u + 2, u + 3, u + 0, u + 3, u + 4, u + 0, u + 4, u + 5, u + 0, u + 5, u + 6, u + 0, u + 6, u + 7, u + 0, u + 7, u + 1), u += 8) : (o.push(u + 0, u + 1, u + 2, u + 0, u + 2, u + 3, u + 0, u + 3, u + 4, u + 0, u + 4, u + 5, u + 0, u + 5, u + 6, u + 0, u + 6, u + 7, u + 0, u + 7, u + 8, u + 0, u + 8, u + 1), u += 9)
		}

		function v(e, t, i, n) {
			for (var r = vec3.create(), s = e / t, a = -(e - t) / 2, o = 0; o < s; o++) {
				for (var h = -(e - t) / 2, u = 0; u < s; u++)
					if (n && a > n[0] && a < n[1] && h > n[0] && h < n[1]) h += t;
					else {
						if (r[0] = a, r[2] = h, r[1] = i, 0 == o || o == s - 1 || 0 == u || u == s - 1) {
							var c = null,
								l = null;
							0 == o ? c = d : o == s - 1 && (c = f), 0 == u ? l = p : u == s - 1 && (l = m), g(r, t, c, l)
						} else g(r, t);
						h += t
					} a += t
			}
		}
		var b = .5;
		v(e, t, b);
		for (var x = vec2.create(), T = 1; T < i; T++) vec2.set(x, -(e - t) / 2, (e - t) / 2), v(e *= 2, t *= 2, b *= 2, x);
		E.positions = r, E.barycentric = h, E.normals = a, E.uv = s, E.faces = o
	}
}
var GPUTerrain = MeshRendererComponent.extend({
		init: function(e, t, i) {
			this._super(), this.options = FRAK.extend({
				size: 1024,
				verticalScale: 64,
				numCones: 8,
				initialConeSize: 32
			}, i), this.uvSize = Math.pow(2, this.options.numCones - 1) * this.options.initialConeSize, this.heightSource = new TextureDescriptor(e), this.colorSource = new TextureDescriptor(t), this.cameraPosition = vec3.create()
		},
		type: function() {
			return "TerrainComponent"
		},
		onStart: function(e, t) {
			this.height = t.assetsManager.texturesManager.addDescriptor(this.heightSource), this.color = t.assetsManager.texturesManager.addDescriptor(this.colorSource), this.material = new Material(t.assetsManager.addShaderSource("shaders/default/terrain"), {
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
			}, [new Sampler("diffuse0", this.color), new Sampler("height", this.height)]);
			var i = new TerrainMesh;
			i.generate(this.options.initialConeSize, 1, this.options.numCones);
			var n = new Mesh,
				r = new Submesh;
			r.positions = i.positions, r.barycentric = i.barycentric, r.normals = i.normals, r.texCoords2D = [i.uv], r.faces = i.faces, r.calculateTangents(), r.recalculateBounds(), n.addSubmesh(r, this.material), this.node.addComponent(new MeshComponent(n)), this._super(e, t), t.assetsManager.load()
		},
		onPreRender: function(e, t) {
			t.getPosition(this.cameraPosition), this.cameraPosition[1] = 0;
			var i = (this.cameraPosition[0] + this.options.size / 2) / this.options.size,
				n = (this.cameraPosition[2] + this.options.size / 2) / this.options.size;
			vec2.set(this.material.uniforms.uvScale.value, this.uvSize / this.options.size, this.uvSize / this.options.size), vec2.set(this.material.uniforms.uvOffset.value, i, n), this.material.uniforms.verticalScale.value = this.options.verticalScale, this.node.transform.setPosition(this.cameraPosition)
		}
	}),
	Descriptor = Serializable.extend({
		init: function() {
			this._super(), this.source = "", this.parentDescriptor = !1
		},
		included: function() {
			return !0
		},
		excluded: function() {
			return this._super().concat(["parentDescriptor"])
		},
		type: function() {
			return "Descriptor"
		},
		equals: function(e) {
			if (this.type() != e.type()) return !1;
			if (this.getFullPath() != e.getFullPath()) return !1;
			if (this.parentDescriptor && e.parentDescriptor) {
				if (!this.parentDescriptor.equals(e.parentDescriptor)) return !1
			} else if (this.parentDescriptor != e.parentDescriptor) return !1;
			return !0
		},
		getCurrentRelativeDirectory: function() {
			return 0 == this.source.length ? "" : this.source.substring(0, this.source.lastIndexOf("/") + 1)
		},
		getCurrentDirectory: function() {
			var e = "";
			return this.parentDescriptor && (e = this.parentDescriptor.getCurrentDirectory()), e + this.getCurrentRelativeDirectory()
		},
		getParentDirectory: function() {
			return this.parentDescriptor ? this.parentDescriptor.getCurrentDirectory() : ""
		},
		getFullPath: function() {
			return this.getParentDirectory() + this.source
		}
	}),
	TextDescriptor = Descriptor.extend({
		init: function(e) {
			this._super(),
				this.source = e
		},
		type: function() {
			return "TextDescriptor"
		},
		equals: function(e) {
			return !!this._super(e) && this.source == e.source
		}
	}),
	ModelDescriptor = Descriptor.extend({
		init: function(e, t) {
			this._super(), this.source = e, this.format = t || "auto"
		},
		type: function() {
			return "ModelDescriptor"
		},
		getFormat: function() {
			return "auto" == this.format ? this.source.endsWith(".data") ? "binary" : this.source.endsWith(".json") ? "json" : "binary" : this.format
		}
	}),
	ShaderDescriptor = Descriptor.extend({
		init: function(e, t) {
			this._super(), this.fragmentSource = t ? (this.vertexSource = e, t) : (this.vertexSource = e + ".vert", e + ".frag")
		},
		type: function() {
			return "ShaderDescriptor"
		},
		equals: function(e) {
			return !!this._super(e) && (this.vertexSource == e.vertexSource && this.fragmentSource == e.fragmentSource)
		},
		getVertexShaderPath: function() {
			return this.getParentDirectory() + this.vertexSource
		},
		getFragmentShaderPath: function() {
			return this.getParentDirectory() + this.fragmentSource
		}
	}),
	MaterialDescriptor = Descriptor.extend({
		init: function(e, t, i) {
			this._super(), i || (i = []), t || (t = {}), this.shaderDescriptor = e, this.uniforms = t, this.textureDescriptors = i, this.materialResourceDescriptor = !1, this.requirements = {}
		},
		type: function() {
			return "MaterialDescriptor"
		},
		equals: function(e) {
			return !1
		}
	}),
	MaterialSource = Descriptor.extend({
		init: function(e) {
			this._super(), this.material = !1, this.sourceDescriptor = e
		},
		type: function() {
			return "MaterialSource"
		},
		equals: function(e) {
			return !1
		}
	}),
	MaterialSourceDescriptor = Descriptor.extend({
		init: function(e) {
			this._super(), this.source = e
		},
		type: function() {
			return "MaterialSourceDescriptor"
		},
		equals: function(e) {
			return this.source == e.source
		}
	}),
	TextureDescriptor = Descriptor.extend({
		init: function(e, t, i) {
			this._super(), this.source = e, this.width = t, this.height = i
		},
		type: function() {
			return "TextureDescriptor"
		},
		equals: function(e) {
			return !!this._super(e) && (this.source == e.source && this.width == e.width && height == e.height)
		}
	}),
	CubeTextureDescriptor = Descriptor.extend({
		init: function(e) {
			this._super(), this.sources = e || []
		},
		type: function() {
			return "CubeTextureDescriptor"
		},
		equals: function(e) {
			if (!this._super(e)) return !1;
			if (this.sources.length != e.sources.length) return !1;
			for (var t = 0; t < this.sources.length; t++)
				if (this.sources[t] != e.sources[t]) return !1;
			return !0
		},
		getFaceFullPath: function(e) {
			if (e < 0 || e > this.sources.length) throw "CubeTextureDescriptor.getFaceFullPath: index out of bounds";
			this.source = this.sources[e];
			var t = this.getFullPath();
			return this.source = "", t
		}
	}),
	EmptyNode = Serializable.extend({
		init: function(e) {
			this._super(), this.name = e || "Empty Node", this.subnodes = [], this.components = [], this.scene = !1, this.parent = !1, this.layer = 1, this.tags = [], this._super()
		},
		excluded: function() {
			return ["parent", "scene"]
		},
		type: function() {
			return "EmptyNode"
		},
		addNode: function(e) {
			if (!(e instanceof EmptyNode)) throw "addNode: The given node is not a subclass of EmptyNode";
			this.subnodes.push(e);
			var t = this;
			return e.parent = this, e.onEachChild(function(e) {
				e.scene = t.scene
			}), e.scene && e.onEachChildComponent(function(e) {
				e.onAddScene(t), e.node.onAddComponent(e)
			}), e.onAdd(this), t.scene.engine && e.onEachChildComponent(function(e) {
				e.started || (t.scene.starting || !1 === t.scene.started ? t.scene.startingQueue.push(e) : (e.onLoad(t.scene.engine.assetsManager, t.scene.engine), e.start(t.scene.engine.context, t.scene.engine), e.started = !0))
			}), e
		},
		removeNode: function(e) {
			var t = this;
			this.scene.engine && e.onEachChildComponent(function(e) {
				e.started && e.onEnd(t.scene.engine.context, t.scene.engine), e.started = !1
			}), e.onRemove(this), e.scene && e.onEachChildComponent(function(e) {
				e.onRemoveScene(t), e.node.onRemoveComponent(e)
			}), e.onEachChild(function(e) {
				e.scene = !1
			}), e.parent = !1;
			for (var i = 0; i < this.subnodes.length; i++)
				if (this.subnodes[i] == e) {
					this.subnodes.splice(i, 1);
					break
				} return e
		},
		removeSubnodes: function() {
			for (var e = this.subnodes.slice(0), t = 0; t < e.length; t++) this.removeNode(e[t])
		},
		addComponent: function(e) {
			if (!e.type()) throw "Unable to add a component that doesn't define it's type by returning it from type() method";
			return this.components.push(e), e.node = this, e.onAdd(this), this.scene && (e.onAddScene(this), this.onAddComponent(e)), !e.started && this.scene && this.scene.engine && (this.scene.started || this.scene.starting) && (e.start(this.scene.engine.context, this.scene.engine), e.started = !0), e
		},
		removeComponent: function(e) {
			for (var t = 0; t < this.components.length; t++)
				if (this.components[t] === e) {
					this.components.splice(t, 1);
					break
				} return this.scene.engine && e.started && (e.onEnd(this.scene.engine.context, this.scene.engine), e.started = !1), this.scene && (e.onRemoveScene(this), this.onRemoveComponent(e)), e.onRemove(this), e.node = !1, e
		},
		removeComponentsByType: function(e) {
			for (var t = [], i = 0; i < this.components.length; i++) this.components[i] instanceof e && (t.push(this.components[i]), this.components.splice(i, 1), i--);
			for (i = 0; i < t.length; i++) this.scene.engine && t[i].started && (t[i].onEnd(this.scene.engine.context, this.scene.engine), t[i].started = !1), this.scene && (t[i].onRemoveScene(this), this.onRemoveComponent(t[i])), t[i].onRemove(this), t[i].node = !1;
			return t
		},
		getComponent: function(e) {
			for (var t = 0; t < this.components.length; t++)
				if (this.components[t] instanceof e) return this.components[t];
			return !1
		},
		getComponents: function(e) {
			for (var t = [], i = 0; i < this.components.length; i++) this.components[i] instanceof e && t.push(this.components[i]);
			return 0 != t.length && t
		},
		calculateRelativeFromAbsolute: function() {
			this.parent.transform && this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute)
		},
		instantiate: function() {
			var e = new EmptyNode(this.name);
			e.isInstanced = !0, e.layer = this.layer, e.tags = this.tags.slice(0);
			for (var t = 0; t < this.subnodes.length; t++) e.addNode(this.subnodes[t].instantiate());
			for (var i = 0; i < this.components.length; i++) e.addComponent(this.components[i].instantiate());
			return e
		},
		enable: function(e) {
			e ? this.onEachComponent(function(e) {
				e.enable()
			}) : this.onEachChildComponent(function(e) {
				e.enable()
			})
		},
		disable: function(e) {
			e ? this.onEachComponent(function(e) {
				e.disable()
			}) : this.onEachChildComponent(function(e) {
				e.disable()
			})
		},
		onAdd: function(e) {},
		onRemove: function(e) {},
		onAddComponent: function(e) {
			this.scene.components.push(e), e.onUpdate != Component.prototype.onUpdate && this.scene.updatedComponents.push(e), e.onPreRender != Component.prototype.onPreRender && this.scene.preRenderedComponents.push(e), e.onPostRender != Component.prototype.onPostRender && this.scene.postRenderedComponents.push(e)
		},
		onRemoveComponent: function(e) {
			function t(e, t) {
				var i = e.indexOf(t); - 1 == i || e.splice(i, 1)
			}
			t(this.scene.components, e), e.onUpdate != Component.prototype.onUpdate && t(this.scene.updatedComponents, e), e.onPreRender != Component.prototype.onPreRender && t(this.scene.preRenderedComponents, e), e.onPostRender != Component.prototype.onPostRender && t(this.scene.postRenderedComponents, e)
		},
		onEachChild: function(e) {
			if (!0 === e(this)) return !0;
			for (var t = 0; t < this.subnodes.length; t++)
				if (!0 === this.subnodes[t].onEachChild(e)) return !0
		},
		onEachChildExclusive: function(e) {
			for (var t = 0; t < this.subnodes.length; t++)
				if (!0 === this.subnodes[t].onEachChild(e)) return !0
		},
		onEachDirectChild: function(e) {
			for (var t = 0; t < this.subnodes.length; t++)
				if (!0 === e(this.subnodes[t])) return !0
		},
		onEachComponent: function(e) {
			for (var t = 0; t < this.components.length; t++)
				if (!0 === e(this.components[t])) return !0
		},
		onEachChildComponent: function(t) {
			this.onEachChild(function(e) {
				if (!0 === e.onEachComponent(t)) return !0
			})
		},
		onEachChildComponentExclusive: function(t) {
			this.onEachChildExclusive(function(e) {
				if (!0 === e.onEachComponent(t)) return !0
			})
		},
		getChildComponentsOfType: function(t) {
			var i = [];
			return this.onEachChildComponent(function(e) {
				e instanceof t && i.push(e)
			}), i
		},
		find: function(e) {
			var t = e.split("/");
			if (0 == t.length) return !1;
			var i = this;
			if ("" === t[0]) {
				if (!this.scene) return !1;
				i = this.scene.root, t.shift()
			}
			for (var n = 0; n < t.length; n++)
				if (!1 === (i = i.findChildWithName(t[n]))) return !1;
			return i
		},
		findChildWithName: function(e) {
			for (var t = 0; t < this.subnodes.length; t++)
				if (this.subnodes[t].name === e) return this.subnodes[t];
			return !1
		},
		path: function() {
			for (var e = [], t = this; t;) e.push(t.name), t = t.parent;
			return "/" + e.reverse().join("/")
		}
	}),
	Node = EmptyNode.extend({
		init: function(e) {
			this._super(e), this.name = e || "Node", this.transform = this.addComponent(new Transform), this.localCollisionID = -1
		},
		excluded: function() {
			return this._super().concat(["transform"])
		},
		type: function() {
			return "Node"
		},
		getBoundingBox: function(t) {
			var i = new BoundingBox;
			return this.onEachChildComponent(function(e) {
				e
				instanceof MeshRendererComponent && i.encapsulateBox(e.getBoundingBox(t))
			}), i
		},
		getBoundingSphere: function(t) {
			var i = new BoundingSphere;
			return this.onEachChildComponent(function(e) {
				e instanceof MeshRendererComponent && i.encapsulateSphere(e.getBoundingSphere(t))
			}), i
		},
		instantiate: function() {
			var e = new Node(this.name);
			e.isInstanced = !0, e.localCollisionID = this.localCollisionID, e.removeComponentsByType(Transform), e.layer = this.layer, e.tags = this.tags.slice(0);
			for (var t = 0; t < this.subnodes.length; t++) e.addNode(this.subnodes[t].instantiate());
			for (var i = 0; i < this.components.length; i++) e.addComponent(this.components[i].instantiate());
			return e.transform = e.getComponent(Transform), e
		},
		updateChildTransforms: function() {
			var e, t, i = this.transform.absolute,
				n = this.subnodes;
			for (e = 0; e < n.length; e++) {
				var r = n[e];
				r.transform && (mat4.multiply(r.transform.absolute, i, r.transform.relative), r.updateChildTransforms())
			}
			for (t = 0; t < this.components.length; t++) this.components[t].onUpdateTransform(i)
		},
		setAbsolutePosition: function(e) {
			this.parent && this.parent.transform ? (mat4.fromRotationTranslationScale(this.transform.absolute, quat.fromMat4(quat.create(), this.transform.absolute), e, mat4.getScale(vec3.create(), this.transform.absolute)), this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute)) : this.transform.calculateRelativeFromAbsolute()
		}
	}),
	Scene = Serializable.extend({
		init: function() {
			this.root = new Node, (this.root.scene = this).dynamicSpace = new DynamicSpace, this.cameras = [], this.lights = [], this.engine = !1, this.starting = !1, this.started = !1, this.startingQueue = [], this.components = [], this.preRenderedComponents = [], this.postRenderedComponents = [], this.updatedComponents = [];
			var r = this;
			this.processPreRenderList = function(e, t) {
				for (var i = 0; i < r.preRenderedComponents.length; i++) {
					var n = r.preRenderedComponents[i];
					n.node.layer & t.layerMask && (e.modelview.push(), e.modelview.multiply(n.node.transform.absolute), n.onPreRender(e, t), e.modelview.pop())
				}
			}, this.processPostRenderList = function(e, t) {
				for (i = 0; i < r.postRenderedComponents.length; i++) {
					var n = r.postRenderedComponents[i];
					n.node.layer & t.layerMask && (e.modelview.push(), e.modelview.multiply(n.node.transform.absolute), n.onPostRender(e, t), e.modelview.pop())
				}
			}
		},
		fields: function() {
			return ["root"]
		},
		start: function(n) {
			if (!this.started && !this.starting) {
				this.starting = !0;
				var r = this;
				this.root.onEachChildComponent(function(e) {
					e.enabled && (e.started || e.onLoad(r.engine.assetsManager, r.engine))
				});
				! function() {
					r.root.updateChildTransforms(), r.root.onEachChildComponent(function(e) {
						e.enabled && (e.started || r.startingQueue.push(e))
					});
					var i = null;
					(i = function() {
						for (var e = (new Date).getTime() + 50;
							(new Date).getTime() < e;) {
							if (0 === r.startingQueue.length) return r.started = !0, r.starting = !1, void("function" == typeof r.engine.sceneStarted && r.engine.sceneStarted());
							var t = r.startingQueue.shift();
							t.started || (t.start(n, r.engine), t.started = !0)
						}
						setTimeout(i, 10)
					})()
				}()
			}
		},
		end: function(t, i) {
			this.started && (this.root.updateChildTransforms(), this.root.onEachChildComponent(function(e) {
				e.enabled && e.started && (e.onEnd(t, i), e.started = !1)
			}), this.started = !1)
		},
		render: function(e) {
			if (this.started)
				for (var t = 0; t < this.cameras.length; t++) this.cameras[t].render(e, this, this.processPreRenderList, this.processPostRenderLists)
		},
		update: function(e) {
			if (this.started) {
				for (var t = 1, i = 0; i < t; i++)
					for (var n = 0; n < this.updatedComponents.length; ++n) {
						var r = this.updatedComponents[n];
						r.enabled && (i < r.updatePasses && r.started && r.onUpdate(e, i), t < r.updatePasses && (t = r.updatePasses))
					}
				this.root.updateChildTransforms()
			}
		},
		getMaterials: function() {
			var i = [];
			return this.root.onEachChildComponent(function(e) {
				if (e instanceof MeshComponent)
					for (var t in e.mesh.materials) i.push(e.mesh.materials[t])
			}), i
		}
	}),
	DefaultScene = Scene.extend({
		init: function() {
			this._super(), this.root.name = "Root", this.cameraNode = new Node("Camera"), this.cameraComponent = this.cameraNode.addComponent(new PerspectiveCamera), this.cameraComponent.aspect = !1, this.camera = this.cameraComponent.camera, this.root.addNode(this.cameraNode), this.lightNode = new Node("Light"), this.light = new DirectionalLight, this.light.color = new Color(1, 1, 1, 1), this.light.intensity = 1, this.light.setLightDirection(vec3.fromValues(.9, 1, .9)), this.lightNode.addComponent(this.light), this.root.addNode(this.lightNode)
		}
	}),
	FPS = FrakClass.extend({
		init: function() {
			this.frametime = 0, this.lastMeasurement = (new Date).getTime(), this.averageMultiplier = .95, this.delta = 0
		},
		measure: function() {
			var e = FRAK.timestamp();
			0 < e - this.lastMeasurement && (this.frametime = this.frametime * this.averageMultiplier + this.delta * (1 - this.averageMultiplier), this.delta = e - this.lastMeasurement), this.lastMeasurement = e
		},
		getAverage: function() {
			return this.frametime <= 0 ? 0 : 1e3 / this.frametime
		},
		getDelta: function() {
			return this.delta
		}
	}),
	Engine = FrakClass.extend({
		init: function(e, t, i) {
			if (console.log("Engine"), t || (t = {}), this.options = FRAK.extend({
					assetsPath: "",
					defaultRequestedFPS: 30,
					requestedFPS: 30,
					anisotropicFiltering: 4,
					useVAO: !0,
					debug: !1,
					antialias: !1,
					ssao: !1,
					transparencyMode: "default",
					renderer: "default",
					softShadows: !1,
					runInBackground: !1,
					context: !1,
					contextErrorCallback: null,
					webGLVersion: "auto"
				}, t), this.validateOptions(e), this.context = this.options.context, this.context.engine = this, i || (i = new DefaultScene), this.scene = i, (this.scene.engine = this).fps = new FPS, this.running = !1, this.input = !1, this.assetsManager = new AssetsManager(this.context, this.options.assetsPath), this.WhiteTexture = new Texture(this.context), this.WhiteTexture.name = "WhiteTexture", this.WhiteTexture.mipmapped = !1, this.WhiteTexture.clearImage(this.context, [255, 255, 255, 255]), this.WhiteTextureSampler = new Sampler("tex0", this.WhiteTexture), this.DiffuseFallbackSampler = new Sampler("diffuse0", this.WhiteTexture), document.addEventListener("visibilitychange", FrakCallback(this, this.onVisibilityChange)), this.context.canvas.addEventListener("webglcontextlost", FrakCallback(this, this.onContextLost), !1), this.context.canvas.addEventListener("webglcontextrestored", FrakCallback(this, this.onContextRestored), !1), FRAK.fullscreenEnabled) {
				this.useUpscaling = !1;
				var n = FrakCallback(this, this.onFullscreenChange);
				document.addEventListener("fullscreenchange", n), document.addEventListener("webkitfullscreenchange", n), document.addEventListener("mozfullscreenchange", n), document.addEventListener("MSFullscreenChange", n)
			}
			this.setupInput()
		},
		onContextLost: function(e) {
			console.log("FRAK: Rendering context lost"), e.preventDefault(), this.pause()
		},
		onContextRestored: function(e) {
			console.log("FRAK: Rendering context restored"), (this.context.engine = this).context.restore(), this.run()
		},
		onVisibilityChange: function() {
			if (!this.options.runInBackground)
				if (document.hidden) {
					if (!1 === this.running) return void(this._externallyPaused = !0);
					this.pause()
				} else {
					if (this._externallyPaused) return void delete this._externallyPaused;
					this.run()
				}
		},
		onFullscreenChange: function() {
			if (this.context instanceof RenderingContext)
				if (FRAK.isFullscreen()) {
					var r = this.context.canvas;
					this._savedCanvasStyles = {
						position: r.style.position,
						left: r.style.left,
						right: r.style.right,
						top: r.style.top,
						bottom: r.style.bottom,
						width: r.style.width,
						height: r.style.height,
						canvasWidth: r.getAttribute("width"),
						canvasHeight: r.getAttribute("height"),
						aspectRatio: this.scene.cameraComponent.aspect
					}, r.style.position = "absolute", r.style.left = 0, r.style.right = 0, r.style.top = 0, r.style.bottom = 0, r.style.width = "100%", r.style.height = "100%";
					var s = this;
					setTimeout(function() {
						var e = r.getBoundingClientRect();
						if (s.scene.cameraComponent.setAspectRatio(e.width / e.height), !s.useUpscaling) {
							var t = s.context.gl,
								i = t.canvas.clientWidth,
								n = Math.max(1, t.canvas.clientHeight);
							r.setAttribute("width", i), r.setAttribute("height", n), s.scene.camera.target.setSize(t.drawingBufferWidth, t.drawingBufferHeight)
						}
					}, 2e3 / this.options.requestedFPS)
				} else if (this._savedCanvasStyles) {
				if ((r = this.context.canvas).style.position = this._savedCanvasStyles.position, r.style.left = this._savedCanvasStyles.left, r.style.right = this._savedCanvasStyles.right, r.style.top = this._savedCanvasStyles.top, r.style.bottom = this._savedCanvasStyles.bottom, r.style.width = this._savedCanvasStyles.width, r.style.height = this._savedCanvasStyles.height, this._savedCanvasStyles.aspectRatio && this.scene.cameraComponent.setAspectRatio(this._savedCanvasStyles.aspectRatio), !this.useUpscaling) {
					r.setAttribute("width", this._savedCanvasStyles.canvasWidth), r.setAttribute("
						height ",this._savedCanvasStyles.canvasHeight);var e=this.context.gl;this.scene.camera.target.setSize(e.drawingBufferWidth,e.drawingBufferHeight)}delete this._savedCanvasStyles}},setupInput:function(){this.input=new Input(this,this.context.canvas)},run:function(){if(!1===this.running){var t;this.running=!0;var i,n=FRAK.timestamp(),r=1e3/this.options.requestedFPS,s=this;this.scene.started||this.scene.start(this.context,this),this._currentAnimationFrame=FRAK.requestAnimationFrame(function e(){t=FRAK.timestamp(),r<(i=t-n)&&(n=t-i%r,s.frame()),s.running&&(s._currentAnimationFrame=FRAK.requestAnimationFrame(e))})}},sceneStarted:function(){},stop:function(){this.pause(),this.scene.started&&this.scene.end(this.context)},pause:function(){this.running=!1,this._currentAnimationFrame&&FRAK.cancelAnimationFrame(this._currentAnimationFrame)},togglePause:function(){!1===this.running?this.run():this.pause()},requestFullscreen:function(e){FRAK.fullscreenEnabled?(this.useUpscaling=e,FRAK.requestFullscreen(this.context.canvas)):console.warn("
						FRAK: Fullscreen API is disabled in this browser.
						")},exitFullscreen:function(){FRAK.fullscreenEnabled?FRAK.exitFullscreen():console.warn("
						FRAK: Fullscreen API is disabled in this browser.
						")},startIdle:function(e){e||(e=1),this.options.requestedFPS=e,this.pause(),this.run()},stopIdle:function(){this.options.requestedFPS=this.options.defaultRequestedFPS,this.pause(),this.run()},frame:function(){(this.context.engine=this).input.update(this),this.scene.update(this),this.scene.render(this.context),this.fps.measure()},validateOptions:function(e){this.options.context||(this.options.context=new RenderingContext(e,null,this.options.contextErrorCallback,this.options.webGLVersion));var t=this.options.context.gl;switch(this.options.transparencyMode){case"
						sorted ":case"
						blended ":case"
						stochastic ":break;default:this.options.transparencyMode="
						blended "}if("
						sorted "!=this.options.transparencyMode){var i=t.getExtension("
						OES_texture_float "),n=t.getExtension("
						OES_texture_half_float ");i||n||(this.options.transparencyMode="
						sorted ")}switch(this.options.renderer){case"
						auto ":t.getExtension("
						WEBGL_draw_buffers ")&&t.getExtension("
						OES_texture_float ")&&t.getExtension("
						OES_standard_derivatives ")?this.options.renderer="
						deferred ":this.options.renderer="
						forward ";break;case"
						deferred ":case"
						forward ":break;default:this.options.renderer="
						forward "}},resize:function(){if(this.context instanceof RenderingContext){var e=this.context.gl;e.canvas.clientWidth,Math.max(1,e.canvas.clientHeight);this.scene.cameraComponent.setAspectRatio(e.drawingBufferWidth/e.drawingBufferHeight),this.scene.camera.target.setSize(e.drawingBufferWidth,e.drawingBufferHeight)}},stats:function(){if(this.scene){var e=this.scene.camera.renderStage.generator.organizer;console.log(" === === === === === Statistics === === === === === === === "),console.log("
						Visible faces(opaque / transparent): {
							0
						}
						/{1}".format(e.visibleSolidFaces,e.visibleTransparentFaces)),console.log("  Visible renderers (opaque/transparent): {
						0
					}
					/{1}".format(e.visibleSolidRenderers,e.visibleTransparentRenderers)),console.log("  Visible batches (opaque/transparent): {
					0
				}
				/{1}".format(e.visibleSolidBatches,e.visibleTransparentBatches)),console.log("================================================")}}}),Input=FrakClass.extend({init:function(e,t){this.controllers=[],this.engine=e,this.canvas=t,this.lastPinch=0,this.lastRotation=0,this.buttons=[!1,!1,!1],this.button=-1,this.position=vec2.create(),this.delta=vec2.create(),this.lastDelta=vec2.create(),this.deltaChange=vec2.create(),this.scrollDelta=0,this.hammertime=HammerWF(this.canvas),this.hammertime.get("pinch").set({enable:!0}),this.hammertime.get("rotate").set({enable:!0}),this.hammertime.get("pan").set({threshold:0,pointers:0}),this.singlepan=new HammerWF.Pan({event:"pan",direction:HammerWF.DIRECTION_ALL,threshold:5,pointers:1}),this.hammertime.add(this.singlepan),this.bindings={},this.keyStates={},this.wfPanEnabled=!1,this.keymap={enter:13,escape:27,backspace:8,tab:9,shift:16,ctrl:17,alt:18,pause:19,caps_lock:20,space:32,page_up:33,page_down:34,end:35,home:36,left_arrow:37,
				up_arrow: 38, right_arrow: 39, down_arrow: 40, insert: 45, delete: 46, left_window_key: 91, right_window_key: 92, select_key: 93, numpad_0: 96, numpad_1: 97, numpad_2: 98, numpad_3: 99, numpad_4: 100, numpad_5: 101, numpad_6: 102, numpad_7: 103, numpad_8: 104, numpad_9: 105, multiply: 106, add: 107, subtract: 109, decimal_point: 110, divide: 111, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123, num_lock: 144, scroll_lock: 145, semi_colon: 186, equal_sign: 187, comma: 188, dash: 189, period: 190, forward_slash: 191, grave_accent: 192, open_bracket: 219, back_slash: 220, close_braket: 221, single_quote: 222, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90
			}, this.setup()
		},
		setup: function() {
			this.registerKeyboardEvents(), this.registerPointerEvents()
		},
		registerController: function(e) {
			return this.controllers.push(e), !0
		},
		registerPointerEvents: function() {
			this.hammertime && (this.hammertime.on("pinch", FrakCallback(this, this.onPinch)), this.hammertime.on("pinchend", FrakCallback(this, this.onPinchEnd)), this.hammertime.on("tap", FrakCallback(this, this.onTap)), this.hammertime.on("transformstart", FrakCallback(this, this.onTransformStart)), this.hammertime.on("panstart", FrakCallback(this, this.onPanStart)), this.hammertime.on("panend", FrakCallback(this, this.onPanEnd)), this.hammertime.on("rotate", FrakCallback(this, this.onRotate)), this.hammertime.on("rotateend", FrakCallback(this, this.onRotateEnd)), this.hammertime.on("touch", FrakCallback(this, this.onTouch)), this.hammertime.on("panleft panright panup pandown", FrakCallback(this, this.onPan))), this.canvas.addEventListener("mousewheel", FrakCallback(this, this.onMouseWheel)), this.canvas.addEventListener("DOMMouseScroll", FrakCallback(this, this.onMouseWheelMOZ)), this.canvas.addEventListener("contextmenu", function(e) {
				e.preventDefault()
			}, !1)
		},
		registerKeyboardEvents: function() {
			this.canvas && (this.canvas.addEventListener("keydown", FrakCallback(this, this.onKeyDown)), this.canvas.addEventListener("keyup", FrakCallback(this, this.onKeyUp)), this.canvas.focus && this.canvas.focus())
		},
		unregisterController: function(e) {
			var t = this.controllers.indexOf(e);
			return -1 < t && (this.controllers.splice(t, 1), !0)
		},
		bind: function(e, t, i) {
			e && t && i && (e in this.keymap ? this.bindings[this.keymap[e]] = [i, t] : this.bindings[e.charCodeAt(0)] = [i, t])
		},
		sendEvent: function(i) {
			if (this.engine.running) {
				var e = Array.prototype.slice.call(arguments, 0);
				e = e.slice(1, e.length);
				for (var t = [], n = 0; n < this.controllers.length; n++) this.controllers[n][i] && t.push(this.controllers[n]);
				t.sort(function(e, t) {
					return t.getPriority(i) - e.getPriority(i)
				});
				for (n = 0; n < t.length && !0 !== t[n][i].apply(t[n], e); n++);
			}
		},
		translateCoordinates: function(e, t, i) {
			var n = this.canvas.getBoundingClientRect(),
				r = t - n.left,
				s = i - n.top;
			return vec2.set(e, r, s)
		},
		onTap: function(e) {
			if (e) {
				var t;
				this.translateCoordinates(this.position, e.center.x, e.center.y);
				for (this.setMouseButtons(e.frakButtons), t = 0; t < this.buttons.length && !this.buttons[t]; t++);
				t == this.buttons.length && (t = 0), this.sendEvent("onClick", this.position, t, e.pointerType, e), this.resetMouseButtons()
			}
		},
		onPan: function(e) {
			e && (e.preventDefault(), vec2.set(this.deltaChange, e.deltaX, e.deltaY), vec2.sub(this.deltaChange, this.deltaChange, this.lastDelta), vec2.set(this.lastDelta, e.deltaX, e.deltaY), this.setMouseButtons(e.frakButtons), this.translateCoordinates(this.position, e.center.x, e.center.y), Math.max(vec2.len(this.deltaChange)) < 100 && ("touch" == e.pointerType ? this.sendEvent("onPan", this.position, this.deltaChange, e.pointerType, e) : this.sendEvent("onMouseMove", this.position, this.button, this.deltaChange, e.pointerType, e)))
		},
		onPanStart: function(e) {
			e && (this.setMouseButtons(e.frakButtons), this.translateCoordinates(this.position, e.center.x, e.center.y), this.sendEvent("onButtonDown", this.position, this.button, 0, e.pointerType, e))
		},
		onPanEnd: function(e) {
			vec2.set(this.lastDelta, 0, 0), e && (this.setMouseButtons(e.frakButtons), this.translateCoordinates(this.position, e.center.x, e.center.y), this.sendEvent("onButtonUp", this.position, this.button, 0, e.pointerType, e), this.resetMouseButtons())
		},
		onTouch: function() {
			console.info("onTouch in frak")
		},
		onTransformStart: function(e) {
			e.gesture.preventDefault(), e.gesture && (this.lastRotation = e.gesture.rotation)
		},
		onPinch: function(e) {
			if (e.preventDefault(), e) {
				this.translateCoordinates(this.position, e.clientX, e.clientY);
				var t = e.scale - this.lastPinch;
				this.lastPinch = e.scale - 1, this.sendEvent("onPinch", this.position, t, "touch", e)
			}
		},
		onPinchEnd: function() {
			this.lastPinch = 0
		},
		onRotate: function(e) {
			if (e) {
				this.translateCoordinates(this.position, e.clientX, e.clientY);
				var t = e.rotation - this.lastRotation;
				this.lastRotation = e.rotation, Math.max(t) < 10 && this.sendEvent("onRotate", this.position, t, "touch", e)
			}
		},
		onRotateEnd: function(e) {
			this.lastRotation = 0
		},
		onMultiDrag: function(e) {
			console.log("Multi drag in frak")
		},
		onMouseWheel: function(e) {
			if (e) {
				e.preventDefault();
				var t = 0;
				t = "wheelDelta" in e ? e.wheelDelta < 0 ? 1 : 0 < e.wheelDelta ? -1 : 0 : 0 < e.deltaY ? 1 : e.deltaY < 0 ? -1 : 0, this.scrollDelta += e.deltaY, this.translateCoordinates(this.position, e.clientX, e.clientY), this.sendEvent("onMouseWheel", this.position, this.scrollDelta, t, "mouse", e)
			}
		},
		onMouseWheelMOZ: function(e) {
			if (e) {
				e.preventDefault();
				var t = 0 < e.detail ? 1 : e.detail < 0 ? -1 : 0;
				this.scrollDelta += e.detail, this.translateCoordinates(this.position, e.clientX, e.clientY), this.sendEvent("onMouseWheel", this.position, this.scrollDelta, t, "mouse", e)
			}
		},
		onKeyDown: function(e) {
			e && (this.sendEvent("onKeyDown", e.which, "keyboard", e), this.sendEvent("onKeyStateChange", e.which, !0, "keyboard", e), this.keyStates[e.which] = !0)
		},
		onKeyUp: function(e) {
			e && (this.sendEvent("onKeyUp", e.which, "keyboard", e), this.sendEvent("onKeyStateChange", e.which, !1, "keyboard", e), delete this.keyStates[e.which])
		},
		update: function() {
			this.processKeyEvents()
		},
		processKeyEvents: function() {
			for (var e in this.keyStates)
				if (this.bindings[e]) {
					var t = this.bindings[e];
					t && "object" == typeof t[0] && "string" == typeof t[1] && t[0][t[1]](this.engine.fps.getDelta() / 1e3, e)
				}
		},
		setMouseButtons: function(e) {
			if (e && !(e.length < 3)) {
				this.button = -1;
				for (var t = 0; t < 3; t++) this.buttons[t] = e[t], !0 === e[t] && (this.button = t)
			}
		},
		resetMouseButtons: function() {
			this.button = -1, this.buttons[0] = !1, this.buttons[1] = !1, this.buttons[2] = !1
		}
	});
HammerWF.MouseInput.prototype.handler = function(e) {
	if ("mousedown" == e.type && (this.pressed = !0), this.pressed && this.allow) {
		"mouseup" == e.type && (this.pressed = !1);
		var t = [!1, !1, !1];
		"buttons" in e ? (t[0] = !!(1 & e.buttons), t[1] = !!(4 & e.buttons), t[2] = !!(2 & e.buttons)) : "button" in e && (t[e.button] = !0);
		this.callback(this.manager, {
			mousedown: 1,
			mousemove: 2,
			mouseup: 4
		} [e.type], {
			pointers: [e],
			changedPointers: [e],
			pointerType: "mouse",
			srcEvent: e,
			frakButtons: t
		})
	}
}, HammerWF.PointerEventInput.prototype.handler = function(e) {
	var t = this.store,
		i = !1,
		n = {
			2: "touch",
			3: "pen",
			4: "mouse",
			5: "kinect"
		};
	var r = {
			pointerdown: 1,
			pointermove: 2,
			pointerup: 4,
			pointercancel: 8,
			pointerout: 8
		} [e.type.toLowerCase().replace("ms", "")],
		s = n[e.pointerType] || e.pointerType,
		a = function(e, t, i) {
			if (e.indexOf && !i) return e.indexOf(t);
			for (var n = 0; n < e.length;) {
				if (i && e[n][i] == t || !i && e[n] === t) return n;
				n++
			}
			return -1
		}(t, e.pointerId, "pointerId");
	if (1 & r ? a < 0 && (t.push(e), a = t.length - 1) : 12 & r && (i = !0), !(a < 0)) {
		var o = [!!(1 & (t[a] = e).buttons), !!(4 & e.buttons), !!(2 & e.buttons)];
		this.callback(this.manager, r, {
			pointers: t,
			changedPointers: [e],
			pointerType: s,
			srcEvent: e,
			frakButtons: o
		}), i && t.splice(a, 1)
	}
};