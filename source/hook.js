// ###Hook
// 

Struck.Hook = function () {
	function Hook(name, func) {
		return function() {
			if (this.hook) this.hook(name, 'before');
			func.apply(this, arguments);
			if (this.hook) this.hook(name, 'after');
		};
	}

	return Hook;
}();
