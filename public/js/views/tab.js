define(
	['marionette', 'tpl!templates/tab.tpl'],
	function(Marionette, template) {

		var TabView = Marionette.ItemView.extend({
			tagName: 'li',
			template: template,

			serializeData: function() {
				return {
					tabTitle: this.options.tabTitle,
					tabContentId: this.options.tabContentId
				};
			}
		});

		return TabView;

	}
);