/**
 * Created by ankit on 6/30/17.
 */
var express = require('express');

var apiRouter = express.Router();

var config = require('../../config/config');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

var User = require('../models/User');

var Notification = require('../models/Notification');

var Action = require('../models/Action');

var utility = require('lodash');


apiRouter.route('/notification')

    .post(function (req, res) {
        console.log(req.body.actor);
        var notification = Notification(req.body);
        notification.save(function (err, notification) {
            if (err) {
                res.send({
                    error: 1,
                    message: err
                });
                return;
            }
            else {
                res.send({
                    error: 0,
                    message: "Notification saved successfully"
                });
            }
        });


    })

    .get(function (req, res) {
    Notification.find({is_read:false }, function (err, result) {
        console.log(result);
        res.send({
            notification: result
        });
    });
});


module.exports = apiRouter;