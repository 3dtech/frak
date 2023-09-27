#version 300 es

precision highp float;

uniform vec4 ambient;

uniform sampler2D color;
uniform sampler2D normalMetallic;
uniform sampler2D positionRoughness;
uniform sampler2D emissiveOcclusion;

uniform vec3 cameraPosition;
uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;

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

float luminance(vec3 v) {
	return dot(v, vec3(0.2126, 0.7152, 0.0722));
}

vec3 changeLuminance(vec3 cIn, float lOut) {
	float lIn = luminance(cIn);
	return cIn * (lOut / lIn);
}

vec3 reinhardLuminance(vec3 color) {
	float lOld = luminance(color);
	float lNew = lOld / (1.0f + lOld);
	return changeLuminance(color, lNew);
}

vec3 reinhardExtendedLuminance(vec3 color, float maxWhiteL) {
	float lOld = luminance(color);
	float numerator = lOld * (1.0f + (lOld / (maxWhiteL * maxWhiteL)));
	float lNew = numerator / (1.0f + lOld);
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

void main(void) {
	vec4 outputColor = texture(color, uv);

	vec4 nM = texture(normalMetallic, uv);
	vec3 N = nM.xyz;
	float metallic = nM.w;

	vec4 pR = texture(positionRoughness, uv);
	vec3 position = pR.xyz;
	float roughness = pR.w;

	vec4 eO = texture(emissiveOcclusion, uv);
	vec4 emissive = vec4(eO.rgb, 1.0);
	float occlusion = eO.w;

	vec3 V = normalize(cameraPosition - position);
	float NdotV = max(dot(N, V), 1e-4);

	vec3 F0 = 0.16 * REFLECTANCE * REFLECTANCE * (1.0 - metallic) + outputColor.rgb * metallic;
	vec3 diffuseColor = outputColor.rgb * (1.0 - metallic);

	vec3 R = reflect(-V, N);

	vec3 diffuseAmbient = EnvBRDFApprox(diffuseColor, 1.0, NdotV);
	vec3 specularAmbient = EnvBRDFApprox(F0, roughness, NdotV);

	outputColor.rgb = dirLight(normalize(lightDirection), lightColor * lightIntensity * 10.4, roughness, NdotV, N, V, R, F0, diffuseColor);
	outputColor.rgb += (diffuseAmbient + specularAmbient) * ambient.rgb * occlusion;

	outputColor.rgb = reinhardLuminance(outputColor.rgb);

	outputColor.rgb += emissive.rgb;

	fragColor = outputColor;
}
