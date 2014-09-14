// ###Utilities

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// #####splitName
// split "event1 event2" into an
// array of event names
function splitName(names, context) {
  // get result of name if defined as a function
  var events = result(names, context);

  // split by spaces if result isn't an array
  // always returns an array
  return _.isArray(events) ? events : events && events.split(' ');
}

// #####result
// returns get result of an expression
function result(expr, context) {
  return _.isFunction(expr) ? expr.apply(context) : expr;
}

function firstDef() {
  return _.find(arguments, function(arg) { 
    return !_.isUndefined(arg);
  });
}