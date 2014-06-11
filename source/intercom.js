Struck.Intercom = function () {
	var defaultMessage = {
		name: "all",

	};

	function Intercom() {
		this.subscribers = [];
	}


	function splitName(name) {
		names = _.result(name);
		var names = _.isArray(name) ? name.split()
	}


	Intercom.prototype.on = function (name, callback, context) {

	};

	Intercom.prototype.once = _.noop;
	Intercom.prototype.off = _.noop;
	Intercom.prototype.emit = _.noop;
	Intercom.prototype.stop = _.noop;

	Intercom.extend = Struck.extend;

	return Intercom;
}();
