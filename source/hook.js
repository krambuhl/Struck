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
  function Hook(name, func, opts) {
    opts = _.isObject(func) ? func : opts;

    var options = _.extend({
      before: true,
      after: true,
      method: "hook"
    }, opts);

    function hook(self, hname, prefix) {
      if (self[options.method]) {
        self[options.method](hname, prefix);
      }
    }

    // define function to called as a method of
    // Struck Object, the `this` context is assumed
    // to refer to the struck object.
    return function() {
      if (options.before) hook(this, name, 'before');

      func.apply(this, arguments);
      hook(this, name, 'on');

      if (options.after) hook(this, name, 'after');
    };
  }

  return Hook;
}();
