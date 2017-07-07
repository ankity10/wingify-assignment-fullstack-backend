var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var user_middleware = require('./utils/loggedin_user').middleware;

var notification_api_router = require('./routes/notifications.routes.js');
var user_api_router = require('./routes/users.routes');

// static middleware to serve static assets
app.use('/static', express.static(__dirname + '/public'));

// Body parser to add post data to 'request' object
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Middleware to add a demo user to 'request' object for further use in application
 */
app.use(user_middleware);

/**
 * Just a simple middleware to log request
 */
app.use(function (req, res, next) {
    console.log("Express got a request!");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

/**
 * Notifications api middleware, adds route for notification REST api
 */
app.use(notification_api_router);

/**
 * Users api middleware, adds route for user REST api
 */
app.use(user_api_router);

module.exports = app;

