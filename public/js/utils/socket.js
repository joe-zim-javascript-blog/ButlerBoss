define(
	['io', 'underscore'],
	function(io, _) {

		Socket = function(options) {
			var settings = {
				port: '8080',
				'auto connect': false
			};

			if (typeof options.io === "object") {
				_.extend(settings, options.io);
			}

			this.vent = options.vent;
			this.socket = io.connect(':' + settings.port, settings).socket;

			this._listenTo(this.socket, {
				'connect': this.onConnect,
				'disconnect': this.onDisconnect
			});
		};

		_.extend(Socket.prototype, {
			isConnected: function() {
				return this.socket.connected;
			},

			on: function(event, handler, context) {
				this.socket.on(event, _.bind(handler, context));

				if (event === "connect" && this.isConnected()) {
					handler.call(context);
				}
			},

			/*
				Pass each `emit` a "deferred resolver" function that will be called on the back
				end to inform the front end of either success or failure. The resolver will resolve
				or reject the deferred promise that we return.
			*/
			emit: function() {
				var dfd = new $.Deferred();
				Array.prototype.push.call(arguments, this._getDeferredResolver(dfd));
				this.socket.emit.apply(this.socket, arguments);
				return dfd.promise();
			},

			/*
				Return a function that is used as a callback to resolve or reject a deferred
				based on value of the first argument.
			*/
			_getDeferredResolver: function(dfd) {
				return function(success, errorMessage) {
					if (success) {
						dfd.resolve();
					} else {
						dfd.reject(errorMessage);
					}
				};
			},

			connect: function() {
				this.socket.connect();
			},

			disconnect: function() {
				this.socket.disconnect();
			},

			onConnect: function() {
				this.vent.trigger('status:connected');
			},

			onDisconnect: function() {
				this.vent.trigger('status:disconnected');
			},

			_listenTo:function(obj, bindings) {
				var self = this;

				_.each(bindings, function(callback, event) {
					obj.on(event, _.bind(callback, self));
				});
			}
		});

		return Socket;
	}
);