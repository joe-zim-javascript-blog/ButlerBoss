define(
	['marionette'],
	function(Marionette) {

		var activeClass = "active";

		var TabContentCollectionView = Marionette.CollectionView.extend({
			tagName: 'div',
			className: 'tab-content',

			activate: function() {
				this.$el.addClass(activeClass);
			},

			deactivate: function() {
				this.$el.removeClass(activeClass);
			}
		});

		return TabContentCollectionView;

	}
);