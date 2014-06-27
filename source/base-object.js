// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {
	function BaseObject(options) {

		this.hook('beforeBaseInitiation', options);
		this.baseInitiation.apply(this, arguments);
		this.hook('afterBaseInitiation', options);


	}

	// #####baseInitiation
	// when the object is created
	BaseObject.prototype.baseInitiation = function() {
		// assign UID to view object
		this.uid = _.uniqueId('struck');

		// add options object to instance
		this.options = _.extend({}, options);
	};

	// #####hook
	BaseObject.prototype.hook = function(name) {
		var args = _.rest(arguments);
		var methodHook = 'on' + capitalize(name);
		if (this[methodHook]) {
			return this[methodHook].apply(this, args);
		}
	};

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
