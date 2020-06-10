"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  capitalizeWord: function capitalizeWord(word) {
    var wordArray = word.split(' ');
    if (wordArray.length === 1) return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    var capArray = wordArray.map(function (text) {
      return text.replace(text[0], text[0].toUpperCase());
    });
    return capArray.join(' ');
  }
};
exports["default"] = _default;