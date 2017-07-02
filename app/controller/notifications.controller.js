/**
 * Created by ankit on 7/1/17.
 */

var mongoose = require('mongoose');
var config = require('../../config/config');
var db = config.db;
mongoose.connect(db);
var Action = require('../models/action.model');

var Notification = require('../models/notification.model');


/**
 *
 * @param result
 * @returns {[reponse_array, notfication_count]}
 * @private
 */
var _combine_groups = function (result) {
    var result_array = [];
    var notification_count = 0;
    for (var property in result) {
        if (result.hasOwnProperty(property) && (result[property].length > 0)) {
            notification_count += 1;
            console.log(result[property]);
            var obj = {};
            obj.action = result[property][0]['action'];
            obj.sender = [];
            obj.receiver = result[property][0]['receiver'];
            var sender_count = 0;
            for (var ele in result[property]) {
                sender_count += 1;
                obj.sender.push(result[property][ele].sender);
            }
            obj.sender_count = sender_count;
            result_array.push(obj);
            console.log(property);
        }
    }
    // console.log(result_array);
    return [result_array, notification_count];
};



module.exports = {

    "create": function (req, res) {
        var notification = new Notification(req.body);
        notification.receiver = req.user;
        notification.save(function (err, notofication) {
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
                    message: "Notification created successfully"
                });
            }
        })
    },

    "list": function (req, res) {
        Notification.find({is_read: false}).populate('sender receiver action').exec(function (err, db_result) {
            if (err) {
                res.send({
                    error: 1,
                    message: err
                });
            }
            else {
                var result = {};
                db_result.forEach(function (notification) {
                    if (result[notification.action.type] == undefined) {
                        result[notification.action.type] = [];
                    }
                    else {
                        result[notification.action.type].push(notification);
                    }
                });
                var result_array = _combine_groups(result);
                result = result_array[0];
                var notification_count = result_array[1];
                res.send({
                    error: 0,
                    message: {
                        data: result,
                        notification_count: notification_count
                    }
                });
            }
        })
    },

    "update": function (req, res) {
        var group_keys = req.body.group_keys;
        var key_list = group_keys.split(",");
        console.log(key_list);
        key_list.forEach(function (key) {
            console.log(key);
            key = String(key).trim();
            Notification.update({action: new mongoose.Types.ObjectId(key), is_read: false},
                {is_read: true},
                {multi: true},
                function (err, num) {
                    console.log(err, num);
                    if (err !== null) {
                        res.send({
                            error: 1,
                            message: "Failed to update notification status"
                        });
                    }
                }
            )
        });

        res.send({
            error: 0,
            message: "Notification updated successfully"
        })
    }

};