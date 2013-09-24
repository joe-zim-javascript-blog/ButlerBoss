require.config({

	deps: ["main"],

	paths: {
		// Libraries.
		jquery: "../components/jquery/jquery",
		underscore: "../components/lodash/lodash",
		backbone: "../components/backbone/backbone",
		marionette: "../components/backbone.marionette/lib/core/amd/backbone.marionette",
		"backbone.babysitter": "../components/backbone.babysitter/lib/amd/backbone.babysitter",
		"backbone.wreqr": "../components/backbone.wreqr/lib/amd/backbone.wreqr",
		io: "../components/socket.io-client/dist/socket.io",

		// RequireJS Plugins
		tpl: "../components/requirejs-tpl/tpl",

		// Path Aliases
		"templates": "../templates/",
		"bootstrap": "../components/bootstrap/js/"
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		"backbone": {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},

		// Socket.io needs to export its library
		"io": {
			deps: [],
			exports: "io"
		},

		// jQuery plugins. Export $, since everything is exposed through jQuery
		"bootstrap/bootstrap-tab": {
			deps: ["jquery"],
			exports: "$"
		}

	}

});


window.ButlerBoss = window.ButlerBoss || {};
ButlerBoss.config = ButlerBoss.config || {};

ButlerBoss.config.host = window.location.protocol + "//" + window.location.hostname;

ButlerBoss.config.data = ButlerBoss.config.data || {};
ButlerBoss.config.data.minecraftServers = ButlerBoss.config.data.minecraftServers || null;
ButlerBoss.config.io = {
	port: window.location.port,
	'auto connect': true
};
