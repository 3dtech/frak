#version 300 es

precision highp float;

uniform sampler2D src;

in vec2 uv;

out vec4 fragColor;

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

vec3 reinhardJodie(vec3 v) {
    float l = luminance(v);
    vec3 tv = v / (1.0f + v);
    return mix(v / (1.0f + l), tv, tv);
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

void main(void) {
    vec4 outputColor = texture(src, uv);

#if TONEMAP == TONEMAP_ACES
    fragColor = vec4(acesApprox(outputColor.rgb), 1.0);
#elif TONEMAP == TONEMAP_NONE
	fragColor = outputColor;
#endif
}
