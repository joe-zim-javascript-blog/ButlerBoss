define(
	['app', 'marionette', 'jquery', 'tpl!templates/layout-main.tpl'],
	function(App, Marionette, $, template) {

		var MainLayout = Marionette.Layout.extend({
			template: template,
			id: function() {
				return "App-" + this.cid + "-MainLayout";
			},

			regions: {
				main: "#App-Main",
				footer: "#App-Footer"
			}
		});

		return MainLayout;

	}
);