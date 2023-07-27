import BoundingBox from 'scene/geometry/BoundingBox.js'
import BoundingSphere from 'scene/geometry/BoundingSphere.js'
import RenderingContext from 'rendering/RenderingContext.js'
import Shader from 'rendering/shaders/Shader.js'
import UniformMat4 from 'rendering/shaders/UniformMat4.js'
import UniformInt from 'rendering/shaders/UniformInt.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import Camera from 'rendering/camera/Camera.js'
import UniformVec3 from 'rendering/shaders/UniformVec3.js'
import Light from 'scene/components/Light.js'

/** Renderer baseclass. Essentially Renderer classes are for containing ready-made buffers
  that are used straight for rendering. To render many at once add them to DynamicSpace. */

class Renderer {
	matrix: any;
	layer: any;
	visible: any;
	castShadows: any;
	receiveShadows: any;
	lightContribution: any;
	reflectivity: any;
	transparent: any;
	customShader: any;
	localBoundingBox: any;
	localBoundingSphere: any;
	globalBoundingBox: any;
	globalBoundingSphere: any;
	
	/** Constructor
		@param matrix Matrix applied to anything rendered
		*/
	constructor(matrix) {
		// Usually updated automatically by the component
		this.matrix = matrix;
		this.layer = 1;
		this.visible = true;
		this.castShadows = true;
		this.receiveShadows = true;
		this.lightContribution = 1.0;
		this.reflectivity = 0.0;

		this.transparent = false; ///< Value must be set to true to have renderer passed through transparent pipeline
		this.customShader = false;

		this.localBoundingBox = new BoundingBox();
		this.localBoundingSphere = new BoundingSphere();
		this.globalBoundingBox = new BoundingBox();
		this.globalBoundingSphere = new BoundingSphere();
	}

	// Methods
	/** Rendering function that calls onRender method doing the actual rendering
		@param context Instance of RenderingContext
		@param pass Rendering pass */
	render(context, pass): any {
		this.onRender(context, pass);
	}

	/** Rendering function that calls onRenderGeometry method doing the actual rendering.
		Used to render plain geometry with given shader.
		@param context Instance of RenderingContext
		@param shader Instance of Shader */
	renderGeometry(context, shader): any {
		this.onRenderGeometry(context, shader);
	}

	/**
	 * Returns default uniforms used commonly for everything.
	 * @param context Instance of RenderingContext
	 * @param uniforms Optional previously allocated uniforms object (cache) that the values will be written to.
	 */
	getDefaultUniforms(context, uniforms): any {
		if (typeof uniforms !== 'object' || uniforms === null) {
			uniforms = {};
		}

		if (uniforms.hasOwnProperty('model')) mat4.copy(uniforms.model.value, this.matrix);
		else uniforms.model = new UniformMat4(this.matrix);

		if (uniforms.hasOwnProperty('modelview')) mat4.copy(uniforms.modelview.value, context.modelview.top());
		else uniforms.modelview = new UniformMat4(context.modelview.top());

		if (uniforms.hasOwnProperty('projection')) mat4.copy(uniforms.projection.value, context.projection.top());
		else uniforms.projection = new UniformMat4(context.projection.top());

		// if ('castShadows' in uniforms) uniforms.castShadows.value = this.castShadows ? 1 : 0;
		// else uniforms.castShadows = new UniformInt(this.castShadows ? 1 : 0);

		if (uniforms.hasOwnProperty('receiveShadows')) uniforms.receiveShadows.value = this.receiveShadows ? 1 : 0;
		else uniforms.receiveShadows = new UniformInt(this.receiveShadows ? 1 : 0);

		if (uniforms.hasOwnProperty('lightContribution')) uniforms.lightContribution.value = this.lightContribution;
		else uniforms.lightContribution = new UniformFloat(this.lightContribution);

		if (uniforms.hasOwnProperty('reflectivity')) uniforms.reflectivity.value = this.reflectivity;
		else uniforms.reflectivity = new UniformFloat(this.reflectivity);

		// Camera uniforms
		if (context.camera) {
			if (uniforms.hasOwnProperty('view')) mat4.copy(uniforms.view.value, context.camera.viewMatrix);
			else uniforms.view = new UniformMat4(context.camera.viewMatrix);

			if (uniforms.hasOwnProperty('viewInverse')) mat4.copy(uniforms.viewInverse.value, context.camera.viewInverseMatrix);
			else uniforms.viewInverse = new UniformMat4(context.camera.viewInverseMatrix);

			if (context.camera.near) {
				if (uniforms.hasOwnProperty('zNear')) uniforms.zNear.value = context.camera.near;
				else uniforms.zNear = new UniformFloat(context.camera.near);
			}

			if (context.camera.far) {
				if (uniforms.hasOwnProperty('zFar')) uniforms.zFar.value = context.camera.far;
				else uniforms.zFar = new UniformFloat(context.camera.far);
			}

			if (uniforms.hasOwnProperty('cameraPosition')) vec3.copy(uniforms.cameraPosition.value, context.camera.getPosition());
			else uniforms.cameraPosition = new UniformVec3(context.camera.getPosition());
		}

		// Light uniforms
		if (context.light && context.light.uniforms) {
			uniforms.lightDirection = context.light.uniforms.lightDirection;
			uniforms.lightColor = context.light.uniforms.lightColor;
			uniforms.lightIntensity = context.light.uniforms.lightIntensity;
			uniforms.useShadows = context.light.uniforms.useShadows;
		}

		// Shadow uniforms
		if (context.shadow) {
			uniforms.lightView = context.shadow.lightView;
			uniforms.lightProjection = context.shadow.lightProjection;
		}

		return uniforms;
	}

	getGlobalSamplers(context): any {
		var samplers = [];
		if (context.shadow) {
			samplers.push(context.shadow.shadow0);
		}
		return samplers;
	}

	/** Updates matrix and global bounding volumes */
	setMatrix(matrix): any {
		this.matrix = matrix;
		this.updateGlobalBoundingVolumes();
	}

	/** Updates global bounding volumes */
	updateGlobalBoundingVolumes(): any {
		this.localBoundingBox.transform(this.matrix, this.globalBoundingBox);
		this.localBoundingSphere.transform(this.matrix, this.globalBoundingSphere);
	}

	// Events
	/** Called when render is called
		@param context Instance of RenderingContext
		@param pass Rendering pass */
	onRender(context, pass): any {}

	/** Called when renderGeometry is called
		@param context Instance of RenderingContext
		@param shader Instance of Shader */
	onRenderGeometry(context, shader) {}

}

globalThis.Renderer = Renderer;

export default Renderer;