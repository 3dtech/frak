#version 300 es

precision highp float;

uniform sampler2D colorMetallic;
uniform sampler2D normalRoughness;
uniform sampler2D positionOcclusion;

#ifdef AMBIENT_BUFFER
uniform sampler2D ambientBuffer;
#endif

#include "snippets/camera.glsl"

uniform vec4 lightColor;

in vec2 uv;

out vec4 fragColor;

const float REFLECTANCE = 0.5;

const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);
const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);

vec3 EnvBRDFApprox(vec3 f0, float perceptualRoughness, float NoV) {
    vec4 r = perceptualRoughness * c0 + c1;
    float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
    vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;
    return f0 * AB.x + AB.y;
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
    float occlusion = pR.w;

#ifdef AMBIENT_BUFFER
	vec4 ambient = texture(ambientBuffer, uv);
#else
	vec4 ambient = vec4(0.0);
#endif

    vec3 V = normalize(cameraPosition - position);
    float NdotV = max(dot(N, V), 1e-4);

    vec3 F0 = 0.16 * REFLECTANCE * REFLECTANCE * (1.0 - metallic) + outputColor.rgb * metallic;

    vec3 diffuseAmbient = outputColor.rgb;
    vec3 specularAmbient = EnvBRDFApprox(F0, roughness, NdotV);
	vec3 lightColor = (diffuseAmbient + specularAmbient) * lightColor.rgb;

    outputColor.rgb = mix(lightColor, ambient.rgb * diffuseAmbient, ambient.a) * occlusion;

    fragColor = outputColor;
}
