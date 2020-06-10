"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _default = //read and write part of logs
function _default(myfile) {
  var words = [];
  var output = '';

  _fs["default"].readFile(myfile, function (err, data) {
    if (err) console.log("error occured: ".concat(err));else {
      var list = data.toString(); // console.log(list);

      var lines = list.split('\n'); // console.log(lines);

      lines.forEach(function (line) {
        //console.log(line);
        if (line.length > 2) words.push(line.split(' ')); //console.log(words);
      });
      words.forEach(function (word) {
        var method = word[0];
        var url = word[1];
        output += "".concat(method, " ").concat(url, " ").concat(word[2], " ").concat(word[3], " \n");
      });
    }

    _fs["default"].writeFile(_path["default"].join(__dirname, 'newlog.log'), output, function (err) {
      if (err) throw err;
    });
  });
};

exports["default"] = _default;