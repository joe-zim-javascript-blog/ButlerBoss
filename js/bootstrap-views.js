define(
	// We need to use these and/or set them up
	['app', 'views/tab-server-list', 'views/tab-running-server', 'views/tab-content-server-list', 'views/tab-content-running-server',
	// This sets itself up and attaches itself to App.layout
	'views/layout-main'],
	function(App, ListTabView, RunningTabView, ServerListView, RunningServerView) {

		return function(){
			App.layout.listTab.show(new ListTabView());
			App.layout.runningTab.show(new RunningTabView());
			App.layout.listTabContent.show(new ServerListView({collection: App.data.servers}));
			App.layout.runningTabContent.show(new RunningServerView());
		};

	}
);