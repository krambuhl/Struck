// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function (func) {
	var args = _.rest(arguments);

	// Base wraps a constructor argument with
	// it's own set of Functions

	// Note:
	// might be preferable to stick to extend
	// and call super constructor manually
	// this seems like a surefire way to force
	// beavior onto a constructor, but it seems
	// like the inheritance chain gets blorked
	function Base() {
		if (!(this instanceof Base))
			return new Base();

		// run default init
		init(this);

		// call constructor function
		func.apply(this, args);
	}

	// functions run on object creation
	function init(self) {
		// assign UID to view object
		self.uid = _.uniqueId('sid');
	}

	Base.extend = Struck.extend;

	return Base;
};

Struck.BaseObject.extend = Struck.extend;
