(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'jquery', 'exports'], function(_, $, exports) {
      root.Struck = factory(root, exports, _, $);
    });
  } else if (typeof exports !== 'undefined') {
    var _ = require('lodash'), $ = require('jquery');
    exports = factory(root, exports, _, $);
  } else {
    root.Struck = factory(root, {}, root._, root.jQuery);
  }
}(this, function(root, Struck, _, $, undefined) {

// ###Utilities

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// #####splitName
// split "event1 event2" into an
// array of event names
function splitName(context, names) {
	if (_.isUndefined(context)) context = this;
	
	// get result of name if defined as a function
	var result = _.isFunction(names) ? names.call(context) : names;

	// split by spaces if result isn't an array
	// always returns an array
	return _.isArray(result) ? result : result.split(" ");
}

// #####result
// returns get result of an expression
function result(expr) {
	return _.isFunction(expr) ? expr() : expr;
}
// ##Hook

// wraps function calls with hook logic,
// used to wrap method calls in an Struck
// Object.  The object's hook function will be
// called before and after the function call
// by default 

// __Example:__
// ```javascript
// var HookedObj = Struck.EventObject.extend({
//   initialize: function () {
//
//     this.com.on('beforeSayHello', function() {
//       console.log('open mouth');
//     });
//   },
//
//   sayHello: Struck.Hook(function () {
//     console.log('say hello');
//   })
// })
//
// var myHookedObject = HookedObj.create({
//   onSayHello: function() {
///    console.log('hello complete);
//   },
//   afterSayHello: function () {
//     console.log('close mouth');
//   }
// });
//
// myHookedObject.sayHello();
//
// output:
//   - open mouth
//   - say hello
//   - hello complete
//   - close mouth
// ```

Struck.Hook = function () {
  var defaults = {
    prefix: 'on',
    pre: 'before',
    post: 'after',
    method: 'hook'
  };

  function fire(self, method, hname, prefix) {
    if (self[method]) {
      self[method].call(self, hname, prefix);
    }
  }

  function Hook(name, func, opts) {
    var options = _.extend({}, defaults, !_.isFunction(func) ? func : opts);

    // define function to called as a method of
    // Struck Object, the `this` context is assumed
    // to refer to the struck object.
    return function() {
      var result;

      if (options.pre) {
        fire(this, options.method, name, options.pre);
      }

      if (_.isFunction(func)) {
        result = func.apply(this, arguments);
      }

      fire(this, options.method, name, options.prefix);

      if (options.post) {
        _.defer(fire, this, options.method, name, options.post);
      }

      return result;
    };
  }

  return Hook;
}();

Struck.Computed = function () {
  var defaults = {};

  function Computed() {
    var options = _.extend({}, defaults, opts);
    options = options;
  }

  return Computed;
}();


// var example = Struck.BaseObject.create();
// example.set({
//   title: 'Hello World',
//   slug: Struck.Computed('title', function() {
//   	return this.get('title')
//   		.toLowerCase()
//   		.split(' ')
//   		.join('-');
//   })
// });

// var example = Struck.BaseObject.create();
// example.set({
//   make: 'Volvo',
//   model: 'Amazon',
//   slug: Struck.Computed('make', 'model', function() {
//   	return [this.get('make'), this.get('model')].join('-').toLowerCase();
//   })
// });

// var example = Struck.BaseObject.create();
// example.set({
//   make: 'Suburu',
//   model: 'Forester',
//   slug: Struck.Computed(['make', 'model'], function() {
//   	return [this.get('make'), this.get('model')].join('-').toLowerCase();
//   })
// });
// ###Extend

// _Pulled from Backbone.js 1.1.2 source_
//
// Helper function to correctly set up the prototype chain,
// for subclasses. Similar to goog.inherits, but uses a hash
// of prototype properties and class properties to be extended.

Struck.extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined
  // by you (the “constructor” property in your extend definition),
  // or defaulted by us to simply call the parent’s constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function() { return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from parent,
  // without calling parent‘s constructor function.
  var Surrogate = function() { this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  // Add prototype properties (instance properties)
  // to the subclass, if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);

  // Set a convenience property in case the
  // parent’s prototype is needed later.
  child.__super__ = parent.prototype;

  return child;
};

// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = function () {

	// ####BaseObject Constructor

	// constructor is run when object is created
	// runs base initiation by default

	// __Warning: overwriting the BaseObject
	// Constructor will disable internal processes.__
	// In cases where overwriting the constructor
	// is required call the prototype to preserve
	// functionality:

	// `Struck.BaseObject.prototype.constructor.apply(this, arguments);`

	function BaseObject(options) {
		// run base initiation and provide
		// hooks that extended objects can use
		this.baseInitiation(options);
		this.initialize();
	}

	// #####initialize
	// overwritable function that gets called
	// when constructing new objects
	BaseObject.prototype.initialize = Struck.Hook('initialize', _.noop);

	// #####baseInitiation
	// when the object is created
	BaseObject.prototype.baseInitiation = Struck.Hook('baseInitiation', function(options) {
		// assign UID to view object
		this.uid = _.uniqueId('struck');

		// add options object to instance
		this.options = _.extend({}, options);
	});

	// #####destroy
	// overwritable function that gets called
	// when destroying object
	BaseObject.prototype.destroy = Struck.Hook('destroy', _.noop);

	// #####hook
	// interface for providing method callbacks
	// like `onRender`
	BaseObject.prototype.hook = function(name, mod) {
		var args = _.rest(arguments, 2),
			prefix = mod || 'on',
			methodHook = prefix + capitalize(name);

		if (this[methodHook]) {
			return this[methodHook].apply(this, args);
		}
	};

	function reduceProps(self, props) {
		return _.reduce(props, function(memo, prop) {
			memo[prop] = self.get(prop);
			return memo;
		}, {});
	}

	// #####get
	BaseObject.prototype.get = Struck.Hook('get', function(prop) {
		var args = _.toArray(arguments);
		if (_.isArray(prop)) {
			return reduceProps(this, prop);
		} else if (args.length > 1) {
			return reduceProps(this, args);
		}
		return this[prop];
	});

	// #####set
	BaseObject.prototype.set = Struck.Hook('set', function(prop, val) {
		prop = result(prop);
		if (_.isObject(prop)) {
			_.each(prop, function(value, property) {
				this.set(property, value);
			}, this);
		}
		this[prop] = result(val);
	});

	BaseObject.extend = Struck.extend;

	// ###create
	// prefered method of creating new objects
	// over using the `new` style
	BaseObject.create = function(props, opts) {
		var object = this.extend(props);
		return new object(_.extend({}, props, opts));
	};



	return BaseObject;
}();

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
		var postfix = mod !== undefined ? ':' + mod : '';
		Struck.BaseObject.prototype.hook.apply(this, arguments);
		this.com.emit(name + postfix, arguments);
	};

	function addListener(obj, events, func, opts) {
		if (opts.once) {
			func = function () {
				func.apply(obj);
				removeListener(obj, events, func, opts);
			};
		}

		this._events.push({
			events: events,
			func: func,
			obj: obj
		});
	}

	function removeListener(obj, events, func) {
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

// ##Intercom

// A standalone function for an event subscriber
// system to be used in other modules
Struck.Intercom = function (root) {
	// setup default subscription object
	// used to clone and extend in `subscribe` function
	var defaultSubscription = {
		single: false,
		name: 'all',
		callback: _.noop,
		context: root,
		args: []
	};

	// get keys from default subscription object
	// useful for iteration and filtering
	var subscriptionKeys = _.keys(defaultSubscription);

	// #####Constructor
	// set up default subscriptio object's context to the
	// intercom instance and create subscription collection
	var Intercom = Struck.BaseObject.extend({
		baseInitiation: function () {
			Struck.BaseObject.prototype.baseInitiation.apply(this, arguments);
			this.defaultSubscription = _.extend(_.clone(defaultSubscription), { context: this });
			this.subscriptions = [];
		}
	});


	// #####subscriber
	// splits and delegates subscriptions from on/once calls
	function subscriber(com, names, func, opts) {
		_.each(splitName(com, names), function (name) {
			subscribe(com, name, func, {
				single: opts.single,
				context: opts.context,
				args: opts.args
			});
		});
	}

	// #####subscribe
	// build subscription object from
	// name and function, additional
	// options are optional...
	function subscribe(com, name, func, opts) {
		if (!name && !func) return;

		var subOptions = {
			name: name,
			callback: func
		};

		// add useful options to subOptions
		_.each(subscriptionKeys, function (key) {
			if (opts[key]) subOptions[key] = opts[key];
		});

		// create a new subscription from the default object
		// and overwrite properties with subOptions,
		// then adds subscription to collection
		var subscription = _.extend({}, defaultSubscription, subOptions);
		com.subscriptions.push(subscription);
	}

	function unsubscriber(com, names, func) {
		if (names === undefined || names === 'all') {
			unsubscribe(com);
			return;
		}

		_.each(splitName(com, names), function (name) {
			unsubscribe(com, name, func);
		});
	}

	// #####unsubscribe
	//
	function unsubscribe(com, name, func) {
		var filter = function (sub) {
			// com, name, func:
			// .. remove specific subscriber function
			if (func) {
				return sub.name == name && sub.callback == func;

			// com, name:
			// .. remove all subscribers by name
			} else if (name) {
				return sub.name == name;
			}

			// remove all subscriptions if no arguments provided
			return true;
		};

		com.subscriptions = _.reject(com.subscriptions, filter);
	}

	// #####trigger
	//
	function trigger(com, sub, data) {
		sub.callback.apply(sub.context, data ? [data].concat(sub.args) : sub.args);

		if (sub.single) {
			unsubscribe(com, sub.name, sub.callback);
		}
	}

	// #####Intercom.on
	Intercom.prototype.on = function(names, callback, context) {
		subscriber(this, names, callback, {
			single: false,
			context: context,
			args: _.rest(arguments, 3)
		});

		return this;
	};

	// #####Intercom.once
	Intercom.prototype.once = function(names, callback, context) {
		subscriber(this, names, callback, {
			single: true,
			context: context,
			args: _.rest(arguments, 3)
		});

		return this;
	};

	// #####Intercom.off
	Intercom.prototype.off = function(names, callback) {
		unsubscriber(this, names, callback);

		return this;
	};

	// #####Intercom.emit
	Intercom.prototype.emit = function (names, data) {
		var filteredSubs = _.reduce(splitName(this, names), function (subs, name) {
			var matches = _.filter(this.subscriptions, function (subscriber) {
				return subscriber.name == name;
			}, this);

			return subs.concat(matches);
		}, [], this);

		filteredSubs = _.unique(filteredSubs);

		_.each(filteredSubs, function(sub) {
			trigger(this, sub, data);
		}, this);

		return this;
	};

	return Intercom;
}(root);

	return Struck;
}));
