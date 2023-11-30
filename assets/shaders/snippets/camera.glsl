uniform Camera {
	mat4 projection;
	mat4 projectionInverse;
	mat4 view;
	mat4 viewInverse;
	float zNear;
	float zFar;
	vec3 cameraPosition;
};
