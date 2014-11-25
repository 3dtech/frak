// Shader for rendering linear depth values into a floating point texture
attribute vec3 position;

uniform mat4 modelview;
uniform mat4 projection;
uniform float zNear;
uniform float zFar;

varying float depth;

void main() {
	vec4 viewPosition = modelview * vec4(position, 1.0);
	depth = (-viewPosition.z - zNear) / (zFar - zNear);
	gl_Position = projection * viewPosition;
}
