define(
	['marionette'],
	function(Marionette) {

		ManagerCraftApp = Marionette.Application.extend({
			// Right now it's just a standard app.
			// This is just here to make it easier to start extending right away if we need it.
		});

		window.App = new ManagerCraftApp();

		return window.App;

	}
);