/**
 * Created by ankit on 6/30/17.
 */
var express = require('express');

var notification_router = express.Router();


var notification_controller = require('../controller/notifications.controller');

notification_router.route('/notification')
    .post(notification_controller.update)
    .get(notification_controller.list);

module.exports = notification_router;