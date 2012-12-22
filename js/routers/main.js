define(
	['app', 'marionette'],
	function(App, Marionette) {

		var MainRouter = Marionette.AppRouter.extend({
			appRoutes: {
				"": "index",
				"edit/:id": "editServer",
				"add": "addServer"
			}
		});

		return MainRouter;

	}
);