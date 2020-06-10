"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("../utilities/helper"));

var Product = require('../models/product');

var _default = {
  addProduct: function addProduct(req, res) {
    var name = req.body.name;

    var capName = _helper["default"].capitalizeWord(name.toLowerCase());

    var product = new Product({
      name: capName
    });
    Product.findOne({
      name: capName
    }).then(function (result) {
      if (result) return res.status(400).json({
        status: 'Failed',
        message: 'Product already exists'
      });
      product.save().then(function () {
        return res.status(201).json({
          status: 'success',
          message: 'Product succesfully added'
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
  getProduct: function getProduct(reg, res) {
    Product.find().then(function (data) {
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