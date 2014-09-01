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
