// ##BaseObject

// function for enabling common architectures
Struck.BaseObject = (function () {

  // ####BaseObject Constructor

  // constructor is run when object is created
  // runs base initiation by default

  // __Warning: overwriting the BaseObject
  // Constructor will disable internal processes.__
  // In cases where overwriting the constructor
  // is required call the prototype to preserve
  // functionality:

  // `Struck.BaseObject.prototype.constructor.apply(this, arguments);`

  function BaseObject(options) {
    // run base initiation and provide
    // hooks that extended objects can use
    this.initializeObject(options);
    this.initialize();
  }

  // #####initializeObject
  // when the object is created
  BaseObject.prototype.initializeObject = Struck.hook('initializeObject', function(options) {
    // assign UID to view object
    this.uid = _.uniqueId('uid');

    // add options object to instance
    this.options = _.extend({}, options);
  });

  // #####initialize
  // overwritable function that gets called
  // when constructing new objects
  BaseObject.prototype.initialize = Struck.hook('initialize', _.noop);

  // #####destroy
  // overwritable function that gets called
  // when destroying object
  BaseObject.prototype.destroy = Struck.hook('destroy', _.noop);

  // #####hook
  // interface for providing method callbacks
  // like `onRender`
  BaseObject.prototype.hook = function(name, mod) {
    var args = _.rest(arguments, 2),
      prefix = firstDef(mod, 'on'),
      methodHook = prefix + capitalize(name);

    if (this[methodHook]) {
      return this[methodHook].apply(this, args);
    }
  };

  function reduceProps(self, props) {
    return _.reduce(props, function(memo, prop) {
      memo[prop] = self.get(prop);
      return memo;
    }, {});
  }

  // #####get
  BaseObject.prototype.get = Struck.hook('get', function(prop) {
    var args = _.toArray(arguments);
    if (_.isArray(prop)) {
      return reduceProps(this, prop);
    } else if (args.length > 1) {
      return reduceProps(this, args);
    }
    return result(this[prop], this);
  });

  // #####set
  BaseObject.prototype.set = Struck.hook('set', function(prop, val) {
    prop = result(prop);
    if (_.isObject(prop)) {
      _.each(prop, function(value, property) {
        this.set(property, value);
      }, this);
    }
    this[prop] = result(val, this);
  });

  BaseObject.extend = Struck.extend;

  // ###create
  // prefered method of creating new objects
  // over using the `new` style
  BaseObject.create = function(props, opts) {
    var Creator = this.extend(props);
    return new Creator(_.extend({}, props, opts));
  };


  return BaseObject;
})();
