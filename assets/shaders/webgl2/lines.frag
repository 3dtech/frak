#version 300 es

precision mediump float;

in vec4 fragColor;
in vec4 fragPosition;

out vec4 outColor;

void main(void) {
	outColor = fragColor;
}