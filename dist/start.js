"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var logger = require('simple-node-logger').createSimpleLogger(); // store the port number


var port = parseInt(process.env.PORT, 10) || 4500;

_app["default"].listen(port, function () {
  return logger.info("Zero hunger ready at ".concat(port));
});