function CollectionReference(list) {
	this.list = list;
}

function CollectionView(listReference, fnFilter, keepExact) {
	this.listReference = listReference;
	this.view = [];
	this.keepExact = !!keepExact;
	this.fnFilter = fnFilter;
	this.length = 0;

	var scope = this;

	this.update = function() {
		if (scope.keepExact || scope.view.length < scope.listReference.list.length)
			scope.view.length = scope.listReference.list.length;
	};

	this.filter = function() {
		scope.update();

		var index = 0;
		var i = 0;
		var item;

		for (; i < scope.listReference.list.length; ++i) {
			item = scope.listReference.list[i];
			if (!item)
				break;
			if (scope.fnFilter(item))
				scope.view[index++] = item;
		}

		scope.length = index;

		for (i = index; i < scope.listReference.list.length; ++i) {
			scope.view[index++] = null;
		}
	};

	this.forEach = function(callback) {
		for (var i = 0; i < scope.length; ++i) {
			callback(scope.view[i], i);
		}
	};

	this.get = function(index) {
		if (index >= 0 && index < scope.length)
			return scope.view[index];
		throw Error('Accessing element out of bounds');
	};
}
