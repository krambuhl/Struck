function getFuncName(func) {
  var ret = func.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
