const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const cors = require("cors");
const app = express();
const server = http.Server(app);
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

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

server.listen(PORT || 5000, () => {
  console.log(`server listen to PORT ${PORT}`);
});

const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const priceIo = io.of("/io");
module.exports = {priceIo};
require("./controller/getData");
