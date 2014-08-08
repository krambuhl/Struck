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

  describe('listenTo()', function () {
    it('should split event string by space and delegate multiple events', function() {
      
    });

    it('should accept events as an array of strings', function() {
      
    });

    it('should accept events as a function returning a string or array', function() {
      
    });

    it('should listen to jquery object events', function() {

    });

    it('should listen to EventObject `com` events', function() {

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
