"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var url = "http://api.ipstack.com/check?access_key=c934a4c422466d14bb4cdcd82fa49547";
var _default = {
  getLocation: function getLocation(req, res) {
    _axios["default"].get(url).then(function (result) {
      res.status(200).json(result.data);
    })["catch"](function (error) {
      return res.status(400).json(error.message);
    });
  },
  url: url
};
exports["default"] = _default;