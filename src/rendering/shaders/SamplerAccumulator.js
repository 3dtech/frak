function SamplerAccumulator() {
	this.samplers = [];
	this.length = 0;

	var scope = this;

	this.add = function(sampler) {
		scope.samplers[scope.length++] = sampler;
	};

	this.clear = function() {
		for (var i = 0, l = scope.samplers.length; i < l; ++i) {
			scope.samplers[i] = null;
		}
		scope.length = 0;
	};
}
