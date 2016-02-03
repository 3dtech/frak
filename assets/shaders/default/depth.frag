// Shader for rendering linear depth values into a floating point texture
precision mediump float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

varying float depth;
varying vec2 uv;

void main() {
	vec4 textureColor = texture2D(diffuse0, uv);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	gl_FragColor = vec4(depth, depth, depth, depth);
}
