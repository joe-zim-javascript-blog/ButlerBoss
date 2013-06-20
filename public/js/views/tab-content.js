define(
	['marionette', 'tpl!templates/tab-content.tpl'],
	function(Marionette, template) {

		var TabContentView = Marionette.Layout.extend({
			tagName: 'div',
			className: 'tab-pane',
			template: template,

			regions: {
				content: '.App-TabContentContainer'
			}
		});

		return TabContentView;

	}
);