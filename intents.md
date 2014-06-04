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

	dataBind: function () {
		// bind data to the UI for live data refreshing
		// if function is defined, run that function
		// if string is defined, run named method on
		// jquery element
		//
		// this.model.bind(key, element, func/funcName);

		this.model.bind("name", this.ui.name); // default function is text
		this.model.bind("name", this.ui.name, "html"); // ==> this.ui.name.html(this.model.get("name"))  
		this.model.bind("name", this.ui.name, "html"); // ==> this.ui.name.html(this.model.get("name"))

		this.model.bind("time", this.ui.time, function(el, data) {
			this.ui.time.text(new Data(data));
		})
	}

	setup: function () {
		this.ui.link.on('click', onLinkClick);
	},

	cleanup: function () {
		this.ui.link.off();
	}
})


```
