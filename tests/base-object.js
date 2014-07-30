describe('BaseObject', function () {
  it('should expose `extend` and `create` static methods', function () {
    Struck.BaseObject.should.have.property('extend');
    Struck.BaseObject.should.have.property('create');
  });

  describe('BaseObject.extend()', function () {
    it('should return a new object definition', function () {
      var SubObject = Struck.BaseObject.extend();
      var instance = SubObject.create();

      SubObject.should.be.type('function');
      instance.should.be.an.instanceOf(Struck.BaseObject);
    });

    it('should extend `obj` into new definition, overwriting properties', function () {
      var SubObject = Struck.BaseObject.extend({ type: "test", test: function () {} });
      var instance = SubObject.create();
      instance.should.have.property('type', 'test');
      instance.should.have.property('test');
      instance.test.should.be.a.Function;
    });
  });

  describe('BaseObject.create()', function () {
    it('should return a instance on BaseObject', function () {
      var obj = Struck.BaseObject.create();
      obj.should.be.an.instanceOf(Struck.BaseObject);
    });

    it('should extend `opts` into instance', function () {
      var obj = Struck.BaseObject.create({ test: 'data' });
      obj.should.have.property('options');
      obj.options.should.have.property('test', 'data');
    });

    it('should call initialize method', function (done) {
      var obj = Struck.BaseObject.extend({ initialize: function () {
        done();
      }});
      obj.create();
    });

    it('should assign a unique id', function () {
      var obj = Struck.BaseObject.create();
      obj.should.have.property('uid');
    });
  });

  describe('hook()', function () {
    it('should call object callback method for name argument', function (done) {
      var obj = Struck.BaseObject.extend({
        onLoad: function () {
          done();
        }
      });

      var instance = obj.create();
      instance.hook('load');
    });

    it('should call object callback method for name argument and prefix with modifier', function (done) {
      var obj = Struck.BaseObject.extend({
        beforeLoad: function () {
          done();
        }
      });

      var instance = obj.create();
      instance.hook('load', 'before');
    });
  });


});
