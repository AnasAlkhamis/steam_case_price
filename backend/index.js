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
mongoose
  .connect(
    "mongodb+srv://anas:7LMWWTWpqfIZLZ8w@cluster0.zc8ky.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT || 5000, () => {
  console.log(`server listen to PORT ${PORT}`);
});

require("./controller/getData");

