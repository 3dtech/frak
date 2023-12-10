import Resource from 'scene/components/resources/Resource';
import TextureDescriptor from 'scene/descriptors/TextureDescriptor';

/** Resource component */
class TextureResource extends Resource {
	texture: any;
	engine: any;

	constructor() {
		super();
		this.descriptor=new TextureDescriptor();	// One of the descriptor types
		this.texture=false;
		this.engine=false;
	}

	excluded(): any {
		return super.excluded().concat(['texture', 'engine']);
	}

	type(): any {
		return "TextureResource";
	}

	/** Starts loading the resource
		@param callback Optional callback called after texture has been loaded. Called with arguments (context, engine) */
	load(callback?): any {
		var me=this;
		this.texture=this.engine.assetsManager.texturesManager.addDescriptor(this.descriptor);
		this.engine.assetsManager.load(function() { me.onLoaded(); if(callback) callback(me.engine.context, me.engine); });
	}

	onStart(context, engine): any {
		this.engine=engine;
		this.load();
	}

	/** Called when texture has been loaded */
	onLoaded() {}
}

globalThis.TextureResource = TextureResource;
export default TextureResource;
