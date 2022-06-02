const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    passwordOne: { type: String, required: true },
    passwordTwo: { type: String, required: true },
  },
  { timestamps: true }
);

const SALT = Number(process.env.SALT);
userSchema.pre("save", async function () {
  this.userName = this.userName.toLowerCase();
  this.passwordOne = await bcrypt.hash(this.passwordOne, SALT);
  this.passwordTwo = await bcrypt.hash(this.passwordTwo, SALT);
});
module.exports = mongoose.model("User", userSchema);
