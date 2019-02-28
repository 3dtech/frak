#version 300 es
/** Directional light shadow-map */
precision highp float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

in float depth;
in vec2 uv;

out vec4 fragColor;

void main() {
	vec4 textureColor = texture(diffuse0, uv);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	float dx = dFdx(depth);
	float dy = dFdy(depth);
	fragColor = vec4(depth, pow(depth, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0);
}
