// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {
	function BaseObject(options) {
		this._constructor(options);
	}

	// base constructor
	BaseObject.prototype._constructor = function(options) {
		// assign UID to view object
		this.uid = _.uniqueId('struck');

		// add options object to instance
		this.options = _.extend({}, options);
	};

	BaseObject.extend = Struck.extend;
	BaseObject.create = function() {
		
	};

	return BaseObject;
}();
