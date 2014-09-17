// ##Hook

// wraps function calls with hook logic,
// used to wrap method calls in an Struck
// Object.  The object's hook function will be
// called before and after the function call
// by default 

// __Example:__
// ```javascript
// var HookedObj = Struck.EventObject.extend({
//   initialize: function () {
//
//     this.com.on('beforeSayHello', function() {
//       console.log('open mouth');
//     });
//   },
//
//   sayHello: Struck.hook(function () {
//     console.log('say hello');
//   })
// })
//
// var myHookedObject = HookedObj.create({
//   onSayHello: function() {
///    console.log('hello complete);
//   },
//   afterSayHello: function () {
//     console.log('close mouth');
//   }
// });
//
// myHookedObject.sayHello();
//
// output:
//   - open mouth
//   - say hello
//   - hello complete
//   - close mouth
// ```

Struck.hook = (function () {
  var defaults = {
    prefix: 'on',
    pre: 'before',
    post: 'after',
    method: 'hook'
  };

  function fire(self, method, opts) {
    if (self[method]) {
      self[method].call(self, opts.name, opts.prefix, opts.args);
    }
  }

  function Hook(name, func, opts) {
    var options = _.extend({}, defaults, !_.isFunction(func) ? func : opts);
    var fireDefaults = {
      name: name,
      prefix: options.prefix
    };

    // define function to called as a method of
    // Struck Object, the `this` context is assumed
    // to refer to the struck object.
    return function() {
      var args = _.toArray(arguments),
        result;

      var fireOptions = _.extend({}, fireDefaults, { args: args });

      if (options.pre) {
        fire(this, options.method, _.extend({}, fireOptions, { prefix: options.pre }));
      }

      if (_.isFunction(func)) {
        result = func.apply(this, arguments);
      }

      fire(this, options.method, fireOptions);

      if (options.post) {
        _.defer(fire, this, options.method, _.extend({}, fireOptions, { prefix: options.post }));
      }

      return result;
    };
  }

  return Hook;
})();
