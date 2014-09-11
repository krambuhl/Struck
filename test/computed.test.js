describe('Struck.Computed', function () {	
	var count = 0;
	var counter = function() { count++; };
	var noop = function() {};
	var instance, baseobj;

	beforeEach(function() {
		count = 0;
		instance = Struck.BaseObject.extend({
			first: 'Thomas',
			last: 'Selleck',
			fullName: Struck.Computed('first', 'last', function() { 
				return this.get('first') + this.get('last');
			})
		}).create();
	});

	afterEach(function() {
		instance.destroy();
	});

	it.skip('should return a wrapped function definit.skipion', function(done) {
		instance = Struck.Computed(done);
		instance();
	});

	it.skip('should accept a single property to track', function() {
		instance = Struck.BaseObject.extend({
			name: 'Borg',
			properName: Struck.Computed('name', function() { 
				return 'Mr. ' + this.get('name');
			})
		}).create();

		instance.set('name', 'Roboto');
		instance.get('properName').should.equal('Mr. Roboto');
	});

	it.skip('should accept an array of properties to track', function() {
		instance = Struck.BaseObject.extend({
			first: 'Thomas',
			last: 'Selleck',
			fullName: Struck.Computed(['first', 'last'], function() { 
				return this.get('first') + this.get('last');
			})
		}).create();

		instance.set('first', 'Tom');
		instance.get('fullName').should.equal('Tom Selleck');
	});

	it.skip('should accept multiple argments of properties to track', function() {
		instance = Struck.BaseObject.extend({
			first: 'Thomas',
			last: 'Selleck',
			fullName: Struck.Computed('first', 'last', function() { 
				return this.get('first') + this.get('last');
			})
		}).create();

		instance.set('first', 'Tom');
		instance.get('fullName').should.equal('Tom Selleck');
	});

	it.skip('should listen for property changes and self-update', function() {

	});
});