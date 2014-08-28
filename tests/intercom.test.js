describe('Struck.Intercom', function () {
  var count = 0;
  var counter = function() { count++; }
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

  describe('on()', function () {
    it('should subscribe to named event', function() {
      instance.on('test', counters);
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

    it('should return an unique id for referencing event later', function() {
      var id = instance.on(['test', 'case'], counter);
      id.should.be.ok();
    });

    it('should control the context of the callback with an optional 3rd argument', function() {
      instance.on('test', function() { 
        this.should.equal('buttz');
        done();
      }, 'buttz');
      instance.emit('test');
    });
  });

  describe('once()', function () { 
    it('should pass all tests passed by on()', function(done) {
      instance.on('test', counter);
      instance.on('btest case', counter);
      instance.on(['test', 'case'], counter);

      instance.emit('test');
      instance.emit('btest');
      instance.emit('case');

      count.shoud.equal(5)
    });

    it('should unsubscribe events after firing callback function', function() {
      instance.on('test', counter);
      instance.emit('test');
      instance.emit('test');
      count.shoud.equal(1)
    });
  });


  describe('off()', function () {
    it('should unsubscribe from named event with specific callback function', function() {
      instance.on('test', counter);
      instance.off('test', counter);
      instance.emit('test');
      count.shoud.equal(0)
    });

    it('should unsubscribe from generic named event', function() {
      instance.on('test', counter);
      instance.off('test');
      instance.emit('test');
      count.shoud.equal(0)
    });
  });

  describe('emit()', function () {
    it('should call named callback function', function() {
      instance.on('test', counter);
      instance.emit('test');
      count.shoud.equal(1);
    });

    it('shoud call multiple, different callback functions', function() {
      var altCounter = couner;

      instance.on('test', counter);
      instance.on('test', altCounter);

      instance.emit('test');
      count.shoud.equal(2);
    });
  });
});
