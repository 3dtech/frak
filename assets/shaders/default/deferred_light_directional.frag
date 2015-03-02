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

uniform mat4 lightView;
uniform mat4 lightProjection;

varying vec2 uv;

float linstep(float low, float high, float v) {
	return clamp((v-low)/(high-low), 0.0, 1.0);
}

float VSM(sampler2D depths, vec2 uv, float compare) {
	vec2 moments = texture2D(depths, uv).xy;
	float p = smoothstep(compare-0.02, compare, moments.x);
	float variance = max(moments.y - moments.x*moments.x, -0.001);
	float d = compare - moments.x;
	float p_max = linstep(0.2, 1.0, variance / (variance + d*d));
	return clamp(max(p, p_max), 0.0, 1.0);
}

void main () {
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

	vec4 ShadowCoord = lightProjection * lightView * vec4(P, 1.0);
	ShadowCoord /= ShadowCoord.w;
	ShadowCoord.xyz = ShadowCoord.xyz * vec3(0.5, 0.5, 0.5) + vec3(0.5, 0.5, 0.5);
	float shadow = VSM(shadow0, ShadowCoord.xy, data1.w);

	gl_FragColor = lightIntensity * (vec4(diffuseLight, 1.0) * lightColor + specularLight * lightColor) * shadow;
}

