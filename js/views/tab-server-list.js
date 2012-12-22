define(
	['app', 'marionette', 'tpl!templates/tab-list.tpl'],
	function(App, Marionette, template) {

		var ServerListTabView = Marionette.ItemView.extend({
			template: template
		});

		return ServerListTabView;

	}
);