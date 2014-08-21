describe('Struck.EventObject', function () {
  var count, counter = function() { count++; }
  var evtobj, jqobj;

  beforeEach(function() {
    count = 0;
    evtobj = Struck.EventObject.create();
  });

  it('should define an intercom instance', function () {
    evtobj.should.have.property('com');
    evtobj.com.should.be.an.instanceOf(Struck.Intercom);
  });

  describe('hook()', function () {
    it('should propagate callback to Intercom', function (done) {
      evtobj.com.on('test', function() { done(); });
      evtobj.hook('test');
    });

    it('should propagate callback to Intercom with modifier', function (done) {
      evtobj.com.on('test:after', function() { done(); });
      evtobj.hook('test', 'after');
    });
  });

  describe('destroy()', function () {
    it('should remove intercom events before being destroyed', function() {
      evtobj.com.on('test', counter);
      evtobj.hook('test');
      evtobj.destroy();
      (evtobj.com === undefined).should.equal(true);
    });
  });
});
