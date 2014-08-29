describe('Struck.Intercom', function () {
  var count = 0;
  var counter = function() { count++; };
  var noop = function() {};
  var instance;

  beforeEach(function() {
    count = 0;
    instance = Struck.Intercom.create();
  });


  it('should define a default subscription object', function () {
    instance.should.have.property('defaultSubscription');
  });

  it('should define a default collection of subscriptions', function () {
    instance.should.have.property('subscriptions');
  });

  it('should define `on`, `once`, `off`, `emit` public methods', function() {
    instance.should.have.properties('on', 'once', 'off', 'emit');
  });

  it('should define public methods as chainable functions', function() {
    instance.on('test', noop).should.be.equal(instance);
    instance.once('test', noop).should.be.equal(instance);
    instance.off('test').should.be.equal(instance);
    instance.emit('test').should.be.equal(instance); 
  });

  describe('on()', function () {
    it('should subscribe to named event', function() {
      instance.on('test', counter);
      instance.emit('test');
      count.should.equal(1);
    });

    it('should subscribe to multiple events with a space split string', function() {
      instance.on('star wars', counter);
      instance.emit('star')
      instance.emit('wars');
      count.should.equal(2);
    });

    it('should subscribe to multiple events with an array of event strings', function() {
      instance.on(['test', 'case'], counter);
      instance.emit('test')
      instance.emit('case');
      count.should.equal(2);
    });

    it('should control the context of the callback with an optional 3rd argument', function() {
      instance.on('test', function() { 
        this.should.equal('buttz');
      }, 'buttz');

      instance.emit('test');
    });
  });

  describe('once()', function () { 
    it('should pass all tests passed by on()', function() {
      instance.once('test', counter);
      instance.once('test case', counter);
      instance.once(['test', 'case'], counter);

      instance.emit('test case');

      count.should.equal(5)
    });

    it('should unsubscribe events after firing callback function', function() {
      instance.once('test', counter);
      instance.emit('test');
      instance.emit('test');
      count.should.equal(1)
    });
  });

  describe('off()', function () {
    it('should unsubscribe from named event with specific callback function', function() {
      instance.on('test', counter);
      instance.off('test', counter);
      instance.emit('test');
      count.should.equal(0)
    });

    it('should unsubscribe from generic named event', function() {
      instance.on('test', counter);
      instance.off('test');
      instance.emit('test');
      count.should.equal(0)
    });
  });

  describe('emit()', function () {
    it('should call named callback function', function() {
      instance.on('test', counter);
      instance.emit('test');
      count.should.equal(1);
    });

    it('should call multiple event callbacks with a space seprtated event string', function() {
      instance.on('test', counter);
      instance.on('case', counter);
      instance.emit('test case');
      count.should.equal(2);
    });

    it('should call multiple event callbacks with an array of event strings', function() {
      instance.on('test', counter);
      instance.on('case', counter);
      instance.emit(['test', 'case']);
      count.should.equal(2);
    });

    it('should call multiple, different callback functions', function() {
      var altCounter = counter;

      instance.on('test', counter);
      instance.on('test', altCounter);

      instance.emit('test');
      count.should.equal(2);
    });

    it('should accept a 2nd argument of data sent to callback function', function(done) {
      instance.on('test', function(data) {
        data.test.should.equal('case');
        done();
      });

      instance.emit('test', { test: 'case' });
    });
  });
});
