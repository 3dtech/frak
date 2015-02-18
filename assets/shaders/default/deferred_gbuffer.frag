#extension GL_EXT_draw_buffers : require

precision highp float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

varying float depth;
varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;


void main() {
	vec4 textureColor = texture2D(diffuse0, uv0);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	gl_FragData[0] = vec4(worldNormal, depth);
	gl_FragData[1] = vec4(1.0, 0.0, 0.0, 1.0);
	gl_FragData[2] = vec4(0.0, 1.0, 0.0, 1.0);
	gl_FragData[3] = vec4(0.0, 0.0, 1.0, 1.0);
}
