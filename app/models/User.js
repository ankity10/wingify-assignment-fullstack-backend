'use strict';
/**
 * Created by ankit on 6/30/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

/**
 *
 * @param value
 * @returns {string}
 */
var escapeProperty = function (value) {
    return _.escape(value);
};


/**
 *
 * @param value
 * @param callback
 */
var validateUniqueUsername = function (value, callback) {
    var User = mongoose.model('User');
    User.find({
        $and: [{
            username: value
        },
            {
                _id: {
                    $ne: this._id
                }
            }]
    }, function (err, user) {
        callback(err || user.length === 0);
    });
};

var UserSchema = new Schema({
    name: {
        type: String,
        required: false,
        get: escapeProperty,
        maxlength: [120, "Name should be less than 80 characters"]
    },
    username: {
        type: String,
        unique: true,
        required: true,
        get: escapeProperty,
        validate: [validateUniqueUsername, "Username is already in-use"],
        maxlength: [50, "username should be less than 50 characters"],
        match: [/^[a-zA-Z0-9_]*$/, "Please enter a valid username, use only alphabet or numeric or underscore."
        + "No special characters are allowed."]
    },
    profile_img: {
        type: String,
        unique: true,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);