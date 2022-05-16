const { Schema, default: mongoose } = require("mongoose");
const categorychema = new mongoose.Schema({
  caseName: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Category", categorychema);
