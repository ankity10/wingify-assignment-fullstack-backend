/**
 * Created by ankit on 7/2/17.
 */
var express = require('express');

var user_router = express.Router();


var user_controller = require('../controller/users.controller');

user_router.route('/me')
    .get(user_controller.me);

module.exports = user_router;