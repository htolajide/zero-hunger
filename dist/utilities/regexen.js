"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.articleRegex = exports.passwordRegex = exports.numberRegex = exports.emailRegex = void 0;
var emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/;
exports.emailRegex = emailRegex;
var numberRegex = /^\d$/;
exports.numberRegex = numberRegex;
var passwordRegex = /^.{6,}$/;
exports.passwordRegex = passwordRegex;
var articleRegex = /[a-zA-Z .]{20,}/;
exports.articleRegex = articleRegex;