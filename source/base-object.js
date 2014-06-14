Struck.BaseObject = function () {
	function Base(func) {
		func.extend = Struck.extend;

		_.extend(func.prototype, {

		});

		return func;
	}

	return Base;
}();
