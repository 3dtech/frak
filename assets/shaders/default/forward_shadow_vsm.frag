/** Directional light shadow-map */
#extension GL_OES_standard_derivatives : require

precision highp float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

varying float depth;
varying vec2 uv;

void main() {
	vec4 textureColor = texture2D(diffuse0, uv);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	float d = (depth + 1.0) * 0.5;
	float dx = dFdx(d);
	float dy = dFdy(d);

	gl_FragColor = vec4(d, pow(d, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0);
}
