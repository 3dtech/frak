#version 300 es

precision highp float;

uniform sampler2D tex0;

in vec2 uv;

out vec4 fragColor;

void main() {
    fragColor = texture(tex0, uv);
}
