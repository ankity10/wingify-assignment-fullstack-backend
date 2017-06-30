var http = require('http');
var app = require('./app/express-app');

var httpServer = http.createServer();

httpServer.on('request', app);

httpServer.listen(5660, function () {
    console.log("Http server has started");

});


var WebSocketServer = require('websocket').server;

var wsServer = new WebSocketServer({
    httpServer: httpServer
});

wsServer.on('request', function (request) {
    var con = request.accept(null, request.origin);

    con.on('message', function (message) {
        console.log(message);
    });

    con.on('close', function (connection) {

    });
});

