describe('Struck.Intercom', function () {
  it('should define a default subscription object', function () {
    var instance = Struck.Intercom.create();
    instance.should.have.property('defaultSubscription');
  });

  it('should define a default collection of subscriptions', function () {
    var instance = Struck.Intercom.create();
    instance.should.have.property('subscriptions');
  });

  describe('on()', function () { });
  describe('once()', function () { });
  describe('off()', function () { });
  describe('emit()', function () { });
});
