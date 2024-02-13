import Descriptor from '../scene/descriptors/Descriptor';

/** Generic manager class extended by all other manager classes
	except for AssetsManager that groups together instances of other managers. */
class Manager {
	path: string;
	queue: any;
	loading: any;
	cache: any;
	cacheSize: any;
	callbacks: any;
	progressCallbacks: any;
	/** Set source callback to overwrite any source before it is used to create a descriptor. */
	sourceCallback = (source: string) => this.path + source;
	/** Set descriptor callback to overwrite any descriptor parameters before it is requested. */
	descriptorCallback = <T extends Descriptor>(descriptor: T) => descriptor;
	/** Called when new descriptor is added that is not yet cached or already loading */
	onAddToQueue = <T extends Descriptor>(descriptor: T) => {};
	/** Called when descriptor has been loaded */
	onLoaded = <T extends Descriptor>(descriptor: T) => {};

	/**
	 * Constructor
	 * @param assetsPath Default search path for any assets requested
	 */
	constructor(assetsPath?) {
		var scope = this;

		// Ensure valid path for concatenation
		this.path = '';
		if (assetsPath)
			this.path = assetsPath;
		if (this.path.length > 0 && this.path.slice(-1) != '/')
			this.path += '/';

		this.queue=[];				// Waiting queue (all items that are currently waiting)
		this.loading=[];			// Loading queue (all items that are currently loading)
		this.cache={};				// Cached descriptors thats data is already loaded
		this.cacheSize=0;			// Items in cache
		this.callbacks=[];			// List of callbacks added by load method
		this.progressCallbacks=[];	// List of progress callbacks added by load method
	}

	/** @return Count of all resources managed by this manager. This includes
		queued resources, loading resources and cached resources. */
	getTotalItems(): any {
		return this.queue.length+this.loading.length+this.cacheSize;
	}

	/** @return Count of queued or loading resources */
	getWaitingItems(): any {
		return this.queue.length+this.loading.length;
	}

	/** Gets loading progress. This can be overridden by child-managers
		that use composition of other managers to load child-resources.
		@return Current loading progress from 0 to 1 */
	getProgress(): any {
		if(this.getTotalItems()==0) return 1;	// No items added means ready
		return 1.0-this.getWaitingItems()/this.getTotalItems();
	}

	// Public methods
	/** Adds descriptor to loading queue
		@param descriptor Descriptor type
		@return Resource described by the descriptor that will eventually be loaded */
	addDescriptor(descriptor): any {
		// Search for resource in cache
		var resource = this.cache[descriptor.serialize(['id'])];
		if(resource) {
			return resource;
		}

		// Search for resource in loading queue or in waiting queue
		resource = this.getLoadingResource(descriptor);

		if(resource) {
			return resource;
		}

		this.onAddToQueue(descriptor);

		// Resource not found in cache or loading queue. Add it to waiting queue.
		resource = this.createResource(descriptor);

		this.queue.push([descriptor, descriptor.serialize(['id']), resource]);
		return resource;
	}

	/** Gets resource that is being loaded
		@param descriptor Descriptor describing a resource
		@return Resource being loaded that corresponds to the resource or null, if this
						descriptor is not being loaded */
	getLoadingResource(descriptor): any {
		var descriptorString=descriptor.serialize(['id']);
		for(var l in this.loading) {
			if(this.loading[l][1]==descriptorString) return this.loading[l][2];
		}
		for(var q in this.queue) {
			if(this.queue[q][1]==descriptorString) return this.queue[q][2];
		}
		return null;
	}

	/** Removes resource referenced by descriptor from cache, if it is cached */
	removeFromCache(descriptor): any {
		delete this.cache[descriptor];
		this.cacheSize--;
	}

	/** Cleans resource cache */
	cleanCache(): any {
		this.cache={};
		this.cacheSize=0;
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

	// Private methods
	removeLoadedResource(descriptor): any {
		for (var i in this.loading) {
			if (this.loading[i][0]===descriptor) {
				this.loading.splice(i, 1);
				break;
			}
		}
	}

	callDoneCallbacks(): any {
		var doneCallbacks=this.callbacks;
		this.callbacks=[];
		for(var c = 0; c < doneCallbacks.length; c++) {
			doneCallbacks[c]();
		}
	}

	// Protected methods
	/** Must be overridden by child class to create resources of appropriate type */
	createResource(descriptor): any {
		throw "createResource not implemented by this instance of Manager";
	}

	/** Must load given resource from location described by descriptor
		@param descriptor Instance of resource descriptor
		@param resource Resource that will be loaded (created with createResource)
		@param loadedCallback Callback function(descriptor, resource) that must be called by loadResource when loading has finished successfully
		@param failedCallback Callback function(descriptor) that must be called by loadResource when loading has failed */
	async loadResource(descriptor, resource): Promise<[Descriptor, any]> {
		throw "loadResource not implemented by this instance of Manager";
	}
}

globalThis.Manager = Manager;
export default Manager;
