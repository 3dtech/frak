precision highp float;

uniform sampler2D gb0;
uniform sampler2D gb1;
uniform sampler2D gb2;
uniform sampler2D gb3;
uniform sampler2D shadow0;

uniform vec4 lightColor;
uniform vec3 lightPosition;
uniform float lightIntensity;
uniform float lightRadius;

uniform vec3 cameraPosition;

varying vec4 screenPosition;

void main() {
	vec2 uv = screenPosition.xy;
	uv /= screenPosition.w;
	uv = 0.5 * (vec2(uv.x, uv.y) + 1.0);

	vec4 data0 = texture2D(gb0, uv); // color.rgb, specularIntensity
	vec4 data1 = texture2D(gb1, uv); // normal.xyz, depth
	vec4 data2 = texture2D(gb2, uv); // position.xyz, specularPower/255
	// vec4 data3 = texture2D(gb3, uv); // unused

	vec3 C = data0.xyz;
	vec3 N = data1.xyz;
	vec3 P = data2.xyz;
	float specularIntensity = data0.w;
	float specularPower = 255.0*data2.w;

	vec3 lightVector = lightPosition - P;
	float attenuation = clamp(1.0 - length(lightVector)/lightRadius, 0.0, 1.0);
	lightVector = normalize(lightVector);

	float NdotL = max(0.0, dot(N, lightVector));
	vec3 diffuseLight = NdotL * C;
	vec3 reflectionVector = normalize(reflect(-lightVector, N));
	vec3 directionToCamera = normalize(cameraPosition - P);
	float specularLight = specularIntensity * pow(clamp(dot(reflectionVector, directionToCamera), 0.0, 1.0), specularPower);

	gl_FragColor = attenuation * (lightIntensity * vec4(diffuseLight, 1.0) * lightColor + specularLight * lightColor);
}
