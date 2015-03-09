attribute vec3 position;
attribute vec2 texcoord2d0;

varying vec2 uv;

void main() {
	uv = texcoord2d0;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
