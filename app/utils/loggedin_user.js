/**
 * Created by ankit on 7/1/17.
 */
var express = require('express');
var app = express();
var config = require('./../../config/config');
var loggedin_user_id = config.loggedin_user;
var db = require('./../../config/config').db;
var mongoose = require('mongoose');
mongoose.connect(db);
var User = require('../models/user.model');

app.use(function (req, res, next) {
    User.findOne({_id: loggedin_user_id}, function (err, user) {
        if (err) {
            res.send({
                error: 1,
                message: err
            });
            return;
        }else {
            req.user = user;
            next();
        }
    })
});

module.exports.middleware = app;