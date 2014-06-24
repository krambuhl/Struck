// ##EventObject

//
Struck.EventObject = function () {
	var EventObject = Struck.BaseObject.extend({
		constructor: function (options) {
			this._constructor(options);
		}
	});

	return EventObject;
}();
