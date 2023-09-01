import Resource from 'scene/components/resources/Resource.js'
import MaterialSourceDescriptor from 'scene/descriptors/MaterialSourceDescriptor.js'

/** Resource component */

class MaterialResource extends Resource {
	descriptor: any;
	material: any;
	engine: any;
	texture: any;

	constructor() {
		super();
		this.descriptor=new MaterialSourceDescriptor();	// One of the descriptor types
		this.material=false;
		this.engine=false;
	}

	excluded(): any {
		return super.excluded().concat(['material', 'engine']);
	}

	type(): any {
		return "MaterialResource";
	}

	/** Starts loading the resource
		@param callback Optional callback called after texture has been loaded. Called with arguments (context, engine) */
	load(callback?): any {
		var me=this;
		this.texture=this.engine.assetsManager.materialSourcesManager.addDescriptor(this.descriptor);
		this.engine.assetsManager.load(function() { me.onLoaded(); if(callback) callback(me.engine.context, me.engine); });
	}

	onStart(context, engine): any {
		this.engine=engine;
		this.load();
	}

	/** Called when texture has been loaded */
	onLoaded() {}

}

globalThis.MaterialResource = MaterialResource;

export default MaterialResource;
