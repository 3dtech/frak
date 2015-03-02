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

	float dx = dFdx(depth);
	float dy = dFdy(depth);
	gl_FragColor = vec4(depth, pow(depth, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0);
	// gl_FragColor.r = depth;
}
