define(
	['app', 'marionette', 'tpl!templates/tab-content-list-item.tpl'],
	function(App, Marionette, template) {

		var ServerListItemView = Marionette.ItemView.extend({
			template: template,
			tagName: "li",
			className: "span4"
		});

		return ServerListItemView;

	}
);