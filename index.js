var http = require('http');
var app = require('./app/server.js');

var httpServer = http.createServer();
var port = 5660;
httpServer.on('request', app);

httpServer.listen(port, function () {
    console.log("Http server has started at port: " + port);

});

var mongoose = require('mongoose');
var config = require('./config/config');
var db = config.db;
mongoose.connect(db);
var Action = require('./app/models/action.model');

var Notification = require('./app/models/notification.model');


/**
 *
 * @param result
 * @returns {[reponse_array, notfication_count]}
 * @private
 */
// var _combine_groups = function (result) {
//     var result_array = [];
//     var notification_count = 0;
//     for (var property in result) {
//         if (result.hasOwnProperty(property) && (result[property].length > 0)) {
//             notification_count += 1;
//             console.log(result[property]);
//             var obj = {};
//             obj.action = result[property][0]['action'];
//             obj.sender = [];
//             obj.receiver = result[property][0]['receiver'];
//             var sender_count = 0;
//             for (var ele in result[property]) {
//                 sender_count += 1;
//                 obj.sender.push(result[property][ele].sender);
//             }
//             obj.sender_count = sender_count;
//             result_array.push(obj);
//             console.log(property);
//         }
//     }
//     // console.log(result_array);
//     return [result_array, notification_count];
// };


//
// var WebSocketServer = require('websocket').server;
//
// var wsServer = new WebSocketServer({
//     httpServer: httpServer
// });
//
// wsServer.on('request', function (request) {
//     var con = request.accept(null, request.origin);
//
//     con.on('message', function (message) {
//         console.log(message);
//         con.sendUTF(message.utf8Data);
//     });
//
//     var f = function () {
//         Notification.find({is_read: false}).populate('sender receiver action').exec(function (err, db_result) {
//             if (err) {
//                 var error_obj = {
//                     error: 1,
//                     message: err
//                 };
//                 var error = JSON.stringify(error_obj);
//                 con.sendUTF(error);
//             }
//             else {
//                 var result = {};
//                 db_result.forEach(function (notification) {
//                     if (result[notification.action.type] == undefined) {
//                         result[notification.action.type] = [];
//                     }
//                     else {
//                         result[notification.action.type].push(notification);
//                     }
//                 });
//                 var result_array = _combine_groups(result);
//                 result = result_array[0];
//                 var notification_count = result_array[1];
//                 var res_obj = {
//                     error: 0,
//                     message: {
//                         data: result,
//                         notification_count: notification_count
//                     }
//                 };
//                 var res = JSON.stringify(res_obj);
//                 con.sendUTF(res);
//             }
//         })
//     }
//
//     setInterval(f, 3000);
//
//     con.on('close', function (connection) {
//
//     });
// });
//
