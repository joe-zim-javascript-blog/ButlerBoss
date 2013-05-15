define(
	['app', 'marionette'],
	function(App, Marionette) {

		var MainRouter = Marionette.AppRouter.extend({
			appRoutes: {
				"": "index"
			}
		});

		return MainRouter;

	}
);