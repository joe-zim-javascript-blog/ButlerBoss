define(
	['app', 'marionette', 'jquery', 'tpl!templates/layout-main.tpl'],
	function(App, Marionette, $, template) {

		var MainLayout =  Marionette.Layout.extend({
			template: template,
			id: "App-El-MainLayout",

			regions: {
				main: "#App-Main",
				footer: "#App-Footer"
			}
		});

		App.addInitializer(function(options) {
			App.layout = new MainLayout();
			App.layout.render();

			$(options.mainContainer).empty().append(App.layout.el);
		});

		return MainLayout;

	}
);