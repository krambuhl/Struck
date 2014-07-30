describe('BaseObject', function () {
  var obj;

  it('should expose `extend` and `create` static methods', function () {
    Struck.BaseObject.should.have.property('extend');
    Struck.BaseObject.should.have.property('create');
  });

  describe('#extend()', function () {
    it('should return a new object definition', function () {
      var SubObject = Struck.BaseObject.extend();
      var instance = SubObject.create();

      SubObject.should.be.type('function');
      instance.should.be.an.instanceOf(Struck.BaseObject);
    });

    it('should extend `obj` into new definition', function () {
      var SubObject = Struck.BaseObject.extend({ type: "test", test: function () {} });
      var instance = SubObject.create();
      instance.should.have.property('type', 'test');
      instance.should.have.property('test');
      instance.test.should.be.a.Function;
    });
  });

  describe('#create()', function () {
    it('should return a instance on BaseObject', function () {
      obj = Struck.BaseObject.create();
      obj.should.be.an.instanceOf(Struck.BaseObject);
    });

    it('should extend `opts` into instance', function () {
      obj = Struck.BaseObject.create({ test: 'data' });
      obj.should.have.property('options');
      obj.options.should.have.property('test', 'data');
    });

    it('should call initialize method', function (done) {
      obj = Struck.BaseObject.extend({ initialize: function () {
        done();
      }});
      obj.create();
    });

    it('should assign a UID', function () {
      obj = Struck.BaseObject.create();
      obj.should.have.property('uid');
    });
  });
  //
  //
  // it('', function () {
  //
  // });

});
