precision highp float;

uniform sampler2D gb0;
uniform sampler2D gb1;
uniform sampler2D gb2;
uniform sampler2D gb3;
uniform sampler2D shadow0;

uniform vec4 lightColor;

varying vec2 uv;

void main () {
	vec4 data0 = texture2D(gb0, uv);
	vec3 color = data0.rgb * lightColor.rgb;
	gl_FragColor = vec4(color, 1.0);
}

