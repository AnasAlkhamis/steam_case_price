const express = require("express");
const caseRouter = express.Router();

const {
  postAllPrice,
  getAllPrice,
  getData,
} = require("../controller/caseData");
caseRouter.post("/", getData, postAllPrice);
caseRouter.get("/", getAllPrice);

module.exports = caseRouter;
