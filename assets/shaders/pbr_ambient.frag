#version 300 es

precision highp float;

uniform sampler2D color;
uniform sampler2D normalMetallic;
uniform sampler2D positionRoughness;
uniform sampler2D emissiveOcclusion;

uniform vec3 cameraPosition;
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
    vec4 outputColor = texture(color, uv);

    vec4 nM = texture(normalMetallic, uv);
    vec3 N = nM.xyz;
    float metallic = nM.w;

    vec4 pR = texture(positionRoughness, uv);
    vec3 position = pR.xyz;
    float roughness = pR.w;

    vec4 eO = texture(emissiveOcclusion, uv);
    float occlusion = eO.w;

    vec3 V = normalize(cameraPosition - position);
    float NdotV = max(dot(N, V), 1e-4);

    vec3 F0 = 0.16 * REFLECTANCE * REFLECTANCE * (1.0 - metallic) + outputColor.rgb * metallic;
    vec3 diffuseColor = outputColor.rgb * (1.0 - metallic);

    vec3 diffuseAmbient = EnvBRDFApprox(diffuseColor, 1.0, NdotV);
    vec3 specularAmbient = EnvBRDFApprox(F0, roughness, NdotV);

    outputColor.rgb = (diffuseAmbient + specularAmbient) * lightColor.rgb * occlusion;

    fragColor = outputColor;
}