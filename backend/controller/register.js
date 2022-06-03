const usersModel = require("../models/userSchema");

// This function creates a new author (new user)
const register = async (req, res) => {
  try {
    const { userName, passwordOne, passwordTwo } = req.body;
    const user = new usersModel({
      userName,
      passwordOne,
      passwordTwo,
    });

    const result = await user.save();
    res.status(201).json({
      success: true,
      message: `Account Created Successfully`,
    });
  } catch (err) {
    if (err.keyPattern) {
      return res.status(409).json({
        success: false,
        message: `The userName already exists`,
      });
    }
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};
const findUser = async (req, res, next) => {
  console.log(req.method);
  try {
    const find = await usersModel.findOne();
    if (find) {
      return res.status(200).json({
        success: true,
        message: "there is already a user",
      });
    } else {
      if (req.method === post) {
        next();
        return;
      }
      return res.status(200).json({
        success: false,
        message: "there is no user",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};
module.exports = {
  register,
  findUser,
};
