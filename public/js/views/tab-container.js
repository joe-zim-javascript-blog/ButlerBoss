define(
	['marionette', 'underscore', 'lib/backbone.marionette.namedmultiregion', 'tpl!templates/tab-container.tpl', 'views/tab', 'views/tab-content'],
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

			addTab: function(name, tabView, tabContentView) {
				this.tab.show(name, tabView);
				this.content.show(name, tabContentView);

				// Make this tab active if no tabs are active
				if (!this.activeTab) {
					this.activateTab(name);
				}

				this.trigger('tab:added');
			},

			removeTab: function(name) {
				this.tab.close(name);
				this.content.close(name);

				this.trigger('tab:removed');
			},

			activateTab: function(name) {
				var views;

				if (this.activeTab) {
					views = [
						this.tab.get(this.activeTab), // currently active tab
						this.content.get(this.activeTab) // currently active tab content
					];

					if (this._areTabs(views)) {
						this._deactivate(views);
					}
					else {
						throw new Error("TabContainer.activateTab: Currently active views couldn't be deactivated because they do not supply the proper functionality.");
					}
				}

				views = [
					this.tab.get(name), // new tab to make active
					this.content.get(name) // new tab content to make active
				];

				if (this._areTabs(views)) {
					this._activate(views);
					this.activeTab = name;
				}
				else {
					throw new Error("TabContainer.activateTab: New views couldn't be activated because they do not supply the proper functionality.");
				}
			},

			_deactivate: function(views) {
				_.invoke(views, 'deactivate');
			},

			_activate: function(views){
				_.invoke(views, 'activate');
			},

			/**
			 * Determines if all of the views passed in have the necessary functionality to
			 * programmatically activate and deactivate them
			 */
			_areTabs: function(views) {
				var valid = true;
				var tabContainer = this;

				_.forEach(views, function(view){
					if (!tabContainer._isTab(view)) {
						valid = false;
						return false;
					}
				});

				return valid;
			},

			_isTab: function(view) {
				var isTab = !!(view && view.activate && view.deactivate);

				return isTab;
			}
		});

		return TabContainer;

	}
);