const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 5000;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/DB_CasesPrice").then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);

const caseRouter = require("./route/caseData");


app.use("/cases", caseRouter);


// getdData();
app.listen(PORT || 5000, () => {
  console.log(`server listen to PORT ${PORT}`);
});
