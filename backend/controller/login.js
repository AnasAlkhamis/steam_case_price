const usersModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function checks user login credentials
const login = (req, res) => {
  const { passwordOne, passwordTwo } = req.body;
  const userName = req.body.userName.toLowerCase();
  usersModel
    .findOne({ userName })
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The userName doesn't exist`,
        });
      }
      try {
        const validOne = await bcrypt.compare(passwordOne, result.passwordOne);
        const validTwo = await bcrypt.compare(passwordTwo, result.passwordTwo);

        if (!validOne || !validTwo) {
          return res.status(403).json({
            success: false,
            message: `The passwords you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          user: result.userName,
        };

        // const options = {
        //   expiresIn: "60m",
        // };
        const token = await jwt.sign(payload, process.env.SECRET || "CS20Chroma");
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  login,
};
