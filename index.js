var http = require('http');
var app = require('./app/express-app');

var httpServer = http.createServer();
var port = 5660;
httpServer.on('request', app);

httpServer.listen(port, function () {
    console.log("Http server has started at port: " + port);

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

