/**
 * Created by ankit on 7/2/17.
 */

var mongoose = require('mongoose');
var config = require('../../config/config');
var db = config.db;
mongoose.connect(db);
var User = mongoose.model('User');
var loggedin_user_id = config.loggedin_user_id;

module.exports = {
     
    me: function (req, res) {
        User.findOne({_id: mongoose.Types.ObjectId(loggedin_user_id)}, function (err, user) {
            if(err) {
                res.send({
                    error: 1,
                    message: err
                })
            }
            else {
                res.send({
                    error: 0,
                    message: "",
                    data: user
                })
            }
        })
    }
};