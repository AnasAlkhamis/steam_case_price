const express = require("express");
const userRouter = express.Router();

const { login } = require("../controller/login");
const { register } = require("../controller/register");

userRouter.post("/register", register);
userRouter.post("/login", login);


module.exports = userRouter;
