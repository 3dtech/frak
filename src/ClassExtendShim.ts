import Engine from "engine/Engine";
import FPS from "engine/FPS";
import Input from "engine/Input";
import AssetsManager from "loading/AssetsManager";
import DataParser from "loading/DataParser";
import DataParserResult from "loading/DataParserResult";
import Manager from "loading/Manager";
import ModelLoader from "loading/ModelLoader";
import ModelLoaderGLTF from "loading/ModelLoaderGLTF";
import ModelLoaderJSON from "loading/ModelLoaderJSON";
import MatrixStack from "rendering/MatrixStack";
import RenderingContext from "rendering/RenderingContext";
import RenderBuffer from "rendering/buffers/RenderBuffer";
import RenderStage from "rendering/camera/RenderStage";
import RenderTarget from "rendering/camera/RenderTarget";
import RendererOrganizer from "rendering/camera/RendererOrganizer";
import ScreenQuad from "rendering/camera/ScreenQuad";
import Renderer from "rendering/renderers/Renderer";
import SamplerAccumulator from "rendering/shaders/SamplerAccumulator";
import ShaderRequirements from "rendering/shaders/ShaderRequirements";
import Subshader from "rendering/shaders/Subshader";
import Space from "rendering/spaces/Space";
import Font from "rendering/text/Font";
import Cloneable from "scene/Cloneable";
import CyclicSerializer from "scene/CyclicSerializer";
import Serializer from "scene/Serializer";
import CollisionOctreeNode from "scene/geometry/CollisionOctreeNode";
import InfiniteCone from "scene/geometry/InfiniteCone";
import Mesh from "scene/geometry/Mesh";
import Plane from "scene/geometry/Plane";
import Ray from "scene/geometry/Ray";
import RayTestResult from "scene/geometry/RayTestResult";
import Submesh from "scene/geometry/Submesh";

// For every "base" (not extending) class, implement an extends function for backwards compatibility
[
	Cloneable,
	Serializer,
	Submesh,
	RayTestResult,
	Ray,
	Plane,
	Mesh,
	InfiniteCone,
	CollisionOctreeNode,
	CyclicSerializer,
	Font,
	Space,
	Subshader,
	ShaderRequirements,
	SamplerAccumulator,
	RenderingContext,
	Renderer,
	MatrixStack,
	ScreenQuad,
	RenderTarget,
	RenderStage,
	RendererOrganizer,
	RenderBuffer,
	FPS,
	Input,
	Engine,
	ModelLoader,
	ModelLoaderGLTF,
	ModelLoaderJSON,
	Manager,
	DataParser,
	DataParserResult,
	AssetsManager,
].forEach(function(extendable) {
	var initializing = false;
	// var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	var fnTest = /\b_super\b/;

	// Create a new FrakClass that inherits from this class
	(extendable as any).extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();

		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			if (typeof prop[name] === 'function' && fnTest.test(prop[name])) {
				var superFn = name === 'init' && typeof _super[name] !== 'function' ?
					function() {
						return new _super.constructor(arguments);
					} :
					_super[name];

					prototype[name] = (function(fn) {
						return function() {
							var tmp = this._super;
							this._super = superFn;
							var ret = fn.apply(this, arguments);
							this._super = tmp;
							return ret;
						};
					})(prop[name]);
			} else {
				prototype[name] = prop[name];
			}
		}

		// The dummy class constructor
		function FrakClass() {
			// All construction is actually done in the init method
			if (!initializing) {
				if (this.init) {
					this.init.apply(this, arguments);
				} else if (this.prototype && this.prototype.constructor) {
					this.prototype.constructor.apply(this, arguments);
				}
			}
		}

		// Populate our constructed prototype object
		FrakClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		FrakClass.prototype.constructor = FrakClass;

		// And make this class extendable
		FrakClass.extend = arguments.callee;

		return FrakClass;
	};
});
