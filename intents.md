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
		this.ui.link.on('click', onLinkClick);
	},

	cleanup: function () {
		this.ui.link.off();
	}
})


```
