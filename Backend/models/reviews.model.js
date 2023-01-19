const mongoose = require("mongoose");

// title,description,price,brand,thumbnail,rating,images[],images2,type,discount

const reviewsSchema = mongoose.Schema({
  userID: { type: String, required: true },
  prodctID: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewbody: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});
const ReviewModel = mongoose.model("reviews", reviewsSchema);

module.exports = { ReviewModel };
