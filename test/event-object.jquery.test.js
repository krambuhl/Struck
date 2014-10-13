describe('Struck.EventObject [jQuery]', function () {
  var count = 0;
  var counter = function() { count++; };
  var instance;

  beforeEach(function() {
    count = 0;
    instance = $('body');
  });

  afterEach(function() {
    instance.off();
  });

  describe('listenTo()', function () {
    it('should listen to jQuery events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click', counter);
        }
      });

      instance.trigger('click');
      count.should.equal(1);
    });

    it('should split event string by space and delegate multiple events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', counter);
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(2);
    });

    it('should accept events as an array of strings', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, ['click', 'hover'], counter);
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(2);
    });

    it('should accept events as a function returning a string or array', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, function() {
            return 'click';
          }, counter);
        }
      });
      
      instance.trigger('click');
      count.should.equal(1);
    });

    it('should exec callback with object as function context', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          var evobj = this;
          this.listenTo(instance, 'click', function() {
            this.should.equal(evobj);
            done();
          });
        }
      });

      instance.trigger('click');
    });
  });
  
  describe('listenOnce()', function () { 
    it('should listen to jquery object events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(instance, 'click', counter);
        }
      });
      
      instance.trigger('click');
      count.should.equal(1);
    });

    it('should unsubscribe from jquery object events after event fires', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenOnce(instance, 'click', counter);
        }
      });
      
      instance.trigger('click').trigger('click');
      count.should.equal(1);
    });
  });

  describe('stopListening()', function () { 
    it('should unsubscribe specific callback from jQuery object', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', counter);
          this.stopListening(instance, 'hover', counter);
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(1);
    });

    it('should unsubscribe multiple events from jQuery object', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover resize', counter);
          this.stopListening(instance, 'click hover');
        }
      });
      
      instance.trigger('click').trigger('hover').trigger('resize');
      count.should.equal(1);
    });

    it('should unsubscribe all events from jQuery object if no args are provided', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', counter);
          this.stopListening(instance);
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(0);
    });

    it('should unsubscribe all events if no args are provided', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', counter);
          this.stopListening();
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(0);
    });
  });

  describe('destroy()', function () {
    it('should remove all listened events', function() {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', counter);
          this.destroy();
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(0);
    });
  });
});
