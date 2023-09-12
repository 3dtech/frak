import Resource from 'scene/components/resources/Resource';
import ModelDescriptor from 'scene/descriptors/ModelDescriptor';

/** ModelResource component */
class ModelResource extends Resource {
	model: any;
	engine: any;

	constructor() {
		super();
		this.descriptor=new ModelDescriptor();	// One of the descriptor types
		this.model=false;
	}

	type(): any {
		return "ModelResource";
	}

	excluded(): any {
		return super.excluded().concat(['model', 'engine']);
	}

	/** Starts loading the resource
		@param callback Optional callback called after model has been loaded. Called with arguments (context, engine) */
	load(callback?): any {
		if(!this.descriptor.source) return;

		var me=this;
		this.model=this.engine.assetsManager.modelsManager.addDescriptor(this.descriptor);

		this.engine.assetsManager.load(function() {
			me.node.addNode(me.model);
			me.onLoaded();
			if(callback) callback(me.engine.context, me.engine);
		});
	}

	onStart(context, engine): any {
		this.engine=engine;
		this.load();
	}

	/** Called when model has been loaded */
	onLoaded() {}
}

globalThis.ModelResource = ModelResource;
export default ModelResource;
