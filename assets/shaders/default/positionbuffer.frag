//Normal buffer
precision highp float;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

uniform mat4 modelview;

varying vec4 worldPosition;
varying vec4 viewPosition;
varying vec3 worldNormal;
varying vec3 viewNormal;

vec2 packHalf(float depth) {
	const vec2 bias = vec2(1.0 / 255.0, 0.0);
	vec2 c = vec2(depth, fract(depth * 255.0));
	return c - (c.yy * bias);
}

vec4 pack(float depth) {
	const vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	const vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
	vec4 comp = fract(depth * bitShift);
	comp -= comp.xxyz * bitMask;
	return comp;
}

void main() {
    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
    vec2 xy = gl_FragCoord.xy * inverseVP;
    xy /= 2.56;
    float linDepth = (-viewPosition.z - zNear) / (zFar - zNear);
    //gl_FragColor = vec4(linDepth, linDepth, linDepth, 1.0);
    gl_FragColor = vec4(xy, linDepth, 1.0);
}