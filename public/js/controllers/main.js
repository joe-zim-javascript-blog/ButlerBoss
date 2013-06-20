define(
	['marionette', 'jquery', 'models/servers', 'views/layout-main', 'utils/tab-manager'],
	function(Marionette, $, Servers, Layout, TabManager) {

		var MainController = Marionette.Controller.extend({

			initialize: function(options) {
				this.options = options || {};

				this.options.mainContainer = this.options.mainContainer || "#App-Container";
				this.$el = $(this.options.mainContainer);
				this.vent = this.options.vent;

				this.initializeData();
				this.initializeLayout();
			},

			initializeData: function() {
				App.servers = new Servers();
				App.servers.fetch();
			},

			initializeLayout: function() {
				App.layout = new Layout(this.options);
				App.layout.render();

				this.$el.empty().append(App.layout.el);
			},

			index: function() {
				this.tabManager = new TabManager(this.options);
				App.layout.main.show(this.tabManager.view);
			}

		});

		return MainController;

	}
);