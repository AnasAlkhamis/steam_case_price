const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
require("./controller/getData");

mongoose.connect(process.env.DB_URI).then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);
const caseRouter = require("./route/caseData");
const userRouter = require("./route/users");

app.use("/cases", caseRouter);
app.use("/users", userRouter);

app.listen(PORT || 5000, () => {
  console.log(`server listen to PORT ${PORT}`);
});

module.exports = app;
