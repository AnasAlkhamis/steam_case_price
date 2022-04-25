const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/DB_CasesPrice").then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);

const caserRouter = require("./route/caseData");
app.use(express.json());

app.use("/cases", caserRouter);
// getdData();
app.listen(PORT, () => {
  console.log(`server listen to PORT ${PORT}`);
});
