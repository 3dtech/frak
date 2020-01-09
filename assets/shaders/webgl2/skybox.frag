#version 300 es

precision highp float;

uniform samplerCube skybox0;

in vec3 uv0;
out vec4 fragColor;

void main(void) {
	fragColor = texture(skybox0, uv0);
}
