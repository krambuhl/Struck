// ##EventObject

// `Struck.EventObject` normalizes an event API
// for adding event listeners and listening to
// objects externally.  Using the listen methods
// automates undelgating events of view removal.
Struck.EventObject = (function () {
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

	function getEvents(events) {
		events = result(events);
		if (events && !_.isArray(events)) {
			events = events.split(' ');
		}

		return events;
	}


	function addListener(self, opts) {
		var obj = opts.obj,
			events = opts.events,
			func = opts.func;

		var callback = !opts.single ? func : function() {
			func.apply(this, arguments);
			removeListener(self, obj, events, callback);
		};

		_.each(events, function(ev) {
			self._events.push({
				events: events,
				func: callback,
				obj: obj
			});

			if (obj instanceof jQuery) {
				obj[opts.single ? 'one' : 'on'](ev, func);
			} else if (obj instanceof Struck.EventObject) {
				obj.com[opts.single ? 'once' : 'on'].call(obj.com, ev, callback, opts.context);
			}
		});
	}

	function checkRejection(ev, obj, name, func) {
		if (func) {
			return (ev.obj === obj && ev.events === name && ev.func === func);
		} else if (name) {
			return (ev.obj === obj && ev.events === name);
		} else if (obj) {
			return (ev.obj === obj);
		}

		return reject;
	}

	function removeListener(self, obj, events, func) {
		var rejects = [],
			passes = [];

		_.each(getEvents(events), function(name) {
			_.each(self._events, function(ev) {
				if (checkRejection(ev, obj, name, func)) { 
					rejects.push(ev); 
				} else { 
					passes.push(ev);
				}
			});
		});

		if (!events) {
			rejects = self._events;
		}

		self._events = passes;

		_.each(rejects, function(reject) {
			if (reject.obj instanceof jQuery) {
				reject.obj.off(reject.events, reject.func);
			} else if (reject.obj instanceof Struck.EventObject) {
				reject.obj.com.off(reject.events, rejects.func);
			}
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
		var opts = { 
			obj: obj,
			events: events,
			callback: func,
			single: false, 
			context: firstDef(context, this) 
		};

		addListener(this, opts);
		return this;
	};

	// #####listenOnce
	EventObject.prototype.listenOnce = function (obj, events, func, context) {
		var opts = { 
			obj: obj,
			events: events,
			callback: func,
			single: true, 
			context: firstDef(context, this) 
		};

		addListener(this, opts);
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

	EventObject.prototype.trigger = function(events) {
		this.com.emit.apply(this.com, [events].concat(_.rest(arguments, 1)));
		return this;
	};

	// #####destroy
	// when an object is removed, the destroy function
	// should be called to remove attached event listeners
	EventObject.prototype.destroy = function () {		
		Struck.BaseObject.prototype.destroy.apply(this, arguments);

		// remove all event listeners listeners
		this.stopListening();

		_.defer(function(self) { 
			// destroy com interface
			self.com.destroy();
			delete self.com;
		}, this);

		return this;
	};

	return EventObject;
})();
