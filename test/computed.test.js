describe('Struck.computed', function () {	
	var count = 0;
	var counter = function() { count++; };
	var noop = function() {};
	var instance, baseobj;

	beforeEach(function() {
		count = 0;
	});

	it('should return a property', function() {
		instance = Struck.EventObject.extend({
			name: 'Borg',
			properName: new Struck.computed('name', function() { 
				return 'Mr. ' + this.get('name');
			})
		}).create();
		instance.get('properName').should.equal('Mr. Borg');
	});

	it('should listen for property changes and self-update', function() {
		instance = Struck.EventObject.extend({
			name: 'Borg',
			properName: new Struck.computed('name', function() { 
				return 'Mr. ' + this.get('name');
			})
		}).create();

		instance.get('properName').should.equal('Mr. Borg');
		instance.set('name', 'Roboto');
		instance.get('properName').should.equal('Mr. Roboto');
	});

	it.skip('should accept a single property to track', function() {
		instance = Struck.EventObject.extend({
			name: 'Borg',
			properName: Struck.computed('name', function() { 
				return 'Mr. ' + this.get('name');
			})
		}).create();

		instance.set('name', 'Roboto');
		instance.get('properName').should.equal('Mr. Roboto');
	});

	it.skip('should accept an array of properties to track', function() {
		instance = Struck.EventObject.extend({
			first: 'Thomas',
			last: 'Selleck',
			fullName: Struck.computed(['first', 'last'], function() { 
				return this.get('first') + this.get('last');
			})
		}).create();

		instance.set('first', 'Tom');
		instance.get('fullName').should.equal('Tom Selleck');
	});

	it.skip('should accept multiple argments of properties to track', function() {
		instance = Struck.EventObject.extend({
			first: 'Thomas',
			last: 'Selleck',
			fullName: Struck.computed('first', 'last', function() { 
				return this.get('first') + this.get('last');
			})
		}).create();

		instance.set('first', 'Tom');
		instance.get('fullName').should.equal('Tom Selleck');
	});

	it.skip('should accept computed properties to track', function() {
		instance = Struck.EventObject.extend({
			first: 'Thomas',
			last: 'Selleck',
			fullName: Struck.computed('first', 'last', function() { 
				return [this.get('first'), this.get('last')].join();
			}),
			formalName: Struck.computed('fullName', function() { 
				return ['Mr', this.get('fullName')].join();
			})
		}).create();

		instance.set('first', 'Tom');
		instance.get('fullName').should.equal('Tom Selleck');
		instance.get('formalName').should.equal('Tom Selleck');
	});
});