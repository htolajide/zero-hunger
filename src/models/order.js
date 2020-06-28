const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    buyer_name: { type: String, required: true },
    phone: { type: String, required: true, validator: { isEmail: true} },
    address: { type: String, required: true },
    product_name: { type: String, required: true },
    quantity: {type: Number, require:true},
    price: {type: Number, require:true},
    unit: { type: String, required: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() }
  });
  
  module.exports = mongoose.model('Order', orderSchema);