// ##Model

// object for maintaining data
Struck.Model = function () {
	var Model = Struck.BaseObject.extend();

	Model.prototype.coreConstructor = function(options) {
		Struck.EventObject.prototype.coreConstructor.apply(this, arguments);
		
		this.data = this.options.data || {};
	};

	Model.prototype.get = Struck.hook("get", function(prop) {
		return this.data[prop];
	});
	
	Model.prototype.set = Struck.hook("set", function(prop, val) {
		// if the first arg is an object
		// update multiple properties
		if (_.isObject(prop)) {
			_.extend(this.data, prop);
		} else {
			this.data[prop] = val;
		}
	});
	

	return Model;
}();
