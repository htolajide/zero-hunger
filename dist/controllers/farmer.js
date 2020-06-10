"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../config/config.json"));

var _emailer = _interopRequireDefault(require("../config/emailer"));

var Farmer = require("../models/farmer");

var _default = {
  signup: function () {
    var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var farmer;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = Farmer;
              _context.t1 = req.body.fullname;
              _context.t2 = req.body.email;
              _context.next = 5;
              return _bcrypt["default"].hash(req.body.password, 10);

            case 5:
              _context.t3 = _context.sent;
              _context.t4 = {
                fullname: _context.t1,
                email: _context.t2,
                password: _context.t3
              };
              farmer = new _context.t0(_context.t4);
              farmer.save().then(function (userData) {
                var token = _jsonwebtoken["default"].sign({
                  userId: userData._id
                }, process.env.SECRET ? process.env.SECRET : _config["default"].secret);

                res.cookie('farmerid', userData._id, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true
                });
                res.cookie('token', token, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true
                });
                res.status(201).json({
                  success: true,
                  message: 'account successfully created',
                  cookieUserid: res.cookie.farmerid,
                  token: token,
                  userData: userData
                });
                (0, _emailer["default"])(userData.email);
              })["catch"](function (error) {
                res.status(400).json({
                  error: error.message
                });
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function signup(_x, _x2) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  getAll: function getAll(req, res) {
    Farmer.find().then(function (farmers) {
      res.status(200).json(farmers);
    })["catch"](function (error) {
      res.status(400).json({
        error: error.message
      });
    });
  },
  login: function login(req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;
    Farmer.findOne({
      email: email
    }).then( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(farmer) {
        var match, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _bcrypt["default"].compare(password, farmer.password);

              case 2:
                match = _context2.sent;

                if (match) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(401).send({
                  status: false,
                  message: 'Login failed, check your password'
                }));

              case 5:
                // sign jwt and wrap in a cookie
                token = _jsonwebtoken["default"].sign({
                  userId: farmer._id
                }, process.env.SECRET ? process.env.SECRET : _config["default"].secret);
                res.cookie('farmerid', farmer._id, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true
                });
                res.cookie('token', token, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true
                });
                return _context2.abrupt("return", res.status(200).json({
                  token: token,
                  farmer_id: farmer._id
                }));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }())["catch"](function (error) {
      res.status(400).json({
        error: error.message
      });
    });
  }
};
exports["default"] = _default;