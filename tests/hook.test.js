var noop = function() { };

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

	it('should map hook to a differently function with method option', function(done) {
		var obj = function() {};
		obj.beep = _.once(function() { done(); });
		obj.test = Struck.Hook('test', noop, { method: 'beep' });
		obj.test();
	});

		// it('should call default hook if prefix option is defined', function(done) {
		// 	var obj = function() {};
		// 	obj.hook = function(name, prefix) {
		// 		console.log(name, prefix);
		// 	 if(prefix == 'testOn') done(); 
		// 	};
		// 	obj.test = Struck.Hook('test', noop);
		// 	obj.test();
		// });
	it('should call default hook if prefix option is defined', function(done) {
		var obj = function() {};
		obj.hook = function(name, prefix) { 
			console.log(name, prefix);
			if (prefix == 'test') done(); 
		};
		obj.test = Struck.Hook('test', noop, { prefix: 'test' });
		obj.test();
	});

	it('should call before hook if before option is defined', function(done) {
		var obj = function() {};
		obj.hook = function(name, prefix) { if (prefix == 'pre') done(); };
		obj.test = Struck.Hook('test', noop, { before: 'pre' });
		obj.test();
	});

	// it('should call after hook if after option is defined', function(done) {
	// 	var obj = function() {};
	// 	obj.hook = function(name, prefix) {done(); };
	// 	obj.test = Struck.Hook('test', noop);
	// 	obj.test();
	// });
});