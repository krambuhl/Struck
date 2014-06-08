Struck.Model = function () {
	function Model() {
		_.extend(this, new Struck.Intercom());
	}

	Model.prototype.get = _.noop;
	Model.prototype.set = _.noop;
	Model.prototype.data = _.noop;

	return Model;
}();
