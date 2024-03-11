#version 300 es

precision highp float;

#include "snippets/camera.glsl"

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;

in vec2 uv0;
in vec4 worldPosition;
in vec3 worldNormal;

#ifdef VERTEX_TANGENTS
in vec4 worldTangent;
#endif

#ifdef VERTEX_COLORS
in vec4 vertexColor;
#endif

in vec4 viewPosition;
in vec3 viewNormal;
in vec4 shadowPosition;

#include "snippets/pbr.glsl"

// TODO: Optionally limit number of buffers
layout(location = 0) out vec4 fragColorMetallic;
layout(location = 1) out vec4 fragNormalRoughness;
layout(location = 2) out vec4 fragPositionOcclusion;
#ifdef EMISSIVE_OUT
layout(location = 3) out vec4 fragEmissive;
#ifdef LEGACY_AMBIENT
layout(location = 4) out vec4 fragAmbient;
#endif
#elif defined(LEGACY_AMBIENT)
layout(location = 3) out vec4 fragAmbient;
#endif

void main(void) {
	vec4 outputColor = diffuseValue();
#ifdef VERTEX_COLORS
	outputColor *= vertexColor;
#endif

#if ALPHAMODE == ALPHAMODE_OPAQUE
	outputColor.a = 1.0;
#endif

	vec2 metallicRoughness = metallicRoughnessValue();
	float metallic = metallicRoughness.x;
	float roughness = metallicRoughness.y;

	vec3 N = normalize(worldNormal);
#ifdef VERTEX_TANGENTS
#ifdef NORMAL_TEXTURE
	vec3 T = normalize(worldTangent.xyz);
	vec3 B = cross(N, T) * worldTangent.w;

	mat3 TBN = mat3(T, -B, N);
	N = TBN * normalize(texture(normal0, normalUV()).xyz * 2.0 - 1.0);
#endif
#endif

	float occlusion = occlusionValue();

	fragColorMetallic = vec4(outputColor.rgb, metallic);
	fragNormalRoughness = vec4(N, roughness);
	fragPositionOcclusion = vec4(worldPosition.xyz, occlusion);

#ifdef EMISSIVE_OUT
	vec4 emissive = emissiveValue();
	fragEmissive = vec4(emissive.rgb, 1.0);
#endif

#ifdef LEGACY_AMBIENT
	fragAmbient = ambient;
#endif

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
