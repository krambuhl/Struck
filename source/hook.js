// ##Hook

// wraps function calls with hook logic,
// used to wrap method calls in an Struck
// Object.  The object's hook function will be
// called before and after the function call

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
//   sayHello: Struck.Hook(function () {
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

Struck.Hook = function () {
  var defaults = {
    before: true,
    after: true,
    method: 'hook'
  };

  function fire(self, method, hname, prefix) {
    if (self[method]) {
      self[method](hname, prefix);
    }
  }

  function Hook(name, func, opts) {
    opts = !_.isFunction(func) ? func : opts;
    var options = _.extend(defaults, opts);

    // define function to called as a method of
    // Struck Object, the `this` context is assumed
    // to refer to the struck object.
    return function() {
      if (options.before) fire(this, options.method, name, 'before');

      func.apply(this, arguments);
      fire(this, options.method, name, 'on');

      if (options.after) fire(this, options.method, name, 'after');
    };
  }

  return Hook;
}();
