describe.skip('Struck.Computed', function () {	
	var count = 0;
	var counter = function() { count++; };
	var noop = function() {};
	var instance, baseobj;

	beforeEach(function() {
		count = 0;
	});

	it('should return a wrapped function definition', function(done) {
		instance = Struck.Computed(done);
		instance();
	});

	it('should call function argument when executed', function() {

	});

	it('should accept a single property to track', function() {
		instance = Struck.BaseObject.extend({
			name: 'Borg',
			properName: Struck.Computed('name', function() { 
				return 'Mr. ' + this.get('name')
			})
		}).create();

		instance.set('name', 'Roboto');
		instance.get('properName').should.equal('Mr. Roboto');
	});

	it('should accept an array of properties to track', function() {
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

	it('should accept multiple argments of properties to track', function() {
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
});