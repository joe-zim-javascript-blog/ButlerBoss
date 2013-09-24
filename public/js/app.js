define(
	['marionette', 'utils/specialized-loader'],
	function(Marionette, Loader) {

		ButlerBossApp = Marionette.Application.extend({

			Model: new Loader('models'),
			View: new Loader('views'),
			Module: new Loader('modules', 'index')

		});

		window.App = new ButlerBossApp();

		return window.App;

	}
);