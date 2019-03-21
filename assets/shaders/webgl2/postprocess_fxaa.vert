#version 300 es

/** FXAA post-process effect vertex shader */

in vec3 position;
in vec2 uv0;

out vec2 uv;

void main() {
	uv = uv0;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
