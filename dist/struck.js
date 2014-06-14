(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'jquery', 'exports'], function(_, $, exports) {
      root.Struck = factory(root, exports, _, $);
    });
  } else if (typeof exports !== 'undefined') {
    factory(root, exports, require('lodash'), require('jquery'));
  } else {
    root.Struck = factory(root, {}, root._, root.jQuery);
  }
}(this, function(root, Struck) {


// ###Extend
//
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


// ##Intercom
//
// A standalone function for an event subscriber
// system to be used in other modules

var Intercom = Struck.Intercom = function (root) {

	// setup default subscription object
	// used to clone and extend in `subscribe` function
	var defaultSubscription = {
		single: false,
		name: "all",
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
	function Intercom() {
		this.defaultSubscription = _.extend(_.clone(defaultSubscription), { context: this });
		this.subscriptions = [];
	}

	// #####splitName
	// split "event1 event2" into an
	// array of event names
	function splitName(com, name) {
		// get result of name if defined as a function
		var result = _.isFunction(name) ? name.call(com) : name;

		// split by spaces if result is an array
		// always returns an array
		return _.isArray(result) ? result.split(" ") : [result];
	}

	// #####subscribe
	// build subscription object from
	// name and function, additional
	// options are optional...
	function subscribe(com, name, func, options) {
		if (!name && !func) return;

		var subOptions = {
			name: name,
			callback: func
		};

		// add useful options to subOptions
		_.each(subscriptionKeys, function (key) {
			if (options[key]) subOptions[key] = options[key];
		});

		// create a new subscription from the default object
		// and overwrite properties with subOptions,
		// then adds subscription to collection
		var subscription = _.extend(_.clone(defaultSubscription), subOptions);

		com.subscriptions.push(subscription);
	}

	// #####unsubscribe
	//
	function unsubscribe(com, name, func) {

	}

	// #####trigger
	//
	function trigger(com, sub, data) {
		// sub.callback.apply(sub.context, sub.args);
	}

	// #####Intercom.on
	Intercom.prototype.on = function(names, callback, context) {
		var args = _.rest(arguments, 3);
		_.each(splitName(this, names), function (name) {
			subscribe(this, name, callback, {
				single: false,
				context: context,
				args: args
			});
		}, this);
	};

	// #####Intercom.once
	Intercom.prototype.once = function(names, callback, context) {
		var args = _.rest(arguments, 3);
		_.each(splitName(this, names), function (name) {
			subscribe(this, name, callback, {
				single: true,
				context: context,
				args: args
			});
		}, this);
	};

	// #####Intercom.off
	Intercom.prototype.off = function(names, callback) {
		if (names === undefined || names === "all") {
			unsubscribe(this);
			return;
		}

		_.each(splitName(this, names), function (name) {
			unsubscribe(this, name, callback);
		}, this);
	};

	// #####Intercom.emit
	Intercom.prototype.emit = function (names, data) {
		var filteredSubs = _.reduce(splitName(this, names), function (subs, name) {
			var matches = _.filter(this.subscriptions, function (subscriber) {
				return subscriber.name == name;
			}, this);

			return subs.concat(matches);
		}, [], this);

		_.each(filteredSubs, function(sub) {
			console.log(sub);

			// trigger(this, sub);
		}, this);
	};

	Intercom.extend = Struck.extend;

	return Intercom;
}(root);


Struck.computed = function (func, property) {

	return {};
};


Struck.Model = function () {
	function Model() {
		_.extend(this, new Struck.Intercom());
	}

	Model.prototype.get = _.noop;
	Model.prototype.set = _.noop;
	Model.prototype.data = _.noop;

	return Model;
}();


// View
// ======


Struck.View = function () {
  // array of options that will be extended
  // to the view when initialized
  var viewOptions = ['el', 'ui', 'template', 'model'];

  // `View` constructor returns a View object
  // that contains methods for template/model
  // rendering, dom caching, and event listening.
  function View(options) {
    var self = this;

    // setup default options
    this.options = _.extend({}, options);

    // add event api to view
    this.com = new Struck.Intercom();

    // assign UID to view object
    this.uid = _.uniqueId('view');

    // gets model
    this.model = _.result(self, 'model');

    // extend selected instance opitions to object
    _.extend(this, _.pick(this.options, viewOptions));

    // setup view elements
    if (this.el) this.setElement(_.result(this, 'el'));

    // render template with model if defined
    if (this.template) this.render();

    _.defer(function () {
      // cache jquery elements
      setupUI(self, _.result(self, 'ui'));

      // run setup function
      self.setup(self.options);
    });
  }

  // extend function for backbone-like inheritence
  View.extend = Struck.extend;

  // caches the dom object and creates scoped find function
  View.prototype.setElement = function(el) {
    this.$el = $(el).eq(0);
    this.el = this.$el[0];
    this.$ = function(el) { return this.$el.find(el); };
  };

  // `render` function that runs
  // template function with model data
  View.prototype.render = function() {

  };

  // overwritable `setup` function
  // called when View is initialized
  View.prototype.setup = _.noop;

  // overwritable `cleanup` function
  // that should be called when removing
  // a view to remove event listeners
  // or any possible memory leaks
  View.prototype.cleanup = _.noop;

  View.prototype.listenTo = function () { };

  // ###Private Functions

  // cache dom objects from UI object
  function setupUI(view, ui) {
    if (self.ui) {
      view.ui = _.reduce(ui, function (result, selector, name) {
        result[name] = view.$(ui[name]);
        return result;
      }, {});
    }
  }

  return View;
}();


	return Struck;
}));


//# sourceMappingURL=struck.js.map