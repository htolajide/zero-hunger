"use strict";

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    "default": new Date()
  },
  updated_at: {
    type: Date,
    required: true,
    "default": new Date()
  }
});
module.exports = mongoose.model('Product', productSchema);