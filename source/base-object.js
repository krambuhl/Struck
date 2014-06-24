// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {
	function Base(options) {
		this._constructor(options);
	}

	// functions run on object creation
	Base.prototype._constructor = function(options) {
		// assign UID to view object
		this.uid = _.uniqueId('struck');

		// add options object to instance
		this.options = _.extend({}, options);
	};

	Base.extend = Struck.extend;
	Base.create = _.noop;

	return Base;
}();

Struck.BaseObject.extend = Struck.extend;
