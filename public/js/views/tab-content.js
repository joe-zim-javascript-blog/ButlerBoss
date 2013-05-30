define(
	['marionette'],
	function(Marionette) {

		var TabContentView = Marionette.ItemView.extend({
			tagName: 'div',
			className: 'tab-content'
		});

		return TabContentView;

	}
);