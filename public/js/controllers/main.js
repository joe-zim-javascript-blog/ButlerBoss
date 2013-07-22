define(
	['marionette', 'underscore', 'models/servers', 'views/layout-main', 'utils/tab-manager'],
	function(Marionette, _, Servers, Layout, TabManager) {

		var MainController = Marionette.Controller.extend({

			initialize: function(options) {
				this.options = options || {};

				this.options.mainContainer = this.options.mainContainer || "[data-view-binding=layout]";
				this.vent = this.options.vent;

				this.initializeData();
				this.initializeLayout();
			},

			initializeData: function() {
				App.servers = new Servers();
				App.servers.fetch();
			},

			initializeLayout: function() {
				// The layout attaches to the existing DOM
				App.layout = new Layout({el: this.options.mainContainer});
				App.layout.render();
			},

			index: function() {
				this.tabManager = new TabManager(this.options);
				App.layout.main.show(this.tabManager.view);
			}

		});

		return MainController;

	}
);