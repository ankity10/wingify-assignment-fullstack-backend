/**
 * Created by ankit on 6/30/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // action = subject + action e.g. wall_post + like -> wall_post_like
    action: {
        type: Schema.Types.ObjectId,
        ref: 'Action',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    is_read: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Notification", NotificationSchema, 'notifications');