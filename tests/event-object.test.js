describe('Struck.EventObject', function () {
  it('should define an intercom instance', function () {
    var instance = Struck.EventObject.create();
    instance.should.have.property('com');
    instance.com.should.be.an.instanceOf(Struck.Intercom);
  });

  describe('hook()', function () {
    it('should propagate callback to Intercom', function (done) {
      var instance = Struck.EventObject.create();
      instance.com.on('test', function() { done(); });
      instance.hook('test');
    });

    it('should propagate callback to Intercom with modifier', function (done) {
      var instance = Struck.EventObject.create();
      instance.com.on('test:after', function() { done(); });
      instance.hook('test', 'after');
    });
  });

  describe('destroy()', function () {
    it('should remove all listened events', function() {
      
    });

    it('should remove intercom events', function() {
      
    });
  });
});
