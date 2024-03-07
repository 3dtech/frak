#version 300 es

in vec3 position;
in vec3 pointA;
in vec3 pointB;
in float width;
layout(location = 5) in vec4 color;

uniform vec2 viewport;
uniform mat4 model;

#include "snippets/camera.glsl"

out vec4 fragColor;
out vec4 fragPosition;

vec4 clipNearPlane(vec4 a, vec4 b) {
	if (a.z > a.w && b.z <= b.w) {
		float dA = a.z - a.w;
		float dB = b.z - b.w;
		float t = dA / (dA - dB);
		return a + (b - a) * t;
	}
	return a;
}

void main() {
	vec4 pA = projection * model * view * vec4(pointA, 1.0);
	vec4 pB = projection * model * view * vec4(pointB, 1.0);
	pA = clipNearPlane(pA, pB);
	pB = clipNearPlane(pB, pA);

	vec2 screenA = viewport * (0.5 * pA.xy / pA.w + 0.5);
	vec2 screenB = viewport * (0.5 * pB.xy / pB.w + 0.5);

	vec2 xBasis = normalize(screenB - screenA);
	vec2 yBasis = vec2(-xBasis.y, xBasis.x);

	vec2 offsetA = screenA.xy + width * (position.x * xBasis + position.y * yBasis);
	vec2 offsetB = screenB.xy + width * (position.x * xBasis + position.y * yBasis);

	vec2 pt = mix(offsetA, offsetB, position.z);
	vec4 clip = mix(pA, pB, position.z);

	fragColor = color;
	fragPosition = vec4(clip.w * ((2.0 * pt) / viewport - 1.0), clip.z, clip.w);
	gl_Position = fragPosition;
}
