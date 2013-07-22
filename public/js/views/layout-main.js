define(
	['app', 'marionette', 'jquery', 'tpl!templates/layout-main.tpl'],
	function(App, Marionette, $, template) {

		var MainLayout = Marionette.Layout.extend({
			template: template,
			attributes: function() {
				return {
					"data-view-name": "MainLayout-" + this.cid
				};
			},

			regions: {
				main: "#App-Main",
				footer: "#App-Footer"
			}
		});

		return MainLayout;

	}
);