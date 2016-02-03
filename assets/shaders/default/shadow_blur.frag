/**
 * Shadow blur
 */

precision highp float;

uniform sampler2D src;

varying vec2 uv;
varying highp vec2 blurCoords[14];

void main () {
	lowp vec4 sum = vec4(0.0);
	sum += texture2D(src, blurCoords[ 0])*0.0044299121055113265;
	sum += texture2D(src, blurCoords[ 1])*0.00895781211794;
	sum += texture2D(src, blurCoords[ 2])*0.0215963866053;
	sum += texture2D(src, blurCoords[ 3])*0.0443683338718;
	sum += texture2D(src, blurCoords[ 4])*0.0776744219933;
	sum += texture2D(src, blurCoords[ 5])*0.115876621105;
	sum += texture2D(src, blurCoords[ 6])*0.147308056121;
	sum += texture2D(src, uv            )*0.159576912161;
	sum += texture2D(src, blurCoords[ 7])*0.147308056121;
	sum += texture2D(src, blurCoords[ 8])*0.115876621105;
	sum += texture2D(src, blurCoords[ 9])*0.0776744219933;
	sum += texture2D(src, blurCoords[10])*0.0443683338718;
	sum += texture2D(src, blurCoords[11])*0.0215963866053;
	sum += texture2D(src, blurCoords[12])*0.00895781211794;
	sum += texture2D(src, blurCoords[13])*0.0044299121055113265;
	gl_FragColor = sum;
}
