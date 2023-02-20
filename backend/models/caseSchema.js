const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  success: { type: Boolean, required: true },
  lowest_price: { type: String, required: true },
  volume: { type: String, required: true },
  median_price: { type: String, required: true },
  category: { type: String },
  createdAt: { type: String },
});
module.exports = mongoose.model("Case", caseSchema);
