// Shader for rendering a screen aligned quad for image space effects

precision highp float;

varying vec2 uv;
uniform sampler2D tex0;

void main () {
	gl_FragColor = texture2D(tex0, uv);
}
