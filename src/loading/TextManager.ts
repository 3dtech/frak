import Manager from 'loading/Manager';
import TextDescriptor from 'scene/descriptors/TextDescriptor';

type TextResource = {
	data: string | boolean;
	descriptor: TextDescriptor;
};

/** Used to load text-based resources.
	Example of usage:
	<pre>
	var textManager=new TextManager();
	var text=textManager.add('test.txt'); // Request text file
	textManager.load(function() {
		// Do something with text.data
	});
	</pre>
	*/
class TextManager extends Manager {


	/**
	 * Constructor
	 * @param assetsPath Default search path for any assets requested
	 */
	constructor(assetsPath?) {
		super(assetsPath);
	}

	/** Adds new text descriptor to loading queue. This is a helper
		function to load textures simply by providing path
		@param source Path to source
		@return New text resource object (until not loaded: {'data': false, 'descriptor': new TextDescriptor(source)}) */
	add(source): any {
		source = this.sourceCallback(source);
		return this.addDescriptor(new TextDescriptor(source));
	}

	createResource(textDescriptor: TextDescriptor): TextResource {
		return {"data": false, 'descriptor': textDescriptor};
	}

	async loadResource(textDescriptor: TextDescriptor, resource: TextResource) {
		const descriptor = this.descriptorCallback(textDescriptor);
		try {
			const response = await fetch(descriptor.getFullPath());
			resource.data = await response.text();

			return [descriptor, resource] as [TextDescriptor, TextResource];
		} catch (e) {
			throw descriptor;
		}
	}
}

globalThis.TextManager = TextManager;
export default TextManager;
