describe('Struck.EventObject [Intercom]', function () {
  var count = 0;
  var counter = function() { count++; }
  var eoinstance, jqinstance;

  beforeEach(function() {
    count = 0;
    eoinstance = Struck.EventObject.create();
    jqinstance = $('#box');
  });

  describe('listenTo()', function () {
    it('should listen to EventObject `com` events', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(eoinstance, 'get', done);
        }
      });
      
      eoinstance.get('uid');
    });

    it('should split event string by space and delegate multiple events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(eoinstance, 'get set', counter);
        }
      });
      
      eoinstance.get('uid');
      eoinstance.set('test', 'test');
      count.should.equal(2);
    });

    it('should accept events as an array of strings', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, ['get', 'set'], counter);
        }
      });
      
      testinstance.get('uid');
      testinstance.set('test', 'test');
    });

    it('should accept events as a function returning a string or array', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, function() {
            return 'set';
          }, counter);
        }
      });
      
      testinstance.set('test', 'test');
    });
  });
  
  describe('listenOnce()', function () {
    it('should listen to EventObject `com` events', function(done) {
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(testinstance, 'get', done);
        }
      });
      
      testinstance.get('uid');
    });

    it('should unsubscribe from EventObject `com` events after event fires', function(done) {
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(testinstance, 'get', done);
        }
      });
      
      testinstance.get('uid');
      testinstance.get('uid');
    });
  });

  describe('stopListening()', function () { 
    it('should unsubscribe specific callback from EventObject `com` object', function(done) {
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'get set', done);
          this.stopListening(testinstance, 'get', done);
        }
      });
      
      testinstance.get('uid');
      testinstance.set('butz', '2butz');
    });

    it('should unsubscribe multiple events from EventObject `com` object', function() {
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'get set buttz', done);
          this.stopListening(testinstance, 'get set');
        }
      });
      
      testinstance.get('uid');
      testinstance.set('butz', '2butz');
      testinstance.com.trigger('buttz');
    });

    it('should unsubscribe all events from EventObject `com` object if no args are provided', function() {
      var count = 0;
      var counter = function() { count++; }

      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'get set', counter);
          this.stopListening(testinstance);
        }
      });
      
      testinstance.get('uid');
      testinstance.set('butz', '2butz');

      count.should.equal(0);
    });
  });

  describe('stopListeningAll()', function () {
    it('should unsubscribe all listened EventObject `com` object events from instance', function() {
      
    });
  });
});
