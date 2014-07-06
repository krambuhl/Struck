// ##Model

// object for maintaining data
Struck.Model = function () {
	var Model = Struck.EventObject.extend({
		baseInitiation: function(options) {
			Struck.EventObject.prototype.baseInitiation.apply(this, arguments);
		}
	});

	Model.prototype.get = _.noop;
	Model.prototype.set = _.noop;
	Model.prototype.data = _.noop;

	return Model;
}();
