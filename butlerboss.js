var http = require('http');
var server = http.createServer();

var file_server = require('./application/static_file_server.js');
var io_server = require('./application/io_server.js');

var port = 8080;

file_server.create(server, __dirname + '/public');
io_server.create(server);

server.listen(port);
console.info("File Server and Socket.IO Server listening on port " + port);
