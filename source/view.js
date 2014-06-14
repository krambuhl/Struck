// View
// ======


Struck.View = function () {
  // array of options that will be extended
  // to the view when initialized
  var viewOptions = ['el', 'ui', 'template', 'model'];

  // `View` constructor returns a View object
  // that contains methods for template/model
  // rendering, dom caching, and event listening.
  var View = Struck.BaseObject(function(options) {
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
  });

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
