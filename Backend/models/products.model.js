const mongoose = require("mongoose");

// title,description,price,brand,rating,images[],type,discount

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
});
const productModel = mongoose.model("user", productSchema);

module.exports = { productModel };
