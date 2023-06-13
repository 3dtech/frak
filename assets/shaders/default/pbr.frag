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

varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;

#ifdef VERTEX_TANGENTS
varying vec4 worldTangent;
#endif

varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;

const float PI = 3.1415926535897932384626433832795;

float saturate(float x) {
	return clamp(x, 0.0, 1.0);
}

float pow5(float x) {
	return x * x * x * x * x;
}

float getDistanceAttenuation(float distanceSq, float invRangeSq) {
	float factor = distanceSq * invRangeSq;
	float smoothFactor = saturate(1.0 - factor * factor);
	float attenuation = smoothFactor * smoothFactor;
	return attenuation * 1.0 / max(distanceSq, 1e-4);
}

float D_GGX(float roughness, float NdotH) {
	float oneMinusNdotHSq = 1.0 - NdotH * NdotH;
	float a = NdotH * roughness;
	float k = roughness / (oneMinusNdotHSq + a * a);
	float d = k * k * (1.0 / PI);
	return d;
}

float V_SmithGGXCorrelated(float roughness, float NoV, float NoL) {
	float a2 = roughness * roughness;
	float lambdaV = NoL * sqrt((NoV - a2 * NoV) * NoV + a2);
	float lambdaL = NoV * sqrt((NoL - a2 * NoL) * NoL + a2);
	float v = 0.5 / (lambdaV + lambdaL);
	return v;
}

vec3 F_Schlick(const vec3 f0, float f90, float VoH) {
	// not using mix to keep the vec3 and float versions identical
	return f0 + (f90 - f0) * pow5(1.0 - VoH);
}

float F_Schlick(float f0, float f90, float VoH) {
	return f0 + (f90 - f0) * pow5(1.0 - VoH);
}

vec3 fresnel(vec3 f0, float LoH) {
	float f90 = saturate(dot(f0, vec3(50.0 * 0.33)));
	return F_Schlick(f0, f90, LoH);
}


vec3 specular(vec3 f0, float roughness, const vec3 h, float NoV, float NoL,
			float NoH, float LoH, float specularIntensity) {
	float D = D_GGX(roughness, NoH);
	float V = V_SmithGGXCorrelated(roughness, NoV, NoL);
	vec3 F = fresnel(f0, LoH);

	return (specularIntensity * D * V) * F;
}

float Fd_Burley(float roughness, float NoV, float NoL, float LoH) {
	float f90 = 0.5 + 2.0 * roughness * LoH * LoH;
	float lightScatter = F_Schlick(1.0, f90, NoL);
	float viewScatter = F_Schlick(1.0, f90, NoV);
	return lightScatter * viewScatter * (1.0 / PI);
}

const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);
const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);

vec3 EnvBRDFApprox(vec3 f0, float perceptualRoughness, float NoV) {
	vec4 r = perceptualRoughness * c0 + c1;
	float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
	vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;
	return f0 * AB.x + AB.y;
}

float perceptualRoughnessToRoughness(float perceptualRoughness) {
	float clampedPerceptualRoughness = clamp(perceptualRoughness, 0.089, 1.0);
	return clampedPerceptualRoughness * clampedPerceptualRoughness;
}

float luminance(vec3 v) {
	return dot(v, vec3(0.2126, 0.7152, 0.0722));
}

vec3 changeLuminance(vec3 cIn, float lOut) {
	float lIn = luminance(cIn);
	return cIn * (lOut / lIn);
}

vec3 reinhardLuminance(vec3 color) {
	float lOld = luminance(color);
	float lNew = lOld / (1.0 + lOld);
	return changeLuminance(color, lNew);
}

vec3 reinhardExtendedLuminance(vec3 color, float maxWhiteL) {
	float lOld = luminance(color);
	float numerator = lOld * (1.0 + (lOld / (maxWhiteL * maxWhiteL)));
	float lNew = numerator / (1.0 + lOld);
	return changeLuminance(color, lNew);
}

vec3 dirLight(vec3 direction, vec4 color, float roughness, float NdotV, vec3 normal, vec3 view, vec3 R, vec3 F0, vec3 diffuseColor) {
    vec3 incidentLight = direction.xyz;

    vec3 halfVector = normalize(incidentLight + view);
    float NoL = saturate(dot(normal, incidentLight));
    float NoH = saturate(dot(normal, halfVector));
    float LoH = saturate(dot(incidentLight, halfVector));

    vec3 diffuse = diffuseColor * Fd_Burley(roughness, NdotV, NoL, LoH);
    float specularIntensity = 1.0;
    vec3 specular = specular(F0, roughness, halfVector, NdotV, NoL, NoH, LoH, specularIntensity);

    return (specular + diffuse) * color.rgb * NoL;
	//return specular;
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
	outputColor *= texture2D(diffuse0, diffuseUV());
#endif

outputColor.a = 1.0;	// We only use this shader with alphaMode == 'OPAQUE'

#ifdef METALLICROUGHNESS_TEXTURE
	vec4 metallicRoughness = texture2D(metallicRoughness0, metallicRoughnessUV());
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
	N = TBN * normalize(texture2D(normal0, normalUV()).xyz * 2.0 - 1.0);
#endif
#endif

#ifdef OCCLUSION_TEXTURE
	float occlusion = texture2D(occlusion0, occlusionUV()).r;
#else
	float occlusion = 1.0;
#endif

#ifdef EMISSIVE_TEXTURE
	vec4 emissive = emissive;
	emissive.rgb *= texture2D(emissive0, emissiveUV()).rgb;
#endif

	vec3 V = normalize(cameraPosition - worldPosition.xyz);
	float NdotV = max(dot(N, V), 1e-4);

	vec3 F0 = 0.16 * reflectance * reflectance * (1.0 - metallic) + outputColor.rgb * metallic;
	vec3 diffuseColor = outputColor.rgb * (1.0 - metallic);

	vec3 R = reflect(-V, N);

	vec3 diffuseAmbient = EnvBRDFApprox(diffuseColor, 1.0, NdotV);
	vec3 specularAmbient = EnvBRDFApprox(F0, perceptualRoughness, NdotV);

	outputColor.rgb = dirLight(normalize(lightDirection), lightColor * lightIntensity * 10.4, roughness, NdotV, N, V, R, F0, diffuseColor);
	outputColor.rgb += (diffuseAmbient + specularAmbient) * ambient.rgb * occlusion;

	outputColor.rgb = reinhardLuminance(outputColor.rgb);

	outputColor.rgb += emissive.rgb;

	gl_FragColor = outputColor;
}
