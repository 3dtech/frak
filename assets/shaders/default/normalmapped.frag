// Diffuse shader
precision highp float; 

uniform mat4 modelview;
uniform mat4 view;

uniform vec4 ambient;
uniform vec4 diffuse;
uniform float diffuseIntensity;
uniform vec4 specular;
uniform float specularPower;
uniform float specularIntensity;

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;
// uniform float linearDepthConstant;
uniform float shadowIntensity;
uniform float poissonDiscSize;

uniform sampler2D diffuse0;
uniform sampler2D shadow0;
uniform sampler2D height0;

varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;
varying vec2 uv0;

float unpack(vec4 c) {
	const vec4 bitShifts = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
	return dot(c, bitShifts);
}

void main(void) {
	vec2 poissonDisk[4];
	poissonDisk[0]=vec2( -0.94201624, -0.39906216 );
	poissonDisk[1]=vec2( 0.94558609, -0.76890725 );
	poissonDisk[2]=vec2( -0.094184101, -0.92938870 );
	poissonDisk[3]=vec2( 0.34495938, 0.29387760 );
	
	// Color and directional lighting
	vec4 textureColor = texture2D(diffuse0, uv0);
	vec4 heightColor = texture2D(height0, uv0);
	//vec3 N = normalize(vec3(viewNormal.x, viewNormal.y, viewNormal.z)+heightColor.xyz);
	vec3 N = normalize(heightColor.xyz+viewNormal.xyz);
	//vec3 N = normalize(viewNormal);
	vec3 L = normalize(mat3(view)*lightDirection);
	float diffuseLight = max(dot(N, L), 0.0) * lightIntensity;
	
	vec3 reflection=normalize(reflect(lightDirection, N));
	float specularFactor = max(dot(-viewPosition.xyz, reflection), 0.0);
	specularFactor=pow(specularFactor, specularPower);
	
	//vec4 color = (ambient * textureColor) + (diffuse * textureColor * lightColor * diffuseLight);
	vec4 color = (ambient * textureColor) + (diffuse * diffuseIntensity * textureColor * lightColor * diffuseLight)+(lightColor*specularFactor*specularIntensity);
	//vec4 color = vec4(diffuseLight, diffuseLight, diffuseLight, 1);
	//vec4 color = vec4(vec3(1,1,1)*specularFactor*specularIntensity, 1);
	//vec4 color = heightColor;
	
	float shadow = 1.0;
	float vertexDepth = shadowPosition.z * 0.99;
	
	// float shadowDepth = unpack(texture2D(shadow0, shadowPosition.xy));
	// if (shadowDepth < vertexDepth)
		// shadow = 0.5;
	
	vec2 shadowUV = shadowPosition.xy;
	float shadowDepth = 0.0;
	shadowDepth = unpack(texture2D(shadow0, shadowUV+poissonDisk[0]*poissonDiscSize));
	if (shadowDepth<vertexDepth) shadow-=0.2*shadowIntensity;
	shadowDepth = unpack(texture2D(shadow0, shadowUV+poissonDisk[1]*poissonDiscSize));
	if (shadowDepth<vertexDepth) shadow-=0.2*shadowIntensity;
	shadowDepth = unpack(texture2D(shadow0, shadowUV+poissonDisk[2]*poissonDiscSize));
	if (shadowDepth<vertexDepth) shadow-=0.2*shadowIntensity;
	shadowDepth = unpack(texture2D(shadow0, shadowUV+poissonDisk[3]*poissonDiscSize));
	if (shadowDepth<vertexDepth) shadow-=0.2*shadowIntensity;
		
	gl_FragColor = clamp(vec4(color.xyz*shadow, color.a), 0.0, 1.0);
}
