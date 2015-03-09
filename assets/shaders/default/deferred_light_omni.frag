precision highp float;

uniform sampler2D gb0;
uniform sampler2D gb1;
uniform sampler2D gb2;
uniform sampler2D gb3;

uniform vec4 lightColor;
uniform vec3 lightPosition;
uniform float lightIntensity;
uniform float lightRadius;

uniform mat4 view;
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

	vec4 viewPosition = view * vec4(P, 1.0);
	vec3 L = normalize(mat3(view) * lightVector);
	vec3 V = normalize(-viewPosition.xyz);
	vec3 H = normalize(L + V);
	float diffuseLight = max(dot(N, L), 0.0);
	float specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));
	vec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;
	vec3 specularColor = lightColor.rgb * specularLight * specularIntensity;

	vec3 final = attenuation * (diffuseColor + specularColor);

	gl_FragColor = vec4(final, 1.0);
}
