precision highp float;
uniform sampler2D height0;
uniform sampler2D specular0;
uniform sampler2D diffuse0;

varying vec2 uv0;
varying vec3 fragNormal;

uniform mat4 viewInverse;
uniform mat4 modelviewInverse;
uniform vec3 lightDirection;

varying vec4 fragPosition;
varying vec3 fragLight;
varying vec3 fragEye;


void main (void){
	vec3 normal =(2.0* (texture2D(height0, uv0).xyz))-1.0;
	vec3 shinycolor= (texture2D(specular0,uv0).xyz);
	vec3 diffColor=(texture2D(diffuse0,uv0).xyz);
	float distSqr = dot(fragLight, fragLight);
	vec3 lVec= fragLight* inversesqrt(distSqr);
	
	float spec= clamp(dot(reflect(-lVec,normal),normalize(fragEye)),0.0,1.0);
	
	vec3 specCol=spec*shinycolor;
	gl_FragColor=vec4(diffColor+specCol.xyz,1.0);
}