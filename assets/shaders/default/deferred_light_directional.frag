precision highp float;

uniform sampler2D gb0;
uniform sampler2D gb1;
uniform sampler2D gb2;
uniform sampler2D gb3;
uniform sampler2D shadow0;

uniform vec3 cameraPosition;
uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;

varying vec2 uv;

void main () {
	// TODO: shadows

	vec4 data0 = texture2D(gb0, uv);
	vec4 data1 = texture2D(gb1, uv);
	vec4 data2 = texture2D(gb2, uv);

	vec3 C = data0.rgb;
	vec3 N = data1.xyz;
	vec3 P = data2.xyz;
	float specularIntensity = data0.w;
	float specularPower = 255.0*data2.w;

	vec3 lightVector = normalize(lightDirection);
	float NdotL = max(0.0, dot(N, lightVector));
	vec3 diffuseLight = NdotL * C;
	vec3 reflectionVector = normalize(reflect(-lightVector, N));
	vec3 directionToCamera = normalize(cameraPosition - P);
	float specularLight = specularIntensity * pow(clamp(dot(reflectionVector, directionToCamera), 0.0, 1.0), specularPower);

	gl_FragColor = lightIntensity * (vec4(diffuseLight, 1.0) * lightColor + specularLight * lightColor);
}

