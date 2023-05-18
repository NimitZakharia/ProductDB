const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  category: String,
  price: Number,
  productType: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
