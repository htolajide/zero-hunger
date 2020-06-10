"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("../utilities/helper"));

var Unit = require('../models/unit');

var _default = {
  addUnit: function addUnit(req, res) {
    var name = req.body.name;

    var capName = _helper["default"].capitalizeWord(name.toLowerCase());

    var unit = new Unit({
      name: capName
    });
    Unit.findOne({
      name: capName
    }).then(function (result) {
      if (result) return res.status(400).json({
        status: 'Failed',
        message: 'Unit already exists'
      });
      unit.save().then(function () {
        return res.status(201).json({
          status: 'success',
          message: 'Unit succesfully added'
        });
      })["catch"](function (error) {
        return res.status(400).json({
          status: 'Failed',
          message: error.message
        });
      });
    })["catch"](function (error) {
      return res.status(400).json({
        status: 'Failed',
        message: error.message
      });
    });
  },
  getUnit: function getUnit(reg, res) {
    Unit.find().then(function (data) {
      res.status(200).json(data);
    })["catch"](function (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.message
      });
    });
  }
};
exports["default"] = _default;