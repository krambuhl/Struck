// ##EventObject

// `Struck.EventObject` normalizes an event API
// for adding event listeners and listening to
// objects externally.  Using the listen methods
// automates undelgating events of view removal.
Struck.EventObject = function () {
	var EventObject = Struck.BaseObject.extend({
		baseInitiation: function () {
			Struck.BaseObject.prototype.baseInitiation.apply(this, arguments);

			// all event objects need an intercom for
			// emiting and listening to events
			this.com = new Struck.Intercom();
		}
	});

	// #####hook

	// trigger intercom events for hook
	EventObject.prototype.hook = function (name, mod) {
		var postfix = mod !== undefined ? ':' + mod : '';
		Struck.EventObject.prototype.hook.apply(this, arguments);
		this.com.emit(name + postfix, arguments);
	};

	// #####listenTo

	// Registers a event listener to the
	// appropriate subsystem. Delegates jquery
	// objects to the jq event system and struk
	// objects to the instance's intercom
	// we then keep a secondary object of events
	// to remove when the object is deconstructed
	EventObject.prototype.listenTo = function (obj, events, func) {
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
	// removes an event listener from the
	// appropriate subsystem.
	// typeof obj == jquery ? jquery.off
	// typeof ogj == Struck.EventObjt ? com.off
	EventObject.prototype.stopListening = function (obj, events, func) {

	};

	return EventObject;
}();
