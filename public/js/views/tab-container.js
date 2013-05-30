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

				this.trigger('tab:added');
			},

			removeTab: function(name) {
				this.tab.close(name);
				this.content.close(name);

				this.trigger('tab:removed');
			}
		});

		return TabContainer;

	}
);