#version 300 es

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 lightProjection;
uniform mat4 lightView;

out vec3 uv0;

void main(void) {
	uv0 = vec3(position.x, -position.yz);
	gl_Position = projection * view * model * vec4(position, 1.0);
}
