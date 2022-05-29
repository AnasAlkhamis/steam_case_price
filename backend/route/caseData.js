const express = require("express");
const caseRouter = express.Router();

const {
  postAllPrice,
  getAllPrice,
  getData,
  getCasesByCategoryId,
  removeData
} = require("../controller/caseData");
caseRouter.post("/", getData, postAllPrice);
caseRouter.get("/all", getAllPrice);
caseRouter.get("/", getCasesByCategoryId);
caseRouter.delete("/", removeData);


module.exports = caseRouter;
