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

uniform mat4 view;
uniform mat4 lightView;
uniform mat4 lightProjection;
uniform float shadowBias;

varying vec2 uv;

const mat4 scaleAndBias = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

void main () {
	vec4 data0 = texture2D(gb0, uv);
	vec4 data1 = texture2D(gb1, uv);
	vec4 data2 = texture2D(gb2, uv);

	vec3 C = data0.xyz;
	vec3 N = data1.xyz;
	vec3 P = data2.xyz;
	float specularIntensity = data0.w;
	float specularPower = 255.0*data2.w;

	vec4 viewPosition = view * vec4(P, 1.0);
	vec3 L = normalize(mat3(view) * lightDirection);
	vec3 V = normalize(-viewPosition.xyz);
	vec3 H = normalize(L + V);
	float diffuseLight = max(dot(N, L), 0.0);
	float specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));
	vec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;
	vec3 specularColor = lightColor.rgb * specularLight * specularIntensity;

	float shadow = 1.0;
	vec4 shadowPosition = scaleAndBias * lightProjection * lightView * vec4(P, 1.0);
	vec3 shadowCoord = shadowPosition.xyz / shadowPosition.w;
	vec4 shadowTexel = texture2D(shadow0, shadowCoord.xy);
	shadow = step(shadowCoord.z*shadowBias, shadowTexel.r);

	vec3 final = shadow * (diffuseColor + specularColor);
	gl_FragColor = vec4(final, 1.0);
}

