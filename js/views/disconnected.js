define(
	['app', 'marionette', 'tpl!templates/disconnected.tpl'],
	function(App, Marionette, template) {

		var DefaultView = Marionette.ItemView.extend({
			tagName: "li",
			className: "span8",
			template: template
		});

		return DefaultView;

	}
);