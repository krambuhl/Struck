 describe.skip('Struck.EventObject [jQuery]', function () {
  var count = 0;
  var counter = function() { count++; }
  var instance;

  beforeEach(function() {
    count = 0;
    instance = $('#box');
  });

  describe('listenTo()', function () {
    it('should listen to jQuery events', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click', done);
        }
      });

      instance.trigger('click');
    });

    it('should split event string by space and delegate multiple events', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', counter);
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(2);
    });

    it('should accept events as an array of strings', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, ['click', 'hover'], counter);
        }
      });
      
      instance.trigger('click').trigger('hover');
      count.should.equal(2);
    });

    it('should accept events as a function returning a string or array', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, function() {
            return 'click';
          }, done);
        }
      });
      
      instance.trigger('click');
    });
  });
  
  describe('listenOnce()', function () { 
    it('should listen to jquery object events', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click', done);
        }
      });
      
      instance.trigger('click');
    });

    it('should unsubscribe from jquery object events after event fires', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click', done);
        }
      });
      
      instance.trigger('click').trigger('click');
    });
  });

  describe('stopListening()', function () { 
    it('should unsubscribe specific callback from jQuery object', function(done) {
      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click hover', done);
          this.stopListening(instance, 'hover', done);
        }
      });
      
      instance.trigger('click').trigger('hover');
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
  });

  describe('stopListeningAll()', function () {
    it('should unsubscribe all listened jQuery events from EventObject', function() {
      var instance2 = $('html');

      Struck.EventObject.create({
        initialize: function() {
          this.listenTo(instance, 'click', counter);
          this.listenTo(instance2, 'click', counter);
          this.stopListeningAll();
        }
      });
      
      instance.trigger('click');
      instance2.trigger('click');
      count.should.equal(0);
    });
  });
});
