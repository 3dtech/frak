#version 300 es

precision highp float;

#include "snippets/camera.glsl"

uniform vec4 ambientLight;
uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;
uniform mat4 lightView;
uniform mat4 lightProjection;
uniform float shadowBias;

#ifdef SHADOWS
#include "snippets/shadow.glsl"
#endif

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

out vec4 fragColor;

const float PI = 3.1415926535897932384626433832795;
const float REFLECTANCE = 0.5;

const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);
const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);

vec3 EnvBRDFApprox(vec3 f0, float perceptualRoughness, float NoV) {
	vec4 r = perceptualRoughness * c0 + c1;
	float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
	vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;
	return f0 * AB.x + AB.y;
}

float saturate(float x) {
    return clamp(x, 0.0, 1.0);
}

float pow5(float x) {
    return x * x * x * x * x;
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

vec3 acesApprox(vec3 v) {
    v *= 0.6f;
    float a = 2.51f;
    float b = 0.03f;
    float c = 2.43f;
    float d = 0.59f;
    float e = 0.14f;
    return clamp((v*(a*v+b))/(v*(c*v+d)+e), 0.0f, 1.0f);
}

float oitWeight(float z, vec4 color) {
    return max(min(1.0, max(max(color.r, color.g), color.b) * color.a), color.a) *
        clamp(0.03 / (1e-5 + pow(z / 200.0, 4.0)), 1e-2, 3e3);
}

void main(void) {
    vec4 outputColor = diffuseValue();
#ifdef VERTEX_COLORS
	outputColor *= vertexColor;
#endif

#ifndef MATERIAL_UNLIT

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

	vec3 V = normalize(cameraPosition - worldPosition.xyz);
    float NdotV = max(dot(N, V), 1e-4);

    vec3 F0 = 0.16 * REFLECTANCE * REFLECTANCE * (1.0 - metallic) + outputColor.rgb * metallic;
    vec3 diffuseColor = outputColor.rgb * (1.0 - metallic);

    vec3 R = reflect(-V, N);

#ifdef LEGACY_AMBIENT
	vec4 legacyAmbient = ambient;
#else
	vec4 legacyAmbient = vec4(0.0);
#endif

	vec3 lightDirection = normalize(lightDirection);

#ifdef SHADOWS
	float bias = max(0.005 * (1.0 - dot(N, lightDirection)), 0.0005);
	float shadow = shadowmap(vec4(worldPosition.xyz, 1.0), bias);
#else
	float shadow = 1.0;
#endif

	// Ambient
	vec3 diffuseAmbient = outputColor.rgb;
	vec3 specularAmbient = EnvBRDFApprox(F0, roughness, NdotV);
	vec3 ambientColor = (diffuseAmbient + specularAmbient) * ambientLight.rgb;

	// Directional light
    outputColor.rgb = dirLight(lightDirection, lightColor * lightIntensity * 10.4, roughness, NdotV, N, V, R, F0, diffuseColor);
	outputColor.rgb *= shadow;

	// Add ambient after shadow
	outputColor.rgb += mix(ambientColor, legacyAmbient.rgb * diffuseAmbient, legacyAmbient.a) * occlusion;

	// Tonemap
    outputColor.rgb = acesApprox(outputColor.rgb);
#endif	// UNLIT

	fragColor = vec4(outputColor.rgb * outputColor.a, outputColor.a) * oitWeight(gl_FragCoord.z, outputColor);
}
