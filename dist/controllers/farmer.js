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

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config/config.json"));

var _emailer = _interopRequireDefault(require("../config/emailer"));

var _location = _interopRequireDefault(require("./location"));

var Farmer = require('../models/farmer');

var FarmerStock = require('../models/farmerStock');

var Sales = require('../models/sales');

var _default = {
  signup: function signup(req, res) {
    var fullname = req.body.fullname,
        email = req.body.email,
        password = req.body.password;

    _axios["default"].get(_location["default"].url).then( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(result) {
        var farmer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = Farmer;
                _context.t1 = fullname;
                _context.t2 = email;
                _context.next = 5;
                return _bcrypt["default"].hash(password, 10);

              case 5:
                _context.t3 = _context.sent;
                _context.t4 = result.data.city;
                _context.t5 = new Date();
                _context.t6 = new Date();
                _context.t7 = {
                  fullname: _context.t1,
                  email: _context.t2,
                  password: _context.t3,
                  city: _context.t4,
                  created_at: _context.t5,
                  updated_at: _context.t6
                };
                farmer = new _context.t0(_context.t7);
                Farmer.findOne({
                  email: email
                }).then(function (result) {
                  if (result) {
                    return res.status(403).json({
                      status: 'Request Failed',
                      message: "Email already exists"
                    });
                  }

                  farmer.save().then(function (userData) {
                    var token = _jsonwebtoken["default"].sign({
                      userId: userData._id
                    }, process.env.SECRET ? process.env.SECRET : _config["default"].secret);

                    res.cookie('farmerid', userData._id, {
                      expires: new Date(Date.now() + 7200000),
                      httpOnly: true
                    });
                    res.cookie('token', token, {
                      expires: new Date(Date.now() + 7200000),
                      httpOnly: true
                    });
                    res.status(201).json({
                      status: 'Success',
                      message: 'account successfully created',
                      cookieUserid: res.cookie.farmerid,
                      token: token,
                      userData: userData
                    });
                    (0, _emailer["default"])(userData.email);
                  })["catch"](function (error) {
                    res.status(400).json({
                      status: 'Failed',
                      message: error.message
                    });
                  });
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }())["catch"](function (error) {
      return res.status(400).json({
        status: 'Failed',
        message: error.message
      });
    });
  },
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
    var email = req.body.email,
        password = req.body.password;
    Farmer.findOne({
      email: email
    }).then( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(farmer) {
        var match, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (farmer) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 'Request failed',
                  message: 'Email is not recognized'
                }));

              case 2:
                _context2.next = 4;
                return _bcrypt["default"].compare(password, farmer.password);

              case 4:
                match = _context2.sent;

                if (match) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(401).send({
                  status: "Request failed",
                  message: 'Login failed, check your password'
                }));

              case 7:
                // sign jwt and wrap in a cookie
                token = _jsonwebtoken["default"].sign({
                  userId: farmer._id
                }, process.env.SECRET ? process.env.SECRET : _config["default"].secret);
                res.cookie('farmerid', farmer._id, {
                  expires: new Date(Date.now() + 7200000),
                  httpOnly: true
                });
                res.cookie('token', token, {
                  expires: new Date(Date.now() + 7200000),
                  httpOnly: true
                });
                return _context2.abrupt("return", res.status(200).json({
                  token: token,
                  farmer_id: farmer._id
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }())["catch"](function (error) {
      res.status(400).json({
        error: error.message
      });
    });
  },
  resetPassword: function resetPassword(req, res) {
    var email = req.body.email,
        password = req.body.password;
    Farmer.findOne({
      email: email
    }).then( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(result) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (result) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  status: 'Failed',
                  message: "Email not recognized"
                }));

              case 2:
                _context3.t0 = Farmer;
                _context3.t1 = {
                  email: email
                };
                _context3.next = 6;
                return _bcrypt["default"].hash(password, 10);

              case 6:
                _context3.t2 = _context3.sent;
                _context3.t3 = {
                  password: _context3.t2
                };

                _context3.t0.updateOne.call(_context3.t0, _context3.t1, _context3.t3).then(function () {
                  res.status(201).json({
                    message: "Password successfully reset!"
                  });
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }())["catch"](function (error) {
      res.status(400).json({
        error: error.message
      });
    });
  },
  editFarmer: function () {
    var _editFarmer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var fullname, email, password;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              fullname = req.body.fullname, email = req.body.email, password = req.body.password;

              _axios["default"].get(_location["default"].url).then( /*#__PURE__*/function () {
                var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(result) {
                  var farmer;
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.t0 = Farmer;
                          _context4.t1 = req.cookies.farmerid;
                          _context4.t2 = fullname;
                          _context4.t3 = email;
                          _context4.next = 6;
                          return _bcrypt["default"].hash(password, 10);

                        case 6:
                          _context4.t4 = _context4.sent;
                          _context4.t5 = result.data.city;
                          _context4.t6 = new Date();
                          _context4.t7 = {
                            _id: _context4.t1,
                            fullname: _context4.t2,
                            email: _context4.t3,
                            password: _context4.t4,
                            city: _context4.t5,
                            updated_at: _context4.t6
                          };
                          farmer = new _context4.t0(_context4.t7);
                          Farmer.updateOne({
                            _id: req.cookies.farmerid
                          }, farmer).then(function () {
                            res.status(201).json({
                              status: 'Success',
                              message: 'account successfully updated'
                            });
                          })["catch"](function (error) {
                            res.status(400).json({
                              error: error.message
                            });
                          });

                        case 12:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x6) {
                  return _ref4.apply(this, arguments);
                };
              }())["catch"](function (error) {
                return res.status(400).json({
                  status: 'Failed',
                  message: error.message
                });
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function editFarmer(_x4, _x5) {
      return _editFarmer.apply(this, arguments);
    }

    return editFarmer;
  }(),
  deleteOne: function deleteOne(req, res) {
    Farmer.deleteOne({
      _id: req.params.id
    }).then(function () {
      res.status(200).json({
        message: "Farmer deleted successfully!"
      });
    })["catch"](function (error) {
      res.status(400).json({
        error: error.message
      });
    });
  },
  deleteAll: function deleteAll(req, res) {
    Farmer.deleteMany().then(function () {
      res.status(200).json({
        message: "Farmers deleted successfully!"
      });
    })["catch"](function (error) {
      res.status(400).json({
        error: error.message
      });
    });
  },
  addProduct: function addProduct(req, res) {
    var name = req.body.name,
        unit = req.body.unit,
        quantity = req.body.quantity,
        price = req.body.price;
    var farmerid = req.cookies.farmerid;

    _axios["default"].get(_location["default"].url).then(function (result) {
      var stock = new FarmerStock({
        farmer_id: req.cookies.farmerid,
        product_name: name,
        unit: unit,
        quantity: quantity,
        price: price,
        location: result.data.city
      });
      FarmerStock.findOne({
        product_name: name,
        farmer_id: farmerid
      }).then(function (result) {
        if (result) return res.status(403).json({
          status: 'failed',
          message: 'product is in stock'
        });
        stock.save().then(function (data) {
          res.status(201).json({
            status: 'success',
            data: data
          });
        })["catch"](function (error) {
          return res.status(400).json({
            status: 'failed',
            message: error.message
          });
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
  getProducts: function getProducts(req, res) {
    FarmerStock.find({
      farmer_id: req.cookies.farmerid
    }).then(function (stock) {
      res.status(200).json({
        stock: stock
      });
    })["catch"](function (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.message
      });
    });
  },
  showProducts: function showProducts(req, res) {
    _axios["default"].get(_location["default"].url).then(function (result) {
      FarmerStock.find({
        location: result.data.city
      }).then(function (products) {
        if (!products) return res.status(400).json({
          status: 'Failed',
          message: 'Products not found'
        });
        res.status(200).json({
          products: products
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
  editProduct: function editProduct(req, res) {
    var name = req.body.name,
        unit = req.body.unit,
        quantity = req.body.quantity,
        price = req.body.price;
    var farmerid = req.cookies.farmerid;

    _axios["default"].get(_location["default"].url).then(function (result) {
      var stock = new FarmerStock({
        _id: req.params.id,
        farmer_id: farmerid,
        product_name: name,
        unit: unit,
        quantity: quantity,
        price: price,
        location: result.data.city,
        updated_at: new Date()
      });
      FarmerStock.updateOne({
        _id: req.params.id,
        farmer_id: farmerid
      }, stock).then(function () {
        res.status(201).json({
          status: 'success',
          message: 'Product successfully edited'
        });
      })["catch"](function (error) {
        return res.status(400).json({
          status: 'failed',
          message: error.message
        });
      });
    })["catch"](function (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.message
      });
    });
  },
  getSales: function getSales(req, res) {
    Sales.find({
      farmer_id: req.cookies.farmerid
    }).then(function (stock) {
      res.status(200).json({
        stock: stock
      });
    })["catch"](function (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.message
      });
    });
  },
  getSellers: function getSellers(req, res) {
    var ids = []; // store farmer ids

    var farmers = []; // store farmers

    var output = []; // store output
    // get all farmers

    Farmer.find({
      city: req.params.city
    }).then(function (farmer) {
      farmer.map(function (item) {
        farmers.push({
          farmerid: item._id,
          name: item.fullname,
          email: item.email,
          city: item.city
        });
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error.message
      });
    }); // get stock information

    FarmerStock.find({
      product_name: req.params.product,
      location: req.params.city
    }).then(function (result) {
      result.map(function (item) {
        ids.push({
          farmerid: item.farmer_id,
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit
        });
      }); // loop through fetched seller/farmer and return name and stock info

      ids.forEach(function (id) {
        var result = farmers.filter(function (farmer) {
          farmer.price = id.price;
          farmer.product_name = id.product_name;
          farmer.quantity = "".concat(id.quantity, " ").concat(id.unit);
          if (farmer.farmerid == id.farmerid) return farmer;
        });
        output.push(result[0]);
      });
      res.status(200).json({
        status: 'success',
        result: output
      });
    })["catch"](function (error) {
      return res.status(400).json({
        status: 'Failed',
        message: error.message
      });
    });
  }
};
exports["default"] = _default;