"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _farmer = _interopRequireDefault(require("../controllers/farmer"));

var _buyer = _interopRequireDefault(require("../controllers/buyer"));

var _authenticator = _interopRequireDefault(require("../middlewares/authenticator"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _location = _interopRequireDefault(require("../controllers/location"));

var _product = _interopRequireDefault(require("../controllers/product"));

var _unit = _interopRequireDefault(require("../controllers/unit"));

var _default = function _default(app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Zero Humger API!'
    });
  });
  app.post('/api/v1/farmer/signup', _validator["default"].auth, _farmer["default"].signup); // API route for farmer to signup

  app.post('/api/v1/farmer/login', _validator["default"].auth, _farmer["default"].login); // API route for farmer to login

  app.patch('/api/v1/farmer/reset/password', _validator["default"].auth, _farmer["default"].resetPassword); // API route for farmer reset password

  app.get('/api/v1/farmers', _farmer["default"].getAll); // Api route for listing farmers

  app.get('/api/v1/show/products', _farmer["default"].showProducts); // api for advertising product

  app["delete"]('/api/v1/farmer/:id/delete', _farmer["default"].deleteOne); // API route for deleting all farmers

  app["delete"]('/api/v1/farmer/all/delete', _farmer["default"].deleteAll); // API route for deleting a famer

  app.post('/api/v1/farmer/product/add', _authenticator["default"], _farmer["default"].addProduct);
  app.put('/api/v1/farmer/profile/edit', _validator["default"].auth, _authenticator["default"], _farmer["default"].editFarmer); //Api route for edit profile

  app.get('/api/v1/farmer/products', _authenticator["default"], _farmer["default"].getProducts);
  app.get('/api/v1/farmer/sales', _authenticator["default"], _farmer["default"].getSales);
  app.patch('/api/v1/farmer/product/:id/edit', _authenticator["default"], _farmer["default"].editProduct);
  app.post('/api/v1/buyer/signup', _validator["default"].auth, _buyer["default"].signup); // API route for buyer to signup

  app.post('/api/v1/buyer/login', _validator["default"].auth, _buyer["default"].login); // API route for buyer to login

  app.patch('/api/v1/buyer/reset/password', _validator["default"].auth, _buyer["default"].resetPassword); // API route for buyer reset password

  app.get('/api/v1/buyers', _buyer["default"].getAll); // Api route for listing buyer

  app["delete"]('/api/v1/buyer/:id/delete', _buyer["default"].deleteOne); // API route for deleting all buyers

  app["delete"]('/api/v1/buyer/all/delete', _buyer["default"].deleteAll); // API route for deleting a buyer

  app.put('/api/v1/buyer/profile/edit', _validator["default"].auth, _authenticator["default"], _buyer["default"].editBuyer); //Api route for edit buyer profile

  app.get('/api/v1/user/location', _location["default"].getLocation);
  app.get('/api/v1/buyer/products', _authenticator["default"], _buyer["default"].getSales);
  app.post('/api/v1/buyer/product/buy', _authenticator["default"], _buyer["default"].buyProduct);
  app.post('/api/v1/product/add', _product["default"].addProduct);
  app.post('/api/v1/unit/add', _unit["default"].addUnit);
  app.get('/api/v1/products/', _product["default"].getProduct);
  app.get('/api/v1/units/', _unit["default"].getUnit);
  app.get('/api/v1/:city/:product/sellers', _farmer["default"].getSellers);
};

exports["default"] = _default;