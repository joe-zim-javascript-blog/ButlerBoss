define(
	['app', 'backbone', 'underscore'],
	function(App, Backbone, _) {

		var MinecraftServer = Backbone.Model.extend({
			defaults: {
				id: '',
				name: '',
				isRunning: false,
				console: ''
			},

			initialize: function() {
				App.vent.on('status:console', this.setConsole, this);
			},

			setConsole: function(id, line){
				if (id == this.get('id')) {
					line = _.compact(line.split(/\n/));
					this.set('console', line);
				}
			},

			start: function() {
				App.data.status.start(this);
			},

			stop: function() {
				App.data.status.stop(this);
			},

			issueCommand: function(command) {
				App.data.status.issueCommand(command, this);
			}
		});

		return MinecraftServer;

	}
);