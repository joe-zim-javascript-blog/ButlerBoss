define(
	['marionette', 'tpl!templates/tab-content.tpl'],
	function(Marionette, template) {

		var TabContentView = Marionette.Layout.extend({
			tagName: 'div',
			className: 'tab-pane',
			template: template,

			attributes: function() {
				return {
					"data-view-name": "TabContentView-" + this.cid
				};
			},

			regions: {
				content: '[data-region-name=content]'
			}
		});

		return TabContentView;

	}
);