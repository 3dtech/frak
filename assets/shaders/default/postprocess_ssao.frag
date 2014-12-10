/*
 * Screen space ambient occlusion post process
 *
 * SSAO GLSL shader v1.2
 * assembled by Martins Upitis (martinsh) (devlog-martinsh.blogspot.com)
 * original technique is made by Arkano22 (www.gamedev.net/topic/550699-ssao-no-halo-artifacts/)
 *
 * Changelog:
 * 1.2 - added fog calculation to mask AO. Minor fixes.
 * 1.1 - added spiral sampling method from here:
 * (http://www.cgafaq.info/wiki/Evenly_distributed_points_on_sphere)
 */

precision mediump float;

#define PI 3.14159265

uniform sampler2D depth0;
uniform sampler2D oitWeight;
uniform sampler2D src;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

uniform int ssaoOnly;
uniform float gdisplace; // Gauss bell center, default: 0.3
uniform float radius; // AO radius, default: 2.0
uniform float brightness; // AO brightness, default: 1.0
uniform float luminanceInfluence; // how much luminance affects occlusion, default: 0.7

const int samples = 16;
// const int samples = 8;

float aoclamp = 0.25; // depth clamp - reduces haloing at screen edges
bool noise = true; // use noise instead of pattern for sample dithering
float noiseamount = 0.0002; // dithering amount
float diffarea = 0.4; // self-shadowing reduction

vec2 rand(vec2 coord) {
	float noiseX = ((fract(1.0-coord.s*(ViewportSize.x/2.0))*0.25)+(fract(coord.t*(ViewportSize.y/2.0))*0.75))*2.0-1.0;
	float noiseY = ((fract(1.0-coord.s*(ViewportSize.x/2.0))*0.75)+(fract(coord.t*(ViewportSize.y/2.0))*0.25))*2.0-1.0;
	if (noise) {
		noiseX = clamp(fract(sin(dot(coord, vec2(12.9898,78.233))) * 43758.5453),0.0,1.0)*2.0-1.0;
		noiseY = clamp(fract(sin(dot(coord, vec2(12.9898,78.233)*2.0)) * 43758.5453),0.0,1.0)*2.0-1.0;
	}
	return vec2(noiseX, noiseY) * noiseamount;
}

float readDepth(in vec2 coord) {
	return texture2D(depth0, coord).r;
}

float compareDepths(in float depth1, in float depth2, inout int far) {
	float garea = 2.0; // gauss bell width
	float diff = (depth1 - depth2)*100.0; // depth difference (0-100)
	// reduce left bell width to avoid self-shadowing
	if (diff<gdisplace) {
		garea = diffarea;
	}
	else {
		far = 1;
	}

	float gauss = pow(2.7182,-2.0*(diff-gdisplace)*(diff-gdisplace)/(garea*garea));
	return gauss;
}

float calAO(vec2 uv, float depth, float dw, float dh) {
	float dd = (1.0-depth) * radius;

	float temp = 0.0;
	float temp2 = 0.0;
	float coordw = uv.x + dw*dd;
	float coordh = uv.y + dh*dd;
	float coordw2 = uv.x - dw*dd;
	float coordh2 = uv.y - dh*dd;

	vec2 coord = vec2(coordw , coordh);
	vec2 coord2 = vec2(coordw2, coordh2);

	int far = 0;
	temp = compareDepths(depth, readDepth(coord), far);
	//DEPTH EXTRAPOLATION:
	if (far > 0) {
		temp2 = compareDepths(readDepth(coord2), depth, far);
		temp += (1.0-temp)*temp2;
	}

	return temp;
}

void main() {
	vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
	vec2 texCoord = gl_FragCoord.xy * inverseVP;

	vec2 noise = rand(texCoord);
	float depth = readDepth(texCoord);
	float reveal = texture2D(oitWeight, texCoord).a;

	float w = inverseVP.x/clamp(depth, aoclamp,1.0)+(noise.x*(1.0-noise.x));
	float h = inverseVP.y/clamp(depth, aoclamp,1.0)+(noise.y*(1.0-noise.y));

	float pw;
	float ph;

	float ao;

	float dl = PI*(3.0-sqrt(5.0));
	float dz = 1.0/float(samples);
	float l = 0.0;
	float z = 1.0 - dz/2.0;

	for (int i = 0; i <= samples; i ++) {
		float r = sqrt(1.0-z);
		pw = cos(l)*r;
		ph = sin(l)*r;
		ao += calAO(texCoord, depth, pw*w, ph*h);
		z = z - dz;
		l = l + dl;
	}

	ao /= float(samples) * brightness;
	ao = 1.0 - ao * reveal;

	vec3 color = texture2D(src, texCoord).rgb;
	vec3 lumcoeff = vec3(0.299, 0.587, 0.114);
	float lum = dot(color.rgb, lumcoeff);
	vec3 luminance = vec3(lum, lum, lum);
	vec3 final = vec3(color*mix(vec3(ao),vec3(1.0), luminance * luminanceInfluence));

	if (ssaoOnly == 1) {
		final = vec3(mix(vec3(ao),vec3(1.0),luminance * luminanceInfluence));
	}

	gl_FragColor = vec4(final, 1.0);
}
