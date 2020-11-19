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

	vec2 xBasis = normalize(pB.xy / pB.w - pA.xy / pA.w);
	vec2 yBasis = vec2(-xBasis.y, xBasis.x);

	vec2 offsetA = pA.xy / pA.w + width * (position.x * xBasis + position.y * yBasis) / viewport;
	vec2 offsetB = pB.xy / pB.w + width * (position.x * xBasis + position.y * yBasis) / viewport;

	fragColor = color;
	fragPosition=modelview*vec4(position, 1.0);
	gl_Position=vec4(mix(offsetA, offsetB, position.z), mix(pA.z / pA.w, pB.z / pB.w, position.z), 1.0);
}
