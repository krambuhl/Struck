// ##EventObject

// `Struck.EventObject` normalizes an event API
// for adding event listeners and listening to
// objects externally.  Using the listen methods
// automates undelgating events of view removal.
Struck.EventObject = function () {
	var EventObject = Struck.BaseObject.extend({
		constructor: function (options) {
			this._constructor(options);
		},

		_constructor: function () {
			Struck.BaseObject.prototype._constructor.apply(this, arguments);

			// all event objects need an intercom for
			// emiting and listening to events
			this.com = new Struck.Intercom();
		}
	});

	// #####listenTo

	// Registers a event listener to the
	// appropriete subsystem. Delegates jquery
	// objects to the jq event system and struk
	// objects to the instance's intercom
	EventObject.prototype.listenTo =  function (obj, events, func) {
		// if object is jquery wrapped
		// delegate events into object

		// if object is Struck.EventObject
		// delegate events to the underlying
		// com object
	};

	// #####listenOnce
	EventObject.prototype.listenOnce = function (obj, events, func) {

	};

	// #####stopListening
	EventObject.prototype.stopListening = function (obj, events, func) {

	};

	return EventObject;
}();
