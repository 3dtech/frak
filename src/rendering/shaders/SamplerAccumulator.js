function SamplerAccumulator() {
	this.samplers = new Array();
	this.length = 0;

	var scope = this;

	this.add = function(sampler) {
		scope.samplers[scope.length++] = sampler;
	};

	this.clear = function() {
		for (var i=0; i<scope.samplers.length; ++i) {
			scope.samplers[i] = null;
		}
		scope.length = 0;
	};
}
