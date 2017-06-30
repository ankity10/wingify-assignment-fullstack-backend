var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var apiRouter = require('./api/notification_api');
var path = require('path');

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log("Express got a request!");
    next();
})

app.use(apiRouter);

module.exports = app;

