define(
	['app', 'marionette', 'tpl!templates/server-running.tpl', 'tpl!templates/server-not-running.tpl'],
	function(App, Marionette, runningTemplate, notRunningTemplate) {

		var RunningServerView = Marionette.ItemView.extend({
			template: runningTemplate,

			fauxModel: {
				toJSON: function() {
					return {serverName: "None"};
				}
			},

			initialize: function() {
				this.bindTo(App.vent, "server:started", this.setServer);
				this.bindTo(App.vent, "server:stopped", this.removeServer);

				if (!this.model) {
					this.setModel(this.fauxModel);
				}
			},

			beforeRender: function() {
				if (this.model === this.fauxModel) {
					this.template = notRunningTemplate;
				}
				else {
					this.template = runningTemplate;
				}
			},

			setServer: function(model) {
				this.setModel( (model && typeof model === "object") ? model : this.fauxModel );
			},

			removeServer: function() {
				this.setModel(this.fauxModel);
			},

			setModel: function(model) {
				this.model = model;
				this.render();
			}
		});

		return RunningServerView;

	}
);