#version 300 es

precision highp float;

uniform sampler2D gb0;
uniform sampler2D gb1;
uniform sampler2D gb2;
uniform sampler2D gb3;
uniform sampler2D shadow0;

uniform vec4 lightColor;

in vec2 uv;
out vec4 fragColor;

void main () {
	vec4 data0 = texture(gb0, uv);
	vec3 color = data0.rgb * lightColor.rgb;
	fragColor = vec4(color, 1.0);
}
