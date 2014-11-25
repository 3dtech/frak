/*
 * Screen space ambient occlusion post process
 */
attribute vec3 position;

void main() {
	gl_Position = vec4(position.xy, 0.0, 1.0);
}