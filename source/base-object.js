// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {
	function Base(func) {

		function constructor() {
			_.extend(this, {
				// assign UID to view object
				uid: _.uniqueId('struck')
			});

			func.apply(this, _.rest(arguments));
		}

		constructor.extend = Struck.extend;

		return constructor;
	}

	return Base;
}();
