describe('Struck.EventObject', function () {
  it('should define an intercom instance', function () {
    var instance = Struck.EventObject.create();
    instance.should.have.property('com');
    instance.com.should.be.an.instanceOf(Struck.Intercom);
  });

  describe('hook()', function () {
    it('should propegate callback to Intercom', function (done) {
      var instance = Struck.EventObject.create();
      instance.com.on('test', function () { done(); });
      instance.hook('test');
    });

    it('should propegate callback to Intercom with modifier', function (done) {
      var instance = Struck.EventObject.create();
      instance.com.on('test:after', function () { done(); });
      instance.hook('test', 'after');
    });
  });

  describe('listenTo()', function () { });
  describe('listenOnce()', function () { });
  describe('stopListening()', function () { });
  describe('stopListeningAll()', function () { });
  describe('destroy()', function () { });
});
