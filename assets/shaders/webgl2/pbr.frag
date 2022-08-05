#version 300 es

precision highp float;

uniform mat4 modelview;
uniform mat4 view;

uniform vec3 cameraPosition;

uniform vec4 ambient;
uniform vec4 diffuse;
uniform vec4 emissive;

uniform float metallic;
uniform float perceptual_roughness;

uniform float reflectance;

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;

#ifdef DIFFUSE_TEXTURE
uniform sampler2D diffuse0;
#endif

#ifdef METALLIC_ROUGHNESS_TEXTURE
uniform sampler2D metallicRoughness0;
#endif

#ifdef NORMAL_MAP
uniform sampler2D normal0;
#endif

#ifdef OCCLUSION_TEXTURE
uniform sampler2D occlusion0;
#endif

#ifdef EMISSIVE_TEXTURE
uniform sampler2D emissive0;
#endif

in vec2 uv0;
in vec4 worldPosition;
in vec3 worldNormal;

#ifdef NORMAL_MAP
in vec3 worldTangent;
#endif

in vec4 viewPosition;
in vec3 viewNormal;
in vec4 shadowPosition;

out vec4 fragColor;

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

vec3 EnvBRDFApprox(vec3 f0, float perceptual_roughness, float NoV) {
	vec4 r = perceptual_roughness * c0 + c1;
	float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
	vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;
	return f0 * AB.x + AB.y;
}

float perceptualRoughnessToRoughness(float perceptualRoughness) {
	float clampedPerceptualRoughness = clamp(perceptualRoughness, 0.089, 1.0);
	return clampedPerceptualRoughness * clampedPerceptualRoughness;
}

vec3 reinhard(vec3 color) {
	return color / (1.0 + color);
}

vec3 reinhard_extended(vec3 color, float max_white) {
	vec3 numerator = color * (1.0f + (color / vec3(max_white * max_white)));
	return numerator / (1.0 + color);
}

float luminance(vec3 v) {
	return dot(v, vec3(0.2126, 0.7152, 0.0722));
}

vec3 change_luminance(vec3 c_in, float l_out) {
	float l_in = luminance(c_in);
	return c_in * (l_out / l_in);
}

vec3 reinhard_luminance(vec3 color) {
	float l_old = luminance(color);
	float l_new = l_old / (1.0f + l_old);
	return change_luminance(color, l_new);
}

vec3 reinhard_extended_luminance(vec3 color, float max_white_l) {
	float l_old = luminance(color);
	float numerator = l_old * (1.0f + (l_old / (max_white_l * max_white_l)));
	float l_new = numerator / (1.0f + l_old);
	return change_luminance(color, l_new);
}

vec3 dir_light(vec3 direction, vec4 color, float roughness, float NdotV, vec3 normal, vec3 view, vec3 R, vec3 F0, vec3 diffuseColor) {
    vec3 incident_light = direction.xyz;

    vec3 half_vector = normalize(incident_light + view);
    float NoL = saturate(dot(normal, incident_light));
    float NoH = saturate(dot(normal, half_vector));
    float LoH = saturate(dot(incident_light, half_vector));

    vec3 diffuse = diffuseColor * Fd_Burley(roughness, NdotV, NoL, LoH);
    float specularIntensity = 1.0;
    vec3 specular = specular(F0, roughness, half_vector, NdotV, NoL, NoH, LoH, specularIntensity);

    return (specular + diffuse) * color.rgb * NoL;
	//return specular;
}

void main(void) {
	vec4 output_color = diffuse;
#ifdef DIFFUSE_TEXTURE
	output_color *= texture(diffuse0, uv0);
#endif

#ifdef METALLIC_ROUGHNESS_TEXTURE
	vec4 metallic_roughness = texture(metallicRoughness0, uv0);
	float metallic = metallic * metallic_roughness.b;
	float perceptual_roughness = perceptual_roughness * metallic_roughness.g;
#endif

	float roughness = perceptualRoughnessToRoughness(perceptual_roughness);

	vec3 N = normalize(worldNormal);
#ifdef NORMAL_MAP
	vec3 T = normalize(worldTangent);
	vec3 B = cross(N, T);

	mat3 TBN = mat3(T, B, N);
	N = TBN * normalize(texture(normal0, uv0).xyz * 2.0 - 1.0);
#endif

#ifdef OCCLUSION_TEXTURE
	float occlusion = texture(occlusion0, uv0).r;
#else
	float occlusion = 1.0;
#endif

#ifdef EMISSIVE_TEXTURE
	vec4 emissive = emissive;
	emissive.rgb *= texture(emissive0, uv0).rgb;
#endif

	vec3 V = normalize(cameraPosition - worldPosition.xyz);
	float NdotV = max(dot(N, V), 1e-4);

	vec3 F0 = 0.16 * reflectance * reflectance * (1.0 - metallic) + output_color.rgb * metallic;
	vec3 diffuseColor = output_color.rgb * (1.0 - metallic);

	vec3 R = reflect(-V, N);

	vec3 diffuse_ambient = EnvBRDFApprox(diffuseColor, 1.0, NdotV);
	vec3 specular_ambient = EnvBRDFApprox(F0, perceptual_roughness, NdotV);

	output_color.rgb = dir_light(normalize(lightDirection), lightColor * lightIntensity * 20.8, roughness, NdotV, N, V, R, F0, diffuseColor);
	output_color.rgb += (diffuse_ambient + specular_ambient) * ambient.rgb * occlusion;

	output_color.rgb = reinhard_luminance(output_color.rgb);

	output_color.rgb += emissive.rgb * output_color.a;

	fragColor = output_color;
}
