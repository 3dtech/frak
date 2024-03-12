#version 300 es

/** Directional light shadow-map */
precision highp float;

in float depth;
in vec2 uv0;
out vec4 fragColor;

#include "snippets/pbr.glsl"

void main() {
	vec4 outputColor = diffuseValue();

#if ALPHAMODE == ALPHAMODE_OPAQUE
	outputColor.a = 1.0;
#endif

	float d = (depth + 1.0) * 0.5;
	float dx = dFdx(d);
	float dy = dFdy(d);

	fragColor = vec4(d, pow(d, 2.0) + 0.25*(dx * dx + dy * dy), 0.0, 1.0);

#if ALPHAMODE == ALPHAMODE_MASK
	if (outputColor.a < alphaCutoff) {
		discard;
	}
	outputColor.a = 1.0;
#elif ALPHAMODE == ALPHAMODE_BLEND
	// Only render opaque parts of transparent geometry
	if (outputColor.a < 0.99) {
		discard;
	}
#endif
}
