define(
	['app', 'marionette', 'jquery', 'models/servers'],
	function(App, Marionette, $, Servers) {

		var MainController = Marionette.Controller.extend({

			initialize: function(options) {
				this.options = options || {};

				this.options.mainContainer = this.options.mainContainer || "#App-Container";
				this.$el = $(this.options.mainContainer);
				this.vent = this.options.vent || App.vent;

				this.initializeData();
				this.initializeLayout();
			},

			initializeData: function() {
				App.servers = new Servers();
				App.servers.fetch();
			},

			initializeLayout: function() {
				var controller = this;

				App.View.get('layout-main').then(function(Servers, Layout) {
					App.layout = new Layout(controller.options);
					App.layout.render();

					controller.$el.empty().append(App.layout.el);
				});
			},

			index: function() {

			}

		});

		return MainController;

	}
);