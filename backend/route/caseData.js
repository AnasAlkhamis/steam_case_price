const express = require("express");
const caserRouter = express.Router();

const { getAllPrice } = require("../controller/caseData");
caserRouter.get("/", getAllPrice);

module.exports = caserRouter