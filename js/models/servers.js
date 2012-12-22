define(
	['app', 'backbone', 'models/server'],
	function(App, Backbone, Server) {

		var ServerCollection = Backbone.Collection.extend({
			model: Server,
			url: 'app/servers.json' // servers
		});

		return ServerCollection;

	}
);