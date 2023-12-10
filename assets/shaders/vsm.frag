#version 300 es

/** Directional light shadow-map */
precision highp float;

uniform float alphaCutoff;
uniform vec4 diffuse;

#ifdef DIFFUSE_TEXTURE
uniform sampler2D diffuse0;

#ifdef DIFFUSE_UV_TRANSFORM
uniform mat3 diffuseUVTransform;
#endif
#endif

in float depth;
in vec2 uv0;
out vec4 fragColor;

vec2 diffuseUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef DIFFUSE_UV_TRANSFORM
	uv = diffuseUVTransform * uv;
#endif

	return uv.xy;
}

void main() {
	vec4 outputColor = diffuse;
#ifdef DIFFUSE_TEXTURE
	outputColor *= texture(diffuse0, diffuseUV());
#endif

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
