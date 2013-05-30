define(
	['marionette'],
	function(Marionette) {

		var TabContentCollectionView = Marionette.CollectionView.extend({
			tagName: 'div',
			className: 'tab-content'
		});

		return TabContentCollectionView;

	}
);