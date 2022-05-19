const express = require("express");
const caseRouter = express.Router();

const {
  postAllPrice,
  getAllPrice,
  getData,
  getCasesByCategoryId,
} = require("../controller/caseData");
caseRouter.post("/", getData, postAllPrice);
caseRouter.get("/all", getAllPrice);
caseRouter.get("/", getCasesByCategoryId);

module.exports = caseRouter;
