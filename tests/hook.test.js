var noop = function() {};

describe('Struck.Hook', function () {
	it ('should return a wrapped function definition', function(done) {
		var hooked = Struck.Hook('test', function() {
			done();
		});
		hooked();
	});

	it('should call hook method to fire callbacks', function(done) {
		var obj = function() {};
		obj.hook = _.once(function() { done(); });
		obj.test = Struck.Hook('test', noop);
		obj.test();
	});

	it('should map hook to a differently named function with method option', function(done) {
		var obj = function() {};
		obj.beep = _.once(function() { done(); });
		obj.test = Struck.Hook('test', noop, { method: 'beep' });
		obj.test();
	});
});