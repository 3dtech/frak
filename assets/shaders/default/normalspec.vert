attribute vec3 position; 
attribute vec3 normal; 
attribute vec3 tangent;
attribute vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 viewInverse;
uniform vec3 lightDirection;

varying vec3 fragLight;
varying vec3 fragEye;
varying vec3 fragNormal;
varying vec4 fragPosition;
varying vec2 uv0;


void main(void) {
	uv0=texcoord2d0;
	
	mat3 model=mat3(modelview)*mat3(viewInverse);
	
	mat3 tspc;
	tspc[0]=normalize(tangent)*mat3(modelview);
	tspc[1]= normalize(cross(tangent,normal))*mat3(modelview);
	tspc[2]= normalize(normal)*mat3(modelview);
	
	fragPosition= projection*modelview*vec4(position, 1.0);
	fragLight.x= dot (lightDirection, tspc[0]);
	fragLight.y= dot (lightDirection, tspc[1]);
	fragLight.z= dot (lightDirection, tspc[2]);
	
	vec3 mviewVertex= -(vec3(mat3(modelview) * position));
	fragEye.x = dot (mviewVertex, tspc[0]);
	fragEye.y = dot (mviewVertex, tspc[1]);
	fragEye.z = dot (mviewVertex, tspc[2]);
	fragNormal=model*normalize(normal);
	
	gl_Position = fragPosition; 
}