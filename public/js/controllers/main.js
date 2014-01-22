define(
	['app', 'marionette', 'underscore', 'models/minecraft-servers', 'views/layout-main', 'utils/tab-manager'],
	function(App, Marionette, _, MinecraftServers, MainLayout, TabManager) {

		var MainController = Marionette.Controller.extend({

			initialize: function(options) {
				this.options = options || {};
				this.vent = this.options.vent;

				App.servers = new MinecraftServers();
				App.servers.reset(App.config.data.minecraftServers);

				App.layout = new MainLayout({el:"body"});
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