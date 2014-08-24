describe.skip('Struck.EventObject [Intercom]', function () {
  var count = 0;
  var counter = function() { count++; }
  var instance;

  beforeEach(function() {
    count = 0;
    instance = Struck.EventObject.create();
  });

  describe('listenTo()', function () {
    it('should listen to EventObject `com` events', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get', done);
        }
      });
      
      instance.get('uid');
    });

    it('should split event string by space and delegate multiple events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set', counter);
        }
      });
      
      instance.get('uid');
      instance.set('test', 'test');
      count.should.equal(2);
    });

    it('should accept events as an array of strings', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, ['get', 'set'], counter);
        }
      });
      
      instance.get('uid');
      instance.set('test', 'test');
      count.should.equal(2);
    });

    it('should accept events as a function returning a string or array', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, function() {
            return 'set';
          }, done);
        }
      });

      instance.set('test', 'test');
    });
  });
  
  describe('listenOnce()', function () {
    it('should listen to EventObject `com` events', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(instance, 'get', done);
        }
      });
      
      instance.get('uid');
    });

    it('should unsubscribe from EventObject `com` events after event fires', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(instance, 'get', done);
        }
      });
      
      instance.get('uid');
      instance.get('uid');
    });
  });

  describe('stopListening()', function () { 
    it('should unsubscribe specific callback from EventObject `com` object', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set', done);
          this.stopListening(instance, 'get', done);
        }
      });
      
      instance.get('uid');
      instance.set('butz', '2butz');
    });

    it('should unsubscribe multiple events from EventObject `com` object', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set buttz', done);
          this.stopListening(instance, 'get set');
        }
      });
      
      instance.get('uid');
      instance.set('butz', '2butz');
      instance.com.trigger('buttz');
    });

    it('should unsubscribe all events from EventObject `com` object if no args are provided', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set', counter);
          this.stopListening(instance);
        }
      });
      
      instance.get('uid');
      instance.set('butz', '2butz');
      count.should.equal(0);
    });
  });

  describe('stopListeningAll()', function () {
    it('should unsubscribe all listened EventObject `com` object events from instance', function() {
      instance.com.on('test', counter);
      instance.com.stopListeningAll();

      instance.hook('test');
      count.should.equal(0);
    });
  });

  describe('destroy()', function () {
    it('should remove all listened events', function() {
      instance.com.on('test', counter);
      instance.destroy();

      instance.hook('test');
      count.should.equal(0);
    });
  });
});
