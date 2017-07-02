var mongoose = require('mongoose');
var config = require('../../config/config');
var db = config.db;
mongoose.connect(db);

var User = require('../models/user.model');
var Notification = require('../models/notification.model');
var Action = require('../models/action.model');
var record_counts = require('./record_count');
var loggedin_user_id = config.loggedin_user_id;

var user_count = record_counts.user_count;
var action_count = record_counts.action_count;

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() *(max-min)) + min;
}


var generate_notification = function () {
    console.log("Creating a notification");

    var rand_user_index = getRandomInt(1, 7);
    var rand_action_index = getRandomInt(1, 8);

    User.findOne().skip(rand_user_index).exec(
        function (err, user) {
            if (err) {
                console.log(err);
                return 1;
            }
            else {
                console.log(user);

                Action.findOne().skip(rand_action_index).exec(
                    function (err, action) {
                        if (err) {
                            console.log(err);
                            return 1;
                        }
                        else {
                            console.log(action);
                            var notification = new Notification();
                            notification.sender = user;
                            notification.action = action;
                            notification.receiver = loggedin_user_id;
                            notification.save(function (err, notification) {
                                if(err) {
                                    console.log(err);
                                    return 1;
                                }
                                else {
                                    console.log("Notification created successfully");
                                }
                            })
                        }
                    }
                )
            }
        }
    )

};

// generate_notification();
setInterval(generate_notification, 2000);
