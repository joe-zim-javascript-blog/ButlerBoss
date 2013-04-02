define(
	['underscore', 'jquery'],
	function(_, $) {

		var Communicator = function(options) {
			this.socket = options.socket;
			this.vent = options.vent;

			this._listenTo(this.socket, {
				'connect': this.getStatus,
				'console': this.onConsole,
				'status-update': this.onStatusUpdate
			});
		};

		_.extend(Communicator.prototype, {

			_listenTo: function(obj, bindings) {
				var self = this;

				_.each(bindings, function(callback, event) {
					obj.on(event, callback, self);
				});
			},

			getStatus: function() {
				return this.socket.emit('getStatus');
			},

			start: function(server) {
				return this.socket.emit('start', server.get('id'));
			},

			stop: function(server) {
				return this.socket.emit('stop', server.get('id'));
			},

			issueCommand: function(server, cmd) {
				return this.socket.emit('command', server.get('id'), cmd);
			},

			onConsole: function(serverId, text) {
				this.vent.trigger('status:console', serverId, text);
			},

			onStatusUpdate: function(status) {
				this.vent.trigger('status:received', status);
			}
		});

		return Communicator;

	}
);