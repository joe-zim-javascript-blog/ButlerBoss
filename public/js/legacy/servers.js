define(
['app', 'backbone', 'underscore', 'parseUrl', 'io', 'models/server'],


function(App, Backbone, _, parseUrl, io, Server) {

	var ServerCollection = Backbone.Collection.extend({
		model: Server,

		initialize: function() {
			// Bind functions for use as callbacks for the socket
			var fetch = _.bind(this.fetch, this);
			var disconnected = _.bind(this.disconnected, this);
			var setServerList = _.bind(this.setServerList, this);
			var setStatus = _.bind(this.setStatus, this);
			var addLine = _.bind(this.addLine, this);
			var failedCommand = _.bind(this.failedCommand, this);

			// Initialize properties
			this._setServer(null);
			this.ready = false;
			this.socket = io.connect( 'http://' + parseUrl().hostname + ':8080' ); // hostname should pull from config

			// Set the callbacks for communications with the server
			// this.socket.on('connect', fetch);
			this.socket.on('disconnect', disconnected);
			this.socket.on('server_list', setServerList);
			this.socket.on('status', setStatus);
			this.socket.on('console', addLine);
			this.socket.on('fail', failedCommand);
		},

		fetch: function() {
			this.socket.emit('get_server_list');
			this.socket.emit('get_status');
		},

		getRunningServer: function() {
			var running = this.filter(function(model){
				return model.get('isRunning');
			});

			return running[0];
		},

		disconnected: function() {
			this.ready = false;
			this.trigger('unready');
		},

		setServerList: function(servers) {
			var self = this;
			_.forEach(servers, function(serverName, serverId) {
				self.add({id: serverId, serverName:serverName});
			});

			this.ready = true;
			this.trigger('ready');
		},

		setStatus: function(server) {
			if (server) {
				if ( this.currentServerId !== server ) {
					this._stop();
					this._start(server);
				}
			} else {
				this._stop();
			}
		},

		start: function(server) {
			this.socket.emit('start_server', server);
		},

		_start: function(server) {
			this._setServer(server);
			this.currentServer.set('active', true);
			this.trigger('serverchange', this);
		},

		stop: function() {
			this.issueCommand('stop');
		},

		_stop: function() {
			this._setServer(null);

			this.each(function(model){
				if (model.get('active')) {
					model.set('active', false);
				}
			});

			this.trigger('serverchange', this);
		},

		_setServer: function(id) {
			var server = id ? this.get(id) : null;

			this.currentServerId = id;
			this.currentServer = server;
		},

		addLine: function(line) {
			if (this.currentServer) {
				this.currentServer.addLine(line);
			}
		},

		issueCommand: function(command) {
			this.socket.emit('command', command);
		},

		failedCommand: function(cmd) {
			if (this.currentServer) {
				this.currentServer.addLine('A Command Failed: ' + cmd);
			}
		}

	});
	
	App.addInitializer(function(){
		App.data = App.data || {};
		App.data.servers = new ServerCollection();

		App.data.servers.fetch()
			.success(function(){
				App.vent.trigger('servers:loaded', App.data.servers);
			})
			.error(function() {
				App.vent.trigget('servers:load-fail', App.data.servers);
			});
	});

	return ServerCollection;

});