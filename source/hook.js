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
//   - close mouth
// ```

Struck.Hook = function () {
  function Hook(name, func, opts) {
    opts = _.isObject(func) ? func : opts;

    var options = _.extend({
      before: true,
      after: true
    }, opts);

    // define function to called as a method of
    // Struck Object, the `this` context is assumed
    // to refer to the struck object.
    return function() {
      if (this.hook && options.before) {
        this.hook(name, 'before');
      }

      func.apply(this, arguments);

      if (this.hook && options.after) {
        this.hook(name, 'after');
      }
    };
  }

  return Hook;
}();
