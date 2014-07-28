describe("Base Object", function () {
  var obj;

  it('should return a base-object using .create() static method', function () {
    obj = Struck.BaseObject.create();
    obj.should.have.property('uid');
  });

  it('should purposely fail', function () {
    true.should.equal(false);
  });
});
