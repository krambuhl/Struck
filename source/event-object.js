// ##EventObject

// `Struck.EventObject` normalizes an event API
// for adding event listeners and listening to
// objects externally.  Using the listen methods
// automates undelgating events of view removal.
Struck.EventObject = function () {
	var EventObject = Struck.BaseObject.extend({
		baseInitiation: function () {
			// all event objects need an intercom for
			// emiting and listening to events
			this.com = Struck.Intercom.create();

			// call super after defining com which
			// is used for base hooks
			Struck.BaseObject.prototype.baseInitiation.apply(this, arguments);

			this._events = [];
		}
	});

	// #####hook

	// trigger intercom events for hook
	EventObject.prototype.hook = function (name, mod) {
		var postfix = mod !== undefined ? ':' + mod : '';
		Struck.BaseObject.prototype.hook.apply(this, arguments);
		this.com.emit(name + postfix, arguments);
	};

	function addListener(obj, events, func, opts) {
		this._events.push({
			events: events,
			func: func,
			obj: obj
		});

		var wrap = func;
		if (opts.once) {
			wrap = function () {
				func.apply(obj);
				removeListener(obj, events, func, opts);
			}
		}
	}

	function removeListener(obj, events, func, opts) {
		_.reject(this._events, {
			events: events,
			func: func,
			obj: obj
		});

	}


	function listen(obj, events, func, options) {
		// if object is jquery wrapped
		// delegate events into object

		// if object is Struck.EventObject
		// delegate events to the underlying
		// com object

		if (obj instanceof jQuery) {
			// do jquery stuff

		// if object is (or extended from) an event object
		// we can assume it has an Intercom
		} else if (obj instanceof Struck.EventObject) {
			addListener(obj, events, func);
		}

	}

	function unlisten() {

	}


	// #####listenTo

	// Registers a event listener to the
	// appropriate subsystem. Delegates jquery
	// objects to the jq event system and struck
	// objects to the instance's intercom
	// we then keep a secondary object of events
	// to remove when the object is deconstructed
	EventObject.prototype.listenTo = function (obj, events, func, opts) {
		listen(obj, events, func, _.extend({
			single: false,
			args: args,
			context: this
		}, opts));

		return this;
	};

	// #####listenOnce
	EventObject.prototype.listenOnce = function (obj, events, func, opts) {
		listen(obj, events, func, _.extend({
			single: true,
			args: args,
			context: this
		}, opts));

		return this;
	};

	// #####stopListening
	// removes an event listener from the
	// appropriate subsystem.
	// typeof obj == jquery ? jquery.off
	// typeof ogj == Struck.EventObjt ? com.off
	EventObject.prototype.stopListening = function (obj, events, func) {
		unlisten(obj, events, func);
		return this;
	};

	// #####stopListeningAll
	// remove all event listeners from Object
	// iterates over internal list, delegating
	// to stopListening
	EventObject.prototype.stopListeningAll = function () {
		if (this._events.length === 0) return;

		_.each(this._events, function(ev) {
			unlisten(ev.obj, ev.events, ev.func);
		}, this);

		return this;
	};

	// #####destroy
	// when an object is removed, the destroy function
	// should be called to remove attached event listeners
	EventObject.prototype.destroy = function () {		
		Struck.BaseObject.prototype.destroy.apply(this, arguments);

		// remove all event listeners listeners
		this.stopListeningAll();

		_.defer(function(self) { 
			// destroy com interface
			self.com.destroy();
			delete self.com;
		}, this);

		return this;
	};


	return EventObject;
}();
