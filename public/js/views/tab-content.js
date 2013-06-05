define(
	['marionette', 'tpl!templates/tab-content.tpl'],
	function(Marionette, template) {

		var activeClass = "active";

		var TabContentView = Marionette.ItemView.extend({
			tagName: 'div',
			className: 'tab-pane',

			activate: function() {
				this.$el.addClass(activeClass);
			},

			deactivate: function() {
				this.$el.removeClass(activeClass);
			}
		});

		return TabContentView;

	}
);