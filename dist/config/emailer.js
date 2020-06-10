"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var logger = require('simple-node-logger').createSimpleLogger();

var transporter = _nodemailer["default"].createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'taofeekhammed@gmail.com',
    pass: 'olajide4me'
  }
});

var sendEmail = function sendEmail(email) {
  var mailOptions = {
    from: ' "Zero Hunger" taofeekhammed@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'Your accout is succesfully created at Zero Hunger'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error.message);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;