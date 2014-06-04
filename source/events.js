// mixin object for jquery event api
// code from http://james.padolsey.com/javascript/jquery-eventemitter/
Struck.events = (function(jQuery) {
  var jq;
  function init(self) { jq = jQuery(self); }

  return {
    trigger: function(evt, data) {
      !jq && init(this);
      jq.trigger(evt, data);
    },

    once: function(evt, handler) {
      !jq && init(this);
      jq.one(evt, handler);
    },

    on: function(evt, handler) {
      !jq && init(this);
      jq.bind(evt, handler);
    },

    off: function(evt, handler) {
      !jq && init(this);
      jq.unbind(evt, handler);
    }
  };
}(jQuery));
