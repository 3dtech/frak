import Plane from "scene/geometry/Plane";

declare global {
	var vec2: any;
	var vec3: any;
	var vec4: any;
	var mat2: any;
	var mat3: any;
	var mat4: any;

	var HammerWF: any;
	var jDataView: any;
	var jQuery: any;
	var WebGLDebugUtils: any;

	var BoundingVolumeVectorCache: any[];
	var RayTestLocalCache: any[];
	var AABBPlaneCache: Plane;
	var fallbackCubeTexture: any;
	var fallbackTexture: any;
}

export {}
