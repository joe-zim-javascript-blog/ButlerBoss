require(
	['app', 'backbone', 'bootstrap-app', 'tb-plugins'],
	function(App, Backbone, bootstrap ) {

		App.addInitializer(bootstrap);

		App.addInitializer(function(options) {
			Backbone.history.start();
		});

		App.start({
			mainContainer: '#AppContainer',
			host: 'http://localhost'
		});

		App.vent.on('all', function(){ console.log(arguments); });

	}
);