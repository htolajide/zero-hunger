"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

var _mongoConnect = _interopRequireDefault(require("./config/mongoConnect"));

// for accessing config in .env file
var rfs = require('rotating-file-stream'); // version 2.x


_dotenv["default"].config(); // set up express app


var app = (0, _express["default"])();
var requestLogStream = rfs.createStream('request.log', {
  interval: '1d',
  // rotate daily
  path: _path["default"].join(__dirname, 'logs')
}); // to resolve cross origin resource shearing (CORS) error add folowing to te response header 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); // Parse incoming requests data

app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])('dev')); // setup the logger

app.use((0, _morgan["default"])(':method :url :status :res[content-length] - :response-time ms', {
  stream: requestLogStream
}));
app.use(_express["default"]["static"](__dirname + '../www'));
(0, _mongoConnect["default"])();
(0, _routes["default"])(app);
app.get('*', function (req, res) {
  res.end('Zero Hunger Backend!!!');
}); //app.listen(port, () => logger.info(`Zero hunger ready at ${port}`));

module.exports = app;