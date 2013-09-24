require(
	['app', 'backbone', 'controllers/main', 'routers/main', 'modules/communicator/index', 'modules/data/index'],
	function(App, Backbone, MainController, MainRouter ) {

		// Obtain from Config
		ButlerBoss.config.vent = App.vent;

		App.addRegions({
			header: '[data-region-name=header]',
			main: '[data-region-name=main]',
			footer: '[data-region-name=footer]'
		});

		App.addInitializer(function(options) {
			App.controller = new MainController(options);
			App.router = new MainRouter({controller: App.controller});

			Backbone.history.start();
		});

		App.start(ButlerBoss.config);

		App.vent.on('all', function(){ console.log.apply(console, arguments); });

	}
);