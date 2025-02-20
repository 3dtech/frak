import Manager from 'loading/Manager';
import ShadersManager from 'loading/ShadersManager';
import TexturesManager from 'loading/TexturesManager';
import ModelDescriptor from 'scene/descriptors/ModelDescriptor';
import Node from 'scene/Node';
import ModelLoaderGLTF from 'loading/ModelLoaderGLTF';
import ModelLoaderJSON from 'loading/ModelLoaderJSON';
import ModelLoader from 'loading/ModelLoader';
import ThreadedDataParser from 'loading/ThreadedDataParser';

// TODO: Move all the fetching to load, instead of the specific loaders

type Loader = (manager: ModelsManager, descriptor: ModelDescriptor, resource: Node, data: ArrayBuffer) => Promise<void>;

/** Models manager is used to load entire models together with shaders and textures. */
class ModelsManager extends Manager<ModelDescriptor, Node> {
	private readonly loaders: Map<string, Loader> = new Map();

	constructor(
		context: RenderingContext,
		assetsPath: string,
		public shadersManager: ShadersManager = new ShadersManager(context),
		public texturesManager: TexturesManager = new TexturesManager(context),
	) {
		super(assetsPath);

		const loadGLTF = async (
			manager: ModelsManager,
			descriptor: ModelDescriptor,
			resource: Node,
			data: ArrayBuffer,
		) => {
			let parsedData: any = data;
			const format = descriptor.getFormat();
			if (format === 'gltf') {
				parsedData = JSON.parse(new TextDecoder().decode(data));
			}

			const loader = new ModelLoaderGLTF(descriptor, manager.shadersManager, manager.texturesManager, format);

			await loader.load(resource, parsedData);
		};

		this.registerLoader('gltf', loadGLTF);
		this.registerLoader('glb', loadGLTF);
		this.registerLoader(
			'json',
			async (
				manager: ModelsManager,
				descriptor: ModelDescriptor,
				resource: Node,
				data: ArrayBuffer,
			) => {
				const parsedData = JSON.parse(new TextDecoder().decode(data));

				const loader = new ModelLoaderJSON(descriptor, manager.shadersManager, manager.texturesManager);

				await loader.load(resource, parsedData);
			},
		);

		this.registerLoader(
			'binary',
			async (
				manager: ModelsManager,
				descriptor: ModelDescriptor,
				resource: Node,
				data: ArrayBuffer,
			) => {
				const parsedData = await new Promise((resolve, reject) => {
					const parser = this.createParser(
						data,
						resolve,
						() => reject(descriptor),
						null,
						resource,
					);

					parser.parse();
				});

				const loader = new ModelLoader(descriptor, manager.shadersManager, manager.texturesManager);

				await loader.load(resource, parsedData);
			},
		);
	}

	/** This function can be overridden to provide alternative parser instances */
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	protected createParser(data, cbOnComplete, cbOnError, cbOnProgress, userdata?) {
		return new ThreadedDataParser(data, cbOnComplete, cbOnError, cbOnProgress, userdata);
	}

	/**
	 *
	 */
	add(source, format?): any {
		source = this.sourceCallback(source);

		return this.addDescriptor(new ModelDescriptor(source, format));
	}

	/**
	 *
	 */
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	createResource() {
		return new Node();
	}

	/** Gets loading progress. The progress per resource also depends on progress of
		shaders and textures manager used by models manager.
		@return Current loading progress from 0 to 1 */
	override getProgress(): number {
		let progress = super.getProgress();
		if (progress >= 1.0) {
			return progress;
		}

		return progress +
			((this.texturesManager.getProgress() + this.shadersManager.getProgress()) / 2.0 / this.getTotalItems());
	}

	/** Starts loading all currently added resources recursively.
		This method will return immediately. Callback will be called once
		there are no more queued or loading items waiting.
		@param callback Callback called once all resources have been loaded
		@param progressCallback Callback called when progress of this manager has changed */
	async load(callback?, progressCallback?) {
		await super.load(callback, progressCallback);

		await this.shadersManager.load();
		await this.texturesManager.load();
	}

	/**
	 *
	 */
	async loadResource(modelDescriptor: ModelDescriptor, resource: Node) {
		const descriptor = this.descriptorCallback(modelDescriptor);

		try {
			const format = modelDescriptor.getFormat();

			if (this.loaders.has(format)) {
				const response = await fetch(descriptor.getFullPath());
				const data = await response.arrayBuffer();
				const loader = this.loaders.get(format);

				await loader(this, descriptor, resource, data);

				return [descriptor, resource] as [ModelDescriptor, Node];
			} else {
				throw new Error(`No loader for format: ${format}`);
			}
		} catch (e) {
			throw descriptor;
		}
	}

	/** Register a function to load a model for the given model format */
	registerLoader(format: string, loader: Loader) {
		this.loaders.set(format, loader);
	}
}

globalThis.ModelsManager = ModelsManager;
export default ModelsManager;
