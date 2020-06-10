"use strict";

var logger = require('simple-node-logger').createSimpleLogger();

var app = require('./app'); // store the port number
// http://api.ipstack.com/197.210.53.116?access_key=c934a4c422466d14bb4cdcd82fa49547
// "@babel/plugin-transform-runtime": "^7.9.6",


var port = parseInt(process.env.PORT, 10) || 4500;
app.listen(port, function () {
  return logger.info("Zero hunger ready at ".concat(port));
});