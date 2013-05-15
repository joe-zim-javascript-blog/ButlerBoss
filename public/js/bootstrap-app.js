define(
	['app', 'jquery', 'utils/specialized-loader', 'utils/socket', 'utils/communicator', 'controllers/main', 'routers/main'],
	function(App, $, Loader, Socket, Communicator, Controller, Router) {

		return function(options){
			// Set up the Lazy Loaders
			App.Model = new Loader('models');
			App.View = new Loader('views');

			// Set up WebSocket communication
			options.socket = new Socket(options);
			App.communicator = new Communicator(options);

			// Create the main controller. Initialization sets up the models and main layout
			App.controller = new Controller(options);
			// Create the router. The correct views are shown via the route
			App.router = new Router({controller: App.controller});
		};

	}
);