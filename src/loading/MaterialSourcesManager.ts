import Manager from 'loading/Manager';
import MaterialsManager from 'loading/MaterialsManager';
import TextManager from 'loading/TextManager';
import TextDescriptor from 'scene/descriptors/TextDescriptor';
import MaterialSourceDescriptor from 'scene/descriptors/MaterialSourceDescriptor';
import MaterialSource from 'scene/descriptors/MaterialSource';
import MaterialDescriptor from 'scene/descriptors/MaterialDescriptor';
import UniformFloat from 'rendering/shaders/UniformFloat';
import UniformMat2 from 'rendering/shaders/UniformMat2';
import UniformVec2 from 'rendering/shaders/UniformVec2';
import UniformMat3 from 'rendering/shaders/UniformMat3';
import UniformVec3 from 'rendering/shaders/UniformVec3';
import UniformMat4 from 'rendering/shaders/UniformMat4';
import UniformVec4 from 'rendering/shaders/UniformVec4';
import UniformColor from 'rendering/shaders/UniformColor';
import UniformInt from 'rendering/shaders/UniformInt';
import TextureDescriptor from 'scene/descriptors/TextureDescriptor';
import ShaderDescriptor from 'scene/descriptors/ShaderDescriptor';
import FRAK from 'Helpers';

/** Used to load materials from material sources.
	Example of usage:
	<pre>
	var materialSourcesManager=new MaterialSourcesManager(context);
	// Request text file containing material descriptor.
	// All sources requested by source containing the material descriptor will be loaded as well and
	// material becomes available for rendering
	var material=materialSourcesManager.add('material.json');
	materialSourcesManager.load(function() {
		// Do something with material
	});
	</pre>
	*/

class MaterialSourcesManager extends Manager {
	materialsManager: any;
	textManager: any;
	context: any;

	/** Constructor */
	constructor(context, assetsPath, materialsManager, textManager) {
		super(assetsPath);

		if(materialsManager && !(materialsManager instanceof MaterialsManager)) throw "materialsManager is not instance of MaterialsManager";
		if(textManager && !(textManager instanceof TextManager)) throw "textManager is not instance of TextManager";

		if(!materialsManager) materialsManager=new MaterialsManager(context);
		this.materialsManager=materialsManager;

		if(!textManager) textManager=new TextManager();
		this.textManager=textManager;

		this.context=context;
	}

	/** Adds new material descriptor to loading queue.
		@param source Path to source
		@return New text source object (until not loaded: {'data': false, 'descriptor': new TextDescriptor(source)}) */
	add(source): any {
		source = this.sourceCallback(source);
		return this.addDescriptor(new MaterialSourceDescriptor(source));
	}

	createResource(materialSourceDescriptor): any {
		return new MaterialSource(materialSourceDescriptor);
	}

	loadResource(materialSourceDescriptor, materialSource, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(materialSourceDescriptor);

		var text = this.textManager.add(descriptor.getFullPath());
		var scope = this;
		this.textManager.load(function() {
			var result = FRAK.parseJSON(text.data);

			// Create new material descriptor that will be used to load the actual material
			var md = new MaterialDescriptor();
			md.parentDescriptor = descriptor;

			// Load uniforms
			if(result.uniforms) {
				for(var u in result.uniforms) {
					var uniform=result.uniforms[u];
					if(uniform instanceof Array) {
						if(uniform.length==1) md.uniforms[u]=new UniformFloat(uniform);

						if(uniform.length==2) {
							if(uniform[0] instanceof Array) md.uniforms[u]=new UniformMat2(uniform[0].concat(uniform[1]));
							else md.uniforms[u]=new UniformVec2(uniform);
						}

						if(uniform.length==3) {
							if(uniform[0] instanceof Array) md.uniforms[u]=new UniformMat3(uniform[0].concat(uniform[1]).concat(uniform[2]));
							else md.uniforms[u]=new UniformVec3(uniform);
						}

						if(uniform.length==4) {
							if(uniform[0] instanceof Array) md.uniforms[u]=new UniformMat4(uniform[0].concat(uniform[1]).concat(uniform[2]).concat(uniform[3]));
							else md.uniforms[u]=new UniformVec4(uniform);
						}
					}
					else if(uniform instanceof Object) {
						if(!('a' in uniform)) uniform.a=0.0;
						md.uniforms[u]=new UniformColor(uniform);
					}
					else if(typeof uniform==='number' && Number.isInteger(uniform)) md.uniforms[u]=new UniformInt(uniform);
					else md.uniforms[u]=new UniformFloat(uniform);
				}
			}

			// Load texture descriptors
			if (result.textures) {
				for (var t in result.textures) {
					var textureDescriptor = new TextureDescriptor(result.textures[t]);
					md.textureDescriptors[t] = textureDescriptor;
					textureDescriptor.parentDescriptor = md;
				}
			}

			// Load shader
			if (result.shader) {
				if (result.shader instanceof Array) {
					md.shaderDescriptor = new ShaderDescriptor(result.shader[0], result.shader[1]);
				}
				else {
					md.shaderDescriptor = new ShaderDescriptor(result.shader);
				}
				md.shaderDescriptor.parentDescriptor = md;
			}

			// Load requirements
			if (result.requirements) {
				md.requirements = result.requirements;
			}

			materialSource.material = scope.materialsManager.addDescriptor(md);

			scope.materialsManager.load(function() {
				loadedCallback(descriptor, materialSource);
			});
		});
	}

}

globalThis.MaterialSourcesManager = MaterialSourcesManager;

export default MaterialSourcesManager;
