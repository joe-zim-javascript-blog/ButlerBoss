define(
	['app', 'marionette', 'jquery', 'tpl!templates/layout-main.tpl'],
	function(App, Marionette, $, template) {

		var MainLayout =  Marionette.Layout.extend({
			template: template,

			regions: {
				listTab: "#ListTab",
				runningTab: "#RunningTab",
				listTabContent: "#ListTabContent",
				runningTabContent: "#RunningTabContent"
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