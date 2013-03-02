define(
	['underscore'],
	function(_) {

		var Status = function(options) {
			
			this.socket = options.socket;
			this.vent = options.vent;

			this._listenTo(this.vent, {
				'status:get': this.getStatus,
				'server:start': this.start,
				'server:stop': this.stop,
				'server:command': this.issueCommand
			});

			this._listenTo(this.socket, {
				'connect': this.getStatus,
				'console': this.onConsole,
				'status': this.onStatus,
				'fail': this.onFail
			});
		};

		_.extend(Status.prototype, {

			_listenTo:function(obj, bindings) {
				var self = this;

				_.each(bindings, function(callback, event) {
					obj.on(event, callback, self);
				});
			},

			getStatus: function() {
				this.socket.emit('getStatus');
			},

			start: function(server) {
				this.socket.emit('start', server.get('id'));
			},

			stop: function(server) {
				this.socket.emit('stop', server.get('id'));
			},

			issueCommand: function(server, cmd) {
				this.socket.emit('command', server.get('id'), cmd);
			},

			onConsole: function(server, text) {
				this.vent.trigger('status:console', server, text);
			},

			onStatus: function(status) {
				this.vent.trigger('status:received', status);
			},

			onFail: function(err) {
				this.vent.trigger('status:fail', err);
			}
		});

		return Status;

	}
);