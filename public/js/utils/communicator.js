define(
	['underscore', 'jquery'],
	function(_, $) {

		var Communicator = function(options) {
			this.socket = options.socket;
			this.vent = options.vent;

			this._listenTo(this.socket, {
				'connect': this.getStatus,
				'console': this.onConsole,
				'status': this.onStatus
			});
		};

		_.extend(Communicator.prototype, {

			_listenTo: function(obj, bindings) {
				var self = this;

				_.each(bindings, function(callback, event) {
					obj.on(event, callback, self);
				});
			},

			/*
				Pass each `emit` a "deferred resolver" function that will be called on the back
				end to inform the front end of either success or failure. The resolver will resolve
				or reject the deferred promise that we return.
			*/
			_send: function() {
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

			getStatus: function() {
				return this._send('getStatus');
			},

			start: function(server) {
				return this._send('start', server.get('id'));
			},

			stop: function(server) {
				return this._send('stop', server.get('id'));
			},

			issueCommand: function(server, cmd) {
				return this._send('command', server.get('id'), cmd);
			},

			onConsole: function(serverId, text) {
				this.vent.trigger('status:console', serverId, text);
			},

			onStatus: function(status) {
				this.vent.trigger('status:received', status);
			}
		});

		return Communicator;

	}
);