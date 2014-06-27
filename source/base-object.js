// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {
	function BaseObject(options) {
		//
		this.addInitializer(baseInitiation);
	}

	// #####addInitializer
	BaseObject.prototype.addInitializer = function(func) {
		if (!this.initializers) this.initializers = [];
		this.initializers.push(func);
	};

	// #####baseInitiation
	// when the object is created
	function baseInitiation() {
		// assign UID to view object
		this.uid = _.uniqueId('struck');

		// add options object to instance
		this.options = _.extend({}, options);
	}

	BaseObject.prototype.destroy = _.noop;

	BaseObject.extend = Struck.extend;

	// ###create
	// prefered method of creating new objects
	// over using the `new` style
	BaseObject.create = function(options) {
		var object = new BaseObject(options);
		return object;
	};

	return BaseObject;
}();
