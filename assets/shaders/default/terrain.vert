// Terrain shader for the forward renderer

attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord2d0;
attribute vec3 barycentric;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 lightProjection;
uniform mat4 lightView;

uniform sampler2D height;

uniform float verticalScale;
uniform vec2 uvOffset;
uniform vec2 uvScale;

varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;

varying vec3 bc;

float snap(float f, float step) {
	return step * floor(f / step);
}

void main() {
	bc = barycentric;
	uv0 = texcoord2d0 * uvScale + uvOffset;
	worldPosition = model * vec4(position, 1.0);

	// worldPosition.x = snap(worldPosition.x, worldPosition.y);
	// worldPosition.z = snap(worldPosition.z, worldPosition.y);

	float height = texture2D(height, uv0).r;
	worldPosition.y = height * verticalScale;
	// worldPosition.y = 0.0;

	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;

	shadowPosition = lightProjection * lightView * worldPosition;

	gl_Position = projection * viewPosition;
}
