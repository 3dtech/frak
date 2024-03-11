#version 300 es

precision highp float;

uniform sampler2D src;

in vec2 uv;

out vec4 fragColor;

void main() {
    fragColor = texture(src, uv);
}
