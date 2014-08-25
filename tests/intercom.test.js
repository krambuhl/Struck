describe('Struck.Intercom', function () {
  it('should define a default subscription object', function () {
    var instance = Struck.Intercom.create();
    instance.should.have.property('defaultSubscription');
  });

  it('should define a default collection of subscriptions', function () {
    var instance = Struck.Intercom.create();
    instance.should.have.property('subscriptions');
  });

  describe.skip('on()', function () {
    it('should subscribe to named event via argument', function() {
      
    });

    it('should subscribe to multiple events with a space split string', function() {
      
    });

    it('should subscribe to multiple events with an array of event strings', function() {
      
    });

    it('should return an unique id for referencing event later', function() {

    });

    it('should control the context of the callback with an optional 3rd argument', function() {

    });
  });

  describe.skip('once()', function () { 
    it('should pass all tests passed by on()', function() {

    });

    it('should unsubscribe events after fire callback function', function() {

    });
  });


  describe.skip('off()', function () { });
  describe.skip('emit()', function () { });
});
