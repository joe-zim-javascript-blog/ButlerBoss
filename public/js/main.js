require(
	['app', 'backbone', 'bootstrap-app'],
	function(App, Backbone, bootstrap ) {

		var options = {
			mainContainer: '[data-view-binding=layout]',
			host: window.location.protocol + "//" + window.location.hostname,
			vent: App.vent,
			io: {
				port: window.location.port,
				'auto connect': true
			},
			minecraftServerData: minecraftServerData || null
		};

		App.addInitializer(bootstrap);

		App.addInitializer(function(options) {
			Backbone.history.start();
		});

		App.start(options);

		App.vent.on('all', function(){ console.log.apply(console, arguments); });window.App = App;

	}
);