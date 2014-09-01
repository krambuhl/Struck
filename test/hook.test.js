var noop = function() { };

describe('Struck.Hook', function () {
	var obj;

	beforeEach(function() {
		obj = function() {};
	});

	it ('should return a wrapped function definition', function(done) {
		var hooked = Struck.Hook('test', function() {
			done();
		});
		hooked();
	});

	it('should call hook method to fire callbacks', function(done) {
		obj.hook = _.once(function() { done(); });
		obj.test = Struck.Hook('test', noop);
		obj.test();
	});

	it('should map hook to a different function with method option', function(done) {
		obj.beep = _.once(function() { done(); });
		obj.test = Struck.Hook('test', noop, { method: 'beep' });
		obj.test();
	});

	it('should call hook function with calling object as context', function(done) {
		obj.hook = _.once(function() { if (this == obj) done(); });
		obj.test = Struck.Hook('test', noop);
		obj.test();
	});

	it('should accept options only if no hook function is defined', function(done) {
		obj.beep = _.once(function() { done(); });
		obj.test = Struck.Hook('test', { method: 'beep' });
		obj.test();
	});

	it('should call pre-hook, immediate hook and post-hook by default', function(done) {
		var state = 0; // 0 = unstarted, 2 = after 3 hook calls
		obj.hook = function() { if (state++ == 2) done(); };
		obj.test = Struck.Hook('test', noop);
		obj.test();
	});

	it('should call pre-hook if `pre` option is defined', function(done) {
		obj.hook = function(name, prefix) { if (prefix == 'test') done(); };
		obj.test = Struck.Hook('test', noop, { pre: 'test' });
		obj.test();
	});

	it('should call pre-hook before hooked function is called', function(done) {
		var state = 0; // 0 = unstarted, 1 = prehook called
		obj.hook = function() { state++; };
		obj.test = Struck.Hook('test', function() { 
			if (state == 1) done(); 
		});
		obj.test();
	});

	it('should call immediate hook if `prefix` option is defined', function(done) {
		obj.hook = function(name, prefix) { if (prefix == 'test') done(); };
		obj.test = Struck.Hook('test', noop, { prefix: 'test' });
		obj.test();
	});

	it('should call immediate hook imediately after hooked function is called', function(done) {
		var state = 0; // 0 = unstarted, 2 = after function called
		
		obj.hook = function() { if (state++ == 2) done(); };
		obj.test = Struck.Hook('test', function() { return state++; });
		obj.test();
	});

	it('should call post-hook if `post` option is defined', function(done) {
		obj.hook = function(name, prefix) { if (prefix == 'test') done(); };
		obj.test = Struck.Hook('test', noop, { post: 'test' });
		obj.test();
	});

	it('should call post-hook after hooked function is called in defered fashion', function(done) {
		var state = 0; // 0 = unstarted, 1 = hooked func called, 2 = after function called
		obj.hook = function() { if (state++ == 2) done(); };
		obj.test = Struck.Hook('test', function() { return state++; });
		obj.test();
	});
});