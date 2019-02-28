#version 300 es

// Fallback shader
precision mediump float;

uniform vec4 color;

out vec4 fragColor;

void main(void) {
	fragColor = color;
}
