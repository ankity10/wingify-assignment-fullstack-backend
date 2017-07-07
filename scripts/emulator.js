var mongoose = require('mongoose');
var config = require('../config/config');
var db = config.db;
mongoose.connect(db);

var User = require('../app/models/user.model.js');
var Notification = require('../app/models/notification.model.js');
var Action = require('../app/models/action.model.js');
var loggedin_user_id = config.loggedin_user_id;


var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


var generate_notification = function () {
    console.log("Creating a notification");

    var rand_user_index = getRandomInt(0, 5);
    var rand_action_index = getRandomInt(0, 6);

    User.find({_id: {$ne: loggedin_user_id}}).exec(
        function (err, users) {
            if (err) {
                console.log(err);
                return 1;
            }
            else {
                console.log(users);
                Action.find().exec(
                    function (err, actions) {
                        if (err) {
                            console.log(err);
                            return 1;
                        }
                        else {
                            console.log(actions);
                            var notification = new Notification();
                            notification.sender = users[rand_user_index];
                            notification.action = actions[rand_action_index];
                            notification.receiver = loggedin_user_id;
                            notification.save(function (err, notification) {
                                if (err) {
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
setInterval(generate_notification, 4000);
