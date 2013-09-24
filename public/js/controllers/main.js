define(
	['marionette', 'underscore', 'utils/tab-manager'],
	function(Marionette, _, TabManager) {

		var MainController = Marionette.Controller.extend({

			initialize: function(options) {
				this.options = options || {};
				this.vent = this.options.vent;
			},

			index: function() {
				this.tabManager = new TabManager(this.options);
				App.main.show(this.tabManager.view);
			}

		});

		return MainController;

	}
);