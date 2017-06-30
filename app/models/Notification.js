/**
 * Created by ankit on 6/30/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    actor: {
        type: Schema.Types.ObjectId,
        required: true
    },
    action: {
        type: Schema.Types.ObjectId,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        required: true
    },
    is_read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Notification", NotificationSchema);