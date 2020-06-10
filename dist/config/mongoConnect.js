"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config.json"));

var logger = require('simple-node-logger').createSimpleLogger();

var connectDB = function connectDB() {
  var url = process.env.NODE_ENV === 'test' ? _config["default"].test.url : _config["default"].development.url;

  _mongoose["default"].connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    logger.info("Successfully connected to MongoDB Atlas!");
  })["catch"](function (error) {
    logger.error("Unable to connect to MongoDb Atlas!");
    logger.error(error.message);
  });
};

var _default = connectDB;
exports["default"] = _default;