import { CollectionReference, CollectionView } from 'rendering/CollectionUtils';

/** Transparency sorting function */
function TransparencySort(a, b) {
	if (!a && !b)
		return 0;
	if (a && !b)
		return -1;
	if (!a && b)
		return 1;
	var d1 = vec3.squaredDistance(TransparencySort.cmpValue, a.globalBoundingSphere.center);
	var d2 = vec3.squaredDistance(TransparencySort.cmpValue, b.globalBoundingSphere.center);
	if (d1 > d2) return -1;
	if (d1 < d2) return 1;
	return 0;
}

TransparencySort.cmpValue = vec3.create();

/** Renderer batch that indexes directly into a renderer list */
class Batch {
	list: any;
	indices: number[];
	length: number;

	constructor(list) {
		this.list = list;
		this.indices = new Array();
		this.length = 0;
	}

	clear() {
		for (var i = 0, l = this.indices.length; i < l; ++i)
			this.indices[i] = -1;
		this.length = 0;
	};

	add(index) {
		function indexOfFor(ar, v) {
			for (var i = 0, l = ar.length; i < l; i++) {
				if (ar[i] === v) {
					return true;
				}
			}
			return false;
		}

		if (indexOfFor(this.indices, index)) return;

		this.indices[this.length++] = index;
	};

	get(index) {
		if (index >= 0 && index < this.indices.length) {
			var listIndex = this.indices[index];
			if (listIndex >= 0 && listIndex < this.list.length)
				return this.list[listIndex];
		}
	};
}

/**
 * Utility class for pre-organizing renderers for the rendering pipeline.
 */

class RendererOrganizer {
	enableDynamicBatching: any;
	solidRenderers: any;
	transparentRenderers: any;
	customRenderers: any;
	unlitRenderers: any;
	solidAndCustomRenderers: any;
	opaqueBatchList: any;
	transparentBatchList: any;
	customBatchList: any;
	unlitBatchList: any;
	batchIndex: any;
	renderers: any;
	viewSolidRenderers: any;
	viewTransparentRenderers: any;
	viewCustomRenderers: any;
	viewUnlitRenderers: any;
	visibleRenderers: any;
	visibleSolidRenderers: any;
	visibleSolidBatches: any;
	visibleSolidFaces: any;
	visibleTransparentRenderers: any;
	visibleTransparentFaces: any;
	visibleTransparentBatches: any;
	visibleCustomRenderers: any;
	visibleCustomFaces: any;
	visibleCustomBatches: any;
	visibleUnlitRenderers: any;
	visibleUnlitFaces: any;
	visibleUnlitBatches: any;

	constructor() {
		this.enableDynamicBatching = true; ///< Set to false to turn off dynamic batching of renderers by material.

		this.solidRenderers = [];
		this.transparentRenderers = [];
		this.customRenderers = [];
		this.unlitRenderers = [];
		this.solidAndCustomRenderers = [];

		this.opaqueBatchList = [];
		this.transparentBatchList = [];
		this.customBatchList = [];
		this.unlitBatchList = [];
		this.batchIndex = {};

		this.renderers = new CollectionReference([]);
		this.viewSolidRenderers = new CollectionView(this.renderers, function(renderer) {
			return !renderer.transparent && !renderer.customShader && !renderer.unlit;
		});
		this.viewTransparentRenderers = new CollectionView(this.renderers, function(renderer) {
			return renderer.transparent && !renderer.unlit;
		});
		this.viewCustomRenderers = new CollectionView(this.renderers, function(renderer) {
			return !renderer.transparent && renderer.customShader && !renderer.unlit;
		});
		this.viewUnlitRenderers = new CollectionView(this.renderers, function(renderer) {
			return !renderer.transparent && !renderer.customShader && renderer.unlit;
		});

		// Stats
		this.visibleRenderers = 0;
		this.visibleSolidRenderers = 0;
		this.visibleSolidBatches = 0;
		this.visibleSolidFaces = 0;
		this.visibleTransparentRenderers = 0;
		this.visibleTransparentFaces = 0;
		this.visibleTransparentBatches = 0;
		this.visibleCustomRenderers = 0;
		this.visibleCustomFaces = 0;
		this.visibleCustomBatches = 0;
		this.visibleUnlitRenderers = 0;
		this.visibleUnlitFaces = 0;
		this.visibleUnlitBatches = 0;
	}

	updateStats(): any {
		this.visibleSolidRenderers = this.viewSolidRenderers.length;
		this.visibleTransparentRenderers = this.viewTransparentRenderers.length;
		this.visibleCustomRenderers = this.viewCustomRenderers.length;
		this.visibleUnlitRenderers = this.viewUnlitRenderers.length;
		this.visibleRenderers = this.visibleSolidRenderers + this.visibleTransparentRenderers + this.visibleCustomRenderers + this.visibleUnlitRenderers;
		// FIXME: visible batches should only be updated when the info is required
	}

	batch(batchList, renderers): any {
		var i;

		// Clears existing batches
		var batch;
		for (i = 0; i < batchList.length; ++i) {
			batchList[i].clear();
		}

		// Batch renderers
		var renderer;
		for (i = 0; i < renderers.length; ++i) {
			renderer = renderers[i];
			if (!renderer)
				break;
			if (renderer.material.id in this.batchIndex) {
				//console.log("if batch form list ",renderer.material.id,this.batchIndex[renderer.material.id], batchList[this.batchIndex[renderer.material.id]]);
				batch = batchList[this.batchIndex[renderer.material.id]];
			}
			else {
				//console.log("else new batch");
				batch = new Batch(renderers);
				batchList.push(batch);
				this.batchIndex[renderer.material.id] = batchList.length - 1;
			}
			if (batch)
				batch.add(i);
			else {
				//console.log("else new batch");
				batch = new Batch(renderers);
				batchList.push(batch);
				this.batchIndex[renderer.material.id] = batchList.length - 1;
			}
		}
	}

	sort(engine, renderers, eyePosition?) {
		this.renderers.list = renderers;
		this.viewSolidRenderers.filter();
		this.viewTransparentRenderers.filter();
		this.viewCustomRenderers.filter();
		this.viewUnlitRenderers.filter();
		this.solidRenderers = this.viewSolidRenderers.view;
		this.transparentRenderers = this.viewTransparentRenderers.view;
		this.customRenderers = this.viewCustomRenderers.view;
		this.unlitRenderers = this.viewUnlitRenderers.view;
		this.solidAndCustomRenderers = this.solidRenderers.concat(this.customRenderers);

		// Batch renderers by material.id
		if (this.enableDynamicBatching) {
			if (engine.options.transparencyMode != 'sorted') {
				this.batch(this.transparentBatchList, this.transparentRenderers);
			}
			this.batch(this.opaqueBatchList, this.solidRenderers);
			this.batch(this.customBatchList, this.customRenderers);
			this.batch(this.unlitBatchList, this.unlitRenderers);
		}

		// Sort transparent renderers
		if (engine.options.transparencyMode == 'sorted' && eyePosition) {
			vec3.copy(TransparencySort.cmpValue, eyePosition);
			this.transparentRenderers.sort(TransparencySort);
		}

		this.updateStats();
	}
}

globalThis.RendererOrganizer = RendererOrganizer;
export default RendererOrganizer;
