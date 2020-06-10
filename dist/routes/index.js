"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _farmer = _interopRequireDefault(require("../controllers/farmer"));

var _authenticator = _interopRequireDefault(require("../middlewares/authenticator"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _default = function _default(app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Zero Humger API!'
    });
  });
  app.post('/api/v1/farmer/signup', _validator["default"].auth, _farmer["default"].signup); // API route for farmer to signup

  app.post('/api/v1/farmer/login', _validator["default"].auth, _farmer["default"].login); // API route for user to login

  app.get('/api/v1/farmers', _authenticator["default"], _farmer["default"].getAll);
};

exports["default"] = _default;