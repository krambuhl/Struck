// ##EventObject

// `Struck.EventObject` normalizes an event API
// for adding event listeners and listening to
// objects externally.  Using the listen methods
// automates undelgating events of view removal.
Struck.EventObject = (function () {
  'use strict';

  var EventObject = Struck.BaseObject.extend();

  EventObject.prototype.initializeObject = function () {
    // all event objects need an intercom for
    // emiting and listening to events
    this.com = Struck.Intercom.create();

    // call super after defining com which
    // is used for base hooks
    Struck.BaseObject.prototype.initializeObject.apply(this, arguments);

    this._events = [];
  };

  // #####hook

  // trigger intercom events for hook
  EventObject.prototype.hook = function (name, mod, args) {
    var postfix = '';
    
    if (mod !== undefined && mod !== 'on') {
      postfix = ':' + mod;
    }

    Struck.BaseObject.prototype.hook.apply(this, arguments);
    this.com.emit.apply(this.com, [name + postfix].concat(args));
  };

  // #####listenTo

  // Registers a event listener to the
  // appropriate subsystem. Delegates jquery
  // objects to the jq event system and struck
  // objects to the instance's intercom
  // we then keep a secondary object of events
  // to remove when the object is deconstructed
  EventObject.prototype.listenTo = function (obj, events, func, context) {
    var opts = _.chain(arguments).rest(4).first().value();

    addListener(this, { 
      obj: obj,
      events: events,
      func: func,
      single: firstDef(opts && opts.single, false), 
      context: firstDef(context, this) 
    });

    return this;
  };

  // #####listenOnce
  EventObject.prototype.listenOnce = function (obj, events, func, context) {
    return this.listenTo(obj, events, func, firstDef(context, this), { single: true });
  };

  // #####stopListening
  // removes an event listener from the
  // appropriate subsystem
  EventObject.prototype.stopListening = function (obj, events, func) {
    removeListener(this, obj, events, func);
    return this;
  };

  EventObject.prototype.trigger = function(events) {
    this.com.emit.apply(this.com, [events].concat(_.rest(arguments, 1)));
    return this;
  };

  // #####destroy
  // when an object is removed, the destroy function
  // should be called to remove attached event listeners
  EventObject.prototype.destroy = function () {   
    Struck.BaseObject.prototype.destroy.apply(this, arguments);

    // remove all event listeners listeners
    this.stopListening();

    _.defer(function(self) { 
      // destroy com interface
      self.com.destroy();
    }, this);

    return this;
  };
  
  
  function addListener(self, opts) {
    var obj = opts.obj,
      events = splitName(opts.events),
      func = opts.func;

    var callback = !opts.single ? func : function() {
      func.apply(this, arguments);
      removeListener(self, obj, opts.events, callback);
    };

    _.each(events, function(ev) {
      self._events.push({
        events: ev,
        func: callback,
        obj: obj
      });

      if (obj instanceof jQuery) {
        obj[opts.single ? 'one' : 'on'](ev, callback);
      } else if (obj instanceof Struck.EventObject) {
        obj.com[opts.single ? 'once' : 'on'].call(obj.com, ev, callback, opts.context);
      }
    });
  }

  function removeListener(self, obj, events, func) {
    events = splitName(events);

    var rejects = [],
      passes = [];

    function pushResults(rejected, ev) {
      if (rejected) { 
        rejects.push(ev);
      } else { 
        passes.push(ev);
      }
    }

    _.each(self._events, function(ev) {
      _.each(events, function(name) {
        if (func) {
          pushResults(ev.obj === obj && ev.events === name && ev.func === func, ev);
        } else if (events) {
          pushResults(ev.obj === obj && ev.events === name, ev);
        }
      });
    });

    if (!events && !func && obj) {
      _.each(self._events, function(ev) {
        pushResults(ev.obj === obj, ev);
      });
    } else if (!events) { 
      rejects = self._events; 
    }

    self._events = passes;

    _.each(rejects, function(reject) {
      if (reject.obj instanceof jQuery) {
        reject.obj.off(reject.events, reject.func);
      } else if (reject.obj instanceof Struck.EventObject) {
        reject.obj.com.off(reject.events, rejects.func);
      }
    });
  }



  return EventObject;
})();
