const mongoose = require('mongoose');

const farmerStockSchema = mongoose.Schema({
  farmer_id: { type: String, required: true },
  product_name: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: {type: String, required: true },
  created_at: { type: Date, required: true, default: new Date()},
  updated_at: {type: Date, required: true, default: new Date()}
});

module.exports = mongoose.model('FarmerStock', farmerStockSchema);