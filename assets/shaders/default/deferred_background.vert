attribute vec3 position;
attribute vec2 uv0;

varying vec2 uv;

void main() {
	uv = uv0;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
