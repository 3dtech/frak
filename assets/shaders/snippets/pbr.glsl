#if ALPHAMODE == ALPHAMODE_MASK
uniform float alphaCutoff;
#endif

#ifdef LEGACY_AMBIENT
uniform vec4 ambient;
#endif

// Diffuse
uniform vec4 diffuse;

#ifdef DIFFUSE_TEXTURE
uniform sampler2D diffuse0;

#ifdef DIFFUSE_UV_TRANSFORM
uniform mat3 diffuseUVTransform;
#endif

vec2 diffuseUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef DIFFUSE_UV_TRANSFORM
	uv = diffuseUVTransform * uv;
#endif

	return uv.xy;
}
#endif

vec4 diffuseValue() {
	vec4 color = diffuse;
#ifdef DIFFUSE_TEXTURE
	color *= texture(diffuse0, diffuseUV());
#endif
	return color;
}

// Metallic & roughness
float perceptualRoughnessToRoughness(float perceptualRoughness) {
	float clampedPerceptualRoughness = clamp(perceptualRoughness, 0.089, 1.0);
	return clampedPerceptualRoughness * clampedPerceptualRoughness;
}

uniform float metallic;
uniform float perceptualRoughness;

#ifdef METALLICROUGHNESS_TEXTURE
uniform sampler2D metallicRoughness0;

#ifdef METALLICROUGHNESS_UV_TRANSFORM
uniform mat3 metallicRoughnessUVTransform;
#endif

vec2 metallicRoughnessUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef METALLICROUGHNESS_UV_TRANSFORM
	uv = metallicRoughnessUVTransform * uv;
#endif

	return uv.xy;
}
#endif

vec2 metallicRoughnessValue() {
	vec2 mr = vec2(metallic, perceptualRoughness);
#ifdef METALLICROUGHNESS_TEXTURE
	mr *= texture(metallicRoughness0, metallicRoughnessUV()).bg;
#endif
	mr.x = perceptualRoughnessToRoughness(mr.x);
	return mr;
}

// Normal
#ifdef NORMAL_TEXTURE
uniform sampler2D normal0;

#ifdef NORMAL_UV_TRANSFORM
uniform mat3 normalUVTransform;
#endif

vec2 normalUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef NORMAL_UV_TRANSFORM
	uv = normalUVTransform * uv;
#endif

	return uv.xy;
}
#endif

// Occlusion
#ifdef OCCLUSION_TEXTURE
uniform sampler2D occlusion0;

#ifdef OCCLUSION_UV_TRANSFORM
uniform mat3 occlusionUVTransform;
#endif

vec2 occlusionUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef OCCLUSION_UV_TRANSFORM
	uv = occlusionUVTransform * uv;
#endif

	return uv.xy;
}
#endif

float occlusionValue() {
	float occlusion = 1.0;
#ifdef OCCLUSION_TEXTURE
	occlusion *= texture(occlusion0, occlusionUV()).r;
#endif
	return occlusion;
}

#ifdef EMISSIVE
uniform vec4 emissive;
#endif

#ifdef EMISSIVE_TEXTURE
uniform sampler2D emissive0;

#ifdef EMISSIVE_UV_TRANSFORM
uniform mat3 emissiveUVTransform;
#endif

vec2 emissiveUV() {
	vec3 uv = vec3(uv0, 1.0);

#ifdef EMISSIVE_UV_TRANSFORM
	uv = emissiveUVTransform * uv;
#endif

	return uv.xy;
}
#endif

vec4 emissiveValue() {
#ifdef EMISSIVE
	vec4 color = emissive;
#else
	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
#endif

#ifdef EMISSIVE_TEXTURE
	color.rgb *= texture(emissive0, emissiveUV()).rgb;
#endif

	return color;
}
