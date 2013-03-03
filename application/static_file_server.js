var express = require('express');
var http = require('http');

module.exports = {

	create: function(server, folder) {
		var app = express();

		server.on('request', app);
		app.use(express.static(folder));
		console.log(folder);

		return app;
	}

};