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

vec4 pack(float depth) {
	const vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	const vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
	vec4 comp = fract(depth * bitShift);
	comp -= comp.xxyz * bitMask;
	return comp;
}

void main() {
    float linDepth = (-viewPosition.z - zNear) / (zFar - zNear);
    gl_FragColor = pack(linDepth);
}