var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log("Express got a request!");
    next();
})



module.exports = app;

