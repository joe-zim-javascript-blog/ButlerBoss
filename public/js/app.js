define(
	['marionette', 'underscore', 'utils/specialized-loader'],
	function(Marionette, _, Loader) {

		var BBApplication = Marionette.Application.extend({

			Model: new Loader('models'),
			View: new Loader('views'),
			Util: new Loader('utils'),
			Module: new Loader('modules', 'index')

		});

		// Configuration should already exist at ButlerBoss.config. Mix the new Application with it
		window.ButlerBoss = _.extend(new BBApplication(), window.ButlerBoss);

		return window.ButlerBoss;

	}
);