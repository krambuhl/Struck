describe('Base Object', function () {
  var obj;

  it('should return a instance using .create() static method', function () {
    obj = Struck.BaseObject.create();
    obj.should.be.an.instanceOf(Struck.BaseObject);
  });

  it('should return new object definition using .extend() static method', function () {
    var SubObject = Struck.BaseObject.extend();
    var instance = SubObject.create();
    instance.should.be.an.instanceOf(Struck.BaseObject);
  });

  it('should extend `obj` into definition using .extend(obj) static method', function () {
    var SubObject = Struck.BaseObject.extend({ type: "test", test: function () {} });
    var instance = SubObject.create();
    instance.should.have.property('type', 'test');
    instance.should.have.property('test');
    instance.test.should.be.a.Function;
  });

  it('should be assigned a UID', function () {
    obj = Struck.BaseObject.create();
    obj.should.have.property('uid');
  });

  it('should extend constructor options to instance', function () {
    obj = Struck.BaseObject.create({ test: 'data' });
    obj.should.have.property('options');
    obj.options.should.have.property('test', 'data');
  });
});
