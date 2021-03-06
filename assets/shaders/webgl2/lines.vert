#version 300 es

in vec3 position;
in vec3 pointA;
in vec3 pointB;
in float width;
in vec4 color;

uniform vec2 viewport;

uniform mat4 modelview;
uniform mat4 projection;

out vec4 fragColor;
out vec4 fragPosition;

void main() {
	vec4 pA = projection * modelview * vec4(pointA, 1.0);
	vec4 pB = projection * modelview * vec4(pointB, 1.0);

	vec2 screenA = viewport * (0.5 * pA.xy / pA.w + 0.5);
	vec2 screenB = viewport * (0.5 * pB.xy / pB.w + 0.5);

	vec2 xBasis = normalize(screenB - screenA);
	vec2 yBasis = vec2(-xBasis.y, xBasis.x);

	vec2 offsetA = screenA.xy + width * (position.x * xBasis + position.y * yBasis);
	vec2 offsetB = screenB.xy + width * (position.x * xBasis + position.y * yBasis);

	vec2 pt = mix(offsetA, offsetB, position.z);
	vec4 clip = mix(pA, pB, position.z);

	fragColor = color;
	fragPosition=modelview*vec4(position, 1.0);
	gl_Position=vec4(clip.w * ((2.0 * pt) / viewport - 1.0), clip.z, clip.w);
}
