define(
	['marionette'],
	function(Marionette) {

		var TabContentView = Marionette.ItemView.extend({
			tagName: 'div',
			className: 'tab-content',
			id: function() {
				return this.cid;
			},

			initialize: function(options) {
				if (options && options.name) {
					this.id = options.name;
					this.$el.attr('id', this.id);
				}
			}
		});

		return TabContentView;

	}
);