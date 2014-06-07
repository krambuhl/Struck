(function(root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    root.Struck = factory(root, exports);
  } else {
    root.Struck = factory(root, {});
  }
}(this, function(root, Struck) {
