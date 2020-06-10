"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = function _default(req, res, next) {
  var token = req.cookies.token;
  if (!token) return res.status(401).send({
    status: 'Error',
    message: 'You have not been authenticated!'
  });

  try {
    var user = _jsonwebtoken["default"].decode(token, process.env.SECRET);

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).send({
      message: 'authentication failed',
      data: error
    });
  }
};

exports["default"] = _default;