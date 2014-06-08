Struck.Intercom = function () {
	function Intercom() {

	}

	Intercom.prototype.on = _.noop;
	Intercom.prototype.once = _.noop;
	Intercom.prototype.off = _.noop;
	Intercom.prototype.emit = _.noop;

	return Intercom;
}();
