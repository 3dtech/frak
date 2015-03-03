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

varying vec2 uv;

const mat4 scaleMatrix = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

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
	// vec4 shadowPosition = scaleMatrix * lightProjection * lightView * vec4(P, 1.0);
	// vec4 shadowCoord = lightProjection * lightView * vec4(P, 1.0);
	// shadowCoord /= shadowCoord.w;
	// shadowCoord.xyz = shadowCoord.xyz * vec3(0.5, 0.5, 0.5) + vec3(0.5, 0.5, 0.5);
	// float shadow = VSM(shadow0, shadowCoord.xy, data1.w);

	vec3 final = shadow * (diffuseColor + specularColor);

	gl_FragColor = vec4(final, 1.0);
}

