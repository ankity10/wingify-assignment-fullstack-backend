/**
 * Created by ankit on 7/1/17.
 */
var mongoose = require('mongoose');
var db = require('../../config/config').db;
mongoose.connect(db);

var User = require('../models/user.model');
var Action = require('../models/action.model');

User.count({}, function (err, count) {
    if (err) {
        console.log(err);
        return 1;
    }
    else {
        module.exports.user_count = count;
    }
});

Action.count({}, function (err, count) {
    if (err) {
        console.log(err);
        return 1;
    }
    else {
        module.exports.action_count = count;
    }
})

