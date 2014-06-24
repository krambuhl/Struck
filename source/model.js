// ##Model

// object for maintaining data
Struck.Model = function () {
	var Model = Struck.BaseObject.extend({
		constructor: function(options) {
			this._constructor(options);
			_.extend(this, new Struck.Intercom());
		}
	});

	Model.prototype.get = _.noop;
	Model.prototype.set = _.noop;
	Model.prototype.data = _.noop;

	return Model;
}();
