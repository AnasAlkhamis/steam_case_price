const express = require("express");
const userRouter = express.Router();
const authentication = require("../middleware/authentication");
const { login } = require("../controller/login");
const { register, findUser } = require("../controller/register");
userRouter.post("/", authentication, register);
userRouter.post("/register", findUser, register);
userRouter.post("/login", login);
userRouter.get("/", findUser);

module.exports = userRouter;
