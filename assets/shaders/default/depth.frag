// Shader for rendering linear depth values into a floating point texture
precision mediump float;

varying float depth;

void main() {
	gl_FragColor.r = depth;
}
