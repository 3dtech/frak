#version 300 es

/*
 * Screen space ambient occlusion post process
 */
in vec3 position;

void main() {
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
