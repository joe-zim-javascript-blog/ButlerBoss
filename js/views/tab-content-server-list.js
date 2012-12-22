define(
	['app', 'marionette', 'views/tab-content-server-list-item', 'views/disconnected'],
	function(App, Marionette, ItemView, EmptyView) {

		var ServerListTabContentView = Marionette.CollectionView.extend({
			tagName: "ul",
			className: "thumbnails",
			itemView: ItemView,
			emptyView: EmptyView,
			renderEvents: ["reset", "add", "remove"],

			collectionEvents: {
				"all": "checkIfShouldRender"
			},

			checkIfShouldRender: function(event) {
				if (_.contains(this.renderEvents, event)) {
					this.render();
					console.log('ListView: Render');
				}
			}
		});

		return ServerListTabContentView;

	}
);