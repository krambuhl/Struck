describe.skip('Struck.EventObject [jQuery]', function () {
  describe('listenTo()', function () {
    it('should listen to jQuery events', function(done) {
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'click', done);
        }
      });
      
      testinstance.trigger('click');
    });

    it('should split event string by space and delegate multiple events', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'click hover', counter);
        }
      });
      
      testinstance.trigger('click').trigger('hover');
    });

    it('should accept events as an array of strings', function(done) {
      var count = 0;
      var counter = function() { if (++count == 2) done(); }
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, ['click', 'hover'], counter);
        }
      });
      
      testinstance.trigger('click').trigger('hover');
    });

    it('should accept events as a function returning a string or array', function(done) {
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, function() {
            return 'click';
          }, done);
        }
      });
      
      testinstance.trigger('click');
    });
  });
  
  describe('listenOnce()', function () { 
    it('should listen to jquery object events', function(done) {
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'click', done);
        }
      });
      
      testinstance.trigger('click');
    });

    it('should unsubscribe from jquery object events after event fires', function(done) {
      var testinstance = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(testinstance, 'click', done);
        }
      });
      
      testinstance.trigger('click').trigger('click');

    });
  });

  describe('stopListening()', function () { 
    it('should unsubscribe specific callback from jQuery object', function(done) {
      var jquerytest = $('#box');
      var instance = Struck.EventObject.create({
        initialize: function() {
          this.listenTo(jquerytest, 'click hover', done);
          this.stopListening(jquerytest, 'hover', done);
        }
      });
      
      jquerytest.trigger('click').trigger('hover');
    });

    it('should unsubscribe multiple events from jQuery object', function() {

    });

    it('should unsubscribe all events from jQuery object if no args are provided', function() {

    });
  });

  describe('stopListeningAll()', function () {
    it('should unsubscribe all listened jQuery events from EventObject', function() {
      
    });
  });
});
