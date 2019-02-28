#version 300 es

// Shader for rendering linear depth values into a floating point texture
precision mediump float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

in float depth;
in vec2 uv;
out vec4 fragColor;

void main() {
	vec4 textureColor = texture(diffuse0, uv);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	fragColor = vec4(depth, depth, depth, depth);
}
