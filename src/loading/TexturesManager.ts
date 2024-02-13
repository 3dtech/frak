import Manager from 'loading/Manager';
import TextureDescriptor from 'scene/descriptors/TextureDescriptor';
import CubeTexture from 'rendering/materials/CubeTexture';
import CubeTextureDescriptor from 'scene/descriptors/CubeTextureDescriptor';
import Texture from 'rendering/materials/Texture';

type TextureParameters = [TextureDescriptor, Texture];
type CubeTextureParameters = [CubeTextureDescriptor, CubeTexture];
type LoadResourceParameters = TextureParameters | CubeTextureParameters;

/** External texture instance. */
class TexturesManager extends Manager {
	context: any;

	/**
	 * Constructor
	 * @param renderingContext Instance of RenderingContext
	 * @param assetsPath Default search path for any assets requested
	 */
	constructor(context, assetsPath?) {
		super(assetsPath);
		this.context = context;
	}

	/** Adds new texture descriptor to loading queue. This is a helper
		function to load textures simply by providing path */
	add(source): any {
		source = this.sourceCallback(source);
		var d = new TextureDescriptor(source);
		return this.addDescriptor(d);
	}

	/** Adds a new cube texture
		* @param sources Array of 6 image URIs
		* @return CubeTexture
		*/
	addCube(sources): any {
		if (sources.length != 6)
			throw "TexturesManager.addCube: Cube textures require 6 image URIs";
		var descriptors = [];
		var cube = new CubeTextureDescriptor();
		for (var i=0; i<sources.length; i++) {
			cube.sources.push(this.sourceCallback(sources[i]));
		}
		return this.addDescriptor(cube);
	}

	createResource(textureDescriptor): any {
		var texture: CubeTexture | Texture;
		if (textureDescriptor instanceof CubeTextureDescriptor) {
			texture = new CubeTexture(this.context);
			texture.name = 'Cubemap'; // TODO: name from filenames
			return texture;
		} else {
			texture = new Texture(this.context);
			texture.name = textureDescriptor.source;
			return texture;
		}
	}

	async loadResource(...[textureDescriptor, textureResource]: LoadResourceParameters) {
		const descriptor = this.descriptorCallback(textureDescriptor);

		const loadImage = async (source: string) => {
			return new Promise<HTMLImageElement>((resolve, reject) => {
				const image = new Image();
				image.crossOrigin = 'anonymous';
				image.onload = () => resolve(image);
				image.onerror = reject;
				image.src = source;
			});
		};

		try {
			if (!(textureDescriptor instanceof CubeTextureDescriptor)) {
				const image = await loadImage(descriptor.getFullPath());
				(textureResource as Texture).setImage(this.context, image);

				return [descriptor, textureResource] as TextureParameters;
			} else {
				const faces = [
					CubeTexture.FRONT,
					CubeTexture.BACK,
					CubeTexture.LEFT,
					CubeTexture.RIGHT,
					CubeTexture.BOTTOM,
					CubeTexture.TOP
				];

				const loading = [];
				for (const face of faces) {
					loading.push((async () => {
						const image = await loadImage((descriptor as CubeTextureDescriptor).sources[face]);
						(textureResource as CubeTexture).setFace(this.context, face, image);
					})());
				}

				await Promise.all(loading);

				return [descriptor, textureResource] as CubeTextureParameters;
			}
		} catch (e) {
			throw descriptor;
		}
	}
}

globalThis.TexturesManager = TexturesManager;
export default TexturesManager;
