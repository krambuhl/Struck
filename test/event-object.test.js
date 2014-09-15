describe('Struck.EventObject', function () {
  var instance;

  beforeEach(function() {
    instance = Struck.EventObject.create();
  });

  it('should define an intercom instance', function () {
    instance.should.have.property('com');
    instance.com.should.be.an.instanceOf(Struck.Intercom);
  });

  describe('hook()', function () {
    it('should propagate callback to Intercom', function (done) {
      instance.com.on('test', function() { done(); });
      instance.hook('test');
    });

    it('should propagate callback to Intercom with modifier', function (done) {
      instance.com.on('test:after', function() { done(); });
      instance.hook('test', 'after');
    });
  });
});
