#version 300 es

precision highp float;

uniform vec4 color;

in vec2 uv;
out vec4 fragColor;

void main () {
    fragColor = color;
}
