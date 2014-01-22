define(
	['app', 'Marionette', 'underscore', 'modules/data/minecraftServers/models/minecraft-servers'],
	function(App, Marionette, _, MinecraftServerCollection) {

		return App.module('data.minecraftServers', function(mcs) {
			// Module must be manually started
			mcs.startWithParent = false;

			// Starting the module
			mcs.addInitializer(function(options) {
				mcs._initialize(options);
			});

			// Stopping the module
			mcs.addFinalizer(function(){
				mcs._finalize();
			});

			// Module API
			_.extend(mcs, {
				_events: {
					'vent': {},
					'collection': {}
				},

				_initialize: function(options) {
					this.vent = App.factory.get('eventEmitter');
					this.collection = new MinecraftServerCollection(options.data);
					this._delegateEvents();
				},

				_finalize: function() {
					this.vent = null;
					this.collection = null;
					this.stopListening();
				},

				_delegateEvents: function() {
					var self = this;

					_.each(this._events, function(eventHash, propertyName) {
						Marionette.bindEntityEvents(self, self[propertyName], eventHash);
					});
				}
			});
		});

	}
);