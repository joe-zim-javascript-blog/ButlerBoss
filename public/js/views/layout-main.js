define(
	['backbone', 'marionette', 'jquery', 'tpl!templates/layout-main.tpl'],
	function(Backbone, Marionette, $, template) {

		var MainLayout = Marionette.Layout.extend({
			attributes: function() {
				return {
					"data-view-name": "MainLayout-" + this.cid
				};
			},

			initialize: function() {
				// Since I'm assigning this view to an existing element, Backbone.View._ensureElement won't be assigning the attributes
				this.$el.attr(_.result(this, 'attributes'));
			},

			regions: {
				header: "[data-region-name=header]",
				main: "[data-region-name=main]",
				footer: "[data-region-name=footer]"
			},

			// Since I'm attaching to the existing DOM, I won't need to render a template. So I'm overriding `render`
			render: function() {
				// copy code from Marionette's Layouts but exclude part about rendering template.				
				if (this._firstRender){
					// if this is the first render, don't do anything to reset the regions
					this._firstRender = false;
				} else if (this.isClosed){
					// a previously closed layout means we need to  completely re-initialize the regions
					this._initializeRegions();
				} else {
					// If this is not the first render call, then we need to re-initializing the `el` for each region
					this._reInitializeRegions();
				}

				return this;
			}
		});

		return MainLayout;

	}
);