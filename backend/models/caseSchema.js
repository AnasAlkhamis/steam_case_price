const mongoose = require("mongoose");
// const expires = 60 * 60 * 24 * 30;
const caseSchema = new mongoose.Schema({
  success: { type: Boolean, required: true },
  lowest_price: { type: String, required: true },
  volume: { type: String, required: true },
  median_price: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date },
});
caseSchema.index({ createdAt: 1 }, { expires: "30d" });
module.exports = mongoose.model("Case", caseSchema);
