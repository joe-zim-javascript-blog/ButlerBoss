define(
	['marionette', 'underscore', 'models/servers', 'utils/tab-manager'],
	function(Marionette, _, Servers, TabManager) {

		var MainController = Marionette.Controller.extend({

			initialize: function(options) {
				this.options = options || {};

				this.options.mainContainer = this.options.mainContainer || "[data-view-binding=layout]";
				this.vent = this.options.vent;

				this.initializeData();
			},

			initializeData: function() {
				if ( this.options.minecraftServerData ) {
					App.servers = new Servers(this.options.minecraftServerData);
				}
				else {
					App.servers = new Servers();
					App.servers.fetch();
				}
			},

			index: function() {
				this.tabManager = new TabManager(this.options);
				App.main.show(this.tabManager.view);
			}

		});

		return MainController;

	}
);