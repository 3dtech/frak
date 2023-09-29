#version 300 es

in vec3 position;
in vec2 texcoord2d0;

out vec2 uv;

void main() {
	uv = texcoord2d0;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
