import Manager from 'loading/Manager';
import ShadersManager from 'loading/ShadersManager';
import TexturesManager from 'loading/TexturesManager';
import ModelDescriptor from 'scene/descriptors/ModelDescriptor';
import Node from 'scene/Node';
import ModelLoaderGLTF from 'loading/ModelLoaderGLTF';
import ModelLoaderJSON from 'loading/ModelLoaderJSON';

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

	/** Starts loading all currently added resources recursively.
		This method will return immediately. Callback will be called once
		there are no more queued or loading items waiting.
		@param callback Callback called once all resources have been loaded
		@param progressCallback Callback called when progress of this manager has changed */
	async load(callback?, progressCallback?) {
		if(progressCallback) {
			this.progressCallbacks.push(progressCallback);
		}

		if(callback) {
			this.callbacks.push(callback);
			if (this.callbacks.length > 1) {
				if(this.queue.length == 0) {
					this.callDoneCallbacks();
				}
			}
		}

		this.loading.push(...this.queue);
		const queue = (this.queue as any[]).map(
			next => async () => {
				try {
					const [d, r] = await this.loadResource(next[0], next[2]);
					this.cache[d.serialize(['id'])] = r;	// Cache resource
					this.cacheSize++;							// Remember that we have more items cached now (for getProgress)
					this.removeLoadedResource(d);
					this.onLoaded(d);
				} catch (e) {
					console.warn("Failed to load resource with descriptor: ", e.serialize(['id']));
					this.removeLoadedResource(e);
					this.onLoaded(e);
					if (e.getFullPath) console.warn('Full path: ', e.getFullPath());
				} finally {
					// Call progress callbacks
					for(var i = 0; i < this.progressCallbacks.length; i++) {
						this.progressCallbacks[i](this.getProgress());
					}

					// Everything has been loaded
					if(this.loading.length==0) {
						// Call all registered callbacks
						this.callDoneCallbacks();
					}
				}
			}
		);

		this.queue = [];

		await Promise.allSettled(queue.map(fn => fn()));
	}

	async loadGLTF(descriptor, resource) {
		const response = await fetch(descriptor.getFullPath());
		const modelLoader = new ModelLoaderGLTF(descriptor, this.shadersManager, this.texturesManager, descriptor.getFormat());
		const data = descriptor.getFormat() === 'json' ? await response.json() : await response.arrayBuffer();
		await modelLoader.load(resource, data, () => {
			this.shadersManager.load(() => {});
			this.texturesManager.load(() => {});
		});
	}

	/** Must load given resource from location described by descriptor
		@param descriptor Instance of resource descriptor
		@param resource Resource that will be loaded (created with createResource)
		@param loadedCallback Callback function(descriptor, resource) that must be called by loadResource when loading has finished successfully
		@param failedCallback Callback function(descriptor) that must be called by loadResource when loading has failed */
	loadResource(modelDescriptor, resource) {
		return new Promise<[ModelDescriptor, Node]>((resolve, reject) => {
			var descriptor = this.descriptorCallback(modelDescriptor);
			var scope = this;
			var format = modelDescriptor.getFormat();

			if (format == 'json') {
				Logistics.getJSON(descriptor.getFullPath(), function (data) {
					var modelLoader = new ModelLoaderJSON(descriptor, scope.shadersManager, scope.texturesManager);
					modelLoader.load(resource, data);
					resolve([descriptor, resource]);

					scope.shadersManager.load(function() {});
					scope.texturesManager.load(function() {});
				});
			}
			else if (format == 'gltf' || format == 'glb') {
				this.loadGLTF(descriptor, resource).then(() => resolve([descriptor, resource]));
			}
		});
	}
}

globalThis.ModelsManager = ModelsManager;
export default ModelsManager;
