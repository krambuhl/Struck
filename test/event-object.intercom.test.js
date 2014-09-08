describe('Struck.EventObject [Intercom]', function () {
  var count = 0;
  var counter = function() { count++; };
  var instance;

  beforeEach(function() {
    count = 0;
    instance = Struck.EventObject.create();
  });

  describe('listenTo()', function () {
    it('should listen to EventObject `com` events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get', counter);
        }
      });
      
      instance.get('uid');
      count.should.equal(1);
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

    it('should accept events as an array of strings', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, ['get', 'set'], counter);
        }
      });
      
      instance.get('uid');
      instance.set('test', 'test');
      count.should.equal(2);
    });

    it('should accept events as a function returning a string or array', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, function() {
            return 'set';
          }, counter);
        }
      });

      instance.set('test', 'test');
      count.should.equal(1);
    });
  });
  
  describe('listenOnce()', function () {
    it('should listen to EventObject `com` events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(instance, 'get', counter);
        }
      });
      
      instance.get('uid');
      count.should.equal(1);
    });

    it('should unsubscribe from EventObject `com` events after event fires', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(instance, 'get', counter);
        }
      });
      
      instance.get('uid');
      instance.get('uid');
      count.should.equal(1);
    });
  });

  describe('stopListening()', function () { 
    it('should unsubscribe specific callback from EventObject `com` object', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get', counter);
          this.stopListening(instance, 'get', counter);
        }
      });
      
      instance.get('uid');
      count.should.equal(0);
    });

    it('should unsubscribe multiple events from EventObject `com` object', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set buttz', counter);
          this.stopListening(instance, 'get set');
        }
      });
      
      instance.get('uid');
      instance.set('butz', '2butz');
      instance.com.emit('buttz');
      count.should.equal(1);
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

    it('should unsubscribe all events if no args are provided', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set', counter);
          this.stopListening();
        }
      });
      
      instance.get('uid');
      instance.set('butz', '2butz');
      count.should.equal(0);
    });
  });

  describe('trigger()', function() {
    it('should send data to callback function', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'test', function(data) {
            data.should.equal('data');
            done();
          });
        }
      });

      instance.trigger('test', 'data');
    });

    it('should send multiple data arguments to callback function', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'test', function(data, data2) {
            data.should.equal('data');
            data2 .should.equal('data');
            done();
          });
        }
      });

      instance.trigger('test', 'data', 'data');
    });
  });

  describe('destroy()', function () {
    it('should remove all listened events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'get set', counter);
          this.destroy();
        }
      });

      instance.hook('get set');
      count.should.equal(0);
    });
  });
});
