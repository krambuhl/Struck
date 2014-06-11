var Intercom = Struck.Intercom = function (root) {
	var defaultMessage = {
		single: false,
		name: "all",
		callback: _.noop,
		context: root,
		args: []
	};

	function Intercom() {
		this.subscribers = [];
	}

	// split "event1 event2" into an
	// array of event names
	function splitName(com, name) {
		// get result of name if defined as a function
		var result = _.isFunction(name) ? name.call(com) : name;

		// split by spaces if result is an array
		// always returns an array
		return _.isArray(result) ? result.split(" ") : [result];
	}


	Intercom.prototype.on = function (name, callback, context) {
		var names = splitName(name);
	};

	Intercom.prototype.once = _.noop;
	Intercom.prototype.off = _.noop;
	Intercom.prototype.emit = _.noop;
	Intercom.prototype.stop = _.noop;

	Intercom.extend = Struck.extend;

	return Intercom;
}(root);
