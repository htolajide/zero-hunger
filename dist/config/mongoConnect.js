"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var logger = require('simple-node-logger').createSimpleLogger();

var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose["default"].connect("mongodb+srv://htolajide:olajide4me@cluster0-kpchb.mongodb.net/test?retryWrites=true&w=majority", {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }).then(function () {
              logger.info("Successfully connected to MongoDB Atlas!");
            })["catch"](function (error) {
              logger.error("Unable to connect to MongoDb Atlas!");
              logger.error(error.message);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = connectDB;