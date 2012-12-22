require(
	['app', 'backbone',
	// These ones return initializers
	'bootstrap-models', 'bootstrap-views', 'bootstrap-controllers',
	// This just initializes plugins
	'bootstrap'],
	function(App, Backbone, modelInit, viewInit, controllerInit ) {

		App.addInitializer(modelInit);
		App.addInitializer(viewInit);
		App.addInitializer(controllerInit);

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