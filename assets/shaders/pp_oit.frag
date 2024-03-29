#version 300 es

precision highp float;

uniform sampler2D oitAccum;
uniform sampler2D oitReveal;

in vec2 uv;

out vec4 fragColor;

void main(void) {
    vec4 accum = texture(oitAccum, uv);
    float reveal = texture(oitReveal, uv).a;

    fragColor = vec4(accum.rgb / max(accum.a, 1e-5), reveal);
}
