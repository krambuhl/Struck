// ###Utilities

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// #####splitName
// split "event1 event2" into an
// array of event names
function splitName(context, names) {	
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

function firstDef() {
	return _.find(arguments, function(arg) { 
		return !_.isUndefined(arg);
	});
}