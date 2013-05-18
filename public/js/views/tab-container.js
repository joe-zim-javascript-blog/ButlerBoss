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

			_defaultSettings: {
				tab: {
					viewType: TabView,
					options: {},
					name: ''
				},
				content: {
					viewType: TabContentView,
					options: {},
					name: ''
				}
			},

			addTab: function(options, name) {
				options = _.extend({}, this._defaultSettings, options);

				this._insertView(options, "tab", name);
				this._insertView(options, "content", name);

				this.trigger('tab:added');
			},

			removeTab: function(name) {
				this.tab.close(name);
				this.content.close(name);

				this.trigger('tab:removed');
			},

			_insertView: function(options, region, name) {
				options = options[region];
				var view = this._createView(options, name);

				// If no name was specified, just use the views cid
				name = name || view.cid;

				this[region].show(view, name);
			},

			_createView: function(options, name) {
				var View = options.viewType;
				options = options.options;
				options.name = name;

				return new View(options);
			}
		});

		return TabContainer;

	}
);