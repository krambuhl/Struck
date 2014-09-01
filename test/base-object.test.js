describe('Struck.BaseObject', function () {


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
      var SubObject = Struck.BaseObject.extend({ type: 'test', test: function () {} });
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

  describe('get()', function () {
    it('should return value of object property if arg is string/number', function() {
      var instance = Struck.BaseObject.create();
      instance.get('uid').should.be.equal(instance.uid);
    });

    it('should return object of properties if arg is an array', function() {
      var instance = Struck.BaseObject.create();
      instance.get(['uid', 'buttz']).should.be.eql({
        uid: instance.uid,
        buttz: undefined
      });
    });

    it('should return object of properties if mutliple arguments are defined', function() {
      var instance = Struck.BaseObject.create();
      instance.get('uid', 'buttz').should.be.eql({
        uid: instance.uid,
        buttz: undefined
      });
    });
  });

  describe('set()', function () {
    it('should set value of object property if args are key/value pair', function() {
      var instance = Struck.BaseObject.create();
      instance.set('test-prop', 'test');
      instance.get('test-prop').should.be.equal('test');
    });

    it('should set multiple object property values if arg is an object', function() {
      var instance = Struck.BaseObject.create();
      var val = { 'test1': 'test', 'test2': 'test' };
      instance.set(val);
      instance.get(['test1', 'test2']).should.be.eql(val);
    });
  });

});
