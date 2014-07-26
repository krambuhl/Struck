function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// #####splitName
// split "event1 event2" into an
// array of event names
function splitName(name, context) {
	if (_.isUndefined(context)) context = this;
	// get result of name if defined as a function
	var result = _.isFunction(name) ? name.call(context) : name;

	// split by spaces if result isn't an array
	// always returns an array
	return _.isArray(result) ? result : result.split(" ");
}

// #####result
// returns get result of an expression
function result(expr) {
	return _.isFunction(expr) ? expr() : expr;
}
