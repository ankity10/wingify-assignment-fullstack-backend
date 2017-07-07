var http = require('http');
var app = require('./app/server.js');

var httpServer = http.createServer();
var port = 5660;
httpServer.on('request', app);

httpServer.listen(port, function () {
    console.log("Http server has started at port: " + port);

});