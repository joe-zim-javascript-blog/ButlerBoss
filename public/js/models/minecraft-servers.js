define(
	['app', 'backbone', 'models/minecraft-server'],
	function(App, Backbone, Server) {

		var MinecraftServerCollection = Backbone.Collection.extend({
			model: Server,
			url: '../application/servers.json' // servers
		});

		return MinecraftServerCollection;

	}
);