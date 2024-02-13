import Manager from 'loading/Manager';
import ShadersManager from 'loading/ShadersManager';
import TexturesManager from 'loading/TexturesManager';
import ModelDescriptor from 'scene/descriptors/ModelDescriptor';
import Node from 'scene/Node';
import ModelLoaderGLTF from 'loading/ModelLoaderGLTF';
import ModelLoaderJSON from 'loading/ModelLoaderJSON';

/** Models manager is used to load entire models together with shaders and textures. */
class ModelsManager extends Manager<ModelDescriptor, Node> {
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

	createResource() {
		return new Node();
	}

	/** Starts loading all currently added resources recursively.
		This method will return immediately. Callback will be called once
		there are no more queued or loading items waiting.
		@param callback Callback called once all resources have been loaded
		@param progressCallback Callback called when progress of this manager has changed */
	async load(callback?, progressCallback?) {
		await super.load(callback, progressCallback);

		this.shadersManager.load();
		this.texturesManager.load();
	}

	async loadResource(modelDescriptor: ModelDescriptor, resource: Node) {
		const descriptor = this.descriptorCallback(modelDescriptor);
		try {
			const format = modelDescriptor.getFormat();
			const loader = format === 'json' ?
				new ModelLoaderJSON(descriptor, this.shadersManager, this.texturesManager) :
				new ModelLoaderGLTF(descriptor, this.shadersManager, this.texturesManager, format);

			const response = await fetch(descriptor.getFullPath());
			const data = descriptor.isJSON() ? await response.json() : await response.arrayBuffer();
			await loader.load(resource, data);

			return [descriptor, resource] as [ModelDescriptor, Node];
		} catch (e) {
			throw descriptor;
		}
	}
}

globalThis.ModelsManager = ModelsManager;
export default ModelsManager;
