#version 300 es

precision highp float;

uniform sampler2D oitAccum;
uniform sampler2D oitWeight;

in vec2 uv;

out vec4 fragColor;

void main(void) {
    vec4 accum = texture(oitAccum, uv);
    float reveal = texture(oitWeight, uv).r;

    float a = 1.0 - accum.a;
    fragColor = vec4(a * accum.rgb / clamp(reveal, 0.001, 50000.0), a);
}
