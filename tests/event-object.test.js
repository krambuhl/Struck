describe('Struck.EventObject', function () {
  it('should define an intercom instance', function () {
    var instance = Struck.EventObject.create();
    instance.should.have.property('com');
    instance.com.should.be.an.instanceOf(Struck.Intercom);
  });

  describe('hook()', function () {
    it('should propagate callback to Intercom', function (done) {
      var instance = Struck.EventObject.create();
      instance.com.on('test', function () { done(); });
      instance.hook('test');
    });

    it('should propagate callback to Intercom with modifier', function (done) {
      var instance = Struck.EventObject.create();
      instance.com.on('test:after', function () { done(); });
      instance.hook('test', 'after');
    });
  });

  describe('listenTo() [EventObject]', function () {
    it('should listen to EventObject `com` events', function(done) {
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'get', done);
        }
      });
      
      testinstance.get('uid');
    });

    it('should split event string by space and delegate multiple events', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = Struck.EventObject.create();
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'get set', counter);
        }
      });
      
      testinstance.get('uid');
      testinstance.set('test', 'test');
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

  describe('listenTo() [jQuery]', function () {
    it('should listen to jQuery events', function(done) {
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'click', done);
        }
      });
      
      testinstance.trigger('click')
    });

    it('should split event string by space and delegate multiple events', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'click hover', counter);
        }
      });
      
      testinstance.trigger('click').trigger('hover');
    });

    it('should accept events as an array of strings', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, ['click', 'hover'], counter);
        }
      });
      
      testinstance.trigger('click').trigger('hover');
    });

    it('should accept events as a function returning a string or array', function(done) {
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, function() {
            return 'click';
          }, done);
        }
      });
      
      testinstance.trigger('click');
    });
  });
  
  describe('listenOnce()', function () { 
    it('should listen to jquery object events', function() {
      
    });

    it('should unsubscribe from jquery object events after event fires', function() {

    });
    
    it('should listen to EventObject `com` events', function() {
      
    });

    it('should unsubscribe from EventObject `com` events after event fires', function() {

    });
  });

  describe('stopListening()', function () { });
  describe('stopListeningAll()', function () { });
  describe('destroy()', function () { });
});
