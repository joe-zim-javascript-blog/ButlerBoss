define(
	['marionette', 'tpl!templates/tab.tpl'],
	function(Marionette, template) {

		var TabView = Marionette.ItemView.extend({
			tagName: 'li',
			template: template,

			attributes: function() {
				return {
					"data-view-name": "TabView-" + this.cid
				};
			},

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