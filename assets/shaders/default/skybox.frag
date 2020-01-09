precision mediump float;

uniform samplerCube skybox0;

varying vec3 uv0;

void main(void) {
	gl_FragColor = textureCube(skybox0, uv0);
}
