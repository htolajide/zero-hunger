const mongoose = require('mongoose');

const unitSchema = mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: {type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Unit', unitSchema);