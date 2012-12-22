define(
	['app', 'backbone', 'underscore', 'io'],
	function(App, Backbone, _, io) {

		var Socket = Backbone.Model.extend({

			connected: false,
			status: null,
			socket: null,

			initialize: function(options) {
				this.url = options.host;
				this.socket = io.connect( options.host + ':8080' );

				this.socket.on("connect", _.bind(this._connected, this));
				this.socket.on("disconnect", _.bind(this._disconnected, this));
				this.socket.on("status", _.bind(this._receivedStatus, this));
				this.socket.on("console", _.bind(this._receivedConsole, this));
				this.socket.on("fail", _.bind(this._failed, this));
			},

			getStatus: function() {
				this._emit('getStatus');
			},

			start: function(server) {
				this._emit('start', server.get('id'));
			},

			stop: function(server) {
				this._emit('stop', server.get('id'));
			},

			issueCommand: function(server, cmd) {
				this._emit('command', server.get('id'), cmd);
			},

			_emit: function() {
				if (this.connnected) {
					this.socket.emit.apply(this.socket, arguments);
				}
			},

			_connected: function() {
				this.connected = true;
				this.getStatus();
				App.vent.trigger('status:connected');
			},

			_disconnected: function() {
				this.connected = false;
				App.vent.trigger('status:disconnected');
			},

			_receivedConsole: function(server, text) {
				App.vent.trigger('status:console', server, text);
			},

			_receivedStatus: function(status) {
				App.vent.trigger('status:received', status);
			},

			_fail: function(err) {
				App.vent.trigger('status:fail', err);
			}
		});

		return Socket;

	}
);