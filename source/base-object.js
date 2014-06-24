// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {
	function Base(options) {
		if (!(this instanceof Base))
			return new Base(options);

		this._constructor(options);
	}

	// functions run on object creation
	Base.prototype._constructor = function(options) {
		// assign UID to view object
		this.uid = _.uniqueId('struck');
	};

	Base.extend = Struck.extend;
	Base.create = _.noop;

	return Base;
}();

Struck.BaseObject.extend = Struck.extend;
