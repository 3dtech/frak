import Manager from 'loading/Manager';
import ShadersManager from 'loading/ShadersManager';
import TexturesManager from 'loading/TexturesManager';
import ModelDescriptor from 'scene/descriptors/ModelDescriptor';
import Node from 'scene/Node';
import ModelLoaderGLTF from 'loading/ModelLoaderGLTF';
import ModelLoaderJSON from 'loading/ModelLoaderJSON';
import ModelLoader from 'loading/ModelLoader';
import ThreadedDataParser from 'loading/ThreadedDataParser';

/** Models manager is used to load entire models together with shaders and textures. */
class ModelsManager extends Manager {
	shadersManager: any;
	texturesManager: any;

	constructor(context, assetsPath, shadersManager, texturesManager) {
		super(assetsPath);

		if(!shadersManager) shadersManager=new ShadersManager(context);
		this.shadersManager=shadersManager;

		if(!texturesManager) texturesManager=new TexturesManager(context);
		this.texturesManager=texturesManager;
	}

	/** Gets loading progress. The progress per resource also depends on progress of
		shaders and textures manager used by models manager.
		@return Current loading progress from 0 to 1 */
	getProgress(): any {
		var progress = super.getProgress();
		if (progress == 1.0)
			return progress;
		return progress+(this.texturesManager.getProgress()+this.shadersManager.getProgress())/2.0/this.getTotalItems();
	}

	add(source, format?): any {
		source = this.sourceCallback(source);
		return this.addDescriptor(new ModelDescriptor(source, format));
	}

	createResource(): any {
		return new Node();
	}

	/** Must load given resource from location described by descriptor
		@param descriptor Instance of resource descriptor
		@param resource Resource that will be loaded (created with createResource)
		@param loadedCallback Callback function(descriptor, resource) that must be called by loadResource when loading has finished successfully
		@param failedCallback Callback function(descriptor) that must be called by loadResource when loading has failed */
	loadResource(modelDescriptor, resource, loadedCallback, failedCallback): any {
		var descriptor = this.descriptorCallback(modelDescriptor);
		var scope = this;
		var format = modelDescriptor.getFormat();
		function loadGLTF(data) {
			var modelLoader = new ModelLoaderGLTF(descriptor, scope.shadersManager, scope.texturesManager, format);
			modelLoader.load(resource, data, function() {
				loadedCallback(descriptor, resource);

				scope.shadersManager.load(function() { });
				scope.texturesManager.load(function() { });
			});
		}

		if (format == 'json') {
			Logistics.getJSON(descriptor.getFullPath(), function (data) {
				var modelLoader = new ModelLoaderJSON(descriptor, scope.shadersManager, scope.texturesManager);
				modelLoader.load(resource, data);
				loadedCallback(descriptor, resource);

				scope.shadersManager.load(function() {});
				scope.texturesManager.load(function() {});
			});
		}
		else if (format == 'gltf') {
			Logistics.getJSON(descriptor.getFullPath(), loadGLTF);
		}
		else if (format == 'glb') {
			Logistics.getBinary(descriptor.getFullPath(), loadGLTF);
		}
		else {
			Logistics.getBinary(descriptor.getFullPath(),
				function(binaryData) {
					if(!binaryData || binaryData.byteLength == 0) {
						failedCallback(descriptor);
						return;
					}
					var parser = scope.createParser(
						binaryData,
						function(parsedData, userdata) {
							var modelLoader = new ModelLoader(descriptor, scope.shadersManager, scope.texturesManager);
							modelLoader.load(resource, parsedData);

							loadedCallback(descriptor, resource);

							scope.shadersManager.load(function() {});
							scope.texturesManager.load(function() {});
						},
						function(errors, userdata) {
							failedCallback(descriptor);
						},
						function(progress, userdata) {}
					);
					parser.parse();
				}
			);
		}
	}

	/** This function can be overridden to provide alternative parser instances */
	createParser(data, cbOnComplete, cbOnError, cbOnProgress, userdata?) {
		return new ThreadedDataParser(data, cbOnComplete, cbOnError, cbOnProgress, userdata);
	}
}

globalThis.ModelsManager = ModelsManager;
export default ModelsManager;
