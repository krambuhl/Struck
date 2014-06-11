var Intercom = Struck.Intercom = function (root) {
	var defaultSubscriber = {
		single: false,
		name: "all",
		callback: _.noop,
		context: root,
		args: []
	};

	var messageKeys = _.keys(defaultSubscriber);

	function Intercom() {
		this.defaultSubscriber = _.extend(_.clone(defaultSubscriber), { conntext: this });

		this.subscribers = [];
	}

	// split "event1 event2" into an
	// array of event names
	function splitName(com, name) {
		// get result of name if defined as a function
		var result = _.isFunction(name) ? name.call(com) : name;

		// split by spaces if result is an array
		// always returns an array
		return _.isArray(result) ? result.split(" ") : [result];
	}

	function subscribe(com, name, func, options) {
		if (!name && !func) return;

		// build message
		var message = {
			name: name,
			callback: func
		};

		// find useful options
		_.each(messageKeys, function (key) {
			if (options[key]) message[key] = options[key];
		});

		com.subscribers.push(_.extend(_.clone(defaultSubscriber), message));
	}

	function unsubscribe(com, name, func) {

	}

	function trigger(com, sub) {
		sub.callback.apply(sub.context, sub.args);
	}

	Intercom.prototype.on = function(names, callback, context) {
		var args = _.rest(arguments, 3);
		_.each(splitName(names), function (name) {
			subscribe(com, name, callback, {
				context: context,
				args: args,
				single: false
			});
		});
	};

	Intercom.prototype.once = function(names, callback, context) {
		var args = _.rest(arguments, 3);
		_.each(splitName(names), function (name) {
			subscribe(com, name, callback, {
				context: context,
				args: args,
				single: true
			});
		});
	};

	Intercom.prototype.off = function(names, callback) {

	};

	Intercom.prototype.emit = function (names, data) {
		var filteredSubs = [];

		_.each(splitName(names), function (name) {
			filteredSubs.push(_.filter(this.subscribers, function (subscriber) {
				return subscriber.name == name;
			}));
		});

		_.each(_.flatten(filteredSubs), function(sub) {
			trigger(this, sub);
		}, this);
	};

	Intercom.extend = Struck.extend;

	return Intercom;
}(root);
