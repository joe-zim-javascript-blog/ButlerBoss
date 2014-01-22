define(
	['app', 'backbone', 'underscore', 'views/tab-container', 'utils/normalize'],
	function(App, Backbone, _, TabContainer, Normalize) {

		var TabManager = function(options) {
			this.view = new TabContainer(options);
			this.vent = options.vent;

			this._addMainTab(App.servers);

			this.listenTo(App.servers, 'server:started', this._addServerTab);
			this.listenTo(App.servers, 'server:stopped', this._removeServerTab);
		};

		_.extend(TabManager.prototype, Backbone.Events, {
			addTab: function(tabTitle, tabContent) {
				var options = {
					title: tabTitle,
					id: Normalize.hyphenate(tabTitle)
				};

				this.view.addTab(tabContent, options);
				this.vent.trigger('tab:added', options.id);
			},

			removeTab: function(name) {
				this.view.removeTab(name);
				this.vent.trigger('tab:removed', name);
			},

			_addNewTab: function(tabType, tabOptions, tabTitle) {
				var manager = this;

				return App.View.get(tabType).then(function(TabView){
					var tab = new TabView(tabOptions);
					manager.addTab(tabTitle, tab);
				});
			},

			_addMainTab: function(servers) {
				return this._addNewTab('servers', {collection: servers}, 'Servers');

			},

			_removeMainTab: function() {
				this.removeTab('server-list');
			},

			_addServerTab: function(server) {
				return this._addNewTab('server-running', {model: server}, server.get('name'));
			},

			_removeServerTab: function(server) {
				var name = Normalize.hyphenate(server.get('name'));
				this.removeTab(name);
			}
		});

		return TabManager;

	}
);