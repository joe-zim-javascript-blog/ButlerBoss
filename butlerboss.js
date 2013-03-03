var http = require('http');
var server = http.createServer();

var file_server = require('./application/static_file_server.js');
var io_server = require('./application/io_server.js');

var port = 8080;

file_server.create(server, __dirname + '/public');
io_server.create(server);

server.listen(port);
console.log("File Server created");
console.log("Socket.IO Server created");
console.log("Servers listening on port " + port);
