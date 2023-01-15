const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: {
    type: Number,
    min: 5,
    max: 150,
  },
  email: { type: String, required: true, lowercase: true, unique: true },
  pass: { type: String, required: true, unique: true },
  role: { type: String, required: true },
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
const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
