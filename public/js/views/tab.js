define(
	['marionette', 'tpl!templates/tab.tpl'],
	function(Marionette, template) {

		var activeClass = 'active';

		var TabView = Marionette.ItemView.extend({
			tagName: 'li',
			template: template,

			templateHelpers: function() {
				var tabTitle = this.tabTitle;
				var tabContentId = this.tabContentId;

				return {
					tabTitle: function() {
						return tabTitle; // User Viewable text on the tab
					},

					tabContentId: function() {
						return tabContentId; // ID of the tab content that this tab reveals
					}
				};
			},

			initialize: function(options) {
				this.tabTitle = options.tabTitle;
				this.tabContentId = options.tabContentId;
			},

			activate: function() {
				this.$el.addClass(activeClass);
			},

			deactivate: function() {
				this.$el.removeClass(activeClass);
			}
		});

		return TabView;

	}
);