Struck.computed = (function () {
  function Computed() {
  	var self = this;

    self.props = splitName(_.flatten(_.initial(arguments)));
    self.func = _.last(arguments);
    
    var setup = _.once(setupListeners);

    return function() {
    	_.bind(setup, undefined, self, this)();

    	if (!self.cached) {
				self.cached = self.func.apply(this);
    	}

    	return self.cached;
		};
  }

  function setupListeners(comp, obj) {
  	_.each(comp.props, function(property) {
  		obj.listenTo('set:' + property, function() {
  			comp.cached = comp.func.apply(obj);
  		});
  	});
  }

  return Computed;
})();