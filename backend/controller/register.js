const usersModel = require("../models/userSchema");

// This function creates a new author (new user)
const register = (req, res) => {
  const { userName, passwordOne, passwordTwo } = req.body;
  const user = new usersModel({
    userName,
    passwordOne,
    passwordTwo,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
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
    });
};

module.exports = {
  register,
};
