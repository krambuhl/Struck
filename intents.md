```javascript

var View = require('struct-view');

var AppView = View.extend({
	template: Templates.get('application')
	ui: {
		header: '#header',
		articles: '.article'
	},

	setup: function () {

	},

	cleanup: function () {

	}
});

var app = new AppView()


var ItemView = View.extend({
	ui: {
		link: '.link'
	},

	setup: function () {
		this.listenTo(this.ui.link, 'click', onLinkClick);

		this.listenTo(this.model, 'change', function (data, model) {
			this.ui.currentUserCount.text(data.usercount);
		});

		this.bindModel(this.model, 'name', this.ui.name);
		this.bindModel(this.model, 'name', this.ui.name, 'html');

		this.bindModel(this.model, 'time', function(time, model) {
			this.ui.time.text(new Date(time));
		}, this);

		this.bindModel(this.model, {name: 'Richard'}, this.ui.name);

		// might be better to use computed properties in this case?
		// would internalize this behavior to the model/data layer
		this.bindModel(this.model, ['startTime', 'endTime'], function (data, model) {
			this.ui.duration.text(new Date(data.endTime - data.startTime));
		});

	},

	cleanup: function () {
		this.ui.link.off();
	}
})

var aItem = new ItemView(
	model: new Model({
		usercount: 88,
		name: 'Richard',
		startTime: 'June 6, 2013',
		endTime: new Date(),
		duration: Struck.computed(function() {
			return +this.get('endTime')) - (+new Date(this.get('startTime')));
		}, ['startTime', 'endTime'])
	})
);


```
