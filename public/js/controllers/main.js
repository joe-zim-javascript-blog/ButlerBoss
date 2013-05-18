define(
	['marionette', 'jquery', 'models/servers', 'views/layout-main'],
	function(Marionette, $, Servers, Layout) {

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
				var controller = this;
				App.View.get('tab-container').then(function(TabContainer){
					var tabContainer = new TabContainer(controller.options);
					App.layout.main.show(tabContainer);

					window.tabs = tabContainer;
				});
			}

		});

		return MainController;

	}
);