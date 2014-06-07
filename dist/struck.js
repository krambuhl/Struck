(function(root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    root.Struck = factory(root, exports);
  } else {
    root.Struck = factory(root, {});
  }
}(this, function(root, Struck) {


// mixin object for jquery event api
// code from http://james.padolsey.com/javascript/jquery-eventemitter/
Struck.events = (function(jQuery) {
  var jq;
  function init(self) { jq = jQuery(self); }

  var events = {
    trigger: function(evt, data) {
      !jq && init(this);
      jq.trigger(evt, data);
    },

    once: function(evt, handler) {
      !jq && init(this);
      jq.one(evt, handler);
    },

    on: function(evt, handler) {
      !jq && init(this);
      jq.bind(evt, handler);
    },

    off: function(evt, handler) {
      !jq && init(this);
      jq.unbind(evt, handler);
    }
  };

  events.extend = Struck.extend;

  return events;
}(jQuery));


// Pulled from Backbone.js 1.1.2 source

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


Struck.View = (function () {
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
    // _.extend(this.vent, Struck.events);

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


  View.prototype.bind = function () { };


  // Private Functions
  // ===================

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
})();


	return Struck;
});


//# sourceMappingURL=struck.js.map
