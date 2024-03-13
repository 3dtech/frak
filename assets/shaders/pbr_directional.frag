#version 300 es

precision highp float;

uniform sampler2D colorMetallic;
uniform sampler2D normalRoughness;
uniform sampler2D positionOcclusion;

#include "snippets/camera.glsl"

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;
uniform mat4 lightView;
uniform mat4 lightProjection;
uniform float shadowBias;

#ifdef SHADOWS
#include "snippets/shadow.glsl"
#endif

in vec2 uv;

out vec4 fragColor;

const float PI = 3.1415926535897932384626433832795;
const float REFLECTANCE = 0.5;

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

void main(void) {
	vec4 cM = texture(colorMetallic, uv);
	vec4 outputColor = vec4(cM.rgb, 1.0);
	float metallic = cM.w;

	vec4 nM = texture(normalRoughness, uv);
	vec3 N = nM.xyz;
	float roughness = nM.w;

	vec4 pR = texture(positionOcclusion, uv);
	vec3 position = pR.xyz;

	vec3 V = normalize(cameraPosition - position);
	float NdotV = max(dot(N, V), 1e-4);

	vec3 F0 = 0.16 * REFLECTANCE * REFLECTANCE * (1.0 - metallic) + outputColor.rgb * metallic;
	vec3 diffuseColor = outputColor.rgb * (1.0 - metallic);

	vec3 R = reflect(-V, N);

	vec3 lightDirection = normalize(lightDirection);

#ifdef SHADOWS
	float bias = max(0.005 * (1.0 - dot(N, lightDirection)), 0.0005);
	float shadow = shadowmap(vec4(position, 1.0), bias);
#else
	float shadow = 1.0;
#endif

	outputColor.rgb = dirLight(lightDirection, lightColor * lightIntensity * 10.4, roughness, NdotV, N, V, R, F0, diffuseColor);
	outputColor.rgb *= shadow;

	fragColor = outputColor;
}
