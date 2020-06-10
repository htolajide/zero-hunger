const mongoose = require('mongoose');

const buyerSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, validator: { isEmail: true} },
    password: { type: String, required: true },
    city: {type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date }
  });
  
  module.exports = mongoose.model('Buyer', buyerSchema);