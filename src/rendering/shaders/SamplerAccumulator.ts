class SamplerAccumulator {
	samplers: any[];
	length: number;

	constructor() {
		this.samplers = [];
		this.length = 0;
	}

	add(sampler) {
		this.samplers[this.length++] = sampler;
	};

	clear = function() {
		for (var i = 0, l = this.samplers.length; i < l; ++i) {
			this.samplers[i] = null;
		}
		this.length = 0;
	};
}

globalThis.SamplerAccumulator = SamplerAccumulator;

export default SamplerAccumulator;
