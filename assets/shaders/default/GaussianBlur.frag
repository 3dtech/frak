// Shader for rendering gaussian blurred image (horizontal)
precision highp float;

#define MAX_BLUR_KERNEL_SIZE 10

uniform float screenWidth;
uniform float screenHeight;
uniform int orientation; // 0 - horizontal, 1 - vertical
uniform int kernelSize; // Recommended values: 3, 5, 7, 10 (10 is currently the maximum)
uniform sampler2D tex0;

varying vec2 uv0;

void main () {
	float halfSize = float(kernelSize)*0.5;
	vec2 texelSize = vec2(1.0/screenWidth, 1.0/screenHeight);
	vec4 color = vec4(0.0);

	if (orientation==1) {
		// vertical pass
		for (int i=0; i<MAX_BLUR_KERNEL_SIZE; ++i) {
			if (i>=kernelSize)
				break;
			float offset = float(i)-halfSize;
			color += texture2D(tex0, uv0 + vec2(0.0, offset * texelSize.y));
		}
	}
	else {
		// horizontal pass
		for (int i=0; i<MAX_BLUR_KERNEL_SIZE; ++i) {
			if (i>=kernelSize)
				break;
			float offset = float(i)-halfSize;
			color += texture2D(tex0, uv0 + vec2(offset * texelSize.x, 0.0));
		}
	}
	gl_FragColor = color / float(kernelSize);
	// gl_FragColor = texture2D(tex0, uv0);
}
