define(
	['app', 'jquery', 'utils/specialized-loader', 'utils/socket', 'utils/communicator'],
	function(App, $, Loader, Socket, Communicator) {

		return function(options){
			// Set up the Lazy Loaders
			App.Model = new Loader('models');
			App.View = new Loader('views');
			App.Controller = new Loader('controllers');
			App.Util = new Loader('utils');

			// Set up WebSocket communication
			options.socket = new Socket(options);
			App.communicator = new Communicator(options);

			// Get Servers
			App.Model.get('servers').then(function(Servers){
				App.servers = new Servers();
				App.servers.fetch();
			});
		};

	}
);