const express = require("express");
const caserRouter = express.Router();

const {
  postAllPrice,
  getAllPrice,
  getData,
} = require("../controller/caseData");
caserRouter.post("/", getData, postAllPrice);
caserRouter.get("/", getAllPrice);

module.exports = caserRouter;
