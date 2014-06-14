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
