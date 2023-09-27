#version 300 es

precision highp float;

uniform mat4 modelview;
uniform mat4 view;

uniform vec3 cameraPosition;

uniform vec4 ambient;
uniform vec4 diffuse;
uniform vec4 emissive;

uniform float metallic;
uniform float perceptualRoughness;

uniform float reflectance;

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;

#ifdef DIFFUSE_TEXTURE
uniform sampler2D diffuse0;

#ifdef DIFFUSE_UV_TRANSFORM
uniform mat3 diffuseUVTransform;
#endif
#endif

#ifdef METALLICROUGHNESS_TEXTURE
uniform sampler2D metallicRoughness0;

#ifdef METALLICROUGHNESS_UV_TRANSFORM
uniform mat3 metallicRoughnessUVTransform;
#endif
#endif

#ifdef NORMAL_TEXTURE
uniform sampler2D normal0;

#ifdef NORMAL_UV_TRANSFORM
uniform mat3 normalUVTransform;
#endif
#endif

#ifdef OCCLUSION_TEXTURE
uniform sampler2D occlusion0;

#ifdef OCCLUSION_UV_TRANSFORM
uniform mat3 occlusionUVTransform;
#endif
#endif

#ifdef EMISSIVE_TEXTURE
uniform sampler2D emissive0;

#ifdef EMISSIVE_UV_TRANSFORM
uniform mat3 emissiveUVTransform;
#endif
#endif

in vec2 uv0;
in vec4 worldPosition;
in vec3 worldNormal;

#ifdef VERTEX_TANGENTS
in vec4 worldTangent;
#endif

in vec4 viewPosition;
in vec3 viewNormal;
in vec4 shadowPosition;

// TODO: Optionally limit number of buffers
layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragNormalMetallic;
layout(location = 2) out vec4 fragPositionRoughness;
layout(location = 3) out vec4 fragEmissiveOcclusion;

float perceptualRoughnessToRoughness(float perceptualRoughness) {
	float clampedPerceptualRoughness = clamp(perceptualRoughness, 0.089, 1.0);
	return clampedPerceptualRoughness * clampedPerceptualRoughness;
}

vec2 diffuseUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef DIFFUSE_UV_TRANSFORM
	uv = diffuseUVTransform * uv;
#endif

	return uv.xy;
}

vec2 metallicRoughnessUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef METALLICROUGHNESS_UV_TRANSFORM
	uv = metallicRoughnessUVTransform * uv;
#endif

	return uv.xy;
}

vec2 normalUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef NORMAL_UV_TRANSFORM
	uv = normalUVTransform * uv;
#endif

	return uv.xy;
}

vec2 occlusionUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef OCCLUSION_UV_TRANSFORM
	uv = occlusionUVTransform * uv;
#endif

	return uv.xy;
}

vec2 emissiveUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef EMISSIVE_UV_TRANSFORM
	uv = emissiveUVTransform * uv;
#endif

	return uv.xy;
}

void main(void) {
	vec4 outputColor = diffuse;
#ifdef DIFFUSE_TEXTURE
	outputColor *= texture(diffuse0, diffuseUV());
#endif

	outputColor.a = 1.0;	// TODO: We only use this shader with alphaMode == 'OPAQUE'

#ifdef METALLICROUGHNESS_TEXTURE
	vec4 metallicRoughness = texture(metallicRoughness0, metallicRoughnessUV());
	float metallic = metallic * metallicRoughness.b;
	float perceptualRoughness = perceptualRoughness * metallicRoughness.g;
#endif

	float roughness = perceptualRoughnessToRoughness(perceptualRoughness);

	vec3 N = normalize(worldNormal);
#ifdef VERTEX_TANGENTS
#ifdef NORMAL_TEXTURE
	vec3 T = normalize(worldTangent.xyz);
	vec3 B = cross(N, T) * worldTangent.w;

	mat3 TBN = mat3(T, -B, N);
	N = TBN * normalize(texture(normal0, normalUV()).xyz * 2.0 - 1.0);
#endif
#endif

#ifdef OCCLUSION_TEXTURE
	float occlusion = texture(occlusion0, occlusionUV()).r;
#else
	float occlusion = 1.0;
#endif

#ifdef EMISSIVE_TEXTURE
	vec4 emissive = emissive;
	emissive.rgb *= texture(emissive0, emissiveUV()).rgb;
#endif

	fragColor = outputColor;
	fragNormalMetallic = vec4(N, metallic);
	fragPositionRoughness = vec4(worldPosition.xyz, roughness);
	fragEmissiveOcclusion = vec4(emissive.rgb, occlusion);
}
