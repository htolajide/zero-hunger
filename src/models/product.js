const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: {type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Product', productSchema);