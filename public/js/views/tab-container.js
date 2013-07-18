define(
	['marionette', 'underscore', 'lib/backbone.marionette.namedmultiregion', 'tpl!templates/tab-container.tpl', 'views/tab', 'views/tab-content', 'twitter-bootstrap'],
	function(Marionette, _, MultiRegion, template, TabView, TabContentView) {

		var TabContainer = Marionette.Layout.extend({
			template: template,

			id: function() {
				return "App-" + this.cid + "-TabContainer";
			},

			className: "tabbable",

			initialize: function(options) {
				this.options = options;
				this.vent = this.options.vent;

				this.activeTab = "";
			},

			regions: {
				tab: {
					selector: ".nav-tabs",
					regionType:  MultiRegion
				},
				content: {
					selector: ".tab-content",
					regionType:  MultiRegion
				}
			},

			addTab: function(tabContent, options) {
				var name = options.id;
				var tabView = this._createTabView(options);
				var tabContentView = this._createTabContentView(options);

				this.tab.show(name, tabView);
				this.content.show(name, tabContentView);

				tabContentView.content.show(tabContent);

				this.trigger('tab:added', name);

				// Make this tab active if it's the only tab
				if (this.tab.length() === 1) {
					this.activateTab(name);
				}
			},

			removeTab: function(name) {
				this.tab.close(name);
				this.content.close(name);

				this.trigger('tab:removed', name);
			},

			activateTab: function(tab) {
				if ( _.isString(tab) ) {
					tab = this.tab.get(tab);
				}

				if (tab instanceof TabView) {
					tab.$el.find('a').tab('show');
				}
				else {
					throw new Error('TabContainer cannot activate non-tabs: ' + tab);
				}
			},

			_createTabView: function(options) {
				return new TabView({tabTitle: options.title, tabContentId: options.id});
			},

			_createTabContentView: function(options) {
				return new TabContentView({id: options.id});
			}
		});

		return TabContainer;

	}
);