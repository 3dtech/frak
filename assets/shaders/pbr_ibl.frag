#version 300 es

precision highp float;

uniform sampler2D color;
uniform sampler2D normalMetallic;
uniform sampler2D positionRoughness;

uniform samplerCube light0;

uniform Camera_block_0 {
    mat4 modelview;
    mat4 projection;
    mat4 view;
    mat4 viewInverse;
    float zNear;
    float zFar;
    vec3 cameraPosition;
};

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

float clampedDot(vec3 x, vec3 y) {
    return clamp(dot(x, y), 0.0, 1.0);
}

vec3 getIBLRadianceGGX(vec3 n, vec3 v, float roughness, vec3 F0, float specularWeight) {
    float NdotV = clampedDot(n, v);
    vec3 reflection = normalize(reflect(-v, n));

    vec2 brdfSamplePoint = clamp(vec2(NdotV, roughness), vec2(0.0, 0.0), vec2(1.0, 1.0));
    //vec2 f_ab = texture(u_GGXLUT, brdfSamplePoint).rg;
    vec2 f_ab = brdfSamplePoint;
    vec4 specularSample = texture(light0, -reflection);

    vec3 specularLight = specularSample.rgb;

    // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
    // Roughness dependent fresnel, from Fdez-Aguera
    vec3 Fr = max(vec3(1.0 - roughness), F0) - F0;
    vec3 k_S = F0 + Fr * pow(1.0 - NdotV, 5.0);
    vec3 FssEss = k_S * f_ab.x + f_ab.y;

    return specularWeight * specularLight * FssEss;
}

vec3 getIBLRadianceLambertian(vec3 n, vec3 v, float roughness, vec3 diffuseColor, vec3 F0, float specularWeight) {
    float NdotV = clampedDot(n, v);
    vec2 brdfSamplePoint = clamp(vec2(NdotV, roughness), vec2(0.0, 0.0), vec2(1.0, 1.0));
    //vec2 f_ab = texture(u_GGXLUT, brdfSamplePoint).rg;
    vec2 f_ab = brdfSamplePoint * 0.1;

    vec3 irradiance = texture(light0, n).rgb;

    // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
    // Roughness dependent fresnel, from Fdez-Aguera

    vec3 Fr = max(vec3(1.0 - roughness), F0) - F0;
    vec3 k_S = F0 + Fr * pow(1.0 - NdotV, 5.0);
    vec3 FssEss = specularWeight * k_S * f_ab.x + f_ab.y; // <--- GGX / specular light contribution (scale it down if the specularWeight is low)

    // Multiple scattering, from Fdez-Aguera
    float Ems = (1.0 - (f_ab.x + f_ab.y));
    vec3 F_avg = specularWeight * (F0 + (1.0 - F0) / 21.0);
    vec3 FmsEms = Ems * FssEss * F_avg / (1.0 - F_avg * Ems);
    vec3 k_D = diffuseColor * (1.0 - FssEss + FmsEms); // we use +FmsEms as indicated by the formula in the blog post (might be a typo in the implementation)

    return (FmsEms + k_D) * irradiance;
}

vec3 ibLight(vec3 normal, vec3 view, float roughness, vec3 diffuseColor, vec3 F0, float specularWeight) {
    vec3 diffuse = getIBLRadianceLambertian(normal, view, roughness, diffuseColor, F0, specularWeight);
    vec3 specular = getIBLRadianceGGX(normal, view, roughness, F0, specularWeight);

    return /**diffuse + */specular;
}

void main(void) {
	vec4 outputColor = texture(color, uv);

	vec4 nM = texture(normalMetallic, uv);
	vec3 N = nM.xyz;
	float metallic = nM.w;

	vec4 pR = texture(positionRoughness, uv);
	vec3 position = pR.xyz;
	float roughness = pR.w;

	vec3 V = normalize(cameraPosition - position);
	float NdotV = max(dot(N, V), 1e-4);

	vec3 F0 = 0.16 * REFLECTANCE * REFLECTANCE * (1.0 - metallic) + outputColor.rgb * metallic;
	vec3 diffuseColor = outputColor.rgb * (1.0 - metallic);

	vec3 R = reflect(-V, N);

    outputColor.rgb = ibLight(N, V, roughness, diffuseColor, F0, 1.0);

	fragColor = outputColor;
}
