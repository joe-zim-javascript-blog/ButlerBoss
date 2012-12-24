define(
	['io', 'underscore'],
	function(io, _) {

		Socket = function(options) {
			var self = this;

			this.vent = options.vent;
			this.socket = io.connect(options.ioHost + ':' + options.ioPort);
			
			this._listenTo(this.socket, {
				'connect': this.onConnect,
				'disconnect': this.onDisconnect
			});
		};

		_.extend(Socket.prototype, {
			connected: false,

			_listenTo:function(obj, bindings) {
				var self = this;

				_.each(bindings, function(callback, event) {
					obj.on(event, _.bind(callback, self));
				});
			},

			on: function(event, handler, context) {
				this.socket.on(event, _.bind(handler, context));

				if (event === "connect" && this.connected) {
					handler.call(context);
				}
			},

			emit: function() {
				this.socket.emit.apply(this.socket, arguments);
			},

			onConnect: function() {
				this.connected = true;
				this.vent.trigger('status:connected');
			},

			onDisconnect: function() {
				this.connected = false;
				this.vent.trigger('status:disconnected');
			}
		});

		return Socket;
	}
);