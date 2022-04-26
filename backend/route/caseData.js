const express = require("express");
const caserRouter = express.Router();

const { postAllPrice, getAllPrice } = require("../controller/caseData");
caserRouter.post("/", postAllPrice);
caserRouter.get("/", getAllPrice);

module.exports = caserRouter;
