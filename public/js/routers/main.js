define(
	['app', 'backbone', 'marionette'],
	function(App, Backbone, Marionette) {

		var MainRouter = Marionette.AppRouter.extend({
			appRoutes: {
				"": "index"
			}
		});

		return MainRouter;

	}
);