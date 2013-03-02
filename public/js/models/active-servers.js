define(
	['app', 'backbone', 'underscore', 'models/server'],
	function(App, Backbone, _, Server) {

		var ServerCollection = Backbone.Collection.extend({
			model: Server,

			initialize: function() {
				App.vent.on('status:received', this.setActiveServers, this);
			},

			setActiveServers: function(backEndActiveServerIds) {
				// Get the ids of all the servers that are running here.
				var frontEndActiveServerIds = this.map(function(model) {
						return model.get('id');
					}),
					// Get the ids of all the servers that are running on the back end, but not here
					startTheseIds = _.difference(backEndActiveServerIds, frontEndActiveServerIds),
					// Get the ids of all the servers that are running here, but not on the back end
					stopTheseIds  = _.difference(frontEndActiveServerIds, backEndActiveServerIds);

				this.startServers(startTheseIds);
				this.stopServers(stopTheseIds);
			},

			startServer: function(serverId) {
				var server = App.data.servers.get(serverId);
				server.set('isRunning', true);
				this.add(server);
				App.vent('server:started', server);
			},

			stopServer: function(serverId) {
				var server = this.get(serverId);
				server.set('isRunning', false);
				this.remove(server);
				App.vent('server:stopped', server);
			},

			startServers: function(serverIds) {
				_.each(serverIds, this.startServer, this);
			},

			stopServers: function(serverIds) {
				_.each(serverIds, this.stopServer, this);
			}
		});

		return ServerCollection;

	}
);