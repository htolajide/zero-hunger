"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _validationHelpers = _interopRequireDefault(require("../utilities/validationHelpers"));

var _regexen = require("../utilities/regexen");

var checkForEmptyFields = _validationHelpers["default"].checkForEmptyFields,
    checkPatternedFields = _validationHelpers["default"].checkPatternedFields;
var _default = {
  auth: function auth(req, res, next) {
    var errors = [];
    var _req$body = req.body,
        fullname = _req$body.fullname,
        email = _req$body.email,
        password = _req$body.password;

    if (req.path.includes('signup')) {
      errors.push.apply(errors, (0, _toConsumableArray2["default"])(checkForEmptyFields('Full Name', fullname)));
      errors.push.apply(errors, (0, _toConsumableArray2["default"])(checkForEmptyFields('Email', email)));
    }

    errors.push.apply(errors, (0, _toConsumableArray2["default"])(checkPatternedFields('Email address', email, _regexen.emailRegex)));
    errors.push.apply(errors, (0, _toConsumableArray2["default"])(checkPatternedFields('Password', password, _regexen.passwordRegex)));

    if (errors.length) {
      return res.status(400).send({
        message: 'Your request contain errors',
        data: errors
      });
    }

    return next();
  },
  product: function product(req, res, next) {
    var errors = [];
    var _req$body2 = req.body,
        name = _req$body2.name,
        imageurl = _req$body2.imageurl;
    errors.push.apply(errors, (0, _toConsumableArray2["default"])(checkForEmptyFields('Product name', name)));
    errors.push.apply(errors, (0, _toConsumableArray2["default"])(checkForEmptyFields('Product image', imageurl)));

    if (errors.length) {
      return res.status(400).send({
        message: 'Your request contain errors',
        data: errors
      });
    }

    return next();
  },
  checkProductIdParams: function checkProductIdParams(req, res, next) {
    var productId = req.params.productId;
    var parsedNumber = parseInt(productId, 10);
    var isInteger = Number.isInteger(parsedNumber);
    var isGreaterThanZero = parsedNumber > 0;
    if (isInteger && isGreaterThanZero) return next();
    return res.status(400).json('ID must be an integer greater than zero');
  }
};
exports["default"] = _default;