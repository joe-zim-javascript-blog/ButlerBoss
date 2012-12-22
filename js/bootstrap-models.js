define(
	['app', 'models/servers', 'models/active-servers', 'models/status'],

	function(App, ServerCollection, ActiveServerCollection, StatusModel) {

		return function(options){
			App.data = App.data || {};
			App.data.status = new StatusModel(options);
			App.data.activeServers = new ActiveServerCollection();
			App.data.servers = new ServerCollection();

			App.data.servers.fetch()
				.success(function(){
					App.vent.trigger('servers:loaded', App.data.servers);
				})
				.error(function() {
					App.vent.trigger('servers:load-fail', App.data.servers);
				});
		};
	}
);