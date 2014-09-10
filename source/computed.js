Struck.Computed = (function () {
  var defaults = {};

  function Computed() {
    var options = _.extend({}, defaults, opts);
    options = options;
  }

  return Computed;
})();


// var example = Struck.BaseObject.create();
// example.set({
//   title: 'Hello World',
//   slug: Struck.Computed('title', function() {
//   	return this.get('title')
//   		.toLowerCase()
//   		.split(' ')
//   		.join('-');
//   })
// });

// var example = Struck.BaseObject.create();
// example.set({
//   make: 'Volvo',
//   model: 'Amazon',
//   slug: Struck.Computed('make', 'model', function() {
//   	return [this.get('make'), this.get('model')].join('-').toLowerCase();
//   })
// });

// var example = Struck.BaseObject.create();
// example.set({
//   make: 'Suburu',
//   model: 'Forester',
//   slug: Struck.Computed(['make', 'model'], function() {
//   	return [this.get('make'), this.get('model')].join('-').toLowerCase();
//   })
// });