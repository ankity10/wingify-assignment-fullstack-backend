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

var ActionSchema = new Schema({
    type: {
        type: String,
        required: true,
        get: escapeProperty
    },
    description: {
        type: String,
        required: true,
        get: escapeProperty
    }
});

module.exports = mongoose.model("Action", ActionSchema);