const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
require("./controller/getData");

const caseRouter = require("./routes/caseData");
const userRouter = require("./routes/users");

app.use("/cases", caseRouter);
app.use("/users", userRouter);
mongoose.connect(process.env.DB_URL).then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log("err", err);
  }
);
module.exports = app;

app.listen(PORT || 5000, () => {
  console.log(`server listen to PORT ${PORT}`);
});
