define(
	['marionette', 'tpl!templates/tab.tpl'],
	function(Marionette, template) {

		var TabView = Marionette.ItemView.extend({
			tagName: 'li',

			template: template
		});

		console.log(TabView);

		return TabView;

	}
);