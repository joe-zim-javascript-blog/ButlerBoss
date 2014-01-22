require(
	['app', 'backbone', 'controllers/main', 'routers/main'],
	function(App, Backbone, MainController, MainRouter ) {

		// Obtain from Config
		ButlerBoss.config.vent = App.vent;

		App.addInitializer(function(options) {
			App.controller = new MainController(options);
			App.router = new MainRouter({controller: App.controller});

			Backbone.history.start();
		});

		App.start(ButlerBoss.config);

	}
);