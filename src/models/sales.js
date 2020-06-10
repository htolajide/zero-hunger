const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  farmer_id: { type: String, required: true },
  buyer_id: { type: String, required: true },
  product_name: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  token: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date()},
  updated_at: {type: Date, required: true, default: new Date()}
});

module.exports = mongoose.model('Sales', saleSchema);