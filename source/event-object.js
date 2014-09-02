// ##EventObject

// `Struck.EventObject` normalizes an event API
// for adding event listeners and listening to
// objects externally.  Using the listen methods
// automates undelgating events of view removal.
Struck.EventObject = function () {
	'use strict';

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
		var postfix = mod !== undefined && mod !== 'on' ? ':' + mod : '';
		Struck.BaseObject.prototype.hook.apply(this, arguments);
		this.com.emit(name + postfix, arguments);
	};


	function addListener(self, obj, events, func, opts) {
		events = result(events);
		if (_.isArray(events)) events.join(' ');

		var method = opts.once ? 'on' : 'once';
		var ev = {
			events: events,
			func: func,
			obj: obj
		};

		self._events.push(ev);

		if (obj instanceof jQuery) {
			obj[method](events, func);
		} else if (obj instanceof Struck.EventObject) {
			obj.com[method](events, func, opts.context);
		}
	}

	function removeListener(self, obj, events, func) {
		var rejects = _.reject(obj._events, {
			events: events,
			func: func,
			obj: obj
		});

		_.each(rejects, function(reject) {
			reject.obj.off(reject.events, rejects.func);
		});
	}

	// #####listenTo

	// Registers a event listener to the
	// appropriate subsystem. Delegates jquery
	// objects to the jq event system and struck
	// objects to the instance's intercom
	// we then keep a secondary object of events
	// to remove when the object is deconstructed
	EventObject.prototype.listenTo = function (obj, events, func, context) {
		var args = _.last(arguments, 4);
		addListener(this, obj, events, func, {
			single: false,
			args: args,
			context: (context || this)
		});

		return this;
	};

	// #####listenOnce
	EventObject.prototype.listenOnce = function (obj, events, func, context) {
		var args = _.last(arguments, 4);
		addListener(this, obj, events, func, {
			single: true,
			args: args,
			context: (context || this)
		});

		return this;
	};

	// #####stopListening
	// removes an event listener from the
	// appropriate subsystem.
	// typeof obj == jquery ? jquery.off
	// typeof ogj == Struck.EventObjt ? com.off
	EventObject.prototype.stopListening = function (obj, events, func) {
		removeListener(this, obj, events, func);
		return this;
	};

	// #####stopListeningAll
	// remove all event listeners from Object
	// iterates over internal list, delegating
	// to stopListening
	EventObject.prototype.stopListeningAll = function () {
		if (this._events.length === 0) return;

		_.each(this._events, function(ev) {
			removeListener(this, ev.obj, ev.events, ev.func);
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
