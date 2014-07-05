// Shader for rendering linear depth values into RGBA texture
precision highp float; 

uniform mat4 modelview;
uniform float linearDepthConstant;

/** Packing Type:
	1 - packs depth value into RGBA
	2 - packs depth into RG and depth*depth into BA
**/
uniform int packingType;

varying vec4 viewPosition;

vec4 pack(float depth) {
	const vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	const vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
	vec4 comp = fract(depth * bitShift);
	comp -= comp.xxyz * bitMask;
	return comp;
}

vec2 packHalf(float depth) {
	const vec2 bias = vec2(1.0 / 255.0, 0.0);
	vec2 c = vec2(depth, fract(depth * 255.0));
	return c - (c.yy * bias);
}

void main () {
	if (packingType==2) {
		gl_FragColor = vec4(packHalf(gl_FragCoord.z), packHalf(gl_FragCoord.z*gl_FragCoord.z));
	}
	else {
		gl_FragColor = pack(gl_FragCoord.z); // less precision, but works on most systems
		// float linearDepth = length(viewPosition) * linearDepthConstant;
		// gl_FragColor = pack(linearDepth);
	}
}
