define(
	// `require` all the controllers
	['app', 'routers/main', 'controllers/main'],
	function(App, MainRouter, mainController) {

		return function() {
			App.controllers = App.controllers || {};
			App.controllers.main = mainController;

			App.routers = App.routers || {};
			App.routers.main = new MainRouter({
				controller: App.controllers.main
			});
		};
		
	}
);