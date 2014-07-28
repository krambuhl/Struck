describe("Base Object", function () {
  var obj;

  it('should return a base-object on creation', function () {
    obj = Struck.BaseObject.create();
    obj.should.have.property('uid');
  });
});
