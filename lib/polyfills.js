// Chooses best time'ing method for better performance. Thanks to Paul Irish
window.requestAnimFrame = (function(callback){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
				window.setTimeout(callback, 16);
			};
})();

(function() {
	if (!window.cancelAnimationFrame){
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
})();

/** "Allows formating strings with {0} notation".format("replacement") */
if (typeof String.prototype.format !== 'function') {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}
