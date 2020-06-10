"use strict";

var mongoose = require('mongoose');

var farmerSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validator: {
      isEmail: true
    }
  },
  password: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true,
    "default": new Date()
  }
});
module.exports = mongoose.model('Farmer', farmerSchema);