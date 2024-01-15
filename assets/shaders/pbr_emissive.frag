#version 300 es

precision highp float;

uniform sampler2D emissive;

in vec2 uv;

out vec4 fragColor;

void main(void) {
    vec4 eO = texture(emissive, uv);

    fragColor = vec4(eO.rgb, 1.0);
}
