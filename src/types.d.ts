import Plane from "scene/geometry/Plane";

declare global {
	var vec2: any;
	var vec3: any;
	var vec4: any;
	var mat3: any;
	var mat4: any;

	var HammerWF: any;
	var jDataView: any;

	var BoundingVolumeVectorCache: any[];
	var AABBPlaneCache: Plane;
	var fallbackCubeTexture: any;
	var fallbackTexture: any;

	interface String {
		format(...args): string;
	}
}

export {}
