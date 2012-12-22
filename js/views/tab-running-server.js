define(
	['app', 'marionette', 'tpl!templates/tab-running.tpl'],
	function(App, Marionette, template) {

		var RunningServerTabView = Marionette.ItemView.extend({
			template: template,

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

		return RunningServerTabView;

	}
);